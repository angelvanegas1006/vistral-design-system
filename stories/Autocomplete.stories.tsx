import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from '../src/components/ui/autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Autocomplete

Search input with suggestions dropdown.

## Features
- **Filterable Options**: Type to filter
- **Keyboard Navigation**: Arrow keys + Enter
- **Clearable**: Clear button
- **Loading State**: Async support
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <div style={{ width: 300 }}>
        <Autocomplete
          options={fruits}
          value={value}
          onChange={setValue}
          placeholder="Search fruits..."
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = React.useState('apple');
    return (
      <div style={{ width: 300 }}>
        <Autocomplete
          options={fruits}
          value={value}
          onChange={setValue}
          placeholder="Search fruits..."
        />
        <p style={{ marginTop: 8, fontSize: 13, color: '#71717a' }}>
          Selected: {value || 'none'}
        </p>
      </div>
    );
  },
};

export const Countries: Story = {
  render: () => {
    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
    ];
    
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 300 }}>
        <Autocomplete
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Select country..."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Autocomplete
        options={fruits}
        value="apple"
        placeholder="Search..."
        disabled
      />
    </div>
  ),
};
