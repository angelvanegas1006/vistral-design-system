import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagInput } from '../tag-input'

describe('TagInput', () => {
  it('renders without crashing', () => {
    render(<TagInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with a label', () => {
    render(<TagInput label="Tags" />)
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renders with placeholder when no tags', () => {
    render(<TagInput placeholder="Add a tag..." />)
    expect(screen.getByPlaceholderText('Add a tag...')).toBeInTheDocument()
  })

  it('displays provided tags', () => {
    render(<TagInput value={['React', 'TypeScript']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('adds a tag on Enter key', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TagInput onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'NewTag{Enter}')
    expect(handleChange).toHaveBeenCalledWith(['NewTag'])
  })

  it('adds a tag on comma key', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TagInput onChange={handleChange} separators={['Enter', ',']} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'Tag1,')
    expect(handleChange).toHaveBeenCalledWith(['Tag1'])
  })

  it('removes a tag when its remove button is clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TagInput value={['React', 'Vue']} onChange={handleChange} />)

    const removeButtons = screen.getAllByRole('button')
    await user.click(removeButtons[0])
    expect(handleChange).toHaveBeenCalledWith(['Vue'])
  })

  it('removes last tag on Backspace when input is empty', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TagInput defaultValue={['React', 'Vue']} onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.keyboard('{Backspace}')
    expect(handleChange).toHaveBeenCalledWith(['React'])
  })

  it('prevents duplicate tags by default', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TagInput defaultValue={['React']} onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'React{Enter}')
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('disables input when disabled', () => {
    render(<TagInput disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders helper text', () => {
    render(<TagInput helperText="Press enter to add" />)
    expect(screen.getByText('Press enter to add')).toBeInTheDocument()
  })

  it('respects maxTags limit', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TagInput defaultValue={['A', 'B']} maxTags={2} onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    await user.type(input, 'C{Enter}')
    expect(handleChange).not.toHaveBeenCalled()
  })
})
