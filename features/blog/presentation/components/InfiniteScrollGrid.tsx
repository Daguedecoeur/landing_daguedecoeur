'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ArticleListItem, PaginatedResult } from '../../domain/article.model'

/**
 * Fixed bento layout positions matching the Stitch mockup.
 * The layout pattern repeats every 8 articles.
 *
 * Row 1: [Featured 7-col hero] [Medium cream 5-col] [Medium glass 5-col]
 * Row 2: [Small cream 4-col] [Small image 4-col] [Small cream 4-col]
 * Row 3: [Wide 8-col] [Quote 4-col]
 */

// Default images from the Stitch mockup (used when no cover image in Payload)
const DEFAULT_IMAGES = {
  hero: '/images/blog-defaults/hero-forest.jpg',
  artifact: '/images/blog-defaults/artifact.jpg',
  character: '/images/blog-defaults/character.jpg',
}

interface InfiniteScrollGridProps {
  initialData: PaginatedResult<ArticleListItem>
  activeTag?: string
  loadMoreAction: (page: number, tagSlug?: string) => Promise<PaginatedResult<ArticleListItem>>
}

// ─── Card Components ─────────────────────────────────────────

function HeroCard({ article }: { article: ArticleListItem }) {
  const tagLabel = article.tags[0]?.label
  const coverUrl = article.coverImageUrl ?? DEFAULT_IMAGES.hero

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-7 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-gold/20"
      style={{ minHeight: '450px' }}
    >
      <Image
        src={coverUrl}
        alt={article.coverImageAlt ?? article.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 58vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-violet via-deep-violet/60 to-transparent" />
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
          <p className="text-cream/80 font-lato text-base max-w-2xl line-clamp-2">{article.excerpt}</p>
        )}
        <div className="mt-6 flex items-center gap-3 text-gold text-sm font-cinzel tracking-wider uppercase">
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span>Lire le récit</span>
        </div>
      </div>
    </Link>
  )
}

function CreamCard({ article }: { article: ArticleListItem }) {
  const tagLabel = article.tags[0]?.label
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    : null

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-5 bg-cream text-deep-violet rounded-xl p-6 parchment-border flex flex-col justify-between shadow-md group cursor-pointer border border-gold/30"
    >
      <div>
        {tagLabel && (
          <span className="text-gold text-xs font-bold uppercase font-cinzel tracking-widest block mb-3">
            {tagLabel}
          </span>
        )}
        <h4 className="text-xl font-bold font-cinzel leading-snug mb-2 group-hover:text-gold transition-colors">
          {article.title}
        </h4>
        {article.excerpt && (
          <p className="font-lato text-sm text-deep-violet/70 line-clamp-2">{article.excerpt}</p>
        )}
      </div>
      {formattedDate && (
        <div className="mt-4 text-xs font-lato text-deep-violet/60 uppercase tracking-wide">
          {formattedDate}
        </div>
      )}
    </Link>
  )
}

function GlassCard({ article }: { article: ArticleListItem }) {
  const tagLabel = article.tags[0]?.label

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-5 glassmorphism rounded-xl p-6 flex flex-col justify-between shadow-md group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute -right-10 -bottom-10 opacity-10">
        <span className="material-symbols-outlined text-[120px] text-gold">swords</span>
      </div>
      <div className="relative z-10">
        {tagLabel && (
          <span className="text-gold text-xs font-bold uppercase font-cinzel tracking-widest block mb-3">
            {tagLabel}
          </span>
        )}
        <h4 className="text-cream text-xl font-bold font-cinzel leading-snug mb-2 group-hover:text-gold transition-colors">
          {article.title}
        </h4>
        {article.excerpt && (
          <p className="font-lato text-sm text-cream/70 line-clamp-2">{article.excerpt}</p>
        )}
      </div>
    </Link>
  )
}

function SmallCreamCard({ article }: { article: ArticleListItem }) {
  const tagLabel = article.tags[0]?.label
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    : null

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
        <p className="font-lato text-sm text-deep-violet/70 mb-4 line-clamp-3">{article.excerpt}</p>
      )}
      {formattedDate && (
        <div className="text-xs font-lato text-deep-violet/60 uppercase tracking-wide border-t border-gold/20 pt-3">
          {formattedDate}
        </div>
      )}
    </Link>
  )
}

function SmallImageCard({ article }: { article: ArticleListItem }) {
  const tagLabel = article.tags[0]?.label
  const coverUrl = article.coverImageUrl ?? DEFAULT_IMAGES.artifact

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-4 relative rounded-xl overflow-hidden group cursor-pointer shadow-md border border-gold/20"
      style={{ minHeight: '240px' }}
    >
      <Image
        src={coverUrl}
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
      </div>
    </Link>
  )
}

function WideCard({ article }: { article: ArticleListItem }) {
  const tagLabel = article.tags[0]?.label
  const coverUrl = article.coverImageUrl ?? DEFAULT_IMAGES.character

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="md:col-span-8 glassmorphism rounded-xl overflow-hidden group cursor-pointer shadow-md flex flex-col md:flex-row relative"
    >
      <div className="w-full md:w-2/5 h-48 md:h-auto relative">
        <Image
          src={coverUrl}
          alt={article.coverImageAlt ?? article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
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
          <p className="font-lato text-sm text-cream/80 line-clamp-3 mb-4">{article.excerpt}</p>
        )}
        <span className="text-deep-violet bg-gold px-4 py-2 rounded-full text-xs font-bold uppercase font-cinzel tracking-wider w-max hover:bg-gold/90 transition-colors">
          Lire l&apos;article
        </span>
      </div>
    </Link>
  )
}

function QuoteCard() {
  return (
    <div className="md:col-span-4 bg-cream text-deep-violet rounded-xl p-8 parchment-border shadow-md flex flex-col items-center text-center justify-center border border-gold/30">
      <span className="material-symbols-outlined text-4xl text-gold/40 mb-4">format_quote</span>
      <h4 className="text-xl font-bold font-cinzel leading-snug mb-4 italic">
        &quot;La dague la plus mortelle n&apos;est pas celle qu&apos;on aiguise, mais celle qu&apos;on cache.&quot;
      </h4>
      <div className="w-12 h-[1px] bg-gold mb-4" />
      <p className="font-lato text-xs text-deep-violet/70 uppercase tracking-widest">
        — Proverbe de la Guilde des Ombres
      </p>
    </div>
  )
}

/**
 * Maps a position index to a card type.
 * Pattern repeats every 8 articles.
 */
function renderArticleAtPosition(article: ArticleListItem, positionInPattern: number) {
  switch (positionInPattern) {
    case 0:
      return <HeroCard article={article} />
    case 1:
      return <CreamCard article={article} />
    case 2:
      return <GlassCard article={article} />
    case 3:
      return <SmallCreamCard article={article} />
    case 4:
      return <SmallImageCard article={article} />
    case 5:
      return <SmallCreamCard article={article} />
    case 6:
      return <WideCard article={article} />
    default:
      return <SmallCreamCard article={article} />
  }
}

// ─── Skeleton ────────────────────────────────────────────────

function SkeletonCard({ colSpan, minH }: { colSpan: string; minH: string }) {
  return (
    <div className={`${colSpan} rounded-xl glassmorphism animate-pulse`} style={{ minHeight: minH }}>
      <div className="p-6 flex flex-col justify-end h-full">
        <div className="h-3 w-20 bg-gold/20 rounded mb-3" />
        <div className="h-6 w-3/4 bg-cream/10 rounded mb-2" />
        <div className="h-4 w-1/2 bg-cream/10 rounded" />
      </div>
    </div>
  )
}

// ─── Main Grid ───────────────────────────────────────────────

export function InfiniteScrollGrid({ initialData, activeTag, loadMoreAction }: InfiniteScrollGridProps) {
  const [articles, setArticles] = useState<ArticleListItem[]>(initialData.docs)
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage)
  const [nextPage, setNextPage] = useState(initialData.nextPage)
  const [isPending, startTransition] = useTransition()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setArticles(initialData.docs)
    setHasNextPage(initialData.hasNextPage)
    setNextPage(initialData.nextPage)
  }, [initialData])

  const loadMore = useCallback(() => {
    if (!hasNextPage || !nextPage || isPending) return

    startTransition(async () => {
      const result = await loadMoreAction(nextPage, activeTag)
      setArticles((prev) => [...prev, ...result.docs])
      setHasNextPage(result.hasNextPage)
      setNextPage(result.nextPage)
    })
  }, [hasNextPage, nextPage, isPending, activeTag, loadMoreAction])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  if (articles.length === 0) {
    return (
      <div className="text-center py-24 border-2 border-gold/30 bg-deep-violet/50 rounded-xl">
        <p className="text-cream text-xl font-cinzel mb-2">Le calme avant la tempête...</p>
        <p className="text-cream/60 font-lato">Aucun article n&apos;a encore été publié.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
        {articles.map((article, index) => {
          const positionInPattern = index % 8
          return (
            <span key={article.id} className="contents">
              {renderArticleAtPosition(article, positionInPattern)}
              {/* Insert quote card after the wide card (position 6) in each pattern */}
              {positionInPattern === 6 && <QuoteCard />}
            </span>
          )
        })}

        {isPending && (
          <>
            <SkeletonCard colSpan="md:col-span-4" minH="200px" />
            <SkeletonCard colSpan="md:col-span-4" minH="200px" />
            <SkeletonCard colSpan="md:col-span-4" minH="200px" />
          </>
        )}
      </div>

      {hasNextPage && <div ref={sentinelRef} className="h-4" />}
    </>
  )
}
