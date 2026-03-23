import Link from 'next/link'
import Image from 'next/image'
import type { ArticleListItem } from '../../domain/article.model'

interface FeaturedArticleCardProps {
  article: ArticleListItem
}

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  const tagLabel = article.tags[0]?.label

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-7 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-gold/20"
      style={{ minHeight: '450px' }}
    >
      {/* Cover image */}
      {article.coverImageUrl && (
        <Image
          src={article.coverImageUrl}
          alt={article.coverImageAlt ?? article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 58vw"
          priority
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-violet via-deep-violet/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {tagLabel && (
          <span className="bg-gold text-deep-violet text-xs font-bold uppercase font-cinzel tracking-widest px-3 py-1 rounded w-max mb-4">
            {tagLabel}
          </span>
        )}
        <h3 className="text-cream text-3xl md:text-4xl font-bold font-cinzel leading-tight mb-3">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-cream/80 font-lato text-base max-w-2xl line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3 text-gold text-sm font-cinzel tracking-wider uppercase">
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span>Lire le récit</span>
        </div>
      </div>
    </Link>
  )
}
