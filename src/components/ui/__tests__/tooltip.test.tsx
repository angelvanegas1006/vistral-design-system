import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../tooltip'

function renderTooltip(props: Record<string, unknown> = {}) {
  return render(
    <TooltipProvider>
      <Tooltip delayDuration={0} {...props}>
        <TooltipTrigger>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

describe('Tooltip', () => {
  it('renders the trigger without crashing', () => {
    renderTooltip()
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('does not show tooltip content by default', () => {
    renderTooltip()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByText('Tooltip text')).toBeInTheDocument()
  })

  it('hides tooltip content on unhover', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()

    await user.unhover(screen.getByText('Hover me'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('supports controlled open state', () => {
    render(
      <TooltipProvider>
        <Tooltip open={true}>
          <TooltipTrigger>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Always visible</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('does not show when controlled open is false', () => {
    render(
      <TooltipProvider>
        <Tooltip open={false}>
          <TooltipTrigger>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Hidden</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('calls onOpenChange callback', async () => {
    const handleOpenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <TooltipProvider>
        <Tooltip delayDuration={0} onOpenChange={handleOpenChange}>
          <TooltipTrigger>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByText('Trigger'))
    expect(handleOpenChange).toHaveBeenCalledWith(true)

    await user.unhover(screen.getByText('Trigger'))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders tooltip with role="tooltip"', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByText('Hover me'))
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveAttribute('data-vistral', 'tooltip')
  })

  it('supports defaultOpen', () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Default open</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('renders data-side attribute on content', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Bottom tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByText('Trigger'))
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-side', 'bottom')
  })

  it('renders provider children', () => {
    render(
      <TooltipProvider>
        <div data-testid="child">Child content</div>
      </TooltipProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
