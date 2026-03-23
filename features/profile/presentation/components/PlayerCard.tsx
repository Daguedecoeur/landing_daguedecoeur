import { Badge } from '@/components/ui/badge'
import type { Profile } from '../../domain/profile.model'
import { AvatarUpload } from './AvatarUpload'

interface PlayerCardProps {
  profile: Profile
}

export function PlayerCard({ profile }: PlayerCardProps) {
  return (
    <section className="relative rounded-xl border border-gold/40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar — click to upload */}
        <AvatarUpload currentUrl={profile.avatarUrl ?? null} displayName={profile.displayName} />

        {/* Info */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <h1 className="font-cinzel text-2xl font-bold text-gold">{profile.displayName}</h1>
          <p className="text-stone-500 text-sm">{profile.email}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {profile.discordId && (
              <Badge className="bg-[#5865F2]/10 text-[#4752C4] border border-[#5865F2]/30 text-xs">
                🎮 Discord connecté
              </Badge>
            )}
            {profile.patreonTier ? (
              <Badge className="bg-gold/15 text-amber-700 border border-gold/40 text-xs">
                ⭐ {profile.patreonTier}
              </Badge>
            ) : (
              <Badge className="bg-stone-100 text-stone-500 border border-stone-200 text-xs">
                Membre gratuit
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Patreon CTA if active subscriber */}
      {profile.patreonTier && (
        <div className="mt-5 pt-5 border-t border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-stone-600 text-sm">✨ <span className="text-gold font-semibold">Merci pour votre soutien, Héros !</span></p>
          <a
            href="https://patreon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-deep-violet text-sm font-semibold font-cinzel hover:bg-gold-hover transition-all hover:-translate-y-0.5"
          >
            Accéder à la Salle des Archives ✦
          </a>
        </div>
      )}
    </section>
  )
}

