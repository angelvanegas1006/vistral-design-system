import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToggleGroup, ToggleGroupItem } from '../toggle-group'

describe('ToggleGroup', () => {
  it('renders without crashing', () => {
    render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('renders all items with radio role', () => {
    render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('selects the default value', () => {
    render(
      <ToggleGroup defaultValue="b">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole('radio', { name: 'B' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('aria-checked', 'false')
  })

  it('changes selection on click in single mode', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ToggleGroup defaultValue="a" onValueChange={handleChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )

    await user.click(screen.getByRole('radio', { name: 'B' }))
    expect(handleChange).toHaveBeenCalledWith('b')
  })

  it('deselects current value on click in single mode', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ToggleGroup defaultValue="a" onValueChange={handleChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )

    await user.click(screen.getByRole('radio', { name: 'A' }))
    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('supports multiple selection', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ToggleGroup multiple defaultValue={['a']} onValueChange={handleChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    )

    await user.click(screen.getByRole('radio', { name: 'B' }))
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'])
  })

  it('deselects in multiple mode', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ToggleGroup multiple defaultValue={['a', 'b']} onValueChange={handleChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )

    await user.click(screen.getByRole('radio', { name: 'A' }))
    expect(handleChange).toHaveBeenCalledWith(['b'])
  })

  it('supports controlled value', () => {
    render(
      <ToggleGroup value="b" onValueChange={() => {}}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole('radio', { name: 'B' })).toHaveAttribute('aria-checked', 'true')
  })

  it('disables all items when group is disabled', () => {
    render(
      <ToggleGroup defaultValue="a" disabled>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )
    const group = screen.getByRole('group')
    expect(group.style.opacity).toBe('0.5')
  })

  it('does not change when group is disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ToggleGroup defaultValue="a" disabled onValueChange={handleChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    )

    await user.click(screen.getByRole('radio', { name: 'B' }))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('forwards ref to the container', () => {
    let refValue: HTMLDivElement | null = null
    render(
      <ToggleGroup
        defaultValue="a"
        ref={el => {
          refValue = el
        }}
      >
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(refValue).toBeInstanceOf(HTMLElement)
  })
})
