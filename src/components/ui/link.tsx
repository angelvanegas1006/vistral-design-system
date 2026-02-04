import * as React from "react"
import { forwardRef } from "react"
import { ExternalLink } from "lucide-react"

/**
 * Link Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=168-3309
 */
const LINK_TOKENS = {
  // Single color scheme (no variants per designer feedback)
  color: '#2050f6',           // spaceblue-600
  colorHover: '#1337e2',      // spaceblue-700
  colorActive: '#162eb7',     // spaceblue-800
  colorFocus: '#2050f6',      // Same as default
  // Focus ring
  focusRing: '0 0 0 2px rgba(32, 80, 246, 0.25)',
  // Disabled
  disabled: {
    color: '#a1a1aa',             // zinc-400
    cursor: 'not-allowed',
  },
} as const

type LinkUnderline = 'always' | 'hover' | 'none'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Underline behavior */
  underline?: LinkUnderline
  /** Show external link icon */
  external?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Size inherits from context, but can be overridden */
  size?: 'inherit' | 'sm' | 'md' | 'lg'
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    underline = 'hover',
    external = false,
    disabled = false,
    size = 'inherit',
    href,
    target,
    rel,
    style, 
    children, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isActive, setIsActive] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    // Get current color based on state
    const getColor = () => {
      if (disabled) return LINK_TOKENS.disabled.color
      if (isActive) return LINK_TOKENS.colorActive
      if (isHovered) return LINK_TOKENS.colorHover
      if (isFocused) return LINK_TOKENS.colorFocus
      return LINK_TOKENS.color
    }

    // Get text decoration based on underline prop
    const getTextDecoration = () => {
      if (underline === 'always') return 'underline'
      if (underline === 'hover' && isHovered) return 'underline'
      return 'none'
    }

    // Get font size based on size prop
    const getFontSize = () => {
      if (size === 'inherit') return 'inherit'
      if (size === 'sm') return 12
      if (size === 'md') return 14
      if (size === 'lg') return 16
      return 'inherit'
    }

    // Auto-set external link attributes
    const isExternalLink = external || (href && (href.startsWith('http') || href.startsWith('//')))
    const linkTarget = target || (isExternalLink ? '_blank' : undefined)
    const linkRel = rel || (isExternalLink ? 'noopener noreferrer' : undefined)

    const linkStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: getColor(),
      fontSize: getFontSize(),
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textDecoration: getTextDecoration(),
      textUnderlineOffset: 2,
      cursor: disabled ? LINK_TOKENS.disabled.cursor : 'pointer',
      transition: 'color 150ms ease-in-out, box-shadow 150ms ease-in-out',
      outline: 'none',
      borderRadius: 2,
      boxShadow: isFocused && !disabled ? LINK_TOKENS.focusRing : 'none',
      padding: '1px 2px',
      margin: '-1px -2px',
      ...style,
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      props.onClick?.(e)
    }

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={linkTarget}
        rel={linkRel}
        style={linkStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsActive(false) }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-disabled={disabled}
        {...props}
      >
        {children}
        {isExternalLink && external && (
          <ExternalLink size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        )}
      </a>
    )
  }
)

Link.displayName = "Link"

export { Link, LINK_TOKENS }
