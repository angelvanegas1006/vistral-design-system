import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from '../src/components/ui/toast';
import { Button } from '../src/components/ui/button';

const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toast

Notification toast messages.

## Features
- **5 Variants**: Default, Success, Error, Warning, Info
- **Auto Dismiss**: Configurable duration
- **Actions**: Optional action button
- **Positions**: 6 position options
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

const ToastDemo = () => {
  const { toast } = useToast();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button onClick={() => toast({ title: 'Default toast', description: 'This is a default toast message.' })}>
        Show Default
      </Button>
      <Button 
        variant="secondary"
        onClick={() => toast({ 
          title: 'Success!', 
          description: 'Your changes have been saved.',
          variant: 'success',
        })}
      >
        Show Success
      </Button>
      <Button 
        variant="destructive"
        onClick={() => toast({ 
          title: 'Error', 
          description: 'Something went wrong. Please try again.',
          variant: 'error',
        })}
      >
        Show Error
      </Button>
      <Button 
        variant="ghost"
        onClick={() => toast({ 
          title: 'Warning', 
          description: 'Your session will expire soon.',
          variant: 'warning',
        })}
      >
        Show Warning
      </Button>
      <Button 
        variant="secondary"
        onClick={() => toast({ 
          title: 'Info', 
          description: 'A new version is available.',
          variant: 'info',
        })}
      >
        Show Info
      </Button>
    </div>
  );
};

export const Default: StoryObj = {
  render: () => <ToastDemo />,
};

const ToastWithAction = () => {
  const { toast } = useToast();
  
  return (
    <Button onClick={() => toast({ 
      title: 'File deleted', 
      description: 'The file has been moved to trash.',
      variant: 'default',
      action: {
        label: 'Undo',
        onClick: () => alert('Undo clicked!'),
      },
    })}>
      Delete File
    </Button>
  );
};

export const WithAction: StoryObj = {
  name: 'With Action Button',
  render: () => <ToastWithAction />,
};

const ToastCustomDuration = () => {
  const { toast } = useToast();
  
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button 
        variant="secondary"
        onClick={() => toast({ 
          title: 'Quick toast', 
          description: 'This disappears in 2 seconds.',
          duration: 2000,
        })}
      >
        2 seconds
      </Button>
      <Button 
        variant="secondary"
        onClick={() => toast({ 
          title: 'Long toast', 
          description: 'This stays for 10 seconds.',
          duration: 10000,
        })}
      >
        10 seconds
      </Button>
      <Button 
        variant="secondary"
        onClick={() => toast({ 
          title: 'Persistent toast', 
          description: 'This stays until dismissed.',
          duration: 0,
        })}
      >
        Persistent
      </Button>
    </div>
  );
};

export const CustomDuration: StoryObj = {
  render: () => <ToastCustomDuration />,
};

const ToastPositions = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: 500 }}>
      {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((position) => (
        <ToastProvider key={position} position={position}>
          <ToastButton position={position} />
        </ToastProvider>
      ))}
    </div>
  );
};

const ToastButton = ({ position }: { position: string }) => {
  const { toast } = useToast();
  return (
    <Button 
      variant="secondary" 
      size="sm"
      onClick={() => toast({ title: position, description: `Toast at ${position}` })}
    >
      {position}
    </Button>
  );
};

export const Positions: StoryObj = {
  render: () => <ToastPositions />,
};

const MultipleToasts = () => {
  const { toast } = useToast();
  
  const showMultiple = () => {
    toast({ title: 'First toast', variant: 'info' });
    setTimeout(() => toast({ title: 'Second toast', variant: 'success' }), 300);
    setTimeout(() => toast({ title: 'Third toast', variant: 'warning' }), 600);
  };
  
  return (
    <Button onClick={showMultiple}>
      Show Multiple
    </Button>
  );
};

export const Multiple: StoryObj = {
  name: 'Multiple Toasts',
  render: () => <MultipleToasts />,
};
