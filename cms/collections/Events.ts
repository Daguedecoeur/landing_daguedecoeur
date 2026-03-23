import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startDate', 'status'],
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
        description: 'URL-friendly identifier (ex: stream-eldoria)',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: "Type d'événement",
      required: true,
      options: [
        { label: '🎮 Stream', value: 'stream' },
        { label: '⚔️ Sortie de jeu', value: 'game-release' },
        { label: '🏰 Convention', value: 'convention' },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Date de début',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Date de fin',
      admin: {
        description: 'Optionnel — pour les conventions multi-jours',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Court résumé affiché sur les cartes',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Image de couverture',
      relationTo: 'media',
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Lien externe',
      admin: {
        description: 'Lien Twitch, page convention, page produit, etc.',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Texte du bouton',
      admin: {
        description: 'Par défaut : "Voir détails"',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lieu',
      admin: {
        description: 'Pour les conventions (ex: Paris, Cannes)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mettre en avant',
      defaultValue: false,
      admin: {
        description: 'Afficher dans la section "Conventions à venir"',
      },
    },
  ],
}
