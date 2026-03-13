import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SupabaseProfileAdapter } from '@/features/profile/infrastructure/supabase-profile.adapter'
import { GetProfileUseCase } from '@/features/profile/application/get-profile.use-case'
import { PlayerCard } from '@/features/profile/presentation/components/PlayerCard'
import { ProfileTabs } from '@/features/profile/presentation/ProfileTabs'

export const metadata: Metadata = {
  title: 'Mon Compte | Dague de Cœur',
  description: 'Gérez votre profil, vos préférences et votre abonnement Dague de Cœur.',
  robots: { index: false, follow: false },
}

export default async function ComptePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirectTo=/compte')

  const repository = new SupabaseProfileAdapter()
  const profile = await new GetProfileUseCase(repository).execute(user.id)

  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:py-16">
      <div className="max-w-2xl mx-auto space-y-6">
        <PlayerCard profile={profile} />
        <ProfileTabs profile={profile} />
      </div>
    </main>
  )
}
