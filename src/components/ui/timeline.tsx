import * as React from "react"
import { forwardRef } from "react"
import { Check, Circle, AlertCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Timeline Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=793-5651
 */
const TIMELINE_TOKENS = {
  // Dot/Icon - consistent size for alignment
  dot: {
    size: 24, // Unified size for all dots
    sizeSm: 10, // Small inner dot when no icon
    bg: '#e4e4e7',
    bgActive: '#2050f6',
    bgSuccess: '#16a34a',
    bgError: '#dc2626',
    bgWarning: '#f59e0b',
  },
  // Line
  line: {
    width: 2,
    bg: '#e4e4e7',
  },
  // Content
  content: {
    gap: 12,
  },
  // Typography
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
  },
  description: {
    fontSize: 13,
    color: '#71717a',
  },
  time: {
    fontSize: 12,
    color: '#a1a1aa',
  },
} as const

type TimelineItemStatus = 'default' | 'active' | 'success' | 'error' | 'warning'

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
      <div ref={ref} style={timelineStyle} {...props}>
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
  /** Title */
  title?: string
  /** Description */
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
    const getDotColor = () => {
      switch (status) {
        case 'active': return TIMELINE_TOKENS.dot.bgActive
        case 'success': return TIMELINE_TOKENS.dot.bgSuccess
        case 'error': return TIMELINE_TOKENS.dot.bgError
        case 'warning': return TIMELINE_TOKENS.dot.bgWarning
        default: return TIMELINE_TOKENS.dot.bg
      }
    }

    const getIcon = () => {
      if (CustomIcon) return CustomIcon
      switch (status) {
        case 'success': return Check
        case 'error': return AlertCircle
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

    // Fixed-width container for consistent alignment
    const dotContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      width: TIMELINE_TOKENS.dot.size,
    }

    // Unified dot size for alignment - inner circle for status without icon
    const dotStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: TIMELINE_TOKENS.dot.size,
      height: TIMELINE_TOKENS.dot.size,
      borderRadius: '50%',
      backgroundColor: hasIcon ? getDotColor() : 'transparent',
      color: '#ffffff',
      border: hasIcon ? 'none' : `2px solid ${getDotColor()}`,
      position: 'relative',
    }

    // Small inner dot when no icon
    const innerDotStyle: React.CSSProperties = !hasIcon ? {
      width: TIMELINE_TOKENS.dot.sizeSm,
      height: TIMELINE_TOKENS.dot.sizeSm,
      borderRadius: '50%',
      backgroundColor: getDotColor(),
    } : {}

    const lineStyle: React.CSSProperties = !isLast ? {
      flex: 1,
      width: TIMELINE_TOKENS.line.width,
      backgroundColor: TIMELINE_TOKENS.line.bg,
      marginTop: 4,
    } : {}

    const contentStyle: React.CSSProperties = {
      flex: 1,
      paddingTop: 2, // Consistent vertical alignment
      textAlign: position === 'right' ? 'right' : 'left',
      minWidth: 0, // Prevent overflow
    }

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: TIMELINE_TOKENS.title.fontSize,
      fontWeight: TIMELINE_TOKENS.title.fontWeight,
      color: TIMELINE_TOKENS.title.color,
    }

    const descriptionStyle: React.CSSProperties = {
      margin: '4px 0 0',
      fontSize: TIMELINE_TOKENS.description.fontSize,
      color: TIMELINE_TOKENS.description.color,
    }

    const timeStyle: React.CSSProperties = {
      margin: '8px 0 0',
      fontSize: TIMELINE_TOKENS.time.fontSize,
      color: TIMELINE_TOKENS.time.color,
    }

    return (
      <div ref={ref} style={itemStyle} {...props}>
        <div style={dotContainerStyle}>
          <div style={dotStyle}>
            {Icon ? <Icon size={14} /> : <div style={innerDotStyle} />}
          </div>
          {!isLast && <div style={lineStyle} />}
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
