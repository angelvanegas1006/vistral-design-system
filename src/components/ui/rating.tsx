import * as React from 'react'
import { forwardRef, useState } from 'react'
import { Star } from 'lucide-react'

/**
 * Rating Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=418-6699
 */
const RATING_TOKENS = {
  // Star
  star: {
    color: '#fbbf24',
    colorEmpty: '#d4d4d8',
    colorHover: '#f59e0b',
  },
  // Sizes
  sizes: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },
  gap: 4,
} as const

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value */
  value?: number
  /** Default value */
  defaultValue?: number
  /** Maximum stars */
  max?: number
  /** Callback when rating changes */
  onChange?: (value: number) => void
  /** Read-only mode */
  readOnly?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Allow half stars */
  allowHalf?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Show value label */
  showValue?: boolean
  /** Custom empty icon */
  emptyIcon?: React.ReactNode
  /** Custom filled icon */
  filledIcon?: React.ReactNode
}

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      onChange,
      readOnly = false,
      disabled = false,
      allowHalf = false,
      size = 'md',
      showValue = false,
      emptyIcon,
      filledIcon,
      style,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [hoverValue, setHoverValue] = useState<number | null>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue
    const displayValue = hoverValue !== null ? hoverValue : value

    const handleClick = (starValue: number) => {
      if (readOnly || disabled) return

      const newValue = starValue === value ? 0 : starValue

      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleMouseMove = (e: React.MouseEvent, starIndex: number) => {
      if (readOnly || disabled) return

      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const isHalf = allowHalf && x < rect.width / 2

      setHoverValue(starIndex + (isHalf ? 0.5 : 1))
    }

    const handleMouseLeave = () => {
      if (!readOnly && !disabled) {
        setHoverValue(null)
      }
    }

    const starSize = RATING_TOKENS.sizes[size]

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: RATING_TOKENS.gap,
      ...style,
    }

    const starsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    }

    const getStarStyle = (_starIndex: number): React.CSSProperties => ({
      cursor: readOnly || disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'transform 150ms ease',
      display: 'flex',
    })

    const renderStar = (starIndex: number) => {
      const starValue = starIndex + 1
      const isFilled = displayValue >= starValue
      const isHalfFilled = allowHalf && displayValue >= starIndex + 0.5 && displayValue < starValue

      const color =
        isFilled || isHalfFilled
          ? hoverValue !== null
            ? RATING_TOKENS.star.colorHover
            : RATING_TOKENS.star.color
          : RATING_TOKENS.star.colorEmpty

      return (
        <span
          key={starIndex}
          style={getStarStyle(starIndex)}
          onClick={() => handleClick(starValue)}
          onMouseMove={e => handleMouseMove(e, starIndex)}
        >
          {isHalfFilled ? (
            // Half star using clip
            <span style={{ position: 'relative', display: 'flex' }}>
              <Star
                size={starSize}
                fill={RATING_TOKENS.star.colorEmpty}
                stroke={RATING_TOKENS.star.colorEmpty}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  overflow: 'hidden',
                }}
              >
                <Star size={starSize} fill={color} stroke={color} />
              </span>
            </span>
          ) : filledIcon && isFilled ? (
            filledIcon
          ) : emptyIcon && !isFilled ? (
            emptyIcon
          ) : (
            <Star
              size={starSize}
              fill={isFilled ? color : 'none'}
              stroke={color}
              strokeWidth={isFilled ? 0 : 1.5}
            />
          )}
        </span>
      )
    }

    const valueStyle: React.CSSProperties = {
      fontSize: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
      fontWeight: 500,
      color: '#18181b',
      marginLeft: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    return (
      <div
        ref={ref}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-disabled={disabled}
        style={containerStyle}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div style={starsStyle}>{Array.from({ length: max }).map((_, i) => renderStar(i))}</div>
        {showValue && <span style={valueStyle}>{displayValue.toFixed(allowHalf ? 1 : 0)}</span>}
      </div>
    )
  }
)

Rating.displayName = 'Rating'

// ============================================================================
// Rating Display (read-only with count)
// ============================================================================
export interface RatingDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rating value */
  value: number
  /** Number of reviews */
  count?: number
  /** Size */
  size?: 'sm' | 'md' | 'lg'
}

const RatingDisplay = forwardRef<HTMLDivElement, RatingDisplayProps>(
  ({ value, count, size = 'sm', style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const valueStyle: React.CSSProperties = {
      fontSize: size === 'sm' ? 13 : size === 'md' ? 14 : 16,
      fontWeight: 600,
      color: '#18181b',
    }

    const countStyle: React.CSSProperties = {
      fontSize: size === 'sm' ? 12 : size === 'md' ? 13 : 14,
      color: '#71717a',
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <Star
          size={RATING_TOKENS.sizes[size]}
          fill={RATING_TOKENS.star.color}
          stroke={RATING_TOKENS.star.color}
        />
        <span style={valueStyle}>{value.toFixed(1)}</span>
        {count !== undefined && <span style={countStyle}>({count.toLocaleString()})</span>}
      </div>
    )
  }
)

RatingDisplay.displayName = 'RatingDisplay'

export { Rating, RatingDisplay, RATING_TOKENS }
