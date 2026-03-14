import type { AvatarRepository } from '../domain/profile.model'

export class UpdateAvatarUseCase {
  constructor(private readonly repository: AvatarRepository) {}

  async execute(userId: string, file: File): Promise<string> {
    return this.repository.uploadAvatar(userId, file)
  }
}
