import { createClient } from '@/lib/supabase/server'
import type { AuthRepository, AuthResult, AuthUser, AuthProvider } from '../domain/auth.model'

export class SupabaseAuthAdapter implements AuthRepository {
  async signInWithPassword(email: string, password: string): Promise<AuthResult> {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async signInWithMagicLink(email: string): Promise<AuthResult> {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${getBaseUrl()}/api/auth-callback`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async signInWithOAuth(provider: AuthProvider): Promise<AuthResult> {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${getBaseUrl()}/api/auth-callback`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, redirectUrl: data.url }
  }

  async signUp(email: string, password: string): Promise<AuthResult> {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getBaseUrl()}/api/auth-callback`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async signOut(): Promise<AuthResult> {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async getUser(): Promise<AuthUser | null> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    return {
      id: user.id,
      email: user.email ?? '',
      displayName: user.user_metadata?.full_name ?? user.email?.split('@')[0],
    }
  }
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}
