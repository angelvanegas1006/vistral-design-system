import * as React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Check, X, Search } from "lucide-react"

/**
 * Combobox Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1938-37566
 */
const COMBOBOX_TOKENS = {
  // Trigger
  trigger: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    bg: '#ffffff',
    border: '#d4d4d8',
    borderFocus: '#2050f6',
    borderError: '#ef4444',
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
    padding: 4,
  },
  // Search input in dropdown
  search: {
    height: 36,
    paddingX: 12,
    fontSize: 14,
    bg: '#fafafa',
    border: '#e4e4e7',
    radius: 6,
    placeholder: '#a1a1aa',
  },
  // Option
  option: {
    height: 36,
    paddingX: 12,
    fontSize: 14,
    fg: '#18181b',
    fgMuted: '#71717a',
    fgDisabled: '#a1a1aa',
    bgHover: '#f4f4f5',
    bgSelected: '#eef4ff',
    radius: 4,
  },
  // Tag (multi-select)
  tag: {
    height: 24,
    paddingX: 8,
    fontSize: 12,
    bg: '#f4f4f5',
    fg: '#18181b',
    radius: 4,
  },
  // Error
  error: {
    fontSize: 13,
    color: '#ef4444',
    marginTop: 4,
  },
} as const

export type ComboboxOption = {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Options list */
  options: ComboboxOption[]
  /** Selected value(s) */
  value?: string | string[]
  /** Callback when value changes */
  onChange?: (value: string | string[]) => void
  /** Multiple selection */
  multiple?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Searchable */
  searchable?: boolean
  /** Clearable */
  clearable?: boolean
  /** Disabled */
  disabled?: boolean
  /** Label */
  label?: string
  /** Error message */
  error?: string
  /** Description text */
  description?: string
  /** Show count badge */
  showCount?: boolean
}

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  ({
    options,
    value,
    onChange,
    multiple = false,
    placeholder = 'Select an element',
    searchable = true,
    clearable = true,
    disabled = false,
    label,
    error,
    description,
    showCount = false,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const selectedValues = multiple 
      ? (Array.isArray(value) ? value : []) 
      : (value ? [value as string] : [])

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )

    // Close on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
          setSearch('')
        }
      }
      if (isOpen) {
        document.addEventListener('mousedown', handleClick)
      }
      return () => document.removeEventListener('mousedown', handleClick)
    }, [isOpen])

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
    }, [isOpen, searchable])

    const handleSelect = (option: ComboboxOption) => {
      if (option.disabled) return

      if (multiple) {
        const newValue = selectedValues.includes(option.value)
          ? selectedValues.filter(v => v !== option.value)
          : [...selectedValues, option.value]
        onChange?.(newValue)
      } else {
        onChange?.(option.value)
        setIsOpen(false)
        setSearch('')
      }
    }

    const handleRemove = (val: string, e: React.MouseEvent) => {
      e.stopPropagation()
      if (multiple) {
        onChange?.(selectedValues.filter(v => v !== val))
      }
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange?.(multiple ? [] : '')
      setSearch('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsOpen(true)
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex(i => i < filteredOptions.length - 1 ? i + 1 : 0)
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex(i => i > 0 ? i - 1 : filteredOptions.length - 1)
          break
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSearch('')
          break
        case 'Backspace':
          if (!search && multiple && selectedValues.length > 0) {
            onChange?.(selectedValues.slice(0, -1))
          }
          break
      }
    }

    const getDisplayValue = () => {
      if (multiple) return null
      const selected = options.find(o => o.value === value)
      return selected?.label || ''
    }

    // Highlight matching text
    const highlightText = (text: string, query: string) => {
      if (!query) return text
      const parts = text.split(new RegExp(`(${query})`, 'gi'))
      return parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() 
          ? <mark key={i} style={{ backgroundColor: 'transparent', color: '#2050f6', fontWeight: 600 }}>{part}</mark>
          : part
      )
    }

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      ...style,
    }

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      flexWrap: multiple ? 'wrap' : 'nowrap',
      gap: 4,
      minHeight: COMBOBOX_TOKENS.trigger.height,
      padding: `4px ${COMBOBOX_TOKENS.trigger.paddingX}px`,
      backgroundColor: COMBOBOX_TOKENS.trigger.bg,
      border: `1px solid ${
        error 
          ? COMBOBOX_TOKENS.trigger.borderError 
          : isOpen 
            ? COMBOBOX_TOKENS.trigger.borderFocus 
            : COMBOBOX_TOKENS.trigger.border
      }`,
      borderRadius: COMBOBOX_TOKENS.trigger.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      transition: 'border-color 150ms ease',
    }

    const inputStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 60,
      border: 'none',
      outline: 'none',
      fontSize: COMBOBOX_TOKENS.trigger.fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      color: selectedValues.length === 0 ? COMBOBOX_TOKENS.trigger.placeholder : COMBOBOX_TOKENS.option.fg,
    }

    const tagStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: COMBOBOX_TOKENS.tag.height,
      padding: `0 ${COMBOBOX_TOKENS.tag.paddingX}px`,
      fontSize: COMBOBOX_TOKENS.tag.fontSize,
      backgroundColor: COMBOBOX_TOKENS.tag.bg,
      color: COMBOBOX_TOKENS.tag.fg,
      borderRadius: COMBOBOX_TOKENS.tag.radius,
      whiteSpace: 'nowrap',
    }

    const countBadgeStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      fontSize: COMBOBOX_TOKENS.trigger.fontSize,
      color: COMBOBOX_TOKENS.option.fgMuted,
      marginLeft: 'auto',
      marginRight: 4,
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      padding: COMBOBOX_TOKENS.dropdown.padding,
      backgroundColor: COMBOBOX_TOKENS.dropdown.bg,
      border: `1px solid ${COMBOBOX_TOKENS.dropdown.border}`,
      borderRadius: COMBOBOX_TOKENS.dropdown.radius,
      boxShadow: COMBOBOX_TOKENS.dropdown.shadow,
      maxHeight: COMBOBOX_TOKENS.dropdown.maxHeight,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }

    const searchContainerStyle: React.CSSProperties = {
      padding: '8px',
      borderBottom: `1px solid ${COMBOBOX_TOKENS.dropdown.border}`,
    }

    const searchInputStyle: React.CSSProperties = {
      width: '100%',
      height: COMBOBOX_TOKENS.search.height,
      padding: `0 ${COMBOBOX_TOKENS.search.paddingX}px 0 36px`,
      fontSize: COMBOBOX_TOKENS.search.fontSize,
      backgroundColor: COMBOBOX_TOKENS.search.bg,
      border: `1px solid ${COMBOBOX_TOKENS.search.border}`,
      borderRadius: COMBOBOX_TOKENS.search.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      outline: 'none',
    }

    const optionsContainerStyle: React.CSSProperties = {
      overflowY: 'auto',
      maxHeight: COMBOBOX_TOKENS.dropdown.maxHeight - (searchable ? 60 : 0),
    }

    const getOptionStyle = (index: number, option: ComboboxOption): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: COMBOBOX_TOKENS.option.height,
      padding: `0 ${COMBOBOX_TOKENS.option.paddingX}px`,
      fontSize: COMBOBOX_TOKENS.option.fontSize,
      color: option.disabled 
        ? COMBOBOX_TOKENS.option.fgDisabled 
        : COMBOBOX_TOKENS.option.fg,
      backgroundColor: selectedValues.includes(option.value)
        ? COMBOBOX_TOKENS.option.bgSelected
        : index === highlightedIndex 
          ? COMBOBOX_TOKENS.option.bgHover 
          : 'transparent',
      borderRadius: COMBOBOX_TOKENS.option.radius,
      cursor: option.disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 150ms ease',
    })

    return (
      <div ref={containerRef} style={containerStyle} {...props}>
        {label && (
          <label style={{ 
            display: 'block', 
            marginBottom: 6, 
            fontSize: 14, 
            fontWeight: 500,
            color: '#18181b',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}>
            {label}
          </label>
        )}

        <div
          ref={triggerRef}
          style={triggerStyle}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {/* Tags for multi-select */}
          {multiple && selectedValues.map(val => {
            const opt = options.find(o => o.value === val)
            return opt ? (
              <span key={val} style={tagStyle}>
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => handleRemove(val, e)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    cursor: 'pointer', 
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label={`Remove ${opt.label}`}
                >
                  <X size={12} />
                </button>
              </span>
            ) : null
          })}

          {/* Display value or placeholder */}
          {!isOpen && (
            <span style={inputStyle}>
              {multiple 
                ? (selectedValues.length === 0 ? placeholder : '')
                : (getDisplayValue() || placeholder)
              }
            </span>
          )}

          {/* Count badge */}
          {showCount && selectedValues.length > 0 && (
            <span style={countBadgeStyle}>
              {selectedValues.length}
            </span>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', flexShrink: 0 }}>
            {clearable && selectedValues.length > 0 && !isOpen && (
              <button
                type="button"
                onClick={handleClear}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  padding: 2, 
                  cursor: 'pointer', 
                  display: 'flex',
                  color: '#71717a',
                }}
                aria-label="Clear selection"
              >
                <X size={16} />
              </button>
            )}
            {isOpen ? (
              <ChevronUp 
                size={16} 
                style={{ 
                  color: '#71717a',
                  transition: 'transform 150ms ease',
                }} 
              />
            ) : (
              <ChevronDown 
                size={16} 
                style={{ 
                  color: '#71717a',
                  transition: 'transform 150ms ease',
                }} 
              />
            )}
          </div>
        </div>

        {/* Error or Description */}
        {(error || description) && (
          <div style={{
            fontSize: COMBOBOX_TOKENS.error.fontSize,
            color: error ? COMBOBOX_TOKENS.error.color : '#71717a',
            marginTop: COMBOBOX_TOKENS.error.marginTop,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}>
            {error || description}
          </div>
        )}

        {/* Dropdown */}
        {isOpen && (
          <div style={dropdownStyle} role="listbox">
            {/* Search input */}
            {searchable && (
              <div style={searchContainerStyle}>
                <div style={{ position: 'relative' }}>
                  <Search 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      left: 12, 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: COMBOBOX_TOKENS.search.placeholder,
                    }} 
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setHighlightedIndex(-1)
                    }}
                    placeholder="Search element"
                    style={searchInputStyle}
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      style={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        padding: 4,
                        cursor: 'pointer',
                        display: 'flex',
                        color: COMBOBOX_TOKENS.search.placeholder,
                      }}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Options list */}
            <div style={optionsContainerStyle}>
              {filteredOptions.length === 0 ? (
                <div style={{ 
                  padding: 12, 
                  textAlign: 'center', 
                  fontSize: 13, 
                  color: COMBOBOX_TOKENS.option.fgMuted,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}>
                  No element found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={selectedValues.includes(option.value)}
                    style={getOptionStyle(index, option)}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span>{highlightText(option.label, search)}</span>
                    {selectedValues.includes(option.value) && (
                      <Check size={16} style={{ color: '#2050f6', flexShrink: 0 }} />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)

Combobox.displayName = "Combobox"

export { Combobox, COMBOBOX_TOKENS }
