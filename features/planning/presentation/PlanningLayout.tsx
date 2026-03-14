'use client'

import { useState, useMemo } from 'react'
import type { PlanningEvent, EventType, PlanningHeroContent } from '@/features/planning/domain/planning.model'
import { PlanningHero } from './PlanningHero'
import { MiniCalendar } from './components/MiniCalendar'
import { CalendarLegend } from './components/CalendarLegend'
import { EventFilterChips } from './components/EventFilterChips'
import { EventCard } from './components/EventCard'
import { ConventionCard } from './components/ConventionCard'

interface PlanningLayoutProps {
  hero: PlanningHeroContent
  upcomingEvents: PlanningEvent[]
  pastEvents: PlanningEvent[]
}

export function PlanningLayout({ hero, upcomingEvents, pastEvents }: PlanningLayoutProps) {
  const [activeFilter, setActiveFilter] = useState<EventType | 'all'>('all')
  const [showArchives, setShowArchives] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const allEvents = useMemo(
    () => [...upcomingEvents, ...pastEvents],
    [upcomingEvents, pastEvents],
  )

  const filteredEvents = useMemo(() => {
    const source = showArchives ? pastEvents : upcomingEvents
    if (activeFilter === 'all') return source
    return source.filter((e) => e.type === activeFilter)
  }, [upcomingEvents, pastEvents, activeFilter, showArchives])

  const featuredConventions = useMemo(
    () => upcomingEvents.filter((e) => e.type === 'convention' && e.featured),
    [upcomingEvents],
  )

  const handlePrevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  return (
    <>
      <PlanningHero content={hero} />

      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
          {/* Left column — Mini Calendar + Legend */}
          <aside className="lg:col-span-3 space-y-8">
            <MiniCalendar
              currentDate={currentDate}
              events={allEvents}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <CalendarLegend />
          </aside>

          {/* Right column — Filter chips + Event cards */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <EventFilterChips
                activeFilter={activeFilter}
                showArchives={showArchives}
                onFilterChange={setActiveFilter}
                onToggleArchives={() => setShowArchives((v) => !v)}
              />
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-gold/30 text-6xl mb-4 block">
                  event_busy
                </span>
                <p className="text-cream/40 font-cinzel text-lg">
                  {showArchives ? 'Aucun événement passé' : 'Aucun événement à venir'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast={showArchives} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Conventions à venir */}
        {featuredConventions.length > 0 && !showArchives && (
          <section className="mt-20">
            <div className="flex items-center gap-6 mb-10">
              <h2 className="font-cinzel text-3xl text-cream shrink-0">
                Conventions à venir
              </h2>
              <div className="h-px bg-gold/30 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredConventions.map((event) => (
                <ConventionCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
