import * as React from "react"
import { forwardRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

/**
 * Number Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=181-3236
 */
const NUMBER_INPUT_TOKENS = {
  // Container
  height: 40,
  bg: '#ffffff',
  border: '#d4d4d8',
  borderFocus: '#2050f6',
  borderError: '#dc2626',
  radius: 8,
  // Button
  button: {
    width: 36,
    bg: '#f4f4f5',
    bgHover: '#e4e4e7',
    bgDisabled: '#fafafa',
    fg: '#18181b',
    fgDisabled: '#a1a1aa',
  },
  // Input
  input: {
    fontSize: 14,
    fontWeight: 500,
  },
} as const

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  /** Current value */
  value?: number
  /** Default value */
  defaultValue?: number
  /** Callback when value changes */
  onChange?: (value: number) => void
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Disabled state */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Hide buttons */
  hideButtons?: boolean
  /** Format function */
  formatValue?: (value: number) => string
  /** Parse function */
  parseValue?: (value: string) => number
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min,
    max,
    step = 1,
    disabled = false,
    error = false,
    label,
    helperText,
    hideButtons = false,
    formatValue,
    parseValue,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const clamp = (val: number) => {
      let clamped = val
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    }

    const setValue = (newValue: number) => {
      const clamped = clamp(newValue)
      if (!isControlled) {
        setInternalValue(clamped)
      }
      onChange?.(clamped)
    }

    const increment = () => {
      if (disabled) return
      setValue(value + step)
    }

    const decrement = () => {
      if (disabled) return
      setValue(value - step)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      setInputValue(raw)
      
      const parsed = parseValue ? parseValue(raw) : parseFloat(raw)
      if (!isNaN(parsed)) {
        setValue(parsed)
      }
    }

    const handleBlur = () => {
      setIsFocused(false)
      setInputValue('')
    }

    const handleFocus = () => {
      setIsFocused(true)
      setInputValue(formatValue ? formatValue(value) : value.toString())
    }

    const displayValue = isFocused 
      ? inputValue 
      : (formatValue ? formatValue(value) : value.toString())

    const canDecrement = min === undefined || value > min
    const canIncrement = max === undefined || value < max

    const getBorderColor = () => {
      if (error) return NUMBER_INPUT_TOKENS.borderError
      if (isFocused) return NUMBER_INPUT_TOKENS.borderFocus
      return NUMBER_INPUT_TOKENS.border
    }

    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'stretch',
      height: NUMBER_INPUT_TOKENS.height,
      backgroundColor: NUMBER_INPUT_TOKENS.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: NUMBER_INPUT_TOKENS.radius,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color 150ms ease',
    }

    const buttonStyle = (canClick: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: NUMBER_INPUT_TOKENS.button.width,
      backgroundColor: NUMBER_INPUT_TOKENS.button.bg,
      border: 'none',
      cursor: canClick && !disabled ? 'pointer' : 'not-allowed',
      color: canClick && !disabled ? NUMBER_INPUT_TOKENS.button.fg : NUMBER_INPUT_TOKENS.button.fgDisabled,
      transition: 'background-color 150ms ease',
    })

    const inputStyle: React.CSSProperties = {
      flex: 1,
      textAlign: 'center',
      border: 'none',
      outline: 'none',
      fontSize: NUMBER_INPUT_TOKENS.input.fontSize,
      fontWeight: NUMBER_INPUT_TOKENS.input.fontWeight,
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
      MozAppearance: 'textfield',
    }

    return (
      <div style={wrapperStyle}>
        {label && (
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: '#18181b' }}>
            {label}
          </label>
        )}

        <div style={containerStyle}>
          {!hideButtons && (
            <button
              type="button"
              style={buttonStyle(canDecrement)}
              onClick={decrement}
              disabled={disabled || !canDecrement}
              tabIndex={-1}
            >
              <Minus size={16} />
            </button>
          )}
          
          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            style={inputStyle}
            {...props}
          />
          
          {!hideButtons && (
            <button
              type="button"
              style={buttonStyle(canIncrement)}
              onClick={increment}
              disabled={disabled || !canIncrement}
              tabIndex={-1}
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        {helperText && (
          <p style={{ margin: '6px 0 0', fontSize: 12, color: error ? '#dc2626' : '#71717a' }}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"

export { NumberInput, NUMBER_INPUT_TOKENS }
