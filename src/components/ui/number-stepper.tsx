import * as React from "react"
import { forwardRef, useState, useId } from "react"
import { Minus, Plus } from "lucide-react"

/**
 * Number Stepper Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=438-8074
 */
const NUMBER_STEPPER_TOKENS = {
  // Container (inline row layout)
  height: 40,
  gap: 16,
  // Stepper control
  control: {
    gap: 8,
  },
  // Buttons (filled style - blue when enabled, gray when disabled)
  button: {
    size: 28,
    bgEnabled: '#b3d4fc', // Light blue background when enabled
    bgDisabled: '#e0e0e0', // Light gray background when disabled
    bgHover: '#9bc4f5', // Slightly darker blue on hover
    fgEnabled: '#ffffff', // White icon when enabled
    fgDisabled: '#a0a0a0', // Gray icon when disabled
    radius: 9999, // Full circle
  },
  // Input/Value display (editable field)
  input: {
    minWidth: 40,
    height: 40,
    fontSize: 16,
    fontWeight: 500,
    fg: '#18181b',
    bg: '#ffffff',
    border: '#e4e4e7',
    borderFocus: '#2050f6',
    radius: 8,
    padding: '0 8px',
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
    colorDisabled: '#a1a1aa',
    colorError: '#dc2626',
  },
  // Error message
  error: {
    fontSize: 12,
    color: '#dc2626',
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
    const [inputValue, setInputValue] = useState(String(defaultValue))
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const generatedId = useId()

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    // Sync input value when controlled value changes
    React.useEffect(() => {
      if (isControlled && !isFocused) {
        setInputValue(String(controlledValue))
      }
    }, [controlledValue, isControlled, isFocused])

    // Sync input value when internal value changes (uncontrolled)
    React.useEffect(() => {
      if (!isControlled && !isFocused) {
        setInputValue(String(internalValue))
      }
    }, [internalValue, isControlled, isFocused])

    const canDecrement = value > min && !disabled
    const canIncrement = value < max && !disabled

    const updateValue = (newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue))
      if (!isControlled) {
        setInternalValue(clampedValue)
        setInputValue(String(clampedValue))
      }
      onChange?.(clampedValue)
    }

    const handleDecrement = () => {
      if (canDecrement) {
        updateValue(value - step)
      }
    }

    const handleIncrement = () => {
      if (canIncrement) {
        updateValue(value + step)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      
      // Allow empty input while typing
      if (newValue === '') {
        return
      }

      const numValue = parseInt(newValue, 10)
      if (!isNaN(numValue)) {
        updateValue(numValue)
      }
    }

    const handleInputBlur = () => {
      setIsFocused(false)
      // Reset to current value if invalid
      const numValue = parseInt(inputValue, 10)
      if (isNaN(numValue) || numValue < min || numValue > max) {
        setInputValue(String(value))
      } else {
        updateValue(numValue)
      }
    }

    const handleInputFocus = () => {
      setIsFocused(true)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (canIncrement) {
          updateValue(value + step)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (canDecrement) {
          updateValue(value - step)
        }
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
    }

    const labelStyle: React.CSSProperties = {
      fontSize: NUMBER_STEPPER_TOKENS.label.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.label.fontWeight,
      color: disabled 
        ? NUMBER_STEPPER_TOKENS.label.colorDisabled
        : error 
        ? NUMBER_STEPPER_TOKENS.label.colorError
        : NUMBER_STEPPER_TOKENS.label.color,
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
      const isActive = isEnabled && !disabled
      
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: NUMBER_STEPPER_TOKENS.button.size,
        height: NUMBER_STEPPER_TOKENS.button.size,
        backgroundColor: isActive
          ? (isHovered ? NUMBER_STEPPER_TOKENS.button.bgHover : NUMBER_STEPPER_TOKENS.button.bgEnabled)
          : NUMBER_STEPPER_TOKENS.button.bgDisabled,
        color: isActive
          ? NUMBER_STEPPER_TOKENS.button.fgEnabled
          : NUMBER_STEPPER_TOKENS.button.fgDisabled,
        border: 'none',
        borderRadius: NUMBER_STEPPER_TOKENS.button.radius,
        cursor: isActive ? 'pointer' : 'not-allowed',
        transition: 'all 150ms ease',
        padding: 0,
        opacity: disabled ? 0.5 : 1,
      }
    }

    const inputStyle: React.CSSProperties = {
      width: NUMBER_STEPPER_TOKENS.input.minWidth,
      height: NUMBER_STEPPER_TOKENS.input.height,
      fontSize: NUMBER_STEPPER_TOKENS.input.fontSize,
      fontWeight: NUMBER_STEPPER_TOKENS.input.fontWeight,
      color: NUMBER_STEPPER_TOKENS.input.fg,
      backgroundColor: disabled ? '#f4f4f5' : NUMBER_STEPPER_TOKENS.input.bg,
      border: `1px solid ${isFocused ? NUMBER_STEPPER_TOKENS.input.borderFocus : NUMBER_STEPPER_TOKENS.input.border}`,
      borderRadius: NUMBER_STEPPER_TOKENS.input.radius,
      padding: NUMBER_STEPPER_TOKENS.input.padding,
      textAlign: 'center',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 150ms ease',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.5 : 1,
    }

    const helperStyle: React.CSSProperties = {
      fontSize: NUMBER_STEPPER_TOKENS.error.fontSize,
      color: error ? NUMBER_STEPPER_TOKENS.error.color : '#71717a',
      margin: 0,
      marginTop: 4,
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
              disabled={!canDecrement}
              style={getButtonStyle(canDecrement, 'dec')}
              onMouseEnter={() => setHoveredButton('dec')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Decrease value"
              aria-disabled={!canDecrement}
            >
              <Minus size={16} />
            </button>

            <input
              ref={inputRef}
              id={generatedId}
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              style={inputStyle}
              aria-valuenow={value}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-invalid={error}
              aria-describedby={error && errorMessage ? `${generatedId}-error` : undefined}
              role="spinbutton"
            />

            <button
              type="button"
              onClick={handleIncrement}
              disabled={!canIncrement}
              style={getButtonStyle(canIncrement, 'inc')}
              onMouseEnter={() => setHoveredButton('inc')}
              onMouseLeave={() => setHoveredButton(null)}
              aria-label="Increase value"
              aria-disabled={!canIncrement}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {(helperText || errorMessage) && (
          <p 
            id={error && errorMessage ? `${generatedId}-error` : undefined}
            style={helperStyle}
            role={error ? 'alert' : undefined}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    )
  }
)

NumberStepper.displayName = "NumberStepper"

export { NumberStepper, NUMBER_STEPPER_TOKENS }
