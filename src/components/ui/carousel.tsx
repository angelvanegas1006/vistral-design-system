import * as React from 'react'
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'

/**
 * Carousel Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1364-4180
 */
const CAROUSEL_TOKENS = {
  // Navigation buttons (Desktop: 72px)
  nav: {
    size: 72, // Desktop size from Figma
    sizeMobile: 40, // Mobile size
    bg: '#ffffff',
    bgHover: '#f4f4f5',
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    radius: 9999,
    color: '#18181b',
    offsetX: 8, // 8px from edge
    offsetY: 48, // 48px from top/bottom center
  },
  // Dots pagination
  dots: {
    size: 8,
    gap: 8,
    bg: '#d4d4d8',
    bgActive: '#2050f6',
  },
  // Thumbnails
  thumbnails: {
    size: 60,
    gap: 8,
    radius: 8,
  },
  // Slide
  gap: 16,
  // Counter
  counter: {
    fontSize: 14,
    color: '#71717a',
  },
} as const

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Carousel orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Auto play interval (ms), 0 to disable */
  autoPlay?: number
  /** Show navigation arrows */
  showArrows?: boolean
  /** Show dot indicators */
  showDots?: boolean
  /** Show thumbnail indicators */
  showThumbnails?: boolean
  /** Show counter (e.g., "1 of 5") */
  showCounter?: boolean
  /** Loop infinitely */
  loop?: boolean
  /** Slides to show at once */
  slidesToShow?: number
  /** Slides to scroll */
  slidesToScroll?: number
  /** Gap between slides */
  gap?: number
  /** Height for vertical orientation */
  height?: number | string
  /** Mobile variant (shrinking edges) */
  mobileVariant?: 'multi-item' | 'uncontained' | 'hero'
  /** Enable edge masking (mobile) */
  edgeMasking?: boolean
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = 'horizontal',
      autoPlay = 0,
      showArrows = true,
      showDots = true,
      showThumbnails = false,
      showCounter = false,
      loop = false,
      slidesToShow = 1,
      slidesToScroll = 1,
      gap = CAROUSEL_TOKENS.gap,
      height = 400,
      mobileVariant: _mobileVariant = 'multi-item',
      edgeMasking = false,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)

    const isVertical = orientation === 'vertical'
    const slides = React.Children.toArray(children)
    const totalSlides = slides.length
    const maxIndex = Math.max(0, totalSlides - slidesToShow)
    const _totalPages = Math.ceil(totalSlides / slidesToShow)

    const goTo = useCallback(
      (index: number) => {
        if (loop) {
          if (index < 0) index = maxIndex
          if (index > maxIndex) index = 0
        } else {
          index = Math.max(0, Math.min(index, maxIndex))
        }
        setCurrentIndex(index)
      },
      [loop, maxIndex]
    )

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
      width: isVertical ? 'auto' : '100%',
      height: isVertical ? height : 'auto',
      ...style,
    }

    const viewportStyle: React.CSSProperties = {
      overflow: 'hidden',
      height: isVertical ? '100%' : 'auto',
      position: 'relative',
      ...(edgeMasking && {
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }),
    }

    const trackStyle: React.CSSProperties = isVertical
      ? {
          display: 'flex',
          flexDirection: 'column',
          gap,
          transition: 'transform 300ms ease',
          transform: `translateY(calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * gap}px))`,
        }
      : {
          display: 'flex',
          gap,
          transition: 'transform 300ms ease',
          transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * gap}px))`,
        }

    const slideStyle: React.CSSProperties = isVertical
      ? {
          flexShrink: 0,
          height:
            slidesToShow === 1
              ? '100%'
              : `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`,
        }
      : {
          flexShrink: 0,
          width:
            slidesToShow === 1
              ? '100%'
              : `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`,
        }

    const navButtonStyleHorizontal = (side: 'left' | 'right'): React.CSSProperties => ({
      position: 'absolute',
      top: `calc(50% - ${CAROUSEL_TOKENS.nav.offsetY}px)`,
      [side]: CAROUSEL_TOKENS.nav.offsetX,
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
      transition: 'all 150ms ease',
    })

    const navButtonStyleVertical = (position: 'top' | 'bottom'): React.CSSProperties => ({
      position: 'absolute',
      left: '50%',
      [position]: CAROUSEL_TOKENS.nav.offsetX,
      transform: 'translateX(-50%)',
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
      transition: 'all 150ms ease',
    })

    const dotsContainerStyle: React.CSSProperties = isVertical
      ? {
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: CAROUSEL_TOKENS.dots.gap,
        }
      : {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: CAROUSEL_TOKENS.dots.gap,
          marginTop: 16,
        }

    const thumbnailsContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: CAROUSEL_TOKENS.thumbnails.gap,
      marginTop: 16,
    }

    const getDotStyle = (index: number): React.CSSProperties => ({
      width: CAROUSEL_TOKENS.dots.size,
      height: CAROUSEL_TOKENS.dots.size,
      borderRadius: '50%',
      backgroundColor:
        index === currentIndex ? CAROUSEL_TOKENS.dots.bgActive : CAROUSEL_TOKENS.dots.bg,
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      transition: 'background-color 150ms ease',
    })

    const getThumbnailStyle = (index: number): React.CSSProperties => ({
      width: CAROUSEL_TOKENS.thumbnails.size,
      height: CAROUSEL_TOKENS.thumbnails.size,
      borderRadius: CAROUSEL_TOKENS.thumbnails.radius,
      overflow: 'hidden',
      border: `2px solid ${index === currentIndex ? CAROUSEL_TOKENS.dots.bgActive : 'transparent'}`,
      cursor: 'pointer',
      opacity: index === currentIndex ? 1 : 0.7,
      transition: 'all 150ms ease',
    })

    const counterStyle: React.CSSProperties = {
      fontSize: CAROUSEL_TOKENS.counter.fontSize,
      color: CAROUSEL_TOKENS.counter.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textAlign: 'center',
      marginTop: 8,
    }

    const canGoPrev = loop || currentIndex > 0
    const canGoNext = loop || currentIndex < maxIndex
    const currentSlide = currentIndex + 1

    return (
      <div
        ref={ref}
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="region"
        aria-label="Carousel"
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

        {showArrows && totalSlides > slidesToShow && !isVertical && (
          <>
            <button
              type="button"
              style={{
                ...navButtonStyleHorizontal('left'),
                opacity: canGoPrev ? 1 : 0.5,
                backgroundColor:
                  isHovered && canGoPrev ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg,
              }}
              onClick={prev}
              disabled={!canGoPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              style={{
                ...navButtonStyleHorizontal('right'),
                opacity: canGoNext ? 1 : 0.5,
                backgroundColor:
                  isHovered && canGoNext ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg,
              }}
              onClick={next}
              disabled={!canGoNext}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {showArrows && totalSlides > slidesToShow && isVertical && (
          <>
            <button
              type="button"
              style={{
                ...navButtonStyleVertical('top'),
                opacity: canGoPrev ? 1 : 0.5,
                backgroundColor:
                  isHovered && canGoPrev ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg,
              }}
              onClick={prev}
              disabled={!canGoPrev}
              aria-label="Previous slide"
            >
              <ChevronUp size={24} />
            </button>
            <button
              type="button"
              style={{
                ...navButtonStyleVertical('bottom'),
                opacity: canGoNext ? 1 : 0.5,
                backgroundColor:
                  isHovered && canGoNext ? CAROUSEL_TOKENS.nav.bgHover : CAROUSEL_TOKENS.nav.bg,
              }}
              onClick={next}
              disabled={!canGoNext}
              aria-label="Next slide"
            >
              <ChevronDown size={24} />
            </button>
          </>
        )}

        {showCounter && (
          <div style={counterStyle}>
            {currentSlide} of {totalSlides}
          </div>
        )}

        {showDots && totalSlides > slidesToShow && !showThumbnails && (
          <div style={dotsContainerStyle}>
            {Array.from({ length: totalSlides }).map((_, index) => (
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

        {showThumbnails && totalSlides > slidesToShow && (
          <div style={thumbnailsContainerStyle}>
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                style={getThumbnailStyle(index)}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                {React.isValidElement(slide) &&
                  React.cloneElement(slide as React.ReactElement<any>, {
                    style: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  })}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'

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

CarouselItem.displayName = 'CarouselItem'

export { Carousel, CarouselItem, CAROUSEL_TOKENS }
