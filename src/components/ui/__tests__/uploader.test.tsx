import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Uploader } from '../uploader'

function createFile(name: string, size: number, type: string): File {
  const content = new Array(size).fill('a').join('')
  return new File([content], name, { type })
}

describe('Uploader', () => {
  it('renders dropzone variant by default', () => {
    render(<Uploader />)
    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument()
  })

  it('renders button variant', () => {
    render(<Uploader variant="button" />)
    expect(screen.getByText('Upload a file')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<Uploader label="Upload documents" />)
    expect(screen.getByText('Upload documents')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<Uploader helperText="Max 5MB per file" />)
    expect(screen.getByText('Max 5MB per file')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Uploader error="File too large" />)
    expect(screen.getByText('File too large')).toBeInTheDocument()
  })

  it('accepts files via input change', async () => {
    const handleChange = vi.fn()
    render(<Uploader onChange={handleChange} />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = createFile('test.png', 1024, 'image/png')

    fireEvent.change(input, { target: { files: [file] } })
    expect(handleChange).toHaveBeenCalledWith([file])
  })

  it('shows file preview after upload', () => {
    const handleChange = vi.fn()
    render(<Uploader onChange={handleChange} showPreviews />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = createFile('document.pdf', 1024, 'application/pdf')

    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText('document.pdf')).toBeInTheDocument()
  })

  it('rejects files exceeding maxSize', () => {
    render(<Uploader maxSize={100} />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const largeFile = createFile('big.png', 200, 'image/png')

    fireEvent.change(input, { target: { files: [largeFile] } })
    expect(screen.getByText(/exceeds size limit/i)).toBeInTheDocument()
  })

  it('rejects files with invalid format', () => {
    render(<Uploader accept=".pdf" />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = createFile('test.exe', 100, 'application/x-msdownload')

    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText(/not supported/i)).toBeInTheDocument()
  })

  it('removes a file when remove button is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Uploader onChange={handleChange} showPreviews />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = createFile('test.txt', 100, 'text/plain')

    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByText('test.txt')).toBeInTheDocument()

    const removeBtn = screen.getByLabelText(/remove test\.txt/i)
    await user.click(removeBtn)
    expect(screen.queryByText('test.txt')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Uploader disabled />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeDisabled()
  })

  it('supports drag and drop', () => {
    const handleChange = vi.fn()
    const { container } = render(<Uploader onChange={handleChange} />)
    const dropzone = container.querySelector('[data-vistral-interactive]') as HTMLElement

    const file = createFile('drop.png', 500, 'image/png')
    const dataTransfer = { files: [file], items: [{ kind: 'file', type: 'image/png' }] }

    fireEvent.dragOver(dropzone, { dataTransfer })
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })

    expect(handleChange).toHaveBeenCalledWith([file])
  })

  it('forwards ref to the container', () => {
    let refValue: HTMLDivElement | null = null
    render(
      <Uploader
        ref={el => {
          refValue = el
        }}
      />
    )
    expect(refValue).toBeInstanceOf(HTMLElement)
  })
})
