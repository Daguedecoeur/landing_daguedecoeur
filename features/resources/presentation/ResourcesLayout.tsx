import { ResourcesPageData } from '../domain/resources.model'
import { DownloadCategorySection } from './components/DownloadCategorySection'

interface ResourcesLayoutProps {
  data: ResourcesPageData
}

export function ResourcesLayout({ data }: ResourcesLayoutProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero header */}
      <section className="relative bg-deep-violet py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-[960px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-4">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-cream/70 text-lg max-w-xl mx-auto leading-relaxed mb-6">
              {data.subtitle}
            </p>
          )}
          <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </div>
      </section>

      {/* Downloads section */}
      <section className="relative bg-deep-violet pb-16 md:pb-24">
        <div className="max-w-[960px] mx-auto px-4 md:px-8">
          {data.categories.length > 0 ? (
            <div className="flex flex-col gap-6">
              {data.categories.map((category, index) => (
                <DownloadCategorySection
                  key={index}
                  category={category}
                  defaultOpen={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-gold/30 text-6xl mb-4 block">
                folder_open
              </span>
              <p className="text-cream/50 text-lg italic">
                Les ressources arrivent bientôt… Revenez vite !
              </p>
            </div>
          )}
        </div>
      </section>


    </div>
  )
}
