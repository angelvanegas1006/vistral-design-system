import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../src/components/ui/tooltip'
import { Button } from '../src/components/ui/button'
import { HelpCircle, Info, Settings, AlertCircle } from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tooltip

Displays contextual information on hover or focus.

Based on Figma Design System: [Tooltip Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=331-11770)

## Features
- **Positions**: Top, bottom, left, right
- **Alignment**: Start, center, end
- **Sizes**: Small, medium
- **Delay**: Configurable show delay
        `,
      },
    },
  },
  decorators: [
    Story => (
      <TooltipProvider>
        <div style={{ padding: 80 }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#2050f6',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Hover me
        </button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
}

export const Positions: Story = {
  name: 'All Positions',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        padding: 40,
      }}
    >
      <div /> {/* Empty cell */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Top</button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <div /> {/* Empty cell */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Left</button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ color: '#71717a', fontSize: 13 }}>Positions</span>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Right</button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <div /> {/* Empty cell */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Bottom</button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <div /> {/* Empty cell */}
    </div>
  ),
}

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#f4f4f5',
  color: '#18181b',
  border: '1px solid #e4e4e7',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 14,
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Small tooltip</button>
        </TooltipTrigger>
        <TooltipContent size="sm">Small size</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Medium tooltip</button>
        </TooltipTrigger>
        <TooltipContent size="md">Medium size (default)</TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={iconButtonStyle}>
            <HelpCircle size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Need help?</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button style={iconButtonStyle}>
            <Info size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>More information</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button style={iconButtonStyle}>
            <Settings size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button style={iconButtonStyle}>
            <AlertCircle size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>Warning</TooltipContent>
      </Tooltip>
    </div>
  ),
}

const iconButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  backgroundColor: 'transparent',
  color: '#71717a',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
}

export const LongContent: Story = {
  name: 'Long Content',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button style={buttonStyle}>Hover for more info</button>
      </TooltipTrigger>
      <TooltipContent style={{ maxWidth: 200, whiteSpace: 'normal' }}>
        This is a tooltip with longer content that wraps to multiple lines for better readability.
      </TooltipContent>
    </Tooltip>
  ),
}

export const CustomDelay: Story = {
  name: 'Custom Delay',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Instant (0ms)</button>
        </TooltipTrigger>
        <TooltipContent>Shows immediately</TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Default (300ms)</button>
        </TooltipTrigger>
        <TooltipContent>Default delay</TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <button style={buttonStyle}>Slow (700ms)</button>
        </TooltipTrigger>
        <TooltipContent>Longer delay</TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const WithButton: Story = {
  name: 'With Design System Button',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="primary">Primary</Button>
        </TooltipTrigger>
        <TooltipContent>Primary action</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Secondary</Button>
        </TooltipTrigger>
        <TooltipContent>Secondary action</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Ghost</Button>
        </TooltipTrigger>
        <TooltipContent>Ghost action</TooltipContent>
      </Tooltip>
    </div>
  ),
}

export const DisabledButton: Story = {
  name: 'On Disabled Element',
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <span style={{ display: 'inline-block' }}>
          <button style={{ ...buttonStyle, opacity: 0.5, cursor: 'not-allowed' }} disabled>
            Disabled button
          </button>
        </span>
      </TooltipTrigger>
      <TooltipContent>This action is currently unavailable</TooltipContent>
    </Tooltip>
  ),
}
