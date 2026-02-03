import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
} from '../src/components/ui/select';

const meta: Meta = {
  title: 'Components/Select',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Select

Dropdown select component for choosing from a list of options.

## Features
- **Sizes**: Small, Medium, Large
- **Groups**: Organize options into groups
- **Controlled/Uncontrolled**: Both modes supported
- **Accessible**: Keyboard navigation
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ width: 250, position: 'relative' }}>
      <Select defaultValue="option1">
        <SelectTrigger label="Select an option" />
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithPlaceholder: StoryObj = {
  render: () => (
    <div style={{ width: 250, position: 'relative' }}>
      <Select>
        <SelectTrigger placeholder="Choose a fruit..." label="Fruit" />
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="mango">Mango</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 250 }}>
      <Select size="sm" defaultValue="small">
        <SelectTrigger label="Small" />
        <SelectContent>
          <SelectItem value="small">Small option</SelectItem>
          <SelectItem value="other">Other option</SelectItem>
        </SelectContent>
      </Select>
      
      <Select size="md" defaultValue="medium">
        <SelectTrigger label="Medium (default)" />
        <SelectContent>
          <SelectItem value="medium">Medium option</SelectItem>
          <SelectItem value="other">Other option</SelectItem>
        </SelectContent>
      </Select>
      
      <Select size="lg" defaultValue="large">
        <SelectTrigger label="Large" />
        <SelectContent>
          <SelectItem value="large">Large option</SelectItem>
          <SelectItem value="other">Other option</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: StoryObj = {
  render: () => (
    <div style={{ width: 280, position: 'relative' }}>
      <Select>
        <SelectTrigger placeholder="Select a city..." label="City" />
        <SelectContent>
          <SelectGroup label="North America">
            <SelectItem value="ny">New York</SelectItem>
            <SelectItem value="la">Los Angeles</SelectItem>
            <SelectItem value="toronto">Toronto</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup label="Europe">
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="berlin">Berlin</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup label="Asia">
            <SelectItem value="tokyo">Tokyo</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="manila">Manila</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const States: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 250 }}>
      <Select defaultValue="normal">
        <SelectTrigger label="Normal" />
        <SelectContent>
          <SelectItem value="normal">Normal state</SelectItem>
          <SelectItem value="other">Other option</SelectItem>
        </SelectContent>
      </Select>
      
      <Select>
        <SelectTrigger label="Error" error />
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      
      <Select disabled>
        <SelectTrigger label="Disabled" />
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Controlled: StoryObj = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 250 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
          Selected: {value || 'none'}
        </p>
        
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger placeholder="Select..." label="Controlled" />
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectContent>
        </Select>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setValue('react')}
            style={{
              padding: '6px 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 6,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Set React
          </button>
          <button
            onClick={() => setValue('')}
            style={{
              padding: '6px 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 6,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const FormExample: StoryObj = {
  name: 'Form Example',
  render: () => (
    <form 
      style={{ 
        width: 350, 
        padding: 24, 
        backgroundColor: '#fff', 
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>
        Shipping Information
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Select defaultValue="ph">
          <SelectTrigger label="Country" fullWidth />
          <SelectContent>
            <SelectItem value="ph">Philippines</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger label="State/Province" placeholder="Select..." fullWidth />
          <SelectContent>
            <SelectItem value="ncr">Metro Manila</SelectItem>
            <SelectItem value="cebu">Cebu</SelectItem>
            <SelectItem value="davao">Davao</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger label="Shipping Method" placeholder="Select..." fullWidth />
          <SelectContent>
            <SelectItem value="standard">Standard (5-7 days)</SelectItem>
            <SelectItem value="express">Express (2-3 days)</SelectItem>
            <SelectItem value="overnight">Overnight</SelectItem>
          </SelectContent>
        </Select>
        
        <button
          type="submit"
          style={{
            marginTop: 8,
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
          Continue
        </button>
      </div>
    </form>
  ),
};
