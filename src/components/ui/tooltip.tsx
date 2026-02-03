import * as React from "react"
import { forwardRef, useState, useRef, useEffect, createContext, useContext } from "react"

/**
 * Tooltip Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1023-28801
 */
const TOOLTIP_TOKENS = {
  // Container
  bg: '#18181b',         // zinc-900
  fg: '#ffffff',
  radius: 6,
  // Sizes
  padding: {
    sm: { x: 8, y: 4 },
    md: { x: 12, y: 6 },
  },
  fontSize: {
    sm: 12,
    md: 13,
  },
  // Animation
  offset: 8,
  delay: 300,
} as const

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'
type TooltipSize = 'sm' | 'md'

// ============================================================================
// Context
// ============================================================================
type TooltipContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const TooltipContext = createContext<TooltipContextValue | null>(null)

function useTooltip() {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('Tooltip components must be used within a Tooltip')
  }
  return context
}

// ============================================================================
// Tooltip Provider (wraps app for shared delay)
// ============================================================================
type TooltipProviderProps = {
  /** Delay before showing tooltip (ms) */
  delayDuration?: number
  /** Skip delay when quickly moving between tooltips */
  skipDelayDuration?: number
  children: React.ReactNode
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ 
  delayDuration = TOOLTIP_TOKENS.delay,
  children 
}) => {
  return <>{children}</>
}

TooltipProvider.displayName = "TooltipProvider"

// ============================================================================
// Tooltip Root
// ============================================================================
export interface TooltipProps {
  /** Controlled open state */
  open?: boolean
  /** Default open state */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Delay before showing (ms) */
  delayDuration?: number
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration = TOOLTIP_TOKENS.delay,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (newOpen: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (newOpen) {
      timeoutRef.current = setTimeout(() => {
        if (!isControlled) {
          setInternalOpen(true)
        }
        onOpenChange?.(true)
      }, delayDuration)
    } else {
      if (!isControlled) {
        setInternalOpen(false)
      }
      onOpenChange?.(false)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  )
}

Tooltip.displayName = "Tooltip"

// ============================================================================
// Tooltip Trigger
// ============================================================================
export interface TooltipTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild }) => {
  const { setOpen, triggerRef } = useTooltip()

  const handleMouseEnter = () => setOpen(true)
  const handleMouseLeave = () => setOpen(false)
  const handleFocus = () => setOpen(true)
  const handleBlur = () => setOpen(false)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
    } as any)
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </span>
  )
}

TooltipTrigger.displayName = "TooltipTrigger"

// ============================================================================
// Tooltip Content
// ============================================================================
export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Side to show tooltip */
  side?: TooltipSide
  /** Alignment */
  align?: 'start' | 'center' | 'end'
  /** Size variant */
  size?: TooltipSize
  /** Show arrow */
  arrow?: boolean
}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ 
    side = 'top', 
    align = 'center',
    size = 'md',
    arrow = true,
    style, 
    children, 
    ...props 
  }, ref) => {
    const { open, triggerRef } = useTooltip()
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return

      const trigger = triggerRef.current.getBoundingClientRect()
      const content = contentRef.current.getBoundingClientRect()
      const offset = TOOLTIP_TOKENS.offset

      let top = 0
      let left = 0

      // Calculate position based on side
      switch (side) {
        case 'top':
          top = trigger.top - content.height - offset
          left = trigger.left + (trigger.width - content.width) / 2
          break
        case 'bottom':
          top = trigger.bottom + offset
          left = trigger.left + (trigger.width - content.width) / 2
          break
        case 'left':
          top = trigger.top + (trigger.height - content.height) / 2
          left = trigger.left - content.width - offset
          break
        case 'right':
          top = trigger.top + (trigger.height - content.height) / 2
          left = trigger.right + offset
          break
      }

      // Adjust for alignment
      if (side === 'top' || side === 'bottom') {
        if (align === 'start') {
          left = trigger.left
        } else if (align === 'end') {
          left = trigger.right - content.width
        }
      }

      // Add scroll offset
      top += window.scrollY
      left += window.scrollX

      setPosition({ top, left })
    }, [open, side, align, triggerRef])

    if (!open) return null

    const padding = TOOLTIP_TOKENS.padding[size]

    const contentStyle: React.CSSProperties = {
      position: 'absolute',
      top: position.top,
      left: position.left,
      zIndex: 50,
      padding: `${padding.y}px ${padding.x}px`,
      backgroundColor: TOOLTIP_TOKENS.bg,
      color: TOOLTIP_TOKENS.fg,
      fontSize: TOOLTIP_TOKENS.fontSize[size],
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 500,
      lineHeight: 1.4,
      borderRadius: TOOLTIP_TOKENS.radius,
      whiteSpace: 'nowrap',
      animation: 'tooltip-show 150ms ease-out',
      ...style,
    }

    return (
      <div ref={ref || contentRef} role="tooltip" style={contentStyle} {...props}>
        {children}
      </div>
    )
  }
)

TooltipContent.displayName = "TooltipContent"

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-tooltip-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes tooltip-show {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    `
    document.head.appendChild(style)
  }
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TOOLTIP_TOKENS,
}
