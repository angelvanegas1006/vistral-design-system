import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '../src/components/ui/toast'
import { Button } from '../src/components/ui/button'

const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toast

Toast component matching Figma design.

Based on Figma:
- [Toast Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=707-2506)
- [Toast Examples](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=698-26129)
- [Toast Layouts](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=652-19415)

## Features
- **4 Variants**: Default, Success, Error, Warning, Info
- **Auto Dismiss**: Configurable duration (4s success, 6s error per Figma)
- **Actions**: Optional action button (e.g., "Undo")
- **Positions**: 6 position options (top/bottom, left/center/right)
- **Accessibility**: ARIA roles (status/alert), live regions

## Best Practices
- Keep messages short and concise (3-5 seconds readable)
- Provide "Undo" option for reversible actions
- Set predictable duration (4s success, 6s errors)
- Choose fixed, non-intrusive position (bottom-center or bottom-left)
- Don't use for critical errors (use Dialog instead)
- Limit to 1-2 toasts at a time
        `,
      },
    },
  },
  decorators: [
    Story => (
      <ToastProvider position="bottom-right">
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta

const ToastDemo = () => {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        onClick={() =>
          toast({
            title: '<text content>',
            description: '<text content>',
            variant: 'default',
          })
        }
      >
        Show Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: '<text content>',
            description: '<text content>',
            variant: 'success',
          })
        }
      >
        Show Success
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: '<text content>',
            description: '<text content>',
            variant: 'error',
          })
        }
      >
        Show Error
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            title: '<text content>',
            description: '<text content>',
            variant: 'warning',
          })
        }
      >
        Show Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: '<text content>',
            description: '<text content>',
            variant: 'info',
          })
        }
      >
        Show Info
      </Button>
    </div>
  )
}

export const Default: StoryObj = {
  render: () => <ToastDemo />,
}

export const AllVariants: StoryObj = {
  name: 'All Variants (Figma Reference)',
  render: () => {
    const { toast } = useToast()

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button
          onClick={() =>
            toast({
              title: '<text content>',
              description: '<text content>',
              variant: 'default',
            })
          }
        >
          Default Toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: '<text content>',
              description: '<text content>',
              variant: 'success',
            })
          }
        >
          Success Toast
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast({
              title: '<text content>',
              description: '<text content>',
              variant: 'error',
            })
          }
        >
          Error Toast
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            toast({
              title: '<text content>',
              description: '<text content>',
              variant: 'warning',
            })
          }
        >
          Warning Toast
        </Button>
      </div>
    )
  },
}

const ToastWithAction = () => {
  const { toast } = useToast()

  return (
    <Button
      onClick={() =>
        toast({
          title: 'File deleted',
          description: 'The file has been moved to trash.',
          variant: 'default',
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('Undo clicked!')
              // In a real app, this would restore the file
            },
          },
        })
      }
    >
      Delete File (with Undo)
    </Button>
  )
}

export const WithAction: StoryObj = {
  name: 'With Action Button',
  render: () => <ToastWithAction />,
}

export const WithActions: StoryObj = {
  name: 'With Different Actions',
  render: () => {
    const { toast } = useToast()

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button
          onClick={() =>
            toast({
              title: 'Settings saved',
              description: 'Your preferences have been updated.',
              variant: 'success',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo settings'),
              },
            })
          }
        >
          Success with Undo
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Network error',
              description: 'Changes not saved. Please try again.',
              variant: 'error',
              action: {
                label: 'Retry',
                onClick: () => console.log('Retry action'),
              },
            })
          }
        >
          Error with Retry
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Draft will expire soon',
              description: 'Your draft will be deleted in 24 hours.',
              variant: 'warning',
              action: {
                label: 'View Details',
                onClick: () => console.log('View details'),
              },
            })
          }
        >
          Warning with Action
        </Button>
      </div>
    )
  },
}

const ToastCustomDuration = () => {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Quick toast',
            description: 'This disappears in 2 seconds.',
            duration: 2000,
          })
        }
      >
        2 seconds
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Success toast',
            description: 'Default duration: 4 seconds (per Figma).',
            variant: 'success',
          })
        }
      >
        Success (4s default)
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Error toast',
            description: 'Default duration: 6 seconds (per Figma).',
            variant: 'error',
          })
        }
      >
        Error (6s default)
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Persistent toast',
            description: 'This stays until dismissed.',
            duration: 0,
          })
        }
      >
        Persistent (no auto-dismiss)
      </Button>
    </div>
  )
}

export const CustomDuration: StoryObj = {
  name: 'Custom Duration',
  render: () => <ToastCustomDuration />,
}

const ToastPositions = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: 500 }}>
      {(
        [
          'top-left',
          'top-center',
          'top-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ] as const
      ).map(position => (
        <ToastProvider key={position} position={position}>
          <ToastButton position={position} />
        </ToastProvider>
      ))}
    </div>
  )
}

const ToastButton = ({ position }: { position: string }) => {
  const { toast } = useToast()
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() =>
        toast({
          title: `Toast at ${position}`,
          description: `This toast appears at ${position}`,
          variant: 'info',
        })
      }
    >
      {position}
    </Button>
  )
}

export const Positions: StoryObj = {
  name: 'Positions',
  render: () => <ToastPositions />,
}

const MultipleToasts = () => {
  const { toast } = useToast()

  const showMultiple = () => {
    toast({ title: 'First toast', description: 'This is the first notification', variant: 'info' })
    setTimeout(
      () =>
        toast({
          title: 'Second toast',
          description: 'This is the second notification',
          variant: 'success',
        }),
      300
    )
    setTimeout(
      () =>
        toast({
          title: 'Third toast',
          description: 'This is the third notification',
          variant: 'warning',
        }),
      600
    )
  }

  return <Button onClick={showMultiple}>Show Multiple Toasts</Button>
}

export const Multiple: StoryObj = {
  name: 'Multiple Toasts',
  render: () => <MultipleToasts />,
}

const RealWorldExamplesDemo = () => {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        onClick={() =>
          toast({
            title: 'Settings saved',
            description: 'Your preferences have been updated.',
            variant: 'success',
          })
        }
      >
        Settings Saved
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Item added to cart',
            description: 'Product has been added successfully.',
            variant: 'success',
            action: {
              label: 'Undo',
              onClick: () => console.log('Remove from cart'),
            },
          })
        }
      >
        Add to Cart
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Connecting to server...',
            description: 'Please wait while we establish connection.',
            variant: 'info',
          })
        }
      >
        Connecting Info
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Network connection lost',
            description: 'Changes not saved. Please try again.',
            variant: 'error',
            action: {
              label: 'Retry',
              onClick: () => console.log('Retry connection'),
            },
          })
        }
      >
        Network Error
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Draft will expire soon',
            description: 'Your draft will be deleted in 24 hours.',
            variant: 'warning',
          })
        }
      >
        Draft Expiring Warning
      </Button>
    </div>
  )
}

export const RealWorldExamples: StoryObj = {
  name: 'Real World Examples',
  render: () => <RealWorldExamplesDemo />,
}

const ToastStacking = () => {
  const { toast } = useToast()

  const showStack = () => {
    // Show multiple toasts quickly to demonstrate stacking
    toast({ title: 'Toast 1', description: 'First notification', variant: 'info' })
    setTimeout(
      () => toast({ title: 'Toast 2', description: 'Second notification', variant: 'success' }),
      200
    )
    setTimeout(
      () => toast({ title: 'Toast 3', description: 'Third notification', variant: 'warning' }),
      400
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button onClick={showStack}>Show Stacked Toasts</Button>
      <p style={{ fontSize: 13, color: '#71717a', maxWidth: 400 }}>
        Multiple toasts will stack vertically. Best practice: limit to 1-2 toasts at a time.
      </p>
    </div>
  )
}

export const Stacking: StoryObj = {
  name: 'Toast Stacking',
  render: () => <ToastStacking />,
}
