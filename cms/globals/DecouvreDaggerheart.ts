import type { GlobalConfig } from 'payload'

// Global pour la page /decouvre-daggerheart (NewsletterView)
// Séparé du global "homepage" (landing page /)
export const DiscoverDaggerheart: GlobalConfig = {
  slug: 'decouvre-daggerheart',
  label: 'Page Découvre Daggerheart',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'En-tête',
      fields: [
        {
          name: 'titleStart',
          type: 'text',
          label: 'Titre — début',
          defaultValue: 'Plongez dans',
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Titre — mot en or',
          defaultValue: 'Daggerheart',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Sous-titre',
          defaultValue:
            'Le jeu de rôle narratif de Darrington Press — rejoignez la communauté francophone.',
        },
      ],
    },
    {
      name: 'painPoints',
      type: 'group',
      label: 'Points de douleur',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre section',
          defaultValue: 'Tu en as marre de…',
        },
        {
          name: 'points',
          type: 'array',
          label: 'Points',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texte',
              required: true,
            },
          ],
          defaultValue: [
            { text: 'Passer des heures à préparer une session pour finalement improviser ?' },
            { text: 'Perdre tes joueurs à cause de règles trop complexes ?' },
            { text: 'Manquer de ressources en français pour Daggerheart ?' },
          ],
        },
      ],
    },
    {
      name: 'solution',
      type: 'group',
      label: 'Solution / Bio',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          defaultValue: 'Tu es au bon endroit.',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Texte de présentation',
          defaultValue:
            "Je suis Dilhan, MJ depuis 10 ans, et j'ai créé Dague de Cœur pour t'aider à maîtriser Daggerheart sans te prendre la tête.",
        },
        {
          name: 'signature',
          type: 'text',
          label: 'Signature',
          defaultValue: 'Dilhan, fondateur de Dague de Cœur',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'group',
      label: 'Bénéfices',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre section',
          defaultValue: 'Ce que tu vas recevoir :',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Éléments',
          fields: [
            { name: 'title', type: 'text', label: 'Titre', required: true },
            { name: 'description', type: 'text', label: 'Description', required: true },
          ],
          defaultValue: [
            { title: 'Kit de démarrage PDF', description: 'Règles simplifiées + scénario clé en main.' },
            { title: 'Accès Discord', description: 'La communauté fr pour poser tes questions.' },
            { title: 'Newsletter mensuelle', description: 'Conseils MJ, actu Daggerheart et ressources VF.' },
          ],
        },
      ],
    },
    {
      name: 'form',
      type: 'group',
      label: 'Formulaire',
      fields: [
        { name: 'title', type: 'text', label: 'Titre', defaultValue: 'Prêt à écrire ta propre légende ?' },
        { name: 'subtitle', type: 'text', label: 'Sous-titre', defaultValue: 'Reçois ton accès par email dans la minute.' },
        { name: 'firstNamePlaceholder', type: 'text', label: 'Placeholder prénom', defaultValue: 'Ton Prénom' },
        { name: 'emailPlaceholder', type: 'text', label: 'Placeholder email', defaultValue: 'Ton Email' },
        { name: 'acquisitionChannelLabel', type: 'text', label: 'Label canal', defaultValue: "Comment es-tu tombé sur daguedecoeur.fr ?" },
        { name: 'submitButtonDefault', type: 'text', label: 'Bouton (défaut)', defaultValue: 'TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀' },
        { name: 'submitButtonLoading', type: 'text', label: 'Bouton (chargement)', defaultValue: 'Envoi en cours...' },
        { name: 'disclaimer', type: 'text', label: 'Disclaimer', defaultValue: "Pas de spam. Juste de l'aventure. Désinscription possible à tout moment." },
      ],
    },
    {
      name: 'success',
      type: 'group',
      label: 'Message de succès',
      fields: [
        { name: 'title', type: 'text', label: 'Titre', defaultValue: "C'est fait !" },
        { name: 'message', type: 'textarea', label: 'Message', defaultValue: "Ton Kit de Démarrage est en route vers ta boîte mail." },
        { name: 'communityTitle', type: 'text', label: 'Titre communauté', defaultValue: 'En attendant, ne reste pas seul !' },
        { name: 'communityText', type: 'text', label: 'Texte communauté', defaultValue: "La communauté t'attend pour t'accueillir." },
        { name: 'communityCta', type: 'text', label: 'CTA', defaultValue: 'REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾' },
        { name: 'communityLink', type: 'text', label: 'Lien', defaultValue: 'https://discord.com/invite/Wp5NKt56BX' },
        { name: 'signatureText', type: 'text', label: 'Texte signature', defaultValue: "À tout de suite de l'autre côté," },
        { name: 'signatureName', type: 'text', label: 'Nom', defaultValue: 'Dilhan.' },
      ],
    },
  ],
}
