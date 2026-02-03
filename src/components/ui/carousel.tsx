import * as React from "react"
import { forwardRef, useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Carousel Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1364-2863
 */
const CAROUSEL_TOKENS = {
  // Navigation buttons
  nav: {
    size: 40,
    bg: '#ffffff',
    bgHover: '#f4f4f5',
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    radius: 9999,
    color: '#18181b',
  },
  // Dots
  dots: {
    size: 8,
    gap: 8,
    bg: '#d4d4d8',
    bgActive: '#2050f6',
  },
  // Slide
  gap: 16,
} as const

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Auto play interval (ms), 0 to disable */
  autoPlay?: number
  /** Show navigation arrows */
  showArrows?: boolean
  /** Show dot indicators */
  showDots?: boolean
  /** Loop infinitely */
  loop?: boolean
  /** Slides to show at once */
  slidesToShow?: number
  /** Slides to scroll */
  slidesToScroll?: number
  /** Gap between slides */
  gap?: number
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({
    autoPlay = 0,
    showArrows = true,
    showDots = true,
    loop = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    gap = CAROUSEL_TOKENS.gap,
    style,
    children,
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)

    const slides = React.Children.toArray(children)
    const totalSlides = slides.length
    const maxIndex = Math.max(0, totalSlides - slidesToShow)

    const goTo = useCallback((index: number) => {
      if (loop) {
        if (index < 0) index = maxIndex
        if (index > maxIndex) index = 0
      } else {
        index = Math.max(0, Math.min(index, maxIndex))
      }
      setCurrentIndex(index)
    }, [loop, maxIndex])

    const prev = () => goTo(currentIndex - slidesToScroll)
    const next = () => goTo(currentIndex + slidesToScroll)

    // Auto play
    useEffect(() => {
      if (autoPlay <= 0 || isHovered) return
      const timer = setInterval(() => next(), autoPlay)
      return () => clearInterval(timer)
    }, [autoPlay, isHovered, currentIndex])

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      ...style,
    }

    const viewportStyle: React.CSSProperties = {
      overflow: 'hidden',
    }

    const trackStyle: React.CSSProperties = {
      display: 'flex',
      gap,
      transition: 'transform 300ms ease',
      transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * gap}px))`,
    }

    const slideStyle: React.CSSProperties = {
      flexShrink: 0,
      width: slidesToShow === 1 
        ? '100%' 
        : `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`,
    }

    const navButtonStyle = (side: 'left' | 'right'): React.CSSProperties => ({
      position: 'absolute',
      top: '50%',
      [side]: 8,
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: CAROUSEL_TOKENS.nav.size,
      height: CAROUSEL_TOKENS.nav.size,
      backgroundColor: CAROUSEL_TOKENS.nav.bg,
      border: 'none',
      borderRadius: CAROUSEL_TOKENS.nav.radius,
      boxShadow: CAROUSEL_TOKENS.nav.shadow,
      color: CAROUSEL_TOKENS.nav.color,
      cursor: 'pointer',
      zIndex: 1,
      transition: 'background-color 150ms ease',
    })

    const dotsContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: CAROUSEL_TOKENS.dots.gap,
      marginTop: 16,
    }

    const getDotStyle = (index: number): React.CSSProperties => ({
      width: CAROUSEL_TOKENS.dots.size,
      height: CAROUSEL_TOKENS.dots.size,
      borderRadius: '50%',
      backgroundColor: index === currentIndex 
        ? CAROUSEL_TOKENS.dots.bgActive 
        : CAROUSEL_TOKENS.dots.bg,
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      transition: 'background-color 150ms ease',
    })

    const canGoPrev = loop || currentIndex > 0
    const canGoNext = loop || currentIndex < maxIndex

    return (
      <div
        ref={ref}
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div style={viewportStyle}>
          <div ref={trackRef} style={trackStyle}>
            {slides.map((slide, index) => (
              <div key={index} style={slideStyle}>
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showArrows && totalSlides > slidesToShow && (
          <>
            <button
              type="button"
              style={{ ...navButtonStyle('left'), opacity: canGoPrev ? 1 : 0.5 }}
              onClick={prev}
              disabled={!canGoPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              style={{ ...navButtonStyle('right'), opacity: canGoNext ? 1 : 0.5 }}
              onClick={next}
              disabled={!canGoNext}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {showDots && totalSlides > slidesToShow && (
          <div style={dotsContainerStyle}>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                style={getDotStyle(index)}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

// ============================================================================
// Carousel Item (for cleaner API)
// ============================================================================
export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <div ref={ref} style={{ width: '100%', ...style }} {...props}>
        {children}
      </div>
    )
  }
)

CarouselItem.displayName = "CarouselItem"

export { Carousel, CarouselItem, CAROUSEL_TOKENS }
