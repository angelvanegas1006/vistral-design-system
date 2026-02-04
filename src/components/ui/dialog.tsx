import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Dialog Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=316-11645
 */
const DIALOG_TOKENS = {
  // Overlay
  overlay: {
    bg: 'rgba(0, 0, 0, 0.5)',
  },
  // Container
  container: {
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 12,
    shadow: '0px 16px 48px rgba(0, 0, 0, 0.16)',
  },
  // Sizes
  sizes: {
    sm: { width: 400, maxHeight: '85vh' },
    md: { width: 500, maxHeight: '85vh' },
    lg: { width: 640, maxHeight: '85vh' },
    xl: { width: 800, maxHeight: '90vh' },
    full: { width: '100%', maxHeight: '100%' },
  },
  // Spacing
  padding: {
    header: 24,
    content: 24,
    footer: 16,
  },
} as const

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// ============================================================================
// Dialog Root (Radix UI compatible)
// ============================================================================
const Dialog = DialogPrimitive.Root

// ============================================================================
// Dialog Trigger (Radix UI compatible)
// ============================================================================
const DialogTrigger = DialogPrimitive.Trigger

// ============================================================================
// Dialog Portal (Radix UI compatible)
// ============================================================================
const DialogPortal = DialogPrimitive.Portal

// ============================================================================
// Dialog Close (Radix UI compatible)
// ============================================================================
const DialogClose = DialogPrimitive.Close

// ============================================================================
// Dialog Overlay (Radix UI compatible with Design System styling)
// ============================================================================
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    style={{
      backgroundColor: DIALOG_TOKENS.overlay.bg,
      ...props.style,
    }}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// ============================================================================
// Dialog Content (Radix UI compatible with Design System styling)
// ============================================================================
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Size of the dialog */
  size?: DialogSize
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size = 'md', ...props }, ref) => {
  const sizeTokens = DIALOG_TOKENS.sizes[size]
  
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Base styles
          "fixed left-[50%] top-[50%] z-50 grid w-[95vw] translate-x-[-50%] translate-y-[-50%] gap-4",
          "border bg-white p-6 shadow-lg",
          "rounded-lg max-h-[90vh] overflow-y-auto",
          // Animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          // Dark mode
          "dark:bg-[#1a1a1a] dark:text-white",
          className
        )}
        style={{
          width: sizeTokens.width,
          maxWidth: size === 'full' ? '100%' : 'calc(100vw - 48px)',
          maxHeight: sizeTokens.maxHeight,
          borderRadius: size === 'full' ? 0 : DIALOG_TOKENS.container.radius,
          boxShadow: DIALOG_TOKENS.container.shadow,
          borderColor: DIALOG_TOKENS.container.border,
          ...props.style,
        }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#2050f6] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[#f4f4f5] data-[state=open]:text-[#71717a] z-10 dark:data-[state=open]:bg-[#262626] dark:data-[state=open]:text-[#a3a3a3]">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

// ============================================================================
// Dialog Header (Helper component)
// ============================================================================
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

// ============================================================================
// Dialog Footer (Helper component)
// ============================================================================
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

// ============================================================================
// Dialog Title (Radix UI compatible)
// ============================================================================
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      "text-[#18181b] dark:text-white",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// ============================================================================
// Dialog Description (Radix UI compatible)
// ============================================================================
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-[#71717a] dark:text-[#a3a3a3]",
      className
    )}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// ============================================================================
// Exports
// ============================================================================
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DIALOG_TOKENS,
}
