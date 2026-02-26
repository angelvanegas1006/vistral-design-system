import * as React from 'react'
import { forwardRef, useId } from 'react'
import { Check, Minus } from 'lucide-react'

/**
 * Checkbox Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=360-4634
 */
const CHECKBOX_TOKENS = {
  // States
  unchecked: {
    bg: '#ffffff',
    border: '#d4d4d8', // zinc-300
    borderHover: '#a1a1aa', // zinc-400
  },
  checked: {
    bg: '#2050f6', // spaceblue-600
    border: '#2050f6',
    bgHover: '#1337e2', // spaceblue-700
    fg: '#ffffff',
  },
  indeterminate: {
    bg: '#2050f6',
    border: '#2050f6',
    bgHover: '#1337e2',
    fg: '#ffffff',
  },
  disabled: {
    bg: '#f4f4f5', // zinc-100
    border: '#e4e4e7', // zinc-200
    fg: '#a1a1aa', // zinc-400
  },
  error: {
    bg: '#ffffff',
    border: '#ef4444', // red-500
  },
  containerHover: {
    bg: '#fafafa',
  },
  // Sizes
  size: 20,
  radius: 4,
  iconSize: 14,
  // Label
  labelGap: 8,
  // Focus ring
  focusRing: '0 0 0 3px rgba(32, 80, 246, 0.2)',
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
  /** Position of checkbox relative to label */
  position?: 'left' | 'right'
  /** Show hover background on container */
  showHoverBg?: boolean
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      error = false,
      disabled = false,
      label,
      description,
      position = 'left',
      showHoverBg = false,
      onCheckedChange,
      onChange,
      style,
      className: _className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    const getBoxCssVars = (): Record<string, string> => {
      if (disabled) {
        return {
          '--v-bg': CHECKBOX_TOKENS.disabled.bg,
          '--v-border': CHECKBOX_TOKENS.disabled.border,
        }
      }
      if (checked || indeterminate) {
        const state = indeterminate ? CHECKBOX_TOKENS.indeterminate : CHECKBOX_TOKENS.checked
        return {
          '--v-bg': state.bg,
          '--v-bg-hover': state.bgHover,
          '--v-border': state.border,
          '--v-border-hover': state.border,
        }
      }
      if (error) {
        return {
          '--v-bg': CHECKBOX_TOKENS.unchecked.bg,
          '--v-border': CHECKBOX_TOKENS.error.border,
          '--v-border-hover': CHECKBOX_TOKENS.error.border,
        }
      }
      return {
        '--v-bg': CHECKBOX_TOKENS.unchecked.bg,
        '--v-border': CHECKBOX_TOKENS.unchecked.border,
        '--v-border-hover': CHECKBOX_TOKENS.unchecked.borderHover,
      }
    }

    const getFg = () => {
      if (disabled) return CHECKBOX_TOKENS.disabled.fg
      if (checked || indeterminate) {
        return indeterminate ? CHECKBOX_TOKENS.indeterminate.fg : CHECKBOX_TOKENS.checked.fg
      }
      return '#ffffff'
    }

    const boxCssVars = getBoxCssVars()

    const containerCssVars: Record<string, string> = showHoverBg
      ? { '--v-bg-hover': CHECKBOX_TOKENS.containerHover.bg }
      : {}

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: CHECKBOX_TOKENS.labelGap,
      flexDirection: position === 'right' ? 'row-reverse' : 'row',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      padding: showHoverBg ? '8px' : '0',
      borderRadius: showHoverBg ? 8 : 0,
      transition: 'background-color 150ms ease',
      ...containerCssVars,
      ...style,
    }

    const checkboxWrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: CHECKBOX_TOKENS.size,
      height: CHECKBOX_TOKENS.size,
      flexShrink: 0,
      marginTop: description ? 1 : 0,
    }

    const visualBoxStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: CHECKBOX_TOKENS.radius,
      pointerEvents: 'none',
      ...boxCssVars,
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
      flex: 1,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.4,
      color: disabled ? '#a1a1aa' : error ? '#ef4444' : '#18181b',
      fontFamily: 'var(--vistral-font-family-sans)',
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: disabled ? '#d4d4d8' : '#71717a',
      fontFamily: 'var(--vistral-font-family-sans)',
    }

    const IconComponent = indeterminate ? Minus : Check
    const showIcon = checked || indeterminate

    return (
      <label
        data-vistral-interactive
        {...(disabled ? { 'data-disabled': '' } : {})}
        style={containerStyle}
        htmlFor={id}
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
            aria-checked={indeterminate ? 'mixed' : checked}
            {...props}
          />
          <span data-vistral="checkbox-box" style={visualBoxStyle}>
            {showIcon && (
              <IconComponent size={CHECKBOX_TOKENS.iconSize} color={getFg()} strokeWidth={3} />
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

Checkbox.displayName = 'Checkbox'

// ============================================================================
// Checkbox Group (for managing multiple checkboxes)
// ============================================================================
export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for the group */
  label?: React.ReactNode
  /** Error message */
  error?: React.ReactNode
  /** Orientation */
  orientation?: 'vertical' | 'horizontal'
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, error, orientation = 'vertical', style, children, ...props }, ref) => {
    const groupStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      gap: orientation === 'horizontal' ? 24 : 12,
      ...style,
    }

    const errorStyle: React.CSSProperties = {
      fontSize: 13,
      color: '#ef4444',
      marginTop: 8,
      fontFamily: 'var(--vistral-font-family-sans)',
    }

    return (
      <div ref={ref} role="group" {...props}>
        {label && (
          <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600, color: '#18181b' }}>
            {label}
          </div>
        )}
        <div style={groupStyle}>{children}</div>
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

export { Checkbox, CheckboxGroup, CHECKBOX_TOKENS }
