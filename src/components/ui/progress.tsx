import * as React from 'react'
import { forwardRef } from 'react'

/**
 * Progress Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=321-16473
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1746-2004
 */
const PROGRESS_TOKENS = {
  // Bar tokens
  bar: {
    height: {
      sm: 4,
      md: 8,
      lg: 12,
    },
    bg: '#e4e4e7', // zinc-200
    fill: '#2050f6', // spaceblue-600
    fillSuccess: '#22c55e', // green-500
    fillError: '#ef4444', // red-500
    radius: 9999,
  },
  // Circle tokens
  circle: {
    sizes: {
      sm: 32,
      md: 48,
      lg: 64,
      xl: 96,
    },
    strokeWidth: {
      sm: 3,
      md: 4,
      lg: 5,
      xl: 6,
    },
    bg: '#e4e4e7',
    fill: '#2050f6',
    fillSuccess: '#22c55e',
    fillError: '#ef4444',
  },
} as const

type ProgressSize = 'sm' | 'md' | 'lg'
type ProgressStatus = 'default' | 'success' | 'error'

// ============================================================================
// Progress Bar
// ============================================================================
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value?: number
  /** Size of the bar */
  size?: ProgressSize
  /** Status affects color */
  status?: ProgressStatus
  /** Show percentage label */
  showLabel?: boolean
  /** Indeterminate (animated) state */
  indeterminate?: boolean
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      size = 'md',
      status = 'default',
      showLabel = false,
      indeterminate = false,
      style,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const height = PROGRESS_TOKENS.bar.height[size]

    const getFillColor = () => {
      if (status === 'success') return PROGRESS_TOKENS.bar.fillSuccess
      if (status === 'error') return PROGRESS_TOKENS.bar.fillError
      return PROGRESS_TOKENS.bar.fill
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      ...style,
    }

    const trackStyle: React.CSSProperties = {
      flex: 1,
      height,
      backgroundColor: PROGRESS_TOKENS.bar.bg,
      borderRadius: PROGRESS_TOKENS.bar.radius,
      overflow: 'hidden',
    }

    const fillStyle: React.CSSProperties = {
      height: '100%',
      width: indeterminate ? '30%' : `${clampedValue}%`,
      backgroundColor: getFillColor(),
      borderRadius: PROGRESS_TOKENS.bar.radius,
      transition: indeterminate ? 'none' : 'width 300ms ease-in-out',
      ...(indeterminate && {
        animation: 'progress-indeterminate 1.5s ease-in-out infinite',
      }),
    }

    const labelStyle: React.CSSProperties = {
      fontSize: 12,
      fontWeight: 500,
      color: '#3f3f46',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minWidth: 40,
      textAlign: 'right',
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={containerStyle}
        {...props}
      >
        <div style={trackStyle}>
          <div style={fillStyle} />
        </div>
        {showLabel && !indeterminate && <span style={labelStyle}>{clampedValue}%</span>}
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

// ============================================================================
// Progress Circle
// ============================================================================
type CircleSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value?: number
  /** Size of the circle */
  size?: CircleSize
  /** Status affects color */
  status?: ProgressStatus
  /** Show percentage in center */
  showLabel?: boolean
  /** Custom label content */
  label?: React.ReactNode
}

const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    { value = 0, size = 'md', status = 'default', showLabel = false, label, style, ...props },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const circleSize = PROGRESS_TOKENS.circle.sizes[size]
    const strokeWidth = PROGRESS_TOKENS.circle.strokeWidth[size]

    const radius = (circleSize - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference

    const getFillColor = () => {
      if (status === 'success') return PROGRESS_TOKENS.circle.fillSuccess
      if (status === 'error') return PROGRESS_TOKENS.circle.fillError
      return PROGRESS_TOKENS.circle.fill
    }

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: circleSize,
      height: circleSize,
      ...style,
    }

    const svgStyle: React.CSSProperties = {
      transform: 'rotate(-90deg)',
    }

    const labelStyle: React.CSSProperties = {
      position: 'absolute',
      fontSize: size === 'sm' ? 10 : size === 'md' ? 12 : size === 'lg' ? 14 : 18,
      fontWeight: 600,
      color: '#18181b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={containerStyle}
        {...props}
      >
        <svg width={circleSize} height={circleSize} style={svgStyle}>
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={PROGRESS_TOKENS.circle.bg}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={getFillColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 300ms ease-in-out' }}
          />
        </svg>
        {(showLabel || label) && <span style={labelStyle}>{label || `${clampedValue}%`}</span>}
      </div>
    )
  }
)

ProgressCircle.displayName = 'ProgressCircle'

// Add keyframes for indeterminate animation
if (typeof document !== 'undefined') {
  const styleId = 'vistral-progress-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes progress-indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
    `
    document.head.appendChild(style)
  }
}

export { ProgressBar, ProgressCircle, PROGRESS_TOKENS }
