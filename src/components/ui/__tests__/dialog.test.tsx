import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../dialog'
import { Button } from '../button'

describe('Dialog', () => {
  it('renders dialog when opened', async () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /test dialog/i })).toBeInTheDocument()
      expect(screen.getByText(/this is a test dialog/i)).toBeInTheDocument()
    })
  })

  it('opens dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    const trigger = screen.getByRole('button', { name: /open dialog/i })
    await userEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByText(/dialog title/i)).toBeInTheDocument()
    })
  })

  it('closes dialog when close button is clicked', async () => {
    const handleOpenChange = vi.fn()
    const { rerender } = render(
      <Dialog open onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )

    const closeButtons = screen.getAllByRole('button', { name: /close/i })
    const closeButton = closeButtons[closeButtons.length - 1] // Get the last one (the actual close button)
    await userEvent.click(closeButton)

    // Re-render with closed state
    rerender(
      <Dialog open={false} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )

    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })
  })

  it('renders dialog header with title', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Header Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText(/header title/i)).toBeInTheDocument()
  })

  it('renders dialog description', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogDescription>Dialog description text</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText(/dialog description text/i)).toBeInTheDocument()
  })

  it('renders dialog footer', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogFooter>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
  })

  it('handles different dialog sizes', () => {
    const { rerender } = render(
      <Dialog open>
        <DialogContent size="sm">
          <DialogTitle>Small Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText(/small dialog/i)).toBeInTheDocument()

    rerender(
      <Dialog open>
        <DialogContent size="lg">
          <DialogTitle>Large Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText(/large dialog/i)).toBeInTheDocument()
  })

  it('renders with back button when showBack is true', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader showBack>
            <DialogTitle>With Back</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    const backButton = screen.getByRole('button', { name: /back/i })
    expect(backButton).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', async () => {
    const handleBack = vi.fn()
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader showBack onBack={handleBack}>
            <DialogTitle>With Back</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    const backButton = screen.getByRole('button', { name: /back/i })
    await userEvent.click(backButton)

    expect(handleBack).toHaveBeenCalled()
  })

  it('renders close button (X) in desktop variant', () => {
    render(
      <Dialog open>
        <DialogContent variant="desktop">
          <DialogTitle>Desktop Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    // Close button should be present (Radix UI adds it)
    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton).toBeInTheDocument()
  })

  it('handles mobile variant', () => {
    render(
      <Dialog open>
        <DialogContent variant="mobile">
          <DialogTitle>Mobile Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByText(/mobile dialog/i)).toBeInTheDocument()
  })
})
