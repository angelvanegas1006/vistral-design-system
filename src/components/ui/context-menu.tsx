import * as React from "react"
import { forwardRef, createContext, useContext, useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Context Menu Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=945-4626
 */
const CONTEXT_MENU_TOKENS = {
  // Menu
  menu: {
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 8,
    padding: 4,
    minWidth: 180,
  },
  // Item
  item: {
    height: 32,
    paddingX: 8,
    fontSize: 13,
    fg: '#18181b',
    fgMuted: '#a1a1aa',
    fgDestructive: '#dc2626',
    bgHover: '#f4f4f5',
    radius: 4,
  },
  // Separator
  separator: {
    color: '#e4e4e7',
    margin: 4,
  },
} as const

// ============================================================================
// Context
// ============================================================================
type ContextMenuContextValue = {
  position: { x: number; y: number } | null
  setPosition: (pos: { x: number; y: number } | null) => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenu() {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu')
  }
  return context
}

// ============================================================================
// ContextMenu Root
// ============================================================================
export interface ContextMenuProps {
  children: React.ReactNode
  /** Callback when menu opens */
  onOpenChange?: (open: boolean) => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children, onOpenChange }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    onOpenChange?.(position !== null)
  }, [position, onOpenChange])

  return (
    <ContextMenuContext.Provider value={{ position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

ContextMenu.displayName = "ContextMenu"

// ============================================================================
// ContextMenu Trigger
// ============================================================================
export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { setPosition } = useContextMenu()

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault()
      setPosition({ x: e.clientX, y: e.clientY })
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onContextMenu: handleContextMenu,
      } as any)
    }

    return (
      <div ref={ref} onContextMenu={handleContextMenu} {...props}>
        {children}
      </div>
    )
  }
)

ContextMenuTrigger.displayName = "ContextMenuTrigger"

// ============================================================================
// ContextMenu Content
// ============================================================================
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ style, children, ...props }, ref) => {
    const { position, setPosition } = useContextMenu()
    const menuRef = useRef<HTMLDivElement>(null)

    // Close on click outside or escape
    useEffect(() => {
      if (!position) return

      const handleClick = () => setPosition(null)
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setPosition(null)
      }

      document.addEventListener('click', handleClick)
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('click', handleClick)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [position, setPosition])

    if (!position) return null

    const menuStyle: React.CSSProperties = {
      position: 'fixed',
      top: position.y,
      left: position.x,
      minWidth: CONTEXT_MENU_TOKENS.menu.minWidth,
      padding: CONTEXT_MENU_TOKENS.menu.padding,
      backgroundColor: CONTEXT_MENU_TOKENS.menu.bg,
      border: `1px solid ${CONTEXT_MENU_TOKENS.menu.border}`,
      borderRadius: CONTEXT_MENU_TOKENS.menu.radius,
      boxShadow: CONTEXT_MENU_TOKENS.menu.shadow,
      zIndex: 100,
      animation: 'context-menu-show 100ms ease-out',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <div ref={ref || menuRef} role="menu" style={menuStyle} {...props}>
        {children}
      </div>
    )
  }
)

ContextMenuContent.displayName = "ContextMenuContent"

// ============================================================================
// ContextMenu Item
// ============================================================================
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left icon */
  icon?: LucideIcon
  /** Keyboard shortcut */
  shortcut?: string
  /** Disabled */
  disabled?: boolean
  /** Destructive */
  destructive?: boolean
}

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ icon: Icon, shortcut, disabled, destructive, style, onClick, children, ...props }, ref) => {
    const { setPosition } = useContextMenu()
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      setPosition(null)
    }

    const itemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: CONTEXT_MENU_TOKENS.item.height,
      padding: `0 ${CONTEXT_MENU_TOKENS.item.paddingX}px`,
      fontSize: CONTEXT_MENU_TOKENS.item.fontSize,
      color: disabled 
        ? CONTEXT_MENU_TOKENS.item.fgMuted 
        : destructive 
          ? CONTEXT_MENU_TOKENS.item.fgDestructive 
          : CONTEXT_MENU_TOKENS.item.fg,
      backgroundColor: isHovered && !disabled ? CONTEXT_MENU_TOKENS.item.bgHover : 'transparent',
      borderRadius: CONTEXT_MENU_TOKENS.item.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
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
        {Icon && <Icon size={14} />}
        <span style={{ flex: 1 }}>{children}</span>
        {shortcut && (
          <span style={{ fontSize: 11, color: CONTEXT_MENU_TOKENS.item.fgMuted }}>
            {shortcut}
          </span>
        )}
      </div>
    )
  }
)

ContextMenuItem.displayName = "ContextMenuItem"

// ============================================================================
// ContextMenu Separator
// ============================================================================
const ContextMenuSeparator = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ style, ...props }, ref) => {
    const sepStyle: React.CSSProperties = {
      height: 1,
      margin: `${CONTEXT_MENU_TOKENS.separator.margin}px 0`,
      backgroundColor: CONTEXT_MENU_TOKENS.separator.color,
      border: 'none',
      ...style,
    }

    return <hr ref={ref} style={sepStyle} {...props} />
  }
)

ContextMenuSeparator.displayName = "ContextMenuSeparator"

// ============================================================================
// ContextMenu Checkbox Item
// ============================================================================
export interface ContextMenuCheckboxItemProps extends Omit<ContextMenuItemProps, 'icon'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ checked, onCheckedChange, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onCheckedChange?.(!checked)
      onClick?.(e)
    }

    return (
      <ContextMenuItem ref={ref} onClick={handleClick} {...props}>
        <span style={{ width: 14, display: 'flex', justifyContent: 'center' }}>
          {checked && <Check size={12} />}
        </span>
        {children}
      </ContextMenuItem>
    )
  }
)

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-context-menu-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes context-menu-show {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `
    document.head.appendChild(style)
  }
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  CONTEXT_MENU_TOKENS,
}
