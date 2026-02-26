import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders with a label', () => {
    render(<Switch label="Enable notifications" />)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
  })

  it('renders with a description', () => {
    render(<Switch label="Dark mode" description="Toggle dark mode theme" />)
    expect(screen.getByText('Toggle dark mode theme')).toBeInTheDocument()
  })

  it('toggles checked state on click (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Switch />)
    const switchEl = screen.getByRole('switch')

    expect(switchEl).not.toBeChecked()
    await user.click(switchEl)
    expect(switchEl).toBeChecked()
    await user.click(switchEl)
    expect(switchEl).not.toBeChecked()
  })

  it('respects controlled checked prop', () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByRole('switch')).not.toBeChecked()

    rerender(<Switch checked={true} onCheckedChange={() => {}} />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('calls onCheckedChange when toggled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Switch onCheckedChange={handleChange} />)

    await user.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Switch disabled label="Disabled switch" />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('does not toggle when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Switch disabled onCheckedChange={handleChange} />)

    await user.click(screen.getByRole('switch'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('has correct aria-checked attribute', () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')

    rerender(<Switch checked={true} onCheckedChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('supports defaultChecked for uncontrolled mode', () => {
    render(<Switch defaultChecked={true} />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('renders label on the left when labelPosition is left', () => {
    const { container } = render(<Switch label="Left label" labelPosition="left" />)
    const label = container.querySelector('label')
    expect(label).toBeInTheDocument()
    expect(label?.style.flexDirection).toBe('row-reverse')
  })

  it('forwards ref to the input element', () => {
    let refValue: HTMLInputElement | null = null
    render(
      <Switch
        ref={el => {
          refValue = el
        }}
      />
    )
    expect(refValue).toBeInstanceOf(HTMLInputElement)
  })
})
