import * as React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import { ChevronDown, Check, X } from "lucide-react"

/**
 * Combobox Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1938-37248
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
  // Option
  option: {
    height: 36,
    paddingX: 8,
    fontSize: 14,
    fg: '#18181b',
    fgMuted: '#71717a',
    bgHover: '#f4f4f5',
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
}

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  ({
    options,
    value,
    onChange,
    multiple = false,
    placeholder = 'Select...',
    searchable = true,
    clearable = true,
    disabled = false,
    label,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

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
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [])

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
      border: `1px solid ${isOpen ? COMBOBOX_TOKENS.trigger.borderFocus : COMBOBOX_TOKENS.trigger.border}`,
      borderRadius: COMBOBOX_TOKENS.trigger.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const inputStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 60,
      border: 'none',
      outline: 'none',
      fontSize: COMBOBOX_TOKENS.trigger.fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
    }

    const tagStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      height: COMBOBOX_TOKENS.tag.height,
      padding: `0 ${COMBOBOX_TOKENS.tag.paddingX}px`,
      fontSize: COMBOBOX_TOKENS.tag.fontSize,
      backgroundColor: COMBOBOX_TOKENS.tag.bg,
      color: COMBOBOX_TOKENS.tag.fg,
      borderRadius: COMBOBOX_TOKENS.tag.radius,
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
      overflowY: 'auto',
      zIndex: 50,
    }

    const getOptionStyle = (index: number, option: ComboboxOption): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: COMBOBOX_TOKENS.option.height,
      padding: `0 ${COMBOBOX_TOKENS.option.paddingX}px`,
      fontSize: COMBOBOX_TOKENS.option.fontSize,
      color: option.disabled ? COMBOBOX_TOKENS.option.fgMuted : COMBOBOX_TOKENS.option.fg,
      backgroundColor: index === highlightedIndex ? COMBOBOX_TOKENS.option.bgHover : 'transparent',
      borderRadius: COMBOBOX_TOKENS.option.radius,
      cursor: option.disabled ? 'not-allowed' : 'pointer',
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
          ref={ref}
          style={triggerStyle}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
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
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
                >
                  <X size={12} />
                </button>
              </span>
            ) : null
          })}

          {/* Input/Search */}
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={selectedValues.length === 0 ? placeholder : ''}
              style={inputStyle}
              autoFocus
            />
          ) : (
            <span style={{ 
              flex: 1, 
              fontSize: COMBOBOX_TOKENS.trigger.fontSize,
              color: selectedValues.length === 0 ? COMBOBOX_TOKENS.trigger.placeholder : COMBOBOX_TOKENS.option.fg,
            }}>
              {multiple 
                ? (selectedValues.length === 0 ? placeholder : '')
                : (getDisplayValue() || placeholder)
              }
            </span>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            {clearable && selectedValues.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer', display: 'flex', color: '#71717a' }}
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown 
              size={16} 
              style={{ 
                color: '#71717a',
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 150ms ease',
              }} 
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div style={dropdownStyle} role="listbox">
            {filteredOptions.length === 0 ? (
              <div style={{ padding: 12, textAlign: 'center', fontSize: 13, color: '#71717a' }}>
                No results found
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
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <Check size={16} style={{ color: '#2050f6' }} />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    )
  }
)

Combobox.displayName = "Combobox"

export { Combobox, COMBOBOX_TOKENS }
