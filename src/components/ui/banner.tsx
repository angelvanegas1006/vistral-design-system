import * as React from "react"
import { forwardRef, useState } from "react"
import { X, Info, AlertCircle, CheckCircle, AlertTriangle, Megaphone } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Banner Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=331-11770
 */
const BANNER_TOKENS = {
  // Container
  padding: 12,
  paddingX: 16,
  // Variants
  variants: {
    info: { bg: '#eff6ff', border: '#bfdbfe', fg: '#1d4ed8', icon: Info },
    success: { bg: '#f0fdf4', border: '#bbf7d0', fg: '#15803d', icon: CheckCircle },
    warning: { bg: '#fffbeb', border: '#fde68a', fg: '#b45309', icon: AlertTriangle },
    error: { bg: '#fef2f2', border: '#fecaca', fg: '#b91c1c', icon: AlertCircle },
    promo: { bg: '#faf5ff', border: '#e9d5ff', fg: '#7c3aed', icon: Megaphone },
    neutral: { bg: '#f4f4f5', border: '#e4e4e7', fg: '#3f3f46', icon: Info },
  },
  // Typography
  title: {
    fontSize: 14,
    fontWeight: 600,
  },
  message: {
    fontSize: 14,
  },
} as const

type BannerVariant = 'info' | 'success' | 'warning' | 'error' | 'promo' | 'neutral'

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant */
  variant?: BannerVariant
  /** Title */
  title?: string
  /** Custom icon */
  icon?: LucideIcon
  /** Hide icon */
  hideIcon?: boolean
  /** Dismissible */
  dismissible?: boolean
  /** Callback when dismissed */
  onDismiss?: () => void
  /** Action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Fixed position at top */
  fixed?: boolean
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({
    variant = 'info',
    title,
    icon: customIcon,
    hideIcon = false,
    dismissible = false,
    onDismiss,
    action,
    fixed = false,
    style,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    const tokens = BANNER_TOKENS.variants[variant]
    const Icon = customIcon || tokens.icon

    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: `${BANNER_TOKENS.padding}px ${BANNER_TOKENS.paddingX}px`,
      backgroundColor: tokens.bg,
      borderBottom: `1px solid ${tokens.border}`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...(fixed && {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }),
      ...style,
    }

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      color: tokens.fg,
      marginTop: 2,
    }

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    }

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: BANNER_TOKENS.title.fontSize,
      fontWeight: BANNER_TOKENS.title.fontWeight,
      color: tokens.fg,
    }

    const messageStyle: React.CSSProperties = {
      margin: title ? '4px 0 0' : 0,
      fontSize: BANNER_TOKENS.message.fontSize,
      color: '#3f3f46',
    }

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
    }

    const actionButtonStyle: React.CSSProperties = {
      padding: '6px 12px',
      fontSize: 13,
      fontWeight: 500,
      color: tokens.fg,
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.border}`,
      borderRadius: 6,
      cursor: 'pointer',
    }

    const closeButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      background: 'none',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      color: '#71717a',
    }

    return (
      <div ref={ref} role="alert" style={containerStyle} {...props}>
        {!hideIcon && <Icon size={20} style={iconStyle} />}
        
        <div style={contentStyle}>
          {title && <p style={titleStyle}>{title}</p>}
          {children && <p style={messageStyle}>{children}</p>}
        </div>
        
        <div style={actionsStyle}>
          {action && (
            <button type="button" style={actionButtonStyle} onClick={action.onClick}>
              {action.label}
            </button>
          )}
          {dismissible && (
            <button type="button" style={closeButtonStyle} onClick={handleDismiss}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    )
  }
)

Banner.displayName = "Banner"

// ============================================================================
// Promo Banner (special full-width promotional)
// ============================================================================
export interface PromoBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color or gradient */
  background?: string
  /** Text color */
  color?: string
  /** Dismissible */
  dismissible?: boolean
  /** Callback when dismissed */
  onDismiss?: () => void
}

const PromoBanner = forwardRef<HTMLDivElement, PromoBannerProps>(
  ({
    background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color = '#ffffff',
    dismissible = true,
    onDismiss,
    style,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '12px 16px',
      background,
      color,
      textAlign: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: 14,
      fontWeight: 500,
      ...style,
    }

    const closeStyle: React.CSSProperties = {
      position: 'absolute',
      right: 16,
      display: 'flex',
      padding: 4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'inherit',
      opacity: 0.8,
    }

    return (
      <div ref={ref} style={{ ...containerStyle, position: 'relative' }} {...props}>
        {children}
        {dismissible && (
          <button type="button" style={closeStyle} onClick={handleDismiss}>
            <X size={16} />
          </button>
        )}
      </div>
    )
  }
)

PromoBanner.displayName = "PromoBanner"

export { Banner, PromoBanner, BANNER_TOKENS }
