import * as React from "react"
import { forwardRef } from "react"

/**
 * Footer Actions Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2293-27937
 */
const FOOTER_ACTIONS_TOKENS = {
  // Container
  padding: 16,
  bg: '#ffffff',
  border: '#e4e4e7',
  // Gap
  gap: 12,
} as const

export interface FooterActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed at bottom */
  fixed?: boolean
  /** Show top border */
  bordered?: boolean
  /** Alignment of actions */
  align?: 'left' | 'center' | 'right' | 'space-between'
  /** Direction */
  direction?: 'horizontal' | 'vertical'
  /** Gap between items */
  gap?: number
}

const FooterActions = forwardRef<HTMLDivElement, FooterActionsProps>(
  ({
    fixed = false,
    bordered = true,
    align = 'right',
    direction = 'horizontal',
    gap = FOOTER_ACTIONS_TOKENS.gap,
    style,
    children,
    ...props
  }, ref) => {
    const getJustifyContent = () => {
      switch (align) {
        case 'left': return 'flex-start'
        case 'center': return 'center'
        case 'right': return 'flex-end'
        case 'space-between': return 'space-between'
        default: return 'flex-end'
      }
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      alignItems: direction === 'vertical' ? 'stretch' : 'center',
      justifyContent: direction === 'vertical' ? 'flex-start' : getJustifyContent(),
      gap,
      padding: FOOTER_ACTIONS_TOKENS.padding,
      backgroundColor: FOOTER_ACTIONS_TOKENS.bg,
      borderTop: bordered ? `1px solid ${FOOTER_ACTIONS_TOKENS.border}` : 'none',
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
      <div ref={ref} style={containerStyle} {...props}>
        {children}
      </div>
    )
  }
)

FooterActions.displayName = "FooterActions"

// ============================================================================
// Page Footer (full page footer with sections)
// ============================================================================
export interface PageFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Background color */
  variant?: 'light' | 'dark'
}

const PageFooter = forwardRef<HTMLElement, PageFooterProps>(
  ({ variant = 'light', style, children, ...props }, ref) => {
    const isDark = variant === 'dark'

    const footerStyle: React.CSSProperties = {
      backgroundColor: isDark ? '#18181b' : '#fafafa',
      color: isDark ? '#fafafa' : '#18181b',
      padding: '48px 24px 24px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <footer ref={ref} style={footerStyle} {...props}>
        {children}
      </footer>
    )
  }
)

PageFooter.displayName = "PageFooter"

// ============================================================================
// Footer Section
// ============================================================================
export interface FooterSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string
}

const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ title, style, children, ...props }, ref) => {
    const sectionStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style,
    }

    const titleStyle: React.CSSProperties = {
      margin: '0 0 8px',
      fontSize: 14,
      fontWeight: 600,
    }

    return (
      <div ref={ref} style={sectionStyle} {...props}>
        {title && <h4 style={titleStyle}>{title}</h4>}
        {children}
      </div>
    )
  }
)

FooterSection.displayName = "FooterSection"

// ============================================================================
// Footer Link
// ============================================================================
export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const linkStyle: React.CSSProperties = {
      fontSize: 14,
      color: isHovered ? '#2050f6' : '#71717a',
      textDecoration: 'none',
      transition: 'color 150ms ease',
      ...style,
    }

    return (
      <a
        ref={ref}
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </a>
    )
  }
)

FooterLink.displayName = "FooterLink"

// ============================================================================
// Footer Copyright
// ============================================================================
export interface FooterCopyrightProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Company/Product name */
  name?: string
  /** Year (defaults to current) */
  year?: number
}

const FooterCopyright = forwardRef<HTMLParagraphElement, FooterCopyrightProps>(
  ({ name = 'Company', year = new Date().getFullYear(), style, children, ...props }, ref) => {
    const copyrightStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 13,
      color: '#71717a',
      ...style,
    }

    return (
      <p ref={ref} style={copyrightStyle} {...props}>
        {children || `© ${year} ${name}. All rights reserved.`}
      </p>
    )
  }
)

FooterCopyright.displayName = "FooterCopyright"

export {
  FooterActions,
  PageFooter,
  FooterSection,
  FooterLink,
  FooterCopyright,
  FOOTER_ACTIONS_TOKENS,
}
