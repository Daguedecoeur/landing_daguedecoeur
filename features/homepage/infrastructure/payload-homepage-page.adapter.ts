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
    faq: {
      title: '❓ Foire Aux Questions (FAQ) Daggerheart & JDR',
      items: [
        {
          question: "Qu'est-ce que Daggerheart ?",
          answer: "Daggerheart est un nouveau jeu de rôle sur table (JDR) créé par Darrington Press et l'équipe célèbre de Critical Role. Contrairement aux systèmes classiques, il se concentre sur une narration dynamique et cinématographique grâce à son système unique de lancer à deux dés à 12 faces (2d12), représentant l'Espoir et la Peur.",
        },
        {
          question: 'Le jeu Daggerheart est-il disponible en français (VF) ?',
          answer: "Le jeu officiel est actuellement en cours de traduction en français, mais la communauté francophone est très active ! Sur Dague de Cœur, nous vous mettons à disposition des ressources traduites, des guides vidéos et un kit d'initiation gratuit en français pour vous permettre de jouer sans attendre la sortie officielle.",
        },
        {
          question: 'Quelle est la différence entre Daggerheart et Donjons & Dragons (D&D 5e) ?',
          answer: "Là où D&D 5e utilise un dé à 20 faces (d20) et des règles tactiques poussées, Daggerheart utilise un système de 2d12 (un dé d'Espoir et un dé de Peur). Cela signifie que même en cas d'échec, l'histoire avance avec des rebondissements narratifs. De plus, la création de personnage est beaucoup plus rapide et visuelle grâce à un système de cartes de capacités.",
        },
        {
          question: 'Comment débuter facilement avec Daggerheart ?',
          answer: "Il n'y a pas besoin de lire un manuel de 300 pages pour commencer ! Téléchargez simplement le kit d'initiation gratuit mise à disposition. Il contient les règles de base simplifiées, des fiches prêtes à jouer et un scénario court. En 30 minutes, vous et vos amis serez prêts à lancer les dés.",
        },
        {
          question: 'Peut-on venir jouer avec vous en vrai (IRL) ?',
          answer: "Absolument ! Si vous passez par Chartres, vous pouvez réserver une session épique dans notre salle immersive Dagues & Dragons. Grâce au Studio Dédale, vous jouerez dans un vrai décor de cinéma avec lumières et musiques synchronisées, et vous pourrez même prolonger la soirée à notre taverne fantastique, Le Tréfon.",
        },
      ],
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
      const faq = data.faq as Record<string, unknown> | undefined

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
        faq: {
          title: (faq?.title as string) ?? getFallback().faq.title,
          items: ((faq?.items ?? []) as Array<Record<string, unknown>>).map((item) => ({
            question: (item.question as string) ?? '',
            answer: (item.answer as string) ?? '',
          })),
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
