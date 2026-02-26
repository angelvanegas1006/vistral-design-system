import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Text } from '../text'

describe('Text', () => {
  it('renders without crashing', () => {
    render(<Text>Hello world</Text>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders body variant as p element by default', () => {
    render(<Text>Paragraph</Text>)
    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('renders heading variants as semantic heading elements', () => {
    const { rerender } = render(<Text variant="h1">Heading</Text>)
    expect(screen.getByText('Heading').tagName).toBe('H1')

    rerender(<Text variant="h2">Heading</Text>)
    expect(screen.getByText('Heading').tagName).toBe('H2')

    rerender(<Text variant="h3">Heading</Text>)
    expect(screen.getByText('Heading').tagName).toBe('H3')
  })

  it('renders caption variant as span element', () => {
    render(<Text variant="caption">Caption</Text>)
    expect(screen.getByText('Caption').tagName).toBe('SPAN')
  })

  it('renders small variant as span element', () => {
    render(<Text variant="small">Small</Text>)
    expect(screen.getByText('Small').tagName).toBe('SPAN')
  })

  it('uses the "as" prop to override the element', () => {
    render(
      <Text variant="h1" as="div">
        As Div
      </Text>
    )
    expect(screen.getByText('As Div').tagName).toBe('DIV')
  })

  it('applies variant font size', () => {
    render(<Text variant="h1">Big</Text>)
    expect(screen.getByText('Big').style.fontSize).toBe('32px')
  })

  it('applies custom color', () => {
    const { container } = render(<Text color="error">Error text</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.style.color).toBeTruthy()
  })

  it('applies muted color', () => {
    const { container } = render(<Text color="muted">Muted text</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.style.color).toBeTruthy()
  })

  it('allows weight override', () => {
    render(<Text weight={700}>Bold text</Text>)
    expect(screen.getByText('Bold text').style.fontWeight).toBe('700')
  })

  it('allows size override', () => {
    render(<Text size={20}>Custom size</Text>)
    expect(screen.getByText('Custom size').style.fontSize).toBe('20px')
  })

  it('forwards ref to the element', () => {
    let refValue: HTMLElement | null = null
    render(
      <Text
        ref={el => {
          refValue = el
        }}
      >
        Ref test
      </Text>
    )
    expect(refValue).toBeInstanceOf(HTMLElement)
  })
})
