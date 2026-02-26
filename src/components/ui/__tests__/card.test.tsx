import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card data-testid="card">Card content</Card>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders complete card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Card size="sm" data-testid="card">
        Small
      </Card>
    )
    expect(screen.getByTestId('card').style.padding).toBe('16px')

    rerender(
      <Card size="md" data-testid="card">
        Medium
      </Card>
    )
    expect(screen.getByTestId('card').style.padding).toBe('20px')

    rerender(
      <Card size="lg" data-testid="card">
        Large
      </Card>
    )
    expect(screen.getByTestId('card').style.padding).toBe('24px')
  })

  it('renders flat card without shadow', () => {
    render(
      <Card flat data-testid="card">
        Flat
      </Card>
    )
    expect(screen.getByTestId('card').style.boxShadow).toBe('none')
  })

  it('renders hoverable card', () => {
    render(
      <Card hoverable data-testid="card">
        Hoverable
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveAttribute('data-hoverable', 'true')
  })

  it('renders CardTitle with custom heading level', () => {
    render(<CardTitle as="h1">Heading 1</CardTitle>)
    const heading = screen.getByText('Heading 1')
    expect(heading.tagName).toBe('H1')
  })

  it('renders CardTitle as h3 by default', () => {
    render(<CardTitle>Default Heading</CardTitle>)
    const heading = screen.getByText('Default Heading')
    expect(heading.tagName).toBe('H3')
  })

  it('renders CardHeader with right content', () => {
    render(
      <CardHeader rightContent={<span data-testid="right">Action</span>}>
        <CardTitle>Title</CardTitle>
      </CardHeader>
    )

    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('renders CardFooter with different alignments', () => {
    const { rerender } = render(
      <CardFooter align="right" data-testid="footer">
        <button>Action</button>
      </CardFooter>
    )
    expect(screen.getByTestId('footer').style.justifyContent).toBe('flex-end')

    rerender(
      <CardFooter align="between" data-testid="footer">
        <button>Cancel</button>
        <button>Save</button>
      </CardFooter>
    )
    expect(screen.getByTestId('footer').style.justifyContent).toBe('space-between')
  })

  it('forwards ref on Card', () => {
    const ref = vi.fn()
    render(<Card ref={ref}>Ref test</Card>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom style', () => {
    render(
      <Card data-testid="card" style={{ maxWidth: 400 }}>
        Styled
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveStyle({ maxWidth: '400px' })
  })
})
