import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2, Grid3X3 } from "lucide-react"

/**
 * Lightbox Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1955-2023
 */
const LIGHTBOX_TOKENS = {
  // Overlay
  overlay: {
    bg: 'rgba(24, 24, 27, 0.95)',
  },
  // Header
  header: {
    height: 56,
    bg: 'rgba(24, 24, 27, 0.98)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  // Controls
  controls: {
    size: 40,
    bg: 'transparent',
    bgHover: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    radius: 8,
  },
  // Counter
  counter: {
    fontSize: 14,
    fontWeight: 500,
    color: '#ffffff',
  },
  // Thumbnails strip
  thumbnails: {
    height: 80,
    bg: 'rgba(24, 24, 27, 0.98)',
    gap: 8,
    itemSize: 64,
    itemRadius: 8,
    borderActive: '2px solid #2050f6',
    borderInactive: '2px solid transparent',
  },
  // Navigation arrows
  navArrow: {
    size: 48,
    bg: 'rgba(0, 0, 0, 0.5)',
    bgHover: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    radius: 9999,
  },
} as const

export interface LightboxImage {
  src: string
  alt?: string
  thumbnail?: string
}

export interface LightboxProps {
  /** Array of images */
  images: LightboxImage[]
  /** Initial image index */
  initialIndex?: number
  /** Controlled open state */
  open?: boolean
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void
  /** Show thumbnails strip */
  showThumbnails?: boolean
  /** Show counter */
  showCounter?: boolean
  /** Enable zoom */
  enableZoom?: boolean
  /** Enable download */
  enableDownload?: boolean
  /** Close on backdrop click */
  closeOnBackdrop?: boolean
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  open: controlledOpen,
  onOpenChange,
  showThumbnails = true,
  showCounter = true,
  enableZoom = false,
  enableDownload = false,
  closeOnBackdrop = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
    if (!newOpen) {
      setIsZoomed(false)
    }
  }, [isControlled, onOpenChange])

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
      setIsZoomed(false)
    }
  }, [open, initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setOpen(false)
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, currentIndex])

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current && showThumbnails) {
      const thumbnail = thumbnailsRef.current.children[currentIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [currentIndex, showThumbnails])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    setIsZoomed(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    setIsZoomed(false)
  }

  const handleDownload = () => {
    const image = images[currentIndex]
    const link = document.createElement('a')
    link.href = image.src
    link.download = image.alt || `image-${currentIndex + 1}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!open || images.length === 0) return null

  const currentImage = images[currentIndex]

  // Styles
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: LIGHTBOX_TOKENS.overlay.bg,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: LIGHTBOX_TOKENS.header.height,
    padding: '0 16px',
    backgroundColor: LIGHTBOX_TOKENS.header.bg,
    borderBottom: `1px solid ${LIGHTBOX_TOKENS.header.borderColor}`,
    flexShrink: 0,
  }

  const controlBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: LIGHTBOX_TOKENS.controls.size,
    height: LIGHTBOX_TOKENS.controls.size,
    backgroundColor: LIGHTBOX_TOKENS.controls.bg,
    color: LIGHTBOX_TOKENS.controls.color,
    border: 'none',
    borderRadius: LIGHTBOX_TOKENS.controls.radius,
    cursor: 'pointer',
    transition: 'background-color 150ms',
  }

  const mainAreaStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  }

  const imageStyle: React.CSSProperties = {
    maxWidth: isZoomed ? 'none' : '90%',
    maxHeight: isZoomed ? 'none' : '100%',
    width: isZoomed ? 'auto' : 'auto',
    height: isZoomed ? 'auto' : 'auto',
    objectFit: 'contain',
    cursor: enableZoom ? (isZoomed ? 'zoom-out' : 'zoom-in') : 'default',
    transition: 'transform 200ms ease',
    transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
  }

  const navArrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    [side]: 24,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: LIGHTBOX_TOKENS.navArrow.size,
    height: LIGHTBOX_TOKENS.navArrow.size,
    backgroundColor: LIGHTBOX_TOKENS.navArrow.bg,
    color: LIGHTBOX_TOKENS.navArrow.color,
    border: 'none',
    borderRadius: LIGHTBOX_TOKENS.navArrow.radius,
    cursor: 'pointer',
    zIndex: 10,
    transition: 'background-color 150ms',
  })

  const thumbnailsContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: LIGHTBOX_TOKENS.thumbnails.height,
    padding: '8px 16px',
    backgroundColor: LIGHTBOX_TOKENS.thumbnails.bg,
    borderTop: `1px solid ${LIGHTBOX_TOKENS.header.borderColor}`,
    flexShrink: 0,
    overflow: 'hidden',
  }

  const thumbnailsScrollStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: LIGHTBOX_TOKENS.thumbnails.gap,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    maxWidth: '100%',
  }

  const getThumbnailStyle = (index: number): React.CSSProperties => ({
    width: LIGHTBOX_TOKENS.thumbnails.itemSize,
    height: LIGHTBOX_TOKENS.thumbnails.itemSize,
    borderRadius: LIGHTBOX_TOKENS.thumbnails.itemRadius,
    objectFit: 'cover',
    cursor: 'pointer',
    border: index === currentIndex 
      ? LIGHTBOX_TOKENS.thumbnails.borderActive 
      : LIGHTBOX_TOKENS.thumbnails.borderInactive,
    opacity: index === currentIndex ? 1 : 0.6,
    transition: 'opacity 150ms, border-color 150ms',
    flexShrink: 0,
  })

  return (
    <div style={overlayStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button 
            type="button" 
            style={controlBtnStyle} 
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
          {showCounter && (
            <span style={{ 
              fontSize: LIGHTBOX_TOKENS.counter.fontSize, 
              fontWeight: LIGHTBOX_TOKENS.counter.fontWeight,
              color: LIGHTBOX_TOKENS.counter.color,
              marginLeft: 8,
            }}>
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {enableZoom && (
            <button 
              type="button" 
              style={controlBtnStyle} 
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
          )}
          {enableDownload && (
            <button 
              type="button" 
              style={controlBtnStyle} 
              onClick={handleDownload}
              title="Download"
            >
              <Download size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Area */}
      <div 
        style={mainAreaStyle} 
        onClick={closeOnBackdrop ? () => setOpen(false) : undefined}
      >
        {/* Left Arrow */}
        {images.length > 1 && (
          <button 
            type="button" 
            style={navArrowStyle('left')} 
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          style={imageStyle}
          onClick={(e) => {
            e.stopPropagation()
            if (enableZoom) setIsZoomed(!isZoomed)
          }}
        />

        {/* Right Arrow */}
        {images.length > 1 && (
          <button 
            type="button" 
            style={navArrowStyle('right')} 
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Thumbnails Strip */}
      {showThumbnails && images.length > 1 && (
        <div style={thumbnailsContainerStyle}>
          <div ref={thumbnailsRef} style={thumbnailsScrollStyle}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.thumbnail || image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
                style={getThumbnailStyle(index)}
                onClick={() => { setCurrentIndex(index); setIsZoomed(false); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

Lightbox.displayName = "Lightbox"

// ============================================================================
// Lightbox Trigger
// ============================================================================
export interface LightboxTriggerProps {
  images: LightboxImage[]
  initialIndex?: number
  children: React.ReactElement
  lightboxProps?: Omit<LightboxProps, 'images' | 'initialIndex' | 'open' | 'onOpenChange'>
}

const LightboxTrigger: React.FC<LightboxTriggerProps> = ({
  images,
  initialIndex = 0,
  children,
  lightboxProps,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          setOpen(true)
          children.props.onClick?.(e)
        },
        style: { ...children.props.style, cursor: 'pointer' },
      })}
      <Lightbox
        images={images}
        initialIndex={initialIndex}
        open={open}
        onOpenChange={setOpen}
        {...lightboxProps}
      />
    </>
  )
}

LightboxTrigger.displayName = "LightboxTrigger"

export { Lightbox, LightboxTrigger, LIGHTBOX_TOKENS }
