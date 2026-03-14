'use server'

import { getBrevoAdapter } from '@/features/newsletter/infrastructure/brevo.adapter'
import { BREVO_LIST_IDS } from '@/features/newsletter/domain/newsletter.constants'
import { verifyNewsletterToken } from '@/lib/hmac'

export interface NewsletterPrefsPublic {
  newsletterDebutant: boolean
  newsletterRegulier: boolean
  newsletterMensuel: boolean
}

export async function getNewsletterPreferencesAction(
  email: string,
  token: string
): Promise<{ prefs?: NewsletterPrefsPublic; error?: string }> {
  if (!verifyNewsletterToken(email, token)) {
    return { error: 'Lien invalide ou expiré.' }
  }

  try {
    const brevo = getBrevoAdapter()
    const listIds = await brevo.getContactListIds(email)
    return {
      prefs: {
        newsletterDebutant: listIds.includes(BREVO_LIST_IDS.debutant),
        newsletterRegulier: listIds.includes(BREVO_LIST_IDS.regulier),
        newsletterMensuel: listIds.includes(BREVO_LIST_IDS.mensuel),
      },
    }
  } catch {
    return { error: 'Impossible de charger vos préférences.' }
  }
}

export async function updateNewsletterPreferencesAction(
  formData: FormData
): Promise<{ success?: string; error?: string }> {
  const email = formData.get('email') as string
  const token = formData.get('token') as string

  if (!email || !token || !verifyNewsletterToken(email, token)) {
    return { error: 'Lien invalide ou expiré.' }
  }

  const prefs = {
    newsletterDebutant: formData.get('newsletterDebutant') === 'true',
    newsletterRegulier: formData.get('newsletterRegulier') === 'true',
    newsletterMensuel: formData.get('newsletterMensuel') === 'true',
  }

  try {
    const brevo = getBrevoAdapter()
    await brevo.syncNewsletterLists(
      email,
      email.split('@')[0],
      [
        { listId: BREVO_LIST_IDS.debutant, subscribed: prefs.newsletterDebutant },
        { listId: BREVO_LIST_IDS.regulier, subscribed: prefs.newsletterRegulier },
        { listId: BREVO_LIST_IDS.mensuel, subscribed: prefs.newsletterMensuel },
      ]
    )
    return { success: 'Préférences mises à jour !' }
  } catch {
    return { error: 'Erreur lors de la mise à jour.' }
  }
}
