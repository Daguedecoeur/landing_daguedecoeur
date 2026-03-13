import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/presentation/AuthLayout'
import { LoginForm } from '@/features/auth/presentation/LoginForm'

export const metadata: Metadata = {
  title: 'Connexion | Dague de Coeur',
  description: 'Connecte-toi à ton compte Dague de Coeur pour accéder à la communauté francophone Daggerheart.',
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
