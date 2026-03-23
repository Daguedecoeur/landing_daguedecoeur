import type { GlobalConfig } from 'payload'

export const Resources: GlobalConfig = {
  slug: 'resources',
  label: 'Page Ressources / Téléchargements',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'Ressources & Téléchargements',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre',
      defaultValue:
        'Retrouvez ici tous les documents, fiches et outils à télécharger pour vos parties de Daggerheart.',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Catégories de téléchargements',
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
          label: 'Icône Material Symbols (ex: picture_as_pdf, image, description)',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Fichiers à télécharger',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nom du fichier',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description courte',
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'Fichier (PDF, image…)',
              required: true,
            },
            {
              name: 'fileSize',
              type: 'text',
              label: 'Taille du fichier (ex: 2.4 Mo)',
            },
            {
              name: 'fileType',
              type: 'text',
              label: 'Type affiché (ex: PDF, PNG, ZIP)',
            },
          ],
        },
      ],
    },
  ],
}
