import * as React from "react"
import { forwardRef } from "react"
import { ExternalLink } from "lucide-react"

/**
 * Link Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=168-3309
 */
const LINK_TOKENS = {
  // Variants
  variants: {
    default: {
      color: '#2050f6',           // spaceblue-600
      colorHover: '#1337e2',      // spaceblue-700
      colorActive: '#162eb7',     // spaceblue-800
      colorVisited: '#7c3aed',    // violet-600
    },
    muted: {
      color: '#71717a',           // zinc-500
      colorHover: '#52525b',      // zinc-600
      colorActive: '#3f3f46',     // zinc-700
      colorVisited: '#71717a',
    },
    destructive: {
      color: '#dc2626',           // red-600
      colorHover: '#b91c1c',      // red-700
      colorActive: '#991b1b',     // red-800
      colorVisited: '#dc2626',
    },
  },
  // Decoration
  underline: {
    always: 'underline',
    hover: 'none',
    none: 'none',
  },
  // Disabled
  disabled: {
    color: '#a1a1aa',             // zinc-400
    cursor: 'not-allowed',
  },
} as const

type LinkVariant = 'default' | 'muted' | 'destructive'
type LinkUnderline = 'always' | 'hover' | 'none'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant
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
    variant = 'default',
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
    
    const tokens = LINK_TOKENS.variants[variant]

    // Get current color based on state
    const getColor = () => {
      if (disabled) return LINK_TOKENS.disabled.color
      if (isActive) return tokens.colorActive
      if (isHovered) return tokens.colorHover
      return tokens.color
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
      transition: 'color 150ms ease-in-out',
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
