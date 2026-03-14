import { ToolCategory } from '../../domain/tools.model'
import { ToolLinkRow } from './ToolCard'

interface ToolCategorySectionProps {
  category: ToolCategory
  defaultOpen?: boolean
}

export function ToolCategorySection({ category, defaultOpen = false }: ToolCategorySectionProps) {
  return (
    <div className="flex flex-col rounded-lg border border-[#E5D9BB] bg-[#FAEDD4] shadow-sm overflow-hidden group">
      <details className="w-full" open={defaultOpen || undefined}>
        <summary className="flex cursor-pointer items-center justify-between px-6 py-4 bg-[#FAEDD4] hover:bg-[#E5D9BB]/30 transition-colors list-none [&::-webkit-details-marker]:hidden">
          <h3 className="font-cinzel text-xl font-bold text-deep-violet flex items-center gap-3">
            <span className="material-symbols-outlined text-gold">
              {category.icon}
            </span>
            {category.name}
          </h3>
          <span className="material-symbols-outlined text-deep-violet transition-transform duration-300 group-open:rotate-180">
            expand_more
          </span>
        </summary>

        <div className="px-6 pb-6 pt-2 flex flex-col gap-3 bg-cream border-t border-[#E5D9BB]/50">
          {category.links.length > 0 ? (
            category.links.map((link, index) => (
              <ToolLinkRow key={index} link={link} />
            ))
          ) : (
            <p className="text-deep-violet/50 italic text-sm py-2">
              Aucune ressource pour le moment.
            </p>
          )}
        </div>
      </details>
    </div>
  )
}
