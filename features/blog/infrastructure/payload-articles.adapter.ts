import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Where } from 'payload'
import type { ArticleRepository, ArticleListItem, ArticleTag, PaginatedResult, FeaturedSize, ArticleDetail, ArticleHeading } from '../domain/article.model'
import type { Article, Media, Tag } from '@/payload-types'

function mapTag(tag: number | Tag): ArticleTag | null {
  if (typeof tag === 'number') return null
  return {
    id: tag.id,
    label: tag.label,
    slug: tag.slug,
    color: tag.color ?? null,
  }
}

function mapToArticleListItem(doc: Article): ArticleListItem {
  const cover = typeof doc.coverImage === 'object' && doc.coverImage !== null
    ? doc.coverImage as Media
    : null

  const tags = Array.isArray(doc.tags)
    ? (doc.tags.map(mapTag).filter(Boolean) as ArticleTag[])
    : []

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? null,
    coverImageUrl: cover?.url ?? null,
    coverImageAlt: cover?.alt ?? null,
    publishedAt: doc.publishedAt ?? null,
    tags,
    featuredSize: (doc.featuredSize as FeaturedSize) ?? 'small',
  }
}

/**
 * Recursively extract heading nodes from a Lexical JSON tree.
 */
function extractHeadings(node: Record<string, unknown>): ArticleHeading[] {
  const headings: ArticleHeading[] = []

  if (node.type === 'heading') {
    const tag = node.tag as string | undefined
    if (tag === 'h2' || tag === 'h3') {
      const text = extractTextFromNode(node)
      if (text) {
        const id = text
          .toLowerCase()
          .replace(/[^a-zà-ÿ0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .slice(0, 60)
        headings.push({ id, text, level: tag === 'h2' ? 2 : 3 })
      }
    }
  }

  const children = node.children as Record<string, unknown>[] | undefined
  if (Array.isArray(children)) {
    for (const child of children) {
      headings.push(...extractHeadings(child))
    }
  }

  return headings
}

function extractTextFromNode(node: Record<string, unknown>): string {
  if (typeof node.text === 'string') return node.text
  const children = node.children as Record<string, unknown>[] | undefined
  if (!Array.isArray(children)) return ''
  return children.map(extractTextFromNode).join('')
}

export class PayloadArticlesAdapter implements ArticleRepository {
  async findPublished(tagSlug?: string, page = 1, limit = 8): Promise<PaginatedResult<ArticleListItem>> {
    const payload = await getPayload({ config })

    const conditions: Where[] = [
      { status: { equals: 'published' } },
    ]

    if (tagSlug) {
      conditions.push({ 'tags.slug': { equals: tagSlug } })
    }

    const where: Where = conditions.length === 1 ? conditions[0] : { and: conditions }

    const result = await payload.find({
      collection: 'articles',
      where,
      depth: 1,
      sort: '-publishedAt',
      page,
      limit,
    })

    return {
      docs: result.docs.map(mapToArticleListItem),
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage ?? null,
    }
  }

  async findBySlug(slug: string): Promise<ArticleDetail | null> {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      depth: 2,
      limit: 1,
    })

    const doc = result.docs[0]
    if (!doc) return null

    const cover = typeof doc.coverImage === 'object' && doc.coverImage !== null
      ? doc.coverImage as Media
      : null

    const tags = Array.isArray(doc.tags)
      ? (doc.tags.map(mapTag).filter(Boolean) as ArticleTag[])
      : []

    const content = doc.content as Record<string, unknown>
    const root = content?.root as Record<string, unknown> | undefined
    const headings = root ? extractHeadings(root) : []

    const metaImage = doc.meta?.image
    const metaImageUrl = typeof metaImage === 'object' && metaImage !== null
      ? (metaImage as Media).url ?? null
      : null

    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt ?? null,
      content,
      rawHtml: doc.rawHtml ?? null,
      coverImageUrl: cover?.url ?? null,
      coverImageAlt: cover?.alt ?? null,
      publishedAt: doc.publishedAt ?? null,
      tags,
      headings,
      meta: {
        title: doc.meta?.title ?? null,
        description: doc.meta?.description ?? null,
        imageUrl: metaImageUrl,
      },
    }
  }

  async findAllSlugs(): Promise<string[]> {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      depth: 0,
      limit: 500,
      select: { slug: true },
    })

    return result.docs.map((doc) => doc.slug)
  }
}
