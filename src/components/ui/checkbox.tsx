import * as React from "react"
import { forwardRef, useId } from "react"
import { Check, Minus } from "lucide-react"

/**
 * Checkbox Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=261-4582
 */
const CHECKBOX_TOKENS = {
  // States
  unchecked: {
    bg: '#ffffff',
    border: '#d4d4d8',    // zinc-300
    borderHover: '#a1a1aa', // zinc-400
  },
  checked: {
    bg: '#2050f6',        // spaceblue-600
    border: '#2050f6',
    fg: '#ffffff',
  },
  indeterminate: {
    bg: '#2050f6',
    border: '#2050f6',
    fg: '#ffffff',
  },
  disabled: {
    bg: '#f4f4f5',        // zinc-100
    border: '#e4e4e7',    // zinc-200
    fg: '#a1a1aa',        // zinc-400
  },
  error: {
    bg: '#ffffff',
    border: '#ef4444',    // red-500
  },
  // Sizes
  size: 20,
  radius: 4,
  iconSize: 14,
  // Label
  labelGap: 8,
} as const

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Checked state */
  checked?: boolean
  /** Indeterminate state (shows minus icon) */
  indeterminate?: boolean
  /** Error state */
  error?: boolean
  /** Label text */
  label?: React.ReactNode
  /** Description below label */
  description?: React.ReactNode
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    checked = false,
    indeterminate = false,
    error = false,
    disabled = false,
    label,
    description,
    onCheckedChange,
    onChange,
    style,
    className,
    id: providedId,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const generatedId = useId()
    const id = providedId || generatedId

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    // Determine visual state
    const getStateTokens = () => {
      if (disabled) return CHECKBOX_TOKENS.disabled
      if (checked || indeterminate) return indeterminate ? CHECKBOX_TOKENS.indeterminate : CHECKBOX_TOKENS.checked
      if (error) return { ...CHECKBOX_TOKENS.unchecked, border: CHECKBOX_TOKENS.error.border }
      return CHECKBOX_TOKENS.unchecked
    }

    const stateTokens = getStateTokens()

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: CHECKBOX_TOKENS.labelGap,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      ...style,
    }

    const checkboxWrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: CHECKBOX_TOKENS.size,
      height: CHECKBOX_TOKENS.size,
      flexShrink: 0,
    }

    const visualBoxStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: stateTokens.bg,
      border: `2px solid ${isHovered && !disabled && !checked && !indeterminate 
        ? CHECKBOX_TOKENS.unchecked.borderHover 
        : stateTokens.border}`,
      borderRadius: CHECKBOX_TOKENS.radius,
      transition: 'all 150ms ease-in-out',
      pointerEvents: 'none',
    }

    const inputStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }

    const labelContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: 1,
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

    const IconComponent = indeterminate ? Minus : Check
    const showIcon = checked || indeterminate

    return (
      <label 
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span style={checkboxWrapperStyle}>
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            style={inputStyle}
            aria-invalid={error}
            {...props}
          />
          <span style={visualBoxStyle}>
            {showIcon && (
              <IconComponent 
                size={CHECKBOX_TOKENS.iconSize} 
                color={'fg' in stateTokens ? stateTokens.fg : '#ffffff'}
                strokeWidth={3}
              />
            )}
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

Checkbox.displayName = "Checkbox"

export { Checkbox, CHECKBOX_TOKENS }
