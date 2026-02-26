import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
} from '../context-menu'

describe('ContextMenu', () => {
  it('renders trigger element', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    expect(screen.getByText('Right click me')).toBeInTheDocument()
  })

  it('does not show menu content initially', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('shows menu on right-click (contextmenu event)', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Right click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Right click me'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('renders menu items with menuitem role', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    const items = screen.getAllByRole('menuitem')
    expect(items).toHaveLength(2)
  })

  it('renders disabled menu items', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled>Disabled Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    const item = screen.getByText('Disabled Item').closest('[role="menuitem"]')
    expect(item).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders destructive menu items', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem destructive>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('renders menu label', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem>Edit</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('renders separator', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuSeparator data-testid="separator" />
          <ContextMenuItem>Item 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByTestId('separator')).toBeInTheDocument()
  })

  it('renders shortcut text on items', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByText('⌘C')).toBeInTheDocument()
  })

  it('calls onOpenChange when menu opens', () => {
    const handleOpenChange = vi.fn()
    render(
      <ContextMenu onOpenChange={handleOpenChange}>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders checkbox item with checked state', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Show Grid</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByText('Show Grid')).toBeInTheDocument()
  })

  it('renders radio item', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Trigger</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioItem checked>Option A</ContextMenuRadioItem>
          <ContextMenuRadioItem>Option B</ContextMenuRadioItem>
        </ContextMenuContent>
      </ContextMenu>
    )

    fireEvent.contextMenu(screen.getByText('Trigger'))
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })
})
