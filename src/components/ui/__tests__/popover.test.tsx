import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover, PopoverTrigger, PopoverContent } from '../popover'

describe('Popover', () => {
  it('renders the trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByRole('button', { name: 'Open Popover' })).toBeInTheDocument()
  })

  it('does not render content when closed', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Hidden Content</PopoverContent>
      </Popover>
    )
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()
  })

  it('renders content when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover Body</PopoverContent>
      </Popover>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Popover Body')).toBeInTheDocument()
  })

  it('toggles content on repeated trigger clicks', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Toggle Content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    await user.click(trigger)
    expect(screen.getByText('Toggle Content')).toBeInTheDocument()

    await user.click(trigger)
    expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument()
  })

  it('sets aria-expanded on the trigger', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )

    const trigger = screen.getByRole('button', { name: 'Open' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('sets aria-haspopup on the trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('renders content with role dialog', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Dialog Content</PopoverContent>
      </Popover>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders in controlled open state', () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Controlled Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByText('Controlled Content')).toBeInTheDocument()
  })

  it('calls onOpenChange when trigger is clicked', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })
})
