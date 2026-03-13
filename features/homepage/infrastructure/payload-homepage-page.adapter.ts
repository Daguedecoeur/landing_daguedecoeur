import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  HomepagePageContent,
  HomepagePageRepository,
} from '../domain/homepage-page.model'

// ── Fallback (used when Payload has no saved data yet) ──────────────────
function getFallback(): HomepagePageContent {
  return {
    hero: {
      titleStart: 'Lancez-vous dans le Jeu de Rôle avec',
      titleHighlight: 'Daggerheart',
      subtitle:
        "Rejoignez la 1ère communauté francophone de Daggerheart ! Initiation rapide au JDR, conseils de MJ et kit de démarrage gratuit à télécharger ici.",
      ctaLabel: '👇 TÉLÉCHARGER MON KIT DAGGERHEART GRATUIT',
      socialProof:
        'Rejoignez déjà + 300 joueurs sur le Discord, + de 1000 abonnés sur nos réseaux et + de 500 inscrits à la newsletter.',
    },
    features: {
      titleStart: 'Pourquoi choisir',
      titleHighlight: 'Daggerheart',
      titleEnd: 'pour débuter le JDR ?',
      items: [
        {
          title: 'Une création Critical Role',
          description:
            'Un système de jeu moderne, narratif et ultra-dynamique pensé par les créateurs du plus grand Actual Play au monde.',
        },
        {
          title: 'Le système Espoir & Peur',
          description:
            "Oubliez le simple dé à 20 faces. Avec seulement 2 dés à 12 faces, même vos échecs font avancer l'histoire avec des rebondissements inattendus.",
        },
        {
          title: 'Création de perso express',
          description:
            "Grâce à un système de cartes de capacités très visuel, créez votre héros unique en quelques minutes, sans calculs complexes.",
        },
      ],
      videoCta: '▶️ Voir le tutoriel vidéo signé par BBE',
      videoUrl: 'https://www.youtube.com/watch?v=mX-ZTfLZeGg',
    },
    kit: {
      titleStart: 'Que contient votre',
      titleHighlight: "Kit d'Initiation Gratuit",
      titleEnd: ' ?',
      publisherNote: 'Publié par Black Book Editions',
      sectionLabel: 'Votre butin pour démarrer :',
      items: [
        {
          title: 'Les règles de base :',
          description: 'Résumées et traduites en VF.',
        },
        {
          title: 'Un mini-scénario clé en main :',
          description: 'Parfait pour votre toute première partie en tant que MJ.',
        },
        {
          title: 'Des fiches de personnages :',
          description: 'Des héros pré-tirés prêts à lancer les dés.',
        },
      ],
      ctaLabel: 'JE VEUX MON KIT GRATUIT',
    },
  }
}

function isEmpty(data: Record<string, unknown>): boolean {
  return !data.hero || !(data.hero as Record<string, unknown>).titleStart
}

// ── Adapter ───────────────────────────────────────────────────────────────
export class PayloadHomepagePageAdapter implements HomepagePageRepository {
  async getHomepagePage(): Promise<HomepagePageContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'homepage' })

      if (isEmpty(data as unknown as Record<string, unknown>)) {
        return getFallback()
      }

      const hero = data.hero as Record<string, unknown> | undefined
      const features = data.features as Record<string, unknown> | undefined
      const kit = data.kit as Record<string, unknown> | undefined

      return {
        hero: {
          titleStart: (hero?.titleStart as string) ?? getFallback().hero.titleStart,
          titleHighlight: (hero?.titleHighlight as string) ?? getFallback().hero.titleHighlight,
          subtitle: (hero?.subtitle as string) ?? getFallback().hero.subtitle,
          ctaLabel: (hero?.ctaLabel as string) ?? getFallback().hero.ctaLabel,
          socialProof: (hero?.socialProof as string) ?? getFallback().hero.socialProof,
        },
        features: {
          titleStart: (features?.titleStart as string) ?? getFallback().features.titleStart,
          titleHighlight: (features?.titleHighlight as string) ?? getFallback().features.titleHighlight,
          titleEnd: (features?.titleEnd as string) ?? getFallback().features.titleEnd,
          items: ((features?.items ?? []) as Array<Record<string, unknown>>).map((item) => ({
            title: (item.title as string) ?? '',
            description: (item.description as string) ?? '',
          })),
          videoCta: (features?.videoCta as string) ?? getFallback().features.videoCta,
          videoUrl: (features?.videoUrl as string) ?? getFallback().features.videoUrl,
        },
        kit: {
          titleStart: (kit?.titleStart as string) ?? getFallback().kit.titleStart,
          titleHighlight: (kit?.titleHighlight as string) ?? getFallback().kit.titleHighlight,
          titleEnd: (kit?.titleEnd as string) ?? getFallback().kit.titleEnd,
          publisherNote: (kit?.publisherNote as string) ?? getFallback().kit.publisherNote,
          sectionLabel: (kit?.sectionLabel as string) ?? getFallback().kit.sectionLabel,
          items: ((kit?.items ?? []) as Array<Record<string, unknown>>).map((item) => ({
            title: (item.title as string) ?? '',
            description: (item.description as string) ?? '',
          })),
          ctaLabel: (kit?.ctaLabel as string) ?? getFallback().kit.ctaLabel,
        },
      }
    } catch {
      return getFallback()
    }
  }
}

// ── Singleton ─────────────────────────────────────────────────────────────
let adapter: PayloadHomepagePageAdapter | null = null

export function getPayloadHomepagePageAdapter(): PayloadHomepagePageAdapter {
  if (!adapter) adapter = new PayloadHomepagePageAdapter()
  return adapter
}
