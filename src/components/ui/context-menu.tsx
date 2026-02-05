import * as React from 'react'
import { forwardRef, createContext, useContext, useState, useRef, useEffect } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Context Menu Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2890-6484
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
    maxWidth: 320,
  },
  // Item
  item: {
    height: 32,
    paddingX: 12,
    fontSize: 13,
    fg: '#18181b',
    fgMuted: '#a1a1aa',
    fgDestructive: '#dc2626',
    bgHover: '#f4f4f5',
    radius: 4,
    iconSize: 14,
  },
  // Label (non-interactive)
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: '#71717a',
    paddingX: 12,
    paddingY: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
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
  closeMenu: () => void
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

  const closeMenu = () => setPosition(null)

  useEffect(() => {
    onOpenChange?.(position !== null)
  }, [position, onOpenChange])

  return (
    <ContextMenuContext.Provider value={{ position, setPosition, closeMenu }}>
      {children}
    </ContextMenuContext.Provider>
  )
}

ContextMenu.displayName = 'ContextMenu'

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
      e.stopPropagation()
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

ContextMenuTrigger.displayName = 'ContextMenuTrigger'

// ============================================================================
// ContextMenu Content
// ============================================================================
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ style, children, ...props }, ref) => {
    const { position, closeMenu } = useContextMenu()
    const menuRef = useRef<HTMLDivElement>(null)

    // Close on click outside or escape
    useEffect(() => {
      if (!position) return

      const handleClick = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          closeMenu()
        }
      }
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeMenu()
      }

      // Delay to avoid immediate close
      setTimeout(() => {
        document.addEventListener('click', handleClick, true)
        document.addEventListener('keydown', handleEscape)
      }, 0)

      return () => {
        document.removeEventListener('click', handleClick, true)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [position, closeMenu])

    // Adjust position to stay within viewport
    useEffect(() => {
      if (!position || !menuRef.current) return

      const menu = menuRef.current
      const rect = menu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let adjustedX = position.x
      let adjustedY = position.y

      // Adjust horizontal position
      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 8
      }
      if (adjustedX < 8) {
        adjustedX = 8
      }

      // Adjust vertical position
      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 8
      }
      if (adjustedY < 8) {
        adjustedY = 8
      }

      if (adjustedX !== position.x || adjustedY !== position.y) {
        menu.style.left = `${adjustedX}px`
        menu.style.top = `${adjustedY}px`
      }
    }, [position])

    if (!position) return null

    const menuStyle: React.CSSProperties = {
      position: 'fixed',
      top: position.y,
      left: position.x,
      minWidth: CONTEXT_MENU_TOKENS.menu.minWidth,
      maxWidth: CONTEXT_MENU_TOKENS.menu.maxWidth,
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

ContextMenuContent.displayName = 'ContextMenuContent'

// ============================================================================
// ContextMenu Label (non-interactive group header)
// ============================================================================
export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ style, children, ...props }, ref) => {
    const labelStyle: React.CSSProperties = {
      padding: `${CONTEXT_MENU_TOKENS.label.paddingY}px ${CONTEXT_MENU_TOKENS.label.paddingX}px`,
      fontSize: CONTEXT_MENU_TOKENS.label.fontSize,
      fontWeight: CONTEXT_MENU_TOKENS.label.fontWeight,
      color: CONTEXT_MENU_TOKENS.label.color,
      textTransform: CONTEXT_MENU_TOKENS.label.textTransform,
      letterSpacing: CONTEXT_MENU_TOKENS.label.letterSpacing,
      ...style,
    }

    return (
      <div ref={ref} role="presentation" style={labelStyle} {...props}>
        {children}
      </div>
    )
  }
)

ContextMenuLabel.displayName = 'ContextMenuLabel'

// ============================================================================
// ContextMenu Item
// ============================================================================
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left icon */
  icon?: LucideIcon
  /** Right icon (for submenu indicator) */
  rightIcon?: LucideIcon
  /** Keyboard shortcut */
  shortcut?: string
  /** Disabled */
  disabled?: boolean
  /** Destructive */
  destructive?: boolean
  /** Show submenu indicator */
  hasSubmenu?: boolean
}

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (
    {
      icon: Icon,
      rightIcon: RightIcon,
      shortcut,
      disabled,
      destructive,
      hasSubmenu,
      style,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const { closeMenu } = useContextMenu()
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!hasSubmenu) {
        closeMenu()
      }
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
      transition: 'background-color 150ms ease',
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
        {Icon && <Icon size={CONTEXT_MENU_TOKENS.item.iconSize} style={{ flexShrink: 0 }} />}
        <span style={{ flex: 1 }}>{children}</span>
        {shortcut && (
          <span
            style={{ fontSize: 11, color: CONTEXT_MENU_TOKENS.item.fgMuted, marginLeft: 'auto' }}
          >
            {shortcut}
          </span>
        )}
        {hasSubmenu && !shortcut && (
          <ChevronRight
            size={CONTEXT_MENU_TOKENS.item.iconSize}
            style={{ color: CONTEXT_MENU_TOKENS.item.fgMuted, flexShrink: 0 }}
          />
        )}
        {RightIcon && !hasSubmenu && !shortcut && (
          <RightIcon size={CONTEXT_MENU_TOKENS.item.iconSize} style={{ flexShrink: 0 }} />
        )}
      </div>
    )
  }
)

ContextMenuItem.displayName = 'ContextMenuItem'

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

ContextMenuSeparator.displayName = 'ContextMenuSeparator'

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
        <span
          style={{ width: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {checked && <Check size={12} style={{ color: '#2050f6' }} />}
        </span>
        {children}
      </ContextMenuItem>
    )
  }
)

ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem'

// ============================================================================
// ContextMenu Radio Item
// ============================================================================
export interface ContextMenuRadioItemProps extends Omit<ContextMenuItemProps, 'icon'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const ContextMenuRadioItem = forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ checked, onCheckedChange, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onCheckedChange?.(!checked)
      onClick?.(e)
    }

    const radioStyle: React.CSSProperties = {
      width: 12,
      height: 12,
      borderRadius: '50%',
      border: `2px solid ${checked ? '#2050f6' : '#d4d4d8'}`,
      backgroundColor: checked ? '#2050f6' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }

    const innerDotStyle: React.CSSProperties = {
      width: 4,
      height: 4,
      borderRadius: '50%',
      backgroundColor: '#ffffff',
    }

    return (
      <ContextMenuItem ref={ref} onClick={handleClick} {...props}>
        <span style={radioStyle}>{checked && <span style={innerDotStyle} />}</span>
        {children}
      </ContextMenuItem>
    )
  }
)

ContextMenuRadioItem.displayName = 'ContextMenuRadioItem'

// ============================================================================
// ContextMenu Submenu
// ============================================================================
export interface ContextMenuSubmenuProps {
  label: React.ReactNode
  children: React.ReactNode
  icon?: LucideIcon
}

const ContextMenuSubmenu: React.FC<ContextMenuSubmenuProps> = ({ label, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const submenuRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !submenuRef.current || !itemRef.current) return

    const itemRect = itemRef.current.getBoundingClientRect()
    const submenu = submenuRef.current
    submenu.style.left = `${itemRect.width}px`
    submenu.style.top = '0px'
  }, [isOpen])

  return (
    <div style={{ position: 'relative' }}>
      <ContextMenuItem
        ref={itemRef}
        icon={Icon}
        hasSubmenu
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {label}
      </ContextMenuItem>
      {isOpen && (
        <div
          ref={submenuRef}
          style={{
            position: 'absolute',
            left: '100%',
            top: 0,
            minWidth: CONTEXT_MENU_TOKENS.menu.minWidth,
            padding: CONTEXT_MENU_TOKENS.menu.padding,
            backgroundColor: CONTEXT_MENU_TOKENS.menu.bg,
            border: `1px solid ${CONTEXT_MENU_TOKENS.menu.border}`,
            borderRadius: CONTEXT_MENU_TOKENS.menu.radius,
            boxShadow: CONTEXT_MENU_TOKENS.menu.shadow,
            zIndex: 101,
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  )
}

ContextMenuSubmenu.displayName = 'ContextMenuSubmenu'

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
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuSubmenu,
  CONTEXT_MENU_TOKENS,
}
