import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, ChevronLeft } from 'lucide-react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Dialog Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2777-56986
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
  // Desktop sizes
  desktop: {
    minWidth: 440,
    maxWidth: '40%',
    padding: 24,
    verticalSpace: 32,
    buttonHeight: 48,
  },
  // Mobile/Tablet sizes
  mobile: {
    minWidth: 320,
    maxWidth: '90vw',
    padding: 24,
    verticalSpace: 32,
    buttonHeight: 48,
  },
  // Max height
  maxHeight: '80vh',
  minHeight: 'auto',
} as const

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type DialogVariant = 'desktop' | 'mobile' | 'bottom-sheet'

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
      'fixed inset-0 z-50 bg-black/50',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
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
export interface DialogContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  /** Size of the dialog */
  size?: DialogSize
  /** Variant: desktop, mobile, or bottom-sheet */
  variant?: DialogVariant
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size = 'md', variant = 'desktop', ...props }, ref) => {
  const isMobile = variant === 'mobile' || variant === 'bottom-sheet'
  const isBottomSheet = variant === 'bottom-sheet'

  // Size-based width for desktop
  const getDesktopWidth = () => {
    switch (size) {
      case 'sm':
        return 400
      case 'md':
        return 500
      case 'lg':
        return 640
      case 'xl':
        return 800
      case 'full':
        return '100%'
      default:
        return 500
    }
  }

  const contentStyle: React.CSSProperties = {
    backgroundColor: DIALOG_TOKENS.container.bg,
    borderColor: DIALOG_TOKENS.container.border,
    boxShadow: DIALOG_TOKENS.container.shadow,
    maxHeight: DIALOG_TOKENS.maxHeight,
    minHeight: DIALOG_TOKENS.minHeight,
    padding: DIALOG_TOKENS.desktop.padding,
    ...props.style,
  }

  if (isMobile) {
    // Mobile: full width, rounded top corners only for bottom sheet
    contentStyle.width = '100%'
    contentStyle.maxWidth = DIALOG_TOKENS.mobile.maxWidth
    contentStyle.minWidth = DIALOG_TOKENS.mobile.minWidth
    contentStyle.height = isBottomSheet ? 'auto' : '100%'
    contentStyle.maxHeight = isBottomSheet ? '90vh' : '100%'
    contentStyle.borderRadius = isBottomSheet ? '16px 16px 0 0' : 0
    contentStyle.position = 'fixed'
    contentStyle.bottom = isBottomSheet ? 0 : undefined
    contentStyle.top = isBottomSheet ? undefined : 0
    contentStyle.left = 0
    contentStyle.right = 0
    contentStyle.transform = 'none'
  } else {
    // Desktop: centered, responsive width
    const desktopWidth = getDesktopWidth()
    contentStyle.width = typeof desktopWidth === 'number' ? `${desktopWidth}px` : desktopWidth
    contentStyle.maxWidth = DIALOG_TOKENS.desktop.maxWidth
    contentStyle.minWidth = DIALOG_TOKENS.desktop.minWidth
    contentStyle.borderRadius = size === 'full' ? 0 : DIALOG_TOKENS.container.radius
  }

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Base styles
          'fixed z-50 grid gap-4 overflow-y-auto',
          // Desktop positioning
          !isMobile && 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
          // Animations
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          !isMobile && 'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          !isMobile &&
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          !isMobile &&
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          // Mobile animations
          isBottomSheet &&
            'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
          variant === 'mobile' &&
            'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
          // Dark mode
          'dark:bg-[#1a1a1a] dark:text-white',
          className
        )}
        style={contentStyle}
        {...props}
      >
        {children}
        {!isMobile && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#2050f6] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[#f4f4f5] data-[state=open]:text-[#71717a] dark:data-[state=open]:bg-[#262626] dark:data-[state=open]:text-[#a3a3a3]"
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              zIndex: 50,
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

// ============================================================================
// Dialog Header (Helper component)
// ============================================================================
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show back button (for mobile) */
  showBack?: boolean
  /** Back button handler */
  onBack?: () => void
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, showBack, onBack, children, ...props }, ref) => {
    const handleBack = () => {
      if (onBack) {
        onBack()
      }
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', className)}
        style={{
          paddingBottom: DIALOG_TOKENS.desktop.verticalSpace,
        }}
        {...props}
      >
        {showBack && (
          <DialogPrimitive.Close asChild>
            <button
              onClick={handleBack}
              className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#2050f6] focus:ring-offset-2 disabled:pointer-events-none"
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f4f4f5',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </button>
          </DialogPrimitive.Close>
        )}
        {children}
      </div>
    )
  }
)
DialogHeader.displayName = 'DialogHeader'

// ============================================================================
// Dialog Body (Helper component)
// ============================================================================
const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('overflow-y-auto', className)}
      style={{
        flex: 1,
        ...style,
      }}
      {...props}
    />
  )
)
DialogBody.displayName = 'DialogBody'

// ============================================================================
// Dialog Footer (Helper component)
// ============================================================================
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack buttons vertically (for mobile) */
  stacked?: boolean
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, stacked, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        stacked
          ? 'flex flex-col gap-2'
          : 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      style={{
        paddingTop: DIALOG_TOKENS.desktop.verticalSpace,
        ...style,
      }}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'

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
      'text-lg font-semibold leading-none tracking-tight',
      'text-[#18181b] dark:text-white',
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
    className={cn('text-sm text-[#71717a] dark:text-[#a3a3a3]', className)}
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
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DIALOG_TOKENS,
}
