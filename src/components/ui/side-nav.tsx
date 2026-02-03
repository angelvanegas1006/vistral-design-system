import * as React from "react"
import { forwardRef, createContext, useContext, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Side Navigation Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1955-2023
 */
const SIDE_NAV_TOKENS = {
  // Container
  width: 240,
  widthCollapsed: 64,
  bg: '#ffffff',
  borderColor: '#e4e4e7',
  padding: 8,
  // Item
  item: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    fontWeight: 500,
    radius: 8,
    // States
    fg: '#3f3f46',
    fgActive: '#2050f6',
    fgMuted: '#71717a',
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgActive: '#eef4ff',
  },
  // Group
  group: {
    labelSize: 11,
    labelWeight: 600,
    labelColor: '#a1a1aa',
    paddingTop: 16,
    paddingBottom: 4,
  },
} as const

// ============================================================================
// Context
// ============================================================================
type SideNavContextValue = {
  collapsed: boolean
  activeItem: string
  setActiveItem: (item: string) => void
}

const SideNavContext = createContext<SideNavContextValue | null>(null)

function useSideNav() {
  const context = useContext(SideNavContext)
  if (!context) {
    throw new Error('SideNav components must be used within a SideNav')
  }
  return context
}

// ============================================================================
// SideNav Root
// ============================================================================
export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Collapsed state */
  collapsed?: boolean
  /** Active item value */
  activeItem?: string
  /** Default active item */
  defaultActiveItem?: string
  /** Callback when active item changes */
  onActiveItemChange?: (item: string) => void
}

const SideNav = forwardRef<HTMLElement, SideNavProps>(
  ({
    collapsed = false,
    activeItem: controlledActive,
    defaultActiveItem = '',
    onActiveItemChange,
    style,
    children,
    ...props
  }, ref) => {
    const [internalActive, setInternalActive] = useState(defaultActiveItem)

    const isControlled = controlledActive !== undefined
    const activeItem = isControlled ? controlledActive : internalActive

    const setActiveItem = (item: string) => {
      if (!isControlled) {
        setInternalActive(item)
      }
      onActiveItemChange?.(item)
    }

    const navStyle: React.CSSProperties = {
      width: collapsed ? SIDE_NAV_TOKENS.widthCollapsed : SIDE_NAV_TOKENS.width,
      backgroundColor: SIDE_NAV_TOKENS.bg,
      borderRight: `1px solid ${SIDE_NAV_TOKENS.borderColor}`,
      padding: SIDE_NAV_TOKENS.padding,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      transition: 'width 200ms ease',
      overflow: 'hidden',
      ...style,
    }

    return (
      <SideNavContext.Provider value={{ collapsed, activeItem, setActiveItem }}>
        <nav ref={ref} style={navStyle} {...props}>
          {children}
        </nav>
      </SideNavContext.Provider>
    )
  }
)

SideNav.displayName = "SideNav"

// ============================================================================
// SideNav Item
// ============================================================================
export interface SideNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Unique value */
  value: string
  /** Icon */
  icon?: LucideIcon
  /** Label */
  label: string
  /** Badge count */
  badge?: number
  /** Disabled */
  disabled?: boolean
  /** As link */
  href?: string
}

const SideNavItem = forwardRef<HTMLButtonElement, SideNavItemProps>(
  ({ value, icon: Icon, label, badge, disabled = false, href, style, onClick, ...props }, ref) => {
    const { collapsed, activeItem, setActiveItem } = useSideNav()
    const [isHovered, setIsHovered] = useState(false)
    
    const isActive = activeItem === value

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      setActiveItem(value)
      onClick?.(e)
    }

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      gap: 12,
      width: '100%',
      height: SIDE_NAV_TOKENS.item.height,
      padding: `0 ${SIDE_NAV_TOKENS.item.paddingX}px`,
      fontSize: SIDE_NAV_TOKENS.item.fontSize,
      fontWeight: SIDE_NAV_TOKENS.item.fontWeight,
      fontFamily: 'inherit',
      color: isActive ? SIDE_NAV_TOKENS.item.fgActive : SIDE_NAV_TOKENS.item.fg,
      backgroundColor: isActive 
        ? SIDE_NAV_TOKENS.item.bgActive 
        : isHovered && !disabled 
          ? SIDE_NAV_TOKENS.item.bgHover 
          : SIDE_NAV_TOKENS.item.bg,
      border: 'none',
      borderRadius: SIDE_NAV_TOKENS.item.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      textDecoration: 'none',
      textAlign: 'left',
      transition: 'background-color 150ms ease, color 150ms ease',
      ...style,
    }

    const badgeStyle: React.CSSProperties = {
      marginLeft: 'auto',
      padding: '2px 6px',
      fontSize: 11,
      fontWeight: 600,
      color: '#ffffff',
      backgroundColor: '#2050f6',
      borderRadius: 10,
    }

    const content = (
      <>
        {Icon && <Icon size={20} style={{ flexShrink: 0 }} />}
        {!collapsed && (
          <>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {label}
            </span>
            {badge !== undefined && badge > 0 && (
              <span style={badgeStyle}>{badge > 99 ? '99+' : badge}</span>
            )}
          </>
        )}
      </>
    )

    if (href && !disabled) {
      return (
        <a
          href={href}
          style={itemStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        style={itemStyle}
        onClick={handleClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {content}
      </button>
    )
  }
)

SideNavItem.displayName = "SideNavItem"

// ============================================================================
// SideNav Group
// ============================================================================
export interface SideNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string
  /** Collapsible */
  collapsible?: boolean
  /** Default open state */
  defaultOpen?: boolean
}

const SideNavGroup = forwardRef<HTMLDivElement, SideNavGroupProps>(
  ({ label, collapsible = false, defaultOpen = true, style, children, ...props }, ref) => {
    const { collapsed } = useSideNav()
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const groupStyle: React.CSSProperties = {
      paddingTop: SIDE_NAV_TOKENS.group.paddingTop,
      ...style,
    }

    const labelStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${SIDE_NAV_TOKENS.group.paddingBottom}px ${SIDE_NAV_TOKENS.item.paddingX}px`,
      fontSize: SIDE_NAV_TOKENS.group.labelSize,
      fontWeight: SIDE_NAV_TOKENS.group.labelWeight,
      color: SIDE_NAV_TOKENS.group.labelColor,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: collapsible ? 'pointer' : 'default',
    }

    if (collapsed) {
      return (
        <div ref={ref} style={groupStyle} {...props}>
          <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e4e4e7' }} />
          {children}
        </div>
      )
    }

    return (
      <div ref={ref} style={groupStyle} {...props}>
        {label && (
          <div 
            style={labelStyle} 
            onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
          >
            <span>{label}</span>
            {collapsible && (
              isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            )}
          </div>
        )}
        {(!collapsible || isOpen) && children}
      </div>
    )
  }
)

SideNavGroup.displayName = "SideNavGroup"

// ============================================================================
// SideNav Divider
// ============================================================================
const SideNavDivider = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ style, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        style={{
          margin: '8px 0',
          border: 'none',
          borderTop: `1px solid ${SIDE_NAV_TOKENS.borderColor}`,
          ...style,
        }}
        {...props}
      />
    )
  }
)

SideNavDivider.displayName = "SideNavDivider"

export { SideNav, SideNavItem, SideNavGroup, SideNavDivider, SIDE_NAV_TOKENS }
