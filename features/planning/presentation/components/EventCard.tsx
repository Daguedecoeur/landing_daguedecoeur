import Image from 'next/image'
import type { PlanningEvent } from '@/features/planning/domain/planning.model'

interface EventCardProps {
  event: PlanningEvent
  isPast?: boolean
}

const typeBadgeConfig = {
  stream: { label: 'Stream Live', className: 'bg-gold/20 border border-gold/30 text-gold' },
  'game-release': { label: 'Sortie', className: 'bg-blue-500/20 border border-blue-500/30 text-blue-300' },
  convention: { label: 'Convention', className: 'bg-purple-500/20 border border-purple-500/30 text-purple-300' },
}

function formatDate(dateStr: string): { day: string; month: string } {
  const date = new Date(dateStr)
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''),
  }
}

export function EventCard({ event, isPast = false }: EventCardProps) {
  const { day, month } = formatDate(event.startDate)
  const badge = typeBadgeConfig[event.type]

  return (
    <div
      id={`event-${event.slug}`}
      className={`group rounded-xl overflow-hidden transition-all duration-300 ${
        isPast
          ? 'opacity-60 hover:opacity-80 border border-white/5'
          : 'border border-gold/10 hover:border-gold/50'
      }`}
      style={{ background: 'rgba(45, 22, 77, 0.2)' }}
    >
      {/* Cover image */}
      <div className="h-48 relative overflow-hidden">
        {event.coverImageUrl ? (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-deep-violet to-purple-900" />
        )}

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-deep-violet/80 border border-gold px-3 py-1 text-center rounded">
          <p className="text-gold font-cinzel text-xl font-bold leading-none">{day}</p>
          <p className="text-cream text-[10px] uppercase tracking-tighter">{month}</p>
        </div>

        {/* Type badge + gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-deep-violet to-transparent">
          <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest ${badge.className}`}>
            {isPast ? 'Passé' : badge.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-cinzel text-xl text-gold mb-2 group-hover:text-white transition-colors">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-cream/60 text-sm mb-6 line-clamp-2">
            {event.description}
          </p>
        )}

        {event.externalUrl && !isPast ? (
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-gold/30 text-gold font-cinzel text-xs tracking-widest py-3 rounded text-center hover:bg-gold hover:text-deep-violet transition-all"
          >
            {(event.ctaLabel ?? 'VOIR DÉTAILS').toUpperCase()}
          </a>
        ) : (
          <button
            disabled={isPast}
            className="w-full border border-gold/30 text-gold font-cinzel text-xs tracking-widest py-3 rounded hover:bg-gold hover:text-deep-violet transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            VOIR DÉTAILS
          </button>
        )}
      </div>
    </div>
  )
}
