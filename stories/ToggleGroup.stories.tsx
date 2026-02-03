import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from '../src/components/ui/toggle-group';
import { AlignLeft, AlignCenter, AlignRight, Grid, List, LayoutGrid } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toggle Group

Segmented control for switching between options.

## Features
- **Single/Multiple**: Single or multi-select
- **Icons**: Icon-only or with text
- **Sizes**: sm, md, lg
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('center');
    return (
      <ToggleGroup value={value} onValueChange={(v) => setValue(v as string)}>
        <ToggleGroupItem value="left"><AlignLeft size={16} /></ToggleGroupItem>
        <ToggleGroupItem value="center"><AlignCenter size={16} /></ToggleGroupItem>
        <ToggleGroupItem value="right"><AlignRight size={16} /></ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const WithText: Story = {
  render: () => {
    const [value, setValue] = React.useState('monthly');
    return (
      <ToggleGroup value={value} onValueChange={(v) => setValue(v as string)}>
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['bold']);
    return (
      <ToggleGroup value={value} onValueChange={(v) => setValue(v as string[])} multiple>
        <ToggleGroupItem value="bold"><strong>B</strong></ToggleGroupItem>
        <ToggleGroupItem value="italic"><em>I</em></ToggleGroupItem>
        <ToggleGroupItem value="underline"><u>U</u></ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const ViewSwitcher: Story = {
  name: 'View Switcher',
  render: () => {
    const [view, setView] = React.useState('grid');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <ToggleGroup value={view} onValueChange={(v) => setView(v as string)}>
          <ToggleGroupItem value="list"><List size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="grid"><Grid size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="gallery"><LayoutGrid size={16} /></ToggleGroupItem>
        </ToggleGroup>
        <span style={{ fontSize: 13, color: '#71717a' }}>Current view: {view}</span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <ToggleGroup defaultValue="a" size="sm">
        <ToggleGroupItem value="a">Small</ToggleGroupItem>
        <ToggleGroupItem value="b">Size</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" size="md">
        <ToggleGroupItem value="a">Medium</ToggleGroupItem>
        <ToggleGroupItem value="b">Size</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" size="lg">
        <ToggleGroupItem value="a">Large</ToggleGroupItem>
        <ToggleGroupItem value="b">Size</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const PricingToggle: Story = {
  name: 'Pricing Toggle',
  render: () => {
    const [billing, setBilling] = React.useState('monthly');
    
    return (
      <div style={{ textAlign: 'center' }}>
        <ToggleGroup value={billing} onValueChange={(v) => setBilling(v as string)}>
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="yearly">Yearly (Save 20%)</ToggleGroupItem>
        </ToggleGroup>
        <p style={{ marginTop: 24, fontSize: 32, fontWeight: 700 }}>
          ${billing === 'monthly' ? '29' : '278'}
          <span style={{ fontSize: 16, fontWeight: 400, color: '#71717a' }}>
            /{billing === 'monthly' ? 'mo' : 'yr'}
          </span>
        </p>
      </div>
    );
  },
};
