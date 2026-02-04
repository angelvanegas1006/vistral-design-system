import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../src/components/ui/link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Link

Based on Figma Design System: [Link Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=168-3309)

## Features
- **States**: Default, Hover, Focus, Disabled
- **Underline Options**: Always, Hover, None
- **External Links**: Auto-detected with icon option
- **Sizes**: Small, Medium, Large, Inherit
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Click here',
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#71717a', fontWeight: 500 }}>DEFAULT</p>
        <Link href="#">Default link</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#71717a', fontWeight: 500 }}>HOVER (interact to see)</p>
        <Link href="#">Hover over me</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#71717a', fontWeight: 500 }}>FOCUS (tab to see)</p>
        <Link href="#">Focus on me with keyboard</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#71717a', fontWeight: 500 }}>DISABLED</p>
        <Link href="#" disabled>Disabled link</Link>
      </div>
    </div>
  ),
};

export const UnderlineOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Link href="#" underline="always">Always underlined</Link>
      <Link href="#" underline="hover">Underlined on hover (default)</Link>
      <Link href="#" underline="none">Never underlined</Link>
    </div>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Link href="https://example.com">Auto-detected external (no icon)</Link>
      <Link href="https://example.com" external>External with icon</Link>
      <Link href="/internal-page">Internal link</Link>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Link href="#" size="sm">Small link (12px)</Link>
      <Link href="#" size="md">Medium link (14px)</Link>
      <Link href="#" size="lg">Large link (16px)</Link>
      <p style={{ fontSize: 18 }}>
        This link <Link href="#">inherits size</Link> from the parent.
      </p>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Link href="#">Normal link</Link>
      <Link href="#" disabled>Disabled link</Link>
    </div>
  ),
};

export const InlineText: Story = {
  name: 'Inline in Text',
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <p style={{ lineHeight: 1.7, fontSize: 14, color: '#3f3f46' }}>
        By signing up, you agree to our{' '}
        <Link href="#">Terms of Service</Link>{' '}
        and{' '}
        <Link href="#">Privacy Policy</Link>.
        If you have any questions, please{' '}
        <Link href="mailto:support@example.com">contact support</Link>.
      </p>
    </div>
  ),
};

export const Navigation: Story = {
  render: () => (
    <nav style={{ 
      display: 'flex', 
      gap: 24,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      border: '1px solid #e4e4e7',
    }}>
      <Link href="#" underline="none" style={{ color: '#71717a' }}>Home</Link>
      <Link href="#" underline="none" style={{ color: '#71717a' }}>Products</Link>
      <Link href="#" underline="none" style={{ color: '#71717a' }}>About</Link>
      <Link href="#" underline="none" style={{ color: '#71717a' }}>Contact</Link>
    </nav>
  ),
};

export const Footer: Story = {
  name: 'Footer Example',
  render: () => (
    <footer style={{ 
      padding: 24,
      backgroundColor: '#18181b',
      borderRadius: 8,
      color: '#a1a1aa',
      fontSize: 14,
    }}>
      <div style={{ display: 'flex', gap: 48, marginBottom: 24 }}>
        <div>
          <h4 style={{ color: '#fff', margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="#" underline="hover" style={{ color: '#a1a1aa' }}>About</Link>
            <Link href="#" underline="hover" style={{ color: '#a1a1aa' }}>Careers</Link>
            <Link href="#" underline="hover" style={{ color: '#a1a1aa' }}>Blog</Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#fff', margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Legal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="#" underline="hover" style={{ color: '#a1a1aa' }}>Privacy</Link>
            <Link href="#" underline="hover" style={{ color: '#a1a1aa' }}>Terms</Link>
            <Link href="#" underline="hover" style={{ color: '#a1a1aa' }}>Cookies</Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#fff', margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Connect</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="https://twitter.com" external style={{ color: '#a1a1aa' }}>Twitter</Link>
            <Link href="https://github.com" external style={{ color: '#a1a1aa' }}>GitHub</Link>
            <Link href="https://linkedin.com" external style={{ color: '#a1a1aa' }}>LinkedIn</Link>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #3f3f46', paddingTop: 16 }}>
        © 2024 Company Inc. All rights reserved.
      </div>
    </footer>
  ),
};
