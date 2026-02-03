import * as React from "react"
import { forwardRef, useState } from "react"
import { Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { Lightbox, LightboxImage } from "./lightbox"

/**
 * Media Hero Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4525-32224
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
  // Carousel dots
  dots: {
    size: 6,
    gap: 6,
    inactive: 'rgba(255, 255, 255, 0.5)',
    active: '#ffffff',
  },
  // Navigation arrows
  navArrow: {
    size: 36,
    bg: 'rgba(255, 255, 255, 0.95)',
    fg: '#18181b',
    radius: 9999,
    shadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
} as const

export interface MediaHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of images */
  images: LightboxImage[]
  /** Layout variant */
  variant?: 'grid' | 'carousel' | 'single'
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
}

const MediaHero = forwardRef<HTMLDivElement, MediaHeroProps>(
  ({
    images,
    variant = 'grid',
    height = 420,
    showAllButton = true,
    buttonText = 'Show all photos',
    onShowAll,
    showCounter = true,
    visibleImages = 5,
    style,
    ...props
  }, ref) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [carouselIndex, setCarouselIndex] = useState(0)

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

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      height,
      borderRadius: MEDIA_HERO_TOKENS.container.radius,
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const imageBaseStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      display: 'block',
    }

    const showAllButtonStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 16,
      right: 16,
      display: 'flex',
      alignItems: 'center',
      gap: MEDIA_HERO_TOKENS.button.gap,
      padding: MEDIA_HERO_TOKENS.button.padding,
      fontSize: MEDIA_HERO_TOKENS.button.fontSize,
      fontWeight: MEDIA_HERO_TOKENS.button.fontWeight,
      fontFamily: 'inherit',
      backgroundColor: MEDIA_HERO_TOKENS.button.bg,
      color: MEDIA_HERO_TOKENS.button.fg,
      border: 'none',
      borderRadius: MEDIA_HERO_TOKENS.button.radius,
      boxShadow: MEDIA_HERO_TOKENS.button.shadow,
      cursor: 'pointer',
      zIndex: 10,
    }

    // ========== SINGLE IMAGE ==========
    if (variant === 'single' || images.length === 1) {
      return (
        <div ref={ref} style={containerStyle} {...props}>
          <img
            src={images[0]?.src}
            alt={images[0]?.alt || 'Hero image'}
            style={imageBaseStyle}
            onClick={() => openLightbox(0)}
          />
          {showAllButton && images.length > 1 && (
            <button type="button" style={showAllButtonStyle} onClick={handleShowAll}>
              <Camera size={18} />
              {buttonText}
            </button>
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
    if (variant === 'carousel') {
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
        width: MEDIA_HERO_TOKENS.navArrow.size,
        height: MEDIA_HERO_TOKENS.navArrow.size,
        backgroundColor: MEDIA_HERO_TOKENS.navArrow.bg,
        color: MEDIA_HERO_TOKENS.navArrow.fg,
        border: 'none',
        borderRadius: MEDIA_HERO_TOKENS.navArrow.radius,
        boxShadow: MEDIA_HERO_TOKENS.navArrow.shadow,
        cursor: 'pointer',
        zIndex: 10,
      })

      return (
        <div ref={ref} style={containerStyle} {...props}>
          <div style={{ 
            display: 'flex', 
            height: '100%',
            transition: 'transform 300ms ease',
            transform: `translateX(-${carouselIndex * 100}%)`,
          }}>
            {images.map((image, index) => (
              <div key={index} style={{ flexShrink: 0, width: '100%', height: '100%' }}>
                <img
                  src={image.src}
                  alt={image.alt || `Image ${index + 1}`}
                  style={imageBaseStyle}
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))}
          </div>

          <button type="button" style={navBtnStyle('left')} onClick={goToPrev}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" style={navBtnStyle('right')} onClick={goToNext}>
            <ChevronRight size={20} />
          </button>

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

          {/* Dots */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: MEDIA_HERO_TOKENS.dots.gap,
            zIndex: 10,
          }}>
            {images.slice(0, 7).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  width: MEDIA_HERO_TOKENS.dots.size,
                  height: MEDIA_HERO_TOKENS.dots.size,
                  borderRadius: '50%',
                  backgroundColor: index === carouselIndex 
                    ? MEDIA_HERO_TOKENS.dots.active 
                    : MEDIA_HERO_TOKENS.dots.inactive,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </div>

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
      if (gridImages.length === 2) {
        // 2 images: 50/50 split
        return (
          <div style={{ display: 'flex', gap, height: '100%' }}>
            {gridImages.map((img, i) => (
              <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
                <img src={img.src} alt={img.alt} style={imageBaseStyle} onClick={() => openLightbox(i)} />
              </div>
            ))}
          </div>
        )
      }

      if (gridImages.length === 3) {
        // 3 images: main (60%) + 2 stacked (40%)
        return (
          <div style={{ display: 'flex', gap, height: '100%' }}>
            <div style={{ width: '60%', overflow: 'hidden' }}>
              <img src={gridImages[0].src} alt={gridImages[0].alt} style={imageBaseStyle} onClick={() => openLightbox(0)} />
            </div>
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap }}>
              {gridImages.slice(1).map((img, i) => (
                <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
                  <img src={img.src} alt={img.alt} style={imageBaseStyle} onClick={() => openLightbox(i + 1)} />
                </div>
              ))}
            </div>
          </div>
        )
      }

      if (gridImages.length === 4) {
        // 4 images: main (60%) + 3 on right
        return (
          <div style={{ display: 'flex', gap, height: '100%' }}>
            <div style={{ width: '60%', overflow: 'hidden' }}>
              <img src={gridImages[0].src} alt={gridImages[0].alt} style={imageBaseStyle} onClick={() => openLightbox(0)} />
            </div>
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap }}>
              {gridImages.slice(1).map((img, i) => (
                <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
                  <img src={img.src} alt={img.alt} style={imageBaseStyle} onClick={() => openLightbox(i + 1)} />
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
          <div style={{ width: '60%', overflow: 'hidden' }}>
            <img 
              src={gridImages[0].src} 
              alt={gridImages[0].alt} 
              style={imageBaseStyle} 
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
              <div key={i} style={{ overflow: 'hidden' }}>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  style={imageBaseStyle} 
                  onClick={() => openLightbox(i + 1)} 
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {renderGrid()}
        
        {showAllButton && images.length > visibleImages && (
          <button type="button" style={showAllButtonStyle} onClick={handleShowAll}>
            <Camera size={18} />
            {buttonText}
          </button>
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

export { MediaHero, MEDIA_HERO_TOKENS }
