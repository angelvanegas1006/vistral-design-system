import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox } from '../combobox'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
]

describe('Combobox', () => {
  it('renders without crashing', () => {
    render(<Combobox options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('displays placeholder text', () => {
    render(<Combobox options={options} placeholder="Choose framework" />)
    expect(screen.getByText('Choose framework')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    render(<Combobox options={options} />)
    await userEvent.click(screen.getByRole('combobox'))

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(options.length)
  })

  it('calls onChange when an option is selected', async () => {
    const handleChange = vi.fn()
    render(<Combobox options={options} onChange={handleChange} />)

    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Vue'))

    expect(handleChange).toHaveBeenCalledWith('vue')
  })

  it('displays selected value', () => {
    render(<Combobox options={options} value="react" />)
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Combobox options={options} label="Framework" />)
    expect(screen.getByText('Framework')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Combobox options={options} error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('shows description text', () => {
    render(<Combobox options={options} description="Select your preferred framework" />)
    expect(screen.getByText('Select your preferred framework')).toBeInTheDocument()
  })

  it('filters options when searching', async () => {
    render(<Combobox options={options} searchable />)

    await userEvent.click(screen.getByRole('combobox'))

    const searchInput = screen.getByPlaceholderText('Search element')
    await userEvent.type(searchInput, 'rea')

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(visibleOptions[0]).toHaveTextContent('React')
  })

  it('shows empty message when no options match', async () => {
    render(<Combobox options={options} searchable />)

    await userEvent.click(screen.getByRole('combobox'))

    const searchInput = screen.getByPlaceholderText('Search element')
    await userEvent.type(searchInput, 'xyz')

    expect(screen.getByText('No element found')).toBeInTheDocument()
  })

  it('supports multiple selection', async () => {
    const handleChange = vi.fn()
    render(<Combobox options={options} multiple value={[]} onChange={handleChange} />)

    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('React'))

    expect(handleChange).toHaveBeenCalledWith(['react'])
  })

  it('is disabled when disabled prop is true', () => {
    render(<Combobox options={options} disabled />)
    expect(screen.getByRole('combobox')).toHaveAttribute('tabindex', '-1')
  })

  it('shows clear button when value is selected', () => {
    render(<Combobox options={options} value="react" clearable />)
    expect(screen.getByRole('button', { name: /clear selection/i })).toBeInTheDocument()
  })

  it('clears selection when clear button is clicked', async () => {
    const handleChange = vi.fn()
    render(<Combobox options={options} value="react" clearable onChange={handleChange} />)

    await userEvent.click(screen.getByRole('button', { name: /clear selection/i }))
    expect(handleChange).toHaveBeenCalledWith('')
  })
})
