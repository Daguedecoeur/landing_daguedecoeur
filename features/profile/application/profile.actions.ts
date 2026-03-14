'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { SupabaseProfileAdapter } from '../infrastructure/supabase-profile.adapter'
import { UpdatePersonalDataUseCase } from './update-personal-data.use-case'
import { UpdateNewsletterUseCase } from './update-newsletter.use-case'
import { UpdatePasswordUseCase } from './update-password.use-case'
import { UpdatePersonalDataSchema, UpdateNewsletterSchema, UpdatePasswordSchema } from '../domain/profile.schema'
import { getBrevoAdapter } from '@/features/newsletter/infrastructure/brevo.adapter'
import { BREVO_LIST_IDS } from '@/features/newsletter/domain/newsletter.constants'
import { UpdateAvatarUseCase } from './update-avatar.use-case'
import { SupabaseAvatarAdapter } from '../infrastructure/supabase-avatar.adapter'

// ─── Composition Root ─────────────────────────────────────────
function getRepository() {
  return new SupabaseProfileAdapter()
}

async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}

// ─── Server Actions ───────────────────────────────────────────

export async function updateAvatarAction(formData: FormData): Promise<{ success?: string; avatarUrl?: string; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non authentifié.' }

  const file = formData.get('avatar') as File | null
  if (!file || file.size === 0) return { error: 'Aucun fichier sélectionné.' }
  if (file.size > 5 * 1024 * 1024) return { error: 'Image trop grande (max 5 Mo).' }
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
    return { error: 'Format non supporté (JPG, PNG, WebP, GIF uniquement).' }
  }

  try {
    const repository = new SupabaseAvatarAdapter(supabase)
    const useCase = new UpdateAvatarUseCase(repository)
    const avatarUrl = await useCase.execute(user.id, file)
    revalidatePath('/compte')
    return { success: 'Photo mise à jour !', avatarUrl }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Erreur lors de l\'upload.' }
  }
}

export async function updatePersonalDataAction(formData: FormData) {
  const userId = await getCurrentUserId()
  if (!userId) return { error: 'Non authentifié.' }

  const raw = {
    firstName: formData.get('firstName') as string | undefined,
    lastName: formData.get('lastName') as string | undefined,
    country: formData.get('country') as string | undefined,
  }

  const parsed = UpdatePersonalDataSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  // 1. Save to Supabase
  const useCase = new UpdatePersonalDataUseCase(getRepository())
  await useCase.execute(userId, parsed.data)

  // 2. Sync name to Brevo contact attributes (non-blocking)
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      await getBrevoAdapter().updateContactAttributes(user.email, {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
      })
    }
  } catch (err) {
    console.error('[Brevo name sync]', err)
  }

  revalidatePath('/compte')
  return { success: 'Informations enregistrées !' }
}


export async function updateNewsletterAction(formData: FormData) {
  const userId = await getCurrentUserId()
  if (!userId) return { error: 'Non authentifié.' }

  const raw = {
    newsletterDebutant: formData.get('newsletterDebutant') === 'true',
    newsletterRegulier: formData.get('newsletterRegulier') === 'true',
    newsletterMensuel: formData.get('newsletterMensuel') === 'true',
  }

  const parsed = UpdateNewsletterSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  // 1. Save to Supabase
  const useCase = new UpdateNewsletterUseCase(getRepository())
  await useCase.execute(userId, parsed.data)

  // 2. Sync with Brevo lists
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      await getBrevoAdapter().syncNewsletterLists(
        user.email,
        user.user_metadata?.full_name ?? user.email.split('@')[0],
        [
          { listId: BREVO_LIST_IDS.debutant, subscribed: parsed.data.newsletterDebutant },
          { listId: BREVO_LIST_IDS.regulier, subscribed: parsed.data.newsletterRegulier },
          { listId: BREVO_LIST_IDS.mensuel, subscribed: parsed.data.newsletterMensuel },
        ]
      )
    }
  } catch (err) {
    console.error('[Brevo sync]', err)
  }

  revalidatePath('/compte')
  return { success: 'Préférences enregistrées !' }
}


export async function updatePasswordAction(formData: FormData) {
  const userId = await getCurrentUserId()
  if (!userId) return { error: 'Non authentifié.' }

  const raw = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const parsed = UpdatePasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    const useCase = new UpdatePasswordUseCase(getRepository())
    await useCase.execute(parsed.data.password)
    return { success: 'Mot de passe mis à jour !' }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Erreur inconnue.' }
  }
}
