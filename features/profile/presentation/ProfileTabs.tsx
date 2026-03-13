'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Profile } from '../domain/profile.model'
import { NewsletterPreferences } from './components/NewsletterPreferences'
import { SecuritySection } from './components/SecuritySection'
import { PersonalDataSection } from './components/PersonalDataSection'

interface ProfileTabsProps {
  profile: Profile
}

const TABS = [
  { value: 'preferences', label: '📜 Préférences' },
  { value: 'securite', label: '🔒 Sécurité' },
  { value: 'donnees', label: '📋 Mes Données' },
]

export function ProfileTabs({ profile }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="preferences" className="w-full">
      <TabsList className="w-full bg-stone-100 border border-stone-200 rounded-xl p-1 h-auto gap-1">
        {TABS.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex-1 font-cinzel text-xs tracking-wide text-stone-500 hover:text-stone-800 rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm transition-all"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="preferences" className="mt-4 focus-visible:outline-none">
        <NewsletterPreferences profile={profile} />
      </TabsContent>

      <TabsContent value="securite" className="mt-4 focus-visible:outline-none">
        <SecuritySection profile={profile} />
      </TabsContent>

      <TabsContent value="donnees" className="mt-4 focus-visible:outline-none">
        <PersonalDataSection profile={profile} />
      </TabsContent>
    </Tabs>
  )
}
