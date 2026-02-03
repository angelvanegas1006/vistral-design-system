import * as React from "react"
import { forwardRef } from "react"

/**
 * Header Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=649-11260
 */
const HEADER_TOKENS = {
  // Page Header
  page: {
    paddingY: 24,
    paddingX: 0,
  },
  // Title
  title: {
    h1: { fontSize: 30, fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: 24, fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: 20, fontWeight: 600, lineHeight: 1.4 },
    color: '#18181b',
  },
  // Description
  description: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 8,
  },
  // Breadcrumb
  breadcrumb: {
    marginBottom: 16,
  },
} as const

// ============================================================================
// Page Header
// ============================================================================
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title */
  title: string
  /** Description */
  description?: string
  /** Title level */
  level?: 'h1' | 'h2' | 'h3'
  /** Actions (buttons, etc.) */
  actions?: React.ReactNode
  /** Breadcrumb element */
  breadcrumb?: React.ReactNode
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({
    title,
    description,
    level = 'h1',
    actions,
    breadcrumb,
    style,
    children,
    ...props
  }, ref) => {
    const containerStyle: React.CSSProperties = {
      padding: `${HEADER_TOKENS.page.paddingY}px ${HEADER_TOKENS.page.paddingX}px`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const headerRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
    }

    const titleStyles = HEADER_TOKENS.title[level]
    const TitleTag = level

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: titleStyles.fontSize,
      fontWeight: titleStyles.fontWeight,
      lineHeight: titleStyles.lineHeight,
      color: HEADER_TOKENS.title.color,
    }

    const descriptionStyle: React.CSSProperties = {
      margin: `${HEADER_TOKENS.description.marginTop}px 0 0`,
      fontSize: HEADER_TOKENS.description.fontSize,
      color: HEADER_TOKENS.description.color,
    }

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {breadcrumb && (
          <div style={{ marginBottom: HEADER_TOKENS.breadcrumb.marginBottom }}>
            {breadcrumb}
          </div>
        )}
        
        <div style={headerRowStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TitleTag style={titleStyle}>{title}</TitleTag>
            {description && <p style={descriptionStyle}>{description}</p>}
          </div>
          
          {actions && <div style={actionsStyle}>{actions}</div>}
        </div>
        
        {children}
      </div>
    )
  }
)

PageHeader.displayName = "PageHeader"

// ============================================================================
// Section Header
// ============================================================================
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title */
  title: string
  /** Description */
  description?: string
  /** Actions */
  actions?: React.ReactNode
  /** Show bottom border */
  bordered?: boolean
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, actions, bordered = false, style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      paddingBottom: bordered ? 16 : 0,
      marginBottom: 16,
      borderBottom: bordered ? '1px solid #e4e4e7' : 'none',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
      color: '#18181b',
    }

    const descriptionStyle: React.CSSProperties = {
      margin: '4px 0 0',
      fontSize: 13,
      color: '#71717a',
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={titleStyle}>{title}</h3>
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
        {actions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {actions}
          </div>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

// ============================================================================
// Card Header (for use inside cards)
// ============================================================================
export interface CardHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title */
  title: string
  /** Subtitle */
  subtitle?: string
  /** Leading element (icon, avatar) */
  leading?: React.ReactNode
  /** Trailing element (badge, button) */
  trailing?: React.ReactNode
}

const CardHeaderTitle = forwardRef<HTMLDivElement, CardHeaderTitleProps>(
  ({ title, subtitle, leading, trailing, style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    }

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: '#18181b',
    }

    const subtitleStyle: React.CSSProperties = {
      margin: '2px 0 0',
      fontSize: 13,
      color: '#71717a',
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {leading}
        <div style={contentStyle}>
          <h4 style={titleStyle}>{title}</h4>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
        {trailing}
      </div>
    )
  }
)

CardHeaderTitle.displayName = "CardHeaderTitle"

export {
  PageHeader,
  SectionHeader,
  CardHeaderTitle,
  HEADER_TOKENS,
}
