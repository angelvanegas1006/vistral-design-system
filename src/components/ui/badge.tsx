import * as React from "react"
import { forwardRef } from "react"

/**
 * Badge Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=156-7646
 */
const BADGE_TOKENS = {
  variants: {
    default: { bg: '#f4f4f5', fg: '#3f3f46' },     // zinc-100, zinc-700
    primary: { bg: '#dbeafe', fg: '#1d4ed8' },     // blue-100, blue-700
    brand: { bg: '#eef4ff', fg: '#2050f6' },       // spaceblue-50, spaceblue-600
    error: { bg: '#fee2e2', fg: '#dc2626' },       // red-100, red-600
    warning: { bg: '#fef3c7', fg: '#d97706' },     // amber-100, amber-600
    success: { bg: '#dcfce7', fg: '#16a34a' },     // green-100, green-600
  },
  // Dot variants (filled circles)
  dotVariants: {
    default: { bg: '#71717a' },  // zinc-500
    primary: { bg: '#3b82f6' },  // blue-500
    brand: { bg: '#2050f6' },    // spaceblue-600
    error: { bg: '#ef4444' },    // red-500
    warning: { bg: '#f59e0b' },  // amber-500
    success: { bg: '#22c55e' },  // green-500
  },
  sizes: {
    sm: { height: 18, fontSize: 10, paddingX: 6, dotSize: 6 },
    md: { height: 22, fontSize: 12, paddingX: 8, dotSize: 8 },
  },
  radius: 6, // Not fully rounded, just subtle radius
} as const

type BadgeVariant = 'default' | 'primary' | 'brand' | 'error' | 'warning' | 'success'
type BadgeSize = 'sm' | 'md'

// ============================================================================
// Badge (Label/Tag style)
// ============================================================================
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', style, children, ...props }, ref) => {
    const tokens = BADGE_TOKENS.variants[variant]
    const sizeTokens = BADGE_TOKENS.sizes[size]

    const badgeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: tokens.bg,
      color: tokens.fg,
      borderRadius: BADGE_TOKENS.radius,
      whiteSpace: 'nowrap',
      ...style,
    }

    return (
      <span ref={ref} style={badgeStyle} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = "Badge"

// ============================================================================
// Dot Badge (Notification indicator)
// ============================================================================
export interface DotBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  /** Show count instead of dot */
  count?: number
  /** Max count to display (shows 99+ if exceeded) */
  maxCount?: number
  /** Position relative to parent */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Show as standalone (not positioned) */
  standalone?: boolean
}

const DotBadge = forwardRef<HTMLSpanElement, DotBadgeProps>(
  ({ 
    variant = 'error', 
    size = 'md', 
    count,
    maxCount = 99,
    position = 'top-right',
    standalone = false,
    style, 
    ...props 
  }, ref) => {
    const dotTokens = BADGE_TOKENS.dotVariants[variant]
    const sizeTokens = BADGE_TOKENS.sizes[size]
    
    const hasCount = count !== undefined && count > 0
    const displayCount = hasCount 
      ? (count > maxCount ? `${maxCount}+` : count.toString())
      : null

    // Position offsets
    const positionStyles: Record<string, React.CSSProperties> = {
      'top-right': { top: 0, right: 0, transform: 'translate(50%, -50%)' },
      'top-left': { top: 0, left: 0, transform: 'translate(-50%, -50%)' },
      'bottom-right': { bottom: 0, right: 0, transform: 'translate(50%, 50%)' },
      'bottom-left': { bottom: 0, left: 0, transform: 'translate(-50%, 50%)' },
    }

    const dotStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: hasCount ? sizeTokens.height : sizeTokens.dotSize,
      height: hasCount ? sizeTokens.height : sizeTokens.dotSize,
      padding: hasCount ? `0 ${sizeTokens.paddingX / 2}px` : 0,
      fontSize: sizeTokens.fontSize - 2,
      fontWeight: 600,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: dotTokens.bg,
      color: '#ffffff',
      borderRadius: BADGE_TOKENS.radius,
      // Positioning
      ...(standalone ? {} : {
        position: 'absolute',
        ...positionStyles[position],
      }),
      ...style,
    }

    return (
      <span ref={ref} style={dotStyle} {...props}>
        {displayCount}
      </span>
    )
  }
)

DotBadge.displayName = "DotBadge"

// ============================================================================
// Badge Container (wraps element with positioned badge)
// ============================================================================
export interface BadgeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const BadgeContainer = forwardRef<HTMLDivElement, BadgeContainerProps>(
  ({ style, children, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      ...style,
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {children}
      </div>
    )
  }
)

BadgeContainer.displayName = "BadgeContainer"

export { Badge, DotBadge, BadgeContainer, BADGE_TOKENS }
