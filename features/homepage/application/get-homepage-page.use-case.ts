import type { HomepagePageContent, HomepagePageRepository } from '../domain/homepage-page.model'

export class GetHomepagePageUseCase {
  constructor(private readonly repository: HomepagePageRepository) {}

  async execute(): Promise<HomepagePageContent> {
    return this.repository.getHomepagePage()
  }
}
