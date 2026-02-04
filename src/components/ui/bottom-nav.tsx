import * as React from "react"
import { forwardRef, createContext, useContext, useState } from "react"
import type { LucideIcon } from "lucide-react"

/**
 * Bottom Navigation Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4381-7423
 */
const BOTTOM_NAV_TOKENS = {
  // Container
  height: 64,
  bg: '#ffffff',
  border: '#e4e4e7',
  // Item
  item: {
    minWidth: 64,
    paddingY: 8,
    gap: 4,
    // Icon
    iconSize: 24,
    iconContainerSize: 32,
    // Colors
    fg: '#71717a', // Gray for inactive
    fgActive: '#2050f6', // Blue for active
    // Active pill
    activePillBg: '#f4f4f5', // Light gray pill
    activePillRadius: 16,
    activePillPaddingX: 20,
    activePillPaddingY: 4,
    // Label
    fontSize: 12,
    fontWeight: 500,
    // Badge
    badgeSize: 16,
    badgeBg: '#ef4444',
    badgeColor: '#ffffff',
  },
} as const

// ============================================================================
// Context
// ============================================================================
type BottomNavContextValue = {
  value: string
  onValueChange: (value: string) => void
  showLabels: boolean
}

const BottomNavContext = createContext<BottomNavContextValue | null>(null)

function useBottomNav() {
  const context = useContext(BottomNavContext)
  if (!context) {
    throw new Error('BottomNav components must be used within a BottomNav')
  }
  return context
}

// ============================================================================
// BottomNav Container
// ============================================================================
export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Controlled active value */
  value?: string
  /** Default active value */
  defaultValue?: string
  /** Callback when active changes */
  onValueChange?: (value: string) => void
  /** Fixed position at bottom */
  fixed?: boolean
  /** Show labels (default true) */
  showLabels?: boolean
}

const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  ({
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    fixed = true,
    showLabels = true,
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

    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: BOTTOM_NAV_TOKENS.height,
      padding: '8px 16px',
      backgroundColor: BOTTOM_NAV_TOKENS.bg,
      borderTop: `1px solid ${BOTTOM_NAV_TOKENS.border}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...(fixed && {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
      }),
      ...style,
    }

    return (
      <BottomNavContext.Provider value={{ value, onValueChange: handleValueChange, showLabels }}>
        <nav ref={ref} role="navigation" style={navStyle} {...props}>
          {children}
        </nav>
      </BottomNavContext.Provider>
    )
  }
)

BottomNav.displayName = "BottomNav"

// ============================================================================
// BottomNav Item
// ============================================================================
export interface BottomNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique value */
  value: string
  /** Icon component */
  icon: LucideIcon
  /** Active icon (optional, different icon when active) */
  activeIcon?: LucideIcon
  /** Label text */
  label: string
  /** Badge count */
  badge?: number
  /** Hide label for this item */
  hideLabel?: boolean
}

const BottomNavItem = forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({
    value: itemValue,
    icon: Icon,
    activeIcon: ActiveIcon,
    label,
    badge,
    hideLabel,
    style,
    ...props
  }, ref) => {
    const { value, onValueChange, showLabels } = useBottomNav()
    const [isHovered, setIsHovered] = useState(false)
    const isActive = value === itemValue
    const IconComponent = isActive && ActiveIcon ? ActiveIcon : Icon
    const shouldShowLabel = hideLabel === undefined ? showLabels : !hideLabel

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: BOTTOM_NAV_TOKENS.item.minWidth,
      padding: `${BOTTOM_NAV_TOKENS.item.paddingY}px 12px`,
      gap: BOTTOM_NAV_TOKENS.item.gap,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      WebkitTapHighlightColor: 'transparent',
      ...style,
    }

    // Pill background for active item
    const pillStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: BOTTOM_NAV_TOKENS.item.gap,
      padding: `${BOTTOM_NAV_TOKENS.item.activePillPaddingY}px ${BOTTOM_NAV_TOKENS.item.activePillPaddingX}px`,
      borderRadius: BOTTOM_NAV_TOKENS.item.activePillRadius,
      backgroundColor: isActive ? BOTTOM_NAV_TOKENS.item.activePillBg : isHovered ? 'rgba(0,0,0,0.04)' : 'transparent',
      transition: 'background-color 200ms ease',
    }

    // Circle icon container
    const iconContainerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: BOTTOM_NAV_TOKENS.item.iconContainerSize,
      height: BOTTOM_NAV_TOKENS.item.iconContainerSize,
      borderRadius: '50%',
      border: isActive ? 'none' : `1.5px solid ${BOTTOM_NAV_TOKENS.item.fg}`,
      backgroundColor: isActive ? BOTTOM_NAV_TOKENS.item.fgActive : 'transparent',
      color: isActive ? '#ffffff' : BOTTOM_NAV_TOKENS.item.fg,
      transition: 'all 150ms ease',
    }

    const labelStyle: React.CSSProperties = {
      fontSize: BOTTOM_NAV_TOKENS.item.fontSize,
      fontWeight: BOTTOM_NAV_TOKENS.item.fontWeight,
      color: isActive ? BOTTOM_NAV_TOKENS.item.fgActive : BOTTOM_NAV_TOKENS.item.fg,
      transition: 'color 150ms ease',
      lineHeight: 1,
    }

    const badgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: BOTTOM_NAV_TOKENS.item.badgeSize,
      height: BOTTOM_NAV_TOKENS.item.badgeSize,
      padding: '0 4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BOTTOM_NAV_TOKENS.item.badgeBg,
      color: BOTTOM_NAV_TOKENS.item.badgeColor,
      fontSize: 9,
      fontWeight: 600,
      borderRadius: 9999,
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        style={itemStyle}
        onClick={() => onValueChange(itemValue)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div style={pillStyle}>
          <span style={iconContainerStyle}>
            <IconComponent size={16} />
            {badge !== undefined && badge > 0 && (
              <span style={badgeStyle}>
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </span>
          {shouldShowLabel && <span style={labelStyle}>{label}</span>}
        </div>
      </button>
    )
  }
)

BottomNavItem.displayName = "BottomNavItem"

// ============================================================================
// BottomNav Search Item (Special variant from Figma)
// ============================================================================
export interface BottomNavSearchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon component (default: Search) */
  icon?: LucideIcon
  /** Click handler */
  onPress?: () => void
}

const BottomNavSearch = forwardRef<HTMLButtonElement, BottomNavSearchProps>(
  ({ icon: Icon, onPress, style, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isPressed, setIsPressed] = useState(false)

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 48,
      height: 48,
      borderRadius: '50%',
      backgroundColor: isPressed ? '#e4e4e7' : isHovered ? '#f4f4f5' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#71717a',
      transition: 'all 150ms ease',
      WebkitTapHighlightColor: 'transparent',
      ...style,
    }

    // Default search icon
    const SearchIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )

    return (
      <button
        ref={ref}
        type="button"
        style={buttonStyle}
        onClick={onPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        {...props}
      >
        {Icon ? <Icon size={24} /> : <SearchIcon />}
      </button>
    )
  }
)

BottomNavSearch.displayName = "BottomNavSearch"

export { BottomNav, BottomNavItem, BottomNavSearch, BOTTOM_NAV_TOKENS }
