import * as React from 'react'
import { forwardRef } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Chip Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1478-29203
 */
const CHIP_TOKENS = {
  // Variants
  variants: {
    filled: {
      bg: '#ffffff', // white
      bgHover: '#f4f4f5', // zinc-100
      bgActive: '#e4e4e7', // zinc-200
      bgSelected: '#dbeafe', // blue-100 (light blue)
      bgSelectedHover: '#bfdbfe', // blue-200
      fg: '#18181b', // zinc-900
      fgSelected: '#2050f6', // spaceblue-600
    },
    outlined: {
      bg: 'transparent',
      bgHover: '#f4f4f5', // zinc-100
      bgActive: '#e4e4e7', // zinc-200
      bgSelected: '#eef4ff', // spaceblue-50
      bgSelectedHover: '#dbeafe', // blue-100
      border: '#d4d4d8', // zinc-300
      borderHover: '#a1a1aa', // zinc-400
      borderSelected: '#2050f6',
      fg: '#18181b',
      fgSelected: '#2050f6',
    },
  },
  disabled: {
    bg: '#f4f4f5',
    border: '#e4e4e7',
    fg: '#a1a1aa',
  },
  // Sizes
  sizes: {
    sm: { height: 24, paddingX: 8, fontSize: 12, iconSize: 14, gap: 4 },
    md: { height: 32, paddingX: 12, fontSize: 14, iconSize: 16, gap: 6 },
  },
  radius: 9999, // Pill shape
  // Focus ring
  focusRing: '0 0 0 3px rgba(32, 80, 246, 0.2)',
} as const

type ChipVariant = 'filled' | 'outlined'
type ChipSize = 'sm' | 'md'

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ChipVariant
  size?: ChipSize
  /** Selected state */
  selected?: boolean
  /** Active/Open state (for dropdowns) */
  active?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Left icon */
  leftIcon?: LucideIcon
  /** Right element: 'remove' | 'dropdown' | 'count' | ReactNode */
  rightElement?: 'remove' | 'dropdown' | 'count' | React.ReactNode
  /** Count number (when rightElement is 'count') */
  count?: number
  /** Show divider before right element */
  showDivider?: boolean
  /** Callback when chip is clicked */
  onClick?: () => void
  /** Callback when remove button is clicked */
  onRemove?: () => void
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'filled',
      size = 'md',
      selected = false,
      active = false,
      disabled = false,
      leftIcon: LeftIcon,
      rightElement,
      count,
      showDivider = false,
      onClick,
      onRemove,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const tokens = CHIP_TOKENS.variants[variant]
    const sizeTokens = CHIP_TOKENS.sizes[size]

    const baseBg = disabled
      ? CHIP_TOKENS.disabled.bg
      : selected
        ? tokens.bgSelected
        : active
          ? tokens.bgActive
          : tokens.bg

    const hoverBg = selected ? tokens.bgSelectedHover : active ? tokens.bgActive : tokens.bgHover

    const fgColor = disabled ? CHIP_TOKENS.disabled.fg : selected ? tokens.fgSelected : tokens.fg

    const baseBorder =
      variant !== 'outlined'
        ? 'transparent'
        : disabled
          ? CHIP_TOKENS.disabled.border
          : selected
            ? (tokens as typeof CHIP_TOKENS.variants.outlined).borderSelected
            : (tokens as typeof CHIP_TOKENS.variants.outlined).border

    const hoverBorder =
      variant === 'outlined'
        ? (tokens as typeof CHIP_TOKENS.variants.outlined).borderHover
        : undefined

    const chipStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeTokens.gap,
      height: sizeTokens.height,
      paddingLeft: sizeTokens.paddingX,
      paddingRight: rightElement ? sizeTokens.gap : sizeTokens.paddingX,
      fontSize: sizeTokens.fontSize,
      fontWeight: 500,
      fontFamily: 'var(--vistral-font-family-sans)',
      lineHeight: 1,
      color: fgColor,
      borderWidth: 1,
      borderStyle: 'solid' as const,
      borderRadius: CHIP_TOKENS.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      '--v-bg': baseBg,
      '--v-bg-hover': hoverBg,
      '--v-border': baseBorder,
      ...(hoverBorder ? { '--v-border-hover': hoverBorder } : {}),
      ...style,
    } as React.CSSProperties

    const dividerStyle: React.CSSProperties = {
      width: 1,
      height: sizeTokens.height - 8,
      backgroundColor: variant === 'outlined' && selected ? '#2050f6' : '#d4d4d8',
      margin: '0 4px',
    }

    const rightElementStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      marginRight: -sizeTokens.gap,
      color: 'inherit',
    }

    const removeButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeTokens.height - 8,
      height: sizeTokens.height - 8,
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

    const renderRightElement = () => {
      if (!rightElement) return null

      if (rightElement === 'remove') {
        return (
          <>
            {showDivider && <span style={dividerStyle} />}
            <span
              role="button"
              tabIndex={-1}
              style={removeButtonStyle}
              onClick={handleRemove}
              onMouseOver={e => (e.currentTarget.style.opacity = '1')}
              onMouseOut={e => (e.currentTarget.style.opacity = '0.6')}
              aria-label="Remove"
            >
              <X size={sizeTokens.iconSize - 2} />
            </span>
          </>
        )
      }

      if (rightElement === 'dropdown') {
        return (
          <>
            {showDivider && <span style={dividerStyle} />}
            <span style={rightElementStyle}>
              {active ? (
                <ChevronUp size={sizeTokens.iconSize - 2} />
              ) : (
                <ChevronDown size={sizeTokens.iconSize - 2} />
              )}
            </span>
          </>
        )
      }

      if (rightElement === 'count' && count !== undefined) {
        return (
          <>
            {showDivider && <span style={dividerStyle} />}
            <span style={rightElementStyle}>({count})</span>
          </>
        )
      }

      // Custom ReactNode
      return (
        <>
          {showDivider && <span style={dividerStyle} />}
          <span style={rightElementStyle}>{rightElement}</span>
        </>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        data-vistral="chip"
        data-disabled={disabled || undefined}
        style={chipStyle}
        disabled={disabled}
        onClick={handleClick}
        aria-pressed={selected}
        aria-expanded={active}
        {...props}
      >
        {LeftIcon && <LeftIcon size={sizeTokens.iconSize} />}
        {children}
        {renderRightElement()}
      </button>
    )
  }
)

Chip.displayName = 'Chip'

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
  (
    {
      value: _value,
      onValueChange: _onValueChange,
      multiple: _multiple = false,
      style,
      children,
      ...props
    },
    ref
  ) => {
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

ChipGroup.displayName = 'ChipGroup'

export { Chip, ChipGroup, CHIP_TOKENS }
