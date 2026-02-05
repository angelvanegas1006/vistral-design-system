import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'
import { Search, Eye } from 'lucide-react'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)
    expect(input).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<Input helperText="This is helpful" />)
    expect(screen.getByText(/this is helpful/i)).toBeInTheDocument()
  })

  it('shows error state', () => {
    render(<Input error errorMessage="This is an error" />)
    expect(screen.getByText(/this is an error/i)).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('test')
  })

  it('renders with left icon', () => {
    render(<Input leftIcon={Search} />)
    const input = screen.getByRole('textbox')
    const icon = input.parentElement?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    render(<Input rightIcon={Eye} />)
    const input = screen.getByRole('textbox')
    const icon = input.parentElement?.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('shows character counter when enabled', () => {
    render(<Input maxLength={10} showCounter />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('maxLength', '10')
  })

  it('displays character count correctly', async () => {
    render(<Input maxLength={10} showCounter />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'hello')

    expect(screen.getByText(/5\/10/i)).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" />)
    let input = screen.getByRole('textbox')
    // Size affects styling, check that it renders
    expect(input).toBeInTheDocument()

    rerender(<Input size="md" />)
    input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    rerender(<Input size="lg" />)
    input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)

    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalled()

    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalled()
  })

  it('shows optional label when optional prop is true', () => {
    render(<Input label="Email" optional />)
    expect(screen.getByText(/optional/i)).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('applies fullWidth style when fullWidth is true', () => {
    const { container } = render(<Input fullWidth />)
    const wrapper = container.querySelector('div')
    expect(wrapper?.style.width).toBe('100%')
  })

  it('handles controlled value', () => {
    const { rerender } = render(<Input value="initial" onChange={vi.fn()} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('initial')

    rerender(<Input value="updated" onChange={vi.fn()} />)
    expect(input).toHaveValue('updated')
  })
})
