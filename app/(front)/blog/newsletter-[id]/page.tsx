import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id: slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const article = result.docs[0]
  if (!article) return { title: 'Article introuvable' }

  return {
    title: `${article.title} | Dague de Cœur`,
    description: article.excerpt ?? undefined,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id: slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const article = result.docs[0]
  if (!article) notFound()

  const coverUrl =
    typeof article.coverImage === 'object' && article.coverImage?.url
      ? article.coverImage.url
      : null

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const tags = Array.isArray(article.tags)
    ? article.tags.map((t) => (typeof t === 'object' ? t : null)).filter(Boolean)
    : []

  return (
    <div className="bg-deep-violet min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-gold/60 hover:text-gold flex items-center gap-2 text-sm font-cinzel transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux archives
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-gold/30 pb-8 mb-8 text-center">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex gap-2 justify-center mb-4">
              {tags.map((tag) => (
                <span
                  key={tag!.id}
                  className="bg-gold text-deep-violet text-xs font-bold uppercase font-cinzel tracking-widest px-3 py-1 rounded"
                >
                  {tag!.label}
                </span>
              ))}
            </div>
          )}

          {publishedDate && (
            <span className="block text-gold text-sm font-cinzel mb-4">{publishedDate}</span>
          )}

          <h1 className="text-3xl md:text-5xl font-cinzel text-cream leading-tight mb-6">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-cream/70 font-lato text-lg max-w-2xl mx-auto">{article.excerpt}</p>
          )}
        </header>

        {/* Cover image */}
        {coverUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10">
            <Image
              src={coverUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Content */}
        {article.rawHtml ? (
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div
              className="email-content"
              dangerouslySetInnerHTML={{ __html: article.rawHtml }}
            />
          </div>
        ) : (
          <div className="prose prose-invert prose-gold max-w-none font-lato">
            {/* Lexical richtext would be rendered here */}
            <p className="text-cream/60 italic">Contenu à venir.</p>
          </div>
        )}
      </div>
    </div>
  )
}
