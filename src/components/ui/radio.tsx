import * as React from "react"
import { forwardRef, useId, createContext, useContext } from "react"

/**
 * Radio Design Tokens from Figma
 */
const RADIO_TOKENS = {
  // Outer circle
  outer: {
    size: 20,
    border: '#d4d4d8',       // zinc-300
    borderHover: '#a1a1aa',  // zinc-400
    borderChecked: '#2050f6', // spaceblue-600
    borderDisabled: '#e4e4e7', // zinc-200
  },
  // Inner circle (when checked)
  inner: {
    size: 10,
    bg: '#2050f6',          // spaceblue-600
    bgDisabled: '#a1a1aa',  // zinc-400
  },
  // Label
  labelGap: 8,
} as const

// ============================================================================
// Context for RadioGroup
// ============================================================================
type RadioGroupContextValue = {
  name: string
  value: string
  onValueChange: (value: string) => void
  disabled: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  return useContext(RadioGroupContext)
}

// ============================================================================
// RadioGroup
// ============================================================================
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Name for all radios in group */
  name?: string
  /** Controlled value */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Disabled state for all radios */
  disabled?: boolean
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    name: providedName,
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    disabled = false,
    orientation = 'vertical',
    style,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const generatedName = useId()
    const name = providedName || generatedName

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const groupStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      gap: orientation === 'horizontal' ? 16 : 12,
      ...style,
    }

    return (
      <RadioGroupContext.Provider value={{ name, value, onValueChange: handleValueChange, disabled }}>
        <div ref={ref} role="radiogroup" style={groupStyle} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

// ============================================================================
// Radio (individual item)
// ============================================================================
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Value of this radio */
  value: string
  /** Label text */
  label?: React.ReactNode
  /** Description below label */
  description?: React.ReactNode
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({
    value: radioValue,
    label,
    description,
    disabled: localDisabled,
    id: providedId,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const groupContext = useRadioGroup()
    const generatedId = useId()
    const id = providedId || generatedId

    const isInGroup = groupContext !== null
    const name = isInGroup ? groupContext.name : props.name
    const isChecked = isInGroup ? groupContext.value === radioValue : props.checked
    const isDisabled = localDisabled ?? (isInGroup ? groupContext.disabled : false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isInGroup) {
        groupContext.onValueChange(radioValue)
      }
      props.onChange?.(e)
    }

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: RADIO_TOKENS.labelGap,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
    }

    const radioWrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: RADIO_TOKENS.outer.size,
      height: RADIO_TOKENS.outer.size,
      flexShrink: 0,
    }

    const getBorderColor = () => {
      if (isDisabled) return RADIO_TOKENS.outer.borderDisabled
      if (isChecked) return RADIO_TOKENS.outer.borderChecked
      if (isHovered) return RADIO_TOKENS.outer.borderHover
      return RADIO_TOKENS.outer.border
    }

    const outerStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${getBorderColor()}`,
      borderRadius: '50%',
      transition: 'border-color 150ms ease-in-out',
      pointerEvents: 'none',
    }

    const innerStyle: React.CSSProperties = {
      width: RADIO_TOKENS.inner.size,
      height: RADIO_TOKENS.inner.size,
      backgroundColor: isDisabled ? RADIO_TOKENS.inner.bgDisabled : RADIO_TOKENS.inner.bg,
      borderRadius: '50%',
      transform: isChecked ? 'scale(1)' : 'scale(0)',
      transition: 'transform 150ms ease-in-out',
    }

    const inputStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
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
      color: isDisabled ? '#a1a1aa' : '#18181b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: isDisabled ? '#d4d4d8' : '#71717a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    return (
      <label
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span style={radioWrapperStyle}>
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={radioValue}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
            style={inputStyle}
            {...props}
          />
          <span style={outerStyle}>
            <span style={innerStyle} />
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

Radio.displayName = "Radio"

export { RadioGroup, Radio, RADIO_TOKENS }
