'use server'

import { PayloadArticlesAdapter } from '@/features/blog/infrastructure/payload-articles.adapter'
import type { ArticleListItem, PaginatedResult } from '@/features/blog/domain/article.model'

export async function loadMoreArticles(page: number, tagSlug?: string): Promise<PaginatedResult<ArticleListItem>> {
  const adapter = new PayloadArticlesAdapter()
  return adapter.findPublished(tagSlug, page, 8)
}
