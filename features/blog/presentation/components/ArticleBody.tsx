import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ArticleBodyProps {
  content: Record<string, unknown>
  rawHtml?: string | null
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const text = node.children
      ?.map((child: Record<string, unknown>) => (child as { text?: string }).text ?? '')
      .join('')
    const id = text
      .toLowerCase()
      .replace(/[^a-zà-ÿ0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60)

    if (node.tag === 'h2') {
      return (
        <h2
          key={id}
          id={id}
          className="text-2xl md:text-3xl font-cinzel font-bold mt-12 mb-6 pb-2 border-b border-gold/30 text-deep-violet w-full scroll-mt-24"
        >
          {children}
        </h2>
      )
    }
    if (node.tag === 'h3') {
      return (
        <h3
          key={id}
          id={id}
          className="text-xl md:text-2xl font-cinzel font-bold mt-8 mb-4 text-deep-violet scroll-mt-24"
        >
          {children}
        </h3>
      )
    }

    const Tag = node.tag as 'h1' | 'h4' | 'h5' | 'h6'
    return React.createElement(Tag, { id, className: 'scroll-mt-24' }, children)
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return <p className="mb-6 text-deep-violet/80 leading-[1.8]">{children}</p>
  },
  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return (
      <blockquote className="my-10 rounded-xl border border-gold/30 bg-deep-violet px-6 py-5 shadow-[0_4px_24px_rgba(212,175,55,0.08)]">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-gold text-xl mt-0.5 shrink-0">
            tips_and_updates
          </span>
          <div className="text-cream/90 leading-[1.8] italic font-lato">
            {children}
          </div>
        </div>
      </blockquote>
    )
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (node.listType === 'number') {
      return <ol className="space-y-3 mb-8 text-deep-violet/80 pl-6 list-decimal">{children}</ol>
    }
    return <ul className="space-y-4 mb-10 text-deep-violet/80 pl-2">{children}</ul>
  },
  listitem: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    return (
      <li className="flex items-start gap-3">
        <span className="material-symbols-outlined text-gold mt-1 text-xl shrink-0">stat_minus_1</span>
        <span>{children}</span>
      </li>
    )
  },
})

export function ArticleBody({ content, rawHtml }: ArticleBodyProps) {
  // Brevo-imported newsletter articles: render raw HTML
  if (rawHtml) {
    return (
      <article className="max-w-[720px] w-full mx-auto pt-12 article-body">
        <div
          className="bg-white rounded-lg overflow-hidden shadow-lg email-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </article>
    )
  }

  // Native Payload articles: render Lexical richText
  return (
    <article className="max-w-[720px] w-full mx-auto pt-12 text-deep-violet text-[17px] md:text-[18px] leading-[1.8] article-body">
      <RichText
        data={content as unknown as SerializedEditorState}
        converters={jsxConverters}
      />
    </article>
  )
}
