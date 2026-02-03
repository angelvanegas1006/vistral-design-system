import * as React from "react"
import { forwardRef } from "react"

/**
 * Card Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=291-8668
 */
const CARD_TOKENS = {
  // Colors
  bg: '#ffffff',
  border: '#e4e4e7', // zinc-200
  // Radius
  radius: 8, // radius.2
  // Shadows
  shadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.04)', // shadow-level-1
  // Spacing
  padding: {
    sm: 16,
    md: 20,
    lg: 24,
  },
  // Sizes (based on Figma)
  sizes: {
    sm: { minHeight: 178 },
    md: { minHeight: 192 },
    lg: { minHeight: 216 },
  },
} as const

type CardSize = 'sm' | 'md' | 'lg'

// ============================================================================
// Card Container
// ============================================================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize
  /** Remove default shadow */
  flat?: boolean
  /** Make card hoverable with shadow increase */
  hoverable?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ size = 'md', flat = false, hoverable = false, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const cardStyle: React.CSSProperties = {
      backgroundColor: CARD_TOKENS.bg,
      border: `1px solid ${CARD_TOKENS.border}`,
      borderRadius: CARD_TOKENS.radius,
      boxShadow: flat ? 'none' : (isHovered && hoverable) 
        ? '0px 0px 24px 0px rgba(0, 0, 0, 0.1)' 
        : CARD_TOKENS.shadow,
      padding: CARD_TOKENS.padding[size],
      minHeight: CARD_TOKENS.sizes[size].minHeight,
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 200ms ease-in-out',
      ...style,
    }

    return (
      <div
        ref={ref}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

// ============================================================================
// Card Header
// ============================================================================
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Right side content (icon, button, etc) */
  rightContent?: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ rightContent, style, children, ...props }, ref) => {
    const headerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      marginBottom: 12,
      ...style,
    }

    return (
      <div ref={ref} style={headerStyle} {...props}>
        <div style={{ flex: 1 }}>{children}</div>
        {rightContent && <div>{rightContent}</div>}
      </div>
    )
  }
)

CardHeader.displayName = "CardHeader"

// ============================================================================
// Card Title
// ============================================================================
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', style, children, ...props }, ref) => {
    const titleStyle: React.CSSProperties = {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#09090b', // zinc-950
      margin: 0,
      ...style,
    }

    return (
      <Component ref={ref} style={titleStyle} {...props}>
        {children}
      </Component>
    )
  }
)

CardTitle.displayName = "CardTitle"

// ============================================================================
// Card Description
// ============================================================================
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    const descStyle: React.CSSProperties = {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#71717a', // zinc-500
      margin: '4px 0 0 0',
      ...style,
    }

    return (
      <p ref={ref} style={descStyle} {...props}>
        {children}
      </p>
    )
  }
)

CardDescription.displayName = "CardDescription"

// ============================================================================
// Card Content
// ============================================================================
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ style, children, ...props }, ref) => {
    const contentStyle: React.CSSProperties = {
      flex: 1,
      marginTop: 16,
      ...style,
    }

    return (
      <div ref={ref} style={contentStyle} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = "CardContent"

// ============================================================================
// Card Footer
// ============================================================================
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'between'
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'left', style, children, ...props }, ref) => {
    const justifyMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
      between: 'space-between',
    }

    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: justifyMap[align],
      gap: 12,
      marginTop: 16,
      paddingTop: 16,
      borderTop: `1px solid ${CARD_TOKENS.border}`,
      ...style,
    }

    return (
      <div ref={ref} style={footerStyle} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = "CardFooter"

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CARD_TOKENS,
}
