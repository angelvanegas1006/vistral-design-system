import * as React from "react"
import { forwardRef, useId, createContext, useContext, useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

/**
 * Select Design Tokens from Figma
 * Based on dropdown/select patterns in the design system
 */
const SELECT_TOKENS = {
  // Trigger states
  trigger: {
    bg: '#ffffff',
    border: '#d4d4d8',
    borderHover: '#a1a1aa',
    borderFocus: '#2050f6',
    borderError: '#ef4444',
    fg: '#18181b',
    placeholder: '#a1a1aa',
    disabled: {
      bg: '#f4f4f5',
      border: '#e4e4e7',
      fg: '#a1a1aa',
    },
  },
  // Dropdown menu
  menu: {
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 8,
    maxHeight: 256,
  },
  // Option item
  option: {
    height: 40,
    paddingX: 12,
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgSelected: '#eef4ff',
    fg: '#18181b',
    fgSelected: '#2050f6',
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 10, fontSize: 13 },
    md: { height: 40, paddingX: 12, fontSize: 14 },
    lg: { height: 48, paddingX: 14, fontSize: 16 },
  },
  radius: 8,
} as const

type SelectSize = 'sm' | 'md' | 'lg'

// ============================================================================
// Context
// ============================================================================
type SelectContextValue = {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  size: SelectSize
  disabled: boolean
}

const SelectContext = createContext<SelectContextValue | null>(null)

function useSelect() {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select')
  }
  return context
}

// ============================================================================
// Select Root
// ============================================================================
export interface SelectProps {
  /** Controlled value */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Size variant */
  size?: SelectSize
  /** Disabled state */
  disabled?: boolean
  /** Children */
  children: React.ReactNode
}

const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  size = 'md',
  disabled = false,
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen, size, disabled }}>
      {children}
    </SelectContext.Provider>
  )
}

Select.displayName = "Select"

// ============================================================================
// Select Trigger
// ============================================================================
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Placeholder text */
  placeholder?: string
  /** Error state */
  error?: boolean
  /** Label */
  label?: string
  /** Full width */
  fullWidth?: boolean
}

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ placeholder = 'Select...', error = false, label, fullWidth = false, style, children, ...props }, ref) => {
    const { value, open, setOpen, size, disabled } = useSelect()
    const [isHovered, setIsHovered] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const id = useId()

    const sizeTokens = SELECT_TOKENS.sizes[size]

    const getBorderColor = () => {
      if (disabled) return SELECT_TOKENS.trigger.disabled.border
      if (error) return SELECT_TOKENS.trigger.borderError
      if (open) return SELECT_TOKENS.trigger.borderFocus
      if (isHovered) return SELECT_TOKENS.trigger.borderHover
      return SELECT_TOKENS.trigger.border
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
      color: disabled ? '#a1a1aa' : '#18181b',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: sizeTokens.height,
      padding: `0 ${sizeTokens.paddingX}px`,
      fontSize: sizeTokens.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: value ? SELECT_TOKENS.trigger.fg : SELECT_TOKENS.trigger.placeholder,
      backgroundColor: disabled ? SELECT_TOKENS.trigger.disabled.bg : SELECT_TOKENS.trigger.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: SELECT_TOKENS.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      boxShadow: open && !disabled 
        ? `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(32, 80, 246, 0.15)'}` 
        : 'none',
      transition: 'border-color 150ms, box-shadow 150ms',
      textAlign: 'left',
      ...style,
    }

    const chevronStyle: React.CSSProperties = {
      flexShrink: 0,
      marginLeft: 8,
      color: disabled ? '#d4d4d8' : '#71717a',
      transition: 'transform 200ms',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    }

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={id} style={labelStyle}>
            {label}
          </label>
        )}
        <button
          ref={ref || triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          style={triggerStyle}
          onClick={() => !disabled && setOpen(!open)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {children || (value ? value : placeholder)}
          </span>
          <ChevronDown size={16} style={chevronStyle} />
        </button>
      </div>
    )
  }
)

SelectTrigger.displayName = "SelectTrigger"

// ============================================================================
// Select Content (dropdown menu)
// ============================================================================
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ style, children, ...props }, ref) => {
    const { open, setOpen } = useSelect()
    const contentRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }

      // Delay to avoid immediate close
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)

      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, setOpen])

    if (!open) return null

    const contentStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      backgroundColor: SELECT_TOKENS.menu.bg,
      border: `1px solid ${SELECT_TOKENS.menu.border}`,
      borderRadius: SELECT_TOKENS.menu.radius,
      boxShadow: SELECT_TOKENS.menu.shadow,
      maxHeight: SELECT_TOKENS.menu.maxHeight,
      overflowY: 'auto',
      zIndex: 50,
      animation: 'select-content-show 150ms ease-out',
      ...style,
    }

    return (
      <div
        ref={ref || contentRef}
        role="listbox"
        style={contentStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SelectContent.displayName = "SelectContent"

// ============================================================================
// Select Item (option)
// ============================================================================
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value of the option */
  value: string
  /** Disabled state */
  disabled?: boolean
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value: itemValue, disabled = false, style, children, ...props }, ref) => {
    const { value, onValueChange } = useSelect()
    const [isHovered, setIsHovered] = useState(false)
    const isSelected = value === itemValue

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: SELECT_TOKENS.option.height,
      padding: `0 ${SELECT_TOKENS.option.paddingX}px`,
      fontSize: 14,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: isSelected ? SELECT_TOKENS.option.fgSelected : SELECT_TOKENS.option.fg,
      backgroundColor: isSelected 
        ? SELECT_TOKENS.option.bgSelected 
        : isHovered 
          ? SELECT_TOKENS.option.bgHover 
          : SELECT_TOKENS.option.bg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 150ms',
      ...style,
    }

    const handleClick = () => {
      if (!disabled) {
        onValueChange(itemValue)
      }
    }

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        style={itemStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span>{children}</span>
        {isSelected && <Check size={16} />}
      </div>
    )
  }
)

SelectItem.displayName = "SelectItem"

// ============================================================================
// Select Group
// ============================================================================
export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Group label */
  label?: string
}

const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ label, style, children, ...props }, ref) => {
    const groupStyle: React.CSSProperties = {
      ...style,
    }

    const labelStyle: React.CSSProperties = {
      padding: '8px 12px',
      fontSize: 12,
      fontWeight: 600,
      color: '#71717a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }

    return (
      <div ref={ref} role="group" style={groupStyle} {...props}>
        {label && <div style={labelStyle}>{label}</div>}
        {children}
      </div>
    )
  }
)

SelectGroup.displayName = "SelectGroup"

// ============================================================================
// Select Separator
// ============================================================================
const SelectSeparator = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ style, ...props }, ref) => {
    const sepStyle: React.CSSProperties = {
      height: 1,
      margin: '4px 0',
      backgroundColor: '#e4e4e7',
      border: 'none',
      ...style,
    }

    return <hr ref={ref} style={sepStyle} {...props} />
  }
)

SelectSeparator.displayName = "SelectSeparator"

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-select-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes select-content-show {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
  }
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SELECT_TOKENS,
}
