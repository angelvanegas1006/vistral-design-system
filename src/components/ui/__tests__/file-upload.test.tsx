import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FileUpload } from '../file-upload'

describe('FileUpload', () => {
  it('renders the dropzone area', () => {
    render(<FileUpload />)
    expect(screen.getByText(/click to upload or drag and drop/i)).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<FileUpload label="Upload Documents" />)
    expect(screen.getByText('Upload Documents')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<FileUpload helperText="Max 5MB per file" />)
    expect(screen.getByText('Max 5MB per file')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<FileUpload error="File too large" />)
    expect(screen.getByText('File too large')).toBeInTheDocument()
  })

  it('shows accepted file types', () => {
    render(<FileUpload accept=".pdf,.doc" />)
    expect(screen.getByText(/Accepted: .pdf,.doc/)).toBeInTheDocument()
  })

  it('shows max file size info', () => {
    render(<FileUpload maxSize={5 * 1024 * 1024} />)
    expect(screen.getByText(/Max 5.0 MB/)).toBeInTheDocument()
  })

  it('renders in disabled state', () => {
    const { container } = render(<FileUpload disabled />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeDisabled()
  })

  it('has a hidden file input', () => {
    const { container } = render(<FileUpload />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.style.display).toBe('none')
  })

  it('sets accept attribute on file input', () => {
    const { container } = render(<FileUpload accept="image/*" />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toHaveAttribute('accept', 'image/*')
  })

  it('sets multiple attribute when multiple prop is true', () => {
    const { container } = render(<FileUpload multiple />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toHaveAttribute('multiple')
  })

  it('calls onChange when files are selected', () => {
    const handleChange = vi.fn()
    const { container } = render(<FileUpload onChange={handleChange} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement

    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })

    expect(handleChange).toHaveBeenCalledWith([file])
  })

  it('does not show helper text when error is present', () => {
    render(<FileUpload helperText="Some help" error="Error occurred" />)
    expect(screen.queryByText('Some help')).not.toBeInTheDocument()
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })
})
