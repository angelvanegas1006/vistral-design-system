import * as React from "react"
import { forwardRef } from "react"

/**
 * Table Design Tokens
 */
const TABLE_TOKENS = {
  // Container
  bg: '#ffffff',
  border: '#e4e4e7',
  radius: 12,
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

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
  TABLE_TOKENS,
}
