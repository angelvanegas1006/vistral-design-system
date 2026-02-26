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
    fontWeight: 500,
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

    useEffect(() => {
      if (value) {
        const chars = value.split('').slice(0, length)
        setValues([...chars, ...Array(length - chars.length).fill('')])
      }
    }, [value, length])

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    const getBorderColor = () => {
      if (error) return PIN_CODE_TOKENS.cell.borderError
      if (success) return PIN_CODE_TOKENS.cell.borderSuccess
      return PIN_CODE_TOKENS.cell.border
    }

    const focusRing = error
      ? '0 0 0 3px rgba(220, 38, 38, 0.15)'
      : success
        ? '0 0 0 3px rgba(22, 163, 74, 0.15)'
        : '0 0 0 3px rgba(32, 80, 246, 0.15)'

    const handleChange = (index: number, char: string) => {
      if (disabled) return

      const digit = char.replace(/\D/g, '').slice(-1)

      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)

      const newValue = newValues.join('')
      onChange?.(newValue)

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      if (newValues.every(v => v) && newValues.length === length) {
        onComplete?.(newValue)
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
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
      fontFamily: 'var(--vistral-font-family-sans)',
      ...style,
    }

    const inputsContainerStyle: React.CSSProperties = {
      display: 'flex',
      gap: PIN_CODE_TOKENS.gap,
    }

    const getCellStyle = (): React.CSSProperties =>
      ({
        '--v-border': getBorderColor(),
        '--v-border-focus': PIN_CODE_TOKENS.cell.borderFocus,
        '--v-focus-ring': disabled ? 'none' : focusRing,
        width: currentSize.size,
        height: currentSize.size,
        textAlign: 'center',
        fontSize: currentSize.fontSize,
        fontWeight: PIN_CODE_TOKENS.cell.fontWeight,
        fontFamily: 'inherit',
        backgroundColor: PIN_CODE_TOKENS.cell.bg,
        border: `2px solid var(--v-border)`,
        borderRadius: PIN_CODE_TOKENS.cell.radius,
        outline: 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'text',
      }) as React.CSSProperties

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
              style={getCellStyle()}
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
  style: React.CSSProperties
  onChange: (char: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste?: (e: React.ClipboardEvent) => void
}

const PinCell = forwardRef<HTMLInputElement, PinCellProps>(
  ({ value, mask, disabled, style, onChange, onKeyDown, onPaste }, ref) => {
    return (
      <input
        ref={ref}
        type={mask ? 'password' : 'text'}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={value}
        disabled={disabled}
        style={style}
        data-vistral="input"
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        autoComplete="one-time-code"
      />
    )
  }
)

PinCell.displayName = 'PinCell'

export { PinCode, PIN_CODE_TOKENS }
