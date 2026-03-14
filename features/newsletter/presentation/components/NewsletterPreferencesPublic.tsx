'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { updateNewsletterPreferencesAction } from '../../application/newsletter-preferences.actions'

interface PageContent {
  title: string
  subtitle: string
  unsubscribeWarning: string
  confirmLabel: string
  cancelLabel: string
  successMessage: string
  ctaTitle: string
  ctaDescription: string
  ctaButtonLabel: string
  ctaButtonHref: string
}

interface NewsletterPreferencesPublicProps {
  email: string
  token: string
  initialPrefs: {
    newsletterDebutant: boolean
    newsletterRegulier: boolean
    newsletterMensuel: boolean
  }
  content: PageContent
}

const NEWSLETTER_ITEMS = [
  { key: 'newsletterDebutant', label: 'Astuces MJ', description: 'Conseils pour les débutants', icon: '📜' },
  { key: 'newsletterRegulier', label: 'Conseils Avancés', description: 'Pour les joueurs réguliers', icon: '⚔️' },
  { key: 'newsletterMensuel', label: 'Le Grand Récap', description: 'Récapitulatif mensuel', icon: '📅' },
] as const

type NewsletterKey = 'newsletterDebutant' | 'newsletterRegulier' | 'newsletterMensuel'

export function NewsletterPreferencesPublic({
  email,
  token,
  initialPrefs,
  content,
}: NewsletterPreferencesPublicProps) {
  const [prefs, setPrefs] = useState(initialPrefs)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [isPending, startTransition] = useTransition()

  const allDisabled = !prefs.newsletterDebutant && !prefs.newsletterRegulier && !prefs.newsletterMensuel

  function handleSubmit() {
    if (allDisabled && !showWarning) {
      setShowWarning(true)
      return
    }

    const formData = new FormData()
    formData.set('email', email)
    formData.set('token', token)
    formData.set('newsletterDebutant', String(prefs.newsletterDebutant))
    formData.set('newsletterRegulier', String(prefs.newsletterRegulier))
    formData.set('newsletterMensuel', String(prefs.newsletterMensuel))

    startTransition(async () => {
      const result = await updateNewsletterPreferencesAction(formData)
      setFeedback(
        result.error
          ? { type: 'error', message: result.error }
          : { type: 'success', message: content.successMessage }
      )
      setShowWarning(false)
    })
  }

  function handleCancel() {
    setPrefs(initialPrefs)
    setShowWarning(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-cinzel text-3xl font-bold text-gold">{content.title}</h1>
          <p className="text-stone-500 text-sm">{content.subtitle}</p>
          <p className="text-stone-400 text-xs">{email}</p>
        </div>

        {/* Preferences card */}
        <section className="rounded-xl border border-gold/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-4">
          <h2 className="font-cinzel text-lg font-bold text-gold">Mes Newsletters</h2>

          <div className="space-y-3">
            {NEWSLETTER_ITEMS.map(({ key, label, description, icon }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                <div>
                  <p className="text-stone-800 text-sm font-medium">{icon} {label}</p>
                  <p className="text-stone-500 text-xs">{description}</p>
                </div>
                <Switch
                  id={key}
                  checked={prefs[key as NewsletterKey]}
                  onCheckedChange={(checked: boolean) => {
                    setPrefs((p) => ({ ...p, [key]: checked }))
                    setShowWarning(false)
                    setFeedback(null)
                  }}
                  className="data-[state=checked]:bg-gold"
                />
              </div>
            ))}
          </div>

          {/* Warning when all disabled */}
          {showWarning && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 space-y-3">
              <p className="text-amber-800 text-sm">{content.unsubscribeWarning}</p>
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isPending}
                  variant="destructive"
                  className="text-sm"
                >
                  {isPending ? 'Enregistrement…' : content.confirmLabel}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="text-sm border-gold/40 text-gold hover:bg-gold/5"
                >
                  {content.cancelLabel}
                </Button>
              </div>
            </div>
          )}

          {/* Save button (normal flow) */}
          {!showWarning && (
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-gold text-deep-violet hover:bg-gold-hover font-semibold font-cinzel"
            >
              {isPending ? 'Enregistrement…' : 'Sauvegarder'}
            </Button>
          )}

          {/* Feedback */}
          {feedback && (
            <p className={`text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.message}
            </p>
          )}
        </section>

        {/* CTA — create account */}
        <section className="rounded-xl border border-gold/20 bg-white/50 p-6 text-center space-y-3">
          <h3 className="font-cinzel text-lg font-bold text-gold">{content.ctaTitle}</h3>
          <p className="text-stone-500 text-sm">{content.ctaDescription}</p>
          <Link
            href={content.ctaButtonHref}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gold text-deep-violet text-sm font-semibold font-cinzel hover:bg-gold-hover transition-all hover:-translate-y-0.5"
          >
            {content.ctaButtonLabel} ✦
          </Link>
        </section>
      </div>
    </div>
  )
}
