import * as React from "react"
import { forwardRef, createContext, useContext, useCallback, useState } from "react"
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Toast Design Tokens
 */
const TOAST_TOKENS = {
  // Container
  width: 360,
  padding: 16,
  radius: 12,
  shadow: '0px 4px 24px rgba(0, 0, 0, 0.12)',
  // Variants
  variants: {
    default: { bg: '#ffffff', border: '#e4e4e7', fg: '#18181b' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', fg: '#15803d', icon: CheckCircle2 },
    error: { bg: '#fef2f2', border: '#fecaca', fg: '#b91c1c', icon: AlertCircle },
    warning: { bg: '#fffbeb', border: '#fde68a', fg: '#b45309', icon: AlertTriangle },
    info: { bg: '#eff6ff', border: '#bfdbfe', fg: '#1d4ed8', icon: Info },
  },
  // Animation
  duration: 5000,
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
  
  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    return context.addToast(options)
  }, [context])

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
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  /** Max toasts visible */
  max?: number
}

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
  max = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => {
      const newToasts = [...prev, { ...toast, id }]
      return newToasts.slice(-max)
    })
    return id
  }, [max])

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
    zIndex: 100,
    display: 'flex',
    flexDirection: position.startsWith('top') ? 'column' : 'column-reverse',
    gap: 8,
    ...positionStyles[position],
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div style={containerStyle}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = "ToastProvider"

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
  const Icon = 'icon' in tokens ? tokens.icon : null

  // Auto dismiss
  React.useEffect(() => {
    const duration = toast.duration ?? TOAST_TOKENS.duration
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onDismiss])

  const toastStyle: React.CSSProperties = {
    display: 'flex',
    gap: 12,
    width: TOAST_TOKENS.width,
    padding: TOAST_TOKENS.padding,
    backgroundColor: tokens.bg,
    border: `1px solid ${tokens.border}`,
    borderRadius: TOAST_TOKENS.radius,
    boxShadow: TOAST_TOKENS.shadow,
    animation: 'toast-enter 200ms ease-out',
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
    fontSize: 14,
    fontWeight: 600,
    color: '#18181b',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }

  const descriptionStyle: React.CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: 13,
    color: '#52525b',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }

  const closeStyle: React.CSSProperties = {
    flexShrink: 0,
    padding: 4,
    background: 'none',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    color: '#71717a',
  }

  const actionStyle: React.CSSProperties = {
    marginTop: 8,
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 500,
    color: tokens.fg,
    backgroundColor: 'transparent',
    border: `1px solid ${tokens.border}`,
    borderRadius: 6,
    cursor: 'pointer',
  }

  return (
    <div style={toastStyle}>
      {Icon && <Icon size={20} style={iconStyle} />}
      <div style={contentStyle}>
        <p style={titleStyle}>{toast.title}</p>
        {toast.description && <p style={descriptionStyle}>{toast.description}</p>}
        {toast.action && (
          <button style={actionStyle} onClick={toast.action.onClick}>
            {toast.action.label}
          </button>
        )}
      </div>
      <button style={closeStyle} onClick={onDismiss} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  )
}

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-toast-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes toast-enter {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
  }
}

export { ToastProvider, TOAST_TOKENS }
