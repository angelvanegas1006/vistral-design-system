import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyState } from '../empty-state'
import { Search } from 'lucide-react'

describe('EmptyState', () => {
  it('renders with title', () => {
    render(<EmptyState title="No results found" />)
    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(<EmptyState title="No results" description="Try adjusting your search or filters" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument()
  })

  it('renders with a preset icon string', () => {
    const { container } = render(<EmptyState title="No results" icon="search" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders with a custom LucideIcon', () => {
    const { container } = render(<EmptyState title="Search" icon={Search} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders primary action button', () => {
    const handleClick = vi.fn()
    render(
      <EmptyState title="No items" primaryAction={{ label: 'Create New', onClick: handleClick }} />
    )

    expect(screen.getByRole('button', { name: /create new/i })).toBeInTheDocument()
  })

  it('calls primary action onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(
      <EmptyState title="No items" primaryAction={{ label: 'Add Item', onClick: handleClick }} />
    )

    await userEvent.click(screen.getByRole('button', { name: /add item/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders secondary action button', () => {
    const handlePrimary = vi.fn()
    const handleSecondary = vi.fn()
    render(
      <EmptyState
        title="No items"
        primaryAction={{ label: 'Create', onClick: handlePrimary }}
        secondaryAction={{ label: 'Learn More', onClick: handleSecondary }}
      />
    )

    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <EmptyState title="No data">
        <p>Custom content below description</p>
      </EmptyState>
    )

    expect(screen.getByText('Custom content below description')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<EmptyState title="Test" size="sm" />)
    expect(container.firstChild).toBeInTheDocument()

    rerender(<EmptyState title="Test" size="md" />)
    expect(container.firstChild).toBeInTheDocument()

    rerender(<EmptyState title="Test" size="lg" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders title as an h3 heading', () => {
    render(<EmptyState title="No data found" />)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('No data found')
  })

  it('renders without description when not provided', () => {
    const { container } = render(<EmptyState title="Empty" />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs).toHaveLength(0)
  })
})
