import * as React from 'react'
import { forwardRef, createContext, useContext, useState, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Dropdown Menu Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=945-4626
 */
const DROPDOWN_TOKENS = {
  // Menu container
  menu: {
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 8,
    padding: 4,
    minWidth: 180,
  },
  // Menu item
  item: {
    height: 36,
    paddingX: 12,
    fontSize: 14,
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgFocus: '#f4f4f5',
    fg: '#18181b',
    fgDisabled: '#a1a1aa',
    fgDestructive: '#dc2626',
    radius: 4,
  },
  // Separator
  separator: {
    color: '#e4e4e7',
    margin: 4,
  },
  // Label
  label: {
    paddingX: 12,
    paddingY: 6,
    fontSize: 12,
    fontWeight: 600,
    color: '#71717a',
  },
} as const

// ============================================================================
// Context
// ============================================================================
type DropdownContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdown() {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within a DropdownMenu')
  }
  return context
}

// ============================================================================
// DropdownMenu Root
// ============================================================================
export interface DropdownMenuProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when open changes */
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open: controlledOpen,
  onOpenChange,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </DropdownContext.Provider>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

// ============================================================================
// DropdownMenu Trigger
// ============================================================================
export interface DropdownMenuTriggerProps {
  children: React.ReactElement
  asChild?: boolean
}

const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, asChild }) => {
  const { open, setOpen, triggerRef } = useDropdown()

  const handleClick = () => setOpen(!open)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': 'menu',
    } as any)
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="menu"
    >
      {children}
    </button>
  )
}

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

// ============================================================================
// DropdownMenu Content
// ============================================================================
export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end'
  /** Side relative to trigger */
  side?: 'top' | 'bottom'
}

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ align = 'start', side = 'bottom', style, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdown()
    const contentRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
      if (!open) return

      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setOpen(false)
        }
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }

      document.addEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, setOpen, triggerRef])

    if (!open) return null

    const alignStyles: Record<string, React.CSSProperties> = {
      start: { left: 0 },
      center: { left: '50%', transform: 'translateX(-50%)' },
      end: { right: 0 },
    }

    const contentStyle: React.CSSProperties = {
      position: 'absolute',
      [side === 'bottom' ? 'top' : 'bottom']: '100%',
      marginTop: side === 'bottom' ? 4 : undefined,
      marginBottom: side === 'top' ? 4 : undefined,
      minWidth: DROPDOWN_TOKENS.menu.minWidth,
      padding: DROPDOWN_TOKENS.menu.padding,
      backgroundColor: DROPDOWN_TOKENS.menu.bg,
      border: `1px solid ${DROPDOWN_TOKENS.menu.border}`,
      borderRadius: DROPDOWN_TOKENS.menu.radius,
      boxShadow: DROPDOWN_TOKENS.menu.shadow,
      zIndex: 50,
      animation: 'dropdown-show 150ms ease-out',
      ...alignStyles[align],
      ...style,
    }

    return (
      <div ref={ref || contentRef} role="menu" style={contentStyle} {...props}>
        {children}
      </div>
    )
  }
)

DropdownMenuContent.displayName = 'DropdownMenuContent'

// ============================================================================
// DropdownMenu Item
// ============================================================================
export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left icon */
  icon?: LucideIcon
  /** Keyboard shortcut */
  shortcut?: string
  /** Disabled state */
  disabled?: boolean
  /** Destructive action */
  destructive?: boolean
  /** Close menu on click */
  closeOnClick?: boolean
}

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  (
    {
      icon: Icon,
      shortcut,
      disabled = false,
      destructive = false,
      closeOnClick = true,
      style,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const { setOpen } = useDropdown()
    const [isHovered, setIsHovered] = useState(false)

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: DROPDOWN_TOKENS.item.height,
      padding: `0 ${DROPDOWN_TOKENS.item.paddingX}px`,
      fontSize: DROPDOWN_TOKENS.item.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: disabled
        ? DROPDOWN_TOKENS.item.fgDisabled
        : destructive
          ? DROPDOWN_TOKENS.item.fgDestructive
          : DROPDOWN_TOKENS.item.fg,
      backgroundColor:
        isHovered && !disabled ? DROPDOWN_TOKENS.item.bgHover : DROPDOWN_TOKENS.item.bg,
      borderRadius: DROPDOWN_TOKENS.item.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 100ms ease',
      ...style,
    }

    const shortcutStyle: React.CSSProperties = {
      marginLeft: 'auto',
      fontSize: 12,
      color: '#a1a1aa',
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (closeOnClick) setOpen(false)
    }

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        style={itemStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {Icon && <Icon size={16} />}
        <span style={{ flex: 1 }}>{children}</span>
        {shortcut && <span style={shortcutStyle}>{shortcut}</span>}
      </div>
    )
  }
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

// ============================================================================
// DropdownMenu Separator
// ============================================================================
const DropdownMenuSeparator = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ style, ...props }, ref) => {
    const sepStyle: React.CSSProperties = {
      height: 1,
      margin: `${DROPDOWN_TOKENS.separator.margin}px 0`,
      backgroundColor: DROPDOWN_TOKENS.separator.color,
      border: 'none',
      ...style,
    }

    return <hr ref={ref} style={sepStyle} {...props} />
  }
)

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

// ============================================================================
// DropdownMenu Label
// ============================================================================
const DropdownMenuLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => {
    const labelStyle: React.CSSProperties = {
      padding: `${DROPDOWN_TOKENS.label.paddingY}px ${DROPDOWN_TOKENS.label.paddingX}px`,
      fontSize: DROPDOWN_TOKENS.label.fontSize,
      fontWeight: DROPDOWN_TOKENS.label.fontWeight,
      color: DROPDOWN_TOKENS.label.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <div ref={ref} style={labelStyle} {...props}>
        {children}
      </div>
    )
  }
)

DropdownMenuLabel.displayName = 'DropdownMenuLabel'

// ============================================================================
// DropdownMenu Checkbox Item
// ============================================================================
export interface DropdownMenuCheckboxItemProps extends Omit<DropdownMenuItemProps, 'icon'> {
  /** Checked state */
  checked?: boolean
  /** Callback when checked changes */
  onCheckedChange?: (checked: boolean) => void
}

const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ checked = false, onCheckedChange, onClick, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onCheckedChange?.(!checked)
      onClick?.(e)
    }

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: DROPDOWN_TOKENS.item.height,
      padding: `0 ${DROPDOWN_TOKENS.item.paddingX}px`,
      fontSize: DROPDOWN_TOKENS.item.fontSize,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: DROPDOWN_TOKENS.item.fg,
      backgroundColor: isHovered ? DROPDOWN_TOKENS.item.bgHover : DROPDOWN_TOKENS.item.bg,
      borderRadius: DROPDOWN_TOKENS.item.radius,
      cursor: 'pointer',
      transition: 'background-color 100ms ease',
    }

    const checkboxStyle: React.CSSProperties = {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: checked ? 'none' : '1.5px solid #d4d4d8',
      backgroundColor: checked ? '#2050f6' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 150ms ease',
    }

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        style={itemStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span style={checkboxStyle}>
          {checked && <Check size={12} color="#ffffff" strokeWidth={3} />}
        </span>
        <span style={{ flex: 1 }}>{children}</span>
      </div>
    )
  }
)

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-dropdown-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes dropdown-show {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
  }
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DROPDOWN_TOKENS,
}
