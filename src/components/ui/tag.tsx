import * as React from 'react'
import { forwardRef } from 'react'
import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Tag Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=166-3243
 */
const TAG_TOKENS = {
  // Variants
  variants: {
    default: {
      bg: '#f4f4f5',
      bgHover: '#e4e4e7',
      fg: '#18181b',
      border: 'none',
    },
    outlined: {
      bg: '#ffffff',
      bgHover: '#f4f4f5',
      fg: '#18181b',
      border: '#e4e4e7',
    },
    dark: {
      bg: '#18181b',
      bgHover: '#27272a',
      fg: '#ffffff',
      border: 'none',
    },
    error: {
      bg: '#fee2e2',
      bgHover: '#fecaca',
      fg: '#dc2626',
      border: 'none',
    },
    success: {
      bg: '#dcfce7',
      bgHover: '#bbf7d0',
      fg: '#16a34a',
      border: 'none',
    },
    info: {
      bg: '#dbeafe',
      bgHover: '#bfdbfe',
      fg: '#1d4ed8',
      border: 'none',
    },
  },
  // Sizes
  sizes: {
    sm: {
      height: 20,
      paddingX: 8,
      fontSize: 11,
      iconSize: 12,
      gap: 4,
    },
    md: {
      height: 24,
      paddingX: 10,
      fontSize: 13,
      iconSize: 14,
      gap: 6,
    },
    lg: {
      height: 28,
      paddingX: 12,
      fontSize: 14,
      iconSize: 16,
      gap: 8,
    },
  },
  // Close button
  close: {
    size: 14,
    fg: '#71717a',
    fgHover: '#18181b',
    radius: '50%',
    bgHover: '#e4e4e7',
  },
  // Radius
  radius: 6,
} as const

export type TagVariant = 'default' | 'outlined' | 'dark' | 'error' | 'success' | 'info'
export type TagSize = 'sm' | 'md' | 'lg'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variant style */
  variant?: TagVariant
  /** Size */
  size?: TagSize
  /** Icon (optional) */
  icon?: LucideIcon
  /** Show close button */
  closable?: boolean
  /** Callback when close button is clicked */
  onClose?: () => void
  /** Make tag clickable */
  clickable?: boolean
  /** ARIA label for accessibility */
  'aria-label'?: string
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon: Icon,
      closable = false,
      onClose,
      clickable = false,
      'aria-label': ariaLabel,
      style,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const tokens = TAG_TOKENS.variants[variant]
    const sizeTokens = TAG_TOKENS.sizes[size]

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation()
      onClose?.()
    }

    const cssVars: Record<string, string> = {
      '--v-bg': tokens.bg,
      '--v-fg': tokens.fg,
    }
    if (clickable) {
      cssVars['--v-bg-hover'] = tokens.bgHover
    }

    const tagStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sizeTokens.gap,
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: closable ? sizeTokens.gap : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: 'var(--vistral-font-family-sans)',
      lineHeight: 1,
      border: tokens.border !== 'none' ? `1px solid ${tokens.border}` : 'none',
      borderRadius: TAG_TOKENS.radius,
      whiteSpace: 'nowrap',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'all 150ms ease',
      ...cssVars,
      ...style,
    }

    const closeButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: TAG_TOKENS.close.size,
      height: TAG_TOKENS.close.size,
      padding: 0,
      margin: 0,
      border: 'none',
      backgroundColor: 'transparent',
      borderRadius: TAG_TOKENS.close.radius,
      color: TAG_TOKENS.close.fg,
      cursor: 'pointer',
      transition: 'all 150ms ease',
      flexShrink: 0,
    }

    const finalAriaLabel =
      ariaLabel ||
      (typeof children === 'string'
        ? `${children} tag${closable ? ', click to remove' : ''}`
        : undefined)

    return (
      <span
        ref={ref}
        data-vistral="tag"
        role={clickable ? 'button' : undefined}
        aria-label={finalAriaLabel}
        style={tagStyle}
        onClick={clickable ? onClick : undefined}
        {...props}
      >
        {Icon && <Icon size={sizeTokens.iconSize} />}
        <span>{children}</span>
        {closable && (
          <button
            type="button"
            aria-label={`Remove ${typeof children === 'string' ? children : 'tag'}`}
            style={closeButtonStyle}
            onClick={handleClose}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = TAG_TOKENS.close.bgHover
              e.currentTarget.style.color = TAG_TOKENS.close.fgHover
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = TAG_TOKENS.close.fg
            }}
          >
            <X size={sizeTokens.iconSize - 2} />
          </button>
        )}
      </span>
    )
  }
)

Tag.displayName = 'Tag'

export { Tag, TAG_TOKENS }
