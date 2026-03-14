import Image from 'next/image'
import type { PlanningHeroContent } from '@/features/planning/domain/planning.model'

interface PlanningHeroProps {
  content: PlanningHeroContent
}

export function PlanningHero({ content }: PlanningHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImageUrl ?? '/images/planning-hero-bg.png'}
          alt="Planning — paysage fantasy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-deep-violet/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-violet via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-cinzel text-7xl md:text-9xl text-gold mb-4 tracking-[0.2em] uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
          {content.title}
        </h1>
        <p className="font-lato text-cream text-xl md:text-2xl tracking-widest font-light drop-shadow-md">
          {content.subtitle}
        </p>
      </div>
    </section>
  )
}
