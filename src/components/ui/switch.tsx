import * as React from 'react'
import { forwardRef, useId } from 'react'

/**
 * Switch/Toggle Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=518-6121
 */
const SWITCH_TOKENS = {
  // Track
  track: {
    radius: 9999,
    bgOff: '#e4e4e7', // Light gray when OFF
    bgOn: '#2050f6', // Blue when ON
    bgDisabledOff: '#f4f4f5', // Very light gray disabled OFF
    bgDisabledOn: '#93c5fd', // Light blue disabled ON
  },
  // Thumb
  thumb: {
    bg: '#ffffff',
    shadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
  },
  // Sizes per Figma
  sizes: {
    sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbOffset: 2 },
    md: { trackWidth: 44, trackHeight: 24, thumbSize: 20, thumbOffset: 2 },
    lg: { trackWidth: 52, trackHeight: 28, thumbSize: 24, thumbOffset: 2 },
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
    colorDisabled: '#a1a1aa',
  },
  // Description
  description: {
    fontSize: 13,
    color: '#71717a',
    colorDisabled: '#d4d4d8',
  },
} as const

type SwitchSize = 'sm' | 'md' | 'lg'
type LabelPosition = 'left' | 'right'

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
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
  /** Position of label relative to switch */
  labelPosition?: LabelPosition
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      checked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      labelPosition = 'right',
      disabled,
      id: providedId,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const generatedId = useId()
    const id = providedId || generatedId

    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const sizeTokens = SWITCH_TOKENS.sizes[size]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      onChange?.(e)
      onCheckedChange?.(newChecked)
    }

    // Get track background color based on state
    const getTrackBg = () => {
      if (disabled) {
        return isChecked ? SWITCH_TOKENS.track.bgDisabledOn : SWITCH_TOKENS.track.bgDisabledOff
      }
      return isChecked ? SWITCH_TOKENS.track.bgOn : SWITCH_TOKENS.track.bgOff
    }

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const switchWrapperStyle: React.CSSProperties = {
      position: 'relative',
      flexShrink: 0,
      marginTop: 2, // Align with first line of text
    }

    const trackStyle: React.CSSProperties = {
      display: 'block',
      position: 'relative',
      width: sizeTokens.trackWidth,
      height: sizeTokens.trackHeight,
      backgroundColor: getTrackBg(),
      borderRadius: SWITCH_TOKENS.track.radius,
      transition: 'background-color 200ms ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
    }

    // Thumb positioning
    const thumbOffset = sizeTokens.thumbOffset
    const thumbTravel = sizeTokens.trackWidth - sizeTokens.thumbSize - thumbOffset * 2

    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      top: thumbOffset,
      left: thumbOffset,
      width: sizeTokens.thumbSize,
      height: sizeTokens.thumbSize,
      backgroundColor: SWITCH_TOKENS.thumb.bg,
      borderRadius: '50%',
      boxShadow: SWITCH_TOKENS.thumb.shadow,
      transition: 'transform 200ms ease-in-out',
      transform: isChecked ? `translateX(${thumbTravel}px)` : 'translateX(0)',
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
      fontSize: SWITCH_TOKENS.label.fontSize,
      fontWeight: SWITCH_TOKENS.label.fontWeight,
      lineHeight: 1.4,
      color: disabled ? SWITCH_TOKENS.label.colorDisabled : SWITCH_TOKENS.label.color,
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: SWITCH_TOKENS.description.fontSize,
      fontWeight: 400,
      lineHeight: 1.4,
      color: disabled ? SWITCH_TOKENS.description.colorDisabled : SWITCH_TOKENS.description.color,
    }

    const switchElement = (
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
    )

    const labelElement =
      label || description ? (
        <span style={labelContainerStyle}>
          {label && <span style={labelStyle}>{label}</span>}
          {description && <span style={descriptionStyle}>{description}</span>}
        </span>
      ) : null

    return (
      <label htmlFor={id} style={containerStyle}>
        {switchElement}
        {labelElement}
      </label>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch, SWITCH_TOKENS }
