import * as React from 'react'
import { forwardRef } from 'react'
import {
  FileQuestion,
  Search,
  Inbox,
  FolderOpen,
  AlertCircle,
  WifiOff,
  type LucideIcon,
} from 'lucide-react'
import { Button } from './button'

/**
 * Empty State Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=270-4270
 */
const EMPTY_STATE_TOKENS = {
  // Icon
  icon: {
    size: 48,
    color: '#a1a1aa', // zinc-400
    bgSize: 80,
    bg: '#f4f4f5', // zinc-100
  },
  // Title
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: '#18181b', // zinc-900
  },
  // Description
  description: {
    fontSize: 14,
    color: '#71717a', // zinc-500
  },
  // Container
  padding: 32,
  maxWidth: 400,
} as const

// Preset icons for common empty states
const PRESET_ICONS: Record<string, LucideIcon> = {
  search: Search,
  inbox: Inbox,
  folder: FolderOpen,
  file: FileQuestion,
  error: AlertCircle,
  offline: WifiOff,
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display */
  icon?: LucideIcon | keyof typeof PRESET_ICONS
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Primary action button */
  primaryAction?: {
    label: string
    onClick: () => void
  }
  /** Secondary action button */
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  /** Custom content below description */
  children?: React.ReactNode
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon = 'file',
      title,
      description,
      primaryAction,
      secondaryAction,
      children,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    // Get icon component
    const IconComponent = typeof icon === 'string' ? PRESET_ICONS[icon] || FileQuestion : icon

    // Size multipliers
    const sizeMultiplier = size === 'sm' ? 0.85 : size === 'lg' ? 1.15 : 1

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: EMPTY_STATE_TOKENS.padding * sizeMultiplier,
      maxWidth: EMPTY_STATE_TOKENS.maxWidth,
      margin: '0 auto',
      ...style,
    }

    const iconContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: EMPTY_STATE_TOKENS.icon.bgSize * sizeMultiplier,
      height: EMPTY_STATE_TOKENS.icon.bgSize * sizeMultiplier,
      backgroundColor: EMPTY_STATE_TOKENS.icon.bg,
      borderRadius: '50%',
      marginBottom: 16,
    }

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: EMPTY_STATE_TOKENS.title.fontSize * sizeMultiplier,
      fontWeight: EMPTY_STATE_TOKENS.title.fontWeight,
      color: EMPTY_STATE_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const descriptionStyle: React.CSSProperties = {
      margin: '8px 0 0 0',
      fontSize: EMPTY_STATE_TOKENS.description.fontSize * sizeMultiplier,
      color: EMPTY_STATE_TOKENS.description.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1.5,
    }

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      gap: 12,
      marginTop: 24,
      flexWrap: 'wrap',
      justifyContent: 'center',
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={iconContainerStyle}>
          <IconComponent
            size={EMPTY_STATE_TOKENS.icon.size * sizeMultiplier}
            color={EMPTY_STATE_TOKENS.icon.color}
            strokeWidth={1.5}
          />
        </div>

        <h3 style={titleStyle}>{title}</h3>

        {description && <p style={descriptionStyle}>{description}</p>}

        {children}

        {(primaryAction || secondaryAction) && (
          <div style={actionsStyle}>
            {secondaryAction && (
              <Button
                variant="ghost"
                size={size === 'sm' ? 'sm' : 'md'}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="primary"
                size={size === 'sm' ? 'sm' : 'md'}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

export { EmptyState, EMPTY_STATE_TOKENS }
