import * as React from "react"
import { forwardRef } from "react"
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Alert Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=251-17891
 */
const ALERT_TOKENS = {
  variants: {
    info: { 
      bg: '#eff6ff',      // blue-50
      border: '#bfdbfe',  // blue-200
      fg: '#1d4ed8',      // blue-700
      icon: Info,
    },
    success: { 
      bg: '#f0fdf4',      // green-50
      border: '#bbf7d0',  // green-200
      fg: '#15803d',      // green-700
      icon: CheckCircle2,
    },
    warning: { 
      bg: '#fffbeb',      // amber-50
      border: '#fde68a',  // amber-200
      fg: '#b45309',      // amber-700
      icon: AlertTriangle,
    },
    error: { 
      bg: '#fef2f2',      // red-50
      border: '#fecaca',  // red-200
      fg: '#b91c1c',      // red-700
      icon: AlertCircle,
    },
  },
  radius: 8,
  padding: {
    sm: 12,
    md: 16,
  },
} as const

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  /** Custom icon override */
  icon?: LucideIcon | null
  /** Show close button */
  dismissible?: boolean
  /** Callback when dismissed */
  onDismiss?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    variant = 'info', 
    icon,
    dismissible = false,
    onDismiss,
    style, 
    children, 
    ...props 
  }, ref) => {
    const tokens = ALERT_TOKENS.variants[variant]
    const IconComponent = icon === null ? null : (icon || tokens.icon)

    const alertStyle: React.CSSProperties = {
      display: 'flex',
      gap: 12,
      padding: ALERT_TOKENS.padding.md,
      backgroundColor: tokens.bg,
      border: `1px solid ${tokens.border}`,
      borderRadius: ALERT_TOKENS.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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

    const dismissStyle: React.CSSProperties = {
      flexShrink: 0,
      padding: 4,
      marginTop: -4,
      marginRight: -4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: tokens.fg,
      opacity: 0.6,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    return (
      <div ref={ref} role="alert" style={alertStyle} {...props}>
        {IconComponent && <IconComponent size={20} style={iconStyle} />}
        <div style={contentStyle}>{children}</div>
        {dismissible && (
          <button 
            type="button"
            style={dismissStyle} 
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = "Alert"

// ============================================================================
// Alert Title
// ============================================================================
export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ style, children, ...props }, ref) => {
    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#18181b', // zinc-900
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <h5 ref={ref} style={titleStyle} {...props}>
        {children}
      </h5>
    )
  }
)

AlertTitle.displayName = "AlertTitle"

// ============================================================================
// Alert Description
// ============================================================================
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    const descStyle: React.CSSProperties = {
      margin: '4px 0 0 0',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#3f3f46', // zinc-700
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <p ref={ref} style={descStyle} {...props}>
        {children}
      </p>
    )
  }
)

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, ALERT_TOKENS }
