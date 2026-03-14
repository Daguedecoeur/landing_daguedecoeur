import { AboutPageData, AboutPageRepository } from '../domain/about-page.model'

export class GetAboutPageUseCase {
  constructor(private readonly repository: AboutPageRepository) {}

  async execute(): Promise<AboutPageData> {
    return this.repository.getAboutPage()
  }
}
