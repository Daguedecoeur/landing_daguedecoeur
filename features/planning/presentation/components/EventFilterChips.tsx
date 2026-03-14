'use client'

import type { EventType } from '@/features/planning/domain/planning.model'

interface EventFilterChipsProps {
  activeFilter: EventType | 'all'
  showArchives: boolean
  onFilterChange: (filter: EventType | 'all') => void
  onToggleArchives: () => void
}

const filters: { value: EventType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'stream', label: '🎮 Streams' },
  { value: 'game-release', label: '⚔️ Sorties' },
  { value: 'convention', label: '🏰 Conventions' },
]

export function EventFilterChips({
  activeFilter,
  showArchives,
  onFilterChange,
  onToggleArchives,
}: EventFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.value
              ? 'bg-gold text-deep-violet shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              : 'bg-white/5 text-cream/70 border border-white/10 hover:bg-white/10 hover:text-cream'
          }`}
        >
          {filter.label}
        </button>
      ))}

      <button
        onClick={onToggleArchives}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ml-auto ${
          showArchives
            ? 'bg-cream/20 text-cream shadow-[0_0_10px_rgba(245,240,232,0.1)]'
            : 'bg-white/5 text-cream/40 border border-white/10 hover:bg-white/10 hover:text-cream/60'
        }`}
      >
        📜 Archives
      </button>
    </div>
  )
}
