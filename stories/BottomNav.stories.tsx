import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNav, BottomNavItem, BottomNavSearch } from '../src/components/ui/bottom-nav';
import { Home, Search, Heart, User, MessageCircle, Settings } from 'lucide-react';

const meta: Meta<typeof BottomNav> = {
  title: 'Components/BottomNav',
  component: BottomNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Bottom Navigation

Mobile bottom navigation bar component matching Figma design.

Based on Figma: [Bottom Navigation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4381-7423)

## Features
- **2-5 items** with icon + label
- **Active state** with pill background (light gray)
- **Circle icons** (outline inactive, filled blue active)
- **Badge** support
- **Search** button variant
- **Icons only** mode (collapsed)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

// Container for demo
const DemoContainer = ({ children, height = 200 }: { children: React.ReactNode; height?: number }) => (
  <div style={{ 
    position: 'relative', 
    height, 
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <p style={{ color: '#71717a' }}>Content area</p>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Label" />
        <BottomNavItem value="search" icon={Search} label="Label" />
        <BottomNavItem value="favorites" icon={Heart} label="Label" />
        <BottomNavItem value="profile" icon={User} label="Label" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const TwoItems: Story = {
  name: '2 Items',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Label" />
        <BottomNavItem value="profile" icon={User} label="Label" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const ThreeItems: Story = {
  name: '3 Items',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Label" />
        <BottomNavItem value="search" icon={Search} label="Label" />
        <BottomNavItem value="profile" icon={User} label="Label" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const FourItems: Story = {
  name: '4 Items',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Label" />
        <BottomNavItem value="search" icon={Search} label="Label" />
        <BottomNavItem value="favorites" icon={Heart} label="Label" />
        <BottomNavItem value="profile" icon={User} label="Label" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const FiveItems: Story = {
  name: '5 Items',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Label" />
        <BottomNavItem value="search" icon={Search} label="Label" />
        <BottomNavItem value="favorites" icon={Heart} label="Label" />
        <BottomNavItem value="messages" icon={MessageCircle} label="Label" />
        <BottomNavItem value="profile" icon={User} label="Label" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const WithSearchButton: Story = {
  name: 'With Search Button',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Label" />
        <BottomNavItem value="favorites" icon={Heart} label="Label" />
        <BottomNavSearch onPress={() => console.log('Search pressed')} />
        <BottomNavItem value="messages" icon={MessageCircle} label="Label" />
        <BottomNavItem value="profile" icon={User} label="Label" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const WithBadges: Story = {
  name: 'With Badges',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="messages" icon={MessageCircle} label="Messages" badge={5} />
        <BottomNavItem value="favorites" icon={Heart} label="Favorites" badge={12} />
        <BottomNavItem value="profile" icon={User} label="Profile" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const IconsOnly: Story = {
  name: 'Icons Only',
  render: () => (
    <DemoContainer>
      <BottomNav defaultValue="home" fixed={false} showLabels={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="search" icon={Search} label="Search" />
        <BottomNavItem value="favorites" icon={Heart} label="Favorites" />
        <BottomNavItem value="profile" icon={User} label="Profile" />
      </BottomNav>
    </DemoContainer>
  ),
};

export const ItemStates: Story = {
  name: 'Item States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Default State */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Default (Inactive)</p>
        <BottomNav defaultValue="item2" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={User} label="Label" />
        </BottomNav>
      </div>

      {/* Active State */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Active (Selected)</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={User} label="Label" />
        </BottomNav>
      </div>

      {/* With Badge */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>With Badge</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" badge={23} />
          <BottomNavItem value="item2" icon={User} label="Label" />
        </BottomNav>
      </div>
    </div>
  ),
};

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* 2 Items */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>2 Items</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={User} label="Label" />
        </BottomNav>
      </div>

      {/* 2 Items with Search */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>2 Items with Search</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavSearch />
        </BottomNav>
      </div>

      {/* 3 Items */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>3 Items</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={Search} label="Label" />
          <BottomNavItem value="item3" icon={User} label="Label" />
        </BottomNav>
      </div>

      {/* 3 Items with Search */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>3 Items with Search</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={Heart} label="Label" />
          <BottomNavSearch />
        </BottomNav>
      </div>

      {/* 4 Items */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>4 Items</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={Search} label="Label" />
          <BottomNavItem value="item3" icon={Heart} label="Label" />
          <BottomNavItem value="item4" icon={User} label="Label" />
        </BottomNav>
      </div>

      {/* 4 Items with Search */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>4 Items with Search</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={Heart} label="Label" />
          <BottomNavItem value="item3" icon={MessageCircle} label="Label" />
          <BottomNavSearch />
        </BottomNav>
      </div>

      {/* 5 Items */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>5 Items</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={Search} label="Label" />
          <BottomNavItem value="item3" icon={Heart} label="Label" />
          <BottomNavItem value="item4" icon={MessageCircle} label="Label" />
          <BottomNavItem value="item5" icon={User} label="Label" />
        </BottomNav>
      </div>

      {/* 5 Items with Search */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>5 Items with Search</p>
        <BottomNav defaultValue="item1" fixed={false}>
          <BottomNavItem value="item1" icon={Home} label="Label" />
          <BottomNavItem value="item2" icon={Heart} label="Label" />
          <BottomNavItem value="item3" icon={MessageCircle} label="Label" />
          <BottomNavItem value="item4" icon={Settings} label="Label" />
          <BottomNavSearch />
        </BottomNav>
      </div>

      {/* Icons Only */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Icons Only (Collapsed)</p>
        <BottomNav defaultValue="item1" fixed={false} showLabels={false}>
          <BottomNavItem value="item1" icon={Home} label="Home" />
          <BottomNavItem value="item2" icon={Search} label="Search" />
          <BottomNavItem value="item3" icon={Heart} label="Favorites" />
          <BottomNavItem value="item4" icon={User} label="Profile" />
        </BottomNav>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('home');
    
    return (
      <DemoContainer height={300}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600 }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h3>
          <p style={{ margin: 0, color: '#71717a', fontSize: 14 }}>
            Tap the icons below to navigate
          </p>
        </div>
        <BottomNav value={activeTab} onValueChange={setActiveTab} fixed={false} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <BottomNavItem value="home" icon={Home} label="Home" />
          <BottomNavItem value="search" icon={Search} label="Search" />
          <BottomNavItem value="favorites" icon={Heart} label="Favorites" badge={3} />
          <BottomNavItem value="profile" icon={User} label="Profile" />
        </BottomNav>
      </DemoContainer>
    );
  },
};
