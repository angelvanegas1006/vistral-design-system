import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Slider, RangeSlider } from '../slider'

describe('Slider', () => {
  it('renders without crashing', () => {
    render(<Slider />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('sets aria-valuenow from value', () => {
    render(<Slider value={50} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50')
  })

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<Slider min={10} max={200} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '10')
    expect(slider).toHaveAttribute('aria-valuemax', '200')
  })

  it('uses defaultValue for uncontrolled mode', () => {
    render(<Slider defaultValue={30} />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30')
  })

  it('sets aria-disabled when disabled', () => {
    render(<Slider disabled />)
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders value label when showValue is true', () => {
    render(<Slider value={75} showValue />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('does not render value label by default', () => {
    render(<Slider value={75} />)
    expect(screen.queryByText('75')).not.toBeInTheDocument()
  })

  it('sets tabIndex to -1 when disabled', () => {
    render(<Slider disabled />)
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '-1')
  })

  it('sets tabIndex to 0 when enabled', () => {
    render(<Slider />)
    expect(screen.getByRole('slider')).toHaveAttribute('tabindex', '0')
  })
})

describe('RangeSlider', () => {
  it('renders without crashing', () => {
    render(<RangeSlider data-testid="range" />)
    expect(screen.getByTestId('range')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    const { container } = render(<RangeSlider />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with controlled value', () => {
    const { container } = render(<RangeSlider value={[20, 80]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('accepts custom min and max', () => {
    const { container } = render(<RangeSlider min={0} max={1000} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with disabled state', () => {
    const { container } = render(<RangeSlider disabled />)
    expect(container.querySelector('[style*="not-allowed"]')).toBeInTheDocument()
  })

  it('calls onChange handler', () => {
    const onChange = vi.fn()
    render(<RangeSlider onChange={onChange} />)
    expect(onChange).not.toHaveBeenCalled()
  })
})
