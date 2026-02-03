import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider, RangeSlider } from '../src/components/ui/slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Slider

Range input slider component.

## Features
- **Single Slider**: One value
- **Range Slider**: Two thumbs for range
- **Step**: Configurable increments
- **Value Display**: Optional value label
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Slider defaultValue={50} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Slider defaultValue={75} showValue />
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>Temperature (0-40°C)</p>
        <Slider defaultValue={22} min={0} max={40} showValue />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>Volume (0-100)</p>
        <Slider defaultValue={60} min={0} max={100} step={5} showValue />
      </div>
    </div>
  ),
};

export const Steps: Story = {
  render: () => (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>Step: 1</p>
        <Slider defaultValue={50} step={1} showValue />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>Step: 10</p>
        <Slider defaultValue={50} step={10} showValue />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>Step: 25</p>
        <Slider defaultValue={50} step={25} showValue />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Slider defaultValue={50} disabled showValue />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(30);
    
    return (
      <div style={{ width: 300 }}>
        <Slider value={value} onChange={setValue} showValue />
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button 
            onClick={() => setValue(0)}
            style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #e4e4e7' }}
          >
            Min
          </button>
          <button 
            onClick={() => setValue(50)}
            style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #e4e4e7' }}
          >
            50
          </button>
          <button 
            onClick={() => setValue(100)}
            style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #e4e4e7' }}
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

export const Range: Story = {
  name: 'Range Slider',
  render: () => (
    <div style={{ width: 300 }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>Price Range</p>
      <RangeSlider defaultValue={[20, 80]} />
    </div>
  ),
};

export const RangeControlled: Story = {
  name: 'Range Slider Controlled',
  render: () => {
    const [value, setValue] = React.useState<[number, number]>([200, 800]);
    
    return (
      <div style={{ width: 300 }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>
          Price: ${value[0]} - ${value[1]}
        </p>
        <RangeSlider 
          value={value} 
          onChange={setValue}
          min={0}
          max={1000}
          step={50}
          minGap={100}
        />
      </div>
    );
  },
};

export const PriceFilter: Story = {
  name: 'Price Filter Example',
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([50, 500]);
    
    return (
      <div style={{ 
        width: 280, 
        padding: 20, 
        backgroundColor: '#fff', 
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Price Range</h3>
        <RangeSlider 
          value={range} 
          onChange={setRange}
          min={0}
          max={1000}
          step={10}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: 12,
          fontSize: 14,
          color: '#3f3f46',
        }}>
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>
      </div>
    );
  },
};
