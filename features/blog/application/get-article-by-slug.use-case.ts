import type { ArticleRepository, ArticleDetail } from '../domain/article.model'

export interface ArticlePageData {
  article: ArticleDetail
  /** Truncated content for soft gating (anonymous visitors) */
  truncatedContent: Record<string, unknown> | null
  isAuthenticated: boolean
}

/**
 * Truncates Lexical content to approximately the first 20% of top-level children.
 * Returns a deep-cloned root with only the selected children.
 */
function truncateContent(content: Record<string, unknown>, ratio = 0.2): Record<string, unknown> {
  const root = content.root as Record<string, unknown> | undefined
  if (!root) return content

  const children = root.children as Record<string, unknown>[]
  if (!Array.isArray(children) || children.length === 0) return content

  const keepCount = Math.max(1, Math.ceil(children.length * ratio))
  const truncatedChildren = children.slice(0, keepCount)

  return {
    ...content,
    root: {
      ...root,
      children: truncatedChildren,
    },
  }
}

export class GetArticleBySlugUseCase {
  constructor(private readonly repository: ArticleRepository) {}

  async execute(slug: string, isAuthenticated: boolean): Promise<ArticlePageData | null> {
    const article = await this.repository.findBySlug(slug)
    if (!article) return null

    if (isAuthenticated) {
      return {
        article,
        truncatedContent: null,
        isAuthenticated: true,
      }
    }

    // Soft gating: send only ~20% of content for anonymous visitors
    const truncatedContent = truncateContent(article.content)

    // For rawHtml articles (Brevo newsletters), truncate the HTML
    const truncatedRawHtml = article.rawHtml
      ? truncateHtml(article.rawHtml, 0.2)
      : null

    return {
      article: {
        ...article,
        // Strip full content — only truncated content will be sent to client
        content: truncatedContent,
        rawHtml: truncatedRawHtml,
      },
      truncatedContent,
      isAuthenticated: false,
    }
  }
}

/**
 * Rough HTML truncation: keeps only the first ~ratio of top-level block elements.
 */
function truncateHtml(html: string, ratio: number): string {
  // Split on major block-level closing tags to estimate structure
  const blocks = html.split(/<\/(?:p|div|tr|table|h[1-6])>/gi)
  const keepCount = Math.max(1, Math.ceil(blocks.length * ratio))
  const truncated = blocks.slice(0, keepCount)
  // Re-join and close at a safe boundary
  return truncated.join('</p>') + '</p>'
}
