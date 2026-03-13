// ── Hero ──────────────────────────────────────────────────────────────────
export interface HeroContent {
  titleStart: string
  titleHighlight: string
  subtitle: string
  ctaLabel: string
  socialProof: string
}

// ── Features ──────────────────────────────────────────────────────────────
export interface FeatureItem {
  title: string
  description: string
}

export interface FeaturesContent {
  titleStart: string
  titleHighlight: string
  titleEnd: string
  items: FeatureItem[]
  videoCta: string
  videoUrl: string
}

// ── Kit ───────────────────────────────────────────────────────────────────
export interface KitItem {
  title: string
  description: string
}

export interface KitContent {
  titleStart: string
  titleHighlight: string
  titleEnd: string
  publisherNote: string
  sectionLabel: string
  items: KitItem[]
  ctaLabel: string
}

// ── FAQ ───────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string
  answer: string
}

export interface FaqContent {
  title: string
  items: FaqItem[]
}

// ── Page ──────────────────────────────────────────────────────────────────
export interface HomepagePageContent {
  hero: HeroContent
  features: FeaturesContent
  kit: KitContent
  faq: FaqContent
}

// ── Port (Repository) ─────────────────────────────────────────────────────
export interface HomepagePageRepository {
  getHomepagePage(): Promise<HomepagePageContent>
}
