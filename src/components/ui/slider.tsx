import * as React from 'react'
import { forwardRef, useState, useRef, useCallback } from 'react'

/**
 * Slider Design Tokens
 */
const SLIDER_TOKENS = {
  // Track
  track: {
    height: 6,
    bg: '#e4e4e7',
    bgFilled: '#2050f6',
    radius: 9999,
  },
  // Thumb
  thumb: {
    size: 20,
    bg: '#ffffff',
    border: '#2050f6',
    borderWidth: 2,
    shadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  // States
  disabled: {
    trackBg: '#f4f4f5',
    filledBg: '#a1a1aa',
    thumbBorder: '#a1a1aa',
  },
} as const

export interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Current value */
  value?: number
  /** Default value */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Disabled state */
  disabled?: boolean
  /** Callback when value changes */
  onChange?: (value: number) => void
  /** Show value label */
  showValue?: boolean
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      showValue = false,
      style,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isDragging, setIsDragging] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const percentage = ((value - min) / (max - min)) * 100

    const updateValue = useCallback(
      (clientX: number) => {
        if (!trackRef.current || disabled) return

        const rect = trackRef.current.getBoundingClientRect()
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        const rawValue = min + percent * (max - min)
        const steppedValue = Math.round(rawValue / step) * step
        const clampedValue = Math.max(min, Math.min(max, steppedValue))

        if (!isControlled) {
          setInternalValue(clampedValue)
        }
        onChange?.(clampedValue)
      },
      [disabled, min, max, step, isControlled, onChange]
    )

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      updateValue(e.clientX)
    }

    React.useEffect(() => {
      if (!isDragging) return

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }, [isDragging, updateValue])

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      ...style,
    }

    const trackContainerStyle: React.CSSProperties = {
      position: 'relative',
      flex: 1,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }

    const trackStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: SLIDER_TOKENS.track.height,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.trackBg : SLIDER_TOKENS.track.bg,
      borderRadius: SLIDER_TOKENS.track.radius,
    }

    const filledStyle: React.CSSProperties = {
      position: 'absolute',
      height: SLIDER_TOKENS.track.height,
      width: `${percentage}%`,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.filledBg : SLIDER_TOKENS.track.bgFilled,
      borderRadius: SLIDER_TOKENS.track.radius,
    }

    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${percentage}%`,
      transform: 'translateX(-50%)',
      width: SLIDER_TOKENS.thumb.size,
      height: SLIDER_TOKENS.thumb.size,
      backgroundColor: SLIDER_TOKENS.thumb.bg,
      border: `${SLIDER_TOKENS.thumb.borderWidth}px solid ${disabled ? SLIDER_TOKENS.disabled.thumbBorder : SLIDER_TOKENS.thumb.border}`,
      borderRadius: '50%',
      boxShadow: SLIDER_TOKENS.thumb.shadow,
      cursor: disabled ? 'not-allowed' : 'grab',
      transition: isDragging ? 'none' : 'left 100ms ease',
      ...(isDragging && { cursor: 'grabbing', transform: 'translateX(-50%) scale(1.1)' }),
    }

    const valueStyle: React.CSSProperties = {
      minWidth: 40,
      textAlign: 'right',
      fontSize: 14,
      fontWeight: 500,
      color: disabled ? '#a1a1aa' : '#18181b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div
          ref={trackRef}
          style={trackContainerStyle}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <div style={trackStyle} />
          <div style={filledStyle} />
          <div style={thumbStyle} />
        </div>
        {showValue && <span style={valueStyle}>{value}</span>}
      </div>
    )
  }
)

Slider.displayName = 'Slider'

// ============================================================================
// Range Slider (two thumbs)
// ============================================================================
export interface RangeSliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Current range [min, max] */
  value?: [number, number]
  /** Default range */
  defaultValue?: [number, number]
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Disabled state */
  disabled?: boolean
  /** Callback when value changes */
  onChange?: (value: [number, number]) => void
  /** Minimum gap between thumbs */
  minGap?: number
}

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = [25, 75],
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      onChange,
      minGap = 0,
      style,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const percentage1 = ((value[0] - min) / (max - min)) * 100
    const percentage2 = ((value[1] - min) / (max - min)) * 100

    const updateValue = useCallback(
      (clientX: number, thumb: 0 | 1) => {
        if (!trackRef.current || disabled) return

        const rect = trackRef.current.getBoundingClientRect()
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        const rawValue = min + percent * (max - min)
        const steppedValue = Math.round(rawValue / step) * step

        const newValue: [number, number] = [...value] as [number, number]

        if (thumb === 0) {
          newValue[0] = Math.max(min, Math.min(steppedValue, value[1] - minGap))
        } else {
          newValue[1] = Math.min(max, Math.max(steppedValue, value[0] + minGap))
        }

        if (!isControlled) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [disabled, min, max, step, value, minGap, isControlled, onChange]
    )

    const handleMouseDown = (thumb: 0 | 1) => (e: React.MouseEvent) => {
      if (disabled) return
      e.stopPropagation()
      setActiveThumb(thumb)
      updateValue(e.clientX, thumb)
    }

    React.useEffect(() => {
      if (activeThumb === null) return

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX, activeThumb)
      }

      const handleMouseUp = () => {
        setActiveThumb(null)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }, [activeThumb, updateValue])

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      height: SLIDER_TOKENS.thumb.size + 4, // Enough height for thumbs
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    }

    const trackWrapperStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      transform: 'translateY(-50%)',
    }

    const trackStyle: React.CSSProperties = {
      width: '100%',
      height: SLIDER_TOKENS.track.height,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.trackBg : SLIDER_TOKENS.track.bg,
      borderRadius: SLIDER_TOKENS.track.radius,
    }

    const filledStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: `${percentage1}%`,
      width: `${percentage2 - percentage1}%`,
      height: SLIDER_TOKENS.track.height,
      backgroundColor: disabled ? SLIDER_TOKENS.disabled.filledBg : SLIDER_TOKENS.track.bgFilled,
      borderRadius: SLIDER_TOKENS.track.radius,
    }

    const getThumbStyle = (thumb: 0 | 1): React.CSSProperties => ({
      position: 'absolute',
      top: '50%',
      left: `${thumb === 0 ? percentage1 : percentage2}%`,
      transform: 'translate(-50%, -50%)',
      width: SLIDER_TOKENS.thumb.size,
      height: SLIDER_TOKENS.thumb.size,
      backgroundColor: SLIDER_TOKENS.thumb.bg,
      border: `${SLIDER_TOKENS.thumb.borderWidth}px solid ${disabled ? SLIDER_TOKENS.disabled.thumbBorder : SLIDER_TOKENS.thumb.border}`,
      borderRadius: '50%',
      boxShadow: SLIDER_TOKENS.thumb.shadow,
      cursor: disabled ? 'not-allowed' : 'grab',
      zIndex: activeThumb === thumb ? 2 : 1,
      ...(activeThumb === thumb && {
        cursor: 'grabbing',
        transform: 'translate(-50%, -50%) scale(1.1)',
      }),
    })

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div ref={trackRef} style={{ position: 'absolute', inset: 0 }}>
          <div style={trackWrapperStyle}>
            <div style={trackStyle} />
            <div style={filledStyle} />
          </div>
          <div style={getThumbStyle(0)} onMouseDown={handleMouseDown(0)} />
          <div style={getThumbStyle(1)} onMouseDown={handleMouseDown(1)} />
        </div>
      </div>
    )
  }
)

RangeSlider.displayName = 'RangeSlider'

export { Slider, RangeSlider, SLIDER_TOKENS }
