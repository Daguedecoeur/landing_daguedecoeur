/**
 * One-shot script to backfill NEWSLETTER_TOKEN for all existing Brevo contacts.
 * 
 * Usage: npx tsx --env-file=.env.local scripts/backfill-newsletter-tokens.ts
 */

import { createHmac } from 'crypto'

const BREVO_API_URL = 'https://api.brevo.com/v3'
const BREVO_API_KEY = process.env.BREVO_API!
const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET!

if (!BREVO_API_KEY) { console.error('❌ BREVO_API missing'); process.exit(1) }
if (!NEWSLETTER_SECRET) { console.error('❌ NEWSLETTER_SECRET missing'); process.exit(1) }

function generateToken(email: string): string {
  return createHmac('sha256', NEWSLETTER_SECRET)
    .update(email.toLowerCase().trim())
    .digest('hex')
}

async function getAllContacts(): Promise<{ email: string }[]> {
  const contacts: { email: string }[] = []
  let offset = 0
  const limit = 50

  while (true) {
    const res = await fetch(`${BREVO_API_URL}/contacts?limit=${limit}&offset=${offset}`, {
      headers: { 'api-key': BREVO_API_KEY },
    })
    if (!res.ok) { console.error('❌ Failed to fetch contacts:', await res.text()); break }
    const data = await res.json()
    if (!data.contacts || data.contacts.length === 0) break
    contacts.push(...data.contacts.map((c: { email: string }) => ({ email: c.email })))
    offset += limit
    if (contacts.length >= data.count) break
  }

  return contacts
}

async function updateContactToken(email: string, token: string): Promise<boolean> {
  const res = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      attributes: { NEWSLETTER_TOKEN: token },
    }),
  })
  return res.ok
}

async function main() {
  console.log('📋 Fetching all Brevo contacts...')
  const contacts = await getAllContacts()
  console.log(`Found ${contacts.length} contacts`)

  let success = 0
  let failed = 0

  for (const contact of contacts) {
    if (!contact.email) { console.warn(`\n⚠️ Skipped contact without email`); continue }
    const token = generateToken(contact.email)
    const ok = await updateContactToken(contact.email, token)
    if (ok) {
      success++
      process.stdout.write(`\r✅ ${success}/${contacts.length} updated`)
    } else {
      failed++
      console.error(`\n❌ Failed: ${contact.email}`)
    }
    // Rate limiting — Brevo allows ~10 req/s
    await new Promise(r => setTimeout(r, 120))
  }

  console.log(`\n\n🏁 Done! ${success} updated, ${failed} failed.`)
}

main().catch(console.error)
