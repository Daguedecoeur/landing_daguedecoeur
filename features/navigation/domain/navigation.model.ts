// ── Navbar ────────────────────────────────────────────────────────────────
export interface NavSubItem {
  label: string
  href: string
  description?: string
  external?: boolean
}

export interface NavItem {
  label: string
  href?: string
  emoji?: string
  children?: NavSubItem[]
}

export interface NavbarContent {
  siteName: string
  menuItems: NavItem[]
  mobileMenuItems: NavItem[]
  ctaLabel: string
  ctaMobileLabel: string
  ctaHref: string
}

// ── Site Settings (Footer) ────────────────────────────────────────────────
export type SocialPlatform =
  | 'discord'
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'tiktok'
  | 'patreon'

export interface SocialLink {
  platform: SocialPlatform
  url: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface SiteSettingsContent {
  siteName: string
  siteDescription: string
  discordLink: string
  socialLinks: SocialLink[]
  footerNavLinks: FooterLink[]
  footerCommunityLinks: FooterLink[]
  footerLegalLinks: FooterLink[]
}

// ── Ports (Repositories) ─────────────────────────────────────────────────
export interface NavbarRepository {
  getNavbarContent(): Promise<NavbarContent>
}

export interface SiteSettingsRepository {
  getSiteSettings(): Promise<SiteSettingsContent>
}
