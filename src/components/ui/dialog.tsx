import * as React from "react"
import { forwardRef, createContext, useContext, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { Button } from "./button"

/**
 * Dialog Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=316-11645
 */
const DIALOG_TOKENS = {
  // Overlay
  overlay: {
    bg: 'rgba(0, 0, 0, 0.5)',
  },
  // Container
  container: {
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 12,
    shadow: '0px 16px 48px rgba(0, 0, 0, 0.16)',
  },
  // Sizes
  sizes: {
    sm: { width: 400, maxHeight: '85vh' },
    md: { width: 500, maxHeight: '85vh' },
    lg: { width: 640, maxHeight: '85vh' },
    xl: { width: 800, maxHeight: '90vh' },
    full: { width: '100%', maxHeight: '100%' },
  },
  // Spacing
  padding: {
    header: 24,
    content: 24,
    footer: 16,
  },
} as const

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// ============================================================================
// Context
// ============================================================================
type DialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

// ============================================================================
// Dialog Root
// ============================================================================
export interface DialogProps {
  /** Controlled open state */
  open?: boolean
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Children */
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

Dialog.displayName = "Dialog"

// ============================================================================
// Dialog Trigger
// ============================================================================
export interface DialogTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild }) => {
  const { onOpenChange } = useDialog()

  const handleClick = () => onOpenChange(true)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    } as any)
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

DialogTrigger.displayName = "DialogTrigger"

// ============================================================================
// Dialog Portal (Content container)
// ============================================================================
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the dialog */
  size?: DialogSize
  /** Show close button */
  showClose?: boolean
  /** Close on overlay click */
  closeOnOverlayClick?: boolean
  /** Close on escape key */
  closeOnEscape?: boolean
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ 
    size = 'md',
    showClose = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    style,
    children,
    ...props 
  }, ref) => {
    const { open, onOpenChange } = useDialog()
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, closeOnEscape, onOpenChange])

    // Lock body scroll when open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    if (!open) return null

    const sizeTokens = DIALOG_TOKENS.sizes[size]

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      backgroundColor: DIALOG_TOKENS.overlay.bg,
      display: 'flex',
      alignItems: size === 'full' ? 'stretch' : 'center',
      justifyContent: 'center',
      padding: size === 'full' ? 0 : 24,
      zIndex: 50,
      animation: 'dialog-overlay-show 150ms ease-out',
    }

    const contentStyle: React.CSSProperties = {
      position: 'relative',
      width: sizeTokens.width,
      maxWidth: size === 'full' ? '100%' : 'calc(100vw - 48px)',
      maxHeight: sizeTokens.maxHeight,
      backgroundColor: DIALOG_TOKENS.container.bg,
      borderRadius: size === 'full' ? 0 : DIALOG_TOKENS.container.radius,
      boxShadow: DIALOG_TOKENS.container.shadow,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'dialog-content-show 150ms ease-out',
      ...style,
    }

    const closeButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: 16,
      right: 16,
      padding: 8,
      background: 'none',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      color: '#71717a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 150ms ease',
      zIndex: 1,
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onOpenChange(false)
      }
    }

    return (
      <div style={overlayStyle} onClick={handleOverlayClick}>
        <div
          ref={ref || contentRef}
          role="dialog"
          aria-modal="true"
          style={contentStyle}
          {...props}
        >
          {showClose && (
            <button
              type="button"
              style={closeButtonStyle}
              onClick={() => onOpenChange(false)}
              aria-label="Close dialog"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f4f4f5')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <X size={20} />
            </button>
          )}
          {children}
        </div>
      </div>
    )
  }
)

DialogContent.displayName = "DialogContent"

// ============================================================================
// Dialog Header
// ============================================================================
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ style, children, ...props }, ref) => {
    const headerStyle: React.CSSProperties = {
      padding: `${DIALOG_TOKENS.padding.header}px ${DIALOG_TOKENS.padding.header}px 0`,
      paddingRight: 56, // Space for close button
      ...style,
    }

    return (
      <div ref={ref} style={headerStyle} {...props}>
        {children}
      </div>
    )
  }
)

DialogHeader.displayName = "DialogHeader"

// ============================================================================
// Dialog Title
// ============================================================================
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ style, children, ...props }, ref) => {
    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#18181b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <h2 ref={ref} style={titleStyle} {...props}>
        {children}
      </h2>
    )
  }
)

DialogTitle.displayName = "DialogTitle"

// ============================================================================
// Dialog Description
// ============================================================================
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    const descStyle: React.CSSProperties = {
      margin: '8px 0 0 0',
      fontSize: 14,
      lineHeight: 1.5,
      color: '#71717a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <p ref={ref} style={descStyle} {...props}>
        {children}
      </p>
    )
  }
)

DialogDescription.displayName = "DialogDescription"

// ============================================================================
// Dialog Body (scrollable content area)
// ============================================================================
export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ style, children, ...props }, ref) => {
    const bodyStyle: React.CSSProperties = {
      flex: 1,
      padding: DIALOG_TOKENS.padding.content,
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

DialogBody.displayName = "DialogBody"

// ============================================================================
// Dialog Footer
// ============================================================================
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between'
}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ align = 'right', style, children, ...props }, ref) => {
    const justifyMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
      between: 'space-between',
    }

    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: justifyMap[align],
      gap: 12,
      padding: DIALOG_TOKENS.padding.footer,
      borderTop: '1px solid #e4e4e7',
      ...style,
    }

    return (
      <div ref={ref} style={footerStyle} {...props}>
        {children}
      </div>
    )
  }
)

DialogFooter.displayName = "DialogFooter"

// ============================================================================
// Dialog Close (utility component)
// ============================================================================
export interface DialogCloseProps {
  children: React.ReactElement
  asChild?: boolean
}

const DialogClose: React.FC<DialogCloseProps> = ({ children, asChild }) => {
  const { onOpenChange } = useDialog()

  const handleClick = () => onOpenChange(false)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    } as any)
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

DialogClose.displayName = "DialogClose"

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-dialog-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes dialog-overlay-show {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes dialog-content-show {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    `
    document.head.appendChild(style)
  }
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DIALOG_TOKENS,
}
