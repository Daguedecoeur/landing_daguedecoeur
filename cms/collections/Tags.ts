import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug'],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Nom du tag',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Identifiant URL (ex: actualites, lore, chroniques)',
      },
    },
    {
      name: 'color',
      type: 'select',
      label: 'Couleur',
      defaultValue: 'gold',
      options: [
        { label: 'Gold', value: 'gold' },
        { label: 'Cream', value: 'cream' },
        { label: 'Violet', value: 'violet' },
      ],
    },
  ],
}
