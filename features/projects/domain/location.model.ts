// ── Location Item ─────────────────────────────────────────────────────────
export interface LocationItem {
  title: string
  subtitle: string
  slug: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageUrl: string
}

// ── Page Content ──────────────────────────────────────────────────────────
export interface ProjectsPageContent {
  locations: LocationItem[]
}

// ── Port (Repository) ─────────────────────────────────────────────────────
export interface ProjectsPageRepository {
  getProjectsPage(): Promise<ProjectsPageContent>
}
