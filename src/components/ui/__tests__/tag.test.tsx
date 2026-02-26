import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tag } from '../tag'

describe('Tag', () => {
  it('renders without crashing', () => {
    render(<Tag>Status</Tag>)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders with default variant styling', () => {
    const { container } = render(<Tag>Default</Tag>)
    const tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.getPropertyValue('--v-bg')).toBe('#f4f4f5')
  })

  it('renders with different variants', () => {
    const { container, rerender } = render(<Tag variant="error">Error</Tag>)
    let tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.getPropertyValue('--v-fg')).toBe('#dc2626')

    rerender(<Tag variant="success">Success</Tag>)
    tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.getPropertyValue('--v-fg')).toBe('#16a34a')

    rerender(<Tag variant="info">Info</Tag>)
    tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.getPropertyValue('--v-fg')).toBe('#1d4ed8')
  })

  it('renders with different sizes', () => {
    const { container, rerender } = render(<Tag size="sm">Small</Tag>)
    let tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.height).toBe('20px')

    rerender(<Tag size="md">Medium</Tag>)
    tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.height).toBe('24px')

    rerender(<Tag size="lg">Large</Tag>)
    tag = container.querySelector('[data-vistral="tag"]') as HTMLElement
    expect(tag.style.height).toBe('28px')
  })

  it('shows close button when closable', () => {
    render(<Tag closable>Removable</Tag>)
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Tag closable onClose={handleClose}>
        Remove me
      </Tag>
    )

    await user.click(screen.getByRole('button', { name: /remove/i }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not show close button by default', () => {
    render(<Tag>No close</Tag>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has button role when clickable', () => {
    render(<Tag clickable>Clickable</Tag>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('generates an accessible aria-label from text content', () => {
    render(<Tag>React</Tag>)
    const tag = screen.getByLabelText('React tag')
    expect(tag).toBeInTheDocument()
  })

  it('includes remove hint in aria-label when closable', () => {
    render(<Tag closable>React</Tag>)
    const tag = screen.getByLabelText('React tag, click to remove')
    expect(tag).toBeInTheDocument()
  })

  it('forwards ref to the span element', () => {
    let refValue: HTMLSpanElement | null = null
    render(
      <Tag
        ref={el => {
          refValue = el
        }}
      >
        Ref
      </Tag>
    )
    expect(refValue?.tagName).toBe('SPAN')
  })
})
