import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from '../calendar'

describe('Calendar', () => {
  it('renders without crashing', () => {
    render(<Calendar />)
    expect(screen.getByText('Su')).toBeInTheDocument()
    expect(screen.getByText('Mo')).toBeInTheDocument()
    expect(screen.getByText('Fr')).toBeInTheDocument()
  })

  it('displays current month and year', () => {
    const date = new Date(2025, 5, 15) // June 2025
    render(<Calendar defaultValue={date} />)
    expect(screen.getByText('June 2025')).toBeInTheDocument()
  })

  it('navigates to previous month', async () => {
    const date = new Date(2025, 5, 15) // June 2025
    render(<Calendar defaultValue={date} />)

    expect(screen.getByText('June 2025')).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0]
    await userEvent.click(prevButton)

    expect(screen.getByText('May 2025')).toBeInTheDocument()
  })

  it('navigates to next month', async () => {
    const date = new Date(2025, 5, 15) // June 2025
    render(<Calendar defaultValue={date} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[1]
    await userEvent.click(nextButton)

    expect(screen.getByText('July 2025')).toBeInTheDocument()
  })

  it('calls onChange when a date is clicked', async () => {
    const handleChange = vi.fn()
    const date = new Date(2025, 5, 15) // June 2025
    render(<Calendar defaultValue={date} onChange={handleChange} />)

    await userEvent.click(screen.getByText('20'))
    expect(handleChange).toHaveBeenCalledTimes(1)

    const calledDate = handleChange.mock.calls[0][0]
    expect(calledDate.getDate()).toBe(20)
    expect(calledDate.getMonth()).toBe(5)
  })

  it('highlights selected date', () => {
    const date = new Date(2025, 5, 15)
    render(<Calendar value={date} />)

    const dayButton = screen.getByText('15')
    expect(dayButton.style.backgroundColor).toBeTruthy()
  })

  it('disables dates before minDate', () => {
    const minDate = new Date(2025, 5, 10)
    const defaultDate = new Date(2025, 5, 15)
    render(<Calendar defaultValue={defaultDate} minDate={minDate} />)

    const day5 = screen.getByText('5')
    expect(day5).toBeDisabled()
  })

  it('disables dates after maxDate', () => {
    const maxDate = new Date(2025, 5, 20)
    const defaultDate = new Date(2025, 5, 15)
    render(<Calendar defaultValue={defaultDate} maxDate={maxDate} />)

    const day25 = screen.getByText('25')
    expect(day25).toBeDisabled()
  })

  it('does not call onChange for disabled dates', async () => {
    const handleChange = vi.fn()
    const minDate = new Date(2025, 5, 10)
    const defaultDate = new Date(2025, 5, 15)
    render(<Calendar defaultValue={defaultDate} minDate={minDate} onChange={handleChange} />)

    await userEvent.click(screen.getByText('5'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders all days of the month', () => {
    const date = new Date(2025, 0, 1) // January 2025 (31 days)
    render(<Calendar defaultValue={date} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('31')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Calendar ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('renders weekday headers', () => {
    render(<Calendar />)
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })
})
