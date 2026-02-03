import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '../src/components/ui/combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Combobox

Select with search and multi-select support.

## Features
- **Searchable**: Filter options by typing
- **Multi-select**: Select multiple values
- **Tags**: Visual tags for selections
- **Clearable**: Remove all selections
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={frameworks}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select framework..."
          label="Framework"
        />
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={frameworks}
          value={value}
          onChange={(v) => setValue(v as string[])}
          placeholder="Select frameworks..."
          label="Frameworks"
          multiple
        />
      </div>
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['react', 'vue']);
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={frameworks}
          value={value}
          onChange={(v) => setValue(v as string[])}
          label="Selected Frameworks"
          multiple
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Combobox
        options={frameworks}
        value="react"
        label="Framework"
        disabled
      />
    </div>
  ),
};

export const ManyOptions: Story = {
  render: () => {
    const options = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));
    
    const [value, setValue] = React.useState<string[]>([]);
    
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={options}
          value={value}
          onChange={(v) => setValue(v as string[])}
          placeholder="Select options..."
          label="Many Options"
          multiple
        />
      </div>
    );
  },
};
