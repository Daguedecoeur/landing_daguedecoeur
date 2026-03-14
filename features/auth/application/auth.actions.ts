'use server'

import { redirect } from 'next/navigation'
import { LoginSchema, SignUpSchema, MagicLinkSchema } from '../domain/auth.schema'
import type { AuthProvider } from '../domain/auth.model'
import { SupabaseAuthAdapter } from '../infrastructure/supabase-auth.adapter'
import { SignInUseCase } from './sign-in.use-case'
import { SignUpUseCase } from './sign-up.use-case'
import { SignInMagicLinkUseCase } from './sign-in-magic-link.use-case'
import { SignInOAuthUseCase } from './sign-in-oauth.use-case'
import { SignOutUseCase } from './sign-out.use-case'
import { getBrevoAdapter } from '@/features/newsletter/infrastructure/brevo.adapter'
import { ALL_BREVO_LIST_IDS } from '@/features/newsletter/domain/newsletter.constants'

// ─── Composition Root ────────────────────────────────────────
function getRepository() {
  return new SupabaseAuthAdapter()
}

// ─── Helpers ─────────────────────────────────────────────────

/** Only allow relative paths (prevents open-redirect attacks). */
function sanitizeRedirectUrl(url: string | null | undefined): string {
  if (!url) return '/'
  // Must start with / and not be a protocol-relative URL (//)
  if (url.startsWith('/') && !url.startsWith('//')) return url
  return '/'
}

// ─── Server Actions ──────────────────────────────────────────

export async function signInAction(formData: FormData) {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = LoginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const useCase = new SignInUseCase(getRepository())
  const result = await useCase.execute(parsed.data.email, parsed.data.password)

  if (!result.success) {
    return { error: result.error }
  }

  const redirectTo = sanitizeRedirectUrl(formData.get('redirectTo') as string)
  redirect(redirectTo)
}

export async function signUpAction(formData: FormData) {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
  }

  const parsed = SignUpSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const useCase = new SignUpUseCase(getRepository())
  const result = await useCase.execute(parsed.data.email, parsed.data.password)

  if (!result.success) {
    return { error: result.error }
  }

  // ─── Auto-subscribe to all 3 newsletters on signup ──────────
  try {
    const brevo = getBrevoAdapter()
    const displayName = parsed.data.email.split('@')[0]
    await Promise.all(ALL_BREVO_LIST_IDS.map((listId) =>
      brevo.addContactToList(parsed.data.email, displayName, listId)
    ))
  } catch (err) {
    console.error('[Brevo signup subscription]', err)
  }

  return { success: 'Vérifie ta boîte mail pour confirmer ton inscription !' }
}


export async function signInMagicLinkAction(formData: FormData) {
  const raw = {
    email: formData.get('email') as string,
  }

  const parsed = MagicLinkSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const useCase = new SignInMagicLinkUseCase(getRepository())
  const redirectTo = sanitizeRedirectUrl(formData.get('redirectTo') as string)
  const result = await useCase.execute(parsed.data.email, redirectTo)

  if (!result.success) {
    return { error: result.error }
  }

  return { success: 'Un lien de connexion a été envoyé à ton adresse email !' }
}

export async function signInOAuthAction(provider: AuthProvider, redirectTo?: string) {
  const safeRedirect = sanitizeRedirectUrl(redirectTo)
  const useCase = new SignInOAuthUseCase(getRepository())
  const result = await useCase.execute(provider, safeRedirect)

  if (!result.success) {
    return { error: result.error }
  }

  if (result.redirectUrl) {
    redirect(result.redirectUrl)
  }

  return { error: 'URL de redirection manquante' }
}

export async function signOutAction() {
  const useCase = new SignOutUseCase(getRepository())
  await useCase.execute()
  redirect('/')
}
