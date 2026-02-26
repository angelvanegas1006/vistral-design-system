import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Divider, DividerWithLabel } from '../divider'

describe('Divider', () => {
  it('renders as an hr element', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')
    expect(hr).toBeInTheDocument()
  })

  it('renders with horizontal orientation by default', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveAttribute('aria-orientation', 'horizontal')
    expect(hr).toHaveStyle({ width: '100%' })
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders with different spacing values', () => {
    const { container, rerender } = render(<Divider spacing="sm" />)
    let hr = container.querySelector('hr')
    expect(hr).toHaveStyle({ margin: '8px 0' })

    rerender(<Divider spacing="md" />)
    hr = container.querySelector('hr')
    expect(hr).toHaveStyle({ margin: '16px 0' })

    rerender(<Divider spacing="lg" />)
    hr = container.querySelector('hr')
    expect(hr).toHaveStyle({ margin: '24px 0' })
  })

  it('renders with no spacing', () => {
    const { container } = render(<Divider spacing="none" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveStyle({ margin: '0px 0' })
  })

  it('renders with custom color', () => {
    const { container } = render(<Divider color="#ff0000" />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveStyle({ backgroundColor: '#ff0000' })
  })

  it('applies custom style', () => {
    const { container } = render(<Divider style={{ opacity: 0.5 }} />)
    const hr = container.querySelector('hr')
    expect(hr).toHaveStyle({ opacity: '0.5' })
  })
})

describe('DividerWithLabel', () => {
  it('renders with label text', () => {
    render(<DividerWithLabel label="OR" />)
    expect(screen.getByText('OR')).toBeInTheDocument()
  })

  it('has separator role', () => {
    render(<DividerWithLabel label="Section" />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders with center label position by default', () => {
    const { container } = render(<DividerWithLabel label="OR" />)
    const separator = container.querySelector('[role="separator"]')
    expect(separator?.children).toHaveLength(3)
  })

  it('renders with left label position (no left line)', () => {
    const { container } = render(<DividerWithLabel label="Section" labelPosition="left" />)
    const separator = container.querySelector('[role="separator"]')
    expect(separator?.children).toHaveLength(2)
  })

  it('renders with right label position (no right line)', () => {
    const { container } = render(<DividerWithLabel label="Section" labelPosition="right" />)
    const separator = container.querySelector('[role="separator"]')
    expect(separator?.children).toHaveLength(2)
  })

  it('renders with custom color', () => {
    render(<DividerWithLabel label="OR" color="#ff0000" />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
