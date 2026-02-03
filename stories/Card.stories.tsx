import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { MoreHorizontal, Heart, Share2, MapPin, Bed, Bath, Square } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Card

Based on Figma Design System: [Card Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=291-8668)

## Features
- **3 Sizes**: Small (178px min-height), Medium (192px), Large (216px)
- **Composable**: Header, Title, Description, Content, Footer
- **Hoverable**: Optional hover effect with increased shadow
- **Flat**: Option to remove shadow

## Design Tokens
| Token | Value |
|-------|-------|
| Background | #ffffff (White) |
| Border | #e4e4e7 (Zinc 200) |
| Border Radius | 8px |
| Shadow | 0px 0px 16px rgba(0,0,0,0.04) |

## Anatomy
- **Header**: Contains title, description, and optional right content
- **Content**: Main content area (flexible)
- **Footer**: Action buttons with top border
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    flat: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 369 }}>
      <CardHeader>
        <CardTitle>Title Text</CardTitle>
        <CardDescription>This is a card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ 
          border: '2px dashed #d4d4d8', 
          borderRadius: 4, 
          padding: 16, 
          textAlign: 'center',
          color: '#a1a1aa',
          fontSize: 14,
        }}>
          Custom Content
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" style={{ flex: 1 }}>Button</Button>
        <Button variant="primary" style={{ flex: 1 }}>Button</Button>
      </CardFooter>
    </Card>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Card key={size} size={size} style={{ width: 280 }}>
          <CardHeader>
            <CardTitle>Card {size.toUpperCase()}</CardTitle>
            <CardDescription>Size: {size}</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ 
              border: '2px dashed #d4d4d8', 
              borderRadius: 4, 
              padding: 12, 
              textAlign: 'center',
              color: '#a1a1aa',
              fontSize: 12,
            }}>
              Content
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary" style={{ flex: 1 }}>Cancel</Button>
            <Button size="sm" style={{ flex: 1 }}>Confirm</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};

export const WithRightContent: Story = {
  name: 'With Right Content',
  render: () => (
    <Card style={{ width: 369 }}>
      <CardHeader rightContent={
        <Button variant="ghost" iconOnly size="sm" aria-label="More options">
          <MoreHorizontal size={16} />
        </Button>
      }>
        <CardTitle>Card with Actions</CardTitle>
        <CardDescription>Has a menu button on the right.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: 14, color: '#52525b', lineHeight: 1.6 }}>
          This card demonstrates the right content slot in the header,
          which is perfect for action buttons or icons.
        </p>
      </CardContent>
      <CardFooter align="right">
        <Button variant="ghost">Learn More</Button>
        <Button>Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Card hoverable style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Hoverable Card</CardTitle>
          <CardDescription>Hover to see the shadow effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
            This card has an enhanced shadow on hover.
          </p>
        </CardContent>
      </Card>
      
      <Card flat style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Flat Card</CardTitle>
          <CardDescription>No shadow, just border.</CardDescription>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
            This card has no shadow effect.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const PropertyCard: Story = {
  name: 'Property Listing Card',
  render: () => (
    <Card hoverable style={{ width: 340, padding: 0, overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ 
        height: 180, 
        backgroundColor: '#f4f4f5',
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 12, 
          right: 12,
          display: 'flex',
          gap: 8,
        }}>
          <Button variant="secondary" iconOnly size="sm" aria-label="Like">
            <Heart size={14} />
          </Button>
          <Button variant="secondary" iconOnly size="sm" aria-label="Share">
            <Share2 size={14} />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <MapPin size={14} color="#71717a" />
          <span style={{ fontSize: 12, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
            Manila, Philippines
          </span>
        </div>
        
        <h3 style={{ 
          margin: '0 0 4px', 
          fontSize: 16, 
          fontWeight: 600, 
          fontFamily: 'Inter, sans-serif',
          color: '#09090b',
        }}>
          Modern Studio Apartment
        </h3>
        
        <p style={{ 
          margin: '0 0 12px', 
          fontSize: 20, 
          fontWeight: 700, 
          color: '#2050f6',
          fontFamily: 'Inter, sans-serif',
        }}>
          ₱15,000 <span style={{ fontSize: 14, fontWeight: 400, color: '#71717a' }}>/month</span>
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          paddingTop: 12, 
          borderTop: '1px solid #e4e4e7',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bed size={16} color="#71717a" />
            <span style={{ fontSize: 13, color: '#52525b', fontFamily: 'Inter, sans-serif' }}>1 Bed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bath size={16} color="#71717a" />
            <span style={{ fontSize: 13, color: '#52525b', fontFamily: 'Inter, sans-serif' }}>1 Bath</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Square size={16} color="#71717a" />
            <span style={{ fontSize: 13, color: '#52525b', fontFamily: 'Inter, sans-serif' }}>32 sqm</span>
          </div>
        </div>
      </div>
    </Card>
  ),
};

export const FormCard: Story = {
  name: 'Form Card',
  render: () => (
    <Card style={{ width: 400 }}>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 14, 
              fontWeight: 500, 
              marginBottom: 6,
              color: '#09090b',
              fontFamily: 'Inter, sans-serif',
            }}>
              Email
            </label>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 14,
                border: '1px solid #d4d4d8',
                borderRadius: 8,
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 14, 
              fontWeight: 500, 
              marginBottom: 6,
              color: '#09090b',
              fontFamily: 'Inter, sans-serif',
            }}>
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 14,
                border: '1px solid #d4d4d8',
                borderRadius: 8,
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter align="between">
        <Button variant="ghost">Cancel</Button>
        <Button>Create Account</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  name: 'Stats Card',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {[
        { label: 'Total Revenue', value: '₱1.2M', change: '+12.5%', positive: true },
        { label: 'Active Listings', value: '234', change: '+8', positive: true },
        { label: 'Pending Reviews', value: '18', change: '-3', positive: false },
      ].map((stat, i) => (
        <Card key={i} size="sm" style={{ width: 180, padding: 16 }}>
          <span style={{ 
            fontSize: 12, 
            color: '#71717a', 
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            {stat.label}
          </span>
          <div style={{ 
            fontSize: 28, 
            fontWeight: 700, 
            color: '#09090b',
            fontFamily: 'Inter, sans-serif',
            marginTop: 4,
          }}>
            {stat.value}
          </div>
          <span style={{ 
            fontSize: 12, 
            color: stat.positive ? '#16a34a' : '#dc2626',
            fontFamily: 'Inter, sans-serif',
          }}>
            {stat.change} from last month
          </span>
        </Card>
      ))}
    </div>
  ),
};
