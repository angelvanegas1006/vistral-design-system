import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  SideNav,
  SideNavHeader,
  SideNavContent,
  SideNavGroup,
  SideNavItem,
  SideNavFooter,
  SideNavUser,
  SideNavDivider,
} from '../src/components/ui/side-nav'
import { Home, Users, Settings, FileText, BarChart3, Mail, HelpCircle } from 'lucide-react'

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# SideNav / Sidebar

Navigation sidebar component matching Figma design.

Based on Figma: [SideNav](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=297-57580)

## Features
- **Expanded/Collapsed** states
- **Groups** with labels
- **Menu items** with icons and chevrons
- **User profile** section
- **Active state** with blue highlight
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SideNav>

// Logo component
const Logo = () => (
  <div
    style={{
      width: 36,
      height: 36,
      backgroundColor: '#2050f6',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 700,
      fontSize: 14,
    }}
  >
    OP
  </div>
)

export const Default: Story = {
  render: () => (
    <div style={{ height: 600, display: 'flex' }}>
      <SideNav defaultActiveItem="dashboard">
        <SideNavHeader logo={<Logo />} title="Menu Item" subtitle="Enterprise" />

        <SideNavContent>
          <SideNavGroup label="Group title">
            <SideNavItem value="item1" label="Menu Item" hasSubmenu />
            <SideNavItem value="item2" label="Menu Item" hasSubmenu />
            <SideNavItem value="item3" label="Menu Item" hasSubmenu />
            <SideNavItem value="item4" label="Menu Item" hasSubmenu />
          </SideNavGroup>

          <SideNavGroup label="Group title">
            <SideNavItem value="item5" label="Menu Item" hasSubmenu />
            <SideNavItem value="item6" label="Menu Item" hasSubmenu />
            <SideNavItem value="item7" label="Menu Item" hasSubmenu />
            <SideNavItem value="item8" label="Menu Item" hasSubmenu />
            <SideNavItem value="item9" label="Menu Item" hasSubmenu />
            <SideNavItem value="item10" label="Menu Item" hasSubmenu />
          </SideNavGroup>

          <SideNavGroup label="Group title">
            <SideNavItem value="item11" label="Menu Item" hasSubmenu />
            <SideNavItem value="item12" label="Menu Item" hasSubmenu />
            <SideNavItem value="item13" label="Menu Item" hasSubmenu />
            <SideNavItem value="item14" label="Menu Item" hasSubmenu />
            <SideNavItem value="item15" label="Menu Item" hasSubmenu />
            <SideNavItem value="item16" label="Menu Item" hasSubmenu />
          </SideNavGroup>
        </SideNavContent>

        <SideNavFooter>
          <SideNavUser name="Menu Item" email="Enterprise" showExpand />
        </SideNavFooter>
      </SideNav>

      <div style={{ flex: 1, padding: 24, backgroundColor: '#f8fafc' }}>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ height: 600, display: 'flex' }}>
      <SideNav defaultActiveItem="dashboard">
        <SideNavHeader logo={<Logo />} title="PropHero" subtitle="Dashboard" />

        <SideNavContent>
          <SideNavGroup label="Main">
            <SideNavItem value="dashboard" icon={Home} label="Dashboard" />
            <SideNavItem value="properties" icon={FileText} label="Properties" />
            <SideNavItem value="analytics" icon={BarChart3} label="Analytics" />
            <SideNavItem value="users" icon={Users} label="Users" badge={5} />
          </SideNavGroup>

          <SideNavGroup label="Settings">
            <SideNavItem value="settings" icon={Settings} label="Settings" />
            <SideNavItem value="messages" icon={Mail} label="Messages" badge={12} />
            <SideNavItem value="help" icon={HelpCircle} label="Help & Support" />
          </SideNavGroup>
        </SideNavContent>

        <SideNavFooter>
          <SideNavUser name="John Doe" email="john@prophero.com" showExpand />
        </SideNavFooter>
      </SideNav>

      <div style={{ flex: 1, padding: 24, backgroundColor: '#f8fafc' }}>
        <h2>Dashboard</h2>
        <p>Welcome to PropHero dashboard.</p>
      </div>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
      <div style={{ height: 600, display: 'flex' }}>
        <SideNav collapsed={collapsed} defaultActiveItem="dashboard">
          <SideNavHeader
            logo={<Logo />}
            title="PropHero"
            subtitle="Dashboard"
            onCollapse={() => setCollapsed(!collapsed)}
          />

          <SideNavContent>
            <SideNavGroup label="Main">
              <SideNavItem value="dashboard" label="Dashboard" />
              <SideNavItem value="properties" label="Properties" />
              <SideNavItem value="analytics" label="Analytics" />
              <SideNavItem value="users" label="Users" />
            </SideNavGroup>

            <SideNavGroup label="Settings">
              <SideNavItem value="settings" label="Settings" />
              <SideNavItem value="messages" label="Messages" />
            </SideNavGroup>
          </SideNavContent>

          <SideNavFooter>
            <SideNavUser name="OP" email="Enterprise" />
          </SideNavFooter>
        </SideNav>

        <div style={{ flex: 1, padding: 24, backgroundColor: '#f8fafc' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              padding: '8px 16px',
              border: '1px solid #d4d4d8',
              borderRadius: 8,
              backgroundColor: 'white',
              cursor: 'pointer',
              marginBottom: 16,
            }}
          >
            {collapsed ? 'Expand' : 'Collapse'} Sidebar
          </button>
          <h2>Main Content</h2>
          <p>Click the button to toggle sidebar.</p>
        </div>
      </div>
    )
  },
}

export const ActiveStates: Story = {
  name: 'Active States',
  render: () => (
    <div style={{ height: 500, display: 'flex' }}>
      <SideNav defaultActiveItem="item2">
        <SideNavHeader logo={<Logo />} title="Menu Item" subtitle="Enterprise" />

        <SideNavContent>
          <SideNavGroup label="Group title">
            <SideNavItem value="item1" label="Menu Item" hasSubmenu />
            <SideNavItem value="item2" label="Menu Item" hasSubmenu />
            <SideNavItem value="item3" label="Menu Item" hasSubmenu />
            <SideNavItem value="item4" label="Menu Item" hasSubmenu />
          </SideNavGroup>
        </SideNavContent>

        <SideNavFooter>
          <SideNavUser name="Menu Item" email="Enterprise" showExpand />
        </SideNavFooter>
      </SideNav>
    </div>
  ),
}

export const ExpandedVsCollapsed: Story = {
  name: 'Expanded vs Collapsed',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Expanded */}
      <div style={{ height: 500 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Expanded</p>
        <SideNav defaultActiveItem="item2">
          <SideNavHeader logo={<Logo />} title="Menu Item" subtitle="Enterprise" />

          <SideNavContent>
            <SideNavGroup label="Group title">
              <SideNavItem value="item1" label="Menu Item" hasSubmenu />
              <SideNavItem value="item2" label="Menu Item" hasSubmenu />
              <SideNavItem value="item3" label="Menu Item" hasSubmenu />
              <SideNavItem value="item4" label="Menu Item" hasSubmenu />
            </SideNavGroup>
          </SideNavContent>

          <SideNavFooter>
            <SideNavUser name="Menu Item" email="Enterprise" showExpand />
          </SideNavFooter>
        </SideNav>
      </div>

      {/* Collapsed */}
      <div style={{ height: 500 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Collapsed</p>
        <SideNav collapsed defaultActiveItem="item2">
          <SideNavHeader logo={<Logo />} />

          <SideNavContent>
            <SideNavGroup>
              <SideNavItem value="item1" label="Menu Item" />
              <SideNavItem value="item2" label="Menu Item" />
              <SideNavItem value="item3" label="Menu Item" />
              <SideNavItem value="item4" label="Menu Item" />
            </SideNavGroup>
          </SideNavContent>

          <SideNavFooter>
            <SideNavUser name="OP" />
          </SideNavFooter>
        </SideNav>
      </div>
    </div>
  ),
}

export const RealWorldExample: Story = {
  name: 'Real World Example',
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)
    const [activeItem, setActiveItem] = React.useState('properties')

    return (
      <div style={{ height: 700, display: 'flex' }}>
        <SideNav collapsed={collapsed} activeItem={activeItem} onActiveItemChange={setActiveItem}>
          <SideNavHeader
            logo={
              <div
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#2050f6',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>P</span>
              </div>
            }
            title="PropHero"
            subtitle="Enterprise"
            onCollapse={() => setCollapsed(!collapsed)}
          />

          <SideNavContent>
            <SideNavGroup label="Overview">
              <SideNavItem value="dashboard" icon={Home} label="Dashboard" />
              <SideNavItem value="analytics" icon={BarChart3} label="Analytics" />
            </SideNavGroup>

            <SideNavGroup label="Management">
              <SideNavItem value="properties" icon={FileText} label="Properties" badge={24} />
              <SideNavItem value="users" icon={Users} label="Users" />
              <SideNavItem value="messages" icon={Mail} label="Messages" badge={3} />
            </SideNavGroup>

            <SideNavGroup label="System">
              <SideNavItem value="settings" icon={Settings} label="Settings" />
              <SideNavItem value="help" icon={HelpCircle} label="Help & Support" />
            </SideNavGroup>
          </SideNavContent>

          <SideNavFooter>
            <SideNavUser
              name="John Smith"
              email="john.smith@prophero.com"
              showExpand
              onClick={() => console.log('User clicked')}
            />
          </SideNavFooter>
        </SideNav>

        <div style={{ flex: 1, padding: 32, backgroundColor: '#f8fafc' }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 600 }}>
            {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
          </h1>
          <p style={{ margin: 0, color: '#71717a' }}>You selected: {activeItem}</p>
        </div>
      </div>
    )
  },
}
