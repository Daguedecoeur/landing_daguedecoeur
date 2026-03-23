/** Brevo newsletter list IDs — single source of truth */
export const BREVO_LIST_IDS = {
  debutant: 12,   // Astuces MJ (Débutants)
  regulier: 13,   // Conseils Avancés (Réguliers)
  mensuel: 14,    // Le Grand Récap (Mensuel)
} as const

export const ALL_BREVO_LIST_IDS = [
  BREVO_LIST_IDS.debutant,
  BREVO_LIST_IDS.regulier,
  BREVO_LIST_IDS.mensuel,
] as const
