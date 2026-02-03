import * as React from "react"
import { forwardRef } from "react"
import { Loader2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Button Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=101-2720
 */
const BUTTON_TOKENS = {
  // Colors
  primary: {
    bg: '#2050f6',
    bgHover: '#1337e2',
    bgActive: '#162eb7',
    fg: '#ffffff',
  },
  secondary: {
    bg: '#d9e7ff',
    bgHover: '#eef4ff',
    bgActive: '#cfe1ff',
    fg: '#162eb7',
    fgActive: '#182c90',
  },
  ghost: {
    bg: 'transparent',
    bgHover: '#eef4ff',
    bgActive: '#cfe1ff',
    fg: '#162eb7',
    fgActive: '#182c90',
  },
  destructive: {
    bg: '#dc2626',
    bgHover: '#b91c1c',
    bgActive: '#991b1b',
    fg: '#ffffff',
  },
  'destructive-ghost': {
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgActive: '#e4e4e7',
    fg: '#b91c1c',
  },
  disabled: {
    bg: '#e5e5e5',
    fg: '#737373',
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 12, fontSize: 12, iconSize: 16, gap: 6 },
    md: { height: 40, paddingX: 16, fontSize: 14, iconSize: 18, gap: 8 },
    lg: { height: 48, paddingX: 24, fontSize: 16, iconSize: 20, gap: 10 },
  },
  // Radius (pill shape)
  radius: 9999,
} as const

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'destructive-ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  iconOnly?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconOnly = false,
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isPressed, setIsPressed] = React.useState(false)

    const isDisabled = disabled || isLoading
    const tokens = BUTTON_TOKENS[variant]
    const sizeTokens = BUTTON_TOKENS.sizes[size]

    // Get background color based on state
    const getBgColor = () => {
      if (isDisabled) return BUTTON_TOKENS.disabled.bg
      if (isPressed && 'bgActive' in tokens) return tokens.bgActive
      if (isHovered && 'bgHover' in tokens) return tokens.bgHover
      return tokens.bg
    }

    // Get text color based on state
    const getFgColor = () => {
      if (isDisabled) return BUTTON_TOKENS.disabled.fg
      if (isPressed && 'fgActive' in tokens) return (tokens as any).fgActive
      return tokens.fg
    }

    const buttonStyle: React.CSSProperties = {
      // Layout
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeTokens.gap,
      // Size
      height: sizeTokens.height,
      paddingLeft: iconOnly ? 0 : sizeTokens.paddingX,
      paddingRight: iconOnly ? 0 : sizeTokens.paddingX,
      width: iconOnly ? sizeTokens.height : undefined,
      minWidth: iconOnly ? sizeTokens.height : undefined,
      // Typography
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      lineHeight: 1,
      // Colors
      backgroundColor: getBgColor(),
      color: getFgColor(),
      // Border
      border: 'none',
      borderRadius: BUTTON_TOKENS.radius,
      // Cursor
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      // Transition
      transition: 'all 150ms ease-in-out',
      // Transform
      transform: isPressed && !isDisabled ? 'scale(0.98)' : 'scale(1)',
      // Opacity
      opacity: isDisabled ? 0.6 : 1,
      // User select
      userSelect: 'none',
      // Custom styles
      ...style,
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true)
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false)
      setIsPressed(false)
      onMouseLeave?.(e)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true)
      onMouseDown?.(e)
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false)
      onMouseUp?.(e)
    }

    return (
      <button
        ref={ref}
        style={buttonStyle}
        disabled={isDisabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {isLoading ? (
          <Loader2 
            size={sizeTokens.iconSize} 
            style={{ animation: 'spin 1s linear infinite' }} 
          />
        ) : LeftIcon ? (
          <LeftIcon size={sizeTokens.iconSize} />
        ) : null}
        
        {!iconOnly && children}
        
        {!isLoading && RightIcon && !iconOnly && (
          <RightIcon size={sizeTokens.iconSize} />
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

// Add keyframes for spinner animation
if (typeof document !== 'undefined') {
  const styleId = 'vistral-button-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)
  }
}

export { Button, BUTTON_TOKENS }
