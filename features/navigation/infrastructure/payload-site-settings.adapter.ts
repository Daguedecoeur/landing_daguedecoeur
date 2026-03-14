import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  FooterLink,
  SiteSettingsContent,
  SiteSettingsRepository,
  SocialPlatform,
} from '../domain/navigation.model'

// ── Raw Payload types ─────────────────────────────────────────────────────
type RawSocial = { platform?: string | null; url?: string | null }
type RawLink = { label?: string | null; href?: string | null; external?: boolean | null }

// ── Fallback ──────────────────────────────────────────────────────────────
function getFallback(): SiteSettingsContent {
  return {
    siteName: 'Dague de Coeur',
    siteDescription: 'La communauté francophone de Daggerheart — le JDR créé par Critical Role / Darrington Press.',
    discordLink: 'https://discord.com/invite/Wp5NKt56BX',
    socialLinks: [
      { platform: 'discord', url: 'https://discord.com/invite/Wp5NKt56BX' },
      { platform: 'instagram', url: 'https://www.instagram.com/daguedecoeur' },
      { platform: 'youtube', url: 'https://www.youtube.com/@daguedecoeur' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@daguedecoeur' },
    ],
    footerNavLinks: [
      { label: 'Accueil', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Planning', href: '/planning' },
      { label: 'Outils Daggerheart', href: '/outils' },
      { label: 'SRD Daggerheart VF', href: '/srd' },
    ],
    footerCommunityLinks: [
      { label: 'Discord', href: 'https://discord.com/invite/Wp5NKt56BX', external: true },
      { label: 'Patreon', href: 'https://patreon.com', external: true },
      { label: 'Actual Play', href: '/nos-projets#actual-play' },
      { label: 'Boutique Etsy', href: 'https://etsy.com', external: true },
    ],
    footerLegalLinks: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partenaires', href: '/partenaires' },
      { label: 'Mentions Légales & RGPD', href: '/mentions-legales' },
    ],
  }
}

function mapLink(raw: RawLink): FooterLink {
  return {
    label: raw.label ?? '',
    href: raw.href ?? '/',
    external: raw.external ?? false,
  }
}

// ── Adapter ───────────────────────────────────────────────────────────────
export class PayloadSiteSettingsAdapter implements SiteSettingsRepository {
  async getSiteSettings(): Promise<SiteSettingsContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'site-settings' })
      const fallback = getFallback()

      if (!data.siteName) return fallback

      return {
        siteName: data.siteName ?? fallback.siteName,
        siteDescription: data.siteDescription ?? fallback.siteDescription,
        discordLink: data.discordLink ?? fallback.discordLink,
        socialLinks: (data.socialLinks ?? []).length > 0
          ? (data.socialLinks as RawSocial[]).map((s) => ({
              platform: (s.platform ?? 'discord') as SocialPlatform,
              url: s.url ?? '',
            }))
          : fallback.socialLinks,
        footerNavLinks: (data.footerNavLinks ?? []).length > 0
          ? (data.footerNavLinks as RawLink[]).map(mapLink)
          : fallback.footerNavLinks,
        footerCommunityLinks: (data.footerCommunityLinks ?? []).length > 0
          ? (data.footerCommunityLinks as RawLink[]).map(mapLink)
          : fallback.footerCommunityLinks,
        footerLegalLinks: (data.footerLegalLinks ?? []).length > 0
          ? (data.footerLegalLinks as RawLink[]).map(mapLink)
          : fallback.footerLegalLinks,
      }
    } catch {
      return getFallback()
    }
  }
}

// ── Singleton ─────────────────────────────────────────────────────────────
let adapter: PayloadSiteSettingsAdapter | null = null

export function getPayloadSiteSettingsAdapter(): PayloadSiteSettingsAdapter {
  if (!adapter) adapter = new PayloadSiteSettingsAdapter()
  return adapter
}
