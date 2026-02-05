import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbHome,
} from '../src/components/ui/breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Breadcrumb

Navigation breadcrumb trail.

## Features
- **Links**: Clickable navigation
- **Current Page**: Non-clickable indicator
- **Custom Separators**: Customize separator
- **Home Icon**: Quick home link
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink current>Category</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const WithHomeIcon: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbHome href="/" iconOnly />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink current>Profile</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink current>Getting Started</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const LongPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbHome href="/" />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/electronics/phones">Phones</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products/electronics/phones/smartphones">Smartphones</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink current>iPhone 15 Pro</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const InPageHeader: Story = {
  name: 'In Page Header',
  render: () => (
    <div
      style={{
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
        width: 500,
      }}
    >
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbHome href="/" iconOnly />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink current>Vistral Design System</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <h1 style={{ margin: '16px 0 8px', fontSize: 24, fontWeight: 600 }}>Vistral Design System</h1>
      <p style={{ margin: 0, color: '#71717a', fontSize: 14 }}>
        A comprehensive design system for building consistent user interfaces.
      </p>
    </div>
  ),
}
