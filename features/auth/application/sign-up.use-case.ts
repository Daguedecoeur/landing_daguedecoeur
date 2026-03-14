import type { AuthRepository, AuthResult } from '../domain/auth.model'

export class SignUpUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResult> {
    return this.repository.signUp(email, password)
  }
}
