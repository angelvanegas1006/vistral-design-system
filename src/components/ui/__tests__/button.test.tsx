import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    let button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button.style.backgroundColor).toBe('rgb(32, 80, 246)')

    rerender(<Button variant="secondary">Secondary</Button>)
    button = screen.getByRole('button')
    expect(button.style.backgroundColor).toBe('rgb(217, 231, 255)')

    rerender(<Button variant="outline">Outline</Button>)
    button = screen.getByRole('button')
    expect(button.style.backgroundColor).toBe('transparent')

    rerender(<Button variant="ghost">Ghost</Button>)
    button = screen.getByRole('button')
    expect(button.style.backgroundColor).toBe('transparent')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole('button')
    expect(button.style.height).toBe('32px')

    rerender(<Button size="md">Medium</Button>)
    button = screen.getByRole('button')
    expect(button.style.height).toBe('40px')

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole('button')
    expect(button.style.height).toBe('48px')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    // Check for loader icon
    const loader = button.querySelector('svg')
    expect(loader).toBeInTheDocument()
  })

  it('renders with left icon', () => {
    const TestIcon = () => <svg data-testid="left-icon" />
    render(<Button leftIcon={TestIcon}>With Icon</Button>)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    const TestIcon = () => <svg data-testid="right-icon" />
    render(<Button rightIcon={TestIcon}>With Icon</Button>)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('renders as icon-only button', () => {
    const TestIcon = () => <svg data-testid="icon" />
    render(<Button iconOnly leftIcon={TestIcon} aria-label="Icon button" />)
    const button = screen.getByRole('button', { name: /icon button/i })
    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref test</Button>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles keyboard events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Keyboard</Button>)

    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalled()
  })
})
