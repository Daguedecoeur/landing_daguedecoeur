import type { GlobalConfig } from 'payload'

export const ProjectsAndLocations: GlobalConfig = {
  slug: 'projects-and-locations',
  label: 'Nos Projets & Lieux',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'locations',
      type: 'array',
      label: 'Projets & Lieux',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nom du lieu / projet',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Sous-titre (ex: Bar à Jeux Heroic Fantasy • Chartres)',
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Ancre (slug pour le menu, ex: dagues-dragons)',
          required: true,
          admin: {
            description: 'Utilisé pour le lien dans le menu. Le lien sera /nos-projets#slug',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description du lieu',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Texte du bouton CTA',
          defaultValue: 'Découvrir →',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'Lien du bouton CTA',
          defaultValue: '#',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo du lieu',
        },
      ],
      defaultValue: [
        {
          title: 'Dagues & Dragons',
          subtitle: 'Salle Immersive de Jeu de Rôle • Chartres',
          slug: 'dagues-dragons',
          description: "Plongez dans une expérience de jeu de rôle unique au cœur de Chartres. Notre salle immersive vous transporte dans un univers de dark fantasy avec décors cinématographiques, lumières et musiques synchronisées.",
          ctaLabel: 'Découvrir le lieu →',
          ctaHref: '/salle-immersive',
        },
        {
          title: 'Studio Dédale',
          subtitle: 'Studio Audiovisuel • Chartres',
          slug: 'studio-dedale',
          description: "Un studio de production audiovisuelle dédié à la création de contenus immersifs. Captation sonore professionnelle, montage, étalonnage et post-production pour donner vie à vos projets les plus ambitieux.",
          ctaLabel: 'Découvrir le studio →',
          ctaHref: '/studio-dedale',
        },
        {
          title: 'Le Tréfon',
          subtitle: 'Bar à Jeux Heroic Fantasy • Chartres',
          slug: 'le-trefon',
          description: "Où les ombres murmurent des secrets oubliés et où l'hydromel coule comme l'or pur. Une taverne mystique nichée dans les profondeurs de la cité, pour des soirées mémorables autour de jeux de société et de décors inspirés de la dark fantasy.",
          ctaLabel: 'Découvrir Le Tréfon →',
          ctaHref: '/trefon',
        },
        {
          title: 'Actual Play',
          subtitle: 'Émission de Jeu de Rôle en direct',
          slug: 'actual-play',
          description: "Suivez nos aventures épiques en direct ! Notre émission de jeu de rôle Daggerheart vous plonge au cœur de récits captivants, diffusés en live et disponibles en replay.",
          ctaLabel: 'Voir les épisodes →',
          ctaHref: '/actual-play',
        },
      ],
    },
  ],
}
