import type { GlobalConfig } from 'payload'

export const PlanningPage: GlobalConfig = {
  slug: 'planning-page',
  label: 'Page Planning',
  admin: {
    description: 'Contenu éditable de la page Planning (hero)',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          defaultValue: 'Planning',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Sous-titre',
          defaultValue: 'Ne manquez aucun événement de la communauté',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Image de fond',
          relationTo: 'media',
        },
      ],
    },
  ],
}
