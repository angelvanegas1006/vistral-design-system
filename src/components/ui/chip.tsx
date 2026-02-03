import * as React from "react"
import { forwardRef } from "react"
import { X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Chip Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1476-26875
 */
const CHIP_TOKENS = {
  // Variants
  variants: {
    filled: {
      bg: '#f4f4f5',          // zinc-100
      bgHover: '#e4e4e7',     // zinc-200
      bgSelected: '#2050f6',  // spaceblue-600
      fg: '#3f3f46',          // zinc-700
      fgSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgHover: '#f4f4f5',     // zinc-100
      bgSelected: '#eef4ff',  // spaceblue-50
      border: '#d4d4d8',      // zinc-300
      borderSelected: '#2050f6',
      fg: '#3f3f46',
      fgSelected: '#2050f6',
    },
  },
  // Sizes
  sizes: {
    sm: { height: 24, paddingX: 8, fontSize: 12, iconSize: 14, gap: 4 },
    md: { height: 32, paddingX: 12, fontSize: 14, iconSize: 16, gap: 6 },
  },
  radius: 9999, // Pill shape
} as const

type ChipVariant = 'filled' | 'outlined'
type ChipSize = 'sm' | 'md'

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ChipVariant
  size?: ChipSize
  /** Selected state */
  selected?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Left icon */
  leftIcon?: LucideIcon
  /** Show remove button */
  removable?: boolean
  /** Callback when chip is clicked */
  onClick?: () => void
  /** Callback when remove button is clicked */
  onRemove?: () => void
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ 
    variant = 'filled',
    size = 'md',
    selected = false,
    disabled = false,
    leftIcon: LeftIcon,
    removable = false,
    onClick,
    onRemove,
    style, 
    children, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const tokens = CHIP_TOKENS.variants[variant]
    const sizeTokens = CHIP_TOKENS.sizes[size]

    // Get background color based on state
    const getBgColor = () => {
      if (selected) return tokens.bgSelected
      if (isHovered && !disabled) return tokens.bgHover
      return tokens.bg
    }

    // Get text color based on state
    const getFgColor = () => {
      if (selected) return tokens.fgSelected
      return tokens.fg
    }

    // Get border color (for outlined variant)
    const getBorderColor = () => {
      if (variant !== 'outlined') return 'transparent'
      if (selected) return (tokens as typeof CHIP_TOKENS.variants.outlined).borderSelected
      return (tokens as typeof CHIP_TOKENS.variants.outlined).border
    }

    const chipStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeTokens.gap,
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: removable ? sizeTokens.gap : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      lineHeight: 1,
      backgroundColor: getBgColor(),
      color: getFgColor(),
      border: `1px solid ${getBorderColor()}`,
      borderRadius: CHIP_TOKENS.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 150ms ease-in-out',
      outline: 'none',
      ...style,
    }

    const removeButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeTokens.height - 8,
      height: sizeTokens.height - 8,
      marginRight: -sizeTokens.gap,
      padding: 0,
      background: 'none',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      color: 'inherit',
      opacity: 0.6,
      transition: 'opacity 150ms ease-in-out',
    }

    const handleClick = () => {
      if (!disabled) onClick?.()
    }

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!disabled) onRemove?.()
    }

    return (
      <button
        ref={ref}
        type="button"
        style={chipStyle}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-pressed={selected}
        {...props}
      >
        {LeftIcon && <LeftIcon size={sizeTokens.iconSize} />}
        {children}
        {removable && (
          <span 
            role="button"
            tabIndex={-1}
            style={removeButtonStyle}
            onClick={handleRemove}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.6')}
            aria-label="Remove"
          >
            <X size={sizeTokens.iconSize - 2} />
          </span>
        )}
      </button>
    )
  }
)

Chip.displayName = "Chip"

// ============================================================================
// Chip Group (for managing selection)
// ============================================================================
export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected chip values (for controlled mode) */
  value?: string[]
  /** Callback when selection changes */
  onValueChange?: (value: string[]) => void
  /** Allow multiple selection */
  multiple?: boolean
}

const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ value, onValueChange, multiple = false, style, children, ...props }, ref) => {
    const groupStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      ...style,
    }

    return (
      <div ref={ref} role="group" style={groupStyle} {...props}>
        {children}
      </div>
    )
  }
)

ChipGroup.displayName = "ChipGroup"

export { Chip, ChipGroup, CHIP_TOKENS }
