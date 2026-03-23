import { getPayload } from 'payload'
import config from '@/payload.config'
import type {
  ProjectsPageContent,
  ProjectsPageRepository,
  LocationItem,
} from '../domain/location.model'
import type { Media } from '@/payload-types'

// ── Fallback ──────────────────────────────────────────────────────────────
function getFallback(): ProjectsPageContent {
  return {
    locations: [
      {
        title: 'Dagues & Dragons',
        subtitle: 'Salle Immersive de Jeu de Rôle • Chartres',
        slug: 'dagues-dragons',
        description:
          "Plongez dans une expérience de jeu de rôle unique au cœur de Chartres. Notre salle immersive vous transporte dans un univers de dark fantasy avec décors cinématographiques, lumières et musiques synchronisées.",
        ctaLabel: 'Découvrir le lieu →',
        ctaHref: '/salle-immersive',
        imageUrl: '/images/locations/dagues-dragons.png',
      },
      {
        title: 'Studio Dédale',
        subtitle: 'Studio Audiovisuel • Chartres',
        slug: 'studio-dedale',
        description:
          "Un studio de production audiovisuelle dédié à la création de contenus immersifs. Captation sonore professionnelle, montage, étalonnage et post-production.",
        ctaLabel: 'Découvrir le studio →',
        ctaHref: '/studio-dedale',
        imageUrl: '/images/locations/studio-dedale.png',
      },
      {
        title: 'Le Tréfon',
        subtitle: 'Bar à Jeux Heroic Fantasy • Chartres',
        slug: 'le-trefon',
        description:
          "Où les ombres murmurent des secrets oubliés et où l'hydromel coule comme l'or pur. Une taverne mystique pour des soirées mémorables autour de jeux de société.",
        ctaLabel: 'Découvrir Le Tréfon →',
        ctaHref: '/trefon',
        imageUrl: '/images/locations/le-trefon.png',
      },
      {
        title: 'Actual Play',
        subtitle: 'Émission de Jeu de Rôle en direct',
        slug: 'actual-play',
        description:
          "Suivez nos aventures épiques en direct ! Notre émission de jeu de rôle Daggerheart vous plonge au cœur de récits captivants, diffusés en live et disponibles en replay.",
        ctaLabel: 'Voir les épisodes →',
        ctaHref: '/actual-play',
        imageUrl: '/images/locations/actual-play.png',
      },
    ],
  }
}

function extractImageUrl(image: unknown): string {
  if (typeof image === 'object' && image !== null) {
    return (image as Media).url ?? ''
  }
  return ''
}

// ── Adapter ───────────────────────────────────────────────────────────────
export class PayloadProjectsPageAdapter implements ProjectsPageRepository {
  async getProjectsPage(): Promise<ProjectsPageContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'projects-and-locations' })

      const rawLocations = data.locations as Array<Record<string, unknown>> | undefined
      if (!rawLocations || rawLocations.length === 0) {
        return getFallback()
      }

      const fallbackImages: Record<string, string> = {
        'dagues-dragons': '/images/locations/dagues-dragons.png',
        'studio-dedale': '/images/locations/studio-dedale.png',
        'le-trefon': '/images/locations/le-trefon.png',
        'actual-play': '/images/locations/actual-play.png',
      }

      const locations: LocationItem[] = rawLocations.map((loc) => {
        const slug = (loc.slug as string) ?? ''
        const cmsImage = extractImageUrl(loc.image)

        return {
          title: (loc.title as string) ?? '',
          subtitle: (loc.subtitle as string) ?? '',
          slug,
          description: (loc.description as string) ?? '',
          ctaLabel: (loc.ctaLabel as string) ?? 'Découvrir →',
          ctaHref: (loc.ctaHref as string) ?? '#',
          imageUrl: cmsImage || fallbackImages[slug] || '',
        }
      })

      return { locations }
    } catch (error) {
      console.error('[PayloadProjectsPageAdapter]', error)
      return getFallback()
    }
  }
}

// ── Singleton ─────────────────────────────────────────────────────────────
import { createSingleton } from '@/lib/singleton'

export const getPayloadProjectsPageAdapter = createSingleton(() => new PayloadProjectsPageAdapter())
