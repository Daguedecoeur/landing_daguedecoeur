import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/presentation/AuthLayout'
import { LoginForm } from '@/features/auth/presentation/LoginForm'

export const metadata: Metadata = {
  title: 'Connexion | Dague de Coeur',
  description: 'Connecte-toi à ton compte Dague de Coeur pour accéder à la communauté francophone Daggerheart.',
}

type Props = {
  searchParams: Promise<{ redirectTo?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirectTo } = await searchParams

  return (
    <AuthLayout>
      <LoginForm redirectTo={redirectTo} />
    </AuthLayout>
  )
}
