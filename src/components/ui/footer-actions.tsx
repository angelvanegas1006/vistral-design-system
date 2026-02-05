import * as React from 'react'
import { forwardRef } from 'react'

/**
 * Footer Actions Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2293-28780
 */
const FOOTER_ACTIONS_TOKENS = {
  // Container
  padding: 16,
  bg: '#ffffff',
  border: '#e4e4e7',
  // Gap (minimum 8px per Figma, but using 12px for better spacing)
  gap: 12,
  // Mobile: buttons should be full-width
  mobileGap: 8,
  // Minimum button height for touch accessibility
  minButtonHeight: 44,
} as const

export interface FooterActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed at bottom */
  fixed?: boolean
  /** Show top border */
  bordered?: boolean
  /** Alignment of actions */
  align?: 'left' | 'center' | 'right' | 'space-between'
  /** Direction: horizontal (desktop) or vertical/stacked (mobile) */
  direction?: 'horizontal' | 'vertical'
  /** Gap between items (defaults to 12px, minimum 8px per Figma) */
  gap?: number
  /** Mobile variant: full-width stacked buttons */
  mobile?: boolean
  /** Role for accessibility */
  role?: string
  /** ARIA label */
  'aria-label'?: string
}

const FooterActions = forwardRef<HTMLDivElement, FooterActionsProps>(
  (
    {
      fixed = false,
      bordered = true,
      align = 'right',
      direction,
      gap,
      mobile = false,
      role = 'region',
      'aria-label': ariaLabel = 'Form Actions',
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Auto-detect mobile if direction is not explicitly set
    const isMobile = mobile || direction === 'vertical'
    const finalDirection = direction || (isMobile ? 'vertical' : 'horizontal')
    const finalGap = gap ?? (isMobile ? FOOTER_ACTIONS_TOKENS.mobileGap : FOOTER_ACTIONS_TOKENS.gap)

    const getJustifyContent = () => {
      if (finalDirection === 'vertical') {
        return 'flex-start'
      }
      switch (align) {
        case 'left':
          return 'flex-start'
        case 'center':
          return 'center'
        case 'right':
          return 'flex-end'
        case 'space-between':
          return 'space-between'
        default:
          return 'flex-end'
      }
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: finalDirection === 'vertical' ? 'column' : 'row',
      alignItems: finalDirection === 'vertical' ? 'stretch' : 'center',
      justifyContent: getJustifyContent(),
      gap: finalGap,
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

    // Clone children to ensure buttons have minimum height in mobile
    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child) && isMobile) {
        const childProps = child.props as { style?: React.CSSProperties }
        return React.cloneElement(child as React.ReactElement<any>, {
          style: {
            width: '100%',
            minHeight: FOOTER_ACTIONS_TOKENS.minButtonHeight,
            ...(childProps.style || {}),
          },
        })
      }
      return child
    })

    return (
      <div ref={ref} role={role} aria-label={ariaLabel} style={containerStyle} {...props}>
        {childrenWithProps}
      </div>
    )
  }
)

FooterActions.displayName = 'FooterActions'

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

PageFooter.displayName = 'PageFooter'

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

FooterSection.displayName = 'FooterSection'

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

FooterLink.displayName = 'FooterLink'

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

FooterCopyright.displayName = 'FooterCopyright'

export {
  FooterActions,
  PageFooter,
  FooterSection,
  FooterLink,
  FooterCopyright,
  FOOTER_ACTIONS_TOKENS,
}
