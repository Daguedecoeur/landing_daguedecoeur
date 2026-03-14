/**
 * One-shot script: create placeholder articles about the Daggerheart universe.
 * Deletes existing placeholders, re-creates with uploaded images.
 * Also includes a "showcase" article using all Payload richtext elements.
 *
 * Usage: npx tsx --env-file=.env.local scripts/seed-placeholder-articles.ts
 */

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002'

async function getPayloadToken(): Promise<string> {
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    console.error('❌ PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD missing')
    process.exit(1)
  }
  const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) { console.error('❌ Login failed'); process.exit(1) }
  return (await res.json()).token
}

async function ensureTag(token: string, label: string, slug: string, color: string): Promise<string> {
  const res = await fetch(`${PAYLOAD_URL}/api/tags?where[slug][equals]=${slug}`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  if (data.docs?.length > 0) return data.docs[0].id

  const createRes = await fetch(`${PAYLOAD_URL}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ label, slug, color }),
  })
  const created = await createRes.json()
  console.log(`📌 Created tag "${label}"`)
  return created.doc.id
}

async function uploadImage(token: string, imagePath: string, altText: string): Promise<string | null> {
  const fs = await import('fs')
  const path = await import('path')
  const { execFileSync } = await import('child_process')

  const filePath = path.resolve(imagePath)
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Image not found: ${filePath}`)
    return null
  }

  try {
    const result = execFileSync('curl', [
      '-s', '-L', '-X', 'POST',
      `${PAYLOAD_URL}/api/media`,
      '-H', `Authorization: JWT ${token}`,
      '-F', `file=@${filePath}`,
      '-F', `_payload=${JSON.stringify({ alt: altText })}`,
    ], { encoding: 'utf-8', timeout: 30000 })

    const data = JSON.parse(result)
    if (data.doc?.id) return data.doc.id
    if (data.errors) {
      console.warn(`⚠️ Upload error:`, JSON.stringify(data.errors).slice(0, 200))
      return null
    }
    console.warn(`⚠️ Upload response missing doc.id:`, result.slice(0, 150))
    return null
  } catch (err) {
    console.warn(`⚠️ Upload failed for ${path.basename(filePath)}:`, (err as Error).message?.slice(0, 150))
    return null
  }
}

async function deleteArticleBySlug(token: string, slug: string): Promise<boolean> {
  const res = await fetch(`${PAYLOAD_URL}/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = await res.json()
  if (!data.docs?.length) return false
  
  const id = data.docs[0].id
  const del = await fetch(`${PAYLOAD_URL}/api/articles/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `JWT ${token}` },
  })
  return del.ok
}

// ─── Lexical helpers ─────────────────────────────────────────

function textNode(text: string, format: number = 0) {
  return { type: 'text', text, format, version: 1 }
}

function paragraphNode(children: unknown[]) {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr', format: '', indent: 0, version: 1,
  }
}

function headingNode(tag: string, children: unknown[]) {
  return {
    type: 'heading',
    tag,
    children,
    direction: 'ltr', format: '', indent: 0, version: 1,
  }
}

function listNode(tag: string, items: string[]) {
  return {
    type: 'list',
    tag,
    listType: tag === 'ol' ? 'number' : 'bullet',
    children: items.map((text) => ({
      type: 'listitem',
      children: [textNode(text)],
      direction: 'ltr', format: '', indent: 0, version: 1, value: 1,
    })),
    direction: 'ltr', format: '', indent: 0, start: 1, version: 1,
  }
}

function quoteNode(text: string) {
  return {
    type: 'quote',
    children: [textNode(text, 2)], // italic
    direction: 'ltr', format: '', indent: 0, version: 1,
  }
}

function lexicalRoot(children: unknown[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr', format: '', indent: 0, version: 1,
    },
  }
}

function simpleLexical(paragraphs: string[]) {
  return lexicalRoot(paragraphs.map((t) => paragraphNode([textNode(t)])))
}

// ─── Showcase article content ────────────────────────────────

function showcaseContent() {
  return lexicalRoot([
    // H2
    headingNode('h2', [textNode("Bienvenue dans le Monde de Daggerheart")]),

    paragraphNode([
      textNode("Cet article est un "),
      textNode("showcase", 1), // bold
      textNode(" de tous les éléments disponibles dans l'éditeur Payload. Il sert de "),
      textNode("référence visuelle", 2), // italic
      textNode(" pour voir comment chaque élément est rendu sur le site."),
    ]),

    // H3
    headingNode('h3', [textNode("Les Bases du Système de Jeu")]),

    paragraphNode([
      textNode("Daggerheart utilise un système de dés innovant basé sur l'"),
      textNode("Espoir", 1), // bold
      textNode(" et la "),
      textNode("Peur", 1), // bold
      textNode(". Chaque lancer raconte une histoire — un succès avec de l'Espoir signifie que le joueur garde le contrôle, tandis qu'un succès avec de la Peur donne au MJ des ressources narratives."),
    ]),

    // Blockquote
    quoteNode("« Le courage ne signifie pas l'absence de peur, mais la volonté d'avancer malgré elle. » — Lyra, Tisseuse des Brumes"),

    paragraphNode([
      textNode("Ce système crée un "),
      textNode("flux narratif dynamique", 3), // bold + italic
      textNode(" où la tension monte naturellement au fil de la session."),
    ]),

    // H3
    headingNode('h3', [textNode("Les Classes Jouables")]),

    paragraphNode([
      textNode("Daggerheart propose une variété de classes, chacune avec ses mécaniques uniques :"),
    ]),

    // Unordered list
    listNode('ul', [
      "Gardien — Le bouclier du groupe, spécialisé dans la protection et le contrôle du terrain",
      "Séraphin — Un lanceur de sorts divin qui puise dans la lumière et le feu sacré",
      "Vagabond — Un expert en furtivité et en tromperie, maître des ombres",
      "Druide — Un gardien de la nature capable de changer de forme et de communier avec les esprits",
      "Barde — Un conteur dont les mots deviennent réalité, mêlant magie et inspiration",
    ]),

    // H3
    headingNode('h3', [textNode("Progression et Niveaux")]),

    paragraphNode([
      textNode("La progression dans Daggerheart se fait de manière organique. Voici les paliers importants :"),
    ]),

    // Ordered list
    listNode('ol', [
      "Niveau 1-3 : Les Fondations — Les personnages découvrent leurs capacités de base",
      "Niveau 4-6 : L'Ascension — Les sous-classes se débloquent, les compétences se spécialisent",
      "Niveau 7-9 : La Maîtrise — Les personnages deviennent des légendes, capables de changer le cours du monde",
      "Niveau 10 : L'Apothéose — Le niveau ultime, réservé aux héros qui ont marqué l'histoire",
    ]),

    // Another H2
    headingNode('h2', [textNode("Conseils pour les Maîtres du Jeu")]),

    paragraphNode([
      textNode("Voici quelques conseils essentiels pour maîtriser une partie de Daggerheart :"),
    ]),

    paragraphNode([
      textNode("Premièrement, "),
      textNode("n'ayez pas peur de la Peur", 1), // bold
      textNode(". Le système de Peur n'est pas là pour punir les joueurs — c'est un outil narratif qui vous permet de créer de la tension et des rebondissements. Utilisez-le avec créativité."),
    ]),

    paragraphNode([
      textNode("Deuxièmement, "),
      textNode("encouragez la co-narration", 1), // bold
      textNode(". Daggerheart est conçu pour que les joueurs participent activement à la construction de l'histoire. Posez-leur des questions, laissez-les décrire leurs actions avec flair."),
    ]),

    // Another blockquote
    quoteNode("« Un bon MJ ne raconte pas l'histoire — il crée l'espace où l'histoire se raconte d'elle-même. »"),

    // H3
    headingNode('h3', [textNode("Ressources Utiles")]),

    paragraphNode([
      textNode("Pour approfondir votre connaissance de Daggerheart, consultez ces ressources :"),
    ]),

    listNode('ul', [
      "Le Kit de Démarrage gratuit traduit en français par la communauté Dague de Cœur",
      "Les fiches de personnages interactives disponibles sur notre Discord",
      "La bibliothèque de cartes et de tokens pour vos sessions en ligne",
      "Le guide des rencontres aléatoires par biome et par niveau",
    ]),

    // Closing
    headingNode('h2', [textNode("Rejoignez l'Aventure")]),

    paragraphNode([
      textNode("La communauté Dague de Cœur est ouverte à tous — que vous soyez un "),
      textNode("joueur débutant", 2), // italic
      textNode(" cherchant votre première table ou un "),
      textNode("MJ expérimenté", 2), // italic
      textNode(" à la recherche de nouvelles inspirations. Rejoignez-nous sur Discord et participez à nos sessions ouvertes chaque week-end !"),
    ]),

    paragraphNode([
      textNode("Bonne aventure, Bâtisseuses et Bâtisseurs ! ⚔️", 1), // bold
    ]),
  ])
}

// ─── Articles data ───────────────────────────────────────────

interface PlaceholderArticle {
  title: string
  slug: string
  excerpt: string
  tagSlug: string
  imagePath: string
  imageAlt: string
  content: unknown
  publishedAt: string
}

const articles: PlaceholderArticle[] = [
  {
    title: "Le Réveil du Dévoreur : Une nouvelle campagne s'annonce",
    slug: 'le-reveil-du-devoreur',
    excerpt: "Les murmures dans les bas-fonds de Valerius ne sont plus de simples rumeurs. Nos espions rapportent une activité inquiétante près des ruines anciennes...",
    tagSlug: 'actualites',
    imagePath: './public/images/blog-defaults/dh-battle.png',
    imageAlt: "Aventuriers combattant une créature antique aux chaînes dorées",
    content: simpleLexical([
      "Les murmures dans les bas-fonds de Valerius ne sont plus de simples rumeurs. Nos espions rapportent une activité inquiétante près des ruines anciennes, là où le Dévoreur fut scellé il y a des siècles.",
      "Cette nouvelle campagne officielle promet de repousser les limites de Daggerheart avec un système de progression inédit et des mécaniques de faction dynamiques.",
      "Les MJ pourront accéder à un kit de démarrage complet incluant des cartes, des PNJ pré-construits et un arc narratif modulaire adapté à tous les niveaux de jeu.",
      "La communauté francophone est invitée à participer aux playtests dès le mois prochain. Inscrivez-vous sur Discord pour ne rien manquer !",
    ]),
    publishedAt: '2026-03-10T10:00:00.000Z',
  },
  {
    title: "Guide du Maître : Les 7 erreurs à éviter en session zéro",
    slug: 'guide-7-erreurs-session-zero',
    excerpt: "La session zéro est le fondement de toute campagne réussie. Voici les pièges les plus courants et comment les éviter pour poser des bases solides.",
    tagSlug: 'ressources',
    imagePath: './public/images/blog-defaults/dh-ritual.png',
    imageAlt: "Trois personnages réalisant un rituel magique",
    content: simpleLexical([
      "La session zéro est le moment le plus important de votre campagne. C'est là que se construisent les fondations narratives, les dynamiques de groupe et les attentes de chacun.",
      "Erreur #1 : Ne pas discuter des limites. Chaque joueur a des thèmes qu'il préfère éviter. Utilisez les outils de sécurité comme les lignes et voiles.",
      "Erreur #2 : Imposer un monde sans consultation. Daggerheart encourage la co-création. Laissez vos joueurs contribuer à l'univers — ils s'y investiront davantage.",
      "Erreur #3 : Négliger les liens entre personnages. Un groupe qui se connaît déjà est plus intéressant qu'un groupe d'étrangers. Facilitez la création de connexions.",
      "Prenez le temps de cette session. C'est un investissement qui paiera tout au long de votre campagne.",
    ]),
    publishedAt: '2026-03-08T14:00:00.000Z',
  },
  {
    title: "L'Éclat d'Aether : Rencontre avec l'auteur",
    slug: 'eclat-aether-interview',
    excerpt: "Nous avons discuté avec J.M. Dalarion de ses inspirations pour cette extension communautaire qui a conquis les tables francophones.",
    tagSlug: 'actualites',
    imagePath: './public/images/blog-defaults/dh-ranger.png',
    imageAlt: "Ranger grenouille chevauchant un oiseau géant au-dessus des montagnes",
    content: simpleLexical([
      "L'Éclat d'Aether est devenu en quelques mois la référence des extensions communautaires pour Daggerheart. Son auteur, J.M. Dalarion, nous ouvre les portes de son processus créatif.",
      "\"J'ai voulu créer quelque chose qui respecte l'esprit de Daggerheart tout en explorant des mécaniques narratives plus profondes,\" nous explique-t-il.",
      "L'extension introduit un système de résonance émotionnelle où les actions des personnages influencent directement le tissu magique du monde.",
      "\"La communauté francophone a été incroyable. Les retours des playtests ont complètement transformé le projet initial en quelque chose de bien meilleur.\"",
    ]),
    publishedAt: '2026-03-05T09:00:00.000Z',
  },
  {
    title: "Bibliothèque des Arcanes : Ressources gratuites pour MJ",
    slug: 'bibliotheque-arcanes-ressources',
    excerpt: "Tables aléatoires, générateurs de PNJ, cartes modulaires... Notre sélection des meilleures ressources gratuites pour enrichir vos sessions.",
    tagSlug: 'ressources',
    imagePath: './public/images/blog-defaults/dh-dragon.png',
    imageAlt: "Aventuriers chevauchant un dragon au-dessus d'une cité fantasy",
    content: simpleLexical([
      "Être Maître du Jeu demande beaucoup de préparation. Heureusement, la communauté regorge de ressources gratuites pour vous faciliter la tâche.",
      "Tables aléatoires : notre générateur de rencontres adapté à Daggerheart vous propose des défis narratifs originaux basés sur le niveau de votre groupe.",
      "Cartes modulaires : téléchargez nos packs de cartes de donjons, tavernes et villes francophones, prêts à l'emploi pour vos sessions en ligne ou en présentiel.",
      "Générateur de PNJ : créez des personnages non-joueurs mémorables avec notre outil qui génère personnalité, motivation et secret pour chaque PNJ.",
    ]),
    publishedAt: '2026-03-01T11:00:00.000Z',
  },
  {
    title: "Les Chroniques de Valerius : Épisode 1 — Le Voleur de Mémoires",
    slug: 'chroniques-valerius-episode-1',
    excerpt: "\"La mémoire de l'Archimage avait le goût de cendres froides et d'ambition déçue...\" Premier épisode de notre fiction originale.",
    tagSlug: 'chroniques',
    imagePath: './public/images/blog-defaults/hero-forest.jpg',
    imageAlt: 'Forêt sombre et mystérieuse au crépuscule',
    content: simpleLexical([
      "La mémoire de l'Archimage avait le goût de cendres froides et d'ambition déçue. Kael avait volé bien des souvenirs dans sa carrière de maraudeur d'esprits, mais celui-ci était différent.",
      "Les ruines de l'ancienne bibliothèque s'effondraient lentement autour de lui tandis qu'il remontait le fil des pensées volées. Chaque fragment révélait un peu plus du plan qui avait conduit à la chute de Valerius.",
      "\"Tu cherches des réponses dans les cendres d'un monde mort,\" murmura une voix derrière lui. Kael ne se retourna pas. Il connaissait cette voix — celle de Lyra, la dernière des Tisseuses.",
      "\"Les réponses sont tout ce qui reste quand le monde brûle,\" répondit-il en refermant le grimoire. \"Et ce monde n'a pas fini de brûler.\"",
    ]),
    publishedAt: '2026-02-25T16:00:00.000Z',
  },
  // SHOWCASE: uses all Payload richtext elements
  {
    title: "Daggerheart : Le Guide Complet pour Débuter",
    slug: 'daggerheart-guide-complet',
    excerpt: "Tout ce qu'il faut savoir pour se lancer dans Daggerheart : classes, système de jeu, conseils pour MJ, et ressources de la communauté.",
    tagSlug: 'ressources',
    imagePath: './public/images/blog-defaults/dh-battle.png',
    imageAlt: "Groupe d'aventuriers en plein combat épique",
    content: showcaseContent(),
    publishedAt: '2026-03-12T10:00:00.000Z',
  },
]

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('🔑 Logging into Payload...')
  const token = await getPayloadToken()

  // Ensure tags
  console.log('📌 Ensuring tags...')
  const tagIds: Record<string, string> = {}
  tagIds['actualites'] = await ensureTag(token, 'Actualités', 'actualites', 'gold')
  tagIds['ressources'] = await ensureTag(token, 'Ressources', 'ressources', 'cream')
  tagIds['chroniques'] = await ensureTag(token, 'Chroniques', 'chroniques', 'violet')

  for (const article of articles) {
    // Delete if exists (so we can re-create with images)
    const deleted = await deleteArticleBySlug(token, article.slug)
    if (deleted) console.log(`🗑️  Deleted existing: "${article.slug}"`)

    // Upload cover
    console.log(`🖼️  Uploading image for "${article.title}"...`)
    const mediaId = await uploadImage(token, article.imagePath, article.imageAlt)

    // Create article
    const body: Record<string, unknown> = {
      title: article.title,
      slug: article.slug,
      status: 'published',
      excerpt: article.excerpt,
      content: article.content,
      publishedAt: article.publishedAt,
      tags: [tagIds[article.tagSlug]],
      featuredSize: 'small',
    }
    if (mediaId) body.coverImage = mediaId

    const res = await fetch(`${PAYLOAD_URL}/api/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      console.log(`✅ Created: "${article.title}" ${mediaId ? '(with cover)' : '(no cover)'}`)
    } else {
      const err = await res.text()
      console.error(`❌ Failed: "${article.title}" — ${err.slice(0, 200)}`)
    }

    await new Promise(r => setTimeout(r, 300))
  }

  console.log('\n🏁 Done!')
}

main().catch(console.error)
