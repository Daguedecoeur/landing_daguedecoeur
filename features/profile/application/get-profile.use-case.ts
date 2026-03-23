import type { ProfileRepository, Profile } from '../domain/profile.model'

export class GetProfileUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(userId: string): Promise<Profile> {
    return this.repository.getProfile(userId)
  }
}
