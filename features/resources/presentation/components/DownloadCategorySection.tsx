import { DownloadCategory } from '../../domain/resources.model'
import { DownloadCard } from './ResourceCard'

interface DownloadCategorySectionProps {
  category: DownloadCategory
  defaultOpen?: boolean
}

export function DownloadCategorySection({ category, defaultOpen = false }: DownloadCategorySectionProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gold/20 bg-deep-violet/40 backdrop-blur-xl overflow-hidden">
      <details className="w-full group" open={defaultOpen || undefined}>
        <summary className="flex cursor-pointer items-center justify-between px-6 py-5 hover:bg-gold/5 transition-colors list-none [&::-webkit-details-marker]:hidden">
          <h3 className="font-cinzel text-xl font-bold text-gold flex items-center gap-3">
            <span className="material-symbols-outlined text-gold/70">
              {category.icon}
            </span>
            {category.name}
          </h3>
          <span className="material-symbols-outlined text-cream/50 transition-transform duration-300 group-open:rotate-180">
            expand_more
          </span>
        </summary>

        <div className="px-6 pb-6 pt-2 flex flex-col gap-3 border-t border-gold/10">
          {category.items.length > 0 ? (
            category.items.map((item, index) => (
              <DownloadCard key={index} item={item} />
            ))
          ) : (
            <p className="text-cream/40 italic text-sm py-4 text-center">
              Aucun fichier disponible pour le moment.
            </p>
          )}
        </div>
      </details>
    </div>
  )
}
