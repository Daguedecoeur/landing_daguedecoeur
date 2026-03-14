import { getPayload } from 'payload'
import config from '@payload-config'
import type { NavbarContent, NavbarRepository, NavItem, NavSubItem } from '../domain/navigation.model'

// ── Raw Payload types ─────────────────────────────────────────────────────
type RawChild = {
  label?: string | null
  href?: string | null
  description?: string | null
  external?: boolean | null
}

type RawMenuItem = {
  label?: string | null
  emoji?: string | null
  href?: string | null
  children?: RawChild[] | null
}

// ── Mappers ───────────────────────────────────────────────────────────────
function mapChild(raw: RawChild): NavSubItem {
  return {
    label: raw.label ?? '',
    href: raw.href ?? '/',
    description: raw.description ?? undefined,
    external: raw.external ?? false,
  }
}

function mapMenuItem(raw: RawMenuItem): NavItem {
  const children = (raw.children ?? []).filter((c) => c.label && c.href)
  return {
    label: raw.label ?? '',
    emoji: raw.emoji ?? undefined,
    href: raw.href || undefined,
    children: children.length > 0 ? children.map(mapChild) : undefined,
  }
}

// ── Adapter ───────────────────────────────────────────────────────────────
export class PayloadNavbarAdapter implements NavbarRepository {
  async getNavbarContent(): Promise<NavbarContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'navbar' })

      // If Payload has never been saved, menuItems will be empty — use defaultValues
      const menuItems = ((data.menuItems ?? []) as RawMenuItem[]).filter((i) => i.label)
      const mobileItems = ((data.mobileMenuItems ?? []) as RawMenuItem[]).filter((i) => i.label)

      return {
        siteName: data.siteName ?? 'DAGUE DE CŒUR',
        menuItems: menuItems.map(mapMenuItem),
        mobileMenuItems: mobileItems.map(mapMenuItem),
        ctaLabel: data.ctaLabel ?? 'Espace Membre',
        ctaMobileLabel: data.ctaMobileLabel ?? "Espace Membre / S'inscrire",
        ctaHref: data.ctaHref ?? '/#subscribe',
      }
    } catch (error) {
      console.error('[PayloadNavbarAdapter]', error)
      return {
        siteName: 'DAGUE DE CŒUR',
        menuItems: [],
        mobileMenuItems: [],
        ctaLabel: 'Espace Membre',
        ctaMobileLabel: "Espace Membre / S'inscrire",
        ctaHref: '/#subscribe',
      }
    }
  }
}

// ── Singleton ─────────────────────────────────────────────────────────────
import { createSingleton } from '@/lib/singleton'

export const getPayloadNavbarAdapter = createSingleton(() => new PayloadNavbarAdapter())
