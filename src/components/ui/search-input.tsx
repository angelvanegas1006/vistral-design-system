import * as React from 'react'
import { forwardRef, useState, useRef } from 'react'
import { Search, X, Filter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Search Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=218-1949
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
  borderError: '#dc2626',
  radius: 8,
  radiusFull: 9999,
  // Icon
  iconColor: '#71717a',
  iconColorFocus: '#18181b',
  iconSize: {
    sm: 16,
    md: 18,
    lg: 20,
  },
  // Clear button
  clearButton: {
    size: 20,
    bg: '#e4e4e7',
    bgHover: '#d4d4d8',
    fg: '#ffffff',
    radius: '50%',
  },
  // Filter button
  filterButton: {
    size: 32,
    bg: '#dbeafe',
    bgHover: '#bfdbfe',
    bgActive: '#93c5fd',
    fg: '#2050f6',
    radius: '50%',
  },
} as const

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'size'
> {
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
  /** Show filter button */
  showFilter?: boolean
  /** Filter button click handler */
  onFilterClick?: () => void
  /** Filter button badge count */
  filterCount?: number
  /** Filter button icon */
  filterIcon?: LucideIcon
  /** Filled background style */
  filled?: boolean
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error state */
  error?: boolean
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value: controlledValue,
      onChange,
      onSearch,
      placeholder = 'Search...',
      size = 'md',
      rounded = false,
      clearable = true,
      showFilter = false,
      onFilterClick,
      filterCount,
      filterIcon: FilterIcon,
      filled = false,
      label,
      helperText,
      error = false,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
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
      gap: showFilter ? 8 : 0,
    }

    const getBorderColor = () => {
      if (error) return SEARCH_INPUT_TOKENS.borderError
      if (isFocused) return SEARCH_INPUT_TOKENS.borderFocus
      return SEARCH_INPUT_TOKENS.border
    }

    const inputStyle: React.CSSProperties = {
      width: '100%',
      height,
      paddingLeft: height, // Space for icon on the left
      paddingRight:
        (clearable && value ? height : SEARCH_INPUT_TOKENS.paddingX) +
        (showFilter ? height + 8 : 0), // Space for clear button and filter
      paddingTop: 0,
      paddingBottom: 0,
      fontSize,
      fontFamily: 'inherit',
      backgroundColor: filled ? SEARCH_INPUT_TOKENS.bgFilled : SEARCH_INPUT_TOKENS.bg,
      border: filled ? 'none' : `1px solid ${getBorderColor()}`,
      borderRadius: rounded ? SEARCH_INPUT_TOKENS.radiusFull : SEARCH_INPUT_TOKENS.radius,
      outline: 'none',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
      opacity: disabled ? 0.5 : 1,
      boxSizing: 'border-box',
      ...(isFocused &&
        filled && {
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
      color: isFocused ? SEARCH_INPUT_TOKENS.iconColorFocus : SEARCH_INPUT_TOKENS.iconColor,
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'color 150ms ease',
    }

    const clearButtonStyle: React.CSSProperties = {
      position: 'absolute',
      right: showFilter ? height + 16 : 4,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: SEARCH_INPUT_TOKENS.clearButton.size,
      height: SEARCH_INPUT_TOKENS.clearButton.size,
      padding: 0,
      background: SEARCH_INPUT_TOKENS.clearButton.bg,
      border: 'none',
      borderRadius: SEARCH_INPUT_TOKENS.clearButton.radius,
      cursor: 'pointer',
      color: SEARCH_INPUT_TOKENS.clearButton.fg,
      transition: 'background-color 150ms ease',
      zIndex: 2,
    }

    const filterButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: SEARCH_INPUT_TOKENS.filterButton.size,
      height: SEARCH_INPUT_TOKENS.filterButton.size,
      padding: 0,
      background: filterCount
        ? SEARCH_INPUT_TOKENS.filterButton.bgActive
        : SEARCH_INPUT_TOKENS.filterButton.bg,
      border: 'none',
      borderRadius: SEARCH_INPUT_TOKENS.filterButton.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: SEARCH_INPUT_TOKENS.filterButton.fg,
      transition: 'background-color 150ms ease',
      flexShrink: 0,
      position: 'relative',
    }

    const filterBadgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#71717a',
      color: '#ffffff',
      borderRadius: 8,
      fontSize: 10,
      fontWeight: 600,
      fontFamily: 'inherit',
    }

    const inputId = React.useId()
    const helperId = helperText ? `search-helper-${inputId}` : undefined

    return (
      <div style={wrapperStyle} role="search">
        {label && (
          <label
            htmlFor={inputId}
            style={{
              display: 'block',
              marginBottom: 6,
              fontSize: 14,
              fontWeight: 500,
              color: disabled ? '#a1a1aa' : '#18181b',
            }}
          >
            {label}
          </label>
        )}

        <div style={containerStyle}>
          <span style={iconContainerStyle}>
            <Search size={iconSize} />
          </span>

          <input
            ref={inputRef || ref}
            id={inputId}
            type="search"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            style={inputStyle}
            aria-label="Search"
            aria-invalid={error}
            aria-describedby={helperId}
            {...props}
          />

          {clearable && value && (
            <button
              type="button"
              style={clearButtonStyle}
              onClick={handleClear}
              aria-label="Clear search"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = SEARCH_INPUT_TOKENS.clearButton.bgHover
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = SEARCH_INPUT_TOKENS.clearButton.bg
              }}
            >
              <X size={12} />
            </button>
          )}

          {showFilter && (
            <button
              type="button"
              style={filterButtonStyle}
              onClick={onFilterClick}
              disabled={disabled}
              aria-label={`Filter search results${filterCount ? `, ${filterCount} filter${filterCount > 1 ? 's' : ''} applied` : ''}`}
              onMouseEnter={e => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = SEARCH_INPUT_TOKENS.filterButton.bgHover
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = filterCount
                  ? SEARCH_INPUT_TOKENS.filterButton.bgActive
                  : SEARCH_INPUT_TOKENS.filterButton.bg
              }}
            >
              {FilterIcon ? <FilterIcon size={16} /> : <Filter size={16} />}
              {filterCount !== undefined && filterCount > 0 && (
                <span style={filterBadgeStyle}>{filterCount}</span>
              )}
            </button>
          )}
        </div>

        {helperText && (
          <p
            id={helperId}
            style={{
              margin: '6px 0 0',
              fontSize: 12,
              color: error ? SEARCH_INPUT_TOKENS.borderError : '#71717a',
              fontFamily: 'inherit',
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export { SearchInput, SEARCH_INPUT_TOKENS }
