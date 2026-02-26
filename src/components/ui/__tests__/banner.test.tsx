import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Banner, PromoBanner } from '../banner'

describe('Banner', () => {
  it('renders without crashing', () => {
    render(<Banner>Banner message</Banner>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Banner message')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(<Banner title="Important">Details here</Banner>)
    expect(screen.getByText('Important')).toBeInTheDocument()
    expect(screen.getByText('Details here')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Banner variant="info">Info</Banner>)
    expect(screen.getByText('Info')).toBeInTheDocument()

    rerender(<Banner variant="success">Success</Banner>)
    expect(screen.getByText('Success')).toBeInTheDocument()

    rerender(<Banner variant="warning">Warning</Banner>)
    expect(screen.getByText('Warning')).toBeInTheDocument()

    rerender(<Banner variant="error">Error</Banner>)
    expect(screen.getByText('Error')).toBeInTheDocument()

    rerender(<Banner variant="promo">Promo</Banner>)
    expect(screen.getByText('Promo')).toBeInTheDocument()
  })

  it('renders icon by default', () => {
    render(<Banner>With icon</Banner>)
    const alert = screen.getByRole('alert')
    expect(alert.querySelector('svg')).toBeInTheDocument()
  })

  it('hides icon when hideIcon is true', () => {
    render(
      <Banner hideIcon data-testid="banner">
        No icon
      </Banner>
    )
    const alert = screen.getByRole('alert')
    const svgs = alert.querySelectorAll('svg')
    expect(svgs.length).toBe(0)
  })

  it('renders dismiss button when dismissible', () => {
    render(<Banner dismissible>Dismissible</Banner>)
    const buttons = screen.getByRole('alert').querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('hides banner when dismissed', async () => {
    const handleDismiss = vi.fn()
    render(
      <Banner dismissible onDismiss={handleDismiss}>
        Dismiss me
      </Banner>
    )

    const buttons = screen.getByRole('alert').querySelectorAll('button')
    const dismissButton = buttons[buttons.length - 1]
    await userEvent.click(dismissButton)

    expect(handleDismiss).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders action button when action is provided', () => {
    const handleClick = vi.fn()
    render(<Banner action={{ label: 'Learn More', onClick: handleClick }}>With action</Banner>)

    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('calls action onClick when action button is clicked', async () => {
    const handleClick = vi.fn()
    render(<Banner action={{ label: 'Learn More', onClick: handleClick }}>With action</Banner>)

    await userEvent.click(screen.getByRole('button', { name: /learn more/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Banner ref={ref}>Ref test</Banner>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('PromoBanner', () => {
  it('renders without crashing', () => {
    render(<PromoBanner>Special offer!</PromoBanner>)
    expect(screen.getByText('Special offer!')).toBeInTheDocument()
  })

  it('renders dismiss button by default', () => {
    const { container } = render(<PromoBanner>Promo</PromoBanner>)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('hides when dismissed', async () => {
    const handleDismiss = vi.fn()
    const { container } = render(<PromoBanner onDismiss={handleDismiss}>Promo</PromoBanner>)

    await userEvent.click(container.querySelector('button')!)
    expect(handleDismiss).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Promo')).not.toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<PromoBanner ref={ref}>Ref test</PromoBanner>)
    expect(ref).toHaveBeenCalled()
  })
})
