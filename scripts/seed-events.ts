/**
 * Seed script: creates sample events in Payload CMS
 * Usage: npx tsx --env-file=.env.local scripts/seed-events.ts
 */

const PAYLOAD_URL = 'http://localhost:3000'
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || 'admin@daguedecoeur.fr'
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || 'admin'

interface EventSeed {
  title: string
  slug: string
  type: 'stream' | 'game-release' | 'convention'
  startDate: string
  endDate?: string
  description: string
  externalUrl?: string
  ctaLabel?: string
  location?: string
  featured?: boolean
}

const events: EventSeed[] = [
  // ── Upcoming Streams ──
  {
    title: "Les Ombres d'Eldoria",
    slug: 'stream-ombres-eldoria',
    type: 'stream',
    startDate: '2026-03-22T20:00:00.000Z',
    description:
      "Rejoignez notre équipe pour une session intense de Daggerheart dans les ruines mystiques d'Eldoria.",
    externalUrl: 'https://twitch.tv/daguedecoeur',
    ctaLabel: 'VOIR DÉTAILS',
  },
  {
    title: 'La Quête du Dragon de Givre',
    slug: 'stream-dragon-givre',
    type: 'stream',
    startDate: '2026-04-05T20:00:00.000Z',
    description:
      'Une aventure épique dans les montagnes gelées. Qui survivra au souffle du dragon ?',
    externalUrl: 'https://twitch.tv/daguedecoeur',
    ctaLabel: 'VOIR DÉTAILS',
  },
  {
    title: 'One-Shot : Les Catacombes Oubliées',
    slug: 'stream-catacombes',
    type: 'stream',
    startDate: '2026-04-12T20:30:00.000Z',
    description:
      'Un one-shot spécial ouvert aux débutants. Venez découvrir Daggerheart en direct !',
    externalUrl: 'https://twitch.tv/daguedecoeur',
  },

  // ── Upcoming Game Releases ──
  {
    title: 'Le Codex des Lames',
    slug: 'codex-des-lames',
    type: 'game-release',
    startDate: '2026-03-28T00:00:00.000Z',
    description:
      'Nouveau supplément digital contenant 50 nouveaux objets magiques et sous-classes pour vos campagnes.',
    externalUrl: 'https://daguedecoeur.fr/blog',
    ctaLabel: 'VOIR DÉTAILS',
  },
  {
    title: 'Daggerheart VF — Édition Complète',
    slug: 'daggerheart-vf-complete',
    type: 'game-release',
    startDate: '2026-05-15T00:00:00.000Z',
    description:
      "La version française officielle de Daggerheart arrive enfin ! Précommandez dès maintenant.",
    externalUrl: 'https://blackbookeditions.fr',
    ctaLabel: 'PRÉCOMMANDER',
  },

  // ── Upcoming Conventions (featured) ──
  {
    title: 'Festival Orc & Gobelin',
    slug: 'festival-orc-gobelin',
    type: 'convention',
    startDate: '2026-04-01T09:00:00.000Z',
    endDate: '2026-04-03T18:00:00.000Z',
    description:
      'Retrouvez-nous au stand 42 pour des démos exclusives et des cadeaux.',
    externalUrl: 'https://orc-et-gobelin.fr',
    ctaLabel: "S'INSCRIRE",
    location: 'Lyon',
    featured: true,
  },
  {
    title: 'Nocturnes de Paris',
    slug: 'nocturnes-paris',
    type: 'convention',
    startDate: '2026-05-12T18:00:00.000Z',
    description:
      'Une nuit entière dédiée au JDR dans un lieu historique au cœur de la capitale.',
    externalUrl: 'https://nocturnes-paris.fr',
    ctaLabel: "S'INSCRIRE",
    location: 'Paris',
    featured: true,
  },
  {
    title: 'FIJ Cannes 2026',
    slug: 'fij-cannes-2026',
    type: 'convention',
    startDate: '2026-06-24T09:00:00.000Z',
    endDate: '2026-06-25T18:00:00.000Z',
    description:
      "Le plus grand événement JDR de l'année. Dague de Coeur y sera en force !",
    externalUrl: 'https://festivaldesjeux-cannes.com',
    ctaLabel: "S'INSCRIRE",
    location: 'Cannes',
    featured: true,
  },

  // ── Past Events (for archives) ──
  {
    title: 'Stream : Première Session Daggerheart',
    slug: 'stream-premiere-session',
    type: 'stream',
    startDate: '2026-01-15T20:00:00.000Z',
    description:
      'Notre toute première session de Daggerheart en direct sur Twitch.',
  },
  {
    title: 'Sortie du Kit de Découverte VF',
    slug: 'kit-decouverte-vf',
    type: 'game-release',
    startDate: '2026-02-01T00:00:00.000Z',
    description:
      "Le kit d'initiation gratuit en français est enfin disponible !",
  },
  {
    title: 'Japan Expo Daggerheart',
    slug: 'japan-expo-daggerheart',
    type: 'convention',
    startDate: '2025-12-10T09:00:00.000Z',
    endDate: '2025-12-12T18:00:00.000Z',
    description:
      'Dague de Coeur était présent à Japan Expo pour faire découvrir Daggerheart.',
    location: 'Paris Nord Villepinte',
    featured: false,
  },
]

async function login(): Promise<string> {
  const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  }

  const data = await res.json()
  return data.token as string
}

async function seed() {
  console.log('🔑 Logging in...')
  const token = await login()
  console.log('✅ Logged in\n')

  console.log('🌱 Seeding events...\n')

  for (const event of events) {
    try {
      const res = await fetch(`${PAYLOAD_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(event),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error(`❌ ${event.title}: ${res.status} — ${err}`)
      } else {
        const data = await res.json()
        console.log(`✅ ${event.title} (id: ${data.doc?.id})`)
      }
    } catch (err) {
      console.error(`❌ ${event.title}: ${err}`)
    }
  }

  console.log('\n🎉 Seed complete!')
}

seed()
