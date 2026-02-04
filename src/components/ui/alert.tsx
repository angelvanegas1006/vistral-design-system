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
  /** Action button text */
  actionLabel?: string
  /** Action button callback */
  onAction?: () => void
}

// Context to pass variant color to children
const AlertContext = React.createContext<{ fg: string } | null>(null)

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    variant = 'info', 
    icon,
    dismissible = false,
    onDismiss,
    actionLabel,
    onAction,
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

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
    }

    const actionButtonStyle: React.CSSProperties = {
      padding: '6px 12px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: tokens.fg,
      fontSize: 14,
      fontWeight: 500,
      borderRadius: 6,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const dismissStyle: React.CSSProperties = {
      padding: 4,
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
      <AlertContext.Provider value={{ fg: tokens.fg }}>
        <div ref={ref} role="alert" style={alertStyle} {...props}>
          {IconComponent && <IconComponent size={20} style={iconStyle} />}
          <div style={contentStyle}>{children}</div>
          <div style={actionsStyle}>
            {actionLabel && (
              <button 
                type="button"
                style={actionButtonStyle} 
                onClick={onAction}
              >
                {actionLabel}
              </button>
            )}
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
        </div>
      </AlertContext.Provider>
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
    const context = React.useContext(AlertContext)
    
    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.4,
      color: context?.fg || '#18181b', // Use variant color
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
    const context = React.useContext(AlertContext)
    
    const descStyle: React.CSSProperties = {
      margin: '4px 0 0 0',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: context?.fg || '#3f3f46', // Use variant color
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
