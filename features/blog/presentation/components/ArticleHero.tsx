import Image from 'next/image'
import Link from 'next/link'
import type { ArticleTag } from '../../domain/article.model'
import { Badge } from '@/components/ui/badge'

interface ArticleHeroProps {
  title: string
  coverImageUrl: string | null
  coverImageAlt: string | null
  publishedAt: string | null
  tags: ArticleTag[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function estimateReadingTime(title: string): number {
  // Rough estimate based on average article length
  return Math.max(5, Math.ceil(title.length / 10))
}

export function ArticleHero({
  title,
  coverImageUrl,
  coverImageAlt,
  publishedAt,
  tags,
}: ArticleHeroProps) {
  const primaryTag = tags[0]

  return (
    <div className="relative pt-24 pb-32 px-6 flex flex-col items-center justify-center bg-deep-violet overflow-hidden">
      {/* Cover Image Background */}
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt={coverImageAlt ?? title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-violet/80 via-deep-violet/85 to-deep-violet" />

      <div className="max-w-[960px] w-full relative z-10 flex flex-col items-center text-center mt-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-cream/40 text-sm">
          <Link href="/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          {primaryTag && (
            <>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <Badge
                variant="outline"
                className="text-gold border-gold/30 font-cinzel tracking-widest uppercase text-xs"
              >
                {primaryTag.label}
              </Badge>
            </>
          )}
        </div>

        {/* Title with decorative borders */}
        <div className="relative inline-block mb-8 px-8">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold opacity-50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold opacity-50" />
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-bold text-cream leading-tight">
            {title}
          </h1>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-cream/50 text-sm flex-wrap justify-center">
          <span className="text-cream">Par Dilhan</span>
          {publishedAt && (
            <>
              <span>•</span>
              <span>{formatDate(publishedAt)}</span>
            </>
          )}
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {estimateReadingTime(title)} min de lecture
          </span>
        </div>
      </div>

      {/* Gradient Transition to Parchment */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-cream" />
    </div>
  )
}
