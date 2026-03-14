/**
 * LexicalRenderer — renders Payload Lexical richtext JSON into styled React components.
 * Handles: paragraphs, headings (h1-h4), bold, italic, underline, strikethrough,
 * ordered/unordered lists, blockquotes (rendered as callout boxes), links, and horizontal rules.
 */

import type { ReactNode } from 'react'

// ─── Types ───────────────────────────────────────────────────

interface LexicalNode {
  type: string
  tag?: string
  text?: string
  format?: number | string
  listType?: string
  children?: LexicalNode[]
  url?: string
  newTab?: boolean
  direction?: string
  indent?: number
  value?: number
  version?: number
  [key: string]: unknown
}

interface LexicalContent {
  root: LexicalNode
}

// ─── Format flags ────────────────────────────────────────────

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8
const IS_STRIKETHROUGH = 4
const IS_CODE = 16

// ─── Text renderer ──────────────────────────────────────────

function renderTextFormat(text: string, format: number): ReactNode {
  let result: ReactNode = text

  if (format & IS_CODE) {
    result = (
      <code className="bg-deep-violet/50 text-gold px-1.5 py-0.5 rounded text-sm font-mono">
        {result}
      </code>
    )
  }
  if (format & IS_BOLD) {
    result = <strong className="font-bold text-cream">{result}</strong>
  }
  if (format & IS_ITALIC) {
    result = <em className="italic">{result}</em>
  }
  if (format & IS_UNDERLINE) {
    result = <u className="underline decoration-gold/50">{result}</u>
  }
  if (format & IS_STRIKETHROUGH) {
    result = <s className="line-through opacity-60">{result}</s>
  }

  return result
}

// ─── Node renderer ──────────────────────────────────────────

function renderNode(node: LexicalNode, index: number): ReactNode {
  switch (node.type) {
    case 'text': {
      const format = typeof node.format === 'number' ? node.format : 0
      return <span key={index}>{renderTextFormat(node.text ?? '', format)}</span>
    }

    case 'linebreak':
      return <br key={index} />

    case 'link': {
      const children = (node.children ?? []).map(renderNode)
      return (
        <a
          key={index}
          href={node.url ?? '#'}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
          className="text-gold hover:text-gold/80 underline decoration-gold/30 transition-colors"
        >
          {children}
        </a>
      )
    }

    case 'paragraph': {
      const children = (node.children ?? []).map(renderNode)
      if (children.length === 0) return <div key={index} className="h-4" />
      return (
        <p key={index} className="text-cream/85 font-lato leading-relaxed mb-4">
          {children}
        </p>
      )
    }

    case 'heading': {
      const children = (node.children ?? []).map(renderNode)
      const tag = node.tag ?? 'h2'

      switch (tag) {
        case 'h1':
          return <h1 key={index} className="text-3xl md:text-4xl font-cinzel text-cream mb-6 mt-10 border-b border-gold/30 pb-3">{children}</h1>
        case 'h2':
          return <h2 key={index} className="text-2xl md:text-3xl font-cinzel text-cream mb-5 mt-8">{children}</h2>
        case 'h3':
          return <h3 key={index} className="text-xl md:text-2xl font-cinzel text-gold mb-4 mt-6">{children}</h3>
        case 'h4':
          return <h4 key={index} className="text-lg font-cinzel text-gold/80 mb-3 mt-5">{children}</h4>
        default:
          return <h5 key={index} className="text-base font-cinzel text-gold/70 mb-3 mt-4">{children}</h5>
      }
    }

    case 'quote': {
      const children = (node.children ?? []).map(renderNode)
      return (
        <blockquote
          key={index}
          className="my-6 rounded-lg border border-gold/30 bg-deep-violet/80 backdrop-blur-sm px-6 py-5 shadow-[0_0_20px_rgba(212,175,55,0.08)]"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-gold text-xl mt-0.5 shrink-0">
              tips_and_updates
            </span>
            <div className="text-cream/90 font-lato leading-relaxed italic">
              {children}
            </div>
          </div>
        </blockquote>
      )
    }

    case 'list': {
      const items = (node.children ?? []).map(renderNode)
      const isOrdered = node.listType === 'number' || node.tag === 'ol'
      if (isOrdered) {
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-6 ml-2 text-cream/85 font-lato">
            {items}
          </ol>
        )
      }
      return (
        <ul key={index} className="list-none space-y-2 mb-6 ml-2 text-cream/85 font-lato">
          {items}
        </ul>
      )
    }

    case 'listitem': {
      const children = (node.children ?? []).map(renderNode)
      const isInOrderedList = node.value !== undefined
      if (isInOrderedList) {
        return (
          <li key={index} className="leading-relaxed pl-1">
            {children}
          </li>
        )
      }
      return (
        <li key={index} className="leading-relaxed flex items-start gap-2">
          <span className="text-gold mt-1.5 text-xs">⬥</span>
          <span>{children}</span>
        </li>
      )
    }

    case 'horizontalrule':
      return (
        <div key={index} className="my-8 flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-gold/40 text-xs">⚔</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      )

    default:
      // Fallback: render children if present
      if (node.children) {
        return <div key={index}>{node.children.map(renderNode)}</div>
      }
      return null
  }
}

// ─── Main component ─────────────────────────────────────────

interface LexicalRendererProps {
  content: LexicalContent
}

export function LexicalRenderer({ content }: LexicalRendererProps) {
  if (!content?.root?.children) {
    return <p className="text-cream/60 italic">Contenu à venir.</p>
  }

  return (
    <div className="lexical-content max-w-none">
      {content.root.children.map(renderNode)}
    </div>
  )
}
