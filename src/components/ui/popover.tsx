import * as React from "react"
import { forwardRef, createContext, useContext, useState, useRef, useEffect } from "react"

/**
 * Popover Design Tokens
 */
const POPOVER_TOKENS = {
  bg: '#ffffff',
  border: '#e4e4e7',
  shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
  radius: 12,
  padding: 16,
  maxWidth: 320,
} as const

// ============================================================================
// Context
// ============================================================================
type PopoverContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement>
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopover() {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('Popover components must be used within a Popover')
  }
  return context
}

// ============================================================================
// Popover Root
// ============================================================================
export interface PopoverProps {
  /** Controlled open state */
  open?: boolean
  /** Default open state */
  defaultOpen?: boolean
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  )
}

Popover.displayName = "Popover"

// ============================================================================
// Popover Trigger
// ============================================================================
export interface PopoverTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, asChild }) => {
  const { open, setOpen, triggerRef } = usePopover()

  const handleClick = () => setOpen(!open)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': 'dialog',
    } as any)
  }

  return (
    <button 
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button" 
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  )
}

PopoverTrigger.displayName = "PopoverTrigger"

// ============================================================================
// Popover Content
// ============================================================================
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end'
  /** Side relative to trigger */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Side offset */
  sideOffset?: number
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ align = 'center', side = 'bottom', sideOffset = 8, style, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopover()
    const contentRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
      if (!open) return

      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current && 
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setOpen(false)
        }
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }

      document.addEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, setOpen, triggerRef])

    if (!open) return null

    const getPositionStyles = (): React.CSSProperties => {
      const alignStyles: Record<string, React.CSSProperties> = {
        start: { left: 0 },
        center: { left: '50%', transform: 'translateX(-50%)' },
        end: { right: 0 },
      }

      const sideStyles: Record<string, React.CSSProperties> = {
        top: { bottom: '100%', marginBottom: sideOffset },
        bottom: { top: '100%', marginTop: sideOffset },
        left: { right: '100%', marginRight: sideOffset, top: 0 },
        right: { left: '100%', marginLeft: sideOffset, top: 0 },
      }

      if (side === 'left' || side === 'right') {
        const vertAlign: Record<string, React.CSSProperties> = {
          start: { top: 0 },
          center: { top: '50%', transform: 'translateY(-50%)' },
          end: { bottom: 0 },
        }
        return { ...sideStyles[side], ...vertAlign[align] }
      }

      return { ...sideStyles[side], ...alignStyles[align] }
    }

    const contentStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      minWidth: 200,
      maxWidth: POPOVER_TOKENS.maxWidth,
      padding: POPOVER_TOKENS.padding,
      backgroundColor: POPOVER_TOKENS.bg,
      border: `1px solid ${POPOVER_TOKENS.border}`,
      borderRadius: POPOVER_TOKENS.radius,
      boxShadow: POPOVER_TOKENS.shadow,
      animation: 'popover-show 150ms ease-out',
      ...getPositionStyles(),
      ...style,
    }

    return (
      <div
        ref={ref || contentRef}
        role="dialog"
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PopoverContent.displayName = "PopoverContent"

// ============================================================================
// Popover Close
// ============================================================================
export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const PopoverClose: React.FC<PopoverCloseProps> = ({ asChild, children, onClick, ...props }) => {
  const { setOpen } = usePopover()

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

PopoverClose.displayName = "PopoverClose"

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-popover-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes popover-show {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `
    document.head.appendChild(style)
  }
}

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, POPOVER_TOKENS }
