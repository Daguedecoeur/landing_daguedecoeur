"use client"

import { useEffect, useRef, useCallback } from 'react'
import type { LocationItem } from '@/features/projects/domain/location.model'
import { LocationSlide } from './components/LocationSlide'

interface LocationSliderProps {
  locations: LocationItem[]
}

export function LocationSlider({ locations }: LocationSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const slideCount = locations.length

  // Create cloned array for infinite effect: [last, ...locations, first]
  const extendedLocations = [
    locations[slideCount - 1], // clone of last
    ...locations,
    locations[0], // clone of first
  ]

  const scrollToSlide = useCallback((index: number, smooth = true) => {
    const container = containerRef.current
    if (!container) return

    const slideWidth = container.clientWidth
    // +1 because index 0 is the clone of the last slide
    const targetScroll = (index + 1) * slideWidth

    isScrollingRef.current = true
    container.scrollTo({
      left: targetScroll,
      behavior: smooth ? 'smooth' : 'instant',
    })

    setTimeout(() => {
      isScrollingRef.current = false
    }, smooth ? 600 : 50)
  }, [])

  // Initialize position to first real slide
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const slideWidth = container.clientWidth
    container.scrollLeft = slideWidth // skip the leading clone
  }, [])

  // Handle anchor-based navigation from URL hash
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      const slideIndex = locations.findIndex((loc) => loc.slug === hash)
      if (slideIndex !== -1) {
        // Small delay to let layout settle
        setTimeout(() => scrollToSlide(slideIndex, false), 100)
      }
    }

    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [locations, scrollToSlide])

  // Handle infinite loop on scroll end
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScrollEnd = () => {
      if (isScrollingRef.current) return

      const slideWidth = container.clientWidth
      const scrollLeft = container.scrollLeft
      const currentIndex = Math.round(scrollLeft / slideWidth)

      // If scrolled to the leading clone (index 0), jump to real last slide
      if (currentIndex === 0) {
        container.scrollTo({ left: slideCount * slideWidth, behavior: 'instant' })
      }
      // If scrolled to the trailing clone (index slideCount + 1), jump to real first slide
      else if (currentIndex === slideCount + 1) {
        container.scrollTo({ left: slideWidth, behavior: 'instant' })
      }

      // Update URL hash based on current real slide
      const realIndex = currentIndex - 1
      if (realIndex >= 0 && realIndex < slideCount) {
        const slug = locations[realIndex].slug
        window.history.replaceState(null, '', `#${slug}`)
      }
    }

    container.addEventListener('scrollend', handleScrollEnd)
    return () => container.removeEventListener('scrollend', handleScrollEnd)
  }, [slideCount, locations])

  const goToNext = () => {
    const container = containerRef.current
    if (!container) return
    const slideWidth = container.clientWidth
    const currentIndex = Math.round(container.scrollLeft / slideWidth)
    const nextIndex = currentIndex + 1

    isScrollingRef.current = true
    container.scrollTo({ left: nextIndex * slideWidth, behavior: 'smooth' })
    setTimeout(() => { isScrollingRef.current = false }, 600)
  }

  const goToPrev = () => {
    const container = containerRef.current
    if (!container) return
    const slideWidth = container.clientWidth
    const currentIndex = Math.round(container.scrollLeft / slideWidth)
    const prevIndex = currentIndex - 1

    isScrollingRef.current = true
    container.scrollTo({ left: prevIndex * slideWidth, behavior: 'smooth' })
    setTimeout(() => { isScrollingRef.current = false }, 600)
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slider container */}
      <div
        ref={containerRef}
        className="h-full flex overflow-x-auto scrollbar-hide"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {extendedLocations.map((location, i) => {
          // Calculate "real" index for styling (skip leading clone)
          const realIndex = i === 0
            ? slideCount - 1 // leading clone matches last slide style
            : i === extendedLocations.length - 1
              ? 0 // trailing clone matches first slide style
              : i - 1

          return (
            <div
              key={`slide-${i}`}
              style={{ scrollSnapAlign: 'start' }}
              className="min-w-full h-full flex-shrink-0"
            >
              <LocationSlide
                location={location}
                index={realIndex}
              />
            </div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-deep-violet/60 backdrop-blur-sm border border-gold/30 text-gold hover:bg-deep-violet/80 transition-all duration-300 hover:scale-110"
        aria-label="Lieu précédent"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-deep-violet/60 backdrop-blur-sm border border-gold/30 text-gold hover:bg-deep-violet/80 transition-all duration-300 hover:scale-110"
        aria-label="Lieu suivant"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {locations.map((loc, i) => (
          <button
            key={loc.slug}
            onClick={() => scrollToSlide(i)}
            className="group relative"
            aria-label={`Aller à ${loc.title}`}
          >
            <span className="block w-3 h-3 rounded-full bg-gold/40 group-hover:bg-gold transition-all duration-300" />
            {/* Tooltip */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-cinzel text-gold bg-deep-violet/80 backdrop-blur-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {loc.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
