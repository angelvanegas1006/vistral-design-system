import * as React from "react"
import { forwardRef } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

/**
 * Table Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=793-5651
 */
const TABLE_TOKENS = {
  // Container
  bg: '#ffffff',
  border: '#e4e4e7',
  radius: 8,
  // Header
  header: {
    bg: '#fafafa',
    fg: '#71717a',
    fontSize: 12,
    fontWeight: 600,
    paddingX: 16,
    paddingY: 12,
  },
  // Cell
  cell: {
    fg: '#18181b',
    fontSize: 14,
    paddingX: 16,
    paddingY: 12,
  },
  // Row
  row: {
    borderColor: '#e4e4e7',
    bgHover: '#fafafa',
    bgSelected: '#eef4ff',
  },
  // Pagination
  pagination: {
    fontSize: 14,
    fg: '#18181b',
    buttonSize: 32,
    buttonRadius: 6,
    buttonBg: 'transparent',
    buttonBgHover: '#f4f4f5',
    buttonFg: '#71717a',
    buttonFgActive: '#2050f6',
    buttonFgDisabled: '#d4d4d8',
  },
} as const

// ============================================================================
// Table Container
// ============================================================================
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Striped rows */
  striped?: boolean
  /** Bordered */
  bordered?: boolean
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ striped = false, bordered = true, style, children, ...props }, ref) => {
    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      overflow: 'auto',
      border: bordered ? `1px solid ${TABLE_TOKENS.border}` : 'none',
      borderRadius: TABLE_TOKENS.radius,
      backgroundColor: TABLE_TOKENS.bg,
    }

    const tableStyle: React.CSSProperties = {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <div style={wrapperStyle}>
        <table ref={ref} style={tableStyle} {...props}>
          {children}
        </table>
      </div>
    )
  }
)

Table.displayName = "Table"

// ============================================================================
// Table Header
// ============================================================================
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ style, children, ...props }, ref) => {
    const headerStyle: React.CSSProperties = {
      backgroundColor: TABLE_TOKENS.header.bg,
      ...style,
    }

    return (
      <thead ref={ref} style={headerStyle} {...props}>
        {children}
      </thead>
    )
  }
)

TableHeader.displayName = "TableHeader"

// ============================================================================
// Table Body
// ============================================================================
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <tbody ref={ref} style={style} {...props}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = "TableBody"

// ============================================================================
// Table Row
// ============================================================================
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Selected state */
  selected?: boolean
  /** Clickable */
  clickable?: boolean
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, clickable = false, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const rowStyle: React.CSSProperties = {
      borderBottom: `1px solid ${TABLE_TOKENS.row.borderColor}`,
      backgroundColor: selected 
        ? TABLE_TOKENS.row.bgSelected 
        : isHovered && clickable 
          ? TABLE_TOKENS.row.bgHover 
          : 'transparent',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'background-color 150ms ease',
      ...style,
    }

    return (
      <tr
        ref={ref}
        style={rowStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = "TableRow"

// ============================================================================
// Table Head Cell
// ============================================================================
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null
  /** Sortable */
  sortable?: boolean
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ sortDirection, sortable = false, style, children, onClick, ...props }, ref) => {
    const thStyle: React.CSSProperties = {
      padding: `${TABLE_TOKENS.header.paddingY}px ${TABLE_TOKENS.header.paddingX}px`,
      textAlign: 'left',
      fontSize: TABLE_TOKENS.header.fontSize,
      fontWeight: TABLE_TOKENS.header.fontWeight,
      color: TABLE_TOKENS.header.fg,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
      cursor: sortable ? 'pointer' : 'default',
      userSelect: sortable ? 'none' : 'auto',
      ...style,
    }

    const sortIconStyle: React.CSSProperties = {
      display: 'inline-flex',
      marginLeft: 4,
      opacity: sortDirection ? 1 : 0.3,
    }

    return (
      <th ref={ref} style={thStyle} onClick={sortable ? onClick : undefined} {...props}>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {children}
          {sortable && (
            <span style={sortIconStyle}>
              {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕'}
            </span>
          )}
        </span>
      </th>
    )
  }
)

TableHead.displayName = "TableHead"

// ============================================================================
// Table Cell
// ============================================================================
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ style, children, ...props }, ref) => {
    const cellStyle: React.CSSProperties = {
      padding: `${TABLE_TOKENS.cell.paddingY}px ${TABLE_TOKENS.cell.paddingX}px`,
      fontSize: TABLE_TOKENS.cell.fontSize,
      color: TABLE_TOKENS.cell.fg,
      ...style,
    }

    return (
      <td ref={ref} style={cellStyle} {...props}>
        {children}
      </td>
    )
  }
)

TableCell.displayName = "TableCell"

// ============================================================================
// Table Footer
// ============================================================================
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ style, children, ...props }, ref) => {
    const footerStyle: React.CSSProperties = {
      backgroundColor: TABLE_TOKENS.header.bg,
      fontWeight: 500,
      ...style,
    }

    return (
      <tfoot ref={ref} style={footerStyle} {...props}>
        {children}
      </tfoot>
    )
  }
)

TableFooter.displayName = "TableFooter"

// ============================================================================
// Table Caption
// ============================================================================
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ style, children, ...props }, ref) => {
    const captionStyle: React.CSSProperties = {
      padding: `${TABLE_TOKENS.cell.paddingY}px ${TABLE_TOKENS.cell.paddingX}px`,
      fontSize: 13,
      color: '#71717a',
      textAlign: 'left',
      captionSide: 'bottom',
      ...style,
    }

    return (
      <caption ref={ref} style={captionStyle} {...props}>
        {children}
      </caption>
    )
  }
)

TableCaption.displayName = "TableCaption"

// ============================================================================
// Table Pagination
// ============================================================================
export interface TablePaginationProps {
  /** Current page (1-indexed) */
  page: number
  /** Total number of items */
  total: number
  /** Items per page */
  rowsPerPage: number
  /** Available rows per page options */
  rowsPerPageOptions?: number[]
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Callback when rows per page changes */
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

const TablePagination = ({
  page,
  total,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationProps) => {
  const totalPages = Math.ceil(total / rowsPerPage)
  const start = (page - 1) * rowsPerPage + 1
  const end = Math.min(page * rowsPerPage, total)

  const handleFirstPage = () => {
    if (page > 1) onPageChange(1)
  }

  const handlePrevPage = () => {
    if (page > 1) onPageChange(page - 1)
  }

  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1)
  }

  const handleLastPage = () => {
    if (page < totalPages) onPageChange(totalPages)
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: `1px solid ${TABLE_TOKENS.border}`,
    backgroundColor: TABLE_TOKENS.bg,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  }

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: TABLE_TOKENS.pagination.fontSize,
    color: TABLE_TOKENS.pagination.fg,
    whiteSpace: 'nowrap',
  }

  const selectStyle: React.CSSProperties = {
    padding: '4px 8px',
    fontSize: TABLE_TOKENS.pagination.fontSize,
    color: TABLE_TOKENS.pagination.fg,
    border: `1px solid ${TABLE_TOKENS.border}`,
    borderRadius: 6,
    backgroundColor: TABLE_TOKENS.bg,
    cursor: 'pointer',
  }

  const statusStyle: React.CSSProperties = {
    fontSize: TABLE_TOKENS.pagination.fontSize,
    color: TABLE_TOKENS.pagination.fg,
    marginLeft: 16,
  }

  const buttonStyle = (disabled: boolean, active: boolean = false): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: TABLE_TOKENS.pagination.buttonSize,
    height: TABLE_TOKENS.pagination.buttonSize,
    borderRadius: TABLE_TOKENS.pagination.buttonRadius,
    backgroundColor: TABLE_TOKENS.pagination.buttonBg,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: disabled 
      ? TABLE_TOKENS.pagination.buttonFgDisabled 
      : active 
        ? TABLE_TOKENS.pagination.buttonFgActive 
        : TABLE_TOKENS.pagination.buttonFg,
    transition: 'all 150ms ease',
  })

  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <span style={labelStyle}>Rows per page</span>
        {onRowsPerPageChange && (
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            style={selectStyle}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <span style={statusStyle}>
          {start}-{end} of {total}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          type="button"
          style={buttonStyle(page === 1)}
          onClick={handleFirstPage}
          disabled={page === 1}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          type="button"
          style={buttonStyle(page === 1)}
          onClick={handlePrevPage}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          style={buttonStyle(page === totalPages)}
          onClick={handleNextPage}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
        <button
          type="button"
          style={buttonStyle(page === totalPages)}
          onClick={handleLastPage}
          disabled={page === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  )
}

TablePagination.displayName = "TablePagination"

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
  TablePagination,
  TABLE_TOKENS,
}
