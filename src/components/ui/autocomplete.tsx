import * as React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import { Search, X, Check } from "lucide-react"

/**
 * Autocomplete Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=211-2174
 */
const AUTOCOMPLETE_TOKENS = {
  // Input
  input: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    bg: '#ffffff',
    border: '#d4d4d8',
    borderFocus: '#2050f6',
    radius: 8,
    placeholder: '#a1a1aa',
  },
  // Dropdown
  dropdown: {
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 8,
    maxHeight: 240,
  },
  // Option
  option: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    fg: '#18181b',
    fgMuted: '#71717a',
    bgHover: '#f4f4f5',
    bgSelected: '#eef4ff',
  },
} as const

export type AutocompleteOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Options list */
  options: AutocompleteOption[]
  /** Selected value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Callback when input changes (for async filtering) */
  onInputChange?: (input: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Show clear button */
  clearable?: boolean
  /** Loading state */
  loading?: boolean
  /** No results message */
  emptyMessage?: string
  /** Allow free text input */
  freeSolo?: boolean
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({
    options,
    value,
    onChange,
    onInputChange,
    placeholder = 'Search...',
    clearable = true,
    loading = false,
    emptyMessage = 'No results found',
    freeSolo = false,
    disabled,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [isFocused, setIsFocused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Sync input value with selected value
    useEffect(() => {
      if (value) {
        const option = options.find(o => o.value === value)
        if (option) {
          setInputValue(option.label)
        }
      } else {
        setInputValue('')
      }
    }, [value, options])

    // Filter options based on input
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    // Close on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      setIsOpen(true)
      setHighlightedIndex(-1)
      onInputChange?.(newValue)
      
      if (freeSolo) {
        onChange?.(newValue)
      }
    }

    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return
      setInputValue(option.label)
      onChange?.(option.value)
      setIsOpen(false)
      inputRef.current?.blur()
    }

    const handleClear = () => {
      setInputValue('')
      onChange?.('')
      onInputChange?.('')
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          setIsOpen(true)
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(i => 
            i < filteredOptions.length - 1 ? i + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(i => 
            i > 0 ? i - 1 : filteredOptions.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          break
      }
    }

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      ...style,
    }

    const inputContainerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }

    const inputStyle: React.CSSProperties = {
      width: '100%',
      height: AUTOCOMPLETE_TOKENS.input.height,
      padding: `0 ${clearable && inputValue ? 36 : 12}px 0 36px`,
      fontSize: AUTOCOMPLETE_TOKENS.input.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: AUTOCOMPLETE_TOKENS.input.bg,
      border: `1px solid ${isFocused ? AUTOCOMPLETE_TOKENS.input.borderFocus : AUTOCOMPLETE_TOKENS.input.border}`,
      borderRadius: AUTOCOMPLETE_TOKENS.input.radius,
      outline: 'none',
      transition: 'border-color 150ms ease',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
    }

    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      left: 12,
      color: AUTOCOMPLETE_TOKENS.input.placeholder,
      pointerEvents: 'none',
    }

    const clearStyle: React.CSSProperties = {
      position: 'absolute',
      right: 8,
      padding: 4,
      background: 'none',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      color: '#71717a',
      display: 'flex',
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      backgroundColor: AUTOCOMPLETE_TOKENS.dropdown.bg,
      border: `1px solid ${AUTOCOMPLETE_TOKENS.dropdown.border}`,
      borderRadius: AUTOCOMPLETE_TOKENS.dropdown.radius,
      boxShadow: AUTOCOMPLETE_TOKENS.dropdown.shadow,
      maxHeight: AUTOCOMPLETE_TOKENS.dropdown.maxHeight,
      overflowY: 'auto',
      zIndex: 50,
    }

    const getOptionStyle = (index: number, option: AutocompleteOption): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: AUTOCOMPLETE_TOKENS.option.height,
      padding: `0 ${AUTOCOMPLETE_TOKENS.option.paddingX}px`,
      fontSize: AUTOCOMPLETE_TOKENS.option.fontSize,
      color: option.disabled ? AUTOCOMPLETE_TOKENS.option.fgMuted : AUTOCOMPLETE_TOKENS.option.fg,
      backgroundColor: 
        option.value === value 
          ? AUTOCOMPLETE_TOKENS.option.bgSelected 
          : index === highlightedIndex 
            ? AUTOCOMPLETE_TOKENS.option.bgHover 
            : 'transparent',
      cursor: option.disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    })

    const emptyStyle: React.CSSProperties = {
      padding: 16,
      textAlign: 'center',
      fontSize: 13,
      color: AUTOCOMPLETE_TOKENS.option.fgMuted,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    return (
      <div ref={containerRef} style={containerStyle}>
        <div style={inputContainerStyle}>
          <Search size={16} style={iconStyle} />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => { setIsFocused(true); setIsOpen(true) }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            style={inputStyle}
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            {...props}
          />
          {clearable && inputValue && !disabled && (
            <button type="button" style={clearStyle} onClick={handleClear}>
              <X size={16} />
            </button>
          )}
        </div>

        {isOpen && (
          <div style={dropdownStyle} role="listbox">
            {loading ? (
              <div style={emptyStyle}>Loading...</div>
            ) : filteredOptions.length === 0 ? (
              <div style={emptyStyle}>{emptyMessage}</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                  style={getOptionStyle(index, option)}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span>{option.label}</span>
                  {option.value === value && <Check size={16} style={{ color: '#2050f6' }} />}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    )
  }
)

Autocomplete.displayName = "Autocomplete"

export { Autocomplete, AUTOCOMPLETE_TOKENS }
