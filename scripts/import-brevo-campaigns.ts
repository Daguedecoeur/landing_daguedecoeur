/**
 * One-shot script: import all sent Brevo campaigns as Payload articles tagged "newsletter".
 *
 * What it does:
 * 1. Fetch all sent campaigns from Brevo API
 * 2. Ensure a "Newsletter" tag exists in Payload
 * 3. Create an article for each campaign that doesn't already exist (matched by slug)
 *
 * Usage: npx tsx --env-file=.env.local scripts/import-brevo-campaigns.ts
 */

const BREVO_API_URL = 'https://api.brevo.com/v3'
const BREVO_API_KEY = process.env.BREVO_API!
const PAYLOAD_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002'

if (!BREVO_API_KEY) { console.error('❌ BREVO_API missing'); process.exit(1) }

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// ─── Brevo ───────────────────────────────────────────────────
interface BrevoCampaign {
  id: number
  name: string
  subject: string
  htmlContent: string
  sentDate?: string
  status: string
}

async function fetchSentCampaigns(): Promise<BrevoCampaign[]> {
  const campaigns: BrevoCampaign[] = []
  let offset = 0
  const limit = 50

  while (true) {
    const url = `${BREVO_API_URL}/emailCampaigns?status=sent&limit=${limit}&offset=${offset}&sort=desc`
    const res = await fetch(url, {
      headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
    })
    if (!res.ok) { console.error('❌ Brevo error:', await res.text()); break }
    const data = await res.json()
    if (!data.campaigns || data.campaigns.length === 0) break
    campaigns.push(...data.campaigns)
    offset += limit
    if (campaigns.length >= data.count) break
  }

  return campaigns
}

// ─── Payload ─────────────────────────────────────────────────
async function getPayloadToken(): Promise<string> {
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    console.error('❌ PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD missing in .env.local')
    process.exit(1)
  }
  const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) { console.error('❌ Payload login failed:', await res.text()); process.exit(1) }
  const data = await res.json()
  return data.token
}

async function ensureNewsletterTag(token: string): Promise<string> {
  // Check if tag exists
  const res = await fetch(`${PAYLOAD_URL}/api/tags?where[slug][equals]=newsletter`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  if (data.docs?.length > 0) return data.docs[0].id

  // Create it
  const createRes = await fetch(`${PAYLOAD_URL}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ label: 'Newsletter', slug: 'newsletter', color: 'gold' }),
  })
  const created = await createRes.json()
  console.log('📌 Created "Newsletter" tag')
  return created.doc.id
}

async function findArticleBySlug(token: string, slug: string): Promise<string | null> {
  const res = await fetch(`${PAYLOAD_URL}/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  return data.docs?.length > 0 ? data.docs[0].id : null
}

function htmlToLexical(html: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: '(Voir le contenu HTML ci-dessous)', format: 2 }],
          direction: 'ltr', format: '', indent: 0, version: 1,
        },
      ],
      direction: 'ltr', format: '', indent: 0, version: 1,
    },
  }
}

async function upsertArticle(
  token: string,
  campaign: BrevoCampaign,
  tagId: string
): Promise<'created' | 'updated' | 'skipped'> {
  const slug = `newsletter-${slugify(campaign.subject)}`
  const existingId = await findArticleBySlug(token, slug)

  if (existingId) {
    // Update existing article with rawHtml
    const res = await fetch(`${PAYLOAD_URL}/api/articles/${existingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify({ rawHtml: campaign.htmlContent }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error(`    ❌ PATCH failed for ${slug}: ${res.status} ${err.slice(0, 200)}`)
    }
    return res.ok ? 'updated' : 'skipped'
  }

  const res = await fetch(`${PAYLOAD_URL}/api/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({
      title: campaign.subject,
      slug,
      status: 'published',
      excerpt: `Newsletter envoyée le ${campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString('fr-FR') : 'N/A'}`,
      content: htmlToLexical(campaign.htmlContent),
      rawHtml: campaign.htmlContent,
      publishedAt: campaign.sentDate ?? new Date().toISOString(),
      category: 'newsletter',
      tags: [tagId],
      featuredSize: 'small',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`    ❌ POST failed for ${slug}: ${res.status} ${err.slice(0, 200)}`)
  }
  return res.ok ? 'created' : 'skipped'
}

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('🔑 Logging into Payload...')
  const token = await getPayloadToken()

  console.log('📌 Ensuring "Newsletter" tag...')
  const tagId = await ensureNewsletterTag(token)

  console.log('📋 Fetching sent campaigns from Brevo...')
  const campaigns = await fetchSentCampaigns()
  console.log(`Found ${campaigns.length} sent campaigns`)

  let created = 0
  let updated = 0
  let skipped = 0

  for (const campaign of campaigns) {
    const result = await upsertArticle(token, campaign, tagId)
    if (result === 'created') {
      created++
      console.log(`  ✅ Created: "${campaign.subject}"`)
    } else if (result === 'updated') {
      updated++
      console.log(`  🔄 Updated: "${campaign.subject}"`)
    } else {
      skipped++
      console.log(`  ⚠️ Skipped: "${campaign.subject}"`)
    }
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\n🏁 Done! ${created} created, ${updated} updated, ${skipped} skipped.`)
}

main().catch(console.error)
