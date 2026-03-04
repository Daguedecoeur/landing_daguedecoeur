import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Page d\'accueil',
  fields: [
    // ── Header ──
    {
      name: 'header',
      type: 'group',
      label: 'En-tête',
      fields: [
        {
          name: 'titleStart',
          type: 'text',
          label: 'Début du titre',
          required: true,
          defaultValue: 'Ose enfin te lancer dans le Jeu de Rôle, découvre',
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Mot mis en avant',
          required: true,
          defaultValue: 'Daggerheart',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Sous-titre',
          required: true,
          defaultValue: 'Le système narratif et intuitif pour vivre des aventures épiques, même si tu n\'as jamais lancé un dé de ta vie',
        },
      ],
    },

    // ── Pain Points ──
    {
      name: 'painPoints',
      type: 'group',
      label: 'Points de douleur',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
          defaultValue: 'Tu as envie de jouer ou de masteriser, mais...',
        },
        {
          name: 'points',
          type: 'array',
          label: 'Points',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Point',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Solution / Bio ──
    {
      name: 'solution',
      type: 'group',
      label: 'Solution / Bio',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
          defaultValue: 'Critical Role a créé ce Kit de Démarrage pour toi.',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Bio (markdown léger supporté)',
          required: true,
        },
        {
          name: 'signature',
          type: 'text',
          label: 'Signature',
          defaultValue: '- Dilhan',
        },
      ],
    },

    // ── Benefits ──
    {
      name: 'benefits',
      type: 'group',
      label: 'Bénéfices',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          required: true,
          defaultValue: 'Ensuite, en t\'inscrivant, tu reçois immédiatement :',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Éléments',
          minRows: 1,
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titre',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Form ──
    {
      name: 'form',
      type: 'group',
      label: 'Formulaire',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          defaultValue: 'Prêt à écrire ta propre légende ?',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Sous-titre',
          defaultValue: 'Reçois ton accès par email dans la minute.',
        },
        {
          name: 'firstNamePlaceholder',
          type: 'text',
          label: 'Placeholder prénom',
          defaultValue: 'Ton Prénom',
        },
        {
          name: 'emailPlaceholder',
          type: 'text',
          label: 'Placeholder email',
          defaultValue: 'Ton Email',
        },
        {
          name: 'acquisitionChannelLabel',
          type: 'text',
          label: 'Label canal d\'acquisition',
          defaultValue: 'Comment es-tu tombé sur daguedecoeur.fr ?',
        },
        {
          name: 'submitButtonDefault',
          type: 'text',
          label: 'Texte bouton (défaut)',
          defaultValue: 'TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀',
        },
        {
          name: 'submitButtonLoading',
          type: 'text',
          label: 'Texte bouton (chargement)',
          defaultValue: 'Envoi en cours...',
        },
        {
          name: 'disclaimer',
          type: 'text',
          label: 'Disclaimer',
          defaultValue: 'Pas de spam. Juste de l\'aventure. Désinscription possible à tout moment.',
        },
      ],
    },

    // ── Success ──
    {
      name: 'success',
      type: 'group',
      label: 'Message de succès',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          defaultValue: 'C\'est fait !',
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Message',
          defaultValue: 'Ton Kit de Démarrage est en route vers ta boîte mail (vérifie tes spams, les gobelins les cachent parfois).',
        },
        {
          name: 'communityTitle',
          type: 'text',
          label: 'Titre communauté',
          defaultValue: 'En attendant, ne reste pas seul !',
        },
        {
          name: 'communityText',
          type: 'text',
          label: 'Texte communauté',
          defaultValue: 'La communauté t\'attend pour t\'accueillir.',
        },
        {
          name: 'communityCta',
          type: 'text',
          label: 'CTA communauté',
          defaultValue: 'REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾',
        },
        {
          name: 'communityLink',
          type: 'text',
          label: 'Lien communauté',
          defaultValue: 'https://discord.com/invite/Wp5NKt56BX',
        },
        {
          name: 'signatureText',
          type: 'text',
          label: 'Texte signature',
          defaultValue: 'À tout de suite de l\'autre côté,',
        },
        {
          name: 'signatureName',
          type: 'text',
          label: 'Nom signature',
          defaultValue: 'Dilhan.',
        },
      ],
    },
  ],
}
