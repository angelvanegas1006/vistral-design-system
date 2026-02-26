import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { List, ListItem, Item } from '../list-item'
import { Star } from 'lucide-react'

describe('Item / ListItem', () => {
  it('renders with title', () => {
    render(<Item title="My Item" />)
    expect(screen.getByText('My Item')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(<Item title="Item Title" description="Item description text" />)
    expect(screen.getByText('Item Title')).toBeInTheDocument()
    expect(screen.getByText('Item description text')).toBeInTheDocument()
  })

  it('renders with leading icon', () => {
    const { container } = render(<Item title="Starred" leadingIcon={Star} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders with custom media element', () => {
    render(<Item title="Custom" media={<span data-testid="avatar">AV</span>} />)
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
  })

  it('renders with chevron when showChevron is true', () => {
    const { container } = render(<Item title="Navigate" showChevron />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('renders with actions slot', () => {
    render(<Item title="With Action" actions={<button>Edit</button>} />)
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('handles click events when clickable', async () => {
    const handleClick = vi.fn()
    render(<Item title="Clickable" clickable onClick={handleClick} />)

    await userEvent.click(screen.getByText('Clickable'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('has button role when clickable', () => {
    render(<Item title="Interactive" clickable />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has listitem role by default', () => {
    render(<Item title="Static" />)
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('renders in disabled state', () => {
    render(<Item title="Disabled" disabled />)
    const item = screen.getByText('Disabled').closest('[data-vistral="list-item"]')
    expect(item).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders selected state', () => {
    render(<Item title="Selected" selected />)
    const item = screen.getByText('Selected').closest('[data-vistral="list-item"]')
    expect(item).toHaveAttribute('aria-selected', 'true')
  })

  it('renders header and helper text', () => {
    render(<Item title="Main" header="Category" helperText="2 min ago" />)
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('2 min ago')).toBeInTheDocument()
  })

  it('ListItem is an alias for Item', () => {
    expect(ListItem).toBe(Item)
  })
})

describe('List', () => {
  it('renders children in a list container', () => {
    render(
      <List>
        <Item title="Item 1" />
        <Item title="Item 2" />
      </List>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders with dividers when divided is true', () => {
    const { container } = render(
      <List divided>
        <Item title="A" />
        <Item title="B" />
        <Item title="C" />
      </List>
    )

    const dividers = container.querySelectorAll('hr')
    expect(dividers.length).toBe(2)
  })

  it('renders without dividers by default', () => {
    const { container } = render(
      <List>
        <Item title="A" />
        <Item title="B" />
      </List>
    )

    const dividers = container.querySelectorAll('hr')
    expect(dividers.length).toBe(0)
  })

  it('supports menu role', () => {
    render(
      <List role="menu">
        <Item title="Option" />
      </List>
    )

    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})
