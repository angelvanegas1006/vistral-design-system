import * as React from 'react'
import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Button Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4766-13519
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
  outline: {
    bg: 'transparent',
    bgHover: '#eef4ff',
    bgActive: '#cfe1ff',
    border: '#2050f6',
    borderHover: '#1337e2',
    borderActive: '#162eb7',
    fg: '#2050f6',
    fgHover: '#1337e2',
    fgActive: '#162eb7',
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
  'destructive-outline': {
    bg: 'transparent',
    bgHover: '#fee2e2',
    bgActive: '#fecaca',
    border: '#dc2626',
    borderHover: '#b91c1c',
    borderActive: '#991b1b',
    fg: '#dc2626',
    fgHover: '#b91c1c',
    fgActive: '#991b1b',
  },
  'destructive-ghost': {
    bg: 'transparent',
    bgHover: '#fee2e2',
    bgActive: '#fecaca',
    fg: '#dc2626',
    fgHover: '#b91c1c',
    fgActive: '#991b1b',
  },
  disabled: {
    bg: '#e5e5e5',
    fg: '#737373',
    border: '#d4d4d8',
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

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'destructive-outline'
  | 'destructive-ghost'
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
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isPressed, setIsPressed] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

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
      if (isHovered && 'fgHover' in tokens) return (tokens as any).fgHover
      return tokens.fg
    }

    // Get border color based on state (for outline variants)
    const getBorderColor = () => {
      if (isDisabled && 'border' in BUTTON_TOKENS.disabled) return BUTTON_TOKENS.disabled.border
      if (isPressed && 'borderActive' in tokens) return tokens.borderActive
      if (isHovered && 'borderHover' in tokens) return tokens.borderHover
      if ('border' in tokens) return tokens.border
      return 'transparent'
    }

    // Get border width
    const getBorderWidth = () => {
      if ('border' in tokens) return '1px'
      return 'none'
    }

    // Focus ring for accessibility
    const getFocusRing = () => {
      if (isFocused && !isDisabled) {
        return '0 0 0 3px rgba(32, 80, 246, 0.2)'
      }
      return 'none'
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
      border: getBorderWidth(),
      borderColor: getBorderColor(),
      borderRadius: BUTTON_TOKENS.radius,
      // Focus
      outline: 'none',
      boxShadow: getFocusRing(),
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

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(false)
      onBlur?.(e)
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={sizeTokens.iconSize} style={{ animation: 'spin 1s linear infinite' }} />
        ) : LeftIcon ? (
          <LeftIcon size={sizeTokens.iconSize} />
        ) : iconOnly && React.isValidElement(children) ? (
          // When iconOnly is true and children is a React element (icon), render it
          React.cloneElement(children as React.ReactElement<{ size?: number }>, {
            size: sizeTokens.iconSize,
          })
        ) : null}

        {!iconOnly && children}

        {!isLoading && RightIcon && !iconOnly && <RightIcon size={sizeTokens.iconSize} />}
      </button>
    )
  }
)

Button.displayName = 'Button'

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
