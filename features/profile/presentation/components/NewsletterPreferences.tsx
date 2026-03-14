'use client'

import { useState, useTransition } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { updateNewsletterAction } from '../../application/profile.actions'
import type { Profile } from '../../domain/profile.model'

interface NewsletterPreferencesProps {
  profile: Pick<Profile, 'newsletterDebutant' | 'newsletterRegulier' | 'newsletterMensuel'>
}

const NEWSLETTER_ITEMS = [
  { key: 'newsletterDebutant', label: 'Astuces MJ', description: 'Conseils pour les débutants', icon: '📜' },
  { key: 'newsletterRegulier', label: 'Conseils Avancés', description: 'Pour les joueurs réguliers', icon: '⚔️' },
  { key: 'newsletterMensuel', label: 'Le Grand Récap', description: 'Récapitulatif mensuel', icon: '📅' },
] as const

type NewsletterKey = 'newsletterDebutant' | 'newsletterRegulier' | 'newsletterMensuel'

export function NewsletterPreferences({ profile }: NewsletterPreferencesProps) {
  const [prefs, setPrefs] = useState({
    newsletterDebutant: profile.newsletterDebutant,
    newsletterRegulier: profile.newsletterRegulier,
    newsletterMensuel: profile.newsletterMensuel,
  })
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit() {
    const formData = new FormData()
    formData.set('newsletterDebutant', String(prefs.newsletterDebutant))
    formData.set('newsletterRegulier', String(prefs.newsletterRegulier))
    formData.set('newsletterMensuel', String(prefs.newsletterMensuel))

    startTransition(async () => {
      const result = await updateNewsletterAction(formData)
      setFeedback(result.error ? { type: 'error', message: result.error } : { type: 'success', message: result.success! })
    })
  }

  return (
    <section className="rounded-xl border border-gold/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-4">
      <h2 className="font-cinzel text-lg font-bold text-gold">Préférences Messagerie</h2>
      <form className="space-y-3">
        {NEWSLETTER_ITEMS.map(({ key, label, description, icon }) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
            <div>
              <p className="text-stone-800 text-sm font-medium">{icon} {label}</p>
              <p className="text-stone-500 text-xs">{description}</p>
            </div>
            <Switch
              id={key}
              checked={prefs[key as NewsletterKey]}
              onCheckedChange={(checked: boolean) => setPrefs((p) => ({ ...p, [key]: checked }))}
              className="data-[state=checked]:bg-gold"
            />
          </div>
        ))}
      </form>
      <p className="text-stone-400 text-xs italic">Désactivez tout pour garder votre compte sans recevoir d'e-mails.</p>
      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-gold text-deep-violet hover:bg-gold-hover font-semibold font-cinzel"
      >
        {isPending ? 'Enregistrement…' : 'Sauvegarder'}
      </Button>
      {feedback && (
        <p className={`text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {feedback.message}
        </p>
      )}
    </section>
  )
}
