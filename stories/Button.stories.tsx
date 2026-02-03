import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/ui/button';
import { 
  Search, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Download, 
  Send,
  Heart,
  Settings,
  Mail,
  ArrowRight,
} from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button

Based on Figma Design System: [Button Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=101-2720)

## Features
- **5 Variants**: Primary, Secondary, Ghost, Destructive, Destructive-ghost
- **3 Sizes**: Small (32px), Medium (40px), Large (48px)
- **Pill Shape**: Fully rounded (border-radius: 9999px)
- **Icon Support**: Left icon, right icon, or icon-only (circular)
- **Loading State**: Built-in loading spinner

## Design Tokens
| Token | Value |
|-------|-------|
| Primary BG | #2050f6 (Spaceblue 600) |
| Primary Hover | #1337e2 (Spaceblue 700) |
| Secondary BG | #d9e7ff (Spaceblue 100) |
| Destructive BG | #dc2626 (Red 600) |
| Border Radius | 9999px (Pill) |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'destructive-ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Light Background */}
      <div style={{ padding: 24, backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          Light Background
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(['primary', 'secondary', 'ghost', 'destructive', 'destructive-ghost'] as const).map((variant) => (
            <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: 130, fontSize: 13, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
                {variant}
              </span>
              <Button variant={variant}>Button</Button>
              <Button variant={variant} leftIcon={Plus}>Button</Button>
              <Button variant={variant} iconOnly aria-label="Add"><Plus size={18} /></Button>
              <Button variant={variant} isLoading>Loading</Button>
              <Button variant={variant} disabled>Disabled</Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dark Background */}
      <div style={{ padding: 24, backgroundColor: '#18181b', borderRadius: 12 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600, color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>
          Dark Background
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(['primary', 'secondary', 'ghost', 'destructive', 'destructive-ghost'] as const).map((variant) => (
            <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: 130, fontSize: 13, color: '#a1a1aa', fontFamily: 'Inter, sans-serif' }}>
                {variant}
              </span>
              <Button variant={variant}>Button</Button>
              <Button variant={variant} leftIcon={Plus}>Button</Button>
              <Button variant={variant} iconOnly aria-label="Add"><Plus size={18} /></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
            {size === 'sm' ? 'Small (32px)' : size === 'md' ? 'Medium (40px)' : 'Large (48px)'}
          </h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button size={size}>Button</Button>
            <Button size={size} variant="secondary">Secondary</Button>
            <Button size={size} leftIcon={Plus}>Add Item</Button>
            <Button size={size} iconOnly aria-label="Search"><Search size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} /></Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
          Left Icon
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button leftIcon={Search}>Search</Button>
          <Button leftIcon={Plus} variant="secondary">Add New</Button>
          <Button leftIcon={Download} variant="ghost">Download</Button>
          <Button leftIcon={Trash2} variant="destructive">Delete</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
          Right Icon
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button rightIcon={ChevronRight}>Continue</Button>
          <Button rightIcon={ArrowRight} variant="secondary">Next Step</Button>
          <Button rightIcon={Send}>Submit</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
          Icon Only (Circular)
        </h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button iconOnly aria-label="Search"><Search size={18} /></Button>
          <Button iconOnly variant="secondary" aria-label="Add"><Plus size={18} /></Button>
          <Button iconOnly variant="ghost" aria-label="Settings"><Settings size={18} /></Button>
          <Button iconOnly variant="destructive" aria-label="Delete"><Trash2 size={18} /></Button>
          <Button iconOnly variant="destructive-ghost" aria-label="Remove"><Trash2 size={18} /></Button>
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
          Loading
        </h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button isLoading>Saving...</Button>
          <Button isLoading variant="secondary">Loading...</Button>
          <Button isLoading variant="ghost">Please wait</Button>
          <Button isLoading variant="destructive">Deleting...</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
          Disabled
        </h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button disabled>Primary</Button>
          <Button disabled variant="secondary">Secondary</Button>
          <Button disabled variant="ghost">Ghost</Button>
          <Button disabled variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  ),
};

export const Examples: Story = {
  name: 'Real-world Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
      {/* Form actions */}
      <div style={{ 
        padding: 24, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          Form Actions
        </h3>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button leftIcon={Send}>Submit</Button>
        </div>
      </div>
      
      {/* Delete confirmation */}
      <div style={{ 
        padding: 24, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          Delete Item?
        </h3>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
          This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive" leftIcon={Trash2}>Delete</Button>
        </div>
      </div>
      
      {/* Toolbar */}
      <div style={{ 
        padding: 8, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
        display: 'flex',
        gap: 4,
      }}>
        <Button variant="ghost" iconOnly size="sm" aria-label="Search"><Search size={16} /></Button>
        <Button variant="ghost" iconOnly size="sm" aria-label="Add"><Plus size={16} /></Button>
        <Button variant="ghost" iconOnly size="sm" aria-label="Download"><Download size={16} /></Button>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" iconOnly size="sm" aria-label="Settings"><Settings size={16} /></Button>
      </div>
    </div>
  ),
};
