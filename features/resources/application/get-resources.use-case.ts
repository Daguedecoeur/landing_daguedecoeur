import { ResourcesPageData, ResourcesRepository } from '../domain/resources.model'

export class GetResourcesUseCase {
  constructor(private readonly repository: ResourcesRepository) {}

  async execute(): Promise<ResourcesPageData> {
    return this.repository.getResources()
  }
}
