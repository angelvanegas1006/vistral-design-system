import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link } from '../link'

describe('Link', () => {
  it('renders with text and href', () => {
    render(<Link href="/about">About Us</Link>)
    const link = screen.getByRole('link', { name: /about us/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders with external link attributes for http URLs', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    )
    const link = screen.getByRole('link', { name: /external/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders external icon when external prop is true', () => {
    const { container } = render(
      <Link href="https://example.com" external>
        Visit
      </Link>
    )
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('does not show external icon for internal links', () => {
    const { container } = render(<Link href="/about">About</Link>)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeInTheDocument()
  })

  it('renders in disabled state', () => {
    render(
      <Link href="/about" disabled>
        Disabled Link
      </Link>
    )
    const link = screen.getByText('Disabled Link')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).not.toHaveAttribute('href')
  })

  it('does not navigate when disabled and clicked', async () => {
    const handleClick = vi.fn()
    render(
      <Link href="/test" disabled onClick={handleClick}>
        No Click
      </Link>
    )

    await userEvent.click(screen.getByText('No Click'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('calls onClick handler when not disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Link href="/test" onClick={handleClick}>
        Click Me
      </Link>
    )

    await userEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Link href="/test" size="sm">
        Small
      </Link>
    )
    let link = screen.getByText('Small')
    expect(link.style.fontSize).toBe('12px')

    rerender(
      <Link href="/test" size="md">
        Medium
      </Link>
    )
    link = screen.getByText('Medium')
    expect(link.style.fontSize).toBe('14px')

    rerender(
      <Link href="/test" size="lg">
        Large
      </Link>
    )
    link = screen.getByText('Large')
    expect(link.style.fontSize).toBe('16px')
  })

  it('renders with underline always', () => {
    render(
      <Link href="/test" underline="always">
        Underlined
      </Link>
    )
    const link = screen.getByText('Underlined')
    expect(link).toHaveAttribute('data-underline', 'always')
  })

  it('renders with no underline', () => {
    render(
      <Link href="/test" underline="none">
        No Underline
      </Link>
    )
    const link = screen.getByText('No Underline')
    expect(link.style.textDecoration).toBe('none')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(
      <Link href="/test" ref={ref}>
        Ref Link
      </Link>
    )
    expect(ref).toHaveBeenCalled()
  })

  it('has the data-vistral attribute', () => {
    render(<Link href="/test">Vistral Link</Link>)
    const link = screen.getByText('Vistral Link')
    expect(link).toHaveAttribute('data-vistral', 'link')
  })
})
