import * as React from 'react'
import { createContext, useContext, useCallback, useState } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info, Circle } from 'lucide-react'

/**
 * Toast Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=707-2506
 */
const TOAST_TOKENS = {
  width: 360,
  padding: 16,
  radius: 12,
  shadow: '0px 4px 24px rgba(0, 0, 0, 0.12)',
  borderWidth: 2,
  gap: 12,
  variants: {
    default: {
      bg: '#ffffff',
      border: '#e4e4e7',
      titleColor: '#18181b',
      descriptionColor: '#52525b',
      icon: Circle,
    },
    success: {
      bg: '#ffffff',
      border: '#16a34a',
      titleColor: '#16a34a',
      descriptionColor: '#52525b',
      icon: CheckCircle2,
    },
    error: {
      bg: '#ffffff',
      border: '#dc2626',
      titleColor: '#dc2626',
      descriptionColor: '#52525b',
      icon: AlertCircle,
    },
    warning: {
      bg: '#ffffff',
      border: '#f59e0b',
      titleColor: '#f59e0b',
      descriptionColor: '#52525b',
      icon: AlertTriangle,
    },
    info: {
      bg: '#ffffff',
      border: '#2050f6',
      titleColor: '#2050f6',
      descriptionColor: '#52525b',
      icon: Info,
    },
  },
  durations: {
    success: 4000,
    error: 6000,
    warning: 5000,
    info: 5000,
    default: 5000,
  },
  closeButton: {
    color: '#2050f6',
    size: 16,
  },
  actionButton: {
    fontSize: 13,
    fontWeight: 500,
    padding: '6px 12px',
    radius: 6,
  },
} as const

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

// ============================================================================
// Toast types
// ============================================================================
type Toast = {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

type ToastContextValue = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

// ============================================================================
// useToast hook
// ============================================================================
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  const toast = useCallback(
    (options: Omit<Toast, 'id'>) => {
      return context.addToast(options)
    },
    [context]
  )

  return {
    toast,
    dismiss: context.removeToast,
    toasts: context.toasts,
  }
}

// ============================================================================
// Toast Provider
// ============================================================================
export interface ToastProviderProps {
  children: React.ReactNode
  /** Position of toasts */
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
  /** Max toasts visible */
  max?: number
}

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
  max = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts(prev => {
        const newToasts = [...prev, { ...toast, id }]
        return newToasts.slice(-max)
      })
      return id
    },
    [max]
  )

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const positionStyles: Record<string, React.CSSProperties> = {
    'top-right': { top: 16, right: 16 },
    'top-left': { top: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 },
    'top-center': { top: 16, left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: 16, left: '50%', transform: 'translateX(-50%)' },
  }

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
    display: 'flex',
    flexDirection: position.startsWith('top') ? 'column' : 'column-reverse',
    gap: 8,
    ...positionStyles[position],
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div style={containerStyle} role="region" aria-label="Notifications">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'

// ============================================================================
// Toast Item
// ============================================================================
interface ToastItemProps {
  toast: Toast
  onDismiss: () => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const variant = toast.variant || 'default'
  const tokens = TOAST_TOKENS.variants[variant]
  const Icon = tokens.icon

  const getDefaultDuration = React.useCallback(() => {
    return TOAST_TOKENS.durations[variant]
  }, [variant])

  React.useEffect(() => {
    const duration = toast.duration !== undefined ? toast.duration : getDefaultDuration()
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onDismiss, getDefaultDuration])

  const isCritical = variant === 'error' || variant === 'warning'
  const ariaRole = isCritical ? 'alert' : 'status'
  const ariaLive = isCritical ? 'assertive' : 'polite'

  const toastStyle: React.CSSProperties = {
    display: 'flex',
    gap: TOAST_TOKENS.gap,
    alignItems: 'flex-start',
    width: TOAST_TOKENS.width,
    padding: TOAST_TOKENS.padding,
    backgroundColor: tokens.bg,
    border: `1px solid ${variant === 'default' ? tokens.border : '#e4e4e7'}`,
    borderLeft: `${TOAST_TOKENS.borderWidth}px solid ${tokens.border}`,
    borderRadius: TOAST_TOKENS.radius,
    boxShadow: TOAST_TOKENS.shadow,
    animation: 'toast-enter 200ms ease-out',
    fontFamily: 'var(--vistral-font-family-sans)',
  }

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    color: tokens.border,
    marginTop: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const contentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  }

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: tokens.titleColor,
    fontFamily: 'var(--vistral-font-family-sans)',
    lineHeight: 1.4,
  }

  const descriptionStyle: React.CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: 13,
    color: tokens.descriptionColor,
    fontFamily: 'var(--vistral-font-family-sans)',
    lineHeight: 1.5,
  }

  const closeStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: 4,
    background: 'none',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    color: TOAST_TOKENS.closeButton.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 150ms ease-in-out',
  }

  const actionStyle: React.CSSProperties = {
    '--v-bg-hover': `${tokens.border}15`,
    marginTop: 8,
    padding: TOAST_TOKENS.actionButton.padding,
    fontSize: TOAST_TOKENS.actionButton.fontSize,
    fontWeight: TOAST_TOKENS.actionButton.fontWeight,
    color: tokens.titleColor,
    backgroundColor: 'transparent',
    border: `1px solid ${tokens.border}`,
    borderRadius: TOAST_TOKENS.actionButton.radius,
    cursor: 'pointer',
    fontFamily: 'var(--vistral-font-family-sans)',
    transition: 'background-color 150ms ease-in-out',
  } as React.CSSProperties

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toast.action?.onClick()
  }

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDismiss()
  }

  return (
    <div
      data-vistral="toast"
      data-variant={variant}
      style={toastStyle}
      role={ariaRole}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <div style={iconStyle}>
        {variant === 'default' ? (
          <Circle size={20} strokeWidth={2} fill="none" />
        ) : (
          <Icon size={20} />
        )}
      </div>
      <div style={contentStyle}>
        <p style={titleStyle}>{toast.title}</p>
        {toast.description && <p style={descriptionStyle}>{toast.description}</p>}
        {toast.action && (
          <button data-vistral="toast-action" style={actionStyle} onClick={handleActionClick}>
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        data-vistral="toast-close"
        style={closeStyle}
        onClick={handleCloseClick}
        aria-label="Dismiss notification"
      >
        <X size={TOAST_TOKENS.closeButton.size} />
      </button>
    </div>
  )
}

export { ToastProvider, TOAST_TOKENS }
