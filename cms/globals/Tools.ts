import type { GlobalConfig } from 'payload'

export const Tools: GlobalConfig = {
  slug: 'tools',
  label: 'Page Outils & Ressources',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'Outils & Ressources',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre',
      defaultValue: "L'annuaire ultime des outils, médias et communautés pour sublimer vos parties de Daggerheart.",
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Catégories',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom de la catégorie',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icône Material Symbols (ex: castle, groups, build, podcasts)',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Liens / Ressources',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nom du site / outil',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description courte',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icône Material Symbols (ex: book_4, movie, forum, map)',
              defaultValue: 'link',
            },
          ],
        },
      ],
    },
  ],
}
