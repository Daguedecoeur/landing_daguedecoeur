import { createClient } from '@/lib/supabase/server'
import type { Profile, ProfileRepository, NewsletterPrefs } from '../domain/profile.model'
import { getBrevoAdapter } from '@/features/newsletter/infrastructure/brevo.adapter'
import { BREVO_LIST_IDS } from '@/features/newsletter/domain/newsletter.constants'



export class SupabaseProfileAdapter implements ProfileRepository {
  async getProfile(userId: string): Promise<Profile> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Attempt to read the profiles table; graceful fallback if it doesn't exist yet
    const { data: profileRow } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()


    const provider = user?.app_metadata?.provider ?? 'email'
    const discordId = provider === 'discord' ? user?.user_metadata?.provider_id : profileRow?.discord_id

    // ─── Avatar: custom upload (profiles.avatar_url) takes priority ──
    // If no custom photo uploaded, fall back to current OAuth provider avatar (always fresh)
    const avatarUrl = profileRow?.avatar_url ?? user?.user_metadata?.avatar_url ?? null

    // ─── Brevo is source of truth for newsletter subscriptions ──
    let newsletterDebutant = profileRow?.newsletter_debutant ?? true
    let newsletterRegulier = profileRow?.newsletter_regulier ?? true
    let newsletterMensuel = profileRow?.newsletter_mensuel ?? true

    if (user?.email) {
      try {
        const brevo = getBrevoAdapter()
        const listIds = await brevo.getContactListIds(user.email)
        newsletterDebutant = listIds.includes(BREVO_LIST_IDS.debutant)
        newsletterRegulier = listIds.includes(BREVO_LIST_IDS.regulier)
        newsletterMensuel = listIds.includes(BREVO_LIST_IDS.mensuel)
      } catch {
        // Brevo unavailable: keep Supabase values as fallback
      }
    }



    return {
      id: userId,
      email: user?.email ?? '',
      displayName: user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? '',
      avatarUrl,
      discordId,
      patreonTier: profileRow?.patreon_tier ?? undefined,
      firstName: profileRow?.first_name ?? undefined,
      lastName: profileRow?.last_name ?? undefined,
      country: profileRow?.country ?? undefined,
      provider,
      newsletterDebutant,
      newsletterRegulier,
      newsletterMensuel,
    }
  }


  async updatePersonalData(userId: string, data: Partial<Pick<Profile, 'firstName' | 'lastName' | 'country'>>): Promise<void> {
    const supabase = await createClient()
    await supabase.from('profiles').upsert({
      id: userId,
      first_name: data.firstName,
      last_name: data.lastName,
      country: data.country,
      updated_at: new Date().toISOString(),
    })
  }

  async updateNewsletter(userId: string, prefs: NewsletterPrefs): Promise<void> {
    const supabase = await createClient()
    await supabase.from('profiles').upsert({
      id: userId,
      newsletter_debutant: prefs.newsletterDebutant,
      newsletter_regulier: prefs.newsletterRegulier,
      newsletter_mensuel: prefs.newsletterMensuel,
      updated_at: new Date().toISOString(),
    })
  }

  async updatePassword(newPassword: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw new Error(error.message)
  }
}
