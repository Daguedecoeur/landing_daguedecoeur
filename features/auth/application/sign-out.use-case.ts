import type { AuthRepository, AuthResult } from '../domain/auth.model'

export class SignOutUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(): Promise<AuthResult> {
    return this.repository.signOut()
  }
}
