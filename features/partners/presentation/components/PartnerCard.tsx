import { Partner } from '../domain/partners.model'
import Image from 'next/image'

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const content = (
    <div className="group relative rounded-2xl border border-gold/20 bg-deep-violet/60 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-gold/40">
      {partner.logo && (
        <div className="mb-6 flex items-center justify-center">
          <div className="relative h-20 w-40 overflow-hidden rounded-lg">
            <Image
              src={partner.logo.url}
              alt={partner.logo.alt || partner.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      )}

      <h3 className="font-cinzel text-xl font-bold text-gold mb-3 text-center">
        {partner.name}
      </h3>

      <p className="text-cream/80 text-center leading-relaxed">
        {partner.description}
      </p>

      {partner.url && (
        <div className="mt-4 text-center">
          <span className="text-gold/60 text-sm group-hover:text-gold transition-colors">
            Visiter le site →
          </span>
        </div>
      )}
    </div>
  )

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}
