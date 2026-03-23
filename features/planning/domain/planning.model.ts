// ── Event Types ──────────────────────────────────────────────────────────
export type EventType = 'stream' | 'game-release' | 'convention'

// ── Event ────────────────────────────────────────────────────────────────
export interface PlanningEvent {
  id: number
  title: string
  slug: string
  type: EventType
  startDate: string
  endDate?: string | null
  description?: string | null
  coverImageUrl?: string | null
  externalUrl?: string | null
  ctaLabel?: string | null
  location?: string | null
  featured: boolean
}

// ── Hero ─────────────────────────────────────────────────────────────────
export interface PlanningHeroContent {
  title: string
  subtitle: string
  backgroundImageUrl: string | null
}

// ── Page ─────────────────────────────────────────────────────────────────
export interface PlanningPageContent {
  hero: PlanningHeroContent
}

// ── Ports (Repository) ───────────────────────────────────────────────────
export interface PlanningPageRepository {
  getPlanningPage(): Promise<PlanningPageContent>
}

export interface EventRepository {
  findUpcoming(): Promise<PlanningEvent[]>
  findPast(limit?: number): Promise<PlanningEvent[]>
}
