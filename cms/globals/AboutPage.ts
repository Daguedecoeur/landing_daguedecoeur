import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'À Propos',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'À Propos',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre / Accroche',
      admin: {
        description: "Une phrase d accroche affichée sous le titre principal.",
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Image de couverture (optionnel)',
      relationTo: 'media',
      admin: {
        description: 'Image hero affichée en haut de la page.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu de la page',
      required: true,
    },
  ],
}
