import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../src/components/ui/date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Date Picker

Input with calendar dropdown.

## Features
- **Calendar Dropdown**: Click to open
- **Date Format**: Customizable display
- **Min/Max Dates**: Range restrictions
- **Clearable**: Remove selection
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Select Date"
        />
      </div>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Date"
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Appointment Date"
          helperText="Select your preferred appointment date"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Due Date"
          error
          helperText="Please select a valid date"
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
      <div style={{ width: 280 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Booking Date"
          helperText="Only future dates available"
          minDate={tomorrow}
        />
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    
    const formatDate = (d: Date) => {
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };
    
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          label="Event Date"
          formatDate={formatDate}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <DatePicker
        value={new Date()}
        label="Date"
        disabled
      />
    </div>
  ),
};
