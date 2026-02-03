import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../src/components/ui/phone-input';

const meta: Meta<typeof PhoneInput> = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Phone Input

International phone number input.

## Features
- **Country Selector**: Dropdown with flags
- **Dial Code**: Auto-prefix
- **Formatting**: Phone number formatting
- **Search**: Filter countries
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ width: 300 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone Number"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('555-123-4567');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ width: 300 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone Number"
        />
      </div>
    );
  },
};

export const MexicoDefault: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('MX');
    
    return (
      <div style={{ width: 300 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Teléfono"
          defaultCountry="MX"
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ width: 300 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Contact Number"
          helperText="We'll only use this for important updates"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('123');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ width: 300 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone Number"
          error
          helperText="Please enter a valid phone number"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <PhoneInput
        value="555-123-4567"
        countryCode="US"
        label="Phone Number"
        disabled
      />
    </div>
  ),
};

export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ 
        width: 400, 
        padding: 24, 
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600 }}>Contact Information</h3>
        
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            style={{
              width: '100%',
              height: 40,
              padding: '0 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 8,
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>
        
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone Number"
        />
      </div>
    );
  },
};
