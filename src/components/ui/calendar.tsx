import * as React from 'react'
import { forwardRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Calendar Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=199-3210
 */
const CALENDAR_TOKENS = {
  // Container
  width: 280,
  padding: 16,
  bg: '#ffffff',
  border: '#e4e4e7',
  radius: 12,
  // Header
  header: {
    fontSize: 14,
    fontWeight: 600,
    color: '#18181b',
  },
  // Day cell
  cell: {
    size: 36,
    fontSize: 14,
    radius: 8,
    // States
    fg: '#18181b',
    fgMuted: '#a1a1aa',
    fgSelected: '#ffffff',
    bgHover: '#f4f4f5',
    bgSelected: '#2050f6',
    bgToday: '#eef4ff',
    bgRange: '#eef4ff',
  },
  // Weekday header
  weekday: {
    fontSize: 12,
    fontWeight: 500,
    color: '#71717a',
  },
} as const

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export interface CalendarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  /** Selected date */
  value?: Date
  /** Default selected date */
  defaultValue?: Date
  /** Callback when date changes */
  onChange?: (date: Date) => void
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Disabled dates */
  disabledDates?: Date[]
  /** Show today indicator */
  showToday?: boolean
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates = [],
      showToday = true,
      style,
      ...props
    },
    ref
  ) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [currentMonth, setCurrentMonth] = useState(() => {
      const date = value || defaultValue || today
      return new Date(date.getFullYear(), date.getMonth(), 1)
    })

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value || defaultValue)

    // Update selected when value prop changes
    React.useEffect(() => {
      if (value) setSelectedDate(value)
    }, [value])

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return disabledDates.some(
        d =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
      )
    }

    const isSameDay = (d1: Date, d2: Date) => {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      )
    }

    const handleDateClick = (day: number) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      if (isDateDisabled(date)) return
      setSelectedDate(date)
      onChange?.(date)
    }

    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)

    const containerStyle: React.CSSProperties = {
      width: CALENDAR_TOKENS.width,
      padding: CALENDAR_TOKENS.padding,
      backgroundColor: CALENDAR_TOKENS.bg,
      border: `1px solid ${CALENDAR_TOKENS.border}`,
      borderRadius: CALENDAR_TOKENS.radius,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    }

    const titleStyle: React.CSSProperties = {
      fontSize: CALENDAR_TOKENS.header.fontSize,
      fontWeight: CALENDAR_TOKENS.header.fontWeight,
      color: CALENDAR_TOKENS.header.color,
    }

    const navButtonStyle: React.CSSProperties = {
      padding: 4,
      background: 'none',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      color: '#71717a',
      display: 'flex',
    }

    const weekdayRowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      marginBottom: 8,
    }

    const weekdayStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: CALENDAR_TOKENS.cell.size,
      fontSize: CALENDAR_TOKENS.weekday.fontSize,
      fontWeight: CALENDAR_TOKENS.weekday.fontWeight,
      color: CALENDAR_TOKENS.weekday.color,
    }

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 2,
    }

    const getDayStyle = (day: number): React.CSSProperties => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isSelected = selectedDate && isSameDay(date, selectedDate)
      const isToday = showToday && isSameDay(date, today)
      const disabled = isDateDisabled(date)

      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: CALENDAR_TOKENS.cell.size,
        height: CALENDAR_TOKENS.cell.size,
        fontSize: CALENDAR_TOKENS.cell.fontSize,
        borderRadius: CALENDAR_TOKENS.cell.radius,
        backgroundColor: isSelected
          ? CALENDAR_TOKENS.cell.bgSelected
          : isToday
            ? CALENDAR_TOKENS.cell.bgToday
            : 'transparent',
        color: isSelected
          ? CALENDAR_TOKENS.cell.fgSelected
          : disabled
            ? CALENDAR_TOKENS.cell.fgMuted
            : CALENDAR_TOKENS.cell.fg,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        fontWeight: isToday ? 600 : 400,
        transition: 'background-color 100ms ease',
      }
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {/* Header */}
        <div style={headerStyle}>
          <button type="button" style={navButtonStyle} onClick={prevMonth}>
            <ChevronLeft size={20} />
          </button>
          <span style={titleStyle}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button type="button" style={navButtonStyle} onClick={nextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Weekdays */}
        <div style={weekdayRowStyle}>
          {DAYS.map(day => (
            <div key={day} style={weekdayStyle}>
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div style={gridStyle}>
          {/* Empty cells for days before first of month */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div
              key={`empty-${i}`}
              style={{ width: CALENDAR_TOKENS.cell.size, height: CALENDAR_TOKENS.cell.size }}
            />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            return (
              <button
                key={day}
                type="button"
                style={getDayStyle(day)}
                onClick={() => handleDateClick(day)}
                disabled={isDateDisabled(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

Calendar.displayName = 'Calendar'

export { Calendar, CALENDAR_TOKENS }
