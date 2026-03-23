import type { Metadata } from 'next'
import { GetProjectsPageUseCase } from '@/features/projects/application/get-projects-page.use-case'
import { getPayloadProjectsPageAdapter } from '@/features/projects/infrastructure/payload-projects-page.adapter'
import ProjectsView from '@/features/projects'

export const metadata: Metadata = {
  title: 'Nos Projets & Lieux | Dague de Cœur',
  description:
    'Découvrez nos lieux et projets : la salle immersive Dagues & Dragons, le Studio Dédale, le bar à jeux Le Tréfon et notre Actual Play Daggerheart à Chartres.',
}

export default async function ProjectsPage() {
  const adapter = getPayloadProjectsPageAdapter()
  const useCase = new GetProjectsPageUseCase(adapter)
  const page = await useCase.execute()

  return <ProjectsView page={page} />
}
