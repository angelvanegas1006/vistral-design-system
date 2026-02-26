import * as React from 'react'
import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Button Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4766-13519
 */
const BUTTON_TOKENS = {
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
  sizes: {
    sm: { height: 32, paddingX: 12, fontSize: 12, iconSize: 16, gap: 6 },
    md: { height: 40, paddingX: 16, fontSize: 14, iconSize: 18, gap: 8 },
    lg: { height: 48, paddingX: 24, fontSize: 16, iconSize: 20, gap: 10 },
  },
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
  /** Button style variant */
  variant?: ButtonVariant
  /** Button size */
  size?: ButtonSize
  /** Show loading spinner */
  isLoading?: boolean
  /** Icon displayed before children */
  leftIcon?: LucideIcon
  /** Icon displayed after children */
  rightIcon?: LucideIcon
  /** Render as circular icon-only button */
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
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading
    const sizeTokens = BUTTON_TOKENS.sizes[size]

    const { buttonStyle } = React.useMemo(() => {
      const tokens = BUTTON_TOKENS[variant] as Record<string, string>

      const cssVars: Record<string, string> = {
        '--v-bg': isDisabled ? BUTTON_TOKENS.disabled.bg : tokens.bg,
        '--v-bg-hover': tokens.bgHover ?? tokens.bg,
        '--v-bg-active': tokens.bgActive ?? tokens.bg,
        '--v-fg': isDisabled ? BUTTON_TOKENS.disabled.fg : tokens.fg,
        '--v-fg-hover': tokens.fgHover ?? tokens.fg,
        '--v-fg-active': tokens.fgActive ?? tokens.fg,
        '--v-border': tokens.border ?? 'transparent',
        '--v-border-hover': tokens.borderHover ?? 'transparent',
        '--v-border-active': tokens.borderActive ?? 'transparent',
      }

      const buttonStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeTokens.gap,
        height: sizeTokens.height,
        paddingLeft: iconOnly ? 0 : sizeTokens.paddingX,
        paddingRight: iconOnly ? 0 : sizeTokens.paddingX,
        width: iconOnly ? sizeTokens.height : undefined,
        minWidth: iconOnly ? sizeTokens.height : undefined,
        fontFamily: 'var(--vistral-font-family-sans)',
        fontSize: sizeTokens.fontSize,
        fontWeight: 500,
        lineHeight: 1,
        border: tokens.border ? '1px solid' : 'none',
        borderRadius: BUTTON_TOKENS.radius,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        userSelect: 'none',
        ...cssVars,
        ...style,
      }

      return { cssVars, buttonStyle }
    }, [
      variant,
      isDisabled,
      iconOnly,
      style,
      sizeTokens.fontSize,
      sizeTokens.gap,
      sizeTokens.height,
      sizeTokens.paddingX,
    ])

    return (
      <button ref={ref} data-vistral="button" style={buttonStyle} disabled={isDisabled} {...props}>
        {isLoading ? (
          <Loader2
            size={sizeTokens.iconSize}
            style={{ animation: 'vistral-spin 1s linear infinite' }}
          />
        ) : LeftIcon ? (
          <LeftIcon size={sizeTokens.iconSize} />
        ) : iconOnly && React.isValidElement(children) ? (
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

export { Button, BUTTON_TOKENS }
