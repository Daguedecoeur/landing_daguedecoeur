'use client'

import { PlanningLayout } from './presentation/PlanningLayout'
import type { PlanningHeroContent, PlanningEvent } from './domain/planning.model'

interface PlanningViewProps {
  hero: PlanningHeroContent
  upcomingEvents: PlanningEvent[]
  pastEvents: PlanningEvent[]
}

export default function PlanningView({ hero, upcomingEvents, pastEvents }: PlanningViewProps) {
  return (
    <PlanningLayout
      hero={hero}
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  )
}
