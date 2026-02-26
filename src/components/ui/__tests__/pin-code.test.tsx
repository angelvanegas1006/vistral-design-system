import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PinCode } from '../pin-code'

describe('PinCode', () => {
  it('renders without crashing', () => {
    render(<PinCode />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('renders the correct number of inputs based on length', () => {
    render(<PinCode length={4} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(4)
  })

  it('renders default length of 6 inputs', () => {
    render(<PinCode />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(6)
  })

  it('renders a label when provided', () => {
    render(<PinCode label="Enter PIN" />)
    expect(screen.getByText('Enter PIN')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<PinCode helperText="6-digit code sent to your email" />)
    expect(screen.getByText('6-digit code sent to your email')).toBeInTheDocument()
  })

  it('calls onChange when a digit is entered', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PinCode length={4} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '1')
    expect(onChange).toHaveBeenCalled()
  })

  it('calls onComplete when all digits are filled', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()
    render(<PinCode length={4} onComplete={onComplete} />)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '1')
    await user.type(inputs[1], '2')
    await user.type(inputs[2], '3')
    await user.type(inputs[3], '4')
    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('populates inputs from value prop', () => {
    render(<PinCode length={4} value="1234" />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('2')
    expect(inputs[2]).toHaveValue('3')
    expect(inputs[3]).toHaveValue('4')
  })

  it('disables all inputs when disabled', () => {
    render(<PinCode disabled />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => expect(input).toBeDisabled())
  })

  it('uses password type when mask is true', () => {
    render(<PinCode mask length={4} />)
    const inputs = screen.getAllByDisplayValue('')
    inputs.forEach(input => expect(input).toHaveAttribute('type', 'password'))
  })

  it('uses text type when mask is false', () => {
    render(<PinCode mask={false} length={4} />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => expect(input).toHaveAttribute('type', 'text'))
  })
})
