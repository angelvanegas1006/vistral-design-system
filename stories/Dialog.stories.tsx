import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '../src/components/ui/dialog';
import { Button } from '../src/components/ui/button';
import { Input, Textarea } from '../src/components/ui/input';
import { AlertTriangle, Trash2 } from 'lucide-react';

const meta: Meta = {
  title: 'Components/Dialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dialog

Based on Figma Design System: [Dialog Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=316-11645)

## Features
- **5 Sizes**: Small (400px) to Full screen
- **Composable**: Header, Body, Footer sections
- **Accessible**: Focus trap, escape to close
- **Animations**: Smooth enter/exit transitions
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p style={{ margin: 0, color: '#3f3f46' }}>
            This is the main content area of the dialog. You can put any content here.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="secondary">{size.toUpperCase()}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Size: {size.toUpperCase()}</DialogTitle>
              <DialogDescription>
                This dialog is {size === 'sm' ? '400px' : size === 'md' ? '500px' : size === 'lg' ? '640px' : '800px'} wide.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p style={{ margin: 0, color: '#3f3f46' }}>
                Dialog content goes here.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const FormDialog: StoryObj = {
  name: 'Form Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Name" placeholder="Enter your name" defaultValue="John Doe" fullWidth />
            <Input label="Email" type="email" placeholder="Enter your email" defaultValue="john@example.com" fullWidth />
            <Textarea label="Bio" placeholder="Tell us about yourself" rows={3} fullWidth />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DeleteConfirmation: StoryObj = {
  name: 'Delete Confirmation',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" leftIcon={Trash2}>Delete Item</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: 48,
            height: 48,
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            marginBottom: 16,
          }}>
            <AlertTriangle size={24} color="#dc2626" />
          </div>
          <DialogTitle>Delete Item?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item
            and remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter align="between">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ScrollableContent: StoryObj = {
  name: 'Scrollable Content',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Terms of Service</Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read our terms of service carefully.
          </DialogDescription>
        </DialogHeader>
        <DialogBody style={{ maxHeight: 300 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>
                Section {i + 1}
              </h4>
              <p style={{ margin: 0, fontSize: 14, color: '#52525b', lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Decline</Button>
          </DialogClose>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
          Dialog is {open ? 'open' : 'closed'}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled from outside.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p style={{ margin: 0 }}>You can control this dialog programmatically.</p>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
