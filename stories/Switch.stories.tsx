import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '../src/components/ui/switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Switch

Toggle switch for binary settings.

Based on Figma: [Switch Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=518-6121)

## Features
- **3 Sizes**: Small, Medium, Large
- **Label Position**: Left or Right
- **Labels**: Built-in label and description
- **States**: Off, On, Disabled
- **Controlled/Uncontrolled**: Both modes
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Label',
    description: 'Description',
  },
}

export const SwitchOnly: Story = {
  name: 'Switch Only (No Label)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch />
        <Switch defaultChecked />
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Switch disabled />
        <Switch disabled defaultChecked />
      </div>
    </div>
  ),
}

export const LabelPosition: Story = {
  name: 'Label Position',
  render: () => (
    <div style={{ display: 'flex', gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 12, color: '#71717a', margin: 0 }}>Label Right (default)</p>
        <Switch label="Label" description="Description" />
        <Switch label="Label" description="Description" defaultChecked />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 12, color: '#71717a', margin: 0 }}>Label Left</p>
        <Switch label="Label" description="Description" labelPosition="left" />
        <Switch label="Label" description="Description" labelPosition="left" defaultChecked />
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', margin: '0 0 8px' }}>Off</p>
        <Switch label="Label" description="Description" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', margin: '0 0 8px' }}>On</p>
        <Switch label="Label" description="Description" defaultChecked />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', margin: '0 0 8px' }}>Disabled Off</p>
        <Switch label="Label" description="Description" disabled />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', margin: '0 0 8px' }}>Disabled On</p>
        <Switch label="Label" description="Description" disabled defaultChecked />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium (default)" />
      <Switch size="lg" label="Large" />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Switch
        label="Marketing emails"
        description="Receive emails about new products and features."
      />
      <Switch
        label="Security alerts"
        description="Get notified about security updates."
        defaultChecked
      />
      <Switch
        label="Push notifications"
        description="Receive push notifications on your device."
        disabled
      />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
          Switch is {checked ? 'ON' : 'OFF'}
        </p>
        <Switch label="Controlled switch" checked={checked} onCheckedChange={setChecked} />
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: '8px 16px',
            border: '1px solid #d4d4d8',
            borderRadius: 8,
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Toggle from outside
        </button>
      </div>
    )
  },
}

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => (
    <div
      style={{
        width: 400,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>Notification Settings</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {[
          { label: 'Email notifications', desc: 'Receive email updates', checked: true },
          { label: 'Push notifications', desc: 'Receive push alerts', checked: true },
          { label: 'SMS notifications', desc: 'Receive SMS messages', checked: false },
          { label: 'Marketing emails', desc: 'Product news and offers', checked: false },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: i < 3 ? '1px solid #e4e4e7' : 'none',
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#18181b' }}>{item.label}</div>
              <div style={{ fontSize: 13, color: '#71717a', marginTop: 2 }}>{item.desc}</div>
            </div>
            <Switch defaultChecked={item.checked} />
          </div>
        ))}
      </div>
    </div>
  ),
}
