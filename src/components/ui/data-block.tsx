import * as React from "react"
import { forwardRef } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Data Block Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1754-12292
 */
const DATA_BLOCK_TOKENS = {
  // Container
  padding: 16,
  radius: 12,
  bg: '#ffffff',
  border: '#e4e4e7',
  // Label
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#71717a',
  },
  // Value
  value: {
    fontSize: 28,
    fontWeight: 600,
    color: '#18181b',
  },
  // Trend
  trend: {
    fontSize: 13,
    fontWeight: 500,
    positive: '#16a34a',
    negative: '#dc2626',
    neutral: '#71717a',
  },
  // Icon
  icon: {
    size: 40,
    bg: '#f4f4f5',
    radius: 8,
  },
} as const

export interface DataBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label/title */
  label: string
  /** Main value */
  value: string | number
  /** Trend percentage */
  trend?: number
  /** Trend label */
  trendLabel?: string
  /** Icon */
  icon?: LucideIcon
  /** Icon background color */
  iconBg?: string
  /** Icon color */
  iconColor?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Loading state */
  loading?: boolean
}

const DataBlock = forwardRef<HTMLDivElement, DataBlockProps>(
  ({
    label,
    value,
    trend,
    trendLabel,
    icon: Icon,
    iconBg = DATA_BLOCK_TOKENS.icon.bg,
    iconColor = '#3f3f46',
    size = 'md',
    loading = false,
    style,
    ...props
  }, ref) => {
    const sizeStyles = {
      sm: { padding: 12, valueSize: 22, iconSize: 32 },
      md: { padding: 16, valueSize: 28, iconSize: 40 },
      lg: { padding: 20, valueSize: 36, iconSize: 48 },
    }

    const currentSize = sizeStyles[size]

    const getTrendColor = () => {
      if (!trend || trend === 0) return DATA_BLOCK_TOKENS.trend.neutral
      return trend > 0 ? DATA_BLOCK_TOKENS.trend.positive : DATA_BLOCK_TOKENS.trend.negative
    }

    const TrendIcon = !trend || trend === 0 ? Minus : trend > 0 ? TrendingUp : TrendingDown

    const containerStyle: React.CSSProperties = {
      padding: currentSize.padding,
      backgroundColor: DATA_BLOCK_TOKENS.bg,
      border: `1px solid ${DATA_BLOCK_TOKENS.border}`,
      borderRadius: DATA_BLOCK_TOKENS.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8,
    }

    const iconContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: currentSize.iconSize,
      height: currentSize.iconSize,
      backgroundColor: iconBg,
      borderRadius: DATA_BLOCK_TOKENS.icon.radius,
      color: iconColor,
      flexShrink: 0,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: DATA_BLOCK_TOKENS.label.fontSize,
      fontWeight: DATA_BLOCK_TOKENS.label.fontWeight,
      color: DATA_BLOCK_TOKENS.label.color,
      margin: 0,
    }

    const valueStyle: React.CSSProperties = {
      fontSize: currentSize.valueSize,
      fontWeight: DATA_BLOCK_TOKENS.value.fontWeight,
      color: DATA_BLOCK_TOKENS.value.color,
      margin: 0,
      lineHeight: 1.2,
    }

    const trendStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 8,
      fontSize: DATA_BLOCK_TOKENS.trend.fontSize,
      fontWeight: DATA_BLOCK_TOKENS.trend.fontWeight,
      color: getTrendColor(),
    }

    const skeletonStyle: React.CSSProperties = {
      backgroundColor: '#e4e4e7',
      borderRadius: 4,
      animation: 'pulse 1.5s infinite',
    }

    if (loading) {
      return (
        <div ref={ref} style={containerStyle} {...props}>
          <div style={headerStyle}>
            <div style={{ ...skeletonStyle, width: 80, height: 16 }} />
            {Icon && <div style={{ ...skeletonStyle, width: currentSize.iconSize, height: currentSize.iconSize, borderRadius: 8 }} />}
          </div>
          <div style={{ ...skeletonStyle, width: 120, height: currentSize.valueSize }} />
          <div style={{ ...skeletonStyle, width: 60, height: 16, marginTop: 8 }} />
        </div>
      )
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={headerStyle}>
          {Icon && (
            <div style={iconContainerStyle}>
              <Icon size={currentSize.iconSize * 0.5} />
            </div>
          )}
          <p style={labelStyle}>{label}</p>
        </div>

        <p style={valueStyle}>{value}</p>

        {(trend !== undefined || trendLabel) && (
          <div style={trendStyle}>
            <TrendIcon size={14} />
            <span>
              {trend !== undefined && `${trend > 0 ? '+' : ''}${trend}%`}
              {trendLabel && ` ${trendLabel}`}
            </span>
          </div>
        )}
      </div>
    )
  }
)

DataBlock.displayName = "DataBlock"

// ============================================================================
// Data Block Grid (for layouts)
// ============================================================================
export interface DataBlockGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4
  /** Gap between items */
  gap?: number
}

const DataBlockGrid = forwardRef<HTMLDivElement, DataBlockGridProps>(
  ({ columns = 3, gap = 16, style, children, ...props }, ref) => {
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      ...style,
    }

    return (
      <div ref={ref} style={gridStyle} {...props}>
        {children}
      </div>
    )
  }
)

DataBlockGrid.displayName = "DataBlockGrid"

export { DataBlock, DataBlockGrid, DATA_BLOCK_TOKENS }
