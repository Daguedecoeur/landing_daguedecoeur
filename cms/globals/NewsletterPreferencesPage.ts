import type { GlobalConfig } from 'payload'

export const NewsletterPreferencesPage: GlobalConfig = {
  slug: 'newsletter-preferences-page',
  label: 'Page Préférences Newsletter',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'Vos Préférences Newsletter',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre',
      defaultValue: 'Choisissez les newsletters que vous souhaitez recevoir.',
    },
    {
      name: 'unsubscribeWarning',
      type: 'textarea',
      label: 'Message de désabonnement',
      defaultValue: 'Quel dommage de vous voir partir… Vous manquerez nos meilleurs conseils de Maître du Jeu et nos récaps mensuels.',
    },
    {
      name: 'confirmLabel',
      type: 'text',
      label: 'Bouton de confirmation (quand tout est désactivé)',
      defaultValue: 'Oui, je suis sûr(e)',
    },
    {
      name: 'cancelLabel',
      type: 'text',
      label: 'Bouton d\'annulation',
      defaultValue: 'Non, je reste !',
    },
    {
      name: 'successMessage',
      type: 'text',
      label: 'Message de succès',
      defaultValue: 'Vos préférences ont été mises à jour !',
    },
    {
      name: 'ctaTitle',
      type: 'text',
      label: 'Titre du CTA compte',
      defaultValue: 'Envie de rejoindre la communauté ?',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'Description du CTA compte',
      defaultValue: 'Créez un compte pour accéder à tous vos outils de Maître du Jeu, gérer votre profil et bien plus encore.',
    },
    {
      name: 'ctaButtonLabel',
      type: 'text',
      label: 'Bouton CTA compte',
      defaultValue: 'Créer un compte',
    },
    {
      name: 'ctaButtonHref',
      type: 'text',
      label: 'Lien CTA compte',
      defaultValue: '/signup',
    },
  ],
}
