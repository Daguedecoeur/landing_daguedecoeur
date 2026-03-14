import { z } from 'zod'

// ─── Personal Data ────────────────────────────────────────────
export const UpdatePersonalDataSchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  country: z.string().max(100).optional(),
})

export type UpdatePersonalData = z.infer<typeof UpdatePersonalDataSchema>

// ─── Newsletter Preferences ───────────────────────────────────
export const UpdateNewsletterSchema = z.object({
  newsletterDebutant: z.boolean(),
  newsletterRegulier: z.boolean(),
  newsletterMensuel: z.boolean(),
})

export type UpdateNewsletter = z.infer<typeof UpdateNewsletterSchema>

// ─── Password Change ──────────────────────────────────────────
export const UpdatePasswordSchema = z.object({
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas.',
  path: ['confirmPassword'],
})

export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>
