import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from '../search-input'

describe('SearchInput', () => {
  it('renders without crashing', () => {
    render(<SearchInput />)
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  it('renders with the default placeholder', () => {
    render(<SearchInput />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders with a custom placeholder', () => {
    render(<SearchInput placeholder="Find properties..." />)
    expect(screen.getByPlaceholderText('Find properties...')).toBeInTheDocument()
  })

  it('displays the controlled value', () => {
    render(<SearchInput value="test query" />)
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchInput onChange={onChange} />)

    await user.type(screen.getByRole('searchbox'), 'hello')
    expect(onChange).toHaveBeenCalledTimes(5)
    expect(onChange).toHaveBeenLastCalledWith('hello')
  })

  it('calls onSearch when Enter is pressed', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchInput value="query" onSearch={onSearch} />)

    await user.type(screen.getByRole('searchbox'), '{Enter}')
    expect(onSearch).toHaveBeenCalledWith('query')
  })

  it('shows clear button when there is a value', () => {
    render(<SearchInput value="something" clearable />)
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('hides clear button when value is empty', () => {
    render(<SearchInput value="" clearable />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  it('calls onChange with empty string when clear is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchInput value="text" onChange={onChange} clearable />)

    await user.click(screen.getByLabelText('Clear search'))
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('renders label when provided', () => {
    render(<SearchInput label="Search properties" />)
    expect(screen.getByText('Search properties')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<SearchInput helperText="Type at least 3 characters" />)
    expect(screen.getByText('Type at least 3 characters')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is true', () => {
    render(<SearchInput error />)
    expect(screen.getByRole('searchbox')).toHaveAttribute('aria-invalid', 'true')
  })
})
