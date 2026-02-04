import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea } from '../src/components/ui/input';
import { Search, Mail, Lock, Eye, EyeOff, AtSign } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Input

Text input field for forms.

## Features
- **3 Sizes**: Small, Medium, Large
- **States**: Default, Focus, Error, Disabled
- **Icons**: Left and right icon support
- **Labels**: Built-in label and helper text
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium (default)" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input leftIcon={Search} placeholder="Search..." />
      <Input leftIcon={Mail} placeholder="Email address" />
      <Input leftIcon={Lock} placeholder="Password" type="password" />
      <Input rightIcon={AtSign} placeholder="Username" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="With Helper" placeholder="Enter value" helperText="This is a helper text" />
      <Input label="Error" placeholder="Invalid value" error errorMessage="This field is required" />
      <Input label="Disabled" placeholder="Cannot edit" disabled />
    </div>
  ),
};

export const PasswordInput: Story = {
  name: 'Password Toggle',
  render: () => {
    const [show, setShow] = React.useState(false);
    
    return (
      <div style={{ width: 300 }}>
        <div style={{ position: 'relative' }}>
          <Input
            label="Password"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{
              position: 'absolute',
              right: 12,
              top: 32,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={18} color="#71717a" /> : <Eye size={18} color="#71717a" />}
          </button>
        </div>
      </div>
    );
  },
};

export const TextareaComponent: Story = {
  name: 'Textarea',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Textarea label="Description" placeholder="Enter description..." />
      <Textarea 
        label="With Helper" 
        placeholder="Enter your message..." 
        helperText="Max 500 characters"
        rows={4}
      />
      <Textarea 
        label="Error State" 
        placeholder="Required field" 
        error 
        errorMessage="This field is required"
      />
      <Textarea label="Disabled" placeholder="Cannot edit" disabled />
    </div>
  ),
};

export const FormExample: Story = {
  name: 'Form Example',
  render: () => (
    <form 
      style={{ 
        width: 400, 
        padding: 24, 
        backgroundColor: '#fff', 
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600 }}>
        Contact Us
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Input label="First Name" placeholder="John" fullWidth />
          <Input label="Last Name" placeholder="Doe" fullWidth />
        </div>
        <Input 
          label="Email" 
          type="email" 
          placeholder="john@example.com" 
          leftIcon={Mail}
          fullWidth 
        />
        <Input 
          label="Subject" 
          placeholder="What's this about?" 
          fullWidth 
        />
        <Textarea 
          label="Message" 
          placeholder="Your message..." 
          rows={4}
          fullWidth 
        />
        
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2050f6',
            color: 'white',
            border: 'none',
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Send Message
        </button>
      </div>
    </form>
  ),
};
