import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInput } from '../number-input'

describe('NumberInput', () => {
  it('renders with default value of 0', () => {
    render(<NumberInput />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('0')
  })

  it('renders with custom default value', () => {
    render(<NumberInput defaultValue={5} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('5')
  })

  it('renders with controlled value', () => {
    render(<NumberInput value={42} onChange={vi.fn()} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('42')
  })

  it('renders with label', () => {
    render(<NumberInput label="Quantity" />)
    expect(screen.getByText('Quantity')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<NumberInput helperText="Enter a number between 1 and 10" />)
    expect(screen.getByText('Enter a number between 1 and 10')).toBeInTheDocument()
  })

  it('increments value when plus button is clicked', async () => {
    const handleChange = vi.fn()
    render(<NumberInput defaultValue={5} step={1} onChange={handleChange} />)

    const buttons = screen.getAllByRole('button')
    const incrementBtn = buttons[1]
    await userEvent.click(incrementBtn)

    expect(handleChange).toHaveBeenCalledWith(6)
  })

  it('decrements value when minus button is clicked', async () => {
    const handleChange = vi.fn()
    render(<NumberInput defaultValue={5} step={1} onChange={handleChange} />)

    const buttons = screen.getAllByRole('button')
    const decrementBtn = buttons[0]
    await userEvent.click(decrementBtn)

    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('respects min value', async () => {
    const handleChange = vi.fn()
    render(<NumberInput defaultValue={1} min={0} onChange={handleChange} />)

    const buttons = screen.getAllByRole('button')
    const decrementBtn = buttons[0]
    await userEvent.click(decrementBtn)

    expect(handleChange).toHaveBeenCalledWith(0)

    await userEvent.click(decrementBtn)
    expect(handleChange).toHaveBeenLastCalledWith(0)
  })

  it('respects max value', async () => {
    const handleChange = vi.fn()
    render(<NumberInput defaultValue={9} max={10} onChange={handleChange} />)

    const buttons = screen.getAllByRole('button')
    const incrementBtn = buttons[1]
    await userEvent.click(incrementBtn)

    expect(handleChange).toHaveBeenCalledWith(10)
  })

  it('uses custom step value', async () => {
    const handleChange = vi.fn()
    render(<NumberInput defaultValue={0} step={5} onChange={handleChange} />)

    const buttons = screen.getAllByRole('button')
    const incrementBtn = buttons[1]
    await userEvent.click(incrementBtn)

    expect(handleChange).toHaveBeenCalledWith(5)
  })

  it('renders in disabled state', () => {
    render(<NumberInput disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    const buttons = screen.getAllByRole('button')
    buttons.forEach(btn => expect(btn).toBeDisabled())
  })

  it('hides buttons when hideButtons is true', () => {
    render(<NumberInput hideButtons />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('shows error helper text styling', () => {
    render(<NumberInput error helperText="Value too high" />)
    expect(screen.getByText('Value too high')).toBeInTheDocument()
  })

  it('uses custom formatValue function', () => {
    render(
      <NumberInput value={1500} onChange={vi.fn()} formatValue={v => `$${v.toLocaleString()}`} />
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('$1,500')
  })

  it('handles manual input by typing a number', async () => {
    const handleChange = vi.fn()
    render(<NumberInput defaultValue={0} onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    await userEvent.clear(input)
    await userEvent.type(input, '25')

    expect(handleChange).toHaveBeenCalled()
  })
})
