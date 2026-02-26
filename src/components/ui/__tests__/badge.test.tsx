import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, DotBadge, BadgeContainer } from '../badge'

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>)
    expect(screen.getByText('Primary')).toBeInTheDocument()

    rerender(<Badge variant="brand">Brand</Badge>)
    expect(screen.getByText('Brand')).toBeInTheDocument()

    rerender(<Badge variant="error">Error</Badge>)
    expect(screen.getByText('Error')).toBeInTheDocument()

    rerender(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toBeInTheDocument()

    rerender(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Badge size="sm" data-testid="badge">
        Small
      </Badge>
    )
    expect(screen.getByTestId('badge').style.height).toBe('18px')

    rerender(
      <Badge size="md" data-testid="badge">
        Medium
      </Badge>
    )
    expect(screen.getByTestId('badge').style.height).toBe('22px')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Badge ref={ref}>Ref test</Badge>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom className and style', () => {
    render(
      <Badge data-testid="badge" style={{ margin: 5 }}>
        Custom
      </Badge>
    )
    expect(screen.getByTestId('badge')).toHaveStyle({ margin: '5px' })
  })
})

describe('DotBadge', () => {
  it('renders as a dot without count', () => {
    render(<DotBadge data-testid="dot" standalone />)
    expect(screen.getByTestId('dot')).toBeInTheDocument()
  })

  it('renders with count', () => {
    render(<DotBadge count={5} standalone data-testid="dot" />)
    expect(screen.getByTestId('dot')).toHaveTextContent('5')
  })

  it('shows max count with plus sign', () => {
    render(<DotBadge count={150} maxCount={99} standalone data-testid="dot" />)
    expect(screen.getByTestId('dot')).toHaveTextContent('99+')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<DotBadge ref={ref} standalone />)
    expect(ref).toHaveBeenCalled()
  })
})

describe('BadgeContainer', () => {
  it('renders children with relative positioning', () => {
    render(
      <BadgeContainer data-testid="container">
        <span>Content</span>
        <DotBadge count={3} />
      </BadgeContainer>
    )

    const container = screen.getByTestId('container')
    expect(container).toBeInTheDocument()
    expect(container.style.position).toBe('relative')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(
      <BadgeContainer ref={ref}>
        <span>Content</span>
      </BadgeContainer>
    )
    expect(ref).toHaveBeenCalled()
  })
})
