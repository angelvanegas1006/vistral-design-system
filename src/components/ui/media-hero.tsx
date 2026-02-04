import * as React from "react"
import { forwardRef, useState, useEffect } from "react"
import { Images, ChevronLeft, ChevronRight } from "lucide-react"
import { Lightbox, LightboxImage } from "./lightbox"
import { Button } from "./button"

/**
 * Media Hero Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2770-32645
 */
const MEDIA_HERO_TOKENS = {
  // Container
  container: {
    radius: 12,
    gap: 4,
  },
  // Grid proportions
  grid: {
    mainWidth: '60%',
    sideWidth: '40%',
  },
  // Show all button
  button: {
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    bg: '#ffffff',
    fg: '#18181b',
    radius: 8,
    shadow: '0 2px 8px rgba(0,0,0,0.15)',
    gap: 8,
  },
  // Counter (mobile)
  counter: {
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 500,
    bg: 'rgba(0, 0, 0, 0.6)',
    fg: '#ffffff',
    radius: 20,
  },
  // Instance slot (stack overlay)
  instanceSlot: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  // Overlay gradient for text readability
  overlayGradient: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
} as const

export interface MediaHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of images */
  images: LightboxImage[]
  /** Layout variant - auto-detects based on screen size if not specified */
  variant?: 'grid' | 'carousel' | 'single' | 'auto'
  /** Container height */
  height?: number | string
  /** Show "Show all photos" button */
  showAllButton?: boolean
  /** Custom button text */
  buttonText?: string
  /** Callback when button clicked */
  onShowAll?: () => void
  /** Show counter on mobile */
  showCounter?: boolean
  /** Number of visible images in grid (1-5) */
  visibleImages?: number
  /** Instance slot content (tags, buttons, etc.) */
  instanceSlot?: React.ReactNode
  /** Enable hover effects on desktop */
  enableHover?: boolean
}

const MediaHero = forwardRef<HTMLDivElement, MediaHeroProps>(
  ({
    images,
    variant = 'auto',
    height = 420,
    showAllButton = true,
    buttonText = 'Show all photos',
    onShowAll,
    showCounter = true,
    visibleImages = 5,
    instanceSlot,
    enableHover = true,
    style,
    ...props
  }, ref) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isHovered, setIsHovered] = useState<number | null>(null)

    // Detect mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Determine actual variant
    const actualVariant = variant === 'auto' 
      ? (isMobile ? 'carousel' : 'grid')
      : variant

    const openLightbox = (index: number = 0) => {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }

    const handleShowAll = () => {
      if (onShowAll) {
        onShowAll()
      } else {
        openLightbox(0)
      }
    }

    // Announce to screen readers (mobile carousel)
    useEffect(() => {
      if (actualVariant === 'carousel' && showCounter) {
        const announcement = `Showing photo ${carouselIndex + 1} of ${images.length}`
        const announcementEl = document.createElement('div')
        announcementEl.setAttribute('role', 'status')
        announcementEl.setAttribute('aria-live', 'polite')
        announcementEl.setAttribute('aria-atomic', 'true')
        announcementEl.className = 'sr-only'
        announcementEl.textContent = announcement
        document.body.appendChild(announcementEl)
        
        setTimeout(() => {
          announcementEl.remove()
        }, 1000)
      }
    }, [carouselIndex, images.length, actualVariant, showCounter])

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      height,
      borderRadius: MEDIA_HERO_TOKENS.container.radius,
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const imageBaseStyle = (index?: number): React.CSSProperties => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      display: 'block',
      transition: enableHover ? 'transform 200ms ease' : 'none',
      transform: enableHover && isHovered === index ? 'scale(1.02)' : 'scale(1)',
    })

    const showAllButtonWrapperStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 16,
      right: 16,
      zIndex: 10,
    }

    // ========== SINGLE IMAGE ==========
    if (actualVariant === 'single' || images.length === 1) {
      return (
        <div 
          ref={ref} 
          style={containerStyle} 
          {...props}
          onMouseEnter={() => setIsHovered(0)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <img
            src={images[0]?.src}
            alt={images[0]?.alt || 'Hero image'}
            style={imageBaseStyle(0)}
            onClick={() => openLightbox(0)}
          />
          {instanceSlot && (
            <div style={MEDIA_HERO_TOKENS.instanceSlot}>
              {instanceSlot}
            </div>
          )}
          {showAllButton && images.length > 1 && (
            <div style={showAllButtonWrapperStyle}>
              <Button 
                variant="secondary" 
                size="sm" 
                leftIcon={Images} 
                onClick={handleShowAll}
                aria-label={`${buttonText} (${images.length} photos)`}
              >
                {buttonText}
              </Button>
            </div>
          )}
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
          />
        </div>
      )
    }

    // ========== CAROUSEL (Mobile) ==========
    if (actualVariant === 'carousel') {
      const goToPrev = () => setCarouselIndex(i => i > 0 ? i - 1 : images.length - 1)
      const goToNext = () => setCarouselIndex(i => i < images.length - 1 ? i + 1 : 0)

      const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
        position: 'absolute',
        [side]: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: '#18181b',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        zIndex: 10,
        touchAction: 'manipulation', // Better touch handling
      })

      return (
        <div 
          ref={ref} 
          style={containerStyle} 
          {...props}
          role="region"
          aria-label="Property photo gallery"
        >
          <div 
            style={{ 
              display: 'flex', 
              height: '100%',
              transition: 'transform 300ms ease',
              transform: `translateX(-${carouselIndex * 100}%)`,
              touchAction: 'pan-y', // Allow vertical scroll
            }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                style={{ 
                  flexShrink: 0, 
                  width: '100%', 
                  height: '100%',
                  position: 'relative',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Property photo ${index + 1}`}
                  style={imageBaseStyle()}
                  onClick={() => openLightbox(index)}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {instanceSlot && index === carouselIndex && (
                  <div style={{
                    ...MEDIA_HERO_TOKENS.instanceSlot,
                    background: MEDIA_HERO_TOKENS.overlayGradient,
                    padding: '8px',
                    borderRadius: '8px',
                  }}>
                    {instanceSlot}
                  </div>
                )}
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button 
                type="button" 
                style={navBtnStyle('left')} 
                onClick={goToPrev}
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                style={navBtnStyle('right')} 
                onClick={goToNext}
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Counter */}
          {showCounter && (
            <div style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              padding: MEDIA_HERO_TOKENS.counter.padding,
              fontSize: MEDIA_HERO_TOKENS.counter.fontSize,
              fontWeight: MEDIA_HERO_TOKENS.counter.fontWeight,
              backgroundColor: MEDIA_HERO_TOKENS.counter.bg,
              color: MEDIA_HERO_TOKENS.counter.fg,
              borderRadius: MEDIA_HERO_TOKENS.counter.radius,
              zIndex: 10,
            }}>
              {carouselIndex + 1}/{images.length}
            </div>
          )}

          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
          />
        </div>
      )
    }

    // ========== GRID LAYOUT (Desktop) ==========
    const gridImages = images.slice(0, Math.min(visibleImages, 5))
    const gap = MEDIA_HERO_TOKENS.container.gap

    // Different grid layouts based on image count
    const renderGrid = () => {
      if (gridImages.length === 1) {
        return (
          <div style={{ height: '100%', position: 'relative' }}>
            <img 
              src={gridImages[0].src} 
              alt={gridImages[0].alt || 'Property photo'} 
              style={imageBaseStyle(0)} 
              onClick={() => openLightbox(0)} 
            />
          </div>
        )
      }

      if (gridImages.length === 2) {
        // 2 images: 50/50 split
        return (
          <div style={{ display: 'flex', gap, height: '100%' }}>
            {gridImages.map((img, i) => (
              <div 
                key={i} 
                style={{ flex: 1, overflow: 'hidden', position: 'relative' }}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt || `Property photo ${i + 1}`} 
                  style={imageBaseStyle(i)} 
                  onClick={() => openLightbox(i)} 
                />
              </div>
            ))}
          </div>
        )
      }

      if (gridImages.length === 3) {
        // 3 images: main (60%) + 2 stacked (40%)
        return (
          <div style={{ display: 'flex', gap, height: '100%' }}>
            <div 
              style={{ width: '60%', overflow: 'hidden', position: 'relative' }}
              onMouseEnter={() => setIsHovered(0)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <img 
                src={gridImages[0].src} 
                alt={gridImages[0].alt || 'Main property photo'} 
                style={imageBaseStyle(0)} 
                onClick={() => openLightbox(0)} 
              />
            </div>
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap }}>
              {gridImages.slice(1).map((img, i) => (
                <div 
                  key={i} 
                  style={{ flex: 1, overflow: 'hidden', position: 'relative' }}
                  onMouseEnter={() => setIsHovered(i + 1)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt || `Property photo ${i + 2}`} 
                    style={imageBaseStyle(i + 1)} 
                    onClick={() => openLightbox(i + 1)} 
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (gridImages.length === 4) {
        // 4 images: main (60%) + 3 stacked (40%)
        return (
          <div style={{ display: 'flex', gap, height: '100%' }}>
            <div 
              style={{ width: '60%', overflow: 'hidden', position: 'relative' }}
              onMouseEnter={() => setIsHovered(0)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <img 
                src={gridImages[0].src} 
                alt={gridImages[0].alt || 'Main property photo'} 
                style={imageBaseStyle(0)} 
                onClick={() => openLightbox(0)} 
              />
            </div>
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap }}>
              {gridImages.slice(1).map((img, i) => (
                <div 
                  key={i} 
                  style={{ flex: 1, overflow: 'hidden', position: 'relative' }}
                  onMouseEnter={() => setIsHovered(i + 1)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt || `Property photo ${i + 2}`} 
                    style={imageBaseStyle(i + 1)} 
                    onClick={() => openLightbox(i + 1)} 
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }

      // 5 images (default): main (60%) + 2x2 grid (40%)
      return (
        <div style={{ display: 'flex', gap, height: '100%' }}>
          {/* Main image - 60% */}
          <div 
            style={{ width: '60%', overflow: 'hidden', position: 'relative' }}
            onMouseEnter={() => setIsHovered(0)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <img 
              src={gridImages[0].src} 
              alt={gridImages[0].alt || 'Main property photo'} 
              style={imageBaseStyle(0)} 
              onClick={() => openLightbox(0)} 
            />
          </div>
          
          {/* Side grid - 40% with 2x2 */}
          <div style={{ 
            width: '40%', 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap,
          }}>
            {gridImages.slice(1, 5).map((img, i) => (
              <div 
                key={i} 
                style={{ overflow: 'hidden', position: 'relative' }}
                onMouseEnter={() => setIsHovered(i + 1)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt || `Property photo ${i + 2}`} 
                  style={imageBaseStyle(i + 1)} 
                  onClick={() => openLightbox(i + 1)} 
                />
                {/* Show all button on last thumbnail */}
                {i === 3 && images.length > 5 && showAllButton && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShowAll()
                  }}
                  >
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      leftIcon={Images}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#18181b',
                      }}
                      aria-label={`${buttonText} (${images.length} photos)`}
                    >
                      {buttonText}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div 
        ref={ref} 
        style={containerStyle} 
        {...props}
        role="region"
        aria-label="Property photo gallery"
      >
        {renderGrid()}
        
        {/* Instance Slot (Stack) */}
        {instanceSlot && (
          <div style={MEDIA_HERO_TOKENS.instanceSlot}>
            {instanceSlot}
          </div>
        )}
        
        {/* Show all button (if not on last thumbnail) */}
        {showAllButton && images.length > visibleImages && gridImages.length < 5 && (
          <div style={showAllButtonWrapperStyle}>
            <Button 
              variant="secondary" 
              size="sm" 
              leftIcon={Images} 
              onClick={handleShowAll}
              aria-label={`${buttonText} (${images.length} photos)`}
            >
              {buttonText}
            </Button>
          </div>
        )}

        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
        />
      </div>
    )
  }
)

MediaHero.displayName = "MediaHero"

// Add screen reader only styles
if (typeof document !== 'undefined') {
  const styleId = 'vistral-media-hero-sr-only'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `
    document.head.appendChild(style)
  }
}

export { MediaHero, MEDIA_HERO_TOKENS }
