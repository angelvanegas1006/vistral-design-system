import * as React from "react"
import { forwardRef } from "react"
import { ChevronRight, Home } from "lucide-react"

/**
 * Breadcrumb Design Tokens
 */
const BREADCRUMB_TOKENS = {
  fontSize: 14,
  gap: 8,
  // Link
  link: {
    color: '#71717a',
    colorHover: '#2050f6',
    fontWeight: 400,
  },
  // Current
  current: {
    color: '#18181b',
    fontWeight: 500,
  },
  // Separator
  separator: {
    color: '#a1a1aa',
    size: 16,
  },
} as const

// ============================================================================
// Breadcrumb Container
// ============================================================================
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Separator element */
  separator?: React.ReactNode
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator, style, children, ...props }, ref) => {
    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      ...style,
    }

    const listStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: BREADCRUMB_TOKENS.gap,
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: BREADCRUMB_TOKENS.fontSize,
    }

    // Add separators between children
    const childArray = React.Children.toArray(children)
    const itemsWithSeparators = childArray.flatMap((child, index) => {
      if (index === childArray.length - 1) return [child]
      return [
        child,
        <BreadcrumbSeparator key={`sep-${index}`}>
          {separator}
        </BreadcrumbSeparator>
      ]
    })

    return (
      <nav ref={ref} aria-label="Breadcrumb" style={navStyle} {...props}>
        <ol style={listStyle}>
          {itemsWithSeparators}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = "Breadcrumb"

// ============================================================================
// Breadcrumb Item
// ============================================================================
export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ style, children, ...props }, ref) => {
    const itemStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      ...style,
    }

    return (
      <li ref={ref} style={itemStyle} {...props}>
        {children}
      </li>
    )
  }
)

BreadcrumbItem.displayName = "BreadcrumbItem"

// ============================================================================
// Breadcrumb Link
// ============================================================================
export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Is current page */
  current?: boolean
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ current = false, href, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    if (current) {
      return (
        <span
          aria-current="page"
          style={{
            color: BREADCRUMB_TOKENS.current.color,
            fontWeight: BREADCRUMB_TOKENS.current.fontWeight,
            ...style,
          }}
        >
          {children}
        </span>
      )
    }

    const linkStyle: React.CSSProperties = {
      color: isHovered ? BREADCRUMB_TOKENS.link.colorHover : BREADCRUMB_TOKENS.link.color,
      fontWeight: BREADCRUMB_TOKENS.link.fontWeight,
      textDecoration: 'none',
      transition: 'color 150ms ease',
      ...style,
    }

    return (
      <a
        ref={ref}
        href={href}
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

BreadcrumbLink.displayName = "BreadcrumbLink"

// ============================================================================
// Breadcrumb Separator
// ============================================================================
export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ style, children, ...props }, ref) => {
    const sepStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      color: BREADCRUMB_TOKENS.separator.color,
      ...style,
    }

    return (
      <span ref={ref} role="presentation" aria-hidden="true" style={sepStyle} {...props}>
        {children || <ChevronRight size={BREADCRUMB_TOKENS.separator.size} />}
      </span>
    )
  }
)

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

// ============================================================================
// Breadcrumb Home (shortcut)
// ============================================================================
export interface BreadcrumbHomeProps extends Omit<BreadcrumbLinkProps, 'children'> {
  /** Show icon only */
  iconOnly?: boolean
  /** Label text */
  label?: string
}

const BreadcrumbHome = forwardRef<HTMLAnchorElement, BreadcrumbHomeProps>(
  ({ iconOnly = false, label = 'Home', ...props }, ref) => {
    return (
      <BreadcrumbLink ref={ref} {...props}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Home size={16} />
          {!iconOnly && <span>{label}</span>}
        </span>
      </BreadcrumbLink>
    )
  }
)

BreadcrumbHome.displayName = "BreadcrumbHome"

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbHome,
  BREADCRUMB_TOKENS,
}
