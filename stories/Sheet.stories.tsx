import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
} from '../src/components/ui/sheet'
import { Button } from '../src/components/ui/button'
import { Input } from '../src/components/ui/input'

const meta: Meta = {
  title: 'Components/Sheet',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Sheet / Drawer

Side panel that slides in from any edge.

## Features
- **4 Sides**: Left, right, top, bottom
- **Multiple Sizes**: sm, md, lg, xl, full
- **Composable**: Header, body, footer
- **Accessible**: Focus trap, escape to close
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" placeholder="john@example.com" />
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const LeftSide: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <p style={{ color: '#71717a' }}>Menu items would go here...</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
}

export const BottomSheet: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom" size="sm">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" style={{ flex: 1 }}>
              Share
            </Button>
            <Button variant="secondary" style={{ flex: 1 }}>
              Copy
            </Button>
            <Button variant="destructive" style={{ flex: 1 }}>
              Delete
            </Button>
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
}

export const LargeSheet: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Large Sheet</Button>
      </SheetTrigger>
      <SheetContent size="lg">
        <SheetHeader>
          <SheetTitle>Order Details</SheetTitle>
          <SheetDescription>View complete order information.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div style={{ color: '#71717a' }}>Large content area for detailed information...</div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
}
