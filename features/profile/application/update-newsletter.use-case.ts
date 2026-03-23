import type { ProfileRepository, NewsletterPrefs } from '../domain/profile.model'

export class UpdateNewsletterUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(userId: string, prefs: NewsletterPrefs): Promise<void> {
    return this.repository.updateNewsletter(userId, prefs)
  }
}
