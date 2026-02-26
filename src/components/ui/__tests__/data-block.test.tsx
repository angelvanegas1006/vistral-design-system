import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataBlock, DataBlockGrid } from '../data-block'
import { DollarSign } from 'lucide-react'

describe('DataBlock', () => {
  it('renders with label and value', () => {
    render(<DataBlock label="Revenue" value="$45,000" />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$45,000')).toBeInTheDocument()
  })

  it('renders with numeric value', () => {
    render(<DataBlock label="Users" value={1234} />)
    expect(screen.getByText('1234')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const { container } = render(<DataBlock label="Revenue" value="$10k" icon={DollarSign} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders positive trend', () => {
    render(<DataBlock label="Growth" value="120" trend={12} />)
    expect(screen.getByText(/\+12%/)).toBeInTheDocument()
  })

  it('renders negative trend', () => {
    render(<DataBlock label="Churn" value="5%" trend={-3} />)
    expect(screen.getByText(/-3%/)).toBeInTheDocument()
  })

  it('renders neutral trend (zero)', () => {
    render(<DataBlock label="Stable" value="100" trend={0} />)
    expect(screen.getByText(/0%/)).toBeInTheDocument()
  })

  it('renders trend label', () => {
    render(<DataBlock label="Revenue" value="$45k" trend={8} trendLabel="vs last month" />)
    expect(screen.getByText(/vs last month/)).toBeInTheDocument()
  })

  it('renders in loading state', () => {
    const { container } = render(<DataBlock label="Revenue" value="$45k" loading />)
    expect(screen.queryByText('$45k')).not.toBeInTheDocument()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<DataBlock label="Test" value="100" size="sm" />)
    expect(container.firstChild).toBeInTheDocument()

    rerender(<DataBlock label="Test" value="100" size="md" />)
    expect(container.firstChild).toBeInTheDocument()

    rerender(<DataBlock label="Test" value="100" size="lg" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies custom className and style', () => {
    const { container } = render(
      <DataBlock label="Test" value="100" style={{ background: 'red' }} data-testid="block" />
    )
    expect(screen.getByTestId('block')).toBeInTheDocument()
    expect(container.firstChild).toHaveStyle({ background: 'red' })
  })
})

describe('DataBlockGrid', () => {
  it('renders children in a grid', () => {
    render(
      <DataBlockGrid data-testid="grid">
        <DataBlock label="A" value="1" />
        <DataBlock label="B" value="2" />
        <DataBlock label="C" value="3" />
      </DataBlockGrid>
    )

    const grid = screen.getByTestId('grid')
    expect(grid.children).toHaveLength(3)
  })

  it('renders with custom column count', () => {
    render(
      <DataBlockGrid columns={2} data-testid="grid">
        <DataBlock label="A" value="1" />
        <DataBlock label="B" value="2" />
      </DataBlockGrid>
    )

    const grid = screen.getByTestId('grid')
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, 1fr)')
  })
})
