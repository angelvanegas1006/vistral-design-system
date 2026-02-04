import * as React from "react"
import { forwardRef } from "react"
import { ChevronLeft, Menu, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Navbar Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1117-1668
 */
const NAVBAR_TOKENS = {
  height: 56,
  heightMobile: 48,
  paddingX: 16,
  bg: '#ffffff',
  border: '#e4e4e7',
  // Title
  title: {
    fontSize: 17,
    fontWeight: 600,
    color: '#18181b',
  },
  // Back button
  back: {
    fontSize: 14,
    fontWeight: 500,
    color: '#2050f6',
  },
  // Actions
  action: {
    size: 40,
    iconSize: 20,
    color: '#3f3f46',
    colorHover: '#18181b',
  },
  // Tools area
  tools: {
    gap: 8,
  },
} as const

// ============================================================================
// Navbar Container
// ============================================================================
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Fixed position at top */
  fixed?: boolean
  /** Show bottom border */
  bordered?: boolean
  /** Transparent background */
  transparent?: boolean
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ fixed = false, bordered = true, transparent = false, style, children, ...props }, ref) => {
    const navStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: NAVBAR_TOKENS.height,
      padding: `0 ${NAVBAR_TOKENS.paddingX}px`,
      backgroundColor: transparent ? 'transparent' : NAVBAR_TOKENS.bg,
      borderBottom: bordered ? `1px solid ${NAVBAR_TOKENS.border}` : 'none',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...(fixed && {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
      }),
      ...style,
    }

    return (
      <nav ref={ref} style={navStyle} {...props}>
        {children}
      </nav>
    )
  }
)

Navbar.displayName = "Navbar"

// ============================================================================
// Navbar Brand/Logo
// ============================================================================
export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo element or text */
  logo?: React.ReactNode
  /** Brand name */
  name?: string
  /** Link href */
  href?: string
}

const NavbarBrand = forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ logo, name, href, style, children, ...props }, ref) => {
    const brandStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      textDecoration: 'none',
      color: 'inherit',
      ...style,
    }

    const nameStyle: React.CSSProperties = {
      fontSize: NAVBAR_TOKENS.title.fontSize,
      fontWeight: NAVBAR_TOKENS.title.fontWeight,
      color: NAVBAR_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const content = (
      <>
        {logo}
        {name && <span style={nameStyle}>{name}</span>}
        {children}
      </>
    )

    if (href) {
      return (
        <a ref={ref as any} href={href} style={brandStyle} {...props}>
          {content}
        </a>
      )
    }

    return (
      <div ref={ref} style={brandStyle} {...props}>
        {content}
      </div>
    )
  }
)

NavbarBrand.displayName = "NavbarBrand"

// ============================================================================
// Navbar Title (centered)
// ============================================================================
export interface NavbarTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const NavbarTitle = forwardRef<HTMLHeadingElement, NavbarTitleProps>(
  ({ style, children, ...props }, ref) => {
    const titleStyle: React.CSSProperties = {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      margin: 0,
      fontSize: NAVBAR_TOKENS.title.fontSize,
      fontWeight: NAVBAR_TOKENS.title.fontWeight,
      color: NAVBAR_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      whiteSpace: 'nowrap',
      ...style,
    }

    return (
      <h1 ref={ref} style={titleStyle} {...props}>
        {children}
      </h1>
    )
  }
)

NavbarTitle.displayName = "NavbarTitle"

// ============================================================================
// Navbar Actions (left or right)
// ============================================================================
export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment */
  align?: 'left' | 'right'
}

const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ align = 'right', style, children, ...props }, ref) => {
    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      ...(align === 'left' && { marginRight: 'auto' }),
      ...(align === 'right' && { marginLeft: 'auto' }),
      ...style,
    }

    return (
      <div ref={ref} style={actionsStyle} {...props}>
        {children}
      </div>
    )
  }
)

NavbarActions.displayName = "NavbarActions"

// ============================================================================
// Navbar Button (icon button in navbar)
// ============================================================================
export interface NavbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display */
  icon?: LucideIcon
  /** Show badge dot */
  badge?: boolean
}

const NavbarButton = forwardRef<HTMLButtonElement, NavbarButtonProps>(
  ({ icon: Icon, badge, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const buttonStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: NAVBAR_TOKENS.action.size,
      height: NAVBAR_TOKENS.action.size,
      padding: 0,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 8,
      color: isHovered ? NAVBAR_TOKENS.action.colorHover : NAVBAR_TOKENS.action.color,
      cursor: 'pointer',
      transition: 'color 150ms, background-color 150ms',
      ...(isHovered && { backgroundColor: '#f4f4f5' }),
      ...style,
    }

    const badgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      backgroundColor: '#ef4444',
      borderRadius: '50%',
      border: '2px solid white',
    }

    return (
      <button
        ref={ref}
        type="button"
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {Icon ? <Icon size={20} /> : children}
        {badge && <span style={badgeStyle} />}
      </button>
    )
  }
)

NavbarButton.displayName = "NavbarButton"

// ============================================================================
// Navbar Back Button (with label)
// ============================================================================
export interface NavbarBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label text */
  label?: string
}

const NavbarBack = forwardRef<HTMLButtonElement, NavbarBackProps>(
  ({ label = 'Back', style, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const backStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      padding: '8px 8px 8px 0',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 8,
      color: NAVBAR_TOKENS.back.color,
      fontSize: NAVBAR_TOKENS.back.fontSize,
      fontWeight: NAVBAR_TOKENS.back.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: 'pointer',
      transition: 'opacity 150ms',
      opacity: isHovered ? 0.7 : 1,
      ...style,
    }

    return (
      <button
        ref={ref}
        type="button"
        style={backStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <ChevronLeft size={20} />
        {label}
      </button>
    )
  }
)

NavbarBack.displayName = "NavbarBack"

export {
  Navbar,
  NavbarBrand,
  NavbarTitle,
  NavbarActions,
  NavbarButton,
  NavbarBack,
  NAVBAR_TOKENS,
}
