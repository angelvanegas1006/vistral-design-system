import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../src/components/ui/popover'
import { Button } from '../src/components/ui/button'
import { Input } from '../src/components/ui/input'
import { Settings, Info } from 'lucide-react'

const meta: Meta = {
  title: 'Components/Popover',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Popover

Floating content panel triggered by a button.

## Features
- **Positioning**: Top, bottom, left, right
- **Alignment**: Start, center, end
- **Controlled/Uncontrolled**: Both modes supported
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600 }}>Popover Title</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#71717a' }}>
            This is a popover with some content. You can put anything here.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const WithForm: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" leftIcon={Settings}>
            Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: 280 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Dimensions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input label="Width" placeholder="100%" size="sm" />
            <Input label="Height" placeholder="auto" size="sm" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <PopoverClose asChild>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </PopoverClose>
            <Button size="sm">Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const Positions: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: 60 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map(side => (
        <div key={side} style={{ position: 'relative', display: 'inline-block' }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="sm">
                {side}
              </Button>
            </PopoverTrigger>
            <PopoverContent side={side}>
              <p style={{ margin: 0, fontSize: 13 }}>Popover on {side}</p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  ),
}

export const Alignments: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['start', 'center', 'end'] as const).map(align => (
        <div key={align} style={{ position: 'relative', display: 'inline-block' }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="sm">
                Align {align}
              </Button>
            </PopoverTrigger>
            <PopoverContent align={align}>
              <p style={{ margin: 0, fontSize: 13 }}>Aligned to {align}</p>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  ),
}

export const InfoPopover: StoryObj = {
  name: 'Info Tooltip Style',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 14 }}>What is this?</span>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Popover>
          <PopoverTrigger asChild>
            <button
              style={{
                padding: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#71717a',
                display: 'flex',
              }}
            >
              <Info size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent style={{ width: 240 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>More Information</h4>
            <p style={{ margin: 0, fontSize: 12, color: '#71717a', lineHeight: 1.5 }}>
              This is additional context that helps explain the feature in more detail.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
}
