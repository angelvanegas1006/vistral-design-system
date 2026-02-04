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

Phone input component matching Figma design.

Based on Figma:
- [Phone Input Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=727-6398)

## Features
- **Country Selector**: Dropdown with flags and country codes
- **Search**: Filter countries by name or code
- **Auto-detection**: Automatically detects user's country
- **Formatting**: Dynamic phone number formatting based on country
- **Validation**: E.164 standard validation
- **Accessibility**: Full keyboard navigation and ARIA labels

## Best Practices
- Enable automatic country code detection
- Apply dynamic formatting as user types
- Validate full number (country code + national number)
- Use type="tel" for mobile numeric keypad
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
    const [country, setCountry] = React.useState('ES');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Label"
          placeholder="Phone number"
        />
      </div>
    );
  },
};

export const Filled: Story = {
  name: 'Filled State',
  render: () => {
    const [phone, setPhone] = React.useState('696 765 496');
    const [country, setCountry] = React.useState('ES');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Label"
        />
      </div>
    );
  },
};

export const PartiallyFilled: Story = {
  name: 'Partially Filled',
  render: () => {
    const [phone, setPhone] = React.useState('693');
    const [country, setCountry] = React.useState('ES');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Label"
        />
      </div>
    );
  },
};

export const Error: Story = {
  name: 'Error State',
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('ES');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Label"
          error
          helperText="This is an error description."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  render: () => (
    <div style={{ width: 400 }}>
      <PhoneInput
        value=""
        countryCode="ES"
        label="Label"
        disabled
        placeholder="Phone number"
      />
    </div>
  ),
};

export const DisabledFilled: Story = {
  name: 'Disabled with Value',
  render: () => (
    <div style={{ width: 400 }}>
      <PhoneInput
        value="696 765 496"
        countryCode="ES"
        label="Label"
        disabled
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone number"
          helperText="We'll only use this for important updates"
        />
      </div>
    );
  },
};

export const AutoDetect: Story = {
  name: 'Auto-detect Country',
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone number"
          autoDetectCountry
          helperText="Country detected automatically"
        />
      </div>
    );
  },
};

export const Formatting: Story = {
  name: 'With Formatting',
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('US');
    
    return (
      <div style={{ width: 400 }}>
        <PhoneInput
          value={phone}
          countryCode={country}
          onChange={(p, c) => { setPhone(p); setCountry(c); }}
          label="Phone number"
          formatOnType
          helperText="Number formats automatically as you type"
        />
      </div>
    );
  },
};

export const DifferentCountries: Story = {
  name: 'Different Countries',
  render: () => {
    const [phone1, setPhone1] = React.useState('');
    const [country1, setCountry1] = React.useState('US');
    const [phone2, setPhone2] = React.useState('');
    const [country2, setCountry2] = React.useState('ES');
    const [phone3, setPhone3] = React.useState('');
    const [country3, setCountry3] = React.useState('AU');
    const [phone4, setPhone4] = React.useState('');
    const [country4, setCountry4] = React.useState('IE');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
        <PhoneInput
          value={phone1}
          countryCode={country1}
          onChange={(p, c) => { setPhone1(p); setCountry1(c); }}
          label="United States"
          formatOnType
        />
        <PhoneInput
          value={phone2}
          countryCode={country2}
          onChange={(p, c) => { setPhone2(p); setCountry2(c); }}
          label="Spain"
          formatOnType
        />
        <PhoneInput
          value={phone3}
          countryCode={country3}
          onChange={(p, c) => { setPhone3(p); setCountry3(c); }}
          label="Australia"
          formatOnType
        />
        <PhoneInput
          value={phone4}
          countryCode={country4}
          onChange={(p, c) => { setPhone4(p); setCountry4(c); }}
          label="Ireland"
          formatOnType
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <PhoneInput
        value=""
        countryCode="ES"
        label="Label"
        placeholder="Phone number"
      />
      <PhoneInput
        value="696 765 496"
        countryCode="ES"
        label="Label"
      />
      <PhoneInput
        value=""
        countryCode="ES"
        label="Label"
        disabled
        placeholder="Phone number"
      />
      <PhoneInput
        value="693"
        countryCode="ES"
        label="Label"
      />
      <PhoneInput
        value=""
        countryCode="ES"
        label="Label"
        error
        helperText="This is an error description."
        placeholder="Phone number"
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
        width: 500, 
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
              height: 44,
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
          helperText="We'll use this to contact you about your order"
          formatOnType
        />
      </div>
    );
  },
};
