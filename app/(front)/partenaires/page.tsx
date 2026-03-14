import type { Metadata } from 'next'
import { getPartnersUseCase } from '@/features/partners'
import { PartnersLayout } from '@/features/partners/presentation/PartnersLayout'

export const metadata: Metadata = {
  title: 'Partenaires — Dague de Cœur',
  description: 'Découvrez les partenaires qui soutiennent la communauté francophone de Daggerheart.',
  alternates: {
    canonical: 'https://daguedecoeur.fr/partenaires',
  },
}

export default async function PartenairesPage() {
  const useCase = getPartnersUseCase()
  const data = await useCase.execute()

  return <PartnersLayout data={data} />
}
