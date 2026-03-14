import type { AuthRepository, AuthResult } from '../domain/auth.model'

export class SignInMagicLinkUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(email: string, redirectTo?: string): Promise<AuthResult> {
    return this.repository.signInWithMagicLink(email, redirectTo)
  }
}
