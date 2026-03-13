import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage (Landing Page)',
  fields: [

    // ── Hero ──────────────────────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero',
      fields: [
        {
          name: 'titleStart',
          type: 'text',
          label: 'Titre — début',
          defaultValue: 'Lancez-vous dans le Jeu de Rôle avec',
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
            "Rejoignez la 1ère communauté francophone de Daggerheart ! Initiation rapide au JDR, conseils de MJ et kit de démarrage gratuit à télécharger ici.",
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Texte du bouton CTA',
          defaultValue: '👇 TÉLÉCHARGER MON KIT DAGGERHEART GRATUIT',
        },
        {
          name: 'socialProof',
          type: 'text',
          label: 'Social proof (sous le CTA)',
          defaultValue:
            'Rejoignez déjà + 300 joueurs sur le Discord, + de 1000 abonnés sur nos réseaux et + de 500 inscrits à la newsletter.',
        },
      ],
    },

    // ── Features ──────────────────────────────────────────────────────
    {
      name: 'features',
      type: 'group',
      label: 'Section Pourquoi Daggerheart',
      fields: [
        {
          name: 'titleStart',
          type: 'text',
          label: 'Titre — début',
          defaultValue: 'Pourquoi choisir',
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Titre — mot en or',
          defaultValue: 'Daggerheart',
        },
        {
          name: 'titleEnd',
          type: 'text',
          label: 'Titre — fin',
          defaultValue: 'pour débuter le JDR ?',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Cartes fonctionnalités',
          minRows: 1,
          maxRows: 4,
          fields: [
            { name: 'title', type: 'text', label: 'Titre', required: true },
            { name: 'description', type: 'textarea', label: 'Description', required: true },
          ],
          defaultValue: [
            {
              title: 'Une création Critical Role',
              description:
                'Un système de jeu moderne, narratif et ultra-dynamique pensé par les créateurs du plus grand Actual Play au monde.',
            },
            {
              title: 'Le système Espoir & Peur',
              description:
                "Oubliez le simple dé à 20 faces. Avec seulement 2 dés à 12 faces, même vos échecs font avancer l'histoire avec des rebondissements inattendus.",
            },
            {
              title: 'Création de perso express',
              description:
                "Grâce à un système de cartes de capacités très visuel, créez votre héros unique en quelques minutes, sans calculs complexes.",
            },
          ],
        },
        {
          name: 'videoCta',
          type: 'text',
          label: 'Texte bouton vidéo',
          defaultValue: '▶️ Voir le tutoriel vidéo signé par BBE',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'URL vidéo YouTube',
          defaultValue: 'https://www.youtube.com/watch?v=mX-ZTfLZeGg',
        },
      ],
    },

    // ── Kit ───────────────────────────────────────────────────────────
    {
      name: 'kit',
      type: 'group',
      label: "Section Kit d'Initiation",
      fields: [
        {
          name: 'titleStart',
          type: 'text',
          label: 'Titre — début',
          defaultValue: 'Que contient votre',
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Titre — mot en or',
          defaultValue: "Kit d'Initiation Gratuit",
        },
        {
          name: 'titleEnd',
          type: 'text',
          label: 'Titre — fin',
          defaultValue: ' ?',
        },
        {
          name: 'publisherNote',
          type: 'text',
          label: 'Note éditeur',
          defaultValue: 'Publié par Black Book Editions',
        },
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Titre liste',
          defaultValue: 'Votre butin pour démarrer :',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Éléments du kit',
          minRows: 1,
          fields: [
            { name: 'title', type: 'text', label: 'Titre', required: true },
            { name: 'description', type: 'text', label: 'Description', required: true },
          ],
          defaultValue: [
            { title: 'Les règles de base :', description: 'Résumées et traduites en VF.' },
            {
              title: 'Un mini-scénario clé en main :',
              description: 'Parfait pour votre toute première partie en tant que MJ.',
            },
            {
              title: 'Des fiches de personnages :',
              description: 'Des héros pré-tirés prêts à lancer les dés.',
            },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Texte bouton CTA',
          defaultValue: 'JE VEUX MON KIT GRATUIT',
        },
      ],
    },

    // ── FAQ ───────────────────────────────────────────────────────────
    {
      name: 'faq',
      type: 'group',
      label: 'Section FAQ',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre de la section',
          defaultValue: '❓ Foire Aux Questions (FAQ) Daggerheart & JDR',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Questions / Réponses',
          minRows: 1,
          fields: [
            { name: 'question', type: 'text', label: 'Question', required: true },
            { name: 'answer', type: 'textarea', label: 'Réponse', required: true },
          ],
          defaultValue: [
            {
              question: 'Qu\'est-ce que Daggerheart ?',
              answer: 'Daggerheart est un nouveau jeu de rôle sur table (JDR) créé par Darrington Press et l\'équipe célèbre de Critical Role. Contrairement aux systèmes classiques, il se concentre sur une narration dynamique et cinématographique grâce à son système unique de lancer à deux dés à 12 faces (2d12), représentant l\'Espoir et la Peur.',
            },
            {
              question: 'Le jeu Daggerheart est-il disponible en français (VF) ?',
              answer: 'Le jeu officiel est actuellement en cours de traduction en français, mais la communauté francophone est très active ! Sur Dague de Cœur, nous vous mettons à disposition des ressources traduites, des guides vidéos et un kit d\'initiation gratuit en français pour vous permettre de jouer sans attendre la sortie officielle.',
            },
            {
              question: 'Quelle est la différence entre Daggerheart et Donjons & Dragons (D&D 5e) ?',
              answer: 'Là où D&D 5e utilise un dé à 20 faces (d20) et des règles tactiques poussées, Daggerheart utilise un système de 2d12 (un dé d\'Espoir et un dé de Peur). Cela signifie que même en cas d\'échec, l\'histoire avance avec des rebondissements narratifs. De plus, la création de personnage est beaucoup plus rapide et visuelle grâce à un système de cartes de capacités.',
            },
            {
              question: 'Comment débuter facilement avec Daggerheart ?',
              answer: 'Il n\'y a pas besoin de lire un manuel de 300 pages pour commencer ! Téléchargez simplement le kit d\'initiation gratuit mise à disposition. Il contient les règles de base simplifiées, des fiches prêtes à jouer et un scénario court. En 30 minutes, vous et vos amis serez prêts à lancer les dés.',
            },
            {
              question: 'Peut-on venir jouer avec vous en vrai (IRL) ?',
              answer: 'Absolument ! Si vous passez par Chartres, vous pouvez réserver une session épique dans notre salle immersive Dagues & Dragons. Grâce au Studio Dédale, vous jouerez dans un vrai décor de cinéma avec lumières et musiques synchronisées, et vous pourrez même prolonger la soirée à notre taverne fantastique, Le Tréfon.',
            },
          ],
        },
      ],
    },

    // ── Formulaire (modale) ───────────────────────────────────────────
    {
      name: 'form',
      type: 'group',
      label: 'Formulaire (modale)',
      fields: [
        { name: 'title', type: 'text', label: 'Titre', defaultValue: 'Prêt à écrire ta propre légende ?' },
        { name: 'subtitle', type: 'text', label: 'Sous-titre', defaultValue: 'Reçois ton accès par email dans la minute.' },
        { name: 'firstNamePlaceholder', type: 'text', label: 'Placeholder prénom', defaultValue: 'Ton Prénom' },
        { name: 'emailPlaceholder', type: 'text', label: 'Placeholder email', defaultValue: 'Ton Email' },
        { name: 'acquisitionChannelLabel', type: 'text', label: "Label canal", defaultValue: "Comment es-tu tombé sur daguedecoeur.fr ?" },
        { name: 'submitButtonDefault', type: 'text', label: 'Bouton (défaut)', defaultValue: 'TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀' },
        { name: 'submitButtonLoading', type: 'text', label: 'Bouton (chargement)', defaultValue: 'Envoi en cours...' },
        { name: 'disclaimer', type: 'text', label: 'Disclaimer', defaultValue: "Pas de spam. Juste de l'aventure. Désinscription possible à tout moment." },
      ],
    },

    // ── Succès ───────────────────────────────────────────────────────
    {
      name: 'success',
      type: 'group',
      label: 'Message de succès',
      fields: [
        { name: 'title', type: 'text', label: 'Titre', defaultValue: "C'est fait !" },
        { name: 'message', type: 'textarea', label: 'Message', defaultValue: "Ton Kit de Démarrage est en route vers ta boîte mail (vérifie tes spams, les gobelins les cachent parfois)." },
        { name: 'communityTitle', type: 'text', label: 'Titre communauté', defaultValue: 'En attendant, ne reste pas seul !' },
        { name: 'communityText', type: 'text', label: 'Texte communauté', defaultValue: "La communauté t'attend pour t'accueillir." },
        { name: 'communityCta', type: 'text', label: 'CTA communauté', defaultValue: 'REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾' },
        { name: 'communityLink', type: 'text', label: 'Lien communauté', defaultValue: 'https://discord.com/invite/Wp5NKt56BX' },
        { name: 'signatureText', type: 'text', label: 'Texte signature', defaultValue: "À tout de suite de l'autre côté," },
        { name: 'signatureName', type: 'text', label: 'Nom signature', defaultValue: 'Dilhan.' },
      ],
    },
  ],
}
