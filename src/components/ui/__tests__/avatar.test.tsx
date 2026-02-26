import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar, AvatarGroup } from '../avatar'

describe('Avatar', () => {
  it('renders without crashing', () => {
    render(<Avatar data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
  })

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="User photo" />)
    const img = screen.getByRole('img', { name: /user photo/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('renders initials when name is provided and no src', () => {
    render(<Avatar name="John Doe" data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toHaveTextContent('JD')
  })

  it('renders single name initials correctly', () => {
    render(<Avatar name="Alice" data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toHaveTextContent('AL')
  })

  it('renders custom initials when provided', () => {
    render(<Avatar initials="AB" data-testid="avatar" />)
    expect(screen.getByTestId('avatar')).toHaveTextContent('AB')
  })

  it('renders fallback icon when no src, name, or initials', () => {
    render(<Avatar data-testid="avatar" />)
    const icon = screen.getByTestId('avatar').querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('falls back to initials on image error', () => {
    render(<Avatar src="invalid.jpg" name="Jane Smith" data-testid="avatar" />)
    const img = screen.getByRole('img')
    fireEvent.error(img)

    expect(screen.getByTestId('avatar')).toHaveTextContent('JS')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Avatar size="sm" data-testid="avatar" />)
    expect(screen.getByTestId('avatar').style.width).toBe('32px')

    rerender(<Avatar size="lg" data-testid="avatar" />)
    expect(screen.getByTestId('avatar').style.width).toBe('48px')

    rerender(<Avatar size="xl" data-testid="avatar" />)
    expect(screen.getByTestId('avatar').style.width).toBe('64px')
  })

  it('shows status indicator when showStatus is true', () => {
    const { container } = render(<Avatar showStatus status="online" data-testid="avatar" />)
    const statusDot = container.querySelector('span > span')
    expect(statusDot).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Avatar ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom style', () => {
    render(<Avatar data-testid="avatar" style={{ marginTop: 10 }} />)
    expect(screen.getByTestId('avatar').style.marginTop).toBe('10px')
  })
})

describe('AvatarGroup', () => {
  it('renders multiple avatars', () => {
    render(
      <AvatarGroup>
        <Avatar name="Alice" />
        <Avatar name="Bob" />
        <Avatar name="Charlie" />
      </AvatarGroup>
    )

    const group = screen.getByText('AL').closest('div')
    expect(group).toBeInTheDocument()
  })

  it('shows overflow count when exceeding max', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="Alice" />
        <Avatar name="Bob" />
        <Avatar name="Charlie" />
        <Avatar name="Diana" />
      </AvatarGroup>
    )

    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})
