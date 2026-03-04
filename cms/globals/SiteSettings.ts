import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Nom du site',
      defaultValue: 'Dague de Coeur',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Communauté Française Daggerheart',
    },
    {
      name: 'discordLink',
      type: 'text',
      label: 'Lien Discord',
      defaultValue: 'https://discord.com/invite/Wp5NKt56BX',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Liens sociaux',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Plateforme',
          options: [
            { label: 'Discord', value: 'discord' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X / Twitter', value: 'twitter' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}
