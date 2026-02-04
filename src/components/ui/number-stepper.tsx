import * as React from "react"
import { forwardRef, useState, useId } from "react"
import { Minus, Plus } from "lucide-react"

/**
 * Number Stepper Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=418-6699
 */
const NUMBER_STEPPER_TOKENS = {
  // Container
  height: 44,
  radius: 8,
  border: '#d4d4d8',
  borderFocus: '#2050f6',
  bg: '#ffffff',
  // Buttons
  button: {
    size: 32,
    bg: '#f4f4f5',
    bgHover: '#e4e4e7',
    bgDisabled: '#f4f4f5',
    fg: '#18181b',
    fgDisabled: '#a1a1aa',
    radius: 6,
  },
  // Input
  input: {
    width: 48,
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
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10)
      if (!isNaN(newValue)) {
        updateValue(newValue)
      }
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: NUMBER_STEPPER_TOKENS.label.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.label.fontWeight,
      color: error ? '#dc2626' : NUMBER_STEPPER_TOKENS.label.color,
    }

    const inputWrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: NUMBER_STEPPER_TOKENS.height,
      padding: 4,
      backgroundColor: NUMBER_STEPPER_TOKENS.bg,
      border: `1px solid ${error ? '#dc2626' : NUMBER_STEPPER_TOKENS.border}`,
      borderRadius: NUMBER_STEPPER_TOKENS.radius,
      opacity: disabled ? 0.5 : 1,
    }

    const buttonStyle = (isEnabled: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: NUMBER_STEPPER_TOKENS.button.size,
      height: NUMBER_STEPPER_TOKENS.button.size,
      backgroundColor: NUMBER_STEPPER_TOKENS.button.bg,
      color: isEnabled && !disabled 
        ? NUMBER_STEPPER_TOKENS.button.fg 
        : NUMBER_STEPPER_TOKENS.button.fgDisabled,
      border: 'none',
      borderRadius: NUMBER_STEPPER_TOKENS.button.radius,
      cursor: isEnabled && !disabled ? 'pointer' : 'not-allowed',
      transition: 'background-color 150ms ease',
    })

    const inputStyle: React.CSSProperties = {
      width: NUMBER_STEPPER_TOKENS.input.width,
      height: '100%',
      border: 'none',
      outline: 'none',
      textAlign: 'center',
      fontSize: NUMBER_STEPPER_TOKENS.input.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.input.fontWeight,
      color: NUMBER_STEPPER_TOKENS.input.fg,
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
    }

    const helperStyle: React.CSSProperties = {
      fontSize: 12,
      color: error ? '#dc2626' : '#71717a',
      margin: 0,
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {label && (
          <label htmlFor={generatedId} style={labelStyle}>
            {label}
          </label>
        )}

        <div style={inputWrapperStyle}>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={!canDecrement || disabled}
            style={buttonStyle(canDecrement)}
            aria-label="Decrease value"
          >
            <Minus size={18} />
          </button>

          <input
            id={generatedId}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            style={inputStyle}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />

          <button
            type="button"
            onClick={handleIncrement}
            disabled={!canIncrement || disabled}
            style={buttonStyle(canIncrement)}
            aria-label="Increase value"
          >
            <Plus size={18} />
          </button>
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
