import type { AuthRepository, AuthResult, AuthProvider } from '../domain/auth.model'

export class SignInOAuthUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(provider: AuthProvider, redirectTo?: string): Promise<AuthResult> {
    return this.repository.signInWithOAuth(provider, redirectTo)
  }
}
