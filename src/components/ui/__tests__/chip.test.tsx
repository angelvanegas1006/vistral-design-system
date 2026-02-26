import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Chip, ChipGroup } from '../chip'

describe('Chip', () => {
  it('renders without crashing', () => {
    render(<Chip>Tag</Chip>)
    expect(screen.getByText('Tag')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Chip variant="filled">Filled</Chip>)
    expect(screen.getByText('Filled')).toBeInTheDocument()

    rerender(<Chip variant="outlined">Outlined</Chip>)
    expect(screen.getByText('Outlined')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Chip onClick={handleClick}>Clickable</Chip>)

    await userEvent.click(screen.getByText('Clickable'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Chip onClick={handleClick} disabled>
        Disabled
      </Chip>
    )

    await userEvent.click(screen.getByText('Disabled'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders selected state with aria-pressed', () => {
    render(<Chip selected>Selected</Chip>)
    expect(screen.getByRole('button', { name: /selected/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })

  it('renders with remove button', () => {
    render(<Chip rightElement="remove">Removable</Chip>)
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  it('calls onRemove when remove is clicked', async () => {
    const handleRemove = vi.fn()
    render(
      <Chip rightElement="remove" onRemove={handleRemove}>
        Removable
      </Chip>
    )

    await userEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('renders with count', () => {
    render(
      <Chip rightElement="count" count={5}>
        With Count
      </Chip>
    )
    expect(screen.getByText('(5)')).toBeInTheDocument()
  })

  it('shows dropdown indicator when rightElement is dropdown', () => {
    const { container } = render(<Chip rightElement="dropdown">Dropdown</Chip>)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Chip disabled>Disabled</Chip>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Chip ref={ref}>Ref test</Chip>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('ChipGroup', () => {
  it('renders children in a group', () => {
    render(
      <ChipGroup>
        <Chip>Chip A</Chip>
        <Chip>Chip B</Chip>
        <Chip>Chip C</Chip>
      </ChipGroup>
    )

    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByText('Chip A')).toBeInTheDocument()
    expect(screen.getByText('Chip B')).toBeInTheDocument()
    expect(screen.getByText('Chip C')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(
      <ChipGroup ref={ref}>
        <Chip>Chip A</Chip>
      </ChipGroup>
    )
    expect(ref).toHaveBeenCalled()
  })
})
