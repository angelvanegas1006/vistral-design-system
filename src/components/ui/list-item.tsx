import * as React from "react"
import { forwardRef } from "react"
import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * List Item Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1754-2961
 */
const LIST_ITEM_TOKENS = {
  // Container
  minHeight: 56,
  paddingX: 16,
  paddingY: 12,
  bg: 'transparent',
  bgHover: '#fafafa',
  bgActive: '#f4f4f5',
  bgSelected: '#eef4ff',
  border: '#e4e4e7',
  // Content
  gap: 12,
  // Title
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
  },
  // Description
  description: {
    fontSize: 13,
    color: '#71717a',
  },
  // Leading (icon/avatar)
  leading: {
    size: 40,
    iconSize: 20,
    iconColor: '#71717a',
  },
  // Trailing
  trailing: {
    color: '#a1a1aa',
  },
} as const

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title text */
  title: React.ReactNode
  /** Description/subtitle */
  description?: React.ReactNode
  /** Leading element (icon, avatar, etc.) */
  leading?: React.ReactNode
  /** Leading icon (shorthand) */
  leadingIcon?: LucideIcon
  /** Trailing element */
  trailing?: React.ReactNode
  /** Show chevron arrow */
  showChevron?: boolean
  /** Selected state */
  selected?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Make clickable */
  clickable?: boolean
  /** As link */
  href?: string
}

const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  ({
    title,
    description,
    leading,
    leadingIcon: LeadingIcon,
    trailing,
    showChevron = false,
    selected = false,
    disabled = false,
    clickable = false,
    href,
    style,
    onClick,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isPressed, setIsPressed] = React.useState(false)

    const isInteractive = clickable || !!onClick || !!href

    const getBgColor = () => {
      if (selected) return LIST_ITEM_TOKENS.bgSelected
      if (isPressed) return LIST_ITEM_TOKENS.bgActive
      if (isHovered && isInteractive) return LIST_ITEM_TOKENS.bgHover
      return LIST_ITEM_TOKENS.bg
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: LIST_ITEM_TOKENS.gap,
      minHeight: LIST_ITEM_TOKENS.minHeight,
      padding: `${LIST_ITEM_TOKENS.paddingY}px ${LIST_ITEM_TOKENS.paddingX}px`,
      backgroundColor: getBgColor(),
      cursor: disabled ? 'not-allowed' : isInteractive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 150ms ease',
      textDecoration: 'none',
      color: 'inherit',
      ...style,
    }

    const leadingStyle: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: LIST_ITEM_TOKENS.leading.size,
      height: LIST_ITEM_TOKENS.leading.size,
      color: LIST_ITEM_TOKENS.leading.iconColor,
    }

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }

    const titleStyle: React.CSSProperties = {
      fontSize: LIST_ITEM_TOKENS.title.fontSize,
      fontWeight: LIST_ITEM_TOKENS.title.fontWeight,
      color: LIST_ITEM_TOKENS.title.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: LIST_ITEM_TOKENS.description.fontSize,
      color: LIST_ITEM_TOKENS.description.color,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }

    const trailingStyle: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: LIST_ITEM_TOKENS.trailing.color,
    }

    const handleMouseDown = () => !disabled && setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => { setIsHovered(false); setIsPressed(false) }

    const content = (
      <>
        {(leading || LeadingIcon) && (
          <span style={leadingStyle}>
            {leading || (LeadingIcon && <LeadingIcon size={LIST_ITEM_TOKENS.leading.iconSize} />)}
          </span>
        )}
        
        <div style={contentStyle}>
          <p style={titleStyle}>{title}</p>
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
        
        {(trailing || showChevron) && (
          <span style={trailingStyle}>
            {trailing}
            {showChevron && <ChevronRight size={20} />}
          </span>
        )}
      </>
    )

    const commonProps = {
      style: containerStyle,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    }

    if (href && !disabled) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} style={containerStyle}>
          {content}
        </a>
      )
    }

    return (
      <div 
        ref={ref} 
        onClick={disabled ? undefined : onClick}
        {...commonProps} 
        {...props}
      >
        {content}
      </div>
    )
  }
)

ListItem.displayName = "ListItem"

// ============================================================================
// List Container
// ============================================================================
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show dividers between items */
  divided?: boolean
}

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ divided = false, style, children, ...props }, ref) => {
    const listStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }

    // Add dividers if needed
    const childrenWithDividers = divided
      ? React.Children.toArray(children).flatMap((child, index, array) => 
          index < array.length - 1
            ? [child, <hr key={`divider-${index}`} style={{ 
                margin: 0, 
                border: 'none', 
                borderTop: `1px solid ${LIST_ITEM_TOKENS.border}`,
                marginLeft: LIST_ITEM_TOKENS.paddingX,
              }} />]
            : [child]
        )
      : children

    return (
      <div ref={ref} role="list" style={listStyle} {...props}>
        {childrenWithDividers}
      </div>
    )
  }
)

List.displayName = "List"

export { List, ListItem, LIST_ITEM_TOKENS }
