import * as React from "react"
import { forwardRef, createContext, useContext, useState } from "react"
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Side Navigation Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=297-57580
 */
const SIDE_NAV_TOKENS = {
  // Container
  width: 256,
  widthCollapsed: 72,
  bg: '#ffffff',
  borderColor: '#e4e4e7',
  padding: 12,
  // Header
  header: {
    height: 56,
    gap: 12,
  },
  // Item
  item: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    fontWeight: 500,
    radius: 8,
    iconSize: 20,
    gap: 12,
    // States
    fg: '#3f3f46',
    fgActive: '#2050f6',
    fgHover: '#18181b',
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgActive: '#eef4ff',
  },
  // Group
  group: {
    labelSize: 12,
    labelWeight: 500,
    labelColor: '#71717a',
    paddingTop: 16,
    paddingBottom: 8,
    paddingX: 12,
  },
  // User profile
  user: {
    avatarSize: 36,
    avatarRadius: 8,
    nameSize: 14,
    nameWeight: 500,
    nameColor: '#18181b',
    emailSize: 12,
    emailColor: '#71717a',
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
  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void
  /** Active item value */
  activeItem?: string
  /** Default active item */
  defaultActiveItem?: string
  /** Callback when active item changes */
  onActiveItemChange?: (item: string) => void
}

const SideNav = forwardRef<HTMLElement, SideNavProps>(
  ({
    collapsed: controlledCollapsed,
    onCollapsedChange,
    activeItem: controlledActive,
    defaultActiveItem = '',
    onActiveItemChange,
    style,
    children,
    ...props
  }, ref) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false)
    const [internalActive, setInternalActive] = useState(defaultActiveItem)

    const isCollapsedControlled = controlledCollapsed !== undefined
    const collapsed = isCollapsedControlled ? controlledCollapsed : internalCollapsed

    const isActiveControlled = controlledActive !== undefined
    const activeItem = isActiveControlled ? controlledActive : internalActive

    const setActiveItem = (item: string) => {
      if (!isActiveControlled) {
        setInternalActive(item)
      }
      onActiveItemChange?.(item)
    }

    const navStyle: React.CSSProperties = {
      width: collapsed ? SIDE_NAV_TOKENS.widthCollapsed : SIDE_NAV_TOKENS.width,
      height: '100%',
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
// SideNav Header
// ============================================================================
export interface SideNavHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo element */
  logo?: React.ReactNode
  /** Title text */
  title?: string
  /** Subtitle text */
  subtitle?: string
  /** Show collapse button */
  showCollapseButton?: boolean
  /** Collapse callback */
  onCollapse?: () => void
}

const SideNavHeader = forwardRef<HTMLDivElement, SideNavHeaderProps>(
  ({ logo, title, subtitle, showCollapseButton = true, onCollapse, style, children, ...props }, ref) => {
    const { collapsed } = useSideNav()

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'space-between',
      height: SIDE_NAV_TOKENS.header.height,
      padding: `0 ${SIDE_NAV_TOKENS.item.paddingX}px`,
      marginBottom: 8,
      ...style,
    }

    const logoContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: SIDE_NAV_TOKENS.header.gap,
      overflow: 'hidden',
    }

    const titleContainerStyle: React.CSSProperties = {
      display: collapsed ? 'none' : 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }

    const titleStyle: React.CSSProperties = {
      fontSize: 14,
      fontWeight: 600,
      color: '#18181b',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }

    const subtitleStyle: React.CSSProperties = {
      fontSize: 12,
      color: '#71717a',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }

    const collapseButtonStyle: React.CSSProperties = {
      display: collapsed ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      color: '#71717a',
      flexShrink: 0,
    }

    return (
      <div ref={ref} style={headerStyle} {...props}>
        <div style={logoContainerStyle}>
          {logo}
          {(title || subtitle) && (
            <div style={titleContainerStyle}>
              {title && <span style={titleStyle}>{title}</span>}
              {subtitle && <span style={subtitleStyle}>{subtitle}</span>}
            </div>
          )}
        </div>
        {showCollapseButton && !collapsed && (
          <button type="button" style={collapseButtonStyle} onClick={onCollapse}>
            <PanelLeftClose size={18} />
          </button>
        )}
        {children}
      </div>
    )
  }
)

SideNavHeader.displayName = "SideNavHeader"

// ============================================================================
// SideNav Content
// ============================================================================
const SideNavContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SideNavContent.displayName = "SideNavContent"

// ============================================================================
// SideNav Group
// ============================================================================
export interface SideNavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string
}

const SideNavGroup = forwardRef<HTMLDivElement, SideNavGroupProps>(
  ({ label, style, children, ...props }, ref) => {
    const { collapsed } = useSideNav()

    const groupStyle: React.CSSProperties = {
      paddingTop: SIDE_NAV_TOKENS.group.paddingTop,
      ...style,
    }

    const labelStyle: React.CSSProperties = {
      display: collapsed ? 'none' : 'block',
      padding: `${SIDE_NAV_TOKENS.group.paddingBottom}px ${SIDE_NAV_TOKENS.group.paddingX}px`,
      fontSize: SIDE_NAV_TOKENS.group.labelSize,
      fontWeight: SIDE_NAV_TOKENS.group.labelWeight,
      color: SIDE_NAV_TOKENS.group.labelColor,
    }

    return (
      <div ref={ref} style={groupStyle} {...props}>
        {label && <div style={labelStyle}>{label}</div>}
        {children}
      </div>
    )
  }
)

SideNavGroup.displayName = "SideNavGroup"

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
  /** Has submenu */
  hasSubmenu?: boolean
  /** Badge count */
  badge?: number
  /** Disabled */
  disabled?: boolean
  /** As link */
  href?: string
}

const SideNavItem = forwardRef<HTMLButtonElement, SideNavItemProps>(
  ({ value, icon: Icon, label, hasSubmenu, badge, disabled = false, href, style, onClick, ...props }, ref) => {
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
      gap: SIDE_NAV_TOKENS.item.gap,
      width: '100%',
      height: SIDE_NAV_TOKENS.item.height,
      padding: collapsed ? '0' : `0 ${SIDE_NAV_TOKENS.item.paddingX}px`,
      fontSize: SIDE_NAV_TOKENS.item.fontSize,
      fontWeight: SIDE_NAV_TOKENS.item.fontWeight,
      fontFamily: 'inherit',
      color: isActive ? SIDE_NAV_TOKENS.item.fgActive : isHovered ? SIDE_NAV_TOKENS.item.fgHover : SIDE_NAV_TOKENS.item.fg,
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
      transition: 'all 150ms ease',
      ...style,
    }

    // Circle icon style (matching Figma)
    const iconWrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: SIDE_NAV_TOKENS.item.iconSize,
      height: SIDE_NAV_TOKENS.item.iconSize,
      borderRadius: '50%',
      border: isActive ? 'none' : `1.5px solid ${isActive ? SIDE_NAV_TOKENS.item.fgActive : SIDE_NAV_TOKENS.item.fg}`,
      backgroundColor: isActive ? SIDE_NAV_TOKENS.item.fgActive : 'transparent',
      color: isActive ? '#ffffff' : 'inherit',
      flexShrink: 0,
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
        {Icon ? (
          <Icon size={16} style={{ flexShrink: 0 }} />
        ) : (
          <span style={iconWrapperStyle}>
            {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ffffff' }} />}
          </span>
        )}
        {!collapsed && (
          <>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {label}
            </span>
            {badge !== undefined && badge > 0 && (
              <span style={badgeStyle}>{badge > 99 ? '99+' : badge}</span>
            )}
            {hasSubmenu && <ChevronRight size={16} style={{ color: '#a1a1aa', flexShrink: 0 }} />}
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
// SideNav Footer
// ============================================================================
const SideNavFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: `1px solid ${SIDE_NAV_TOKENS.borderColor}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SideNavFooter.displayName = "SideNavFooter"

// ============================================================================
// SideNav User Profile
// ============================================================================
export interface SideNavUserProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar URL or initials */
  avatar?: string
  /** User name */
  name: string
  /** User email or subtitle */
  email?: string
  /** Show expand indicator */
  showExpand?: boolean
}

const SideNavUser = forwardRef<HTMLDivElement, SideNavUserProps>(
  ({ avatar, name, email, showExpand = false, style, onClick, ...props }, ref) => {
    const { collapsed } = useSideNav()
    const [isHovered, setIsHovered] = useState(false)

    // Get initials from name
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      gap: 12,
      padding: collapsed ? '8px 0' : '8px 12px',
      borderRadius: 8,
      cursor: onClick ? 'pointer' : 'default',
      backgroundColor: isHovered && onClick ? '#f4f4f5' : 'transparent',
      transition: 'background-color 150ms ease',
      ...style,
    }

    const avatarStyle: React.CSSProperties = {
      width: SIDE_NAV_TOKENS.user.avatarSize,
      height: SIDE_NAV_TOKENS.user.avatarSize,
      borderRadius: SIDE_NAV_TOKENS.user.avatarRadius,
      backgroundColor: '#2050f6',
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
    }

    const infoStyle: React.CSSProperties = {
      display: collapsed ? 'none' : 'flex',
      flexDirection: 'column',
      flex: 1,
      overflow: 'hidden',
    }

    return (
      <div
        ref={ref}
        style={containerStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div style={avatarStyle}>
          {avatar ? (
            <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            initials
          )}
        </div>
        <div style={infoStyle}>
          <span style={{
            fontSize: SIDE_NAV_TOKENS.user.nameSize,
            fontWeight: SIDE_NAV_TOKENS.user.nameWeight,
            color: SIDE_NAV_TOKENS.user.nameColor,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {name}
          </span>
          {email && (
            <span style={{
              fontSize: SIDE_NAV_TOKENS.user.emailSize,
              color: SIDE_NAV_TOKENS.user.emailColor,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {email}
            </span>
          )}
        </div>
        {!collapsed && showExpand && (
          <ChevronDown size={16} style={{ color: '#a1a1aa', flexShrink: 0 }} />
        )}
      </div>
    )
  }
)

SideNavUser.displayName = "SideNavUser"

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

export { 
  SideNav, 
  SideNavHeader,
  SideNavContent,
  SideNavGroup,
  SideNavItem, 
  SideNavFooter,
  SideNavUser,
  SideNavDivider, 
  SIDE_NAV_TOKENS 
}
