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

Combobox component matching Figma design.

Based on Figma: [Combobox](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1938-37566)

## Features
- **Searchable**: Filter options with search input in dropdown
- **Multi-select**: Select multiple values with tags
- **Count Badge**: Show number of selected items
- **Error State**: Error message and red border
- **Highlighting**: Highlight matching text in options
- **No Results**: Handle empty search results
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const items = Array.from({ length: 15 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));

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
          options={items}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select an element"
          label="Label"
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  name: 'With Selection',
  render: () => {
    const [value, setValue] = React.useState<string>('item-3');
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={items}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select an element"
          label="Label"
          showCount
        />
      </div>
    );
  },
};

export const MultiSelect: Story = {
  name: 'Multi-select',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={items}
          value={value}
          onChange={(v) => setValue(v as string[])}
          placeholder="Select an element"
          label="Label"
          multiple
          showCount
        />
      </div>
    );
  },
};

export const MultiSelectWithManySelected: Story = {
  name: 'Multi-select with Many Selected',
  render: () => {
    const [value, setValue] = React.useState<string[]>(
      Array.from({ length: 15 }, (_, i) => `item-${i + 1}`)
    );
    return (
      <div style={{ width: 400 }}>
        <Combobox
          options={items}
          value={value}
          onChange={(v) => setValue(v as string[])}
          placeholder="Select an element"
          label="Label"
          multiple
          showCount
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Combobox
        options={items}
        placeholder="Select an element"
        label="Label"
        disabled
        showCount
      />
    </div>
  ),
};

export const DisabledWithValue: Story = {
  name: 'Disabled with Value',
  render: () => (
    <div style={{ width: 300 }}>
      <Combobox
        options={items}
        value="item-3"
        placeholder="Select an element"
        label="Label"
        disabled
        showCount
      />
    </div>
  ),
};

export const ErrorState: Story = {
  name: 'Error State',
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={items}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select an element"
          label="Label"
          error="This is an input description."
        />
      </div>
    );
  },
};

export const WithDescription: Story = {
  name: 'With Description',
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={items}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select an element"
          label="Label"
          description="Please select an option from the list"
        />
      </div>
    );
  },
};

export const NoSearchable: Story = {
  name: 'Not Searchable',
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={items}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select an element"
          label="Label"
          searchable={false}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Default */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Default</h3>
        <div style={{ width: 300 }}>
          <Combobox
            options={items}
            placeholder="Select an element"
            label="Label"
            showCount
          />
        </div>
      </div>

      {/* Disabled */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Disabled</h3>
        <div style={{ width: 300 }}>
          <Combobox
            options={items}
            placeholder="Select an element"
            label="Label"
            disabled
            showCount
          />
        </div>
      </div>

      {/* With Selection */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>With Selection</h3>
        <div style={{ width: 300 }}>
          <Combobox
            options={items}
            value="item-3"
            placeholder="Select an element"
            label="Label"
            showCount
          />
        </div>
      </div>

      {/* Multi-select */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Multi-select</h3>
        <div style={{ width: 400 }}>
          <Combobox
            options={items}
            value={['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6']}
            placeholder="Select an element"
            label="Label"
            multiple
            showCount
          />
        </div>
      </div>

      {/* Error */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Error State</h3>
        <div style={{ width: 300 }}>
          <Combobox
            options={items}
            placeholder="Select an element"
            label="Label"
            error="This is an input description."
            showCount
          />
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
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
        {value && (
          <p style={{ marginTop: 12, fontSize: 13, color: '#71717a' }}>
            Selected: {frameworks.find(f => f.value === value)?.label}
          </p>
        )}
      </div>
    );
  },
};

export const ManyOptions: Story = {
  name: 'Many Options',
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
          showCount
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  name: 'With Disabled Options',
  render: () => {
    const options = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2', disabled: true },
      { value: 'opt3', label: 'Option 3' },
      { value: 'opt4', label: 'Option 4', disabled: true },
      { value: 'opt5', label: 'Option 5' },
    ];
    
    const [value, setValue] = React.useState<string>('');
    
    return (
      <div style={{ width: 300 }}>
        <Combobox
          options={options}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="Select an option"
          label="Options"
        />
      </div>
    );
  },
};
