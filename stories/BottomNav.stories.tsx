import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNav, BottomNavItem } from '../src/components/ui/bottom-nav';
import { Home, Search, Heart, User, ShoppingBag, Bell, MessageCircle, Settings } from 'lucide-react';

const meta: Meta<typeof BottomNav> = {
  title: 'Components/BottomNav',
  component: BottomNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Bottom Navigation

Mobile bottom tab navigation.

## Features
- **Tab Items**: Icon + label
- **Active State**: Visual indicator
- **Badge**: Notification count
- **Fixed Position**: Stays at bottom
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  render: () => (
    <div style={{ height: 200, position: 'relative' }}>
      <BottomNav defaultValue="home" fixed={false}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="search" icon={Search} label="Search" />
        <BottomNavItem value="favorites" icon={Heart} label="Favorites" />
        <BottomNavItem value="profile" icon={User} label="Profile" />
      </BottomNav>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ height: 200, position: 'relative' }}>
      <BottomNav defaultValue="home" fixed={false}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="messages" icon={MessageCircle} label="Messages" badge={5} />
        <BottomNavItem value="notifications" icon={Bell} label="Alerts" badge={12} />
        <BottomNavItem value="profile" icon={User} label="Profile" />
      </BottomNav>
    </div>
  ),
};

export const ECommerce: Story = {
  name: 'E-commerce',
  render: () => (
    <div style={{ height: 200, position: 'relative' }}>
      <BottomNav defaultValue="home" fixed={false}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="search" icon={Search} label="Search" />
        <BottomNavItem value="cart" icon={ShoppingBag} label="Cart" badge={3} />
        <BottomNavItem value="wishlist" icon={Heart} label="Wishlist" />
        <BottomNavItem value="account" icon={User} label="Account" />
      </BottomNav>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('home');
    
    return (
      <div style={{ height: 250, position: 'relative' }}>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <p style={{ margin: '0 0 16px', color: '#71717a' }}>Active: {value}</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button 
              onClick={() => setValue('search')}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e4e4e7' }}
            >
              Go to Search
            </button>
          </div>
        </div>
        
        <BottomNav value={value} onValueChange={setValue} fixed={false}>
          <BottomNavItem value="home" icon={Home} label="Home" />
          <BottomNavItem value="search" icon={Search} label="Search" />
          <BottomNavItem value="favorites" icon={Heart} label="Favorites" />
          <BottomNavItem value="settings" icon={Settings} label="Settings" />
        </BottomNav>
      </div>
    );
  },
};

export const MobileApp: Story = {
  name: 'Mobile App Preview',
  render: () => {
    const [tab, setTab] = React.useState('home');
    
    return (
      <div style={{ 
        width: 375, 
        height: 667, 
        border: '1px solid #e4e4e7', 
        borderRadius: 32,
        overflow: 'hidden',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: '#fafafa',
      }}>
        {/* Status bar */}
        <div style={{ height: 44, backgroundColor: '#fff', borderBottom: '1px solid #e4e4e7' }} />
        
        {/* Content */}
        <div style={{ padding: 16, paddingBottom: 80 }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 600 }}>
            {tab === 'home' && 'Home'}
            {tab === 'search' && 'Search'}
            {tab === 'favorites' && 'Favorites'}
            {tab === 'profile' && 'Profile'}
          </h1>
          <p style={{ margin: 0, color: '#71717a' }}>
            Content for {tab} tab goes here.
          </p>
        </div>
        
        {/* Bottom nav */}
        <BottomNav value={tab} onValueChange={setTab}>
          <BottomNavItem value="home" icon={Home} label="Home" />
          <BottomNavItem value="search" icon={Search} label="Search" />
          <BottomNavItem value="favorites" icon={Heart} label="Favorites" badge={2} />
          <BottomNavItem value="profile" icon={User} label="Profile" />
        </BottomNav>
      </div>
    );
  },
};
