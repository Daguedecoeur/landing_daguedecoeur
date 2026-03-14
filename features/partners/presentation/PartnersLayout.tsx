import { PartnersData } from '../domain/partners.model'
import { PartnerCard } from './components/PartnerCard'

interface PartnersLayoutProps {
  data: PartnersData
}

export function PartnersLayout({ data }: PartnersLayoutProps) {
  return (
    <main className="min-h-screen bg-deep-violet py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-cinzel text-4xl font-bold tracking-tight text-gold sm:text-5xl drop-shadow-md">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="mt-6 text-lg text-cream/80 max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Partners Grid */}
        {data.partners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.partners.map((partner, index) => (
              <PartnerCard key={index} partner={partner} />
            ))}
          </div>
        ) : (
          <p className="text-cream/60 text-center italic text-lg">
            Nos partenaires arrivent bientôt…
          </p>
        )}
      </div>
    </main>
  )
}
