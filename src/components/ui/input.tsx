import * as React from 'react'
import { forwardRef, useId } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'

/**
 * Text Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=181-3410
 */
const INPUT_TOKENS = {
  // States
  default: {
    bg: '#ffffff',
    border: '#d4d4d8', // zinc-300
    borderHover: '#a1a1aa', // zinc-400
    borderFocus: '#2050f6', // spaceblue-600
    fg: '#18181b', // zinc-900
    placeholder: '#a1a1aa', // zinc-400
  },
  error: {
    bg: '#ffffff',
    border: '#ef4444', // red-500
    borderFocus: '#ef4444',
    fg: '#18181b',
    helperText: '#ef4444',
  },
  disabled: {
    bg: '#f4f4f5', // zinc-100
    border: '#e4e4e7', // zinc-200
    fg: '#a1a1aa', // zinc-400
    placeholder: '#a1a1aa',
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
    colorError: '#ef4444',
    colorDisabled: '#a1a1aa',
  },
  // Helper text
  helperText: {
    fontSize: 13,
    color: '#71717a',
    colorError: '#ef4444',
  },
  // Character counter
  counter: {
    fontSize: 12,
    color: '#a1a1aa',
  },
  // Suffix
  suffix: {
    fontSize: 14,
    color: '#71717a',
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 10, fontSize: 13, iconSize: 16 },
    md: { height: 40, paddingX: 12, fontSize: 14, iconSize: 18 },
    lg: { height: 48, paddingX: 14, fontSize: 16, iconSize: 20 },
  },
  // Radius
  radius: 8,
} as const

type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: InputSize
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Label text (always present per Figma) */
  label?: string
  /** Helper text */
  helperText?: string
  /** Left icon */
  leftIcon?: LucideIcon
  /** Right icon */
  rightIcon?: LucideIcon
  /** Full width */
  fullWidth?: boolean
  /** Character counter (shows current/max) */
  maxLength?: number
  /** Show character counter */
  showCounter?: boolean
  /** Suffix text (fixed value below input) */
  suffix?: string
  /** Optional label indicator */
  optional?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      errorMessage,
      label,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      fullWidth = false,
      disabled,
      maxLength,
      showCounter = false,
      suffix,
      optional = false,
      id: providedId,
      style,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value || '')
    const generatedId = useId()
    const id = providedId || generatedId

    React.useEffect(() => {
      setCurrentValue(value?.toString() || '')
    }, [value])

    const sizeTokens = INPUT_TOKENS.sizes[size]
    const stateTokens = disabled
      ? INPUT_TOKENS.disabled
      : error
        ? INPUT_TOKENS.error
        : INPUT_TOKENS.default

    // Get border color based on state
    const getBorderColor = () => {
      if (disabled) return stateTokens.border
      if (isFocused)
        return error ? INPUT_TOKENS.error.borderFocus : INPUT_TOKENS.default.borderFocus
      if (isHovered) return INPUT_TOKENS.default.borderHover
      return stateTokens.border
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setCurrentValue(newValue)
      onChange?.(e)
    }

    const characterCount = currentValue.toString().length
    const showCharacterCounter = showCounter && maxLength !== undefined

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: fullWidth ? '100%' : undefined,
    }

    const labelWrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: INPUT_TOKENS.label.fontSize,
      fontWeight: INPUT_TOKENS.label.fontWeight,
      color: disabled
        ? INPUT_TOKENS.label.colorDisabled
        : error
          ? INPUT_TOKENS.label.colorError
          : INPUT_TOKENS.label.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const optionalStyle: React.CSSProperties = {
      fontSize: 12,
      fontWeight: 400,
      color: '#a1a1aa',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const inputWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }

    // Calculate padding to accommodate icons and counter
    const iconPadding = sizeTokens.paddingX + sizeTokens.iconSize + 12

    const inputStyle: React.CSSProperties = {
      width: '100%',
      height: sizeTokens.height,
      paddingLeft: LeftIcon ? iconPadding : sizeTokens.paddingX,
      paddingRight: RightIcon || showCharacterCounter ? iconPadding : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: stateTokens.fg,
      backgroundColor: stateTokens.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: INPUT_TOKENS.radius,
      outline: 'none',
      transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
      boxShadow:
        isFocused && !disabled
          ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(32, 80, 246, 0.15)'}`
          : 'none',
      cursor: disabled ? 'not-allowed' : 'text',
      boxSizing: 'border-box',
      ...style,
    }

    const iconStyle = (position: 'left' | 'right'): React.CSSProperties => ({
      position: 'absolute',
      [position]: sizeTokens.paddingX,
      top: '50%',
      transform: 'translateY(-50%)',
      color: disabled ? '#d4d4d8' : '#71717a',
      pointerEvents: 'none',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })

    const counterStyle: React.CSSProperties = {
      position: 'absolute',
      right: sizeTokens.paddingX,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: INPUT_TOKENS.counter.fontSize,
      color: INPUT_TOKENS.counter.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      pointerEvents: 'none',
      zIndex: 1,
    }

    const helperWrapperStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    }

    const helperStyle: React.CSSProperties = {
      fontSize: INPUT_TOKENS.helperText.fontSize,
      color: error ? INPUT_TOKENS.helperText.colorError : INPUT_TOKENS.helperText.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      flex: 1,
    }

    const suffixStyle: React.CSSProperties = {
      fontSize: INPUT_TOKENS.suffix.fontSize,
      color: INPUT_TOKENS.suffix.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
    }

    return (
      <div style={containerStyle}>
        {label && (
          <div style={labelWrapperStyle}>
            <label htmlFor={id} style={labelStyle}>
              {label}
            </label>
            {optional && <span style={optionalStyle}>Optional</span>}
          </div>
        )}

        <div
          style={inputWrapperStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {LeftIcon && (
            <div style={iconStyle('left')}>
              <LeftIcon size={sizeTokens.iconSize} />
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            maxLength={maxLength}
            value={currentValue}
            onChange={handleChange}
            style={inputStyle}
            onFocus={e => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={e => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            aria-invalid={error}
            aria-describedby={helperText || errorMessage || suffix ? `${id}-helper` : undefined}
            aria-required={!optional}
            {...props}
          />

          {showCharacterCounter && (
            <div style={counterStyle}>
              {characterCount}/{maxLength}
            </div>
          )}

          {RightIcon && !showCharacterCounter && (
            <div style={iconStyle('right')}>
              <RightIcon
                size={sizeTokens.iconSize}
                style={{
                  animation: RightIcon === Loader2 ? 'spin 1s linear infinite' : undefined,
                }}
              />
            </div>
          )}
        </div>

        {(helperText || errorMessage || suffix) && (
          <div style={helperWrapperStyle}>
            <p id={`${id}-helper`} style={helperStyle}>
              {error ? errorMessage : helperText}
            </p>
            {suffix && <span style={suffixStyle}>{suffix}</span>}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ============================================================================
// Textarea
// ============================================================================
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Label text (always present per Figma) */
  label?: string
  /** Helper text */
  helperText?: string
  /** Full width */
  fullWidth?: boolean
  /** Auto resize */
  autoResize?: boolean
  /** Character counter (shows current/max) */
  maxLength?: number
  /** Show character counter */
  showCounter?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      errorMessage,
      label,
      helperText,
      fullWidth = false,
      autoResize = false,
      disabled,
      maxLength,
      showCounter = false,
      id: providedId,
      style,
      rows = 3,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value || '')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const generatedId = useId()
    const id = providedId || generatedId

    React.useEffect(() => {
      setCurrentValue(value?.toString() || '')
    }, [value])

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [currentValue, autoResize])

    const stateTokens = disabled
      ? INPUT_TOKENS.disabled
      : error
        ? INPUT_TOKENS.error
        : INPUT_TOKENS.default

    const getBorderColor = () => {
      if (disabled) return stateTokens.border
      if (isFocused)
        return error ? INPUT_TOKENS.error.borderFocus : INPUT_TOKENS.default.borderFocus
      if (isHovered) return INPUT_TOKENS.default.borderHover
      return stateTokens.border
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setCurrentValue(newValue)
      onChange?.(e)
    }

    const characterCount = currentValue.toString().length
    const showCharacterCounter = showCounter && maxLength !== undefined

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: fullWidth ? '100%' : undefined,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: INPUT_TOKENS.label.fontSize,
      fontWeight: INPUT_TOKENS.label.fontWeight,
      color: disabled
        ? INPUT_TOKENS.label.colorDisabled
        : error
          ? INPUT_TOKENS.label.colorError
          : INPUT_TOKENS.label.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const textareaStyle: React.CSSProperties = {
      width: '100%',
      padding: 12,
      fontSize: 14,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: stateTokens.fg,
      backgroundColor: stateTokens.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: INPUT_TOKENS.radius,
      outline: 'none',
      transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
      boxShadow:
        isFocused && !disabled
          ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(32, 80, 246, 0.15)'}`
          : 'none',
      cursor: disabled ? 'not-allowed' : 'text',
      resize: autoResize ? 'none' : 'vertical',
      minHeight: autoResize ? 'auto' : undefined,
      boxSizing: 'border-box',
      lineHeight: 1.5,
      ...style,
    }

    const helperWrapperStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    }

    const helperStyle: React.CSSProperties = {
      fontSize: INPUT_TOKENS.helperText.fontSize,
      color: error ? INPUT_TOKENS.helperText.colorError : INPUT_TOKENS.helperText.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      flex: 1,
    }

    const counterStyle: React.CSSProperties = {
      fontSize: INPUT_TOKENS.counter.fontSize,
      color: INPUT_TOKENS.counter.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
    }

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={id} style={labelStyle}>
            {label}
          </label>
        )}

        <textarea
          ref={textareaRef}
          id={id}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          value={currentValue}
          onChange={handleChange}
          style={textareaStyle}
          onFocus={e => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={e => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-invalid={error}
          aria-describedby={
            helperText || errorMessage || showCharacterCounter ? `${id}-helper` : undefined
          }
          {...props}
        />

        {(helperText || errorMessage || showCharacterCounter) && (
          <div style={helperWrapperStyle}>
            <p id={`${id}-helper`} style={helperStyle}>
              {error ? errorMessage : helperText}
            </p>
            {showCharacterCounter && (
              <span style={counterStyle}>
                {characterCount}/{maxLength} characters
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, Textarea, INPUT_TOKENS }
