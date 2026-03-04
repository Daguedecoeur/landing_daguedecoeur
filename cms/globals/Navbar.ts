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
      name: 'menuItems',
      type: 'array',
      label: 'Liens du menu',
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
          label: 'Lien (URL)',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'BLOG', href: '/blog' },
      ],
    },
    {
      name: 'mobileMenuItems',
      type: 'array',
      label: 'Liens du menu mobile',
      admin: {
        description: 'Si vide, les liens du menu principal seront utilisés avec "ACCUEIL" ajouté en premier.',
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
          label: 'Lien (URL)',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'ACCUEIL', href: '/' },
        { label: 'BLOG', href: '/blog' },
      ],
    },
  ],
}
