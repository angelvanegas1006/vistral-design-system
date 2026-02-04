import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Select Design Tokens from Figma
 * Based on dropdown/select patterns in the design system
 */
const SELECT_TOKENS = {
  // Trigger states
  trigger: {
    bg: '#ffffff',
    border: '#d4d4d8',
    borderHover: '#a1a1aa',
    borderFocus: '#2050f6',
    borderError: '#ef4444',
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
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Error state */
  error?: boolean
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, size = 'md', error = false, ...props }, ref) => {
  const sizeTokens = SELECT_TOKENS.sizes[size]
  
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        // Base styles
        "flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 ring-offset-background",
        "data-[placeholder]:text-[#A1A1AA] text-[#212121]",
        "focus:outline-none focus:ring-2 focus:ring-[#2050F6] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        // Size-based styles
        size === 'sm' && `h-8 text-[13px] px-[10px]`,
        size === 'md' && `h-10 text-[14px] px-3`,
        size === 'lg' && `h-12 text-[16px] px-[14px]`,
        // Border colors
        error 
          ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]"
          : "border-[#d4d4d8] hover:border-[#a1a1aa] focus:border-[#2050f6]",
        // Dark mode
        "dark:bg-[#1a1a1a] dark:text-white",
        className
      )}
      style={{
        height: sizeTokens.height,
        paddingLeft: sizeTokens.paddingX,
        paddingRight: sizeTokens.paddingX,
        fontSize: sizeTokens.fontSize,
        ...props.style,
      }}
      {...props}
    >
      {props.children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
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
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
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
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

// ============================================================================
// Select Content (Radix UI compatible with Design System styling)
// ============================================================================
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Base styles from design system
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem]",
        "overflow-y-auto overflow-x-hidden rounded-md border bg-white text-[#18181b] shadow-md",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "origin-[--radix-select-content-transform-origin]",
        // Popper positioning
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        // Design system tokens
        "border-[#e4e4e7]",
        "dark:bg-[#1a1a1a] dark:text-white",
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
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
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
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

// ============================================================================
// Select Item (Radix UI compatible with Design System styling)
// ============================================================================
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Base styles
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      // Design system tokens
      "focus:bg-[#f4f4f5] focus:text-[#18181b]",
      "data-[highlighted]:bg-[#f4f4f5]",
      "data-[state=checked]:bg-[#eef4ff] data-[state=checked]:text-[#2050f6]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Dark mode
      "dark:focus:bg-[#262626] dark:data-[highlighted]:bg-[#262626]",
      "dark:data-[state=checked]:bg-[#1e3a8a] dark:data-[state=checked]:text-[#93c5fd]",
      className
    )}
    style={{
      height: SELECT_TOKENS.option.height,
      paddingLeft: SELECT_TOKENS.option.paddingX,
      paddingRight: SELECT_TOKENS.option.paddingX,
      ...props.style,
    }}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
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
    className={cn("-mx-1 my-1 h-px bg-[#e4e4e7] dark:bg-[#333333]", className)}
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
