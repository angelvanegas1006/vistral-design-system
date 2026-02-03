import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../src/components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Calendar

Date picker calendar component.

## Features
- **Date Selection**: Click to select
- **Month Navigation**: Prev/next buttons
- **Today Indicator**: Highlighted today
- **Min/Max Dates**: Range restrictions
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div>
        <Calendar value={date} onChange={setDate} />
        <p style={{ marginTop: 16, fontSize: 13, color: '#71717a' }}>
          Selected: {date?.toLocaleDateString() || 'none'}
        </p>
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>(new Date());
    return <Calendar value={date} onChange={setDate} />;
  },
};

export const WithMinMaxDates: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const [date, setDate] = React.useState<Date | undefined>();
    
    return (
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, color: '#71717a' }}>
          Only dates in current month selectable
        </p>
        <Calendar 
          value={date} 
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    );
  },
};

export const FutureDatesOnly: Story = {
  render: () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const [date, setDate] = React.useState<Date | undefined>();
    
    return (
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, color: '#71717a' }}>
          Only future dates selectable
        </p>
        <Calendar 
          value={date} 
          onChange={setDate}
          minDate={tomorrow}
        />
      </div>
    );
  },
};
