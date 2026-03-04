import { HomepageContent, HomepageContentRepository } from '../domain/homepage-content.model'

export class GetHomepageContentUseCase {
  constructor(private readonly repository: HomepageContentRepository) {}

  async execute(): Promise<HomepageContent> {
    return this.repository.getHomepageContent()
  }
}
