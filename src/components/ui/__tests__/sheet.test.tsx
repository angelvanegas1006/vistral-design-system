import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '../sheet'

describe('Sheet', () => {
  it('renders the trigger', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button>Open Sheet</button>
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>
    )
    expect(screen.getByRole('button', { name: 'Open Sheet' })).toBeInTheDocument()
  })

  it('does not render content when closed', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>Hidden Content</SheetContent>
      </Sheet>
    )
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()
  })

  it('renders content when open is true', () => {
    render(
      <Sheet open>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>Sheet Body</SheetContent>
      </Sheet>
    )
    expect(screen.getByText('Sheet Body')).toBeInTheDocument()
  })

  it('renders content with role dialog when open', () => {
    render(
      <Sheet open>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('sets aria-modal on the content', () => {
    render(
      <Sheet open>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>
    )
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('calls onOpenChange when trigger is clicked', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Sheet onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders close button when open', () => {
    render(
      <Sheet open>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>Content</SheetContent>
      </Sheet>
    )
    const dialog = screen.getByRole('dialog')
    const closeBtn = dialog.querySelector('button')
    expect(closeBtn).toBeInTheDocument()
  })
})

describe('SheetHeader', () => {
  it('renders children', () => {
    render(
      <Sheet open>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>Header Content</SheetHeader>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })
})

describe('SheetTitle', () => {
  it('renders as an h2 element', () => {
    render(
      <Sheet open>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
    expect(screen.getByRole('heading', { name: 'My Title', level: 2 })).toBeInTheDocument()
  })
})
