import type { GlobalConfig } from 'payload'

const linkFields = [
  { name: 'label', type: 'text' as const, label: 'Libellé', required: true },
  { name: 'href', type: 'text' as const, label: 'URL', required: true },
  { name: 'external', type: 'checkbox' as const, label: 'Lien externe', defaultValue: false },
]

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site & Footer',
  fields: [
    // ── Infos générales ─────────────────────────────────────────────
    { name: 'siteName', type: 'text', label: 'Nom du site', defaultValue: 'Dague de Coeur' },
    { name: 'siteDescription', type: 'textarea', label: 'Description (footer)', defaultValue: 'La communauté francophone de Daggerheart — le JDR créé par Critical Role / Darrington Press.' },
    { name: 'discordLink', type: 'text', label: 'Lien Discord principal', defaultValue: 'https://discord.com/invite/Wp5NKt56BX' },

    // ── Réseaux sociaux ─────────────────────────────────────────────
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Réseaux sociaux',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Plateforme',
          required: true,
          options: [
            { label: 'Discord', value: 'discord' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Patreon', value: 'patreon' },
            { label: 'X / Twitter', value: 'twitter' },
          ],
        },
        { name: 'url', type: 'text', label: 'URL', required: true },
      ],
      defaultValue: [
        { platform: 'discord', url: 'https://discord.com/invite/Wp5NKt56BX' },
        { platform: 'instagram', url: 'https://www.instagram.com/daguedecoeur' },
        { platform: 'youtube', url: 'https://www.youtube.com/@daguedecoeur' },
        { platform: 'tiktok', url: 'https://www.tiktok.com/@daguedecoeur' },
      ],
    },

    // ── Colonnes de liens du footer ─────────────────────────────────
    {
      name: 'footerNavLinks',
      type: 'array',
      label: 'Footer — Colonne Navigation',
      fields: linkFields,
      defaultValue: [
        { label: 'Accueil', href: '/', external: false },
        { label: 'Blog', href: '/blog', external: false },
        { label: 'Planning', href: '/planning', external: false },
        { label: 'Outils Daggerheart', href: '/outils', external: false },
        { label: 'SRD Daggerheart VF', href: '/srd', external: false },
      ],
    },
    {
      name: 'footerCommunityLinks',
      type: 'array',
      label: 'Footer — Colonne Communauté',
      fields: linkFields,
      defaultValue: [
        { label: 'Discord', href: 'https://discord.com/invite/Wp5NKt56BX', external: true },
        { label: 'Patreon', href: 'https://patreon.com', external: true },
        { label: 'Actual Play', href: '/nos-projets#actual-play', external: false },
        { label: 'Boutique Etsy', href: 'https://etsy.com', external: true },
      ],
    },
    {
      name: 'footerLegalLinks',
      type: 'array',
      label: 'Footer — Colonne Informations',
      fields: linkFields,
      defaultValue: [
        { label: 'À propos', href: '/a-propos', external: false },
        { label: 'Contact', href: '/contact', external: false },
        { label: 'Partenaires', href: '/partenaires', external: false },
        { label: 'Mentions Légales & RGPD', href: '/mentions-legales', external: false },
      ],
    },
  ],
}
