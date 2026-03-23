import type { GlobalConfig } from 'payload'

export const Partners: GlobalConfig = {
  slug: 'partners',
  label: 'Page Partenaires',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'Nos Partenaires',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre',
      defaultValue: 'Les alliés qui rendent notre aventure possible.',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partenaires',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom du partenaire',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Lien vers le site',
        },
      ],
    },
  ],
}
