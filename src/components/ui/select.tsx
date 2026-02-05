import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Select Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=212-4742
 */
const SELECT_TOKENS = {
  // Trigger states
  trigger: {
    bg: '#ffffff',
    border: '#d4d4d8',
    borderHover: '#a1a1aa',
    borderFocus: '#2050f6',
    borderError: '#dc2626',
    fg: '#18181b',
    placeholder: '#a1a1aa',
    disabled: {
      bg: '#f4f4f5',
      border: '#e4e4e7',
      fg: '#a1a1aa',
    },
  },
  // Dropdown menu
  menu: {
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 8,
    maxHeight: 256,
  },
  // Option item
  option: {
    height: 40,
    paddingX: 12,
    bg: 'transparent',
    bgHover: '#f4f4f5',
    bgSelected: '#eef4ff',
    fg: '#18181b',
    fgSelected: '#2050f6',
  },
  // Sizes
  sizes: {
    sm: { height: 32, paddingX: 10, fontSize: 13 },
    md: { height: 40, paddingX: 12, fontSize: 14 },
    lg: { height: 48, paddingX: 14, fontSize: 16 },
  },
  radius: 8,
} as const

// ============================================================================
// Select Root (Radix UI compatible)
// ============================================================================
const Select = SelectPrimitive.Root

// ============================================================================
// Select Group (Radix UI compatible)
// ============================================================================
const SelectGroup = SelectPrimitive.Group

// ============================================================================
// Select Value (Radix UI compatible)
// ============================================================================
const SelectValue = SelectPrimitive.Value

// ============================================================================
// Select Trigger (Radix UI compatible with Design System styling)
// ============================================================================
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Error state */
  error?: boolean
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Full width */
  fullWidth?: boolean
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, size = 'md', error = false, label, helperText, fullWidth, ...props }, ref) => {
  const sizeTokens = SELECT_TOKENS.sizes[size]

  const triggerId = React.useId()
  const helperId = helperText ? `select-helper-${triggerId}` : undefined

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          htmlFor={triggerId}
          style={{
            display: 'block',
            marginBottom: 6,
            fontSize: 14,
            fontWeight: 500,
            color: props.disabled ? '#a1a1aa' : '#18181b',
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {label}
        </label>
      )}

      <SelectPrimitive.Trigger
        ref={ref}
        id={triggerId}
        className={cn(
          // Base styles
          'flex w-full items-center justify-between rounded-lg border bg-white ring-offset-background',
          'data-[placeholder]:text-[#A1A1AA] text-[#18181B]',
          'focus:outline-none focus:ring-2 focus:ring-[#2050F6] focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          '[&>span]:line-clamp-1',
          // Icon rotation when open
          '[&[data-state=open]>*:last-child>svg]:rotate-180',
          // Size-based styles
          size === 'sm' && `h-8 text-[13px] px-[10px]`,
          size === 'md' && `h-10 text-[14px] px-3`,
          size === 'lg' && `h-12 text-[16px] px-[14px]`,
          // Border colors
          error
            ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]'
            : 'border-[#d4d4d8] hover:border-[#a1a1aa] focus:border-[#2050f6]',
          // Dark mode
          'dark:bg-[#1a1a1a] dark:text-white',
          className
        )}
        style={{
          height: sizeTokens.height,
          paddingLeft: sizeTokens.paddingX,
          paddingRight: sizeTokens.paddingX,
          fontSize: sizeTokens.fontSize,
          ...props.style,
        }}
        aria-label={label || props['aria-label']}
        aria-invalid={error}
        aria-describedby={helperId}
        {...props}
      >
        {props.children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      {helperText && (
        <p
          id={helperId}
          style={{
            margin: '6px 0 0',
            fontSize: 12,
            color: error ? '#dc2626' : '#71717a',
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// ============================================================================
// Select Scroll Up Button (Radix UI compatible)
// ============================================================================
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

// ============================================================================
// Select Scroll Down Button (Radix UI compatible)
// ============================================================================
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

// ============================================================================
// Select Content (Radix UI compatible with Design System styling)
// ============================================================================
export interface SelectContentProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Base styles from design system
        'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem]',
        'overflow-y-auto overflow-x-hidden rounded-md border bg-white text-[#18181b] shadow-md',
        // Animations
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-[--radix-select-content-transform-origin]',
        // Popper positioning
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        // Design system tokens
        'border-[#e4e4e7]',
        'dark:bg-[#1a1a1a] dark:text-white',
        className
      )}
      position={position}
      style={{
        boxShadow: SELECT_TOKENS.menu.shadow,
        maxHeight: SELECT_TOKENS.menu.maxHeight,
        ...props.style,
      }}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

// ============================================================================
// Select Label (Radix UI compatible)
// ============================================================================
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

// ============================================================================
// Select Item (Radix UI compatible with Design System styling)
// ============================================================================
export interface SelectItemProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
> {}

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    // Calculate padding to accommodate checkmark (8px left + 16px icon + 8px gap = 32px)
    const checkmarkWidth = 16 // h-4 w-4 = 16px
    const checkmarkLeft = 8 // left-2 = 8px
    const gapAfterCheckmark = 8 // space between checkmark and text
    const minPaddingLeft = checkmarkLeft + checkmarkWidth + gapAfterCheckmark // 32px

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          // Base styles
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 text-sm outline-none',
          // Design system tokens
          'focus:bg-[#f4f4f5] focus:text-[#18181b]',
          'data-[highlighted]:bg-[#f4f4f5]',
          'data-[state=checked]:bg-[#eef4ff] data-[state=checked]:text-[#2050f6]',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          // Dark mode
          'dark:focus:bg-[#262626] dark:data-[highlighted]:bg-[#262626]',
          'dark:data-[state=checked]:bg-[#1e3a8a] dark:data-[state=checked]:text-[#93c5fd]',
          className
        )}
        style={{
          height: SELECT_TOKENS.option.height,
          paddingLeft: Math.max(minPaddingLeft, SELECT_TOKENS.option.paddingX + 20), // Ensure enough space for checkmark
          paddingRight: SELECT_TOKENS.option.paddingX,
          ...props.style,
        }}
        role="option"
        {...props}
      >
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)
SelectItem.displayName = SelectPrimitive.Item.displayName

// ============================================================================
// Select Separator (Radix UI compatible)
// ============================================================================
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-[#e4e4e7] dark:bg-[#333333]', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// ============================================================================
// Exports
// ============================================================================
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SELECT_TOKENS,
}
