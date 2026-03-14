'use client'

import { useMemo } from 'react'
import type { PlanningEvent } from '@/features/planning/domain/planning.model'

interface MiniCalendarProps {
  currentDate: Date
  events: PlanningEvent[]
  onPrevMonth: () => void
  onNextMonth: () => void
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const dotColorMap: Record<string, string> = {
  stream: 'bg-gold',
  'game-release': 'bg-blue-400',
  convention: 'bg-purple-400',
}

export function MiniCalendar({ currentDate, events, onPrevMonth, onNextMonth }: MiniCalendarProps) {
  const { monthLabel, days } = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const label = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Monday = 0, Sunday = 6
    let startDow = firstDay.getDay() - 1
    if (startDow < 0) startDow = 6

    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    const paddingBefore = Array.from({ length: startDow }, (_, i) => ({
      day: prevMonthLastDay - startDow + 1 + i,
      inMonth: false as const,
      date: null as Date | null,
    }))

    // Current month days
    const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      inMonth: true as const,
      date: new Date(year, month, i + 1),
    }))

    return {
      monthLabel: capitalizedLabel,
      days: [...paddingBefore, ...currentDays],
    }
  }, [currentDate])

  const eventDates = useMemo(() => {
    const map = new Map<string, string>()
    for (const event of events) {
      const d = new Date(event.startDate)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      map.set(key, event.type)
    }
    return map
  }, [events])

  const today = new Date()
  const isToday = (d: Date | null) =>
    d !== null &&
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()

  return (
    <div className="rounded-xl p-6 shadow-2xl" style={{
      background: 'rgba(45, 22, 77, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(212, 175, 53, 0.2)',
    }}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onPrevMonth} className="text-gold hover:text-cream transition-colors">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h3 className="font-cinzel text-lg text-gold">{monthLabel}</h3>
        <button onClick={onNextMonth} className="text-gold hover:text-cream transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center gap-y-4">
        {DAYS.map((d) => (
          <span key={d} className="text-xs font-bold text-gold/60 uppercase">
            {d}
          </span>
        ))}

        {/* Day cells */}
        {days.map((cell, i) => {
          const dateKey = cell.date
            ? `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`
            : null
          const eventType = dateKey ? eventDates.get(dateKey) : undefined
          const todayCell = isToday(cell.date)

          if (!cell.inMonth) {
            return (
              <span key={`pad-${i}`} className="py-2 text-cream/20">
                {cell.day}
              </span>
            )
          }

          return (
            <span
              key={`d-${cell.day}`}
              className={`py-2 relative flex flex-col items-center ${
                todayCell
                  ? 'bg-gold/20 rounded-lg border border-gold/40'
                  : ''
              }`}
            >
              <span className={`text-sm ${todayCell ? 'font-bold text-gold' : ''}`}>
                {cell.day}
              </span>
              {eventType && (
                <span
                  className={`w-1 h-1 rounded-full mt-1 ${dotColorMap[eventType] ?? 'bg-gold'}`}
                />
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}
