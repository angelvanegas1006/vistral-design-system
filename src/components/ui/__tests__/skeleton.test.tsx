import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from '../skeleton'

describe('Skeleton', () => {
  it('renders without crashing', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('applies custom width and height', () => {
    render(<Skeleton width={200} height={40} data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('40px')
  })

  it('renders as a circle when circle prop is true', () => {
    render(<Skeleton circle height={48} data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.style.borderRadius).toBe('50%')
  })

  it('renders with shimmer animation by default', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />)
    const shimmer = container.querySelector('[data-vistral="skeleton"] > div')
    expect(shimmer).toBeInTheDocument()
  })

  it('does not render shimmer when animate is false', () => {
    const { container } = render(<Skeleton animate={false} data-testid="skeleton" />)
    const shimmer = container.querySelector('[data-vistral="skeleton"] > div')
    expect(shimmer).not.toBeInTheDocument()
  })

  it('accepts string width and height', () => {
    render(<Skeleton width="100%" height="2rem" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.style.width).toBe('100%')
    expect(el.style.height).toBe('2rem')
  })
})

describe('SkeletonText', () => {
  it('renders the correct number of lines', () => {
    const { container } = render(<SkeletonText lines={4} data-testid="text" />)
    const skeletons = container.querySelectorAll('[data-vistral="skeleton"]')
    expect(skeletons).toHaveLength(4)
  })

  it('renders 3 lines by default', () => {
    const { container } = render(<SkeletonText data-testid="text" />)
    const skeletons = container.querySelectorAll('[data-vistral="skeleton"]')
    expect(skeletons).toHaveLength(3)
  })
})

describe('SkeletonCard', () => {
  it('renders without crashing', () => {
    render(<SkeletonCard data-testid="card" />)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('renders image placeholder by default', () => {
    const { container } = render(<SkeletonCard />)
    const skeletons = container.querySelectorAll('[data-vistral="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('hides image when showImage is false', () => {
    const { container } = render(<SkeletonCard showImage={false} />)
    const firstSkeleton = container.querySelector('[data-vistral="skeleton"]')
    if (firstSkeleton) {
      expect(firstSkeleton.style.height).not.toBe('160px')
    }
  })
})

describe('SkeletonAvatar', () => {
  it('renders as a circle', () => {
    render(<SkeletonAvatar data-testid="avatar" />)
    const el = screen.getByTestId('avatar')
    expect(el.style.borderRadius).toBe('50%')
  })

  it('uses default size of 40', () => {
    render(<SkeletonAvatar data-testid="avatar" />)
    const el = screen.getByTestId('avatar')
    expect(el.style.width).toBe('40px')
    expect(el.style.height).toBe('40px')
  })

  it('accepts custom size', () => {
    render(<SkeletonAvatar size={64} data-testid="avatar" />)
    const el = screen.getByTestId('avatar')
    expect(el.style.width).toBe('64px')
    expect(el.style.height).toBe('64px')
  })
})
