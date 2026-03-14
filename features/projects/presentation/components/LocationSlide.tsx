import Image from 'next/image'
import type { LocationItem } from '@/features/projects/domain/location.model'

interface LocationSlideProps {
  location: LocationItem
  index: number
}

export function LocationSlide({ location, index }: LocationSlideProps) {
  const isEven = index % 2 === 0
  // Even = beige bg, photo LEFT, text RIGHT
  // Odd = violet bg, photo RIGHT, text LEFT
  const bgClass = isEven ? 'bg-[#f5f0e8]' : 'bg-deep-violet'
  const textColor = isEven ? 'text-deep-violet' : 'text-cream'
  const titleColor = isEven ? 'text-deep-violet' : 'text-gold'
  const subtitleColor = isEven ? 'text-deep-violet/70' : 'text-cream/70'
  const btnClass = isEven
    ? 'border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-cream'
    : 'border-gold text-gold hover:bg-gold hover:text-deep-violet'

  // Diagonal clip-path for the image
  // Photo on LEFT (even): clip right edge diagonally
  const clipPathLeft = 'polygon(0 0, 85% 0, 100% 100%, 0 100%)'
  // Photo on RIGHT (odd): clip left edge diagonally
  const clipPathRight = 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'

  const placeholderGradient = isEven
    ? 'from-deep-violet/20 to-deep-violet/40'
    : 'from-gold/10 to-gold/30'

  return (
    <section
      id={location.slug}
      className={`min-w-full h-screen flex-shrink-0 ${bgClass} relative overflow-hidden`}
    >
      <div className={`h-full flex ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Photo side */}
        <div
          className="relative h-full w-[55%]"
          style={{ clipPath: isEven ? clipPathLeft : clipPathRight }}
        >
          {location.imageUrl ? (
            <Image
              src={location.imageUrl}
              alt={location.title}
              fill
              className="object-cover"
              sizes="55vw"
              priority={index === 0}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${placeholderGradient} flex items-center justify-center`}>
              <span className={`font-cinzel text-4xl ${titleColor} opacity-20`}>
                {location.title}
              </span>
            </div>
          )}
          {/* Gold accent line along diagonal edge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isEven
                ? 'linear-gradient(to right, transparent 83%, rgba(212,175,55,0.15) 85%, transparent 87%)'
                : 'linear-gradient(to left, transparent 83%, rgba(212,175,55,0.15) 85%, transparent 87%)',
            }}
          />
        </div>

        {/* Text side */}
        <div className="flex-1 flex items-center px-8 md:px-16 lg:px-20">
          <div className="max-w-xl space-y-6">
            {/* Gold decorative line */}
            <div className="w-16 h-0.5 bg-gold" />

            <h2 className={`font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold ${titleColor} leading-tight`}>
              {location.title}
            </h2>

            {location.subtitle && (
              <p className={`text-sm md:text-base uppercase tracking-[0.2em] font-lato ${subtitleColor}`}>
                {location.subtitle}
              </p>
            )}

            {location.description && (
              <p className={`text-base md:text-lg leading-relaxed font-lato ${textColor} opacity-85`}>
                {location.description}
              </p>
            )}

            {location.ctaLabel && (
              <a
                href={location.ctaHref}
                className={`inline-block mt-4 px-8 py-3 border-2 rounded-sm font-cinzel text-sm tracking-wider transition-all duration-300 hover:-translate-y-0.5 ${btnClass}`}
              >
                {location.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
