import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '../src/components/ui/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Avatar

Based on Figma Design System: [Avatar Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=137-8968)

## Features
- **6 Sizes**: XS (24px) to 2XL (96px)
- **Image Support**: With fallback to initials
- **Auto Initials**: Generated from name
- **Status Indicator**: Online, Offline, Busy, Away
- **Avatar Group**: Stack multiple avatars
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="John Doe" size="xs" />
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
      <Avatar name="John Doe" size="xl" />
      <Avatar name="John Doe" size="2xl" />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar 
        src="https://i.pravatar.cc/150?img=1" 
        name="John Doe" 
        size="md" 
      />
      <Avatar 
        src="https://i.pravatar.cc/150?img=5" 
        name="Jane Smith" 
        size="md" 
      />
      <Avatar 
        src="https://i.pravatar.cc/150?img=8" 
        name="Mike Johnson" 
        size="md" 
      />
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="John Doe" size="lg" />
      <Avatar name="Jane" size="lg" />
      <Avatar name="Mike Johnson" size="lg" />
      <Avatar name="Sarah O'Connor" size="lg" />
      <Avatar name="李明" size="lg" />
    </div>
  ),
};

export const ColorVariations: Story = {
  name: 'Color Variations',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'].map(name => (
        <Avatar key={name} name={name} size="lg" />
      ))}
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John Doe" size="lg" showStatus status="online" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>Online</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Jane Smith" size="lg" showStatus status="away" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>Away</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Mike Johnson" size="lg" showStatus status="busy" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>Busy</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Sarah Lee" size="lg" showStatus status="offline" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>Offline</p>
      </div>
    </div>
  ),
};

export const Fallbacks: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://invalid-url.com/image.jpg" name="Broken Image" size="lg" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>Broken URL</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size="lg" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>No name</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar initials="AB" size="lg" />
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>Custom initials</p>
      </div>
    </div>
  ),
};

export const Group: Story = {
  name: 'Avatar Group',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Small Group
        </h3>
        <AvatarGroup size="md">
          <Avatar name="John Doe" />
          <Avatar name="Jane Smith" />
          <Avatar name="Mike Johnson" />
        </AvatarGroup>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Max (showing +3)
        </h3>
        <AvatarGroup size="md" max={4}>
          <Avatar name="Alice" />
          <Avatar name="Bob" />
          <Avatar name="Charlie" />
          <Avatar name="Diana" />
          <Avatar name="Eve" />
          <Avatar name="Frank" />
          <Avatar name="Grace" />
        </AvatarGroup>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Large Size
        </h3>
        <AvatarGroup size="lg" max={5}>
          <Avatar src="https://i.pravatar.cc/150?img=1" name="User 1" />
          <Avatar src="https://i.pravatar.cc/150?img=2" name="User 2" />
          <Avatar src="https://i.pravatar.cc/150?img=3" name="User 3" />
          <Avatar src="https://i.pravatar.cc/150?img=4" name="User 4" />
          <Avatar src="https://i.pravatar.cc/150?img=5" name="User 5" />
          <Avatar src="https://i.pravatar.cc/150?img=6" name="User 6" />
        </AvatarGroup>
      </div>
    </div>
  ),
};

export const TeamCard: Story = {
  name: 'Team Card Example',
  render: () => (
    <div style={{ 
      padding: 20, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
      width: 320,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Design Team</h3>
        <span style={{ 
          padding: '4px 8px', 
          backgroundColor: '#dcfce7', 
          color: '#15803d',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 500,
        }}>
          Active
        </span>
      </div>
      
      <AvatarGroup size="sm" max={5}>
        <Avatar name="Sarah Chen" showStatus status="online" />
        <Avatar name="Mike Peters" showStatus status="online" />
        <Avatar name="Lisa Wong" showStatus status="away" />
        <Avatar name="Tom Harris" showStatus status="offline" />
        <Avatar name="Emma Davis" showStatus status="online" />
        <Avatar name="James Wilson" />
      </AvatarGroup>
      
      <p style={{ margin: '12px 0 0', fontSize: 13, color: '#71717a' }}>
        3 members online
      </p>
    </div>
  ),
};
