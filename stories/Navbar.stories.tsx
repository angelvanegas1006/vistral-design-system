import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Navbar, NavbarBrand, NavbarTitle, NavbarActions, NavbarButton, NavbarBack 
} from '../src/components/ui/navbar';
import { Menu, Bell, Search, User, Settings, MoreVertical } from 'lucide-react';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Navbar

Top navigation bar component.

## Features
- **Brand/Logo**: Left-aligned brand area
- **Centered Title**: For mobile-style headers
- **Action Buttons**: Icon buttons with badge support
- **Back Button**: Navigation back with label
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Navbar>
      <NavbarBrand name="Vistral" />
      <NavbarActions>
        <NavbarButton icon={Search} aria-label="Search" />
        <NavbarButton icon={Bell} badge aria-label="Notifications" />
        <NavbarButton icon={User} aria-label="Profile" />
      </NavbarActions>
    </Navbar>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <Navbar>
      <NavbarBrand 
        logo={<div style={{ width: 32, height: 32, backgroundColor: '#2050f6', borderRadius: 8 }} />}
        name="PropHero"
        href="/"
      />
      <NavbarActions>
        <NavbarButton icon={Bell} aria-label="Notifications" />
        <NavbarButton icon={Settings} aria-label="Settings" />
      </NavbarActions>
    </Navbar>
  ),
};

export const MobileHeader: Story = {
  name: 'Mobile Header',
  render: () => (
    <div style={{ position: 'relative' }}>
      <Navbar>
        <NavbarBack label="Back" onClick={() => alert('Going back...')} />
        <NavbarTitle>Page Title</NavbarTitle>
        <NavbarActions>
          <NavbarButton icon={MoreVertical} aria-label="More" />
        </NavbarActions>
      </Navbar>
    </div>
  ),
};

export const WithMenu: Story = {
  render: () => (
    <Navbar>
      <NavbarActions align="left">
        <NavbarButton icon={Menu} aria-label="Menu" />
      </NavbarActions>
      <NavbarBrand name="Dashboard" />
      <NavbarActions>
        <NavbarButton icon={Search} aria-label="Search" />
        <NavbarButton icon={Bell} badge aria-label="Notifications" />
      </NavbarActions>
    </Navbar>
  ),
};

export const Transparent: Story = {
  render: () => (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      padding: '0 0 100px 0' 
    }}>
      <Navbar transparent bordered={false}>
        <NavbarBrand name="Vistral" />
        <NavbarActions>
          <NavbarButton icon={Search} aria-label="Search" style={{ color: 'white' }} />
          <NavbarButton icon={Bell} aria-label="Notifications" style={{ color: 'white' }} />
        </NavbarActions>
      </Navbar>
    </div>
  ),
};

export const AppExample: Story = {
  name: 'App Example',
  render: () => (
    <div style={{ minHeight: 300, backgroundColor: '#fafafa' }}>
      <Navbar>
        <NavbarBrand 
          logo={
            <div style={{ 
              width: 32, 
              height: 32, 
              backgroundColor: '#2050f6', 
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
            }}>
              P
            </div>
          }
          name="PropHero"
        />
        <NavbarActions>
          <NavbarButton icon={Search} aria-label="Search" />
          <NavbarButton icon={Bell} badge aria-label="Notifications" />
          <div style={{ 
            width: 32, 
            height: 32, 
            borderRadius: '50%', 
            backgroundColor: '#e4e4e7',
            marginLeft: 8,
          }} />
        </NavbarActions>
      </Navbar>
      
      <div style={{ padding: 24 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 600 }}>Welcome back!</h1>
        <p style={{ margin: 0, color: '#71717a' }}>Here's what's happening today.</p>
      </div>
    </div>
  ),
};
