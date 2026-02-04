import * as React from "react"
import { forwardRef, useId } from "react"
import type { LucideIcon } from "lucide-react"

/**
 * Input Design Tokens from Figma
 * Based on the input/text field patterns in the design system
 */
const INPUT_TOKENS = {
  // States
  default: {
    bg: '#ffffff',
    border: '#d4d4d8',       // zinc-300
    borderHover: '#a1a1aa',  // zinc-400
    borderFocus: '#2050f6',  // spaceblue-600
    fg: '#18181b',           // zinc-900
    placeholder: '#a1a1aa',  // zinc-400
  },
  error: {
    bg: '#ffffff',
    border: '#ef4444',       // red-500
    borderFocus: '#ef4444',
    fg: '#18181b',
  },
  disabled: {
    bg: '#f4f4f5',           // zinc-100
    border: '#e4e4e7',       // zinc-200
    fg: '#a1a1aa',           // zinc-400
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
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Left icon */
  leftIcon?: LucideIcon
  /** Right icon */
  rightIcon?: LucideIcon
  /** Full width */
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    size = 'md',
    error = false,
    errorMessage,
    label,
    helperText,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    fullWidth = false,
    disabled,
    id: providedId,
    style,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const generatedId = useId()
    const id = providedId || generatedId

    const sizeTokens = INPUT_TOKENS.sizes[size]
    const stateTokens = disabled 
      ? INPUT_TOKENS.disabled 
      : error 
        ? INPUT_TOKENS.error 
        : INPUT_TOKENS.default

    // Get border color based on state
    const getBorderColor = () => {
      if (disabled) return stateTokens.border
      if (isFocused) return error ? INPUT_TOKENS.error.borderFocus : INPUT_TOKENS.default.borderFocus
      if (isHovered) return INPUT_TOKENS.default.borderHover
      return stateTokens.border
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: fullWidth ? '100%' : undefined,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: 14,
      fontWeight: 500,
      color: disabled ? '#a1a1aa' : error ? '#ef4444' : '#18181b', // Red on error
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const inputWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }

    const inputStyle: React.CSSProperties = {
      width: '100%',
      height: sizeTokens.height,
      paddingLeft: LeftIcon ? sizeTokens.height : sizeTokens.paddingX,
      paddingRight: RightIcon ? sizeTokens.height : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: stateTokens.fg,
      backgroundColor: stateTokens.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: INPUT_TOKENS.radius,
      outline: 'none',
      transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
      boxShadow: isFocused && !disabled 
        ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(32, 80, 246, 0.15)'}` 
        : 'none',
      cursor: disabled ? 'not-allowed' : 'text',
      boxSizing: 'border-box',
      ...style,
    }

    const iconStyle = (position: 'left' | 'right'): React.CSSProperties => ({
      position: 'absolute',
      [position]: sizeTokens.paddingX,
      color: disabled ? '#d4d4d8' : '#71717a',
      pointerEvents: 'none',
    })

    const helperStyle: React.CSSProperties = {
      fontSize: 13,
      color: error ? '#ef4444' : '#71717a',
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
        
        <div 
          style={inputWrapperStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {LeftIcon && <LeftIcon size={sizeTokens.iconSize} style={iconStyle('left')} />}
          
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            style={inputStyle}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e) }}
            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e) }}
            aria-invalid={error}
            aria-describedby={helperText || errorMessage ? `${id}-helper` : undefined}
            {...props}
          />
          
          {RightIcon && <RightIcon size={sizeTokens.iconSize} style={iconStyle('right')} />}
        </div>
        
        {(helperText || errorMessage) && (
          <p id={`${id}-helper`} style={helperStyle}>
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

// ============================================================================
// Textarea
// ============================================================================
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Full width */
  fullWidth?: boolean
  /** Auto resize */
  autoResize?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    error = false,
    errorMessage,
    label,
    helperText,
    fullWidth = false,
    autoResize = false,
    disabled,
    id: providedId,
    style,
    rows = 3,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const generatedId = useId()
    const id = providedId || generatedId

    const stateTokens = disabled 
      ? INPUT_TOKENS.disabled 
      : error 
        ? INPUT_TOKENS.error 
        : INPUT_TOKENS.default

    const getBorderColor = () => {
      if (disabled) return stateTokens.border
      if (isFocused) return error ? INPUT_TOKENS.error.borderFocus : INPUT_TOKENS.default.borderFocus
      if (isHovered) return INPUT_TOKENS.default.borderHover
      return stateTokens.border
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: fullWidth ? '100%' : undefined,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: 14,
      fontWeight: 500,
      color: disabled ? '#a1a1aa' : error ? '#ef4444' : '#18181b', // Red on error
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
      boxShadow: isFocused && !disabled 
        ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(32, 80, 246, 0.15)'}` 
        : 'none',
      cursor: disabled ? 'not-allowed' : 'text',
      resize: autoResize ? 'none' : 'vertical',
      minHeight: autoResize ? 'auto' : undefined,
      boxSizing: 'border-box',
      lineHeight: 1.5,
      ...style,
    }

    const helperStyle: React.CSSProperties = {
      fontSize: 13,
      color: error ? '#ef4444' : '#71717a',
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
          ref={ref}
          id={id}
          disabled={disabled}
          rows={rows}
          style={textareaStyle}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e) }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-invalid={error}
          aria-describedby={helperText || errorMessage ? `${id}-helper` : undefined}
          {...props}
        />
        
        {(helperText || errorMessage) && (
          <p id={`${id}-helper`} style={helperStyle}>
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Input, Textarea, INPUT_TOKENS }
