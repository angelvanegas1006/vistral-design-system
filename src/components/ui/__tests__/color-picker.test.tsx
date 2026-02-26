import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from '../color-picker'

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    render(<ColorPicker data-testid="picker" />)
    expect(screen.getByTestId('picker')).toBeInTheDocument()
  })

  it('displays the current color value', () => {
    render(<ColorPicker value="#FF0000" />)
    expect(screen.getByText('#FF0000')).toBeInTheDocument()
  })

  it('displays default color when no value is provided', () => {
    render(<ColorPicker />)
    expect(screen.getByText('#2050F6')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<ColorPicker label="Background Color" />)
    expect(screen.getByText('Background Color')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    render(<ColorPicker data-testid="picker" />)

    const trigger = screen.getByText('#2050F6').closest('[data-vistral-interactive]')!
    await userEvent.click(trigger)

    expect(screen.getByPlaceholderText('#000000')).toBeInTheDocument()
  })

  it('shows preset colors in dropdown', async () => {
    render(<ColorPicker showPresets />)

    const trigger = screen.getByText('#2050F6').closest('[data-vistral-interactive]')!
    await userEvent.click(trigger)

    const presetButtons = screen.getAllByRole('button')
    expect(presetButtons.length).toBeGreaterThan(5)
  })

  it('calls onChange when a preset is clicked', async () => {
    const handleChange = vi.fn()
    render(<ColorPicker onChange={handleChange} />)

    const trigger = screen.getByText('#2050F6').closest('[data-vistral-interactive]')!
    await userEvent.click(trigger)

    const presetButtons = screen.getAllByRole('button')
    await userEvent.click(presetButtons[0])

    expect(handleChange).toHaveBeenCalled()
  })

  it('shows hex input in dropdown', async () => {
    render(<ColorPicker showInput />)

    const trigger = screen.getByText('#2050F6').closest('[data-vistral-interactive]')!
    await userEvent.click(trigger)

    expect(screen.getByPlaceholderText('#000000')).toBeInTheDocument()
  })

  it('updates color via hex input', async () => {
    const handleChange = vi.fn()
    render(<ColorPicker onChange={handleChange} />)

    const trigger = screen.getByText('#2050F6').closest('[data-vistral-interactive]')!
    await userEvent.click(trigger)

    const hexInput = screen.getByPlaceholderText('#000000')
    await userEvent.clear(hexInput)
    await userEvent.type(hexInput, '#FF5500')

    expect(handleChange).toHaveBeenCalledWith('#FF5500')
  })

  it('does not open when disabled', async () => {
    render(<ColorPicker disabled />)

    const trigger = screen.getByText('#2050F6').closest('[data-vistral-interactive]')!
    await userEvent.click(trigger)

    expect(screen.queryByPlaceholderText('#000000')).not.toBeInTheDocument()
  })

  it('renders color swatch preview', () => {
    const { container } = render(<ColorPicker value="#22c55e" />)
    const swatch = container.querySelector('[data-vistral-interactive] > div')
    expect(swatch).toBeInTheDocument()
    expect(swatch?.style.backgroundColor).toBe('rgb(34, 197, 94)')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<ColorPicker ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })
})
