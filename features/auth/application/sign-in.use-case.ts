import type { AuthRepository, AuthResult } from '../domain/auth.model'

export class SignInUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResult> {
    return this.repository.signInWithPassword(email, password)
  }
}
