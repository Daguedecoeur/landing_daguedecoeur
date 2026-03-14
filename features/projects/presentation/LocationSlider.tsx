"use client"

import { useEffect, useRef, useCallback, useState } from 'react'
import type { LocationItem } from '@/features/projects/domain/location.model'
import { LocationSlide } from './components/LocationSlide'

interface LocationSliderProps {
  locations: LocationItem[]
}

export function LocationSlider({ locations }: LocationSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isJumpingRef = useRef(false)
  const slideCount = locations.length
  const [activeSlide, setActiveSlide] = useState(0)

  // Create cloned array for infinite effect: [last, ...locations, first]
  const extendedLocations = [
    locations[slideCount - 1], // clone of last
    ...locations,
    locations[0], // clone of first
  ]

  // Get actual slide width from DOM
  const getSlideWidth = useCallback(() => {
    const container = containerRef.current
    if (!container?.firstElementChild) return container?.clientWidth ?? 0
    return (container.firstElementChild as HTMLElement).offsetWidth
  }, [])

  // Compute current real index from scroll position
  const getRealIndex = useCallback(() => {
    const container = containerRef.current
    if (!container) return 0
    const slideWidth = getSlideWidth()
    if (slideWidth === 0) return 0
    const rawIndex = Math.round(container.scrollLeft / slideWidth)
    // Map extended index to real index (subtract 1 for leading clone)
    const realIndex = rawIndex - 1
    if (realIndex < 0) return slideCount - 1
    if (realIndex >= slideCount) return 0
    return realIndex
  }, [getSlideWidth, slideCount])

  // Initialize position to first real slide
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const slideWidth = getSlideWidth()
    container.scrollLeft = slideWidth // skip the leading clone
  }, [getSlideWidth])

  // Handle scroll: debounced to detect scroll end, then handle infinite jump + active dot
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      // Update active dot immediately
      setActiveSlide(getRealIndex())

      // Debounce: wait for scroll to settle, then handle infinite loop jump
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (isJumpingRef.current) return

        const slideWidth = getSlideWidth()
        if (slideWidth === 0) return
        const scrollLeft = container.scrollLeft
        const currentIndex = Math.round(scrollLeft / slideWidth)

        // If on leading clone (index 0), jump to real last
        if (currentIndex <= 0) {
          isJumpingRef.current = true
          container.scrollTo({ left: slideCount * slideWidth, behavior: 'instant' })
          isJumpingRef.current = false
        }
        // If on trailing clone (index slideCount + 1), jump to real first
        else if (currentIndex >= slideCount + 1) {
          isJumpingRef.current = true
          container.scrollTo({ left: slideWidth, behavior: 'instant' })
          isJumpingRef.current = false
        }

        // Update URL hash
        const realIndex = getRealIndex()
        setActiveSlide(realIndex)
        if (realIndex >= 0 && realIndex < slideCount) {
          const slug = locations[realIndex].slug
          window.history.replaceState(null, '', `#${slug}`)
        }
      }, 100)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [slideCount, locations, getSlideWidth, getRealIndex])

  // Handle anchor-based navigation from URL hash
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      const slideIndex = locations.findIndex((loc) => loc.slug === hash)
      if (slideIndex !== -1) {
        setTimeout(() => scrollToSlide(slideIndex, false), 100)
      }
    }

    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [locations])

  const scrollToSlide = useCallback((index: number, smooth = true) => {
    const container = containerRef.current
    if (!container) return

    const slideWidth = getSlideWidth()
    const targetScroll = (index + 1) * slideWidth

    container.scrollTo({
      left: targetScroll,
      behavior: smooth ? 'smooth' : 'instant',
    })
  }, [getSlideWidth])

  const goToNext = () => {
    const container = containerRef.current
    if (!container) return
    const slideWidth = getSlideWidth()
    const currentIndex = Math.round(container.scrollLeft / slideWidth)
    container.scrollTo({ left: (currentIndex + 1) * slideWidth, behavior: 'smooth' })
  }

  const goToPrev = () => {
    const container = containerRef.current
    if (!container) return
    const slideWidth = getSlideWidth()
    const currentIndex = Math.round(container.scrollLeft / slideWidth)
    container.scrollTo({ left: (currentIndex - 1) * slideWidth, behavior: 'smooth' })
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
          const realIndex = i === 0
            ? slideCount - 1
            : i === extendedLocations.length - 1
              ? 0
              : i - 1

          return (
            <div
              key={`slide-${i}`}
              style={{ scrollSnapAlign: 'start' }}
              className="w-screen h-full flex-shrink-0 overflow-hidden"
            >
              <LocationSlide
                location={location}
                index={realIndex}
                uniqueKey={`slide-${i}`}
              />
            </div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-deep-violet/60 backdrop-blur-sm border border-gold/30 text-gold hover:bg-deep-violet/80 transition-all duration-300 hover:scale-110"
        aria-label="Lieu précédent"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-deep-violet/60 backdrop-blur-sm border border-gold/30 text-gold hover:bg-deep-violet/80 transition-all duration-300 hover:scale-110"
        aria-label="Lieu suivant"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2 md:gap-3">
        {locations.map((loc, i) => (
          <button
            key={loc.slug}
            onClick={() => scrollToSlide(i)}
            className="group relative"
            aria-label={`Aller à ${loc.title}`}
          >
            <span className={`block w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              activeSlide === i
                ? 'bg-gold scale-125'
                : 'bg-gold/40 group-hover:bg-gold'
            }`} />
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
