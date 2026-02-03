import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/ui/switch';

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

## Features
- **3 Sizes**: Small, Medium, Large
- **Labels**: Built-in label and description
- **Controlled/Uncontrolled**: Both modes
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium (default)" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};

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
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
          Switch is {checked ? 'ON' : 'OFF'}
        </p>
        <Switch 
          label="Controlled switch"
          checked={checked}
          onCheckedChange={setChecked}
        />
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
    );
  },
};

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => (
    <div style={{ 
      width: 400, 
      padding: 24, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>
        Notification Settings
      </h3>
      
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
              <div style={{ fontSize: 14, fontWeight: 500, color: '#18181b' }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, color: '#71717a', marginTop: 2 }}>
                {item.desc}
              </div>
            </div>
            <Switch defaultChecked={item.checked} />
          </div>
        ))}
      </div>
    </div>
  ),
};
