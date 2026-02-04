import * as React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar, CALENDAR_TOKENS } from "./calendar"

/**
 * Date Picker Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=198-618
 */
const DATE_PICKER_TOKENS = {
  // Trigger
  trigger: {
    height: 40,
    paddingX: 12,
    fontSize: 14,
    bg: '#ffffff',
    border: '#d4d4d8',
    borderFocus: '#2050f6',
    borderError: '#dc2626',
    radius: 8,
    placeholder: '#a1a1aa',
  },
} as const

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected date */
  value?: Date
  /** Default date */
  defaultValue?: Date
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text */
  placeholder?: string
  /** Date format function */
  formatDate?: (date: Date) => string
  /** Parse date from string (for manual input) */
  parseDate?: (str: string) => Date | undefined
  /** Minimum date */
  minDate?: Date
  /** Maximum date */
  maxDate?: Date
  /** Disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Clearable */
  clearable?: boolean
  /** Allow manual date input */
  allowManualInput?: boolean
}

const defaultFormatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Parse date from common formats: MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, etc.
const defaultParseDate = (str: string): Date | undefined => {
  const trimmed = str.trim()
  if (!trimmed) return undefined

  // Try standard Date parsing first (handles ISO, etc.)
  let date = new Date(trimmed)
  if (!isNaN(date.getTime())) return date

  // Try MM/DD/YYYY or DD/MM/YYYY format
  const parts = trimmed.split(/[\/\-\.]/)
  if (parts.length === 3) {
    const [a, b, c] = parts.map(p => parseInt(p, 10))
    // Try MM/DD/YYYY
    if (a >= 1 && a <= 12 && b >= 1 && b <= 31 && c >= 1900) {
      date = new Date(c, a - 1, b)
      if (!isNaN(date.getTime())) return date
    }
    // Try DD/MM/YYYY
    if (b >= 1 && b <= 12 && a >= 1 && a <= 31 && c >= 1900) {
      date = new Date(c, b - 1, a)
      if (!isNaN(date.getTime())) return date
    }
    // Try YYYY-MM-DD
    if (a >= 1900 && b >= 1 && b <= 12 && c >= 1 && c <= 31) {
      date = new Date(a, b - 1, c)
      if (!isNaN(date.getTime())) return date
    }
  }

  return undefined
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({
    value,
    defaultValue,
    onChange,
    placeholder = 'Select date',
    formatDate = defaultFormatDate,
    parseDate = defaultParseDate,
    minDate,
    maxDate,
    disabled = false,
    error = false,
    label,
    helperText,
    clearable = true,
    allowManualInput = true,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value || defaultValue)
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState(selectedDate ? formatDate(selectedDate) : '')
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (value !== undefined) {
        setSelectedDate(value)
        setInputValue(formatDate(value))
      }
    }, [value, formatDate])

    // Update inputValue when selectedDate changes internally
    useEffect(() => {
      if (selectedDate) {
        setInputValue(formatDate(selectedDate))
      }
    }, [selectedDate, formatDate])

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

    const handleSelect = (date: Date) => {
      setSelectedDate(date)
      setInputValue(formatDate(date))
      onChange?.(date)
      setIsOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedDate(undefined)
      setInputValue('')
      onChange?.(undefined)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setInputValue(val)
      
      // Try to parse the date
      const parsed = parseDate(val)
      if (parsed) {
        // Validate against min/max
        if (minDate && parsed < minDate) return
        if (maxDate && parsed > maxDate) return
        setSelectedDate(parsed)
        onChange?.(parsed)
      }
    }

    const handleInputBlur = () => {
      setIsFocused(false)
      // If input doesn't parse to a valid date, reset to selected date or empty
      if (inputValue && !parseDate(inputValue)) {
        setInputValue(selectedDate ? formatDate(selectedDate) : '')
      }
    }

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        const parsed = parseDate(inputValue)
        if (parsed) {
          handleSelect(parsed)
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    const getBorderColor = () => {
      if (error) return DATE_PICKER_TOKENS.trigger.borderError
      if (isFocused || isOpen) return DATE_PICKER_TOKENS.trigger.borderFocus
      return DATE_PICKER_TOKENS.trigger.border
    }

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      ...style,
    }

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      height: DATE_PICKER_TOKENS.trigger.height,
      padding: `0 ${DATE_PICKER_TOKENS.trigger.paddingX}px`,
      backgroundColor: DATE_PICKER_TOKENS.trigger.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: DATE_PICKER_TOKENS.trigger.radius,
      fontSize: DATE_PICKER_TOKENS.trigger.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color 150ms ease',
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      zIndex: 50,
    }

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
          onClick={() => {
            if (!disabled && !allowManualInput) {
              setIsOpen(!isOpen)
            }
          }}
        >
          <CalendarIcon 
            size={16} 
            style={{ 
              color: '#71717a', 
              flexShrink: 0, 
              cursor: 'pointer' 
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (!disabled) setIsOpen(!isOpen)
            }}
          />
          {allowManualInput ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: DATE_PICKER_TOKENS.trigger.fontSize,
                fontFamily: 'inherit',
                color: '#18181b',
              }}
            />
          ) : (
            <span 
              style={{
                flex: 1,
                color: selectedDate ? '#18181b' : DATE_PICKER_TOKENS.trigger.placeholder,
              }}
              tabIndex={disabled ? -1 : 0}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              {selectedDate ? formatDate(selectedDate) : placeholder}
            </span>
          )}
          {clearable && selectedDate && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: 2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#71717a',
                fontSize: 12,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {helperText && (
          <p style={{
            margin: '6px 0 0',
            fontSize: 12,
            color: error ? '#dc2626' : '#71717a',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}>
            {helperText}
          </p>
        )}

        {isOpen && (
          <div style={dropdownStyle}>
            <Calendar
              value={selectedDate}
              onChange={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

export { DatePicker, DATE_PICKER_TOKENS }
