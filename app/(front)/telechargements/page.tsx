import type { Metadata } from 'next'
import { getResourcesUseCase, ResourcesLayout } from '@/features/resources'

export const metadata: Metadata = {
  title: 'Téléchargements Gratuits — Dague de Cœur',
  description:
    'Téléchargez les fiches, PDFs et ressources pour vos parties de Daggerheart. Retrouvez également le SRD en français et les liens officiels.',
  alternates: {
    canonical: 'https://daguedecoeur.fr/telechargements',
  },
}

export default async function TelechargmentsPage() {
  const useCase = getResourcesUseCase()
  const data = await useCase.execute()

  return <ResourcesLayout data={data} />
}
