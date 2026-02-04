import * as React from "react"
import { forwardRef } from "react"
import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Item Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1754-6315
 */
const ITEM_TOKENS = {
  // Container
  minHeight: 48, // Minimum for mobile touch targets (48px+ per Figma)
  minHeightMobile: 48,
  paddingX: 16,
  paddingY: 12,
  bg: 'transparent',
  bgHover: '#fafafa',
  bgActive: '#f4f4f5',
  bgSelected: '#eef4ff',
  border: '#e4e4e7',
  // Content
  gap: 12,
  // Header (optional tag/helper text)
  header: {
    gap: 8,
    fontSize: 11,
    fontWeight: 600,
    color: '#71717a',
  },
  // Title (Primary Text)
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
    lineHeight: 1.4,
  },
  // Description (Secondary Text)
  description: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 1.4,
    maxLines: 2, // Maximum 2 lines per Figma
  },
  // Media (Start Area)
  media: {
    size: 40,
    iconSize: 20,
    iconColor: '#71717a',
  },
  // Actions (End Area)
  actions: {
    gap: 8,
    color: '#a1a1aa',
  },
  // Footer (optional)
  footer: {
    paddingTop: 8,
    gap: 8,
  },
  // Divider
  divider: {
    color: '#e4e4e7',
    height: 1,
  },
} as const

export interface ItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title text (Primary Text) */
  title: React.ReactNode
  /** Description/subtitle (Secondary Text) */
  description?: React.ReactNode
  /** Header: Tag or helper text */
  header?: React.ReactNode
  /** Helper text (shown on right side of header) */
  helperText?: React.ReactNode
  /** Media element (Start Area): Icon, Avatar, Checkbox, Radio Button */
  media?: React.ReactNode
  /** Leading icon (shorthand for media) */
  leadingIcon?: LucideIcon
  /** Actions (End Area): Chevron, Toggle, Badge, Button */
  actions?: React.ReactNode
  /** Show chevron arrow */
  showChevron?: boolean
  /** Footer actions (optional) */
  footer?: React.ReactNode
  /** Show divider at bottom */
  showDivider?: boolean
  /** Selected state */
  selected?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Make clickable */
  clickable?: boolean
  /** As link */
  href?: string
  /** Size variant */
  size?: 'sm' | 'md'
  /** ARIA label for accessibility */
  'aria-label'?: string
  /** Role for accessibility */
  role?: 'listitem' | 'menuitem' | 'button'
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({
    title,
    description,
    header,
    helperText,
    media,
    leadingIcon: LeadingIcon,
    actions,
    showChevron = false,
    footer,
    showDivider = false,
    selected = false,
    disabled = false,
    clickable = false,
    href,
    size = 'md',
    role: roleProp,
    'aria-label': ariaLabel,
    style,
    onClick,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isPressed, setIsPressed] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const isInteractive = clickable || !!onClick || !!href
    const role = roleProp || (isInteractive ? 'button' : 'listitem')

    const getBgColor = () => {
      if (selected) return ITEM_TOKENS.bgSelected
      if (isPressed) return ITEM_TOKENS.bgActive
      if (isHovered && isInteractive) return ITEM_TOKENS.bgHover
      return ITEM_TOKENS.bg
    }

    const getMinHeight = () => {
      return size === 'sm' ? ITEM_TOKENS.minHeightMobile : ITEM_TOKENS.minHeight
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      minHeight: getMinHeight(),
      padding: `${ITEM_TOKENS.paddingY}px ${ITEM_TOKENS.paddingX}px`,
      backgroundColor: getBgColor(),
      cursor: disabled ? 'not-allowed' : isInteractive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 150ms ease',
      textDecoration: 'none',
      color: 'inherit',
      outline: isFocused && isInteractive ? `2px solid #2050f6` : 'none',
      outlineOffset: -2,
      ...style,
    }

    const mainContentStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: ITEM_TOKENS.gap,
      width: '100%',
    }

    const mediaStyle: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: ITEM_TOKENS.media.size,
      height: ITEM_TOKENS.media.size,
      color: ITEM_TOKENS.media.iconColor,
    }

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
      fontSize: ITEM_TOKENS.header.fontSize,
      fontWeight: ITEM_TOKENS.header.fontWeight,
      color: ITEM_TOKENS.header.color,
    }

    const titleStyle: React.CSSProperties = {
      fontSize: ITEM_TOKENS.title.fontSize,
      fontWeight: ITEM_TOKENS.title.fontWeight,
      color: ITEM_TOKENS.title.color,
      lineHeight: ITEM_TOKENS.title.lineHeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: ITEM_TOKENS.description.fontSize,
      color: ITEM_TOKENS.description.color,
      lineHeight: ITEM_TOKENS.description.lineHeight,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: ITEM_TOKENS.description.maxLines,
      WebkitBoxOrient: 'vertical',
    }

    const actionsStyle: React.CSSProperties = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: ITEM_TOKENS.actions.gap,
      color: ITEM_TOKENS.actions.color,
    }

    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: ITEM_TOKENS.footer.gap,
      paddingTop: ITEM_TOKENS.footer.paddingTop,
      marginTop: 8,
    }

    const dividerStyle: React.CSSProperties = {
      height: ITEM_TOKENS.divider.height,
      backgroundColor: ITEM_TOKENS.divider.color,
      border: 'none',
      margin: 0,
      marginTop: ITEM_TOKENS.paddingY,
    }

    const handleMouseDown = () => !disabled && setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => { setIsHovered(false); setIsPressed(false) }
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    // Build aria-label if not provided
    const finalAriaLabel = ariaLabel || (
      typeof title === 'string' 
        ? `${title}${description ? `, ${description}` : ''}${selected ? ', selected' : ''}`
        : undefined
    )

    const mainContent = (
      <div style={mainContentStyle}>
        {(media || LeadingIcon) && (
          <span style={mediaStyle}>
            {media || (LeadingIcon && <LeadingIcon size={ITEM_TOKENS.media.iconSize} />)}
          </span>
        )}
        
        <div style={contentStyle}>
          {header && (
            <div style={headerStyle}>
              <span>{header}</span>
              {helperText && <span>{helperText}</span>}
            </div>
          )}
          <p style={titleStyle}>{title}</p>
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
        
        {(actions || showChevron) && (
          <span style={actionsStyle}>
            {actions}
            {showChevron && <ChevronRight size={20} />}
          </span>
        )}
      </div>
    )

    const content = (
      <>
        {mainContent}
        {footer && (
          <div style={footerStyle}>
            {footer}
          </div>
        )}
        {showDivider && <hr style={dividerStyle} />}
      </>
    )

    const commonProps = {
      ref: ref as any,
      role,
      'aria-label': finalAriaLabel,
      'aria-selected': selected ? true : undefined,
      'aria-disabled': disabled ? true : undefined,
      style: containerStyle,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onFocus: handleFocus,
      onBlur: handleBlur,
    }

    if (href && !disabled) {
      return (
        <a 
          href={href} 
          {...commonProps}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <div 
        onClick={disabled ? undefined : onClick}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        {...commonProps}
        {...props}
      >
        {content}
      </div>
    )
  }
)

Item.displayName = "Item"

// ============================================================================
// List Container
// ============================================================================
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show dividers between items */
  divided?: boolean
  /** Role for list */
  role?: 'list' | 'menu'
}

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ divided = false, role: roleProp = 'list', style, children, ...props }, ref) => {
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
                borderTop: `1px solid ${ITEM_TOKENS.border}`,
                marginLeft: ITEM_TOKENS.paddingX,
              }} />]
            : [child]
        )
      : children

    return (
      <div ref={ref} role={roleProp} style={listStyle} {...props}>
        {childrenWithDividers}
      </div>
    )
  }
)

List.displayName = "List"

// Export both names for compatibility
export { List, Item as ListItem, Item, ITEM_TOKENS as LIST_ITEM_TOKENS, ITEM_TOKENS }
