'use client'

import { useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updatePersonalDataAction } from '../../application/profile.actions'
import type { Profile } from '../../domain/profile.model'

interface PersonalDataSectionProps {
  profile: Pick<Profile, 'firstName' | 'lastName' | 'country' | 'email'>
}

const COUNTRIES = [
  'France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg', 'Autre',
]

export function PersonalDataSection({ profile }: PersonalDataSectionProps) {
  const [firstName, setFirstName] = useState(profile.firstName ?? '')
  const [lastName, setLastName] = useState(profile.lastName ?? '')
  const [country, setCountry] = useState(profile.country ?? '')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit() {
    const formData = new FormData()
    formData.set('firstName', firstName)
    formData.set('lastName', lastName)
    formData.set('country', country)

    startTransition(async () => {
      const result = await updatePersonalDataAction(formData)
      setFeedback(result.error ? { type: 'error', message: result.error } : { type: 'success', message: result.success! })
    })
  }

  const inputClass = 'bg-white border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-gold focus:ring-gold/20'

  return (
    <section className="rounded-xl border border-gold/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-4">
      <h2 className="font-cinzel text-lg font-bold text-gold">Mes Données Personnelles</h2>
      <p className="text-stone-500 text-xs">Conformément au RGPD, vous pouvez consulter et modifier vos informations à tout moment.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="firstName"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputClass}
        />
        <Input
          id="lastName"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="relative">
        <Input
          id="email"
          value={profile.email}
          readOnly
          className="bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">🔒</span>
        <p className="text-stone-400 text-xs mt-1">E-mail associé à votre compte — non modifiable ici.</p>
      </div>

      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger className={inputClass} id="country">
          <SelectValue placeholder="Pays / Région" />
        </SelectTrigger>
        <SelectContent className="bg-white border-stone-200 shadow-md">
          {COUNTRIES.map((c) => (
            <SelectItem key={c} value={c} className="text-stone-800 focus:bg-gold/10 focus:text-amber-700">{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

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
