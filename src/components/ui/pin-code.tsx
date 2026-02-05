import * as React from 'react'
import { forwardRef, useState, useRef, useEffect } from 'react'

/**
 * Pin Code Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2846-3094
 */
const PIN_CODE_TOKENS = {
  // Cell
  cell: {
    size: 48,
    fontSize: 24,
    fontWeight: 500, // Medium weight
    bg: '#ffffff',
    border: '#d4d4d8',
    borderFocus: '#2050f6',
    borderError: '#dc2626',
    borderSuccess: '#16a34a',
    radius: 8,
  },
  // Gap
  gap: 8,
} as const

export interface PinCodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Number of digits */
  length?: number
  /** Current value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Callback when all digits entered */
  onComplete?: (value: string) => void
  /** Mask input (for passwords) */
  mask?: boolean
  /** Error state */
  error?: boolean
  /** Success state */
  success?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Auto focus first input */
  autoFocus?: boolean
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const PinCode = forwardRef<HTMLDivElement, PinCodeProps>(
  (
    {
      length = 6,
      value = '',
      onChange,
      onComplete,
      mask = false,
      error = false,
      success = false,
      disabled = false,
      autoFocus = true,
      label,
      helperText,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = useState<string[]>(Array(length).fill(''))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const sizeStyles = {
      sm: { size: 40, fontSize: 20 },
      md: { size: 48, fontSize: 24 },
      lg: { size: 56, fontSize: 28 },
    }

    const currentSize = sizeStyles[size]

    // Sync with external value
    useEffect(() => {
      if (value) {
        const chars = value.split('').slice(0, length)
        setValues([...chars, ...Array(length - chars.length).fill('')])
      }
    }, [value, length])

    // Auto focus first input
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    const getBorderColor = (index: number, focused: boolean) => {
      if (error) return PIN_CODE_TOKENS.cell.borderError
      if (success) return PIN_CODE_TOKENS.cell.borderSuccess
      if (focused) return PIN_CODE_TOKENS.cell.borderFocus
      return PIN_CODE_TOKENS.cell.border
    }

    const handleChange = (index: number, char: string) => {
      if (disabled) return

      // Only allow single digit
      const digit = char.replace(/\D/g, '').slice(-1)

      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      const newValue = newValues.join('')
      onChange?.(newValue)

      // Move to next input if digit entered
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      // Call onComplete when all filled
      if (newValues.every(v => v) && newValues.length === length) {
        onComplete?.(newValue)
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          // Move to previous input on backspace if current is empty
          inputRefs.current[index - 1]?.focus()
        }
        const newValues = [...values]
        newValues[index] = ''
        setValues(newValues)
        onChange?.(newValues.join(''))
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      if (disabled) return

      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      const chars = pastedData.split('')
      const newValues = [...chars, ...Array(length - chars.length).fill('')]
      setValues(newValues)
      onChange?.(newValues.join(''))

      // Focus last filled or next empty
      const lastIndex = Math.min(chars.length, length - 1)
      inputRefs.current[lastIndex]?.focus()

      if (chars.length === length) {
        onComplete?.(pastedData)
      }
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const inputsContainerStyle: React.CSSProperties = {
      display: 'flex',
      gap: PIN_CODE_TOKENS.gap,
    }

    const getCellStyle = (index: number, focused: boolean): React.CSSProperties => ({
      width: currentSize.size,
      height: currentSize.size,
      textAlign: 'center',
      fontSize: currentSize.fontSize,
      fontWeight: PIN_CODE_TOKENS.cell.fontWeight,
      fontFamily: 'inherit',
      backgroundColor: PIN_CODE_TOKENS.cell.bg,
      border: `2px solid ${getBorderColor(index, focused)}`,
      borderRadius: PIN_CODE_TOKENS.cell.radius,
      outline: 'none',
      transition: 'border-color 150ms ease',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
    })

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {label && (
          <label
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#18181b',
            }}
          >
            {label}
          </label>
        )}

        <div style={inputsContainerStyle}>
          {Array.from({ length }).map((_, index) => (
            <PinCell
              key={index}
              ref={el => {
                inputRefs.current[index] = el
              }}
              value={values[index]}
              mask={mask}
              disabled={disabled}
              style={getCellStyle}
              index={index}
              onChange={char => handleChange(index, char)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
            />
          ))}
        </div>

        {helperText && (
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: error ? '#dc2626' : success ? '#16a34a' : '#71717a',
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

PinCode.displayName = 'PinCode'

// ============================================================================
// Pin Cell (individual input)
// ============================================================================
interface PinCellProps {
  value: string
  mask: boolean
  disabled: boolean
  style: (index: number, focused: boolean) => React.CSSProperties
  index: number
  onChange: (char: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste?: (e: React.ClipboardEvent) => void
}

const PinCell = forwardRef<HTMLInputElement, PinCellProps>(
  ({ value, mask, disabled, style, index, onChange, onKeyDown, onPaste }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <input
        ref={ref}
        type={mask ? 'password' : 'text'}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={value}
        disabled={disabled}
        style={style(index, isFocused)}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="one-time-code"
      />
    )
  }
)

PinCell.displayName = 'PinCell'

export { PinCode, PIN_CODE_TOKENS }
