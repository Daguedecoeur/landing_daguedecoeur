import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,  // Images must be publicly accessible
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
    },
  ],
}
