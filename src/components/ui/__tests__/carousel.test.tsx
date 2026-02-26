import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Carousel, CarouselItem } from '../carousel'

describe('Carousel', () => {
  it('renders without crashing', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    )
    expect(screen.getByRole('region', { name: /carousel/i })).toBeInTheDocument()
  })

  it('renders all slides', () => {
    render(
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    )

    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })

  it('renders navigation arrows', () => {
    render(
      <Carousel showArrows>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    )

    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument()
  })

  it('navigates to next slide on arrow click', async () => {
    render(
      <Carousel showArrows showCounter>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    )

    expect(screen.getByText('1 of 3')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /next slide/i }))
    expect(screen.getByText('2 of 3')).toBeInTheDocument()
  })

  it('navigates to previous slide on arrow click', async () => {
    render(
      <Carousel showArrows showCounter loop>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    )

    await userEvent.click(screen.getByRole('button', { name: /next slide/i }))
    expect(screen.getByText('2 of 3')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /previous slide/i }))
    expect(screen.getByText('1 of 3')).toBeInTheDocument()
  })

  it('renders dot indicators', () => {
    render(
      <Carousel showDots>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    )

    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    expect(dots).toHaveLength(3)
  })

  it('navigates to specific slide via dot click', async () => {
    render(
      <Carousel showDots showCounter>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </Carousel>
    )

    const dots = screen.getAllByRole('button', { name: /go to slide/i })
    await userEvent.click(dots[2])
    expect(screen.getByText('3 of 3')).toBeInTheDocument()
  })

  it('shows counter when showCounter is true', () => {
    render(
      <Carousel showCounter>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    )

    expect(screen.getByText('1 of 2')).toBeInTheDocument()
  })

  it('loops when loop prop is true', async () => {
    render(
      <Carousel showArrows showCounter loop>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    )

    await userEvent.click(screen.getByRole('button', { name: /next slide/i }))
    expect(screen.getByText('2 of 2')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /next slide/i }))
    expect(screen.getByText('1 of 2')).toBeInTheDocument()
  })

  it('disables prev button at start without loop', () => {
    render(
      <Carousel showArrows loop={false}>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
      </Carousel>
    )

    expect(screen.getByRole('button', { name: /previous slide/i })).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(
      <Carousel ref={ref}>
        <CarouselItem>Slide 1</CarouselItem>
      </Carousel>
    )
    expect(ref).toHaveBeenCalled()
  })
})
