import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getNewsletterPreferencesAction } from '@/features/newsletter/application/newsletter-preferences.actions'
import { NewsletterPreferencesPublic } from '@/features/newsletter/presentation/components/NewsletterPreferencesPublic'

export const metadata: Metadata = {
  title: 'Préférences Newsletter | Dague de Cœur',
  description: 'Gérez vos abonnements aux newsletters Dague de Cœur.',
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: Promise<{ email?: string; token?: string }>
}

const DEFAULT_CONTENT = {
  title: 'Vos Préférences Newsletter',
  subtitle: 'Choisissez les newsletters que vous souhaitez recevoir.',
  unsubscribeWarning: 'Quel dommage de vous voir partir… Vous manquerez nos meilleurs conseils de Maître du Jeu et nos récaps mensuels.',
  confirmLabel: 'Oui, je suis sûr(e)',
  cancelLabel: 'Non, je reste !',
  successMessage: 'Vos préférences ont été mises à jour !',
  ctaTitle: 'Envie de rejoindre la communauté ?',
  ctaDescription: 'Créez un compte pour accéder à tous vos outils de Maître du Jeu, gérer votre profil et bien plus encore.',
  ctaButtonLabel: 'Créer un compte',
  ctaButtonHref: '/signup',
}

export default async function NewsletterPreferencesPage({ searchParams }: PageProps) {
  const { email, token } = await searchParams

  if (!email || !token) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-cinzel text-2xl font-bold text-gold">Lien invalide</h1>
          <p className="text-stone-500 text-sm">Ce lien ne contient pas les informations nécessaires.</p>
        </div>
      </main>
    )
  }

  const { prefs, error } = await getNewsletterPreferencesAction(email, token)

  if (error || !prefs) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-cinzel text-2xl font-bold text-gold">Lien invalide</h1>
          <p className="text-stone-500 text-sm">{error ?? 'Ce lien est invalide ou a expiré.'}</p>
        </div>
      </main>
    )
  }

  // Fetch CMS content (with fallback)
  let content = DEFAULT_CONTENT
  try {
    const payload = await getPayload({ config: configPromise })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await payload.findGlobal({ slug: 'newsletter-preferences-page' as any }) as Record<string, unknown>
    if (data) {
      content = {
        title: (data.title as string) ?? DEFAULT_CONTENT.title,
        subtitle: (data.subtitle as string) ?? DEFAULT_CONTENT.subtitle,
        unsubscribeWarning: (data.unsubscribeWarning as string) ?? DEFAULT_CONTENT.unsubscribeWarning,
        confirmLabel: (data.confirmLabel as string) ?? DEFAULT_CONTENT.confirmLabel,
        cancelLabel: (data.cancelLabel as string) ?? DEFAULT_CONTENT.cancelLabel,
        successMessage: (data.successMessage as string) ?? DEFAULT_CONTENT.successMessage,
        ctaTitle: (data.ctaTitle as string) ?? DEFAULT_CONTENT.ctaTitle,
        ctaDescription: (data.ctaDescription as string) ?? DEFAULT_CONTENT.ctaDescription,
        ctaButtonLabel: (data.ctaButtonLabel as string) ?? DEFAULT_CONTENT.ctaButtonLabel,
        ctaButtonHref: (data.ctaButtonHref as string) ?? DEFAULT_CONTENT.ctaButtonHref,
      }
    }
  } catch {
    // Payload unavailable — use defaults
  }

  return <NewsletterPreferencesPublic email={email} token={token} initialPrefs={prefs} content={content} />
}
