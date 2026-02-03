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
}

const defaultFormatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({
    value,
    defaultValue,
    onChange,
    placeholder = 'Select date',
    formatDate = defaultFormatDate,
    minDate,
    maxDate,
    disabled = false,
    error = false,
    label,
    helperText,
    clearable = true,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value || defaultValue)
    const [isFocused, setIsFocused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (value !== undefined) setSelectedDate(value)
    }, [value])

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
      onChange?.(date)
      setIsOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedDate(undefined)
      onChange?.(undefined)
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
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <CalendarIcon size={16} style={{ color: '#71717a', flexShrink: 0 }} />
          <span style={{
            flex: 1,
            color: selectedDate ? '#18181b' : DATE_PICKER_TOKENS.trigger.placeholder,
          }}>
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
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
