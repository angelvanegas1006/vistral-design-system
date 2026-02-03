import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from '../src/components/ui/list-item';
import { Avatar } from '../src/components/ui/avatar';
import { Badge } from '../src/components/ui/badge';
import { Switch } from '../src/components/ui/switch';
import { 
  User, Settings, Bell, Lock, CreditCard, HelpCircle, LogOut,
  Mail, Phone, MapPin, Star, Wifi, Bluetooth, Moon
} from 'lucide-react';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# List Item

Versatile list item for menus, settings, etc.

## Features
- **Leading**: Icon or Avatar
- **Content**: Title and description
- **Trailing**: Custom content or chevron
- **Interactive**: Clickable with hover states
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <ListItem title="Item 1" />
        <ListItem title="Item 2" />
        <ListItem title="Item 3" />
      </List>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <ListItem 
          title="John Doe" 
          description="john@example.com"
          leading={<Avatar name="John Doe" size="md" />}
          showChevron
          clickable
        />
        <ListItem 
          title="Jane Smith" 
          description="jane@example.com"
          leading={<Avatar name="Jane Smith" size="md" />}
          showChevron
          clickable
        />
        <ListItem 
          title="Mike Johnson" 
          description="mike@example.com"
          leading={<Avatar name="Mike Johnson" size="md" />}
          showChevron
          clickable
        />
      </List>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List divided>
        <ListItem leadingIcon={User} title="Profile" showChevron clickable />
        <ListItem leadingIcon={Settings} title="Settings" showChevron clickable />
        <ListItem leadingIcon={Bell} title="Notifications" showChevron clickable />
        <ListItem leadingIcon={Lock} title="Privacy" showChevron clickable />
        <ListItem leadingIcon={HelpCircle} title="Help" showChevron clickable />
      </List>
    </div>
  ),
};

export const WithTrailing: Story = {
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List divided>
        <ListItem 
          leadingIcon={Bell} 
          title="Notifications" 
          trailing={<Badge variant="primary">3</Badge>}
          clickable
        />
        <ListItem 
          leadingIcon={Mail} 
          title="Messages" 
          trailing={<Badge variant="error">12</Badge>}
          clickable
        />
        <ListItem 
          leadingIcon={Star} 
          title="Premium" 
          trailing={<Badge variant="warning">PRO</Badge>}
          clickable
        />
      </List>
    </div>
  ),
};

export const SettingsMenu: Story = {
  name: 'Settings Menu',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <ListItem 
          leadingIcon={Wifi} 
          title="Wi-Fi" 
          description="Connected"
          trailing={<Switch defaultChecked />}
        />
        <ListItem 
          leadingIcon={Bluetooth} 
          title="Bluetooth" 
          description="Off"
          trailing={<Switch />}
        />
        <ListItem 
          leadingIcon={Moon} 
          title="Dark Mode" 
          trailing={<Switch />}
        />
        <ListItem 
          leadingIcon={Bell} 
          title="Notifications" 
          trailing={<Switch defaultChecked />}
        />
      </List>
    </div>
  ),
};

export const ContactList: Story = {
  name: 'Contact List',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List divided>
        {[
          { name: 'Alice Chen', email: 'alice@company.com', status: 'online' },
          { name: 'Bob Smith', email: 'bob@company.com', status: 'away' },
          { name: 'Carol White', email: 'carol@company.com', status: 'offline' },
          { name: 'David Lee', email: 'david@company.com', status: 'online' },
        ].map((contact) => (
          <ListItem
            key={contact.email}
            title={contact.name}
            description={contact.email}
            leading={
              <Avatar 
                name={contact.name} 
                size="md" 
                showStatus 
                status={contact.status as any}
              />
            }
            showChevron
            clickable
          />
        ))}
      </List>
    </div>
  ),
};

export const AccountMenu: Story = {
  name: 'Account Menu',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7', overflow: 'hidden' }}>
      {/* Profile header */}
      <div style={{ padding: 16, backgroundColor: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
        <ListItem
          title="John Doe"
          description="john@example.com"
          leading={<Avatar name="John Doe" size="lg" />}
          trailing={<Badge variant="brand">Premium</Badge>}
        />
      </div>
      
      {/* Menu items */}
      <List>
        <ListItem leadingIcon={User} title="Edit Profile" showChevron clickable />
        <ListItem leadingIcon={CreditCard} title="Billing" showChevron clickable />
        <ListItem leadingIcon={Bell} title="Notifications" showChevron clickable />
        <ListItem leadingIcon={Lock} title="Security" showChevron clickable />
      </List>
      
      <div style={{ borderTop: '1px solid #e4e4e7' }}>
        <List>
          <ListItem 
            leadingIcon={LogOut} 
            title="Sign Out" 
            clickable 
            style={{ color: '#dc2626' }}
          />
        </List>
      </div>
    </div>
  ),
};
