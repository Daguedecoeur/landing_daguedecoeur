import type { Metadata } from 'next'
import PlanningView from '@/features/planning'
import { GetPlanningPageUseCase } from '@/features/planning/application/get-planning-page.use-case'
import { GetEventsUseCase } from '@/features/planning/application/get-events.use-case'
import { getPayloadPlanningPageAdapter, getPayloadEventAdapter } from '@/features/planning/infrastructure/payload-planning.adapter'

export const metadata: Metadata = {
  title: 'Planning — Streams, Sorties & Conventions | Dague de Coeur',
  description:
    'Consultez le calendrier de la communauté Dague de Coeur : streams RPG, sorties de jeux Daggerheart et conventions à venir.',
  openGraph: {
    title: 'Planning — Dague de Coeur',
    description:
      'Ne manquez aucun événement de la communauté francophone Daggerheart.',
    images: ['/images/planning-hero-bg.png'],
  },
}

export const dynamic = 'force-dynamic'

export default async function PlanningPage() {
  const pageRepo = getPayloadPlanningPageAdapter()
  const eventRepo = getPayloadEventAdapter()

  const [pageContent, upcomingEvents, pastEvents] = await Promise.all([
    new GetPlanningPageUseCase(pageRepo).execute(),
    new GetEventsUseCase(eventRepo).executeUpcoming(),
    new GetEventsUseCase(eventRepo).executePast(20),
  ])

  return (
    <PlanningView
      hero={pageContent.hero}
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  )
}
