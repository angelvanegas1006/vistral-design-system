import * as React from 'react'
import { forwardRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react'

/**
 * Pagination Design Tokens
 */
const PAGINATION_TOKENS = {
  // Button
  button: {
    size: 36,
    fontSize: 14,
    fontWeight: 500,
    radius: 8,
    // States
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgActive: '#2050f6',
    fg: '#3f3f46',
    fgHover: '#18181b',
    fgActive: '#ffffff',
    fgDisabled: '#a1a1aa',
  },
  gap: 4,
} as const

// ============================================================================
// Pagination Container
// ============================================================================
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ style, children, ...props }, ref) => {
    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: PAGINATION_TOKENS.gap,
      ...style,
    }

    return (
      <nav ref={ref} role="navigation" aria-label="Pagination" style={navStyle} {...props}>
        {children}
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'

// ============================================================================
// Pagination Button
// ============================================================================
export interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active state */
  active?: boolean
  /** Icon only */
  iconOnly?: boolean
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ active = false, iconOnly = false, disabled, style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const getColor = () => {
      if (disabled) return PAGINATION_TOKENS.button.fgDisabled
      if (active) return PAGINATION_TOKENS.button.fgActive
      if (isHovered) return PAGINATION_TOKENS.button.fgHover
      return PAGINATION_TOKENS.button.fg
    }

    const getBg = () => {
      if (active) return PAGINATION_TOKENS.button.bgActive
      if (isHovered && !disabled) return PAGINATION_TOKENS.button.bgHover
      return PAGINATION_TOKENS.button.bg
    }

    const buttonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: PAGINATION_TOKENS.button.size,
      height: PAGINATION_TOKENS.button.size,
      padding: iconOnly ? 0 : '0 12px',
      fontSize: PAGINATION_TOKENS.button.fontSize,
      fontWeight: PAGINATION_TOKENS.button.fontWeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: getColor(),
      backgroundColor: getBg(),
      border: 'none',
      borderRadius: PAGINATION_TOKENS.button.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease',
      ...style,
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

PaginationButton.displayName = 'PaginationButton'

// ============================================================================
// Pagination Ellipsis
// ============================================================================
const PaginationEllipsis = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ style, ...props }, ref) => {
    const ellipsisStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: PAGINATION_TOKENS.button.size,
      height: PAGINATION_TOKENS.button.size,
      color: PAGINATION_TOKENS.button.fgDisabled,
      ...style,
    }

    return (
      <span ref={ref} style={ellipsisStyle} {...props}>
        <MoreHorizontal size={16} />
      </span>
    )
  }
)

PaginationEllipsis.displayName = 'PaginationEllipsis'

// ============================================================================
// Full Pagination Component
// ============================================================================
export interface FullPaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Current page (1-indexed) */
  page: number
  /** Total pages */
  totalPages: number
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Show first/last buttons */
  showFirstLast?: boolean
  /** Number of sibling pages to show */
  siblingCount?: number
}

const FullPagination = forwardRef<HTMLElement, FullPaginationProps>(
  (
    { page, totalPages, onPageChange, showFirstLast = false, siblingCount = 1, style, ...props },
    ref
  ) => {
    // Generate page numbers to show
    const getPageNumbers = () => {
      const pages: (number | 'ellipsis')[] = []

      // Always show first page
      pages.push(1)

      // Calculate range around current page
      const leftSibling = Math.max(2, page - siblingCount)
      const rightSibling = Math.min(totalPages - 1, page + siblingCount)

      // Add left ellipsis if needed
      if (leftSibling > 2) {
        pages.push('ellipsis')
      }

      // Add sibling pages
      for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      // Add right ellipsis if needed
      if (rightSibling < totalPages - 1) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }

      return pages
    }

    const pageNumbers = getPageNumbers()

    return (
      <Pagination ref={ref} style={style} {...props}>
        {showFirstLast && (
          <PaginationButton
            iconOnly
            disabled={page === 1}
            onClick={() => onPageChange(1)}
            aria-label="First page"
          >
            <ChevronsLeft size={16} />
          </PaginationButton>
        )}

        <PaginationButton
          iconOnly
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </PaginationButton>

        {pageNumbers.map((p, i) =>
          p === 'ellipsis' ? (
            <PaginationEllipsis key={`ellipsis-${i}`} />
          ) : (
            <PaginationButton key={p} active={p === page} onClick={() => onPageChange(p)}>
              {p}
            </PaginationButton>
          )
        )}

        <PaginationButton
          iconOnly
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </PaginationButton>

        {showFirstLast && (
          <PaginationButton
            iconOnly
            disabled={page === totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Last page"
          >
            <ChevronsRight size={16} />
          </PaginationButton>
        )}
      </Pagination>
    )
  }
)

FullPagination.displayName = 'FullPagination'

export { Pagination, PaginationButton, PaginationEllipsis, FullPagination, PAGINATION_TOKENS }
