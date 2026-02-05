import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, Radio } from '../src/components/ui/radio'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Radio

Radio buttons for selecting one option from a list.

## Features
- **RadioGroup**: Manages selection state
- **Labels**: Built-in label and description
- **Orientations**: Vertical or horizontal
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <Radio value="standard" label="Standard" description="Free shipping, 5-7 business days" />
      <Radio value="express" label="Express" description="Paid shipping, 2-3 business days" />
      <Radio
        value="overnight"
        label="Overnight"
        description="Priority shipping, next business day"
      />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="small" orientation="horizontal">
      <Radio value="small" label="Small" />
      <Radio value="medium" label="Medium" />
      <Radio value="large" label="Large" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('react')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>Selected: {value}</p>
        <RadioGroup value={value} onValueChange={setValue}>
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" />
          <Radio value="angular" label="Angular" />
          <Radio value="svelte" label="Svelte" />
        </RadioGroup>
      </div>
    )
  },
}

export const PricingPlans: Story = {
  name: 'Pricing Plans',
  render: () => {
    const [plan, setPlan] = React.useState('pro')

    const plans = [
      { value: 'free', name: 'Free', price: '$0', features: '1 user, 5 projects' },
      { value: 'pro', name: 'Pro', price: '$19', features: '5 users, unlimited projects' },
      { value: 'enterprise', name: 'Enterprise', price: '$99', features: 'Unlimited everything' },
    ]

    return (
      <div style={{ width: 350 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600 }}>Choose a plan</h3>
        <RadioGroup value={plan} onValueChange={setPlan}>
          {plans.map(p => (
            <div
              key={p.value}
              style={{
                padding: 16,
                marginBottom: 12,
                border: `2px solid ${plan === p.value ? '#2050f6' : '#e4e4e7'}`,
                borderRadius: 12,
                backgroundColor: plan === p.value ? '#eef4ff' : 'white',
                cursor: 'pointer',
              }}
              onClick={() => setPlan(p.value)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Radio value={p.value} label={p.name} />
                <span style={{ fontSize: 18, fontWeight: 700, color: '#18181b' }}>
                  {p.price}
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#71717a' }}>/mo</span>
                </span>
              </div>
              <p style={{ margin: '8px 0 0 28px', fontSize: 13, color: '#71717a' }}>{p.features}</p>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
  },
}
