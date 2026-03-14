import Image from 'next/image'
import type { PlanningEvent } from '@/features/planning/domain/planning.model'

interface ConventionCardProps {
  event: PlanningEvent
}

function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate)
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }

  if (endDate) {
    const end = new Date(endDate)
    const startFormatted = start.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })
    const endFormatted = end.toLocaleDateString('fr-FR', options)
    return `${startFormatted} - ${endFormatted}`
  }

  return start.toLocaleDateString('fr-FR', options)
}

export function ConventionCard({ event }: ConventionCardProps) {
  const dateLabel = formatDateRange(event.startDate, event.endDate)

  return (
    <div className="relative group h-[400px] rounded-xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300">
      {/* Background image */}
      {event.coverImageUrl ? (
        <Image
          src={event.coverImageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-deep-violet to-purple-900" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-violet via-deep-violet/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-8 w-full">
        <div className="text-gold font-cinzel text-sm mb-2">{dateLabel}</div>
        <h3 className="font-cinzel text-2xl text-white mb-4">{event.title}</h3>
        {event.description && (
          <p className="text-cream/70 text-sm mb-6">{event.description}</p>
        )}
        {event.externalUrl && (
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-cinzel text-sm tracking-widest"
          >
            {event.ctaLabel ?? "S'INSCRIRE"}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        )}
      </div>
    </div>
  )
}
