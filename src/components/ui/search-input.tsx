import * as React from "react"
import { forwardRef, useState, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"

/**
 * Search Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=650-13425
 */
const SEARCH_INPUT_TOKENS = {
  // Container
  height: {
    sm: 32,
    md: 40,
    lg: 48,
  },
  paddingX: 12,
  fontSize: {
    sm: 13,
    md: 14,
    lg: 16,
  },
  bg: '#ffffff',
  bgFilled: '#f4f4f5',
  border: '#d4d4d8',
  borderFocus: '#2050f6',
  radius: 8,
  radiusFull: 9999,
  // Icon
  iconColor: '#71717a',
  iconSize: {
    sm: 16,
    md: 18,
    lg: 20,
  },
} as const

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  /** Current value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Callback when search is submitted */
  onSearch?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Rounded pill shape */
  rounded?: boolean
  /** Show clear button */
  clearable?: boolean
  /** Loading state */
  loading?: boolean
  /** Filled background style */
  filled?: boolean
  /** Label */
  label?: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({
    value: controlledValue,
    onChange,
    onSearch,
    placeholder = 'Search...',
    size = 'md',
    rounded = false,
    clearable = true,
    loading = false,
    filled = false,
    label,
    disabled,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('')
      }
      onChange?.('')
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && onSearch) {
        e.preventDefault()
        onSearch(value)
      }
    }

    const height = SEARCH_INPUT_TOKENS.height[size]
    const fontSize = SEARCH_INPUT_TOKENS.fontSize[size]
    const iconSize = SEARCH_INPUT_TOKENS.iconSize[size]

    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }

    const inputStyle: React.CSSProperties = {
      width: '100%',
      height,
      paddingLeft: height, // Space for icon on the left
      paddingRight: clearable && value ? height : SEARCH_INPUT_TOKENS.paddingX, // Space for clear button on the right
      paddingTop: 0,
      paddingBottom: 0,
      fontSize,
      fontFamily: 'inherit',
      backgroundColor: filled ? SEARCH_INPUT_TOKENS.bgFilled : SEARCH_INPUT_TOKENS.bg,
      border: filled ? 'none' : `1px solid ${isFocused ? SEARCH_INPUT_TOKENS.borderFocus : SEARCH_INPUT_TOKENS.border}`,
      borderRadius: rounded ? SEARCH_INPUT_TOKENS.radiusFull : SEARCH_INPUT_TOKENS.radius,
      outline: 'none',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
      opacity: disabled ? 0.5 : 1,
      boxSizing: 'border-box',
      ...(isFocused && filled && {
        boxShadow: `0 0 0 2px ${SEARCH_INPUT_TOKENS.borderFocus}`,
      }),
    }

    const iconContainerStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: SEARCH_INPUT_TOKENS.iconColor,
      pointerEvents: 'none',
      zIndex: 1,
    }

    const clearButtonStyle: React.CSSProperties = {
      position: 'absolute',
      right: 4,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: height - 8,
      height: height - 8,
      padding: 0,
      background: 'none',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      color: SEARCH_INPUT_TOKENS.iconColor,
    }

    return (
      <div style={wrapperStyle}>
        {label && (
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: '#18181b' }}>
            {label}
          </label>
        )}
        
        <div style={containerStyle}>
          <span style={iconContainerStyle}>
            {loading ? (
              <Loader2 size={iconSize} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Search size={iconSize} />
            )}
          </span>
          
          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            style={inputStyle}
            {...props}
          />
          
          {clearable && value && !loading && (
            <button type="button" style={clearButtonStyle} onClick={handleClear}>
              <X size={iconSize - 2} />
            </button>
          )}
        </div>
      </div>
    )
  }
)

SearchInput.displayName = "SearchInput"

export { SearchInput, SEARCH_INPUT_TOKENS }
