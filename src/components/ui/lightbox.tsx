import * as React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, ArrowLeft } from 'lucide-react'

/**
 * Lightbox Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=3985-4790
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
    padding: '0 16px',
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
  // File name
  fileName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#ffffff',
  },
  // Zoom controls
  zoom: {
    fontSize: 14,
    fontWeight: 500,
    color: '#ffffff',
    gap: 8,
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
  // Annotation card
  annotation: {
    bg: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    radius: 12,
    shadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
    maxWidth: 320,
    gap: 8,
  },
  // Page thumbnails sidebar (for documents)
  pageSidebar: {
    width: 120,
    bg: 'rgba(24, 24, 27, 0.98)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    gap: 8,
    itemHeight: 80,
    itemRadius: 4,
    borderActive: '2px solid #2050f6',
  },
} as const

export interface LightboxImage {
  src: string
  alt?: string
  thumbnail?: string
  name?: string
  description?: string
  tags?: string[]
}

export interface LightboxAnnotation {
  title: string
  description?: string
  tags?: string[]
}

export type LightboxVariant = 'image' | 'document'

export interface LightboxProps {
  /** Array of images */
  images: LightboxImage[]
  /** Initial image index */
  initialIndex?: number
  /** Controlled open state */
  open?: boolean
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void
  /** Variant: image viewer or document viewer */
  variant?: LightboxVariant
  /** Show thumbnails strip (for images) or sidebar (for documents) */
  showThumbnails?: boolean
  /** Show counter */
  showCounter?: boolean
  /** Enable zoom */
  enableZoom?: boolean
  /** Zoom level (percentage) */
  zoomLevel?: number
  /** Callback when zoom changes */
  onZoomChange?: (zoom: number) => void
  /** Enable download */
  enableDownload?: boolean
  /** Show back button */
  showBack?: boolean
  /** Callback when back is clicked */
  onBack?: () => void
  /** Secondary action button */
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  /** Annotation card */
  annotation?: LightboxAnnotation
  /** Close on backdrop click */
  closeOnBackdrop?: boolean
  /** Enable keyboard navigation */
  enableKeyboard?: boolean
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex = 0,
  open: controlledOpen,
  onOpenChange,
  variant = 'image',
  showThumbnails = true,
  showCounter = true,
  enableZoom = false,
  zoomLevel: controlledZoomLevel,
  onZoomChange,
  enableDownload = false,
  showBack = false,
  onBack,
  secondaryAction,
  annotation,
  closeOnBackdrop = true,
  enableKeyboard = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [internalZoomLevel, setInternalZoomLevel] = useState(100)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const isZoomControlled = controlledZoomLevel !== undefined
  const zoomLevel = isZoomControlled ? controlledZoomLevel : internalZoomLevel

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
      if (!newOpen) {
        setZoomLevel(100)
      }
    },
    [isControlled, onOpenChange]
  )

  const setZoomLevel = useCallback(
    (newZoom: number) => {
      if (!isZoomControlled) {
        setInternalZoomLevel(newZoom)
      }
      onZoomChange?.(newZoom)
    },
    [isZoomControlled, onZoomChange]
  )

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
      setZoomLevel(100)
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement
    } else {
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
        previousFocusRef.current = null
      }
    }
  }, [open, initialIndex, setZoomLevel])

  // Focus trap
  useEffect(() => {
    if (!open || !lightboxRef.current) return

    const handleTab = (e: KeyboardEvent) => {
      const focusableElements = lightboxRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open || !enableKeyboard) return

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
  }, [open, enableKeyboard, currentIndex])

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
    if (thumbnailsRef.current && showThumbnails && variant === 'image') {
      const thumbnail = thumbnailsRef.current.children[currentIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [currentIndex, showThumbnails, variant])

  // Announce to screen readers
  useEffect(() => {
    if (open && lightboxRef.current) {
      const announcement = `Image ${currentIndex + 1} of ${images.length}`
      const announcementEl = document.createElement('div')
      announcementEl.setAttribute('role', 'status')
      announcementEl.setAttribute('aria-live', 'polite')
      announcementEl.setAttribute('aria-atomic', 'true')
      announcementEl.className = 'sr-only'
      announcementEl.textContent = announcement
      lightboxRef.current.appendChild(announcementEl)

      setTimeout(() => {
        announcementEl.remove()
      }, 1000)
    }
  }, [open, currentIndex, images.length])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 25, 200)
    setZoomLevel(newZoom)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 25, 50)
    setZoomLevel(newZoom)
  }

  const handleDownload = () => {
    const image = images[currentIndex]
    const link = document.createElement('a')
    link.href = image.src
    link.download = image.name || image.alt || `image-${currentIndex + 1}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      setOpen(false)
    }
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
    padding: LIGHTBOX_TOKENS.header.padding,
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

  const secondaryButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#2050f6',
    border: '1px solid #2050f6',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    transition: 'all 150ms',
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
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    cursor: enableZoom ? 'zoom-in' : 'default',
    transition: 'transform 200ms ease',
    transform: `scale(${zoomLevel / 100})`,
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
    border:
      index === currentIndex
        ? LIGHTBOX_TOKENS.thumbnails.borderActive
        : LIGHTBOX_TOKENS.thumbnails.borderInactive,
    opacity: index === currentIndex ? 1 : 0.6,
    transition: 'opacity 150ms, border-color 150ms',
    flexShrink: 0,
  })

  const annotationCardStyle: React.CSSProperties = {
    position: 'absolute',
    top: 80,
    right: 24,
    backgroundColor: LIGHTBOX_TOKENS.annotation.bg,
    padding: LIGHTBOX_TOKENS.annotation.padding,
    borderRadius: LIGHTBOX_TOKENS.annotation.radius,
    boxShadow: LIGHTBOX_TOKENS.annotation.shadow,
    maxWidth: LIGHTBOX_TOKENS.annotation.maxWidth,
    zIndex: 20,
  }

  return (
    <div
      ref={lightboxRef}
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${currentImage.name || currentImage.alt || `image ${currentIndex + 1}`}`}
    >
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {showBack && (
            <button
              type="button"
              style={controlBtnStyle}
              onClick={handleBack}
              aria-label="Go back"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg
              }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button
            type="button"
            style={controlBtnStyle}
            onClick={() => setOpen(false)}
            aria-label="Close lightbox"
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg
            }}
          >
            <X size={20} />
          </button>
          {showCounter && (
            <span
              style={{
                fontSize: LIGHTBOX_TOKENS.counter.fontSize,
                fontWeight: LIGHTBOX_TOKENS.counter.fontWeight,
                color: LIGHTBOX_TOKENS.counter.color,
              }}
            >
              {currentIndex + 1} / {images.length}
            </span>
          )}
          {currentImage.name && (
            <span
              style={{
                fontSize: LIGHTBOX_TOKENS.fileName.fontSize,
                fontWeight: LIGHTBOX_TOKENS.fileName.fontWeight,
                color: LIGHTBOX_TOKENS.fileName.color,
                marginLeft: 8,
              }}
            >
              {currentImage.name}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {enableZoom && (
            <div style={{ display: 'flex', alignItems: 'center', gap: LIGHTBOX_TOKENS.zoom.gap }}>
              <button
                type="button"
                style={controlBtnStyle}
                onClick={handleZoomOut}
                aria-label={`Zoom out to ${zoomLevel - 25}%`}
                disabled={zoomLevel <= 50}
                onMouseEnter={e => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg
                }}
              >
                <ZoomOut size={20} />
              </button>
              <span
                style={{
                  fontSize: LIGHTBOX_TOKENS.zoom.fontSize,
                  fontWeight: LIGHTBOX_TOKENS.zoom.fontWeight,
                  color: LIGHTBOX_TOKENS.zoom.color,
                  minWidth: 48,
                  textAlign: 'center',
                }}
              >
                {zoomLevel}%
              </span>
              <button
                type="button"
                style={controlBtnStyle}
                onClick={handleZoomIn}
                aria-label={`Zoom in to ${zoomLevel + 25}%`}
                disabled={zoomLevel >= 200}
                onMouseEnter={e => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg
                }}
              >
                <ZoomIn size={20} />
              </button>
            </div>
          )}
          {secondaryAction && (
            <button
              type="button"
              style={secondaryButtonStyle}
              onClick={secondaryAction.onClick}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(32, 80, 246, 0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {secondaryAction.label}
            </button>
          )}
          {enableDownload && (
            <button
              type="button"
              style={controlBtnStyle}
              onClick={handleDownload}
              aria-label="Download image"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bgHover
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.controls.bg
              }}
            >
              <Download size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Image Area */}
      <div style={mainAreaStyle} onClick={closeOnBackdrop ? () => setOpen(false) : undefined}>
        {/* Left Arrow */}
        {images.length > 1 && variant === 'image' && (
          <button
            type="button"
            style={navArrowStyle('left')}
            onClick={e => {
              e.stopPropagation()
              goToPrevious()
            }}
            aria-label="Previous image"
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bgHover
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bg
            }}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt || currentImage.name || `Image ${currentIndex + 1}`}
          style={imageStyle}
          onClick={e => {
            e.stopPropagation()
            if (enableZoom && zoomLevel < 200) {
              handleZoomIn()
            }
          }}
        />

        {/* Right Arrow */}
        {images.length > 1 && variant === 'image' && (
          <button
            type="button"
            style={navArrowStyle('right')}
            onClick={e => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Next image"
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bgHover
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = LIGHTBOX_TOKENS.navArrow.bg
            }}
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Annotation Card */}
        {annotation && (
          <div style={annotationCardStyle}>
            <h3
              style={{
                margin: '0 0 8px',
                fontSize: 14,
                fontWeight: 600,
                color: '#18181b',
              }}
            >
              {annotation.title}
            </h3>
            {annotation.description && (
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: 13,
                  color: '#71717a',
                  lineHeight: 1.5,
                }}
              >
                {annotation.description}
              </p>
            )}
            {annotation.tags && annotation.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {annotation.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '2px 8px',
                      fontSize: 12,
                      backgroundColor: '#f4f4f5',
                      color: '#71717a',
                      borderRadius: 4,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thumbnails Strip (for images) */}
      {showThumbnails && variant === 'image' && images.length > 1 && (
        <div style={thumbnailsContainerStyle}>
          <div ref={thumbnailsRef} style={thumbnailsScrollStyle}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.thumbnail || image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
                style={getThumbnailStyle(index)}
                onClick={() => {
                  setCurrentIndex(index)
                  setZoomLevel(100)
                }}
                role="button"
                tabIndex={0}
                aria-label={`Go to image ${index + 1}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setCurrentIndex(index)
                    setZoomLevel(100)
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

Lightbox.displayName = 'Lightbox'

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

  const childProps = React.isValidElement(children)
    ? (children.props as { onClick?: (e: React.MouseEvent) => void; style?: React.CSSProperties })
    : {}
  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          setOpen(true)
          childProps.onClick?.(e)
        },
        style: { ...childProps.style, cursor: 'pointer' },
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

LightboxTrigger.displayName = 'LightboxTrigger'

// Add screen reader only styles
if (typeof document !== 'undefined') {
  const styleId = 'vistral-lightbox-sr-only'
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

export { Lightbox, LightboxTrigger, LIGHTBOX_TOKENS }
