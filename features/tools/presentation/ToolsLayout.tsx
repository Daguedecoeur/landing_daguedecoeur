import { ToolsData } from '../domain/tools.model'
import { ToolCategorySection } from './components/ToolCategorySection'

interface ToolsLayoutProps {
  data: ToolsData
}

export function ToolsLayout({ data }: ToolsLayoutProps) {
  return (
    <div className="flex-1 flex flex-col bg-cream py-10 px-4 md:px-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-[960px] mx-auto w-full flex flex-col gap-8">
        {/* Page Header */}
        <section className="flex flex-col gap-4 text-center md:text-left mb-6">
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-deep-violet flex items-center justify-center md:justify-start gap-4">
            <span className="material-symbols-outlined text-gold text-4xl">
              auto_stories
            </span>
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-deep-violet/80 text-lg max-w-2xl leading-relaxed">
              {data.subtitle}
            </p>
          )}
          {/* Decorative gradient line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-4" />
        </section>

        {/* Accordion Categories */}
        {data.categories.length > 0 ? (
          <div className="flex flex-col gap-6">
            {data.categories.map((category, index) => (
              <ToolCategorySection
                key={index}
                category={category}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        ) : (
          <p className="text-deep-violet/50 text-center italic text-lg py-12">
            Les ressources arrivent bientôt…
          </p>
        )}
      </div>
    </div>
  )
}
