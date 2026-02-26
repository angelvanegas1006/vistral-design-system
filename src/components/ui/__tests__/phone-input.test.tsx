import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PhoneInput } from '../phone-input'

describe('PhoneInput', () => {
  it('renders without crashing', () => {
    render(<PhoneInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with a label', () => {
    render(<PhoneInput label="Phone Number" />)
    expect(screen.getByText('Phone Number')).toBeInTheDocument()
  })

  it('displays the provided value', () => {
    render(<PhoneInput value="1234567890" />)
    expect(screen.getByRole('textbox')).toHaveValue('1234567890')
  })

  it('calls onChange when typing in the input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PhoneInput value="" onChange={onChange} />)

    await user.type(screen.getByRole('textbox'), '5')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders the country selector button', () => {
    render(<PhoneInput defaultCountry="US" />)
    const button = screen.getByRole('button', { name: /select country code/i })
    expect(button).toBeInTheDocument()
  })

  it('opens country dropdown when selector is clicked', async () => {
    const user = userEvent.setup()
    render(<PhoneInput defaultCountry="US" />)

    await user.click(screen.getByRole('button', { name: /select country code/i }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows search input in open dropdown', async () => {
    const user = userEvent.setup()
    render(<PhoneInput defaultCountry="US" />)

    await user.click(screen.getByRole('button', { name: /select country code/i }))
    expect(screen.getByLabelText('Search country')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<PhoneInput helperText="Include area code" />)
    expect(screen.getByText('Include area code')).toBeInTheDocument()
  })

  it('disables input and country selector when disabled', () => {
    render(<PhoneInput disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: /select country code/i })).toBeDisabled()
  })

  it('sets aria-invalid when error is true', () => {
    render(<PhoneInput error />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows country options in dropdown', async () => {
    const user = userEvent.setup()
    render(<PhoneInput defaultCountry="US" />)

    await user.click(screen.getByRole('button', { name: /select country code/i }))
    expect(screen.getByRole('option', { name: /united states/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /mexico/i })).toBeInTheDocument()
  })
})
