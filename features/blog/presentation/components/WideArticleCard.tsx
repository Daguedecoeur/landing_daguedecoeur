import Link from 'next/link'
import Image from 'next/image'
import type { ArticleListItem } from '../../domain/article.model'

interface WideArticleCardProps {
  article: ArticleListItem
}

export function WideArticleCard({ article }: WideArticleCardProps) {
  const tagLabel = article.tags[0]?.label

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-8 glassmorphism rounded-xl overflow-hidden group cursor-pointer shadow-md flex flex-col md:flex-row relative"
    >
      {/* Background map texture */}
      {article.coverImageUrl && (
        <div className="w-full md:w-2/5 h-48 md:h-auto relative z-10 overflow-hidden">
          <Image
            src={article.coverImageUrl}
            alt={article.coverImageAlt ?? article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col justify-center relative z-10 w-full md:w-3/5">
        {tagLabel && (
          <span className="text-gold text-xs font-bold uppercase font-cinzel tracking-widest block mb-3">
            {tagLabel}
          </span>
        )}
        <h4 className="text-cream text-2xl font-bold font-cinzel leading-snug mb-3 group-hover:text-gold transition-colors">
          {article.title}
        </h4>
        {article.excerpt && (
          <p className="font-lato text-sm text-cream/80 line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        )}
        <span className="text-deep-violet bg-gold px-4 py-2 rounded-full text-xs font-bold uppercase font-cinzel tracking-wider w-max hover:bg-gold/90 transition-colors">
          Lire l&apos;article
        </span>
      </div>
    </Link>
  )
}
