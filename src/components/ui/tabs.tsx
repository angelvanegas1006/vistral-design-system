import * as React from "react"
import { forwardRef, createContext, useContext, useState, useId, useRef, useEffect } from "react"
import type { LucideIcon } from "lucide-react"

/**
 * Tab Bar Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2765-28927
 */
const TABS_TOKENS = {
  // Level 1: Main Tabs (transparent background, bottom indicator)
  level1: {
    list: {
      gap: 0,
      borderBottom: '#e4e4e7',
      bg: 'transparent',
    },
    trigger: {
      height: 44,
      paddingX: 16,
      fontSize: 14,
      fontWeight: 500,
      fg: '#71717a',
      fgHover: '#18181b',
      fgActive: '#18181b',
      fgDisabled: '#d4d4d8',
      indicator: '#2050f6',
      indicatorHeight: 2,
    },
  },
  // Level 2: Segmented Controls (solid background, capsule active)
  level2: {
    list: {
      gap: 0,
      bg: '#f4f4f5',
      padding: 4,
      radius: 9999,
    },
    trigger: {
      height: 36,
      paddingX: 16,
      fontSize: 14,
      fontWeight: 500,
      fg: '#71717a',
      fgHover: '#18181b',
      fgActive: '#18181b',
      fgDisabled: '#d4d4d8',
      activeBg: '#ffffff',
      activeRadius: 9999,
      activeShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    },
  },
  // Notification badge
  badge: {
    size: 6,
    bg: '#dc2626',
    radius: '50%',
  },
  // Tag
  tag: {
    fontSize: 10,
    fontWeight: 600,
    paddingX: 6,
    paddingY: 2,
    radius: 4,
    bg: '#eef4ff',
    fg: '#2050f6',
  },
} as const

// ============================================================================
// Context
// ============================================================================
type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
  level: 1 | 2
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
  /** Level: 1 (Main Tabs) or 2 (Segmented Controls) */
  level?: 1 | 2
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    level = 1,
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
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, level }}>
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
  /** Variant style (deprecated, use level prop on Tabs instead) */
  variant?: 'default' | 'pills'
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant, style, children, ...props }, ref) => {
    const { level } = useTabs()
    const effectiveLevel = variant === 'pills' ? 2 : level
    
    const tokens = effectiveLevel === 1 ? TABS_TOKENS.level1 : TABS_TOKENS.level2

    const listStyle: React.CSSProperties = effectiveLevel === 1
      ? {
          display: 'flex',
          gap: tokens.list.gap,
          borderBottom: `1px solid ${tokens.list.borderBottom}`,
          backgroundColor: tokens.list.bg,
          ...style,
        }
      : {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
          padding: tokens.list.padding,
          backgroundColor: tokens.list.bg,
          borderRadius: tokens.list.radius,
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
  /** Icon (optional) */
  icon?: LucideIcon
  /** Show notification badge */
  badge?: boolean | number
  /** Tag text (e.g., "New", "Pro") */
  tag?: string
  /** Variant (deprecated, use level prop on Tabs instead) */
  variant?: 'default' | 'pills'
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value: tabValue, icon: Icon, badge, tag, variant, disabled, style, children, ...props }, ref) => {
    const { value, onValueChange, level } = useTabs()
    const [isHovered, setIsHovered] = useState(false)
    const isActive = value === tabValue
    const effectiveLevel = variant === 'pills' ? 2 : level
    const tokens = effectiveLevel === 1 ? TABS_TOKENS.level1 : TABS_TOKENS.level2

    const getColor = () => {
      if (disabled) return tokens.trigger.fgDisabled
      if (isActive) return tokens.trigger.fgActive
      if (isHovered) return tokens.trigger.fgHover
      return tokens.trigger.fg
    }

    const triggerId = useId()
    const panelId = `tabpanel-${tabValue}`

    const defaultStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: tokens.trigger.height,
      padding: `0 ${tokens.trigger.paddingX}px`,
      fontSize: tokens.trigger.fontSize,
      fontWeight: tokens.trigger.fontWeight,
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
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: tokens.trigger.height,
      padding: `0 ${tokens.trigger.paddingX}px`,
      fontSize: tokens.trigger.fontSize,
      fontWeight: tokens.trigger.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: getColor(),
      backgroundColor: isActive ? tokens.trigger.activeBg : 'transparent',
      border: 'none',
      borderRadius: tokens.trigger.activeRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease-in-out',
      boxShadow: isActive ? tokens.trigger.activeShadow : 'none',
      whiteSpace: 'nowrap',
      ...style,
    }

    const indicatorStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: tokens.trigger.indicatorHeight,
      backgroundColor: tokens.trigger.indicator,
      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform 200ms ease-in-out',
    }

    const badgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: 4,
      right: 4,
      width: typeof badge === 'number' ? 'auto' : TABS_TOKENS.badge.size,
      height: TABS_TOKENS.badge.size,
      minWidth: typeof badge === 'number' ? 16 : TABS_TOKENS.badge.size,
      padding: typeof badge === 'number' ? '0 4px' : 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: TABS_TOKENS.badge.bg,
      borderRadius: TABS_TOKENS.badge.radius,
      fontSize: typeof badge === 'number' ? 10 : 0,
      fontWeight: 600,
      color: '#ffffff',
      fontFamily: 'inherit',
    }

    const tagStyle: React.CSSProperties = {
      fontSize: TABS_TOKENS.tag.fontSize,
      fontWeight: TABS_TOKENS.tag.fontWeight,
      padding: `${TABS_TOKENS.tag.paddingY}px ${TABS_TOKENS.tag.paddingX}px`,
      backgroundColor: TABS_TOKENS.tag.bg,
      color: TABS_TOKENS.tag.fg,
      borderRadius: TABS_TOKENS.tag.radius,
      fontFamily: 'inherit',
      lineHeight: 1,
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isActive}
        aria-controls={panelId}
        aria-disabled={disabled}
        disabled={disabled}
        style={effectiveLevel === 1 ? defaultStyle : pillStyle}
        onClick={() => !disabled && onValueChange(tabValue)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!disabled) {
              onValueChange(tabValue)
            }
          }
        }}
        {...props}
      >
        {Icon && <Icon size={16} />}
        <span>{children}</span>
        {tag && <span style={tagStyle}>{tag}</span>}
        {badge && (
          <span style={badgeStyle}>
            {typeof badge === 'number' ? badge : ''}
          </span>
        )}
        {effectiveLevel === 1 && <span style={indicatorStyle} />}
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
    const panelId = `tabpanel-${tabValue}`

    if (!isActive) return null

    const contentStyle: React.CSSProperties = {
      padding: 16,
      ...style,
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
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
