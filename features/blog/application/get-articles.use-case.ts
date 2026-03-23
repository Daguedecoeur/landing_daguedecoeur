import type { ArticleRepository, ArticleListItem, PaginatedResult } from '../domain/article.model'

export class GetArticlesUseCase {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(tagSlug?: string, page = 1, limit = 8): Promise<PaginatedResult<ArticleListItem>> {
    return this.repository.findPublished(tagSlug, page, limit)
  }
}
