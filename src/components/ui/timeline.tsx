import * as React from "react"
import { forwardRef } from "react"
import { Check, Circle, AlertCircle, Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Timeline Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4683-51025
 */
const TIMELINE_TOKENS = {
  // Node (Marker)
  node: {
    size: 24,
    sizeSm: 10, // Small inner dot when no icon
    // States
    default: {
      bg: '#e4e4e7',
      border: '#e4e4e7',
      fg: '#71717a',
    },
    active: {
      bg: '#2050f6',
      border: '#2050f6',
      fg: '#ffffff',
    },
    success: {
      bg: '#16a34a',
      border: '#16a34a',
      fg: '#ffffff',
    },
    error: {
      bg: '#dc2626',
      border: '#dc2626',
      fg: '#ffffff',
    },
    warning: {
      bg: '#f59e0b',
      border: '#f59e0b',
      fg: '#ffffff',
    },
    pending: {
      bg: 'transparent',
      border: '#e4e4e7',
      fg: '#71717a',
    },
  },
  // Connector (Line)
  connector: {
    width: 2,
    bg: '#e4e4e7',
  },
  // Content
  content: {
    gap: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  // Typography
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
    lineHeight: 1.4,
  },
  description: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 1.5,
  },
  time: {
    fontSize: 12,
    color: '#a1a1aa',
    lineHeight: 1.4,
  },
} as const

export type TimelineItemStatus = 'default' | 'active' | 'success' | 'error' | 'warning' | 'pending'

// ============================================================================
// Timeline Root
// ============================================================================
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of the timeline */
  position?: 'left' | 'right' | 'alternate'
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ position = 'left', style, children, ...props }, ref) => {
    const timelineStyle: React.CSSProperties = {
      position: 'relative',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <div ref={ref} style={timelineStyle} role="list" {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const isAlternate = position === 'alternate'
            const itemPosition = isAlternate 
              ? (index % 2 === 0 ? 'left' : 'right')
              : position
            return React.cloneElement(child, { 
              position: itemPosition,
              isLast: index === React.Children.count(children) - 1,
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)

Timeline.displayName = "Timeline"

// ============================================================================
// Timeline Item
// ============================================================================
export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title (keep under 5 words) */
  title?: string
  /** Description (optional secondary text) */
  description?: string
  /** Time/date string */
  time?: string
  /** Status */
  status?: TimelineItemStatus
  /** Custom icon */
  icon?: LucideIcon
  /** Position (set by parent) */
  position?: 'left' | 'right'
  /** Is last item (set by parent) */
  isLast?: boolean
}

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  ({
    title,
    description,
    time,
    status = 'default',
    icon: CustomIcon,
    position = 'left',
    isLast = false,
    style,
    children,
    ...props
  }, ref) => {
    const itemId = React.useId()
    const nodeTokens = TIMELINE_TOKENS.node[status]

    const getIcon = (): LucideIcon | null => {
      if (CustomIcon) return CustomIcon
      switch (status) {
        case 'success': return Check
        case 'error': return AlertCircle
        case 'pending': return Clock
        case 'active': return Circle
        default: return null
      }
    }

    const Icon = getIcon()
    const hasIcon = !!Icon

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: position === 'right' ? 'row-reverse' : 'row',
      gap: TIMELINE_TOKENS.content.gap,
      position: 'relative',
      paddingBottom: isLast ? 0 : 24,
      ...style,
    }

    // Fixed-width container for consistent alignment (centered relative to connector)
    const nodeContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      width: TIMELINE_TOKENS.node.size,
      position: 'relative',
    }

    // Node (Marker) - unified size for alignment
    const nodeStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: TIMELINE_TOKENS.node.size,
      height: TIMELINE_TOKENS.node.size,
      borderRadius: '50%',
      backgroundColor: nodeTokens.bg === 'transparent' ? 'transparent' : nodeTokens.bg,
      color: nodeTokens.fg,
      border: `2px solid ${nodeTokens.border}`,
      position: 'relative',
      zIndex: 1,
      flexShrink: 0,
    }

    // Small inner dot when no icon (for pending/default states)
    const innerDotStyle: React.CSSProperties = !hasIcon ? {
      width: TIMELINE_TOKENS.node.sizeSm,
      height: TIMELINE_TOKENS.node.sizeSm,
      borderRadius: '50%',
      backgroundColor: nodeTokens.bg === 'transparent' ? nodeTokens.border : nodeTokens.bg,
    } : {}

    // Connector (Line) - vertical stroke connecting sequential nodes
    const connectorStyle: React.CSSProperties = !isLast ? {
      flex: 1,
      width: TIMELINE_TOKENS.connector.width,
      backgroundColor: TIMELINE_TOKENS.connector.bg,
      marginTop: 4,
      minHeight: 20,
    } : {}

    const contentStyle: React.CSSProperties = {
      flex: 1,
      paddingTop: 2, // Consistent vertical alignment with node
      textAlign: position === 'right' ? 'right' : 'left',
      minWidth: 0,
    }

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: TIMELINE_TOKENS.title.fontSize,
      fontWeight: TIMELINE_TOKENS.title.fontWeight,
      color: TIMELINE_TOKENS.title.color,
      lineHeight: TIMELINE_TOKENS.title.lineHeight,
    }

    const descriptionStyle: React.CSSProperties = {
      margin: '4px 0 0',
      fontSize: TIMELINE_TOKENS.description.fontSize,
      color: TIMELINE_TOKENS.description.color,
      lineHeight: TIMELINE_TOKENS.description.lineHeight,
    }

    const timeStyle: React.CSSProperties = {
      margin: '8px 0 0',
      fontSize: TIMELINE_TOKENS.time.fontSize,
      color: TIMELINE_TOKENS.time.color,
      lineHeight: TIMELINE_TOKENS.time.lineHeight,
    }

    // Build aria-label for accessibility
    const ariaLabel = title 
      ? `${title}${time ? `, ${time}` : ''}${status === 'success' ? ', completed' : status === 'error' ? ', error' : status === 'active' ? ', in progress' : ''}`
      : undefined

    return (
      <div 
        ref={ref} 
        role="listitem"
        aria-label={ariaLabel}
        style={itemStyle} 
        {...props}
      >
        <div style={nodeContainerStyle}>
          <div 
            style={nodeStyle}
            aria-label={status === 'success' ? 'Completed' : status === 'error' ? 'Error' : status === 'active' ? 'In progress' : 'Pending'}
          >
            {Icon ? (
              <Icon size={14} strokeWidth={status === 'active' ? 2 : 2.5} />
            ) : (
              <div style={innerDotStyle} />
            )}
          </div>
          {!isLast && <div style={connectorStyle} />}
        </div>
        
        <div style={contentStyle}>
          {title && <h4 style={titleStyle}>{title}</h4>}
          {description && <p style={descriptionStyle}>{description}</p>}
          {time && <p style={timeStyle}>{time}</p>}
          {children}
        </div>
      </div>
    )
  }
)

TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem, TIMELINE_TOKENS }
