import type { ProjectsPageContent, ProjectsPageRepository } from '../domain/location.model'

export class GetProjectsPageUseCase {
  constructor(private readonly repository: ProjectsPageRepository) {}

  async execute(): Promise<ProjectsPageContent> {
    return this.repository.getProjectsPage()
  }
}
