import { getAboutPageUseCase } from '@/features/about'
import { LexicalRenderer } from '@/features/blog/presentation/components/LexicalRenderer'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'À Propos | Dague de Coeur',
  description: 'Découvrez Dague de Coeur, la communauté française dédiée à Daggerheart. Notre histoire, notre mission et notre équipe.',
}

export default async function AboutPage() {
  const useCase = getAboutPageUseCase()
  const data = await useCase.execute()

  return (
    <main className="flex-1 flex flex-col bg-deep-violet py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Hero section */}
        <h1 className="font-cinzel text-4xl font-bold tracking-tight text-gold sm:text-5xl mb-4 text-center drop-shadow-md">
          {data.title}
        </h1>

        {data.subtitle && (
          <p className="text-cream/70 text-center text-lg font-lato mb-12 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}

        {!data.subtitle && <div className="mb-12" />}

        {/* Cover image */}
        {data.coverImage && (
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-12 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <Image
              src={data.coverImage.url}
              alt={data.coverImage.alt || 'À Propos — Dague de Coeur'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Rich text content */}
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
