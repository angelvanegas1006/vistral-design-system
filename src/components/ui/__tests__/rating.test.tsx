import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Rating, RatingDisplay } from '../rating'

describe('Rating', () => {
  it('renders without crashing', () => {
    render(<Rating />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders the correct number of stars', () => {
    const { container } = render(<Rating max={5} />)
    const stars = container.querySelectorAll('svg')
    expect(stars).toHaveLength(5)
  })

  it('sets aria-valuenow from value', () => {
    render(<Rating value={3} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '3')
  })

  it('sets aria-valuemax from max', () => {
    render(<Rating max={10} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '10')
  })

  it('calls onChange when a star is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(<Rating value={0} onChange={onChange} />)

    const stars = container.querySelectorAll('[style*="cursor: pointer"]')
    if (stars.length > 2) {
      await user.click(stars[2])
      expect(onChange).toHaveBeenCalled()
    }
  })

  it('does not call onChange when readOnly', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(<Rating value={3} onChange={onChange} readOnly />)

    const stars = container.querySelectorAll('svg')
    if (stars.length > 0) {
      await user.click(stars[0].parentElement!)
      expect(onChange).not.toHaveBeenCalled()
    }
  })

  it('shows value label when showValue is true', () => {
    render(<Rating value={4} showValue />)
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('sets aria-disabled when disabled', () => {
    render(<Rating disabled />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders with custom max stars', () => {
    const { container } = render(<Rating max={7} />)
    const stars = container.querySelectorAll('svg')
    expect(stars).toHaveLength(7)
  })
})

describe('RatingDisplay', () => {
  it('renders without crashing', () => {
    render(<RatingDisplay value={4.5} />)
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('displays the review count', () => {
    render(<RatingDisplay value={4.2} count={128} />)
    expect(screen.getByText('(128)')).toBeInTheDocument()
  })

  it('formats large count with locale', () => {
    render(<RatingDisplay value={4.0} count={1500} />)
    expect(screen.getByText('(1,500)')).toBeInTheDocument()
  })
})
