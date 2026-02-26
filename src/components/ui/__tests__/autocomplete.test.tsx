import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Autocomplete } from '../autocomplete'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
]

describe('Autocomplete', () => {
  it('renders without crashing', () => {
    render(<Autocomplete options={options} placeholder="Search fruits" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search fruits')).toBeInTheDocument()
  })

  it('shows dropdown on focus', async () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(options.length)
  })

  it('filters options based on input', async () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'app')

    const visibleOptions = screen.getAllByRole('option')
    expect(visibleOptions).toHaveLength(1)
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('calls onChange when an option is selected', async () => {
    const handleChange = vi.fn()
    render(<Autocomplete options={options} onChange={handleChange} />)

    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.click(screen.getByText('Banana'))

    expect(handleChange).toHaveBeenCalledWith('banana')
  })

  it('displays selected value in input', () => {
    render(<Autocomplete options={options} value="cherry" />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveValue('Cherry')
  })

  it('shows empty message when no options match', async () => {
    render(<Autocomplete options={options} emptyMessage="Nothing found" />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'xyz')

    expect(screen.getByText('Nothing found')).toBeInTheDocument()
  })

  it('shows clear button when input has value', async () => {
    render(<Autocomplete options={options} clearable />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'test')

    const clearButton = screen.getByRole('button')
    expect(clearButton).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    const handleChange = vi.fn()
    render(<Autocomplete options={options} onChange={handleChange} clearable />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'test')

    await userEvent.click(screen.getByRole('button'))
    expect(input).toHaveValue('')
    expect(handleChange).toHaveBeenCalledWith('')
  })

  it('handles keyboard navigation', async () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')

    expect(input).toHaveValue('Banana')
  })

  it('closes dropdown on Escape key', async () => {
    render(<Autocomplete options={options} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Autocomplete options={options} disabled />)
    const input = screen.getByRole('combobox')
    expect(input).toBeDisabled()
  })

  it('shows loading state', async () => {
    render(<Autocomplete options={options} loading />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
