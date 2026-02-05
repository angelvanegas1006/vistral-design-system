import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '../src/components/ui/dropdown-menu'
import { Button } from '../src/components/ui/button'
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Plus,
  Trash2,
  Copy,
  Edit,
  Share,
  Download,
  Archive,
  MoreHorizontal,
  Check,
} from 'lucide-react'

const meta: Meta = {
  title: 'Components/DropdownMenu',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dropdown Menu

Context menu / dropdown menu component.

## Features
- **Items**: Regular items with icons
- **Shortcuts**: Keyboard shortcut display
- **Labels**: Section headers
- **Separators**: Visual dividers
- **Checkbox Items**: Toggleable items
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
          <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
          <DropdownMenuItem icon={CreditCard}>Billing</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={LogOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

export const WithShortcuts: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Edit</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={Copy} shortcut="⌘C">
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem icon={Edit} shortcut="⌘E">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem icon={Download} shortcut="⌘D">
            Download
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={Archive} shortcut="⌘A">
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem icon={Trash2} shortcut="⌘⌫" destructive>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

export const WithLabels: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
          <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Team</DropdownMenuLabel>
          <DropdownMenuItem icon={Plus}>Invite Member</DropdownMenuItem>
          <DropdownMenuItem icon={Share}>Share</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

export const WithCheckboxItems: StoryObj = {
  render: () => {
    const [showStatus, setShowStatus] = React.useState(true)
    const [showActivity, setShowActivity] = React.useState(false)
    const [showNotifications, setShowNotifications] = React.useState(true)

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">View Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Show</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
              Activity Panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showNotifications}
              onCheckedChange={setShowNotifications}
            >
              Notifications
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={Edit}>Edit</DropdownMenuItem>
          <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
          <DropdownMenuItem icon={Share} disabled>
            Share (No permission)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={Trash2} destructive disabled>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

export const MoreActions: StoryObj = {
  name: 'More Actions Button',
  render: () => (
    <div
      style={{
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        border: '1px solid #e4e4e7',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 350,
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600 }}>Project Alpha</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>Last updated 2 hours ago</p>
      </div>

      <div style={{ position: 'relative' }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" iconOnly size="sm">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem icon={Edit}>Rename</DropdownMenuItem>
            <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem icon={Share}>Share</DropdownMenuItem>
            <DropdownMenuItem icon={Download}>Export</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={Archive}>Archive</DropdownMenuItem>
            <DropdownMenuItem icon={Trash2} destructive>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}

export const UserMenu: StoryObj = {
  name: 'User Menu',
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              backgroundColor: '#fff',
              border: '1px solid #e4e4e7',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1d4ed8',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              JD
            </div>
            <span style={{ fontSize: 14, fontWeight: 500 }}>John Doe</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" style={{ width: 200 }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #e4e4e7' }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>John Doe</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#71717a' }}>john@example.com</p>
          </div>
          <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
          <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
          <DropdownMenuItem icon={CreditCard}>Billing</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={LogOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
