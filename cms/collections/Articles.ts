import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
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
        description: 'URL-friendly identifier (ex: mon-article)',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extrait',
      admin: {
        description: 'Court résumé affiché sur la liste du blog',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Image de couverture',
      relationTo: 'media',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Catégorie (legacy)',
      admin: {
        description: 'Ancien champ — utiliser les Tags à la place.',
      },
      options: [
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Ressource', value: 'ressource' },
        { label: 'Actualité', value: 'actualite' },
        { label: 'Guide', value: 'guide' },
      ],
    },
    {
      name: 'tags',
      type: 'relationship',
      label: 'Tags',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'Tags affichés sur la carte dans le blog',
      },
    },
    {
      name: 'featuredSize',
      type: 'select',
      label: 'Taille dans la grille',
      defaultValue: 'small',
      options: [
        { label: 'À la Une (7 cols, hero)', value: 'featured' },
        { label: 'Large (8 cols)', value: 'large' },
        { label: 'Moyen (5 cols)', value: 'medium' },
        { label: 'Petit (4 cols)', value: 'small' },
      ],
      admin: {
        description: 'Contrôle la taille de la carte dans la grille bento du blog',
      },
    },
    {
      name: 'rawHtml',
      type: 'textarea',
      label: 'Contenu HTML brut (newsletters)',
      maxLength: 500000,
      admin: {
        description: 'HTML brut importé depuis Brevo. Affiché à la place du richtext quand présent.',
      },
    },
  ],
}
