import * as React from "react"
import { forwardRef, createContext, useContext, useState, useId } from "react"

/**
 * Tabs Design Tokens from Figma
 */
const TABS_TOKENS = {
  // List container
  list: {
    gap: 0,
    borderBottom: '#e4e4e7', // zinc-200
    // Capsule container
    capsuleBg: '#f4f4f5',
    capsulePadding: 4,
    capsuleRadius: 10,
  },
  // Tab trigger
  trigger: {
    height: 44,
    paddingX: 16,
    fontSize: 14,
    fontWeight: 500,
    // Colors
    fg: '#71717a',           // zinc-500
    fgHover: '#18181b',      // zinc-900
    fgActive: '#18181b',     // Changed to dark for capsule style
    fgDisabled: '#d4d4d8',   // zinc-300
    // Indicator
    indicator: '#2050f6',    // spaceblue-600
    indicatorHeight: 2,
    // Capsule active bg
    capsuleActiveBg: '#ffffff',
    capsuleActiveRadius: 8,
    capsuleActiveShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  // Content
  content: {
    padding: 16,
  },
} as const

// ============================================================================
// Context
// ============================================================================
type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs')
  }
  return context
}

// ============================================================================
// Tabs Root
// ============================================================================
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled active tab */
  value?: string
  /** Default active tab (uncontrolled) */
  defaultValue?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
        <div ref={ref} style={style} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = "Tabs"

// ============================================================================
// Tabs List
// ============================================================================
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant style */
  variant?: 'default' | 'pills'
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant = 'default', style, children, ...props }, ref) => {
    const listStyle: React.CSSProperties = variant === 'default'
      ? {
          display: 'flex',
          gap: TABS_TOKENS.list.gap,
          borderBottom: `1px solid ${TABS_TOKENS.list.borderBottom}`,
          ...style,
        }
      : {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
          padding: TABS_TOKENS.list.capsulePadding,
          backgroundColor: TABS_TOKENS.list.capsuleBg,
          borderRadius: TABS_TOKENS.list.capsuleRadius,
          ...style,
        }

    return (
      <div ref={ref} role="tablist" style={listStyle} {...props}>
        {children}
      </div>
    )
  }
)

TabsList.displayName = "TabsList"

// ============================================================================
// Tabs Trigger
// ============================================================================
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value that identifies this tab */
  value: string
  /** Variant (inherits from list but can override) */
  variant?: 'default' | 'pills'
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value: tabValue, variant = 'default', disabled, style, children, ...props }, ref) => {
    const { value, onValueChange } = useTabs()
    const [isHovered, setIsHovered] = useState(false)
    const isActive = value === tabValue

    const getColor = () => {
      if (disabled) return TABS_TOKENS.trigger.fgDisabled
      if (isActive) return TABS_TOKENS.trigger.fgActive
      if (isHovered) return TABS_TOKENS.trigger.fgHover
      return TABS_TOKENS.trigger.fg
    }

    const defaultStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: TABS_TOKENS.trigger.height,
      padding: `0 ${TABS_TOKENS.trigger.paddingX}px`,
      fontSize: TABS_TOKENS.trigger.fontSize,
      fontWeight: TABS_TOKENS.trigger.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: getColor(),
      backgroundColor: 'transparent',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'color 150ms ease-in-out',
      whiteSpace: 'nowrap',
      ...style,
    }

    const pillStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      padding: '0 16px',
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: isActive ? TABS_TOKENS.trigger.fgActive : TABS_TOKENS.trigger.fg,
      backgroundColor: isActive ? TABS_TOKENS.trigger.capsuleActiveBg : 'transparent',
      border: 'none',
      borderRadius: TABS_TOKENS.trigger.capsuleActiveRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease-in-out',
      boxShadow: isActive ? TABS_TOKENS.trigger.capsuleActiveShadow : 'none',
      whiteSpace: 'nowrap',
      ...style,
    }

    const indicatorStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: TABS_TOKENS.trigger.indicatorHeight,
      backgroundColor: TABS_TOKENS.trigger.indicator,
      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform 200ms ease-in-out',
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        disabled={disabled}
        style={variant === 'pills' ? pillStyle : defaultStyle}
        onClick={() => !disabled && onValueChange(tabValue)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
        {variant === 'default' && <span style={indicatorStyle} />}
      </button>
    )
  }
)

TabsTrigger.displayName = "TabsTrigger"

// ============================================================================
// Tabs Content
// ============================================================================
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value that identifies this content */
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value: tabValue, style, children, ...props }, ref) => {
    const { value } = useTabs()
    const isActive = value === tabValue

    if (!isActive) return null

    const contentStyle: React.CSSProperties = {
      padding: TABS_TOKENS.content.padding,
      ...style,
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent, TABS_TOKENS }
