import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideNav, SideNavItem, SideNavGroup, SideNavDivider } from '../src/components/ui/side-nav';
import { 
  Home, Users, Settings, FileText, BarChart, Mail, 
  Calendar, FolderOpen, HelpCircle, LogOut, User 
} from 'lucide-react';

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Side Navigation

Vertical navigation sidebar.

## Features
- **Items**: Icon + label
- **Groups**: Collapsible sections
- **Badges**: Notification counts
- **Collapsed**: Icon-only mode
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
  render: () => (
    <div style={{ height: 500 }}>
      <SideNav defaultActiveItem="dashboard">
        <SideNavItem value="dashboard" icon={Home} label="Dashboard" />
        <SideNavItem value="users" icon={Users} label="Users" badge={5} />
        <SideNavItem value="documents" icon={FileText} label="Documents" />
        <SideNavItem value="analytics" icon={BarChart} label="Analytics" />
        <SideNavDivider />
        <SideNavItem value="settings" icon={Settings} label="Settings" />
        <SideNavItem value="profile" icon={User} label="Profile" />
      </SideNav>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div style={{ height: 600 }}>
      <SideNav defaultActiveItem="dashboard">
        <SideNavGroup label="Main">
          <SideNavItem value="dashboard" icon={Home} label="Dashboard" />
          <SideNavItem value="inbox" icon={Mail} label="Inbox" badge={12} />
          <SideNavItem value="calendar" icon={Calendar} label="Calendar" />
        </SideNavGroup>
        
        <SideNavGroup label="Content">
          <SideNavItem value="documents" icon={FileText} label="Documents" />
          <SideNavItem value="files" icon={FolderOpen} label="Files" />
          <SideNavItem value="analytics" icon={BarChart} label="Analytics" />
        </SideNavGroup>
        
        <SideNavGroup label="Support">
          <SideNavItem value="help" icon={HelpCircle} label="Help Center" />
          <SideNavItem value="settings" icon={Settings} label="Settings" />
        </SideNavGroup>
      </SideNav>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(true);
    
    return (
      <div style={{ display: 'flex', height: 500 }}>
        <SideNav collapsed={collapsed} defaultActiveItem="dashboard">
          <SideNavItem value="dashboard" icon={Home} label="Dashboard" />
          <SideNavItem value="users" icon={Users} label="Users" />
          <SideNavItem value="documents" icon={FileText} label="Documents" />
          <SideNavItem value="analytics" icon={BarChart} label="Analytics" />
          <SideNavDivider />
          <SideNavItem value="settings" icon={Settings} label="Settings" />
          <SideNavItem value="profile" icon={User} label="Profile" />
        </SideNav>
        
        <div style={{ padding: 16 }}>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e4e4e7' }}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </div>
    );
  },
};

export const AppLayout: Story = {
  name: 'App Layout',
  render: () => (
    <div style={{ display: 'flex', height: 600, backgroundColor: '#fafafa' }}>
      <SideNav defaultActiveItem="dashboard">
        {/* Logo */}
        <div style={{ 
          padding: '16px 12px', 
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
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
          }}>
            V
          </div>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Vistral</span>
        </div>
        
        <SideNavItem value="dashboard" icon={Home} label="Dashboard" />
        <SideNavItem value="inbox" icon={Mail} label="Inbox" badge={3} />
        <SideNavItem value="calendar" icon={Calendar} label="Calendar" />
        <SideNavItem value="documents" icon={FileText} label="Documents" />
        <SideNavItem value="analytics" icon={BarChart} label="Analytics" />
        
        <div style={{ flex: 1 }} />
        
        <SideNavDivider />
        <SideNavItem value="settings" icon={Settings} label="Settings" />
        <SideNavItem value="profile" icon={User} label="Profile" />
      </SideNav>
      
      <div style={{ flex: 1, padding: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Dashboard</h1>
        <p style={{ color: '#71717a', marginTop: 8 }}>Welcome back!</p>
      </div>
    </div>
  ),
};
