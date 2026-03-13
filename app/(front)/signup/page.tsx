import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/presentation/AuthLayout'
import { SignUpForm } from '@/features/auth/presentation/SignUpForm'

export const metadata: Metadata = {
  title: 'Créer un compte | Dague de Coeur',
  description: 'Rejoins la communauté francophone Daggerheart en créant ton compte Dague de Coeur.',
}

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}
