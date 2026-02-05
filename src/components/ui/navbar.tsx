import * as React from 'react'
import { forwardRef } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
  // Divider between back and title
  divider: {
    width: 1,
    height: 24,
    color: '#e4e4e7',
    marginX: 12,
  },
  // Actions
  action: {
    size: 40,
    iconSize: 20,
    color: '#3f3f46',
    colorHover: '#18181b',
  },
  // Tools button (outlined/dashed)
  toolsButton: {
    height: 36,
    paddingX: 16,
    fontSize: 14,
    fontWeight: 500,
    color: '#7c3aed', // Purple
    border: '#c4b5fd', // Light purple
    borderStyle: 'dashed',
    radius: 8,
  },
  // Secondary button (text)
  secondaryButton: {
    height: 36,
    paddingX: 16,
    fontSize: 14,
    fontWeight: 500,
    color: '#2050f6',
  },
  // Primary button (solid)
  primaryButton: {
    height: 36,
    paddingX: 20,
    fontSize: 14,
    fontWeight: 500,
    bg: '#2050f6',
    color: '#ffffff',
    radius: 9999, // Pill
  },
  // Tools area
  tools: {
    gap: 12,
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

Navbar.displayName = 'Navbar'

// ============================================================================
// Navbar Brand/Logo
// ============================================================================
export interface NavbarBrandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'href'> {
  /** Logo element or text */
  logo?: React.ReactNode
  /** Brand name */
  name?: string
  /** Link href */
  href?: string
}

const NavbarBrand = forwardRef<HTMLDivElement | HTMLAnchorElement, NavbarBrandProps>(
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
      const { ...anchorProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          style={brandStyle}
          {...anchorProps}
        >
          {content}
        </a>
      )
    }

    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} style={brandStyle} {...props}>
        {content}
      </div>
    )
  }
)

NavbarBrand.displayName = 'NavbarBrand'

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

NavbarTitle.displayName = 'NavbarTitle'

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

NavbarActions.displayName = 'NavbarActions'

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

NavbarButton.displayName = 'NavbarButton'

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

NavbarBack.displayName = 'NavbarBack'

// ============================================================================
// Navbar Divider (vertical line between elements)
// ============================================================================
const NavbarDivider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const dividerStyle: React.CSSProperties = {
      width: NAVBAR_TOKENS.divider.width,
      height: NAVBAR_TOKENS.divider.height,
      backgroundColor: NAVBAR_TOKENS.divider.color,
      margin: `0 ${NAVBAR_TOKENS.divider.marginX}px`,
      ...style,
    }

    return <div ref={ref} style={dividerStyle} {...props} />
  }
)

NavbarDivider.displayName = 'NavbarDivider'

// ============================================================================
// Navbar Tools Button (outlined/dashed border - purple)
// ============================================================================
export interface NavbarToolsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NavbarToolsButton = forwardRef<HTMLButtonElement, NavbarToolsButtonProps>(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: NAVBAR_TOKENS.toolsButton.height,
      padding: `0 ${NAVBAR_TOKENS.toolsButton.paddingX}px`,
      backgroundColor: isHovered ? 'rgba(124, 58, 237, 0.05)' : 'transparent',
      border: `1.5px ${NAVBAR_TOKENS.toolsButton.borderStyle} ${NAVBAR_TOKENS.toolsButton.border}`,
      borderRadius: NAVBAR_TOKENS.toolsButton.radius,
      color: NAVBAR_TOKENS.toolsButton.color,
      fontSize: NAVBAR_TOKENS.toolsButton.fontSize,
      fontWeight: NAVBAR_TOKENS.toolsButton.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: 'pointer',
      transition: 'all 150ms ease',
      ...style,
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
        {children}
      </button>
    )
  }
)

NavbarToolsButton.displayName = 'NavbarToolsButton'

// ============================================================================
// Navbar Secondary Button (text button)
// ============================================================================
export interface NavbarSecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NavbarSecondaryButton = forwardRef<HTMLButtonElement, NavbarSecondaryButtonProps>(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: NAVBAR_TOKENS.secondaryButton.height,
      padding: `0 ${NAVBAR_TOKENS.secondaryButton.paddingX}px`,
      backgroundColor: 'transparent',
      border: 'none',
      color: NAVBAR_TOKENS.secondaryButton.color,
      fontSize: NAVBAR_TOKENS.secondaryButton.fontSize,
      fontWeight: NAVBAR_TOKENS.secondaryButton.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: 'pointer',
      transition: 'opacity 150ms ease',
      opacity: isHovered ? 0.7 : 1,
      ...style,
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
        {children}
      </button>
    )
  }
)

NavbarSecondaryButton.displayName = 'NavbarSecondaryButton'

// ============================================================================
// Navbar Primary Button (solid pill button)
// ============================================================================
export interface NavbarPrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NavbarPrimaryButton = forwardRef<HTMLButtonElement, NavbarPrimaryButtonProps>(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: NAVBAR_TOKENS.primaryButton.height,
      padding: `0 ${NAVBAR_TOKENS.primaryButton.paddingX}px`,
      backgroundColor: isHovered ? '#1a42c7' : NAVBAR_TOKENS.primaryButton.bg,
      border: 'none',
      borderRadius: NAVBAR_TOKENS.primaryButton.radius,
      color: NAVBAR_TOKENS.primaryButton.color,
      fontSize: NAVBAR_TOKENS.primaryButton.fontSize,
      fontWeight: NAVBAR_TOKENS.primaryButton.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: 'pointer',
      transition: 'background-color 150ms ease',
      ...style,
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
        {children}
      </button>
    )
  }
)

NavbarPrimaryButton.displayName = 'NavbarPrimaryButton'

// ============================================================================
// Navbar Left Section (for Back + Title layout)
// ============================================================================
export interface NavbarLeftProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavbarLeft = forwardRef<HTMLDivElement, NavbarLeftProps>(
  ({ style, children, ...props }, ref) => {
    const leftStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      ...style,
    }

    return (
      <div ref={ref} style={leftStyle} {...props}>
        {children}
      </div>
    )
  }
)

NavbarLeft.displayName = 'NavbarLeft'

export {
  Navbar,
  NavbarBrand,
  NavbarTitle,
  NavbarActions,
  NavbarButton,
  NavbarBack,
  NavbarDivider,
  NavbarToolsButton,
  NavbarSecondaryButton,
  NavbarPrimaryButton,
  NavbarLeft,
  NAVBAR_TOKENS,
}
