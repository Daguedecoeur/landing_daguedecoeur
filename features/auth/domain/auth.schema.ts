import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
})

export type LoginData = z.infer<typeof LoginSchema>

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: 'Adresse email invalide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
  })

export type SignUpData = z.infer<typeof SignUpSchema>

export const MagicLinkSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide' }),
})

export type MagicLinkData = z.infer<typeof MagicLinkSchema>
