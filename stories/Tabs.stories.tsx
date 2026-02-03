import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../src/components/ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tabs

Tab navigation component.

## Features
- **2 Variants**: Default (underlined), Pills
- **Controlled/Uncontrolled**: Both modes
- **Accessible**: Keyboard navigation
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" style={{ width: 400 }}>
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ margin: 0, color: '#52525b' }}>
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="tab2">
        <p style={{ margin: 0, color: '#52525b' }}>
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="tab3">
        <p style={{ margin: 0, color: '#52525b' }}>
          Configure application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="all" style={{ width: 400 }}>
      <TabsList variant="pills">
        <TabsTrigger value="all" variant="pills">All</TabsTrigger>
        <TabsTrigger value="active" variant="pills">Active</TabsTrigger>
        <TabsTrigger value="completed" variant="pills">Completed</TabsTrigger>
        <TabsTrigger value="archived" variant="pills">Archived</TabsTrigger>
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

export const Controlled: Story = {
  render: () => {
    const [tab, setTab] = React.useState('tab1');
    
    return (
      <div style={{ width: 400 }}>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#71717a' }}>
          Active tab: {tab}
        </p>
        <Tabs value={tab} onValueChange={setTab}>
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
  render: () => (
    <Tabs defaultValue="tab1" style={{ width: 400 }}>
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
      width: 500, 
      padding: 24, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 600 }}>
        MacBook Pro
      </h2>
      
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
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
