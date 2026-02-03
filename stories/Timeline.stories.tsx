import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from '../src/components/ui/timeline';
import { Package, Truck, Home, CreditCard } from 'lucide-react';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Timeline

Vertical timeline for events/history.

## Features
- **Status**: Default, active, success, error
- **Icons**: Custom icons per item
- **Position**: Left, right, or alternate
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline>
        <TimelineItem 
          title="Order Placed"
          description="Your order has been confirmed"
          time="Today, 10:30 AM"
          status="success"
        />
        <TimelineItem 
          title="Processing"
          description="We're preparing your order"
          time="Today, 11:00 AM"
          status="active"
        />
        <TimelineItem 
          title="Shipped"
          description="On the way to you"
        />
        <TimelineItem 
          title="Delivered"
          description="Enjoy your purchase"
        />
      </Timeline>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline>
        <TimelineItem 
          title="Payment Received"
          description="$99.00 charged to card ending 4242"
          time="Dec 1, 2024"
          status="success"
          icon={CreditCard}
        />
        <TimelineItem 
          title="Order Processed"
          description="Items packed and ready"
          time="Dec 2, 2024"
          status="success"
          icon={Package}
        />
        <TimelineItem 
          title="In Transit"
          description="Expected delivery: Dec 5"
          time="Dec 3, 2024"
          status="active"
          icon={Truck}
        />
        <TimelineItem 
          title="Delivered"
          description="Package delivered"
          icon={Home}
        />
      </Timeline>
    </div>
  ),
};

export const ActivityLog: Story = {
  name: 'Activity Log',
  render: () => (
    <div style={{ width: 400 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Recent Activity</h3>
      <Timeline>
        <TimelineItem 
          title="File uploaded"
          description="document.pdf was added to the project"
          time="2 hours ago"
        />
        <TimelineItem 
          title="Comment added"
          description="John left a comment on Task #123"
          time="4 hours ago"
        />
        <TimelineItem 
          title="Status changed"
          description="Task moved to In Progress"
          time="Yesterday"
        />
        <TimelineItem 
          title="Task created"
          description="New task: Update documentation"
          time="2 days ago"
        />
      </Timeline>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline>
        <TimelineItem 
          title="Payment Initiated"
          status="success"
          time="10:00 AM"
        />
        <TimelineItem 
          title="Payment Failed"
          description="Insufficient funds"
          status="error"
          time="10:01 AM"
        />
        <TimelineItem 
          title="Retry Pending"
          time="Scheduled for 2:00 PM"
        />
      </Timeline>
    </div>
  ),
};
