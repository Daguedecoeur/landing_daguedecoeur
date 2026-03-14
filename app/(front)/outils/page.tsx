import type { Metadata } from 'next'
import { getToolsUseCase } from '@/features/tools'
import { ToolsLayout } from '@/features/tools/presentation/ToolsLayout'

export const metadata: Metadata = {
  title: 'Outils & Ressources — Dague de Cœur',
  description: "L'annuaire ultime des outils, médias et communautés pour sublimer vos parties de Daggerheart.",
  alternates: {
    canonical: 'https://daguedecoeur.fr/outils',
  },
}

export default async function ToolsPage() {
  const useCase = getToolsUseCase()
  const data = await useCase.execute()

  return <ToolsLayout data={data} />
}
