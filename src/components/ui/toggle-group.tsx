import * as React from 'react'
import { forwardRef, createContext, useContext } from 'react'

/**
 * Toggle Group Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4525-32224
 */
const TOGGLE_GROUP_TOKENS = {
  // Container
  container: {
    bg: '#f4f4f5',
    radius: 8,
    padding: 4,
  },
  // Item
  item: {
    height: 32,
    paddingX: 12,
    fontSize: 13,
    fontWeight: 500,
    radius: 6,
    // States
    fg: '#71717a',
    fgActive: '#18181b',
    bgActive: '#ffffff',
    shadowActive: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
} as const

// ============================================================================
// Context
// ============================================================================
type ToggleGroupContextValue = {
  value: string | string[]
  onValueChange: (value: string) => void
  multiple: boolean
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

function useToggleGroup() {
  const context = useContext(ToggleGroupContext)
  if (!context) {
    throw new Error('ToggleGroupItem must be used within a ToggleGroup')
  }
  return context
}

// ============================================================================
// Toggle Group Root
// ============================================================================
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected value(s) */
  value?: string | string[]
  /** Default value */
  defaultValue?: string | string[]
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void
  /** Allow multiple selection */
  multiple?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      multiple = false,
      disabled = false,
      size = 'md',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue ?? (multiple ? [] : '')
    )

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleValueChange = (itemValue: string) => {
      if (disabled) return

      let newValue: string | string[]

      if (multiple) {
        const currentArray = Array.isArray(value) ? value : []
        if (currentArray.includes(itemValue)) {
          newValue = currentArray.filter(v => v !== itemValue)
        } else {
          newValue = [...currentArray, itemValue]
        }
      } else {
        newValue = value === itemValue ? '' : itemValue
      }

      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: TOGGLE_GROUP_TOKENS.container.padding,
      backgroundColor: TOGGLE_GROUP_TOKENS.container.bg,
      borderRadius: TOGGLE_GROUP_TOKENS.container.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      opacity: disabled ? 0.5 : 1,
      ...style,
    }

    return (
      <ToggleGroupContext.Provider value={{ value, onValueChange: handleValueChange, multiple }}>
        <div ref={ref} role="group" style={containerStyle} data-size={size} {...props}>
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { size } as any)
            }
            return child
          })}
        </div>
      </ToggleGroupContext.Provider>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'

// ============================================================================
// Toggle Group Item
// ============================================================================
export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value for this item */
  value: string
  /** Size (set by parent) */
  size?: 'sm' | 'md' | 'lg'
}

const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value: itemValue, size = 'md', disabled, style, children, ...props }, ref) => {
    const { value, onValueChange, multiple } = useToggleGroup()

    const isSelected = multiple
      ? Array.isArray(value) && value.includes(itemValue)
      : value === itemValue

    const sizeStyles = {
      sm: { height: 28, paddingX: 10, fontSize: 12 },
      md: { height: 32, paddingX: 12, fontSize: 13 },
      lg: { height: 36, paddingX: 14, fontSize: 14 },
    }

    const currentSize = sizeStyles[size]

    const itemStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: currentSize.height,
      padding: `0 ${currentSize.paddingX}px`,
      fontSize: currentSize.fontSize,
      fontWeight: TOGGLE_GROUP_TOKENS.item.fontWeight,
      fontFamily: 'inherit',
      color: isSelected ? TOGGLE_GROUP_TOKENS.item.fgActive : TOGGLE_GROUP_TOKENS.item.fg,
      backgroundColor: isSelected ? TOGGLE_GROUP_TOKENS.item.bgActive : 'transparent',
      boxShadow: isSelected ? TOGGLE_GROUP_TOKENS.item.shadowActive : 'none',
      border: 'none',
      borderRadius: TOGGLE_GROUP_TOKENS.item.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease',
      whiteSpace: 'nowrap',
      ...style,
    }

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        disabled={disabled}
        style={itemStyle}
        onClick={() => onValueChange(itemValue)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem, TOGGLE_GROUP_TOKENS }
