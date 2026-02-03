import * as React from "react"
import { forwardRef, createContext, useContext, useState, useId } from "react"
import { ChevronDown } from "lucide-react"

/**
 * Accordion Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=624-2306
 */
const ACCORDION_TOKENS = {
  // Container
  border: '#e4e4e7',        // zinc-200
  radius: 8,
  // Item
  padding: {
    x: 16,
    y: 16,
  },
  // Header
  header: {
    bg: 'transparent',
    bgHover: '#fafafa',     // zinc-50
    fg: '#18181b',          // zinc-900
  },
  // Content
  content: {
    fg: '#52525b',          // zinc-600
  },
} as const

// ============================================================================
// Context
// ============================================================================
type AccordionContextValue = {
  expandedItems: string[]
  toggleItem: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

type AccordionItemContextValue = {
  value: string
  isExpanded: boolean
  triggerId: string
  contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionItem() {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem')
  }
  return context
}

// ============================================================================
// Accordion Container
// ============================================================================
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Allow single or multiple items open */
  type?: 'single' | 'multiple'
  /** Default expanded items */
  defaultValue?: string[]
  /** Controlled expanded items */
  value?: string[]
  /** Callback when expanded items change */
  onValueChange?: (value: string[]) => void
  /** Collapsible (single type only) */
  collapsible?: boolean
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    type = 'single',
    defaultValue = [],
    value,
    onValueChange,
    collapsible = true,
    style, 
    children, 
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
    const expandedItems = value ?? internalValue

    const toggleItem = (itemValue: string) => {
      let newValue: string[]
      
      if (type === 'single') {
        if (expandedItems.includes(itemValue)) {
          newValue = collapsible ? [] : expandedItems
        } else {
          newValue = [itemValue]
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          newValue = expandedItems.filter(v => v !== itemValue)
        } else {
          newValue = [...expandedItems, itemValue]
        }
      }

      if (!value) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const containerStyle: React.CSSProperties = {
      border: `1px solid ${ACCORDION_TOKENS.border}`,
      borderRadius: ACCORDION_TOKENS.radius,
      overflow: 'hidden',
      ...style,
    }

    return (
      <AccordionContext.Provider value={{ expandedItems, toggleItem, type }}>
        <div ref={ref} style={containerStyle} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = "Accordion"

// ============================================================================
// Accordion Item
// ============================================================================
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item */
  value: string
  /** Disabled state */
  disabled?: boolean
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, style, children, ...props }, ref) => {
    const { expandedItems } = useAccordion()
    const isExpanded = expandedItems.includes(value)
    const triggerId = useId()
    const contentId = useId()

    const itemStyle: React.CSSProperties = {
      borderBottom: `1px solid ${ACCORDION_TOKENS.border}`,
      ...style,
    }

    // Remove border from last item
    const lastChildStyle = `
      [data-accordion-item]:last-child {
        border-bottom: none;
      }
    `

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded, triggerId, contentId }}>
        <div 
          ref={ref} 
          data-accordion-item
          data-state={isExpanded ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          style={itemStyle} 
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)

AccordionItem.displayName = "AccordionItem"

// ============================================================================
// Accordion Trigger (Header)
// ============================================================================
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Show chevron icon */
  showIcon?: boolean
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ showIcon = true, style, children, ...props }, ref) => {
    const { toggleItem } = useAccordion()
    const { value, isExpanded, triggerId, contentId } = useAccordionItem()
    const [isHovered, setIsHovered] = useState(false)

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: `${ACCORDION_TOKENS.padding.y}px ${ACCORDION_TOKENS.padding.x}px`,
      backgroundColor: isHovered ? ACCORDION_TOKENS.header.bgHover : ACCORDION_TOKENS.header.bg,
      color: ACCORDION_TOKENS.header.fg,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 150ms ease-in-out',
      ...style,
    }

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      marginLeft: 12,
      transition: 'transform 200ms ease-in-out',
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    }

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        style={triggerStyle}
        onClick={() => toggleItem(value)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span style={{ flex: 1 }}>{children}</span>
        {showIcon && <ChevronDown size={16} style={iconStyle} />}
      </button>
    )
  }
)

AccordionTrigger.displayName = "AccordionTrigger"

// ============================================================================
// Accordion Content
// ============================================================================
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ style, children, ...props }, ref) => {
    const { isExpanded, triggerId, contentId } = useAccordionItem()

    const wrapperStyle: React.CSSProperties = {
      overflow: 'hidden',
      transition: 'max-height 200ms ease-in-out',
      maxHeight: isExpanded ? 500 : 0,
    }

    const contentStyle: React.CSSProperties = {
      padding: `0 ${ACCORDION_TOKENS.padding.x}px ${ACCORDION_TOKENS.padding.y}px`,
      fontSize: 14,
      lineHeight: 1.6,
      color: ACCORDION_TOKENS.content.fg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <div style={wrapperStyle}>
        <div
          ref={ref}
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          hidden={!isExpanded}
          style={contentStyle}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)

AccordionContent.displayName = "AccordionContent"

export { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent,
  ACCORDION_TOKENS,
}
