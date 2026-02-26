import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PropertyCard, PropertyCardGrid } from '../property-card'

const defaultProps = {
  title: 'Modern Apartment',
  location: 'Madrid, Spain',
  price: 250000,
}

describe('PropertyCard', () => {
  it('renders without crashing', () => {
    render(<PropertyCard {...defaultProps} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('displays the property title', () => {
    render(<PropertyCard {...defaultProps} />)
    expect(screen.getByText('Modern Apartment')).toBeInTheDocument()
  })

  it('displays the location', () => {
    render(<PropertyCard {...defaultProps} />)
    expect(screen.getByText('Madrid, Spain')).toBeInTheDocument()
  })

  it('displays the formatted price', () => {
    render(<PropertyCard {...defaultProps} />)
    expect(screen.getByText(/250\.000/)).toBeInTheDocument()
  })

  it('displays yield percentage when provided', () => {
    render(<PropertyCard {...defaultProps} yieldPercent={5.2} />)
    expect(screen.getByText('5.2 %')).toBeInTheDocument()
  })

  it('shows status badge when status is provided', () => {
    render(<PropertyCard {...defaultProps} status="available" />)
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders feature pills for bedrooms and bathrooms', () => {
    render(<PropertyCard {...defaultProps} bedrooms={3} bathrooms={2} />)
    expect(screen.getByText('3 beds')).toBeInTheDocument()
    expect(screen.getByText('2 baths')).toBeInTheDocument()
  })

  it('renders area in square meters', () => {
    render(<PropertyCard {...defaultProps} area={120} />)
    expect(screen.getByText('120 m²')).toBeInTheDocument()
  })

  it('calls onCardClick when the card is clicked', async () => {
    const user = userEvent.setup()
    const onCardClick = vi.fn()
    render(<PropertyCard {...defaultProps} onCardClick={onCardClick} />)

    await user.click(screen.getByRole('article'))
    expect(onCardClick).toHaveBeenCalledOnce()
  })

  it('renders favorite button and toggles on click', async () => {
    const user = userEvent.setup()
    const onFavoriteChange = vi.fn()
    render(<PropertyCard {...defaultProps} showFavorite onFavoriteChange={onFavoriteChange} />)

    const favButton = screen.getByLabelText('Add to favorites')
    await user.click(favButton)
    expect(onFavoriteChange).toHaveBeenCalledWith(true)
  })

  it('renders loading skeleton state', () => {
    const { container } = render(<PropertyCard {...defaultProps} loading />)
    expect(screen.queryByText('Modern Apartment')).not.toBeInTheDocument()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has correct aria-label on the article', () => {
    render(<PropertyCard {...defaultProps} />)
    expect(screen.getByRole('article')).toHaveAttribute('aria-label', 'Property: Modern Apartment')
  })
})

describe('PropertyCardGrid', () => {
  it('renders children in a grid', () => {
    render(
      <PropertyCardGrid>
        <div data-testid="child1" />
        <div data-testid="child2" />
      </PropertyCardGrid>
    )
    expect(screen.getByTestId('child1')).toBeInTheDocument()
    expect(screen.getByTestId('child2')).toBeInTheDocument()
  })
})
