'use client'

import { useEffect, useState } from 'react'
import type { ArticleHeading } from '../../domain/article.model'

interface ArticleSidebarProps {
  headings: ArticleHeading[]
}

export function ArticleSidebar({ headings }: ArticleSidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="hidden lg:block sticky top-32 w-64 pt-12 shrink-0">
      <div className="pl-4 border-l border-gold/30 py-2">
        <h3 className="text-sm font-bold text-deep-violet/40 uppercase tracking-widest mb-6 font-cinzel">
          Dans cet article
        </h3>
        <ul className="space-y-4 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    heading.level === 3 ? 'pl-4' : ''
                  } ${
                    isActive
                      ? 'text-gold font-medium'
                      : 'text-deep-violet/50 hover:text-deep-violet/80'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isActive
                        ? 'bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                        : 'bg-transparent border border-current'
                    }`}
                  />
                  <span>{heading.text}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
