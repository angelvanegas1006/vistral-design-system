import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Divider, DividerWithLabel } from '../src/components/ui/divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Divider

Based on Figma Design System: [Divider Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=183-3912)

## Features
- **2 Orientations**: Horizontal and Vertical
- **3 Spacing Options**: Small, Medium, Large
- **With Label**: Optional text label
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <p>Content above the divider</p>
      <Divider />
      <p>Content below the divider</p>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
        Small Spacing
      </h3>
      <div style={{ padding: 16, backgroundColor: '#fafafa', borderRadius: 8 }}>
        <p style={{ margin: 0 }}>Content</p>
        <Divider spacing="sm" />
        <p style={{ margin: 0 }}>Content</p>
      </div>

      <h3 style={{ margin: '24px 0 8px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
        Medium Spacing (Default)
      </h3>
      <div style={{ padding: 16, backgroundColor: '#fafafa', borderRadius: 8 }}>
        <p style={{ margin: 0 }}>Content</p>
        <Divider spacing="md" />
        <p style={{ margin: 0 }}>Content</p>
      </div>

      <h3 style={{ margin: '24px 0 8px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
        Large Spacing
      </h3>
      <div style={{ padding: 16, backgroundColor: '#fafafa', borderRadius: 8 }}>
        <p style={{ margin: 0 }}>Content</p>
        <Divider spacing="lg" />
        <p style={{ margin: 0 }}>Content</p>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 100 }}>
      <span>Left</span>
      <Divider orientation="vertical" spacing="md" />
      <span>Middle</span>
      <Divider orientation="vertical" spacing="md" />
      <span>Right</span>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DividerWithLabel label="OR" labelPosition="center" />
      <DividerWithLabel label="Continue with" labelPosition="left" />
      <DividerWithLabel label="End of section" labelPosition="right" />
    </div>
  ),
}

export const LoginForm: Story = {
  name: 'Login Form Example',
  render: () => (
    <div
      style={{
        width: 350,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600, textAlign: 'center' }}>
        Sign In
      </h2>

      <button
        style={{
          width: '100%',
          padding: '10px 16px',
          border: '1px solid #d4d4d8',
          borderRadius: 8,
          backgroundColor: 'white',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <DividerWithLabel label="or" spacing="lg" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 8,
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 8,
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          style={{
            width: '100%',
            padding: '10px 16px',
            border: 'none',
            borderRadius: 8,
            backgroundColor: '#2050f6',
            color: 'white',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  ),
}

export const Toolbar: Story = {
  name: 'Toolbar Example',
  render: () => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}
    >
      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Bold
      </button>
      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Italic
      </button>
      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Underline
      </button>

      <Divider orientation="vertical" spacing="sm" style={{ height: 24 }} />

      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Left
      </button>
      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Center
      </button>
      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Right
      </button>

      <Divider orientation="vertical" spacing="sm" style={{ height: 24 }} />

      <button
        style={{
          padding: '8px 12px',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        Link
      </button>
    </div>
  ),
}
