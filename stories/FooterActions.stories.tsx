import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FooterActions } from '../src/components/ui/footer-actions'
import { Button } from '../src/components/ui/button'

const meta: Meta = {
  title: 'Components/FooterActions',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Footer Actions

Footer Actions component matching Figma design.

Based on Figma:
- [Footer Actions](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2293-28780)

## Features
- **Horizontal Layout**: Desktop - primary action on right, secondary on left
- **Vertical Layout**: Mobile - full-width stacked buttons, primary on top
- **Single Action**: Support for single button
- **Accessibility**: Minimum 44px button height for touch targets
- **Spacing**: Minimum 8px gap between buttons
- **Maximum 3 Actions**: Best practice limit

## Usage
Footer Actions standardizes primary, secondary, and tertiary actions at the bottom of components like Dialogs, Cards, and mobile views.
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 200 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Content area</p>
      </div>
      <FooterActions>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </FooterActions>
    </div>
  ),
}

export const HorizontalDesktop: StoryObj = {
  name: 'Horizontal (Desktop)',
  render: () => (
    <div style={{ width: 600, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 200 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Dialog or Card content</p>
      </div>
      <FooterActions direction="horizontal" align="right">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </FooterActions>
    </div>
  ),
}

export const VerticalMobile: StoryObj = {
  name: 'Vertical/Stacked (Mobile)',
  render: () => (
    <div style={{ width: 375, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 300 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Mobile content area</p>
      </div>
      <FooterActions direction="vertical" mobile>
        <Button>Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
      </FooterActions>
    </div>
  ),
}

export const SingleAction: StoryObj = {
  name: 'Single Action',
  render: () => (
    <div style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 200 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Content area</p>
      </div>
      <FooterActions>
        <Button style={{ width: '100%' }}>Accept</Button>
      </FooterActions>
    </div>
  ),
}

export const ThreeActions: StoryObj = {
  name: 'Three Actions (Maximum)',
  render: () => (
    <div style={{ width: 600, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 200 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Content area</p>
      </div>
      <FooterActions align="space-between">
        <Button variant="ghost">Back</Button>
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </FooterActions>
    </div>
  ),
}

export const WithDestructive: StoryObj = {
  name: 'With Destructive Action',
  render: () => (
    <div style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 200 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Content area</p>
      </div>
      <FooterActions>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </FooterActions>
    </div>
  ),
}

export const MobileFullWidth: StoryObj = {
  name: 'Mobile Full-Width Stacked',
  render: () => (
    <div style={{ width: 375, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: 24, minHeight: 400 }}>
        <p style={{ margin: 0, color: '#71717a' }}>Mobile dialog or bottom sheet content</p>
      </div>
      <FooterActions direction="vertical" mobile>
        <Button>Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
        <Button variant="ghost">Tertiary Action</Button>
      </FooterActions>
    </div>
  ),
}

export const FixedBottom: StoryObj = {
  name: 'Fixed at Bottom',
  render: () => (
    <div
      style={{
        position: 'relative',
        height: 600,
        border: '1px solid #e4e4e7',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: 24, height: '100%', overflow: 'auto' }}>
        <p style={{ margin: 0, color: '#71717a', marginBottom: 16 }}>Scrollable content</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} style={{ margin: '8px 0', color: '#71717a' }}>
            Line {i + 1} of scrollable content
          </p>
        ))}
      </div>
      <FooterActions fixed>
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </FooterActions>
    </div>
  ),
}

export const AlignmentVariations: StoryObj = {
  name: 'Alignment Variations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Left Aligned</p>
        <div
          style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 100 }} />
          <FooterActions align="left">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </FooterActions>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Center Aligned</p>
        <div
          style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 100 }} />
          <FooterActions align="center">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </FooterActions>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Right Aligned (Default)</p>
        <div
          style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 100 }} />
          <FooterActions align="right">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </FooterActions>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Space Between</p>
        <div
          style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 100 }} />
          <FooterActions align="space-between">
            <Button variant="ghost">Back</Button>
            <Button>Continue</Button>
          </FooterActions>
        </div>
      </div>
    </div>
  ),
}

export const AllVariations: StoryObj = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 24,
        backgroundColor: '#f8fafc',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
          Desktop - Horizontal (Primary Right)
        </h3>
        <div
          style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 150 }}>
            <p style={{ margin: 0, color: '#71717a' }}>Dialog or Card content</p>
          </div>
          <FooterActions>
            <Button variant="outline">Button</Button>
            <Button>Button</Button>
          </FooterActions>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
          Mobile - Vertical/Stacked (Primary Top)
        </h3>
        <div
          style={{ width: 375, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 300 }}>
            <p style={{ margin: 0, color: '#71717a' }}>Mobile content</p>
          </div>
          <FooterActions direction="vertical" mobile>
            <Button>Button</Button>
            <Button variant="outline">Button</Button>
          </FooterActions>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Single Action</h3>
        <div
          style={{ width: 500, border: '1px solid #e4e4e7', borderRadius: 8, overflow: 'hidden' }}
        >
          <div style={{ padding: 24, minHeight: 150 }}>
            <p style={{ margin: 0, color: '#71717a' }}>Content</p>
          </div>
          <FooterActions>
            <Button style={{ width: '100%' }}>Button</Button>
          </FooterActions>
        </div>
      </div>
    </div>
  ),
}
