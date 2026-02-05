import * as React from 'react'
import { forwardRef } from 'react'

/**
 * Text Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=176-4062
 */
const TEXT_TOKENS = {
  // Typography variants
  variants: {
    h1: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#18181b',
    },
    h2: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#18181b',
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#18181b',
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#18181b',
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#18181b',
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#18181b',
    },
    body: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#18181b',
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#18181b',
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#71717a',
    },
    small: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#71717a',
    },
  },
  // Colors
  colors: {
    default: '#18181b',
    muted: '#71717a',
    subtle: '#a1a1aa',
    error: '#ef4444',
    success: '#16a34a',
    warning: '#f59e0b',
    info: '#2050f6',
  },
} as const

export type TextVariant = keyof typeof TEXT_TOKENS.variants
export type TextColor = keyof typeof TEXT_TOKENS.colors

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TextVariant
  /** Text color */
  color?: TextColor
  /** Render as specific HTML element */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** Font weight override */
  weight?: 400 | 500 | 600 | 700
  /** Font size override */
  size?: number | string
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = 'body', color, as, weight, size, style, children, ...props }, ref) => {
    const variantTokens = TEXT_TOKENS.variants[variant]

    // Determine semantic HTML element
    const getElement = (): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' => {
      if (as) return as
      if (variant.startsWith('h')) return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      if (variant === 'body' || variant === 'bodyLarge') return 'p'
      return 'span'
    }

    const Element = getElement()
    const textColor = color ? TEXT_TOKENS.colors[color] : variantTokens.color

    const textStyle: React.CSSProperties = {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: size || variantTokens.fontSize,
      fontWeight: weight || variantTokens.fontWeight,
      lineHeight: variantTokens.lineHeight,
      color: textColor,
      margin: 0,
      ...style,
    }

    return (
      <Element ref={ref as any} style={textStyle} {...props}>
        {children}
      </Element>
    )
  }
)

Text.displayName = 'Text'

export { Text, TEXT_TOKENS }
