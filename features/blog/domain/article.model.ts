export interface ArticleTag {
  id: number
  label: string
  slug: string
  color?: 'gold' | 'cream' | 'violet' | null
}

export type FeaturedSize = 'featured' | 'large' | 'medium' | 'small'

export interface ArticleListItem {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  coverImageUrl?: string | null
  coverImageAlt?: string | null
  publishedAt?: string | null
  tags: ArticleTag[]
  featuredSize: FeaturedSize
}

export interface ArticleHeading {
  id: string
  text: string
  level: 2 | 3
}

export interface ArticleDetail {
  id: number
  title: string
  slug: string
  excerpt: string | null
  /** Lexical richText root object */
  content: Record<string, unknown>
  /** Raw HTML content for Brevo-imported newsletter articles */
  rawHtml: string | null
  coverImageUrl: string | null
  coverImageAlt: string | null
  publishedAt: string | null
  tags: ArticleTag[]
  headings: ArticleHeading[]
  meta: {
    title: string | null
    description: string | null
    imageUrl: string | null
  }
}

export interface PaginatedResult<T> {
  docs: T[]
  hasNextPage: boolean
  nextPage: number | null
}

export interface ArticleRepository {
  findPublished(tagSlug?: string, page?: number, limit?: number): Promise<PaginatedResult<ArticleListItem>>
  findBySlug(slug: string): Promise<ArticleDetail | null>
  findAllSlugs(): Promise<string[]>
}
