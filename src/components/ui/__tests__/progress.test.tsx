import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar, ProgressCircle } from '../progress'

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow to the provided value', () => {
    render(<ProgressBar value={45} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45')
  })

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<ProgressBar value={50} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('clamps value to 0-100 range', () => {
    render(<ProgressBar value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('shows label when showLabel is true', () => {
    render(<ProgressBar value={75} showLabel />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('hides label when showLabel is false', () => {
    render(<ProgressBar value={75} />)
    expect(screen.queryByText('75%')).not.toBeInTheDocument()
  })

  it('sets data-status attribute', () => {
    render(<ProgressBar value={100} status="success" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-status', 'success')
  })

  it('does not set aria-valuenow in indeterminate mode', () => {
    render(<ProgressBar indeterminate />)
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
  })
})

describe('ProgressCircle', () => {
  it('renders without crashing', () => {
    render(<ProgressCircle />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow to the provided value', () => {
    render(<ProgressCircle value={60} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60')
  })

  it('shows label when showLabel is true', () => {
    render(<ProgressCircle value={42} showLabel />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('renders custom label content', () => {
    render(<ProgressCircle value={50} label="Half" />)
    expect(screen.getByText('Half')).toBeInTheDocument()
  })
})
