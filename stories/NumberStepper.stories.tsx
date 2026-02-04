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
- **Increment/Decrement**: +/- buttons for easy quantity adjustment
- **Min/Max**: Define value boundaries
- **Step**: Custom step increment
- **Labels**: Built-in label and helper text
- **States**: Normal, disabled, error
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberStepper>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 1,
    min: 0,
    max: 10,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NumberStepper label="Habitaciones" defaultValue={2} />
      <NumberStepper label="Baños" defaultValue={1} />
      <NumberStepper label="Huéspedes" defaultValue={4} />
    </div>
  ),
};

export const MinMax: Story = {
  name: 'Min/Max Limits',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NumberStepper 
        label="Adults (min 1, max 10)" 
        defaultValue={2} 
        min={1} 
        max={10} 
      />
      <NumberStepper 
        label="Children (min 0, max 5)" 
        defaultValue={0} 
        min={0} 
        max={5} 
      />
    </div>
  ),
};

export const CustomStep: Story = {
  name: 'Custom Step',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NumberStepper 
        label="Quantity (step 5)" 
        defaultValue={10} 
        step={5}
        min={0}
        max={100}
      />
      <NumberStepper 
        label="Price (step 10)" 
        defaultValue={50} 
        step={10}
        min={0}
        max={200}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NumberStepper label="Normal" defaultValue={3} />
      <NumberStepper label="Disabled" defaultValue={5} disabled />
      <NumberStepper 
        label="Error" 
        defaultValue={0} 
        error 
        errorMessage="Minimum 1 required"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <NumberStepper 
      label="Habitaciones" 
      defaultValue={2} 
      min={1}
      max={8}
      helperText="Máximo 8 habitaciones por reserva"
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <NumberStepper 
          label="Controlled Value" 
          value={value}
          onChange={setValue}
          min={0}
          max={10}
        />
        <p style={{ fontSize: 14, color: '#71717a' }}>
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
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <NumberStepper label="Bedrooms" defaultValue={2} min={0} max={10} />
        <NumberStepper label="Bathrooms" defaultValue={1} min={1} max={5} />
        <NumberStepper label="Parking Spots" defaultValue={1} min={0} max={4} />
        <NumberStepper label="Max Guests" defaultValue={4} min={1} max={16} />
      </div>
    </div>
  ),
};
