import type { GlobalConfig } from 'payload'

export const LegalMentions: GlobalConfig = {
  slug: 'legal-mentions',
  label: 'Mentions Légales & RGPD',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'Mentions Légales & RGPD',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu (Mentions Légales & Politique de Confidentialité)',
      required: true,
    },
  ],
}
