'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updatePasswordAction } from '../../application/profile.actions'
import type { Profile } from '../../domain/profile.model'

interface SecuritySectionProps {
  profile: Pick<Profile, 'provider' | 'email'>
}

export function SecuritySection({ profile }: SecuritySectionProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const isDiscordUser = profile.provider === 'discord'

  function handleSubmit() {
    const formData = new FormData()
    formData.set('password', password)
    formData.set('confirmPassword', confirmPassword)

    startTransition(async () => {
      const result = await updatePasswordAction(formData)
      setFeedback(result.error ? { type: 'error', message: result.error } : { type: 'success', message: result.success! })
      if (!result.error) { setPassword(''); setConfirmPassword('') }
    })
  }

  return (
    <section className="rounded-xl border border-gold/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-4">
      <h2 className="font-cinzel text-lg font-bold text-gold">Sécurité & Accès</h2>

      {/* Auth provider row */}
      <div className="flex items-center justify-between py-2 border-b border-stone-100">
        <div>
          <p className="text-stone-800 text-sm font-medium">
            {isDiscordUser ? '🎮 Connecté via Discord' : '✉️ Connexion par e-mail'}
          </p>
          <p className="text-stone-500 text-xs">{profile.email}</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-green-600">
          <span className="size-2 rounded-full bg-green-500" />
          Actif
        </span>
      </div>

      {/* Password section */}
      {isDiscordUser ? (
        <p className="text-stone-500 text-sm italic">
          Vous utilisez Discord pour vous connecter — aucun mot de passe n'est requis.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-stone-700 text-sm font-medium">Modifier le mot de passe</p>
          <Input
            id="password"
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-gold focus:ring-gold/20"
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-gold focus:ring-gold/20"
          />
          <Button
            onClick={handleSubmit}
            disabled={isPending || !password}
            className="bg-gold text-deep-violet hover:bg-gold-hover font-semibold font-cinzel"
          >
            {isPending ? 'Mise à jour…' : 'Mettre à jour'}
          </Button>
          {feedback && (
            <p className={`text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.message}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
