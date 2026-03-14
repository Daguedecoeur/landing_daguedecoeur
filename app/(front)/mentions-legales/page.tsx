import { getLegalMentionsUseCase } from '@/features/legal-mentions'
import { LexicalRenderer } from '@/features/blog/presentation/components/LexicalRenderer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales & RGPD | Dague de Coeur',
  description: 'Mentions légales et politique de confidentialité du site Dague de Coeur.',
}

export default async function LegalMentionsPage() {
  const useCase = getLegalMentionsUseCase()
  const data = await useCase.execute()

  return (
    <main className="min-h-screen bg-deep-violet py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="font-cinzel text-4xl font-bold tracking-tight text-gold sm:text-5xl mb-12 text-center drop-shadow-md">
          {data.title}
        </h1>
        
        <div className="prose prose-invert prose-p:text-cream prose-headings:text-gold prose-a:text-gold-light hover:prose-a:text-gold-hover max-w-none">
          {data.content ? (
            <LexicalRenderer content={data.content as any} />
          ) : (
            <p className="text-cream text-center italic">Contenu en cours de rédaction...</p>
          )}
        </div>
      </div>
    </main>
  )
}
