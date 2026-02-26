import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Lightbox, LightboxTrigger } from '../lightbox'

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

const sampleImages = [
  { src: '/img1.jpg', alt: 'Image 1', name: 'photo-1.jpg' },
  { src: '/img2.jpg', alt: 'Image 2', name: 'photo-2.jpg' },
  { src: '/img3.jpg', alt: 'Image 3', name: 'photo-3.jpg' },
]

describe('Lightbox', () => {
  it('does not render when open is false', () => {
    render(<Lightbox images={sampleImages} open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open is true', () => {
    render(<Lightbox images={sampleImages} open />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays the current image', () => {
    render(<Lightbox images={sampleImages} open initialIndex={0} />)
    const images = screen.getAllByAltText('Image 1')
    expect(images[0]).toBeInTheDocument()
    expect(images[0]).toHaveAttribute('src', '/img1.jpg')
  })

  it('shows image counter when showCounter is true', () => {
    render(<Lightbox images={sampleImages} open showCounter />)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('hides counter when showCounter is false', () => {
    render(<Lightbox images={sampleImages} open showCounter={false} />)
    expect(screen.queryByText('1 / 3')).not.toBeInTheDocument()
  })

  it('displays file name when available', () => {
    render(<Lightbox images={sampleImages} open />)
    expect(screen.getByText('photo-1.jpg')).toBeInTheDocument()
  })

  it('shows navigation arrows when multiple images', () => {
    render(<Lightbox images={sampleImages} open />)
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
    expect(screen.getByLabelText('Next image')).toBeInTheDocument()
  })

  it('calls onOpenChange when close button is clicked', async () => {
    const handleOpenChange = vi.fn()
    render(<Lightbox images={sampleImages} open onOpenChange={handleOpenChange} />)

    await userEvent.click(screen.getByLabelText('Close lightbox'))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('does not render with empty images array', () => {
    render(<Lightbox images={[]} open />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows back button when showBack is true', () => {
    render(<Lightbox images={sampleImages} open showBack />)
    expect(screen.getByLabelText('Go back')).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', async () => {
    const handleBack = vi.fn()
    render(<Lightbox images={sampleImages} open showBack onBack={handleBack} />)

    await userEvent.click(screen.getByLabelText('Go back'))
    expect(handleBack).toHaveBeenCalled()
  })

  it('has aria-modal attribute', () => {
    render(<Lightbox images={sampleImages} open />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })
})

describe('LightboxTrigger', () => {
  it('renders the trigger child', () => {
    render(
      <LightboxTrigger images={sampleImages}>
        <button>Open Gallery</button>
      </LightboxTrigger>
    )
    expect(screen.getByRole('button', { name: /open gallery/i })).toBeInTheDocument()
  })

  it('opens lightbox when trigger is clicked', async () => {
    render(
      <LightboxTrigger images={sampleImages}>
        <button>View Photos</button>
      </LightboxTrigger>
    )

    await userEvent.click(screen.getByRole('button', { name: /view photos/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
