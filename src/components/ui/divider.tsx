import * as React from "react"
import { forwardRef } from "react"

/**
 * Divider Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=183-3912
 */
const DIVIDER_TOKENS = {
  color: '#e4e4e7', // zinc-200
  thickness: 1,
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
} as const

type DividerOrientation = 'horizontal' | 'vertical'
type DividerSpacing = 'sm' | 'md' | 'lg' | 'none'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Orientation of the divider */
  orientation?: DividerOrientation
  /** Spacing around the divider */
  spacing?: DividerSpacing
  /** Custom color override */
  color?: string
}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ 
    orientation = 'horizontal', 
    spacing = 'md',
    color,
    style, 
    ...props 
  }, ref) => {
    const spacingValue = spacing === 'none' ? 0 : DIVIDER_TOKENS.spacing[spacing]
    
    const dividerStyle: React.CSSProperties = orientation === 'horizontal' 
      ? {
          width: '100%',
          height: DIVIDER_TOKENS.thickness,
          margin: `${spacingValue}px 0`,
          backgroundColor: color || DIVIDER_TOKENS.color,
          border: 'none',
          ...style,
        }
      : {
          width: DIVIDER_TOKENS.thickness,
          height: '100%',
          minHeight: 16,
          margin: `0 ${spacingValue}px`,
          backgroundColor: color || DIVIDER_TOKENS.color,
          border: 'none',
          alignSelf: 'stretch',
          ...style,
        }

    return (
      <hr 
        ref={ref} 
        role="separator" 
        aria-orientation={orientation}
        style={dividerStyle} 
        {...props} 
      />
    )
  }
)

Divider.displayName = "Divider"

// ============================================================================
// Divider with Label/Text
// ============================================================================
export interface DividerWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label text */
  label: React.ReactNode
  /** Label position */
  labelPosition?: 'left' | 'center' | 'right'
  /** Spacing around the divider */
  spacing?: DividerSpacing
  /** Custom color override */
  color?: string
}

const DividerWithLabel = forwardRef<HTMLDivElement, DividerWithLabelProps>(
  ({ 
    label,
    labelPosition = 'center',
    spacing = 'md',
    color,
    style, 
    ...props 
  }, ref) => {
    const spacingValue = spacing === 'none' ? 0 : DIVIDER_TOKENS.spacing[spacing]
    
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      margin: `${spacingValue}px 0`,
      ...style,
    }

    const lineStyle: React.CSSProperties = {
      flex: 1,
      height: DIVIDER_TOKENS.thickness,
      backgroundColor: color || DIVIDER_TOKENS.color,
    }

    const labelStyle: React.CSSProperties = {
      padding: '0 12px',
      fontSize: 12,
      fontWeight: 500,
      color: '#71717a', // zinc-500
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      whiteSpace: 'nowrap',
    }

    return (
      <div ref={ref} role="separator" style={containerStyle} {...props}>
        {labelPosition !== 'left' && <span style={lineStyle} />}
        <span style={labelStyle}>{label}</span>
        {labelPosition !== 'right' && <span style={lineStyle} />}
      </div>
    )
  }
)

DividerWithLabel.displayName = "DividerWithLabel"

export { Divider, DividerWithLabel, DIVIDER_TOKENS }
