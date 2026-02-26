import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '../dropdown-menu'

describe('DropdownMenu', () => {
  it('renders the trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open Menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })

  it('does not show content initially', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('shows content when trigger is clicked', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('renders trigger with aria-haspopup attribute', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
  })

  it('renders menu items with correct role', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    const items = screen.getAllByRole('menuitem')
    expect(items).toHaveLength(2)
  })

  it('renders disabled items', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Disabled Action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    const item = screen.getByText('Disabled Action').closest('[role="menuitem"]')
    expect(item).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders separator between items', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="sep" />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    expect(screen.getByTestId('sep')).toBeInTheDocument()
  })

  it('renders menu label', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders shortcut text on items', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem shortcut="⌘K">Search</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('calls onOpenChange when menu opens/closes', async () => {
    const handleOpenChange = vi.fn()
    render(
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders checkbox item with checked state', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show Grid</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await userEvent.click(screen.getByText('Open'))
    const item = screen.getByRole('menuitemcheckbox')
    expect(item).toHaveAttribute('aria-checked', 'true')
  })

  it('supports controlled open state', () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>
          <span>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Visible Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Visible Item')).toBeInTheDocument()
  })
})
