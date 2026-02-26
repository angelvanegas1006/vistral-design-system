import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from '../date-picker'

describe('DatePicker', () => {
  it('renders with default placeholder', () => {
    render(<DatePicker />)
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<DatePicker label="Start Date" />)
    expect(screen.getByText('Start Date')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<DatePicker helperText="Select your preferred date" />)
    expect(screen.getByText('Select your preferred date')).toBeInTheDocument()
  })

  it('displays formatted date when value is provided', () => {
    const date = new Date(2025, 0, 15)
    render(<DatePicker value={date} />)
    const input = screen.getByDisplayValue(/Jan 15, 2025/)
    expect(input).toBeInTheDocument()
  })

  it('calls onChange when date is typed manually', async () => {
    const handleChange = vi.fn()
    render(<DatePicker onChange={handleChange} allowManualInput />)

    const input = screen.getByPlaceholderText('Select date')
    await userEvent.clear(input)
    await userEvent.type(input, '01/15/2025')

    expect(handleChange).toHaveBeenCalled()
  })

  it('renders in disabled state', () => {
    render(<DatePicker disabled />)
    const input = screen.getByPlaceholderText('Select date')
    expect(input).toBeDisabled()
  })

  it('shows error styling when error prop is true', () => {
    render(<DatePicker error helperText="Date is required" />)
    expect(screen.getByText('Date is required')).toBeInTheDocument()
  })

  it('shows clear button when date is selected and clearable', () => {
    const date = new Date(2025, 5, 1)
    render(<DatePicker value={date} clearable />)
    const clearButton = screen.getByRole('button')
    expect(clearButton).toBeInTheDocument()
  })

  it('clears the date when clear button is clicked', async () => {
    const handleChange = vi.fn()
    const date = new Date(2025, 5, 1)
    render(<DatePicker value={date} clearable onChange={handleChange} />)

    const clearButton = screen.getByRole('button')
    await userEvent.click(clearButton)

    expect(handleChange).toHaveBeenCalledWith(undefined)
  })

  it('uses custom format function', () => {
    const date = new Date(2025, 0, 15)
    const formatDate = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    render(<DatePicker value={date} formatDate={formatDate} />)
    expect(screen.getByDisplayValue('2025-1-15')).toBeInTheDocument()
  })

  it('renders without manual input mode', () => {
    render(<DatePicker allowManualInput={false} placeholder="Select date" />)
    expect(screen.getByText('Select date')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
})
