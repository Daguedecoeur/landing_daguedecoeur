'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sword, Mail, KeyRound, Sparkles } from 'lucide-react'
import { signInAction, signInMagicLinkAction } from '../application/auth.actions'
import { OAuthButtons } from './OAuthButtons'
import { AuthMessage } from './AuthMessage'

type AuthTab = 'password' | 'magic-link'

export function LoginForm() {
  const [activeTab, setActiveTab] = useState<AuthTab>('password')
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  async function handlePasswordSubmit(formData: FormData) {
    setError(undefined)
    setSuccess(undefined)
    setIsLoading(true)

    try {
      const result = await signInAction(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  async function handleMagicLinkSubmit(formData: FormData) {
    setError(undefined)
    setSuccess(undefined)
    setIsLoading(true)

    try {
      const result = await signInMagicLinkAction(formData)
      if (result?.error) {
        setError(result.error)
      }
      if (result?.success) {
        setSuccess(result.success)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-4">
          <Sword className="w-8 h-8 text-gold rotate-45" />
        </div>
        <h1 className="font-cinzel text-3xl font-bold text-cream mb-2">
          Connexion
        </h1>
        <p className="font-lato text-cream/60 text-sm">
          Retrouve ta communauté Daggerheart
        </p>
      </div>

      <div className="bg-deep-violet/60 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        <OAuthButtons />

        <div className="relative my-6">
          <Separator className="bg-gold/20" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep-violet px-3 text-xs font-lato text-cream/40 uppercase tracking-wider">
            ou
          </span>
        </div>

        <div className="flex rounded-lg bg-deep-violet/80 border border-gold/10 p-1 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('password'); setError(undefined); setSuccess(undefined) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-cinzel font-semibold tracking-wider transition-all ${
              activeTab === 'password'
                ? 'bg-gold/15 text-gold shadow-sm'
                : 'text-cream/50 hover:text-cream/80'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Mot de passe
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('magic-link'); setError(undefined); setSuccess(undefined) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-cinzel font-semibold tracking-wider transition-all ${
              activeTab === 'magic-link'
                ? 'bg-gold/15 text-gold shadow-sm'
                : 'text-cream/50 hover:text-cream/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Magic Link
          </button>
        </div>

        <AuthMessage error={error} success={success} />

        {activeTab === 'password' && (
          <form action={handlePasswordSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-lato font-semibold text-cream/70 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="ton@email.fr"
                  required
                  className="pl-10 h-11 bg-deep-violet/50 border-gold/20 text-cream placeholder:text-cream/30 focus-visible:border-gold/50 focus-visible:ring-gold/20 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-lato font-semibold text-cream/70 mb-1.5 uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 h-11 bg-deep-violet/50 border-gold/20 text-cream placeholder:text-cream/30 focus-visible:border-gold/50 focus-visible:ring-gold/20 rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gold text-deep-violet font-cinzel font-bold text-sm rounded-full hover:bg-gold/80 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        )}

        {activeTab === 'magic-link' && (
          <form action={handleMagicLinkSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="magic-email" className="block text-xs font-lato font-semibold text-cream/70 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
                <Input
                  id="magic-email"
                  name="email"
                  type="email"
                  placeholder="ton@email.fr"
                  required
                  className="pl-10 h-11 bg-deep-violet/50 border-gold/20 text-cream placeholder:text-cream/30 focus-visible:border-gold/50 focus-visible:ring-gold/20 rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gold text-deep-violet font-cinzel font-bold text-sm rounded-full hover:bg-gold/80 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Envoi...' : 'Recevoir un lien magique'}
            </Button>

            <p className="text-xs text-cream/40 text-center font-lato">
              Un lien de connexion sera envoyé à ton adresse email
            </p>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-gold/10 text-center">
          <p className="text-sm font-lato text-cream/50">
            Pas encore de compte ?{' '}
            <Link
              href="/signup"
              className="text-gold hover:text-gold/80 font-semibold transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
