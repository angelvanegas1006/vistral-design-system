import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberStepper } from '../number-stepper'

describe('NumberStepper', () => {
  it('renders without crashing', () => {
    render(<NumberStepper />)
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  })

  it('renders with a label', () => {
    render(<NumberStepper label="Quantity" />)
    expect(screen.getByText('Quantity')).toBeInTheDocument()
  })

  it('displays the default value', () => {
    render(<NumberStepper defaultValue={5} />)
    expect(screen.getByRole('spinbutton')).toHaveValue('5')
  })

  it('displays the controlled value', () => {
    render(<NumberStepper value={10} />)
    expect(screen.getByRole('spinbutton')).toHaveValue('10')
  })

  it('calls onChange when increment button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberStepper value={5} onChange={onChange} />)

    await user.click(screen.getByLabelText('Increase value'))
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('calls onChange when decrement button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberStepper value={5} onChange={onChange} />)

    await user.click(screen.getByLabelText('Decrease value'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('disables decrement at min value', () => {
    render(<NumberStepper value={0} min={0} />)
    expect(screen.getByLabelText('Decrease value')).toBeDisabled()
  })

  it('disables increment at max value', () => {
    render(<NumberStepper value={99} max={99} />)
    expect(screen.getByLabelText('Increase value')).toBeDisabled()
  })

  it('respects custom step increment', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberStepper value={10} step={5} onChange={onChange} />)

    await user.click(screen.getByLabelText('Increase value'))
    expect(onChange).toHaveBeenCalledWith(15)
  })

  it('renders in disabled state', () => {
    render(<NumberStepper disabled />)
    expect(screen.getByRole('spinbutton')).toBeDisabled()
  })

  it('shows error message when error is true', () => {
    render(<NumberStepper error errorMessage="Value is required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Value is required')
  })

  it('sets aria attributes on the spinbutton', () => {
    render(<NumberStepper value={3} min={0} max={10} />)
    const input = screen.getByRole('spinbutton')
    expect(input).toHaveAttribute('aria-valuenow', '3')
    expect(input).toHaveAttribute('aria-valuemin', '0')
    expect(input).toHaveAttribute('aria-valuemax', '10')
  })
})
