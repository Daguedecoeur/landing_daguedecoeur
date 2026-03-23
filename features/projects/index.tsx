"use client"

import type { ProjectsPageContent } from './domain/location.model'
import { LocationSlider } from './presentation/LocationSlider'

interface ProjectsViewProps {
  page: ProjectsPageContent
}

export default function ProjectsView({ page }: ProjectsViewProps) {
  return (
    <main>
      <LocationSlider locations={page.locations} />
    </main>
  )
}
