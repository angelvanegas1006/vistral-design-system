import * as React from "react"
import { forwardRef, useId } from "react"

/**
 * Switch/Toggle Design Tokens from Figma
 */
const SWITCH_TOKENS = {
  // Track
  track: {
    width: 44,
    height: 24,
    radius: 9999,
    bg: '#e4e4e7',        // zinc-200
    bgChecked: '#2050f6', // spaceblue-600
    bgDisabled: '#f4f4f5', // zinc-100
  },
  // Thumb
  thumb: {
    size: 20,
    offset: 2,
    bg: '#ffffff',
    shadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  // Sizes
  sizes: {
    sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16 },
    md: { trackWidth: 44, trackHeight: 24, thumbSize: 20 },
    lg: { trackWidth: 52, trackHeight: 28, thumbSize: 24 },
  },
} as const

type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Size variant */
  size?: SwitchSize
  /** Checked state */
  checked?: boolean
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void
  /** Label text */
  label?: React.ReactNode
  /** Description below label */
  description?: React.ReactNode
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    size = 'md',
    checked,
    defaultChecked = false,
    onCheckedChange,
    label,
    description,
    disabled,
    id: providedId,
    onChange,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const generatedId = useId()
    const id = providedId || generatedId

    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const sizeTokens = SWITCH_TOKENS.sizes[size]
    const thumbOffset = SWITCH_TOKENS.thumb.offset

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      onChange?.(e)
      onCheckedChange?.(newChecked)
    }

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center', // Changed to center to align switch with text
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }

    const switchWrapperStyle: React.CSSProperties = {
      position: 'relative',
      flexShrink: 0,
    }

    const trackStyle: React.CSSProperties = {
      position: 'relative',
      width: sizeTokens.trackWidth,
      height: sizeTokens.trackHeight,
      backgroundColor: disabled 
        ? SWITCH_TOKENS.track.bgDisabled 
        : isChecked 
          ? SWITCH_TOKENS.track.bgChecked 
          : SWITCH_TOKENS.track.bg,
      borderRadius: SWITCH_TOKENS.track.radius,
      transition: 'background-color 200ms ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }

    // Calculate the offset to center the thumb vertically and horizontally with consistent spacing
    const thumbInset = thumbOffset
    const thumbTravel = sizeTokens.trackWidth - sizeTokens.thumbSize - (thumbInset * 2)

    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      top: thumbInset,
      left: thumbInset,
      width: sizeTokens.thumbSize,
      height: sizeTokens.thumbSize,
      backgroundColor: SWITCH_TOKENS.thumb.bg,
      borderRadius: '50%',
      boxShadow: SWITCH_TOKENS.thumb.shadow,
      transition: 'transform 200ms ease-in-out',
      transform: isChecked 
        ? `translateX(${thumbTravel}px)` 
        : 'translateX(0)',
    }

    const inputStyle: React.CSSProperties = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0,
      margin: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }

    const labelContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.4,
      color: disabled ? '#a1a1aa' : '#18181b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: disabled ? '#d4d4d8' : '#71717a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    return (
      <label htmlFor={id} style={containerStyle}>
        <span style={switchWrapperStyle}>
          <input
            ref={ref}
            type="checkbox"
            id={id}
            role="switch"
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            style={inputStyle}
            aria-checked={isChecked}
            {...props}
          />
          <span style={trackStyle} aria-hidden="true">
            <span style={thumbStyle} />
          </span>
        </span>

        {(label || description) && (
          <span style={labelContainerStyle}>
            {label && <span style={labelStyle}>{label}</span>}
            {description && <span style={descriptionStyle}>{description}</span>}
          </span>
        )}
      </label>
    )
  }
)

Switch.displayName = "Switch"

export { Switch, SWITCH_TOKENS }
