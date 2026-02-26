import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination, PaginationButton, FullPagination } from '../pagination'

describe('Pagination', () => {
  it('renders as a navigation element', () => {
    render(
      <Pagination>
        <PaginationButton>1</PaginationButton>
      </Pagination>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has the correct aria-label', () => {
    render(
      <Pagination>
        <PaginationButton>1</PaginationButton>
      </Pagination>
    )
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination')
  })
})

describe('PaginationButton', () => {
  it('renders button with content', () => {
    render(<PaginationButton>1</PaginationButton>)
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
  })

  it('sets aria-current when active', () => {
    render(<PaginationButton active>1</PaginationButton>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page')
  })

  it('does not set aria-current when inactive', () => {
    render(<PaginationButton>1</PaginationButton>)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current')
  })

  it('can be disabled', () => {
    render(<PaginationButton disabled>1</PaginationButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})

describe('FullPagination', () => {
  it('renders page buttons for small page count', () => {
    render(<FullPagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
  })

  it('calls onPageChange when clicking a page number', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<FullPagination page={1} totalPages={5} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: '2' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page on next button click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<FullPagination page={2} totalPages={5} onPageChange={onPageChange} />)

    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('disables previous button on first page', () => {
    render(<FullPagination page={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<FullPagination page={5} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('renders first/last buttons when showFirstLast is true', () => {
    render(<FullPagination page={3} totalPages={10} onPageChange={vi.fn()} showFirstLast />)
    expect(screen.getByLabelText('First page')).toBeInTheDocument()
    expect(screen.getByLabelText('Last page')).toBeInTheDocument()
  })
})
