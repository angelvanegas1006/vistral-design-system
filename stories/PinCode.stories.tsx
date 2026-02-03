import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PinCode } from '../src/components/ui/pin-code';

const meta: Meta<typeof PinCode> = {
  title: 'Components/PinCode',
  component: PinCode,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Pin Code

OTP/PIN code input component.

## Features
- **Auto Focus**: Moves to next input
- **Paste Support**: Paste full code
- **Masked Input**: For passwords
- **Validation States**: Error/success
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PinCode>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <PinCode
        value={value}
        onChange={setValue}
        onComplete={(code) => console.log('Complete:', code)}
      />
    );
  },
};

export const FourDigits: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <PinCode
        length={4}
        value={value}
        onChange={setValue}
        label="Enter PIN"
      />
    );
  },
};

export const Masked: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <PinCode
        length={4}
        value={value}
        onChange={setValue}
        mask
        label="Enter Password"
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <PinCode
        value={value}
        onChange={setValue}
        label="Verification Code"
        helperText="Enter the 6-digit code sent to your phone"
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = React.useState('123456');
    return (
      <PinCode
        value={value}
        onChange={setValue}
        error
        label="Verification Code"
        helperText="Invalid code. Please try again."
      />
    );
  },
};

export const Success: Story = {
  render: () => {
    const [value, setValue] = React.useState('123456');
    return (
      <PinCode
        value={value}
        onChange={setValue}
        success
        label="Verification Code"
        helperText="Code verified successfully!"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PinCode length={4} size="sm" label="Small" />
      <PinCode length={4} size="md" label="Medium" />
      <PinCode length={4} size="lg" label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <PinCode
      value="1234"
      length={4}
      disabled
      label="Disabled"
    />
  ),
};

export const VerificationFlow: Story = {
  name: 'Verification Flow',
  render: () => {
    const [value, setValue] = React.useState('');
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    
    const handleComplete = (code: string) => {
      setStatus('loading');
      // Simulate API call
      setTimeout(() => {
        if (code === '123456') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }, 1000);
    };
    
    return (
      <div style={{
        width: 350,
        padding: 32,
        backgroundColor: '#fff',
        borderRadius: 16,
        border: '1px solid #e4e4e7',
        textAlign: 'center',
      }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>
          Verify your phone
        </h2>
        <p style={{ margin: '0 0 24px', color: '#71717a', fontSize: 14 }}>
          We sent a code to +1 (555) ***-**89
        </p>
        
        <PinCode
          value={value}
          onChange={setValue}
          onComplete={handleComplete}
          error={status === 'error'}
          success={status === 'success'}
          helperText={
            status === 'error' ? 'Invalid code. Try 123456' :
            status === 'success' ? 'Verified!' :
            status === 'loading' ? 'Verifying...' :
            undefined
          }
        />
        
        <p style={{ margin: '24px 0 0', fontSize: 13, color: '#71717a' }}>
          Didn't receive the code?{' '}
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: '#2050f6', 
            cursor: 'pointer',
            fontSize: 13,
          }}>
            Resend
          </button>
        </p>
      </div>
    );
  },
};
