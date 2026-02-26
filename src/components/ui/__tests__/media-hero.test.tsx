import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MediaHero } from '../media-hero'

const sampleImages = [
  { src: '/img1.jpg', alt: 'Photo 1' },
  { src: '/img2.jpg', alt: 'Photo 2' },
  { src: '/img3.jpg', alt: 'Photo 3' },
  { src: '/img4.jpg', alt: 'Photo 4' },
  { src: '/img5.jpg', alt: 'Photo 5' },
]

describe('MediaHero', () => {
  it('renders with a single image', () => {
    render(<MediaHero images={[sampleImages[0]]} variant="single" />)
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument()
  })

  it('renders images in grid layout', () => {
    render(<MediaHero images={sampleImages} variant="grid" />)
    expect(screen.getByAltText(/Main property photo|Photo 1/)).toBeInTheDocument()
  })

  it('renders images in carousel layout', () => {
    render(<MediaHero images={sampleImages} variant="carousel" />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('shows navigation buttons in carousel mode', () => {
    render(<MediaHero images={sampleImages} variant="carousel" />)
    expect(screen.getByLabelText('Previous photo')).toBeInTheDocument()
    expect(screen.getByLabelText('Next photo')).toBeInTheDocument()
  })

  it('shows counter in carousel mode', () => {
    render(<MediaHero images={sampleImages} variant="carousel" showCounter />)
    expect(screen.getByText('1/5')).toBeInTheDocument()
  })

  it('navigates to next image in carousel', async () => {
    render(<MediaHero images={sampleImages} variant="carousel" showCounter />)

    await userEvent.click(screen.getByLabelText('Next photo'))
    expect(screen.getByText('2/5')).toBeInTheDocument()
  })

  it('navigates to previous image in carousel', async () => {
    render(<MediaHero images={sampleImages} variant="carousel" showCounter />)

    await userEvent.click(screen.getByLabelText('Previous photo'))
    expect(screen.getByText('5/5')).toBeInTheDocument()
  })

  it('renders "Show all photos" button in grid with extra images', () => {
    const manyImages = [...sampleImages, { src: '/img6.jpg', alt: 'Photo 6' }]
    render(<MediaHero images={manyImages} variant="grid" showAllButton />)
    expect(screen.getByText('Show all photos')).toBeInTheDocument()
  })

  it('renders with custom button text', () => {
    const manyImages = [...sampleImages, { src: '/img6.jpg', alt: 'Photo 6' }]
    render(<MediaHero images={manyImages} variant="grid" showAllButton buttonText="View Gallery" />)
    expect(screen.getByText('View Gallery')).toBeInTheDocument()
  })

  it('calls onShowAll when button is clicked', async () => {
    const handleShowAll = vi.fn()
    const manyImages = [...sampleImages, { src: '/img6.jpg', alt: 'Photo 6' }]
    render(<MediaHero images={manyImages} variant="grid" showAllButton onShowAll={handleShowAll} />)

    await userEvent.click(screen.getByText('Show all photos'))
    expect(handleShowAll).toHaveBeenCalled()
  })

  it('renders instance slot content', () => {
    render(
      <MediaHero
        images={[sampleImages[0]]}
        variant="single"
        instanceSlot={<span data-testid="tag">Featured</span>}
      />
    )
    expect(screen.getByTestId('tag')).toBeInTheDocument()
  })

  it('applies custom height', () => {
    const { container } = render(<MediaHero images={sampleImages} variant="grid" height={500} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.height).toBe('500px')
  })
})
