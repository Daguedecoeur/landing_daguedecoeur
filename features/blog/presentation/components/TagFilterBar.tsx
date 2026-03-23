'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { ArticleTag } from '../../domain/article.model'

interface TagFilterBarProps {
  tags: ArticleTag[]
  activeTag?: string
}

export function TagFilterBar({ tags, activeTag }: TagFilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleTagClick(tagSlug?: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (tagSlug) {
      params.set('tag', tagSlug)
    } else {
      params.delete('tag')
    }
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <section className="flex gap-4 flex-wrap justify-center mb-6">
      <button
        onClick={() => handleTagClick()}
        className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 border transition-all ${
          !activeTag
            ? 'bg-gold border-gold text-deep-violet'
            : 'bg-transparent border-gold/50 hover:border-gold text-cream'
        }`}
      >
        <p className={`text-sm uppercase font-cinzel tracking-wider ${!activeTag ? 'font-bold' : 'font-medium'}`}>
          Tous
        </p>
      </button>

      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleTagClick(tag.slug)}
          className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 border transition-all ${
            activeTag === tag.slug
              ? 'bg-gold border-gold text-deep-violet'
              : 'bg-transparent border-gold/50 hover:border-gold text-cream'
          }`}
        >
          <p className={`text-sm uppercase font-cinzel tracking-wider ${activeTag === tag.slug ? 'font-bold' : 'font-medium'}`}>
            {tag.label}
          </p>
        </button>
      ))}
    </section>
  )
}
