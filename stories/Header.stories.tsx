import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, SectionHeader, CardHeaderTitle } from '../src/components/ui/header';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbHome } from '../src/components/ui/breadcrumb';
import { Button } from '../src/components/ui/button';
import { Avatar } from '../src/components/ui/avatar';
import { Badge } from '../src/components/ui/badge';
import { Plus, Download, Settings } from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/Header',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Header Components

Page and section header components.

## Features
- **PageHeader**: Main page title with actions
- **SectionHeader**: Section divider with title
- **CardHeaderTitle**: Card header with avatar
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Page: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your activity."
      />
    </div>
  ),
};

export const PageWithActions: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <PageHeader
        title="Products"
        description="Manage your product catalog."
        actions={
          <>
            <Button variant="secondary" leftIcon={Download}>Export</Button>
            <Button leftIcon={Plus}>Add Product</Button>
          </>
        }
      />
    </div>
  ),
};

export const PageWithBreadcrumb: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <PageHeader
        title="Product Details"
        description="View and edit product information."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbItem><BreadcrumbHome href="/" iconOnly /></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbLink href="/products">Products</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbLink current>iPhone 15 Pro</BreadcrumbLink></BreadcrumbItem>
          </Breadcrumb>
        }
        actions={<Button variant="secondary" leftIcon={Settings}>Edit</Button>}
      />
    </div>
  ),
};

export const Section: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <SectionHeader
        title="Team Members"
        description="Manage your team and their permissions."
      />
    </div>
  ),
};

export const SectionWithActions: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <SectionHeader
        title="Recent Activity"
        description="Your latest actions and updates."
        actions={<Button variant="ghost" size="sm">View All</Button>}
        bordered
      />
    </div>
  ),
};

export const CardHeader: Story = {
  name: 'Card Header',
  render: () => (
    <div style={{ 
      width: 350, 
      padding: 16, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <CardHeaderTitle
        title="John Doe"
        subtitle="john@example.com"
        leading={<Avatar name="John Doe" />}
        trailing={<Badge variant="success">Active</Badge>}
      />
    </div>
  ),
};

export const FullPageExample: Story = {
  name: 'Full Page Example',
  render: () => (
    <div style={{ width: 800, backgroundColor: '#fafafa', padding: 24, borderRadius: 12 }}>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbItem><BreadcrumbHome href="/" iconOnly /></BreadcrumbItem>
            <BreadcrumbItem><BreadcrumbLink current>Settings</BreadcrumbLink></BreadcrumbItem>
          </Breadcrumb>
        }
      />
      
      <div style={{ marginTop: 24 }}>
        <SectionHeader title="Profile" bordered />
        <div style={{ 
          padding: 16, 
          backgroundColor: '#fff', 
          borderRadius: 8,
          border: '1px solid #e4e4e7',
        }}>
          <p style={{ margin: 0, color: '#71717a' }}>Profile settings content here...</p>
        </div>
      </div>
      
      <div style={{ marginTop: 24 }}>
        <SectionHeader 
          title="Notifications" 
          actions={<Button variant="ghost" size="sm">Reset</Button>}
          bordered 
        />
        <div style={{ 
          padding: 16, 
          backgroundColor: '#fff', 
          borderRadius: 8,
          border: '1px solid #e4e4e7',
        }}>
          <p style={{ margin: 0, color: '#71717a' }}>Notification settings content here...</p>
        </div>
      </div>
    </div>
  ),
};
