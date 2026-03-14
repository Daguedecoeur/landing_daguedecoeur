import type { ProfileRepository } from '../domain/profile.model'

export class UpdatePasswordUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  async execute(newPassword: string): Promise<void> {
    return this.repository.updatePassword(newPassword)
  }
}
