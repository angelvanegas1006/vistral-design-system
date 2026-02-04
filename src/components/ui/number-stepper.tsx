import * as React from "react"
import { forwardRef, useState, useId } from "react"
import { Minus, Plus } from "lucide-react"

/**
 * Number Stepper Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=418-6699
 */
const NUMBER_STEPPER_TOKENS = {
  // Container (inline row layout)
  height: 40,
  gap: 16,
  // Stepper control
  control: {
    gap: 8,
  },
  // Buttons (circular outline style)
  button: {
    size: 28,
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgDisabled: 'transparent',
    fg: '#18181b',
    fgDisabled: '#d4d4d8',
    border: '#d4d4d8',
    borderHover: '#a1a1aa',
    radius: 9999, // Full circle
  },
  // Input/Value display
  input: {
    minWidth: 24,
    fontSize: 16,
    fontWeight: 500,
    fg: '#18181b',
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
  },
  // Divider
  divider: {
    width: 1,
    color: '#e4e4e7',
  },
} as const

export interface NumberStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Show divider between label and control */
  showDivider?: boolean
}

const NumberStepper = forwardRef<HTMLDivElement, NumberStepperProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 99,
    step = 1,
    disabled = false,
    onChange,
    label,
    helperText,
    error = false,
    errorMessage,
    showDivider = true,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [hoveredButton, setHoveredButton] = useState<'dec' | 'inc' | null>(null)
    const generatedId = useId()

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const canDecrement = value > min
    const canIncrement = value < max

    const updateValue = (newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue))
      if (!isControlled) {
        setInternalValue(clampedValue)
      }
      onChange?.(clampedValue)
    }

    const handleDecrement = () => {
      if (canDecrement && !disabled) {
        updateValue(value - step)
      }
    }

    const handleIncrement = () => {
      if (canIncrement && !disabled) {
        updateValue(value + step)
      }
    }

    // Container: horizontal row with label left, controls right
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: NUMBER_STEPPER_TOKENS.gap,
      minHeight: NUMBER_STEPPER_TOKENS.height,
      opacity: disabled ? 0.5 : 1,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: NUMBER_STEPPER_TOKENS.label.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.label.fontWeight,
      color: error ? '#dc2626' : NUMBER_STEPPER_TOKENS.label.color,
      margin: 0,
    }

    const dividerStyle: React.CSSProperties = {
      flex: 1,
      height: NUMBER_STEPPER_TOKENS.divider.width,
      backgroundColor: NUMBER_STEPPER_TOKENS.divider.color,
      marginLeft: 8,
      marginRight: 8,
    }

    const controlStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: NUMBER_STEPPER_TOKENS.control.gap,
    }

    const getButtonStyle = (isEnabled: boolean, buttonType: 'dec' | 'inc'): React.CSSProperties => {
      const isHovered = hoveredButton === buttonType
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: NUMBER_STEPPER_TOKENS.button.size,
        height: NUMBER_STEPPER_TOKENS.button.size,
        backgroundColor: isHovered && isEnabled && !disabled 
          ? NUMBER_STEPPER_TOKENS.button.bgHover 
          : NUMBER_STEPPER_TOKENS.button.bg,
        color: isEnabled && !disabled 
          ? NUMBER_STEPPER_TOKENS.button.fg 
          : NUMBER_STEPPER_TOKENS.button.fgDisabled,
        border: `1px solid ${isEnabled && !disabled 
          ? (isHovered ? NUMBER_STEPPER_TOKENS.button.borderHover : NUMBER_STEPPER_TOKENS.button.border)
          : NUMBER_STEPPER_TOKENS.button.fgDisabled}`,
        borderRadius: NUMBER_STEPPER_TOKENS.button.radius,
        cursor: isEnabled && !disabled ? 'pointer' : 'not-allowed',
        transition: 'all 150ms ease',
        padding: 0,
      }
    }

    const valueStyle: React.CSSProperties = {
      minWidth: NUMBER_STEPPER_TOKENS.input.minWidth,
      fontSize: NUMBER_STEPPER_TOKENS.input.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.input.fontWeight,
      color: NUMBER_STEPPER_TOKENS.input.fg,
      textAlign: 'center',
      fontFamily: 'inherit',
    }

    const helperStyle: React.CSSProperties = {
      fontSize: 12,
      color: error ? '#dc2626' : '#71717a',
      margin: 0,
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={rowStyle}>
          {label && (
            <label htmlFor={generatedId} style={labelStyle}>
              {label}
            </label>
          )}

          {showDivider && label && <div style={dividerStyle} />}

          <div style={controlStyle}>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={!canDecrement || disabled}
              style={getButtonStyle(canDecrement, 'dec')}
              onMouseEnter={() => setHoveredButton('dec')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Decrease value"
            >
              <Minus size={16} />
            </button>

            <span id={generatedId} style={valueStyle}>
              {value}
            </span>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={!canIncrement || disabled}
              style={getButtonStyle(canIncrement, 'inc')}
              onMouseEnter={() => setHoveredButton('inc')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Increase value"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {(helperText || errorMessage) && (
          <p style={helperStyle}>
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    )
  }
)

NumberStepper.displayName = "NumberStepper"

export { NumberStepper, NUMBER_STEPPER_TOKENS }
