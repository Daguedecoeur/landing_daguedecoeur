import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PayloadArticlesAdapter } from '@/features/blog/infrastructure/payload-articles.adapter'
import { GetArticleBySlugUseCase } from '@/features/blog/application/get-article-by-slug.use-case'
import { createClient } from '@/lib/supabase/server'
import { ArticleHero } from '@/features/blog/presentation/components/ArticleHero'
import { ArticleSidebar } from '@/features/blog/presentation/components/ArticleSidebar'
import { ArticleBody } from '@/features/blog/presentation/components/ArticleBody'
import { SoftGatingOverlay } from '@/features/blog/presentation/components/SoftGatingOverlay'
import { ParchmentToFooterWave } from '@/features/blog/presentation/components/ParchmentToFooterWave'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// SSG: generate all published article pages at build time
export async function generateStaticParams() {
  const adapter = new PayloadArticlesAdapter()
  const slugs = await adapter.findAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60

// Dynamic SEO metadata
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const adapter = new PayloadArticlesAdapter()
  const article = await adapter.findBySlug(slug)

  if (!article) return { title: 'Article introuvable' }

  const title = article.meta.title ?? `${article.title} | Dague de Cœur`
  const description = article.meta.description ?? article.excerpt ?? ''
  const imageUrl = article.meta.imageUrl ?? article.coverImageUrl ?? 'https://daguedecoeur.fr/images/og-image.png'

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: `https://daguedecoeur.fr/blog/${slug}`,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      locale: 'fr_FR',
      siteName: 'Dague de Cœur',
      publishedTime: article.publishedAt ?? undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://daguedecoeur.fr/blog/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  // Check authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  // Composition Root
  const adapter = new PayloadArticlesAdapter()
  const useCase = new GetArticleBySlugUseCase(adapter)
  const data = await useCase.execute(slug, isAuthenticated)

  if (!data) notFound()

  const { article } = data

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: article.coverImageUrl,
            datePublished: article.publishedAt,
            author: {
              '@type': 'Person',
              name: 'Dilhan',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Dague de Cœur',
              url: 'https://daguedecoeur.fr',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://daguedecoeur.fr/blog/${slug}`,
            },
          }),
        }}
      />

      <ArticleHero
        title={article.title}
        coverImageUrl={article.coverImageUrl}
        coverImageAlt={article.coverImageAlt}
        publishedAt={article.publishedAt}
        tags={article.tags}
      />

      {/* Content zone (parchment) */}
      <div className="bg-cream flex-grow relative pb-24">
        <div className="max-w-[1200px] mx-auto px-6 flex items-start gap-12 relative">
          <ArticleSidebar headings={article.headings} />

          <div className="flex-1 min-w-0">
            <ArticleBody content={article.content} rawHtml={article.rawHtml} />

            {!isAuthenticated && (
              <div className="mt-4">
                <SoftGatingOverlay />
              </div>
            )}
          </div>
        </div>
      </div>

      <ParchmentToFooterWave />
    </>
  )
}
