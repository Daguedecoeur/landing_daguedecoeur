import Image from 'next/image'
import type { LocationItem } from '@/features/projects/domain/location.model'

interface LocationSlideProps {
  location: LocationItem
  index: number
  /** Unique key used for CSS scoping (avoids duplicate ID issues with cloned slides) */
  uniqueKey: string
}

export function LocationSlide({ location, index, uniqueKey }: LocationSlideProps) {
  const isEven = index % 2 === 0
  const bgClass = isEven ? 'bg-[#f5f0e8]' : 'bg-deep-violet'
  const textColor = isEven ? 'text-deep-violet' : 'text-cream'
  const titleColor = isEven ? 'text-deep-violet' : 'text-gold'
  const subtitleColor = isEven ? 'text-deep-violet/70' : 'text-cream/70'
  const btnClass = isEven
    ? 'border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-cream'
    : 'border-gold text-gold hover:bg-gold hover:text-deep-violet'

  const placeholderGradient = isEven
    ? 'from-deep-violet/20 to-deep-violet/40'
    : 'from-gold/10 to-gold/30'

  // Desktop: diagonal cut on left/right side
  const desktopClip = isEven
    ? 'polygon(0 0, 85% 0, 100% 100%, 0 100%)'
    : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
  // Mobile: diagonal cut on bottom edge
  const mobileClip = isEven
    ? 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
    : 'polygon(0 0, 100% 0, 100% 100%, 0 85%)'

  const flexDirection = isEven
    ? 'flex-col md:flex-row'
    : 'flex-col md:flex-row-reverse'

  return (
    <section
      id={location.slug}
      className={`w-screen h-screen flex-shrink-0 ${bgClass} relative overflow-hidden`}
    >
      {/* Per-slide responsive clip-path — scoped by uniqueKey to avoid duplicate ID issues */}
      <style>{`
        [data-photo="${uniqueKey}"] {
          clip-path: ${mobileClip};
        }
        @media (min-width: 768px) {
          [data-photo="${uniqueKey}"] {
            clip-path: ${desktopClip};
          }
        }
      `}</style>

      <div className={`h-full flex ${flexDirection}`}>
        {/* Photo side */}
        <div
          className="relative w-full h-[45vh] md:h-full md:w-[55%]"
          data-photo={uniqueKey}
        >
          {location.imageUrl ? (
            <Image
              src={location.imageUrl}
              alt={location.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority={index === 0}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${placeholderGradient} flex items-center justify-center`}>
              <span className={`font-cinzel text-2xl md:text-4xl ${titleColor} opacity-20`}>
                {location.title}
              </span>
            </div>
          )}
          {/* Gold accent line along diagonal edge — desktop only */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background: isEven
                ? 'linear-gradient(to right, transparent 83%, rgba(212,175,55,0.15) 85%, transparent 87%)'
                : 'linear-gradient(to left, transparent 83%, rgba(212,175,55,0.15) 85%, transparent 87%)',
            }}
          />
        </div>

        {/* Text side */}
        <div className="flex-1 flex items-center justify-center px-6 py-6 md:px-16 lg:px-20 md:py-0 overflow-hidden">
          <div className="w-full max-w-full md:max-w-xl space-y-4 md:space-y-6 text-center md:text-left">
            <div className="w-16 h-0.5 bg-gold mx-auto md:mx-0" />

            <h2 className={`font-cinzel text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold ${titleColor} leading-tight`}>
              {location.title}
            </h2>

            {location.subtitle && (
              <p className={`text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-lato ${subtitleColor}`}>
                {location.subtitle}
              </p>
            )}

            {location.description && (
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed font-lato ${textColor} opacity-85`}>
                {location.description}
              </p>
            )}

            {location.ctaLabel && (
              <a
                href={location.ctaHref}
                className={`inline-block mt-2 md:mt-4 px-6 md:px-8 py-2.5 md:py-3 border-2 rounded-sm font-cinzel text-xs md:text-sm tracking-wider transition-all duration-300 hover:-translate-y-0.5 ${btnClass}`}
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
