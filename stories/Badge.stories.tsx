import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, DotBadge, BadgeContainer } from '../src/components/ui/badge';
import { Avatar } from '../src/components/ui/avatar';
import { Bell, Mail, ShoppingCart } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge

Based on Figma Design System: [Badge Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=156-7646)

## Features
- **6 Variants**: Default, Primary, Brand, Error, Warning, Success
- **2 Sizes**: Small (18px), Medium (22px)
- **Dot Badge**: Notification indicator with optional count
- **Badge Container**: For positioning badges on other elements
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Label Badges
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Small Size
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge variant="default" size="sm">Default</Badge>
          <Badge variant="primary" size="sm">Primary</Badge>
          <Badge variant="brand" size="sm">Brand</Badge>
          <Badge variant="success" size="sm">Success</Badge>
          <Badge variant="warning" size="sm">Warning</Badge>
          <Badge variant="error" size="sm">Error</Badge>
        </div>
      </div>
    </div>
  ),
};

export const DotBadges: Story = {
  name: 'Dot Badges (Notification)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Simple Dots
        </h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <DotBadge variant="default" standalone />
          <DotBadge variant="primary" standalone />
          <DotBadge variant="brand" standalone />
          <DotBadge variant="success" standalone />
          <DotBadge variant="warning" standalone />
          <DotBadge variant="error" standalone />
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Count
        </h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <DotBadge count={3} standalone />
          <DotBadge count={12} standalone />
          <DotBadge count={99} standalone />
          <DotBadge count={150} maxCount={99} standalone />
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          On Icons
        </h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <BadgeContainer>
            <Bell size={24} color="#71717a" />
            <DotBadge />
          </BadgeContainer>
          
          <BadgeContainer>
            <Mail size={24} color="#71717a" />
            <DotBadge count={5} />
          </BadgeContainer>
          
          <BadgeContainer>
            <ShoppingCart size={24} color="#71717a" />
            <DotBadge count={3} variant="brand" />
          </BadgeContainer>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          On Avatars
        </h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <BadgeContainer>
            <Avatar name="John Doe" size="md" />
            <DotBadge variant="success" />
          </BadgeContainer>
          
          <BadgeContainer>
            <Avatar name="Jane Smith" size="lg" />
            <DotBadge count={3} />
          </BadgeContainer>
        </div>
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  name: 'Use Cases',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Feature Request</span>
          <Badge variant="brand">New</Badge>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>
          Add dark mode support to the dashboard
        </p>
      </div>
      
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Build #1234</span>
          <Badge variant="success">Passed</Badge>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>
          All 42 tests passed successfully
        </p>
      </div>
      
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>API Response</span>
          <Badge variant="error">500 Error</Badge>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>
          Internal server error occurred
        </p>
      </div>
    </div>
  ),
};
