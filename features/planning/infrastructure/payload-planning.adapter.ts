import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  PlanningPageContent,
  PlanningPageRepository,
  PlanningEvent,
  EventRepository,
} from '../domain/planning.model'

// ── Helpers ──────────────────────────────────────────────────────────────

function resolveImageUrl(field: unknown): string | null {
  if (!field || typeof field !== 'object') return null
  const media = field as Record<string, unknown>
  return (media.url as string) ?? null
}

// ── Fallback ─────────────────────────────────────────────────────────────

function getHeroFallback(): PlanningPageContent {
  return {
    hero: {
      title: 'Planning',
      subtitle: 'Ne manquez aucun événement de la communauté',
      backgroundImageUrl: '/images/planning-hero-bg.png',
    },
  }
}

// ── Planning Page Adapter ────────────────────────────────────────────────

export class PayloadPlanningPageAdapter implements PlanningPageRepository {
  async getPlanningPage(): Promise<PlanningPageContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'planning-page' })

      const fb = getHeroFallback()
      const hero = data.hero as Record<string, unknown> | undefined

      return {
        hero: {
          title: (hero?.title as string) ?? fb.hero.title,
          subtitle: (hero?.subtitle as string) ?? fb.hero.subtitle,
          backgroundImageUrl: resolveImageUrl(hero?.backgroundImage) ?? fb.hero.backgroundImageUrl,
        },
      }
    } catch (error) {
      console.error('[PayloadPlanningPageAdapter]', error)
      return getHeroFallback()
    }
  }
}

// ── Event Adapter ────────────────────────────────────────────────────────

function mapEvent(doc: Record<string, unknown>): PlanningEvent {
  return {
    id: doc.id as number,
    title: doc.title as string,
    slug: doc.slug as string,
    type: doc.type as PlanningEvent['type'],
    startDate: doc.startDate as string,
    endDate: (doc.endDate as string) ?? null,
    description: (doc.description as string) ?? null,
    coverImageUrl: resolveImageUrl(doc.coverImage),
    externalUrl: (doc.externalUrl as string) ?? null,
    ctaLabel: (doc.ctaLabel as string) ?? null,
    location: (doc.location as string) ?? null,
    featured: (doc.featured as boolean) ?? false,
  }
}

export class PayloadEventAdapter implements EventRepository {
  async findUpcoming(): Promise<PlanningEvent[]> {
    const payload = await getPayload({ config })
    const now = new Date().toISOString()

    const result = await payload.find({
      collection: 'events',
      where: {
        startDate: { greater_than_equal: now },
      },
      sort: 'startDate',
      limit: 50,
    })

    return result.docs.map((doc) => mapEvent(doc as unknown as Record<string, unknown>))
  }

  async findPast(limit = 20): Promise<PlanningEvent[]> {
    const payload = await getPayload({ config })
    const now = new Date().toISOString()

    const result = await payload.find({
      collection: 'events',
      where: {
        startDate: { less_than: now },
      },
      sort: '-startDate',
      limit,
    })

    return result.docs.map((doc) => mapEvent(doc as unknown as Record<string, unknown>))
  }
}

// ── Singletons ───────────────────────────────────────────────────────────
import { createSingleton } from '@/lib/singleton'

export const getPayloadPlanningPageAdapter = createSingleton(() => new PayloadPlanningPageAdapter())
export const getPayloadEventAdapter = createSingleton(() => new PayloadEventAdapter())
