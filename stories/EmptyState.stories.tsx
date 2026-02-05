import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from '../src/components/ui/empty-state'
import { ShoppingCart, Users, FileText, CloudOff } from 'lucide-react'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Empty State

Display when there's no content to show.

## Features
- **Preset Icons**: Search, Inbox, Folder, File, Error, Offline
- **Custom Icons**: Use any Lucide icon
- **Actions**: Primary and secondary buttons
- **Sizes**: Small, Medium, Large
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: 'inbox',
    title: 'No messages',
    description: 'You have no messages in your inbox.',
  },
}

export const WithActions: Story = {
  render: () => (
    <EmptyState
      icon="search"
      title="No results found"
      description="We couldn't find any results matching your search."
      primaryAction={{
        label: 'Clear filters',
        onClick: () => alert('Clearing filters...'),
      }}
      secondaryAction={{
        label: 'Try again',
        onClick: () => alert('Trying again...'),
      }}
    />
  ),
}

export const PresetIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
      <EmptyState icon="search" title="No search results" size="sm" />
      <EmptyState icon="inbox" title="Empty inbox" size="sm" />
      <EmptyState icon="folder" title="No files" size="sm" />
      <EmptyState icon="file" title="No documents" size="sm" />
      <EmptyState icon="error" title="Something went wrong" size="sm" />
      <EmptyState icon="offline" title="You're offline" size="sm" />
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        description="Add some items to get started."
        primaryAction={{ label: 'Browse products', onClick: () => {} }}
      />
      <EmptyState
        icon={Users}
        title="No team members"
        description="Invite your team to collaborate."
        primaryAction={{ label: 'Invite members', onClick: () => {} }}
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <EmptyState
        icon="inbox"
        title="Small empty state"
        description="This is a small empty state."
        size="sm"
      />
      <EmptyState
        icon="inbox"
        title="Medium empty state"
        description="This is a medium empty state."
        size="md"
      />
      <EmptyState
        icon="inbox"
        title="Large empty state"
        description="This is a large empty state."
        size="lg"
      />
    </div>
  ),
}

export const ErrorState: Story = {
  name: 'Error State',
  render: () => (
    <EmptyState
      icon="error"
      title="Failed to load data"
      description="There was a problem loading the data. Please try again."
      primaryAction={{
        label: 'Try again',
        onClick: () => window.location.reload(),
      }}
      secondaryAction={{
        label: 'Contact support',
        onClick: () => {},
      }}
    />
  ),
}

export const OfflineState: Story = {
  name: 'Offline State',
  render: () => (
    <EmptyState
      icon={CloudOff}
      title="You're offline"
      description="Please check your internet connection and try again."
      primaryAction={{
        label: 'Retry',
        onClick: () => window.location.reload(),
      }}
    />
  ),
}

export const InCard: Story = {
  name: 'In Card',
  render: () => (
    <div
      style={{
        width: 500,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Recent Documents</h3>
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: '#2050f6',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
      </div>

      <EmptyState
        icon={FileText}
        title="No documents yet"
        description="Upload your first document to get started."
        size="sm"
      />
    </div>
  ),
}
