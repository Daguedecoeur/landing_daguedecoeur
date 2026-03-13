// ─── Auth User ───────────────────────────────────────────────
export interface AuthUser {
  id: string
  email: string
  displayName?: string
}

// ─── Auth Provider ───────────────────────────────────────────
export type AuthProvider = 'google' | 'discord'

// ─── Auth Result ─────────────────────────────────────────────
export interface AuthResult {
  success: boolean
  error?: string
  redirectUrl?: string
}

// ─── Repository Port ─────────────────────────────────────────
export interface AuthRepository {
  signInWithPassword(email: string, password: string): Promise<AuthResult>
  signInWithMagicLink(email: string): Promise<AuthResult>
  signInWithOAuth(provider: AuthProvider): Promise<AuthResult>
  signUp(email: string, password: string): Promise<AuthResult>
  signOut(): Promise<AuthResult>
  getUser(): Promise<AuthUser | null>
}
