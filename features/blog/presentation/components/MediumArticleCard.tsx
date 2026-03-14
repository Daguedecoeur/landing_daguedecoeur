import Link from 'next/link'
import type { ArticleListItem } from '../../domain/article.model'

interface MediumArticleCardProps {
  article: ArticleListItem
  variant?: 'cream' | 'glass'
}

export function MediumArticleCard({ article, variant = 'cream' }: MediumArticleCardProps) {
  const tagLabel = article.tags[0]?.label
  const isCream = variant === 'cream'

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    : null

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`md:col-span-5 rounded-xl p-6 flex flex-col justify-between shadow-md group cursor-pointer relative overflow-hidden ${
        isCream
          ? 'bg-cream text-deep-violet parchment-border border border-gold/30'
          : 'glassmorphism'
      }`}
    >
      {/* Background icon for glass variant */}
      {!isCream && (
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <span className="material-symbols-outlined text-[120px] text-gold">swords</span>
        </div>
      )}

      <div className={!isCream ? 'relative z-10' : ''}>
        {tagLabel && (
          <span className="text-gold text-xs font-bold uppercase font-cinzel tracking-widest block mb-3">
            {tagLabel}
          </span>
        )}
        <h4
          className={`text-xl font-bold font-cinzel leading-snug mb-2 group-hover:text-gold transition-colors ${
            isCream ? 'text-deep-violet' : 'text-cream'
          }`}
        >
          {article.title}
        </h4>
        {article.excerpt && (
          <p
            className={`font-lato text-sm line-clamp-2 ${
              isCream ? 'text-deep-violet/70' : 'text-cream/70'
            }`}
          >
            {article.excerpt}
          </p>
        )}
      </div>

      {formattedDate && (
        <div
          className={`mt-4 text-xs font-lato uppercase tracking-wide ${
            isCream ? 'text-deep-violet/60' : 'text-cream/60'
          } ${!isCream ? 'relative z-10' : ''}`}
        >
          {formattedDate}
        </div>
      )}
    </Link>
  )
}
