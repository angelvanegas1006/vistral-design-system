import * as React from 'react'
import { forwardRef } from 'react'
import { ExternalLink } from 'lucide-react'

/**
 * Link Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=168-3309
 */
const LINK_TOKENS = {
  color: '#2050f6', // spaceblue-600
  colorHover: '#1337e2', // spaceblue-700
  colorActive: '#162eb7', // spaceblue-800
  colorFocus: '#2050f6',
  focusRing: '0 0 0 2px rgba(32, 80, 246, 0.25)',
  disabled: {
    color: '#a1a1aa', // zinc-400
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

const getFontSize = (size: LinkProps['size']) => {
  if (size === 'sm') return 12
  if (size === 'md') return 14
  if (size === 'lg') return 16
  return 'inherit'
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      underline = 'hover',
      external = false,
      disabled = false,
      size = 'inherit',
      href,
      target,
      rel,
      style,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isExternalLink = external || (href && (href.startsWith('http') || href.startsWith('//')))
    const linkTarget = target || (isExternalLink ? '_blank' : undefined)
    const linkRel = rel || (isExternalLink ? 'noopener noreferrer' : undefined)

    const linkStyle: React.CSSProperties = {
      '--v-fg': disabled ? LINK_TOKENS.disabled.color : LINK_TOKENS.color,
      '--v-fg-hover': disabled ? LINK_TOKENS.disabled.color : LINK_TOKENS.colorHover,
      '--v-fg-active': disabled ? LINK_TOKENS.disabled.color : LINK_TOKENS.colorActive,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--v-fg)',
      fontSize: getFontSize(size),
      fontWeight: 500,
      fontFamily: 'var(--vistral-font-family-sans)',
      textDecoration: underline === 'none' ? 'none' : 'underline',
      textDecorationColor: underline === 'hover' ? 'transparent' : undefined,
      textUnderlineOffset: 2,
      cursor: disabled ? LINK_TOKENS.disabled.cursor : 'pointer',
      transition: 'color 150ms ease-in-out, text-decoration-color 150ms ease-in-out',
      outline: 'none',
      borderRadius: 2,
      padding: '1px 2px',
      margin: '-1px -2px',
      ...style,
    } as React.CSSProperties

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    return (
      <a
        ref={ref}
        data-vistral="link"
        data-underline={underline}
        href={disabled ? undefined : href}
        target={linkTarget}
        rel={linkRel}
        style={linkStyle}
        onClick={handleClick}
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

Link.displayName = 'Link'

export { Link, LINK_TOKENS }
