import * as React from "react"
import { forwardRef, createContext, useContext } from "react"
import type { LucideIcon } from "lucide-react"

/**
 * Bottom Navigation Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4441-16447
 */
const BOTTOM_NAV_TOKENS = {
  // Container - Apple style glassmorphism
  height: 83, // iOS standard with safe area
  paddingBottom: 19, // Safe area inset
  bg: 'rgba(255, 255, 255, 0.72)', // Semi-transparent
  bgBlur: 20, // Backdrop blur
  border: 'rgba(0, 0, 0, 0.08)',
  // Item
  item: {
    minWidth: 64,
    paddingY: 6,
    gap: 4,
    // Icon
    iconSize: 24,
    iconColor: '#8e8e93', // iOS gray
    iconColorActive: '#2050f6', // Brand color
    // Label
    fontSize: 10,
    fontWeight: 500,
    labelColor: '#8e8e93',
    labelColorActive: '#2050f6',
    // Badge
    badgeSize: 18,
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
}

const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  ({
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    fixed = true,
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)

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
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      height: BOTTOM_NAV_TOKENS.height,
      paddingBottom: BOTTOM_NAV_TOKENS.paddingBottom,
      backgroundColor: BOTTOM_NAV_TOKENS.bg,
      backdropFilter: `blur(${BOTTOM_NAV_TOKENS.bgBlur}px)`,
      WebkitBackdropFilter: `blur(${BOTTOM_NAV_TOKENS.bgBlur}px)`, // Safari
      borderTop: `0.5px solid ${BOTTOM_NAV_TOKENS.border}`,
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
      <BottomNavContext.Provider value={{ value, onValueChange: handleValueChange }}>
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
}

const BottomNavItem = forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({
    value: itemValue,
    icon: Icon,
    activeIcon: ActiveIcon,
    label,
    badge,
    style,
    ...props
  }, ref) => {
    const { value, onValueChange } = useBottomNav()
    const isActive = value === itemValue
    const IconComponent = isActive && ActiveIcon ? ActiveIcon : Icon

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      minWidth: BOTTOM_NAV_TOKENS.item.minWidth,
      paddingTop: BOTTOM_NAV_TOKENS.item.paddingY,
      gap: BOTTOM_NAV_TOKENS.item.gap,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 150ms ease',
      WebkitTapHighlightColor: 'transparent',
      ...style,
    }

    const iconWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    const iconStyle: React.CSSProperties = {
      color: isActive 
        ? BOTTOM_NAV_TOKENS.item.iconColorActive 
        : BOTTOM_NAV_TOKENS.item.iconColor,
      transition: 'color 150ms ease',
    }

    const labelStyle: React.CSSProperties = {
      fontSize: BOTTOM_NAV_TOKENS.item.fontSize,
      fontWeight: BOTTOM_NAV_TOKENS.item.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: isActive 
        ? BOTTOM_NAV_TOKENS.item.labelColorActive 
        : BOTTOM_NAV_TOKENS.item.labelColor,
      transition: 'color 150ms ease',
    }

    const badgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: -4,
      right: -8,
      minWidth: BOTTOM_NAV_TOKENS.item.badgeSize,
      height: BOTTOM_NAV_TOKENS.item.badgeSize,
      padding: '0 4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BOTTOM_NAV_TOKENS.item.badgeBg,
      color: BOTTOM_NAV_TOKENS.item.badgeColor,
      fontSize: 10,
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
        {...props}
      >
        <span style={iconWrapperStyle}>
          <IconComponent size={BOTTOM_NAV_TOKENS.item.iconSize} style={iconStyle} />
          {badge !== undefined && badge > 0 && (
            <span style={badgeStyle}>
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </span>
        <span style={labelStyle}>{label}</span>
      </button>
    )
  }
)

BottomNavItem.displayName = "BottomNavItem"

export { BottomNav, BottomNavItem, BOTTOM_NAV_TOKENS }
