import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../src/components/ui/tabs';
import { Home, Settings, User, Bell, Star, Filter } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tab Bar

Tab Bar component matching Figma design.

Based on Figma:
- [Tab Bar Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2765-28927)

## Features
- **Level 1 (Main Tabs)**: Transparent background, bottom indicator
- **Level 2 (Segmented Controls)**: Solid background, capsule active indicator
- **Icons**: Optional icons for visual recognition
- **Badges**: Notification indicators (red dot or count)
- **Tags**: Small labels (e.g., "New", "Pro")
- **Accessibility**: Full ARIA support, keyboard navigation

## Best Practices
- Use short and descriptive labels (max two words)
- Keep tab order fixed throughout session
- Ensure content area maintains height
- Use Main Tabs for structural navigation
- Use Segmented Controls for filters or local changes
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  name: 'Level 1 - Main Tabs',
  render: () => (
    <Tabs defaultValue="tab1" level={1} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="tab1">Tab</TabsTrigger>
        <TabsTrigger value="tab2">Tab</TabsTrigger>
        <TabsTrigger value="tab3">Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ margin: 0, color: '#52525b' }}>
          Content for tab 1
        </p>
      </TabsContent>
      <TabsContent value="tab2">
        <p style={{ margin: 0, color: '#52525b' }}>
          Content for tab 2
        </p>
      </TabsContent>
      <TabsContent value="tab3">
        <p style={{ margin: 0, color: '#52525b' }}>
          Content for tab 3
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const SegmentedControls: Story = {
  name: 'Level 2 - Segmented Controls',
  render: () => (
    <Tabs defaultValue="all" level={2} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="all">Tab</TabsTrigger>
        <TabsTrigger value="active">Tab</TabsTrigger>
        <TabsTrigger value="completed">Tab</TabsTrigger>
        <TabsTrigger value="archived">Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p style={{ margin: 0, color: '#52525b' }}>Showing all items</p>
      </TabsContent>
      <TabsContent value="active">
        <p style={{ margin: 0, color: '#52525b' }}>Showing active items</p>
      </TabsContent>
      <TabsContent value="completed">
        <p style={{ margin: 0, color: '#52525b' }}>Showing completed items</p>
      </TabsContent>
      <TabsContent value="archived">
        <p style={{ margin: 0, color: '#52525b' }}>Showing archived items</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <Tabs defaultValue="home" level={1} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="home" icon={Home}>Home</TabsTrigger>
        <TabsTrigger value="settings" icon={Settings}>Settings</TabsTrigger>
        <TabsTrigger value="profile" icon={User}>Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <p style={{ margin: 0, color: '#52525b' }}>Home content</p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ margin: 0, color: '#52525b' }}>Settings content</p>
      </TabsContent>
      <TabsContent value="profile">
        <p style={{ margin: 0, color: '#52525b' }}>Profile content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  name: 'With Notification Badges',
  render: () => (
    <Tabs defaultValue="inbox" level={1} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="inbox" badge={3}>Inbox</TabsTrigger>
        <TabsTrigger value="sent" badge>Sent</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <p style={{ margin: 0, color: '#52525b' }}>Inbox content</p>
      </TabsContent>
      <TabsContent value="sent">
        <p style={{ margin: 0, color: '#52525b' }}>Sent content</p>
      </TabsContent>
      <TabsContent value="drafts">
        <p style={{ margin: 0, color: '#52525b' }}>Drafts content</p>
      </TabsContent>
      <TabsContent value="archived">
        <p style={{ margin: 0, color: '#52525b' }}>Archived content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithTags: Story = {
  name: 'With Tags',
  render: () => (
    <Tabs defaultValue="features" level={1} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="features" tag="New">Features</TabsTrigger>
        <TabsTrigger value="pricing" tag="Pro">Pricing</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      <TabsContent value="features">
        <p style={{ margin: 0, color: '#52525b' }}>Features content</p>
      </TabsContent>
      <TabsContent value="pricing">
        <p style={{ margin: 0, color: '#52525b' }}>Pricing content</p>
      </TabsContent>
      <TabsContent value="about">
        <p style={{ margin: 0, color: '#52525b' }}>About content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIconsAndBadges: Story = {
  name: 'With Icons and Badges',
  render: () => (
    <Tabs defaultValue="notifications" level={1} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="notifications" icon={Bell} badge={5}>Notifications</TabsTrigger>
        <TabsTrigger value="messages" icon={User} badge>Messages</TabsTrigger>
        <TabsTrigger value="favorites" icon={Star}>Favorites</TabsTrigger>
      </TabsList>
      <TabsContent value="notifications">
        <p style={{ margin: 0, color: '#52525b' }}>Notifications content</p>
      </TabsContent>
      <TabsContent value="messages">
        <p style={{ margin: 0, color: '#52525b' }}>Messages content</p>
      </TabsContent>
      <TabsContent value="favorites">
        <p style={{ margin: 0, color: '#52525b' }}>Favorites content</p>
      </TabsContent>
    </Tabs>
  ),
};

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 500 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Level 1 - Main Tabs</p>
        <Tabs defaultValue="tab1" level={1}>
          <TabsList>
            <TabsTrigger value="tab1">Tab</TabsTrigger>
            <TabsTrigger value="tab2">Tab</TabsTrigger>
            <TabsTrigger value="tab3">Tab</TabsTrigger>
            <TabsTrigger value="tab4" disabled>Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
          <TabsContent value="tab4">Content 4</TabsContent>
        </Tabs>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Level 2 - Segmented Controls</p>
        <Tabs defaultValue="tab1" level={2}>
          <TabsList>
            <TabsTrigger value="tab1">Tab</TabsTrigger>
            <TabsTrigger value="tab2">Tab</TabsTrigger>
            <TabsTrigger value="tab3">Tab</TabsTrigger>
            <TabsTrigger value="tab4" disabled>Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
          <TabsContent value="tab4">Content 4</TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const ManyTabs: Story = {
  name: 'Many Tabs',
  render: () => (
    <Tabs defaultValue="tab1" level={1} style={{ width: 600 }}>
      <TabsList>
        {Array.from({ length: 8 }).map((_, i) => (
          <TabsTrigger key={i} value={`tab${i + 1}`}>
            Tab {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      {Array.from({ length: 8 }).map((_, i) => (
        <TabsContent key={i} value={`tab${i + 1}`}>
          <p style={{ margin: 0, color: '#52525b' }}>Content for tab {i + 1}</p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const SegmentedControlsMany: Story = {
  name: 'Segmented Controls - Many Options',
  render: () => (
    <Tabs defaultValue="tab1" level={2} style={{ width: 600 }}>
      <TabsList>
        {Array.from({ length: 6 }).map((_, i) => (
          <TabsTrigger key={i} value={`tab${i + 1}`}>
            Tab {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      {Array.from({ length: 6 }).map((_, i) => (
        <TabsContent key={i} value={`tab${i + 1}`}>
          <p style={{ margin: 0, color: '#52525b' }}>Content for tab {i + 1}</p>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [tab, setTab] = React.useState('tab1');
    
    return (
      <div style={{ width: 500 }}>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#71717a' }}>
          Active tab: {tab}
        </p>
        <Tabs value={tab} onValueChange={setTab} level={1}>
          <TabsList>
            <TabsTrigger value="tab1">First</TabsTrigger>
            <TabsTrigger value="tab2">Second</TabsTrigger>
            <TabsTrigger value="tab3">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for first tab</TabsContent>
          <TabsContent value="tab2">Content for second tab</TabsContent>
          <TabsContent value="tab3">Content for third tab</TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  name: 'With Disabled',
  render: () => (
    <Tabs defaultValue="tab1" level={1} style={{ width: 500 }}>
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2">Also Available</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">This tab is available</TabsContent>
      <TabsContent value="tab2">This tab is also available</TabsContent>
      <TabsContent value="tab3">You can't see this</TabsContent>
    </Tabs>
  ),
};

export const ProductPage: Story = {
  name: 'Product Page Example',
  render: () => (
    <div style={{ 
      width: 600, 
      padding: 24, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 600 }}>
        MacBook Pro
      </h2>
      
      <Tabs defaultValue="description" level={1}>
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews" badge={24}>Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description">
          <p style={{ margin: 0, color: '#52525b', lineHeight: 1.6 }}>
            The most powerful MacBook Pro ever is here. With the blazing-fast 
            M3 Pro or M3 Max chip, up to 22 hours of battery life, and a stunning 
            Liquid Retina XDR display, it's a beast of a machine.
          </p>
        </TabsContent>
        
        <TabsContent value="specs">
          <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['Chip', 'Apple M3 Pro'],
                ['Memory', '18GB unified memory'],
                ['Storage', '512GB SSD'],
                ['Display', '14.2" Liquid Retina XDR'],
                ['Battery', 'Up to 17 hours'],
              ].map(([label, value], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={{ padding: '12px 0', color: '#71717a' }}>{label}</td>
                  <td style={{ padding: '12px 0', textAlign: 'right' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { author: 'John D.', rating: 5, text: 'Absolutely love it!' },
              { author: 'Sarah M.', rating: 4, text: 'Great performance, a bit pricey.' },
            ].map((review, i) => (
              <div key={i} style={{ padding: 12, backgroundColor: '#fafafa', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{review.author}</span>
                  <span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p style={{ margin: 0, color: '#52525b', fontSize: 14 }}>{review.text}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

export const FilterExample: Story = {
  name: 'Filter Example (Segmented Controls)',
  render: () => {
    const [filter, setFilter] = React.useState('all');
    
    return (
      <div style={{ 
        width: 500, 
        padding: 24, 
        backgroundColor: '#fff', 
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600 }}>
          Properties
        </h3>
        
        <Tabs value={filter} onValueChange={setFilter} level={2}>
          <TabsList>
            <TabsTrigger value="all" icon={Filter}>All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <p style={{ margin: 0, color: '#52525b' }}>
              Showing all properties ({Math.floor(Math.random() * 100)})
            </p>
          </TabsContent>
          <TabsContent value="active">
            <p style={{ margin: 0, color: '#52525b' }}>
              Showing active properties ({Math.floor(Math.random() * 50)})
            </p>
          </TabsContent>
          <TabsContent value="pending">
            <p style={{ margin: 0, color: '#52525b' }}>
              Showing pending properties ({Math.floor(Math.random() * 30)})
            </p>
          </TabsContent>
          <TabsContent value="sold">
            <p style={{ margin: 0, color: '#52525b' }}>
              Showing sold properties ({Math.floor(Math.random() * 20)})
            </p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, backgroundColor: '#f8fafc' }}>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Level 1 - Main Tabs</h3>
        <Tabs defaultValue="tab1" level={1}>
          <TabsList>
            <TabsTrigger value="tab1">Tab</TabsTrigger>
            <TabsTrigger value="tab2">Tab</TabsTrigger>
            <TabsTrigger value="tab3">Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
          <TabsContent value="tab2">Content</TabsContent>
          <TabsContent value="tab3">Content</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Level 2 - Segmented Controls</h3>
        <Tabs defaultValue="tab1" level={2}>
          <TabsList>
            <TabsTrigger value="tab1">Tab</TabsTrigger>
            <TabsTrigger value="tab2">Tab</TabsTrigger>
            <TabsTrigger value="tab3">Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
          <TabsContent value="tab2">Content</TabsContent>
          <TabsContent value="tab3">Content</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Icons and Badges</h3>
        <Tabs defaultValue="tab1" level={1}>
          <TabsList>
            <TabsTrigger value="tab1" icon={Home} badge={3}>Home</TabsTrigger>
            <TabsTrigger value="tab2" icon={Bell} badge>Notifications</TabsTrigger>
            <TabsTrigger value="tab3" icon={User}>Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
          <TabsContent value="tab2">Content</TabsContent>
          <TabsContent value="tab3">Content</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Tags</h3>
        <Tabs defaultValue="tab1" level={1}>
          <TabsList>
            <TabsTrigger value="tab1" tag="New">Features</TabsTrigger>
            <TabsTrigger value="tab2" tag="Pro">Pricing</TabsTrigger>
            <TabsTrigger value="tab3">About</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
          <TabsContent value="tab2">Content</TabsContent>
          <TabsContent value="tab3">Content</TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};
