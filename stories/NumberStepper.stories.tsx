import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberStepper } from '../src/components/ui/number-stepper';

const meta: Meta<typeof NumberStepper> = {
  title: 'Components/NumberStepper',
  component: NumberStepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Number Stepper

Quantity input component with increment/decrement buttons.

Based on Figma Design System: [Stepper Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=418-6699)

## Features
- **Inline Layout**: Label left, controls right with divider
- **Circular Buttons**: Outlined +/- buttons
- **Min/Max**: Define value boundaries
- **Step**: Custom step increment
- **States**: Normal, disabled, error
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberStepper>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <NumberStepper label="Habitaciones" defaultValue={0} min={0} max={10} />
    </div>
  ),
};

export const WithValues: Story = {
  name: 'Multiple Values',
  render: () => (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <NumberStepper label="Habitaciones" defaultValue={3} />
      <NumberStepper label="Baños" defaultValue={5} />
    </div>
  ),
};

export const WithoutDivider: Story = {
  name: 'Without Divider',
  render: () => (
    <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <NumberStepper label="Adults" defaultValue={2} showDivider={false} />
      <NumberStepper label="Children" defaultValue={1} showDivider={false} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Normal</p>
        <NumberStepper label="Habitaciones" defaultValue={3} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Disabled</p>
        <NumberStepper label="Habitaciones" defaultValue={5} disabled />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Error</p>
        <NumberStepper 
          label="Habitaciones" 
          defaultValue={0} 
          error 
          errorMessage="This is an error description."
        />
      </div>
    </div>
  ),
};

export const MinMaxBoundary: Story = {
  name: 'At Boundaries',
  render: () => (
    <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <NumberStepper label="At minimum (0)" defaultValue={0} min={0} max={10} />
      <NumberStepper label="At maximum (10)" defaultValue={10} min={0} max={10} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    
    return (
      <div style={{ width: 280 }}>
        <NumberStepper 
          label="Controlled" 
          value={value}
          onChange={setValue}
          min={0}
          max={10}
        />
        <p style={{ fontSize: 13, color: '#71717a', marginTop: 12 }}>
          Current value: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const PropertyForm: Story = {
  name: 'Property Form Example',
  render: () => (
    <div style={{ 
      width: 320, 
      padding: 24, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>
        Property Details
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <NumberStepper label="Bedrooms" defaultValue={2} min={0} max={10} />
        <NumberStepper label="Bathrooms" defaultValue={1} min={1} max={5} />
        <NumberStepper label="Parking Spots" defaultValue={1} min={0} max={4} />
        <NumberStepper label="Max Guests" defaultValue={4} min={1} max={16} />
      </div>
    </div>
  ),
};

export const CompactList: Story = {
  name: 'Compact List',
  render: () => (
    <div style={{ 
      width: 260,
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e4e4e7' }}>
        <NumberStepper label="Habitaciones" defaultValue={0} />
      </div>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e4e4e7' }}>
        <NumberStepper label="Camas" defaultValue={0} />
      </div>
      <div style={{ padding: '12px 16px' }}>
        <NumberStepper label="Baños" defaultValue={0} />
      </div>
    </div>
  ),
};
