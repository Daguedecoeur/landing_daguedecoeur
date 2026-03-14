import Link from 'next/link'
import Image from 'next/image'
import type { ArticleListItem } from '../../domain/article.model'

interface SmallArticleCardProps {
  article: ArticleListItem
}

export function SmallArticleCard({ article }: SmallArticleCardProps) {
  const tagLabel = article.tags[0]?.label
  const hasImage = !!article.coverImageUrl

  // If the article has a cover image, render image-style card
  if (hasImage) {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="md:col-span-4 relative rounded-xl overflow-hidden group cursor-pointer shadow-md border border-gold/20"
        style={{ minHeight: '240px' }}
      >
        <Image
          src={article.coverImageUrl!}
          alt={article.coverImageAlt ?? article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-violet via-deep-violet/70 to-deep-violet/20" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          {tagLabel && (
            <span className="text-gold text-xs font-bold uppercase font-cinzel tracking-widest block mb-2">
              {tagLabel}
            </span>
          )}
          <h4 className="text-cream text-lg font-bold font-cinzel leading-snug mb-1 group-hover:text-gold transition-colors">
            {article.title}
          </h4>
          {article.excerpt && (
            <p className="font-lato text-xs text-cream/70 line-clamp-2">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    )
  }

  // No image: cream parchment style card
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-4 bg-cream text-deep-violet rounded-xl p-6 parchment-border shadow-md group cursor-pointer border border-gold/30 flex flex-col"
    >
      {tagLabel && (
        <span className="text-gold text-xs font-bold uppercase font-cinzel tracking-widest block mb-3">
          {tagLabel}
        </span>
      )}
      <h4 className="text-lg font-bold font-cinzel leading-snug mb-2 flex-grow group-hover:text-gold transition-colors">
        {article.title}
      </h4>
      {article.excerpt && (
        <p className="font-lato text-sm text-deep-violet/70 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
      )}
      <div className="text-xs font-lato text-deep-violet/60 uppercase tracking-wide border-t border-gold/20 pt-3">
        {article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
          : 'Article'}
      </div>
    </Link>
  )
}
