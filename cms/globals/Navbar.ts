import type { GlobalConfig } from 'payload'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  label: 'Navigation',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Nom du site',
      required: true,
      defaultValue: 'DAGUE DE CŒUR',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Bouton CTA — Libellé (desktop)',
      defaultValue: 'Espace Membre',
    },
    {
      name: 'ctaMobileLabel',
      type: 'text',
      label: 'Bouton CTA — Libellé (mobile)',
      defaultValue: "Espace Membre / S'inscrire",
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Bouton CTA — Lien',
      defaultValue: '/#subscribe',
    },

    // ── Menu principal (desktop) ─────────────────────────────────────
    {
      name: 'menuItems',
      type: 'array',
      label: 'Menu principal',
      admin: {
        description: 'Liens du menu desktop. Peuvent avoir des sous-menus.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Libellé',
          required: true,
        },
        {
          name: 'emoji',
          type: 'text',
          label: 'Emoji (optionnel)',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Lien direct (laisser vide si sous-menu)',
        },
        {
          name: 'children',
          type: 'array',
          label: 'Sous-menu',
          admin: {
            description: 'Si renseigné, ce lien devient un dropdown.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Libellé',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'URL',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description (sous le libellé)',
            },
            {
              name: 'external',
              type: 'checkbox',
              label: 'Lien externe (ouvre dans un nouvel onglet)',
              defaultValue: false,
            },
          ],
        },
      ],
      defaultValue: [
        {
          label: 'Découvre Daggerheart',
          emoji: '🎁',
          href: '/decouvre-daggerheart',
          children: [],
        },
        {
          label: 'Ressources & Outils',
          emoji: '🧰',
          href: '',
          children: [
            { label: 'Blog et Newsletter', href: '/blog', description: 'Tes articles, conseils MJ et newsletters mensuels', external: false },
            { label: 'Téléchargements Gratuits', href: '/telechargements', description: 'Tes PDF en accès libre', external: false },
            { label: 'Outils Daggerheart', href: '/outils', description: "L'annuaire des sites officiels et communautaires", external: true },
            { label: 'SRD Daggerheart VF', href: '/srd', description: 'Tout le système disponible en licence libre', external: false },
          ],
        },
        {
          label: 'Nos Projets & Lieux',
          emoji: '🎭',
          href: '',
          children: [
            { label: 'Salle Immersive Dagues & Dragons', href: '/nos-projets#dagues-dragons', description: 'Chartres', external: false },
            { label: 'Studio Audiovisuel Dédale', href: '/nos-projets#studio-dedale', description: 'Chartres', external: false },
            { label: 'Le Tréfon', href: '/nos-projets#le-trefon', description: 'Bar à jeux heroic fantasy — Chartres', external: false },
            { label: 'Actual Play Daggerheart', href: '/nos-projets#actual-play', description: 'Nos parties en live et replay', external: false },
          ],
        },
        {
          label: 'Planning',
          emoji: '🗓️',
          href: '/planning',
          children: [],
        },
        {
          label: 'Abonnements & Boutiques',
          emoji: '⭐',
          href: '',
          children: [
            { label: 'Catalogue Patreon', href: 'https://patreon.com', description: 'PDFs et vidéos exclusives', external: true },
            { label: 'Boutique Etsy', href: 'https://etsy.com', description: 'Goodies, impressions 3D, gravures sur bois', external: true },
          ],
        },
      ],
    },

    // ── Menu mobile ──────────────────────────────────────────────────
    {
      name: 'mobileMenuItems',
      type: 'array',
      label: 'Menu mobile (liens rapides)',
      admin: {
        description: 'Liens rapides affichés en haut du menu mobile. Peuvent également avoir des sous-menus.',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Libellé', required: true },
        { name: 'emoji', type: 'text', label: 'Emoji (optionnel)' },
        { name: 'href', type: 'text', label: 'Lien direct (laisser vide si sous-menu)' },
        {
          name: 'children',
          type: 'array',
          label: 'Sous-menu',
          fields: [
            { name: 'label', type: 'text', label: 'Libellé', required: true },
            { name: 'href', type: 'text', label: 'URL', required: true },
            { name: 'description', type: 'text', label: 'Description' },
            { name: 'external', type: 'checkbox', label: 'Lien externe', defaultValue: false },
          ],
        },
      ],
      defaultValue: [
        { label: 'Découvre Daggerheart', emoji: '🎁', href: '/decouvre-daggerheart', children: [] },
        {
          label: 'Ressources & Outils',
          emoji: '🧰',
          href: '',
          children: [
            { label: 'Blog et Newsletter', href: '/blog', description: 'Tes articles, conseils MJ et newsletters mensuels', external: false },
            { label: 'Téléchargements Gratuits', href: '/telechargements', description: 'Tes PDF en accès libre', external: false },
            { label: 'Outils Daggerheart', href: '/outils', description: "L'annuaire des sites officiels et communautaires", external: true },
            { label: 'SRD Daggerheart VF', href: '/srd', description: 'Tout le système disponible en licence libre', external: false },
          ],
        },
        {
          label: 'Nos Projets & Lieux',
          emoji: '🎭',
          href: '',
          children: [
            { label: 'Salle Immersive Dagues & Dragons', href: '/nos-projets#dagues-dragons', description: 'Chartres', external: false },
            { label: 'Studio Audiovisuel Dédale', href: '/nos-projets#studio-dedale', description: 'Chartres', external: false },
            { label: 'Le Tréfon', href: '/nos-projets#le-trefon', description: 'Bar à jeux heroic fantasy — Chartres', external: false },
            { label: 'Actual Play Daggerheart', href: '/nos-projets#actual-play', description: 'Nos parties en live et replay', external: false },
          ],
        },
        { label: 'Planning', emoji: '🗓️', href: '/planning', children: [] },
        {
          label: 'Abonnements & Boutiques',
          emoji: '⭐',
          href: '',
          children: [
            { label: 'Catalogue Patreon', href: 'https://patreon.com', description: 'PDFs et vidéos exclusives', external: true },
            { label: 'Boutique Etsy', href: 'https://etsy.com', description: 'Goodies, impressions 3D, gravures sur bois', external: true },
          ],
        },
      ],
    },
  ],
}
