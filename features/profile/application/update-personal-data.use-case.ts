import type { ProfileRepository, Profile } from '../domain/profile.model'

export class UpdatePersonalDataUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(userId: string, data: Partial<Pick<Profile, 'firstName' | 'lastName' | 'country'>>): Promise<void> {
    return this.repository.updatePersonalData(userId, data)
  }
}
