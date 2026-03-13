import type { SiteSettingsContent, SiteSettingsRepository } from '../domain/navigation.model'

export class GetSiteSettingsUseCase {
  constructor(private readonly repository: SiteSettingsRepository) {}

  async execute(): Promise<SiteSettingsContent> {
    return this.repository.getSiteSettings()
  }
}
