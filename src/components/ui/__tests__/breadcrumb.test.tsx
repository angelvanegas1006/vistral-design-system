import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbHome } from '../breadcrumb'

describe('Breadcrumb', () => {
  it('renders without crashing', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument()
  })

  it('renders multiple breadcrumb items with separators', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink current>Widget</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Widget')).toBeInTheDocument()
  })

  it('renders separators between items', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink current>Page</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    const separators = container.querySelectorAll('[role="presentation"]')
    expect(separators.length).toBe(1)
  })

  it('marks current page with aria-current', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink current>Current Page</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page')
  })

  it('renders current page as span (not link)', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink current>Current</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    const currentEl = screen.getByText('Current')
    expect(currentEl.tagName).toBe('SPAN')
  })

  it('renders links with href attribute', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/test">Test Link</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    const link = screen.getByText('Test Link')
    expect(link.closest('a')).toHaveAttribute('href', '/test')
  })

  it('renders BreadcrumbHome with icon', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbHome href="/" />
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink?.querySelector('svg')).toBeInTheDocument()
  })

  it('renders BreadcrumbHome as icon only', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbHome href="/" iconOnly />
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('forwards ref on Breadcrumb', () => {
    const ref = vi.fn()
    render(
      <Breadcrumb ref={ref}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    expect(ref).toHaveBeenCalled()
  })

  it('renders with ordered list for a11y', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(container.querySelector('ol')).toBeInTheDocument()
  })

  it('renders items as list items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem data-testid="bc-item">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )

    expect(screen.getByTestId('bc-item').tagName).toBe('LI')
  })
})
