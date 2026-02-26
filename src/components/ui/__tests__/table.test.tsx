import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../table'

describe('Table', () => {
  const renderBasicTable = () =>
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>alice@test.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>bob@test.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

  it('renders without crashing', () => {
    renderBasicTable()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders header cells', () => {
    renderBasicTable()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders body cells', () => {
    renderBasicTable()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('bob@test.com')).toBeInTheDocument()
  })

  it('renders the correct number of rows', () => {
    renderBasicTable()
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 1 header + 2 body
  })

  it('renders column headers as th elements', () => {
    renderBasicTable()
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(2)
  })

  it('supports selected row state', () => {
    render(
      <Table>
        <TableBody>
          <TableRow selected data-testid="selected-row">
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const row = screen.getByTestId('selected-row')
    expect(row.style.backgroundColor).toBeTruthy()
  })

  it('supports sortable header with click', async () => {
    const handleSort = vi.fn()
    const user = userEvent.setup()

    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc" onClick={handleSort}>
              Sortable
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )

    await user.click(screen.getByText('Sortable'))
    expect(handleSort).toHaveBeenCalledTimes(1)
  })

  it('displays sort indicator for sortable columns', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('displays descending sort indicator', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="desc">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    expect(screen.getByText('↓')).toBeInTheDocument()
  })

  it('renders with border by default', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.border).toContain('solid')
  })

  it('forwards ref to table element', () => {
    let refValue: HTMLTableElement | null = null
    render(
      <Table
        ref={el => {
          refValue = el
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(refValue?.tagName).toBe('TABLE')
  })
})
