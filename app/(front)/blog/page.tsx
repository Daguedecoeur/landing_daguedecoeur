import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PayloadArticlesAdapter } from '@/features/blog/infrastructure/payload-articles.adapter'
import { GetArticlesUseCase } from '@/features/blog/application/get-articles.use-case'
import { PageHeader } from '@/features/blog/presentation/components/PageHeader'
import { TagFilterBar } from '@/features/blog/presentation/components/TagFilterBar'
import { InfiniteScrollGrid } from '@/features/blog/presentation/components/InfiniteScrollGrid'
import { loadMoreArticles } from './actions'
import type { ArticleTag } from '@/features/blog/domain/article.model'
import type { Tag } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'La Gazette - Blog | Dague de Cœur',
  description:
    'Les archives de la Confrérie. Articles, chroniques, ressources et actualités de la communauté francophone Daggerheart.',
  openGraph: {
    type: 'website',
    url: 'https://daguedecoeur.fr/blog',
    title: 'La Gazette - Blog | Dague de Cœur',
    description:
      'Les archives de la Confrérie. Articles, chroniques, ressources et actualités.',
    images: [
      {
        url: 'https://daguedecoeur.fr/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dague de Coeur - La Gazette',
      },
    ],
    locale: 'fr_FR',
    siteName: 'Dague de Coeur',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Gazette - Blog | Dague de Cœur',
    description:
      'Les archives de la Confrérie. Articles, chroniques et ressources.',
    images: ['https://daguedecoeur.fr/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://daguedecoeur.fr/blog',
  },
}

export const dynamic = 'force-dynamic'

function mapTag(tag: Tag): ArticleTag {
  return {
    id: tag.id,
    label: tag.label,
    slug: tag.slug,
    color: tag.color ?? null,
  }
}

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag: tagSlug } = await searchParams

  // Composition Root
  const adapter = new PayloadArticlesAdapter()
  const useCase = new GetArticlesUseCase(adapter)
  const initialData = await useCase.execute(tagSlug, 1, 8)

  // Fetch all tags for the filter bar
  const payload = await getPayload({ config })
  const tagsResult = await payload.find({ collection: 'tags', limit: 50, sort: 'label' })
  const tags: ArticleTag[] = tagsResult.docs.map(mapTag)

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col gap-10">
      <PageHeader />

      <Suspense fallback={null}>
        <TagFilterBar tags={tags} activeTag={tagSlug} />
      </Suspense>

      <InfiniteScrollGrid initialData={initialData} activeTag={tagSlug} loadMoreAction={loadMoreArticles} />
    </main>
  )
}
