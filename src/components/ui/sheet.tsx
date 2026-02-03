import * as React from "react"
import { forwardRef, createContext, useContext, useState, useEffect } from "react"
import { X } from "lucide-react"

/**
 * Sheet/Drawer Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=652-21796
 */
const SHEET_TOKENS = {
  // Overlay
  overlay: {
    bg: 'rgba(0, 0, 0, 0.5)',
  },
  // Content
  content: {
    bg: '#ffffff',
    shadow: '0px 0px 24px rgba(0, 0, 0, 0.15)',
  },
  // Sizes
  sizes: {
    sm: 320,
    md: 400,
    lg: 540,
    xl: 720,
    full: '100%',
  },
  // Header
  header: {
    paddingX: 24,
    paddingY: 16,
    borderColor: '#e4e4e7',
  },
  // Body
  body: {
    padding: 24,
  },
  // Footer
  footer: {
    paddingX: 24,
    paddingY: 16,
    borderColor: '#e4e4e7',
  },
} as const

type SheetSide = 'left' | 'right' | 'top' | 'bottom'
type SheetSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// ============================================================================
// Context
// ============================================================================
type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

function useSheet() {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error('Sheet components must be used within a Sheet')
  }
  return context
}

// ============================================================================
// Sheet Root
// ============================================================================
export interface SheetProps {
  /** Controlled open state */
  open?: boolean
  /** Default open */
  defaultOpen?: boolean
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

Sheet.displayName = "Sheet"

// ============================================================================
// Sheet Trigger
// ============================================================================
export interface SheetTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, asChild }) => {
  const { setOpen } = useSheet()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => setOpen(true),
    } as any)
  }

  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  )
}

SheetTrigger.displayName = "SheetTrigger"

// ============================================================================
// Sheet Content
// ============================================================================
export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side to slide from */
  side?: SheetSide
  /** Size of the sheet */
  size?: SheetSize
  /** Show close button */
  showClose?: boolean
  /** Close on overlay click */
  closeOnOverlayClick?: boolean
}

const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({
    side = 'right',
    size = 'md',
    showClose = true,
    closeOnOverlayClick = true,
    style,
    children,
    ...props
  }, ref) => {
    const { open, setOpen } = useSheet()

    // Lock body scroll when open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    // Handle escape
    useEffect(() => {
      if (!open) return
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, setOpen])

    if (!open) return null

    const isHorizontal = side === 'left' || side === 'right'
    const sheetSize = SHEET_TOKENS.sizes[size]

    const getTransform = (entering: boolean) => {
      if (entering) return 'none'
      switch (side) {
        case 'left': return 'translateX(-100%)'
        case 'right': return 'translateX(100%)'
        case 'top': return 'translateY(-100%)'
        case 'bottom': return 'translateY(100%)'
      }
    }

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      backgroundColor: SHEET_TOKENS.overlay.bg,
      zIndex: 50,
      animation: 'sheet-overlay-show 200ms ease-out',
    }

    const contentStyle: React.CSSProperties = {
      position: 'fixed',
      [side]: 0,
      top: isHorizontal ? 0 : undefined,
      bottom: isHorizontal ? 0 : undefined,
      left: !isHorizontal ? 0 : undefined,
      right: !isHorizontal ? 0 : undefined,
      width: isHorizontal ? (typeof sheetSize === 'number' ? sheetSize : sheetSize) : '100%',
      height: isHorizontal ? '100%' : (typeof sheetSize === 'number' ? sheetSize : sheetSize),
      maxWidth: isHorizontal ? '100vw' : undefined,
      maxHeight: !isHorizontal ? '100vh' : undefined,
      backgroundColor: SHEET_TOKENS.content.bg,
      boxShadow: SHEET_TOKENS.content.shadow,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 51,
      animation: `sheet-slide-${side} 200ms ease-out`,
      ...style,
    }

    const closeStyle: React.CSSProperties = {
      position: 'absolute',
      top: 16,
      right: 16,
      padding: 8,
      background: 'none',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      color: '#71717a',
      display: 'flex',
      zIndex: 1,
    }

    return (
      <>
        <div 
          style={overlayStyle} 
          onClick={closeOnOverlayClick ? () => setOpen(false) : undefined}
          aria-hidden="true"
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          style={contentStyle}
          {...props}
        >
          {showClose && (
            <button type="button" style={closeStyle} onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          )}
          {children}
        </div>
      </>
    )
  }
)

SheetContent.displayName = "SheetContent"

// ============================================================================
// Sheet Header
// ============================================================================
export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ style, children, ...props }, ref) => {
    const headerStyle: React.CSSProperties = {
      padding: `${SHEET_TOKENS.header.paddingY}px ${SHEET_TOKENS.header.paddingX}px`,
      borderBottom: `1px solid ${SHEET_TOKENS.header.borderColor}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <div ref={ref} style={headerStyle} {...props}>
        {children}
      </div>
    )
  }
)

SheetHeader.displayName = "SheetHeader"

// ============================================================================
// Sheet Title
// ============================================================================
export interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ style, children, ...props }, ref) => {
    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
      color: '#18181b',
      ...style,
    }

    return (
      <h2 ref={ref} style={titleStyle} {...props}>
        {children}
      </h2>
    )
  }
)

SheetTitle.displayName = "SheetTitle"

// ============================================================================
// Sheet Description
// ============================================================================
export interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    const descStyle: React.CSSProperties = {
      margin: '4px 0 0',
      fontSize: 14,
      color: '#71717a',
      ...style,
    }

    return (
      <p ref={ref} style={descStyle} {...props}>
        {children}
      </p>
    )
  }
)

SheetDescription.displayName = "SheetDescription"

// ============================================================================
// Sheet Body
// ============================================================================
export interface SheetBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetBody = forwardRef<HTMLDivElement, SheetBodyProps>(
  ({ style, children, ...props }, ref) => {
    const bodyStyle: React.CSSProperties = {
      flex: 1,
      padding: SHEET_TOKENS.body.padding,
      overflowY: 'auto',
      ...style,
    }

    return (
      <div ref={ref} style={bodyStyle} {...props}>
        {children}
      </div>
    )
  }
)

SheetBody.displayName = "SheetBody"

// ============================================================================
// Sheet Footer
// ============================================================================
export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ style, children, ...props }, ref) => {
    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
      padding: `${SHEET_TOKENS.footer.paddingY}px ${SHEET_TOKENS.footer.paddingX}px`,
      borderTop: `1px solid ${SHEET_TOKENS.footer.borderColor}`,
      marginTop: 'auto',
      ...style,
    }

    return (
      <div ref={ref} style={footerStyle} {...props}>
        {children}
      </div>
    )
  }
)

SheetFooter.displayName = "SheetFooter"

// ============================================================================
// Sheet Close
// ============================================================================
export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SheetClose: React.FC<SheetCloseProps> = ({ asChild, children, onClick, ...props }) => {
  const { setOpen } = useSheet()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick } as any)
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

SheetClose.displayName = "SheetClose"

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-sheet-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes sheet-overlay-show {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes sheet-slide-right {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes sheet-slide-left {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      @keyframes sheet-slide-top {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      @keyframes sheet-slide-bottom {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
  }
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  SHEET_TOKENS,
}
