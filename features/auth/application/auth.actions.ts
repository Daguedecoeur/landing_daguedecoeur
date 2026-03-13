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

// ─── Composition Root ────────────────────────────────────────
function getRepository() {
  return new SupabaseAuthAdapter()
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

  redirect('/')
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
  const result = await useCase.execute(parsed.data.email)

  if (!result.success) {
    return { error: result.error }
  }

  return { success: 'Un lien de connexion a été envoyé à ton adresse email !' }
}

export async function signInOAuthAction(provider: AuthProvider) {
  const useCase = new SignInOAuthUseCase(getRepository())
  const result = await useCase.execute(provider)

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
