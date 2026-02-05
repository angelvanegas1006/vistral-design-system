import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Timeline, TimelineItem } from '../src/components/ui/timeline'
import { Package, Truck, Home, CreditCard, FileText, CheckCircle } from 'lucide-react'

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Timeline

Timeline component matching Figma design.

Based on Figma:
- [Timeline Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4683-51025)

## Features
- **Node (Marker)**: Visual indicator with icons or dots
- **Connector (Line)**: Vertical stroke connecting sequential nodes
- **Title Text**: Primary label for milestone
- **Description**: Optional secondary text
- **Status**: Default, Active, Success, Error, Warning, Pending
- **Accessibility**: ARIA labels, semantic HTML

## Best Practices
- Maintain visual continuity with connector
- Color-code for meaning (green=completed, red=error)
- Keep titles under 5 words
- Center nodes relative to connector
- Don't overcrowd with information
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline>
        <TimelineItem title="Title Text" description="This is a card description." />
        <TimelineItem title="Title Text" description="This is a card description." />
        <TimelineItem title="Title Text" description="This is a card description." />
        <TimelineItem title="Title Text" description="This is a card description." />
        <TimelineItem title="Title Text" description="This is a card description." />
        <TimelineItem
          title="Title Text"
          description="This is a card description."
          status="success"
        />
      </Timeline>
    </div>
  ),
}

export const WithStatuses: Story = {
  name: 'With Different Statuses',
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
          title="Quality Check"
          description="Verifying item quality"
          time="Today, 11:30 AM"
          status="pending"
        />
        <TimelineItem
          title="Shipped"
          description="On the way to you"
          time="Tomorrow"
          status="default"
        />
        <TimelineItem title="Delivered" description="Enjoy your purchase" status="default" />
      </Timeline>
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'With Custom Icons',
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
          status="success"
        />
      </Timeline>
    </div>
  ),
}

export const WithError: Story = {
  name: 'With Error State',
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline>
        <TimelineItem title="Payment Initiated" status="success" time="10:00 AM" />
        <TimelineItem
          title="Payment Failed"
          description="Insufficient funds"
          status="error"
          time="10:01 AM"
        />
        <TimelineItem
          title="Retry Pending"
          description="Scheduled for 2:00 PM"
          time="Scheduled for 2:00 PM"
          status="pending"
        />
      </Timeline>
    </div>
  ),
}

export const InvestmentCycle: Story = {
  name: 'Investment Cycle Example',
  render: () => (
    <div style={{ width: 500 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600 }}>
        Property Acquisition Timeline
      </h3>
      <Timeline>
        <TimelineItem
          title="Property Valuation"
          description="Initial assessment completed"
          time="June 2025"
          status="success"
        />
        <TimelineItem
          title="Due Diligence"
          description="Legal and financial review"
          time="July 2025"
          status="success"
        />
        <TimelineItem
          title="Contract Negotiation"
          description="Terms and conditions discussion"
          time="August 2025"
          status="active"
        />
        <TimelineItem
          title="Closing"
          description="Final documentation and transfer"
          time="September 2025"
          status="pending"
        />
      </Timeline>
    </div>
  ),
}

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
          status="success"
          icon={FileText}
        />
        <TimelineItem
          title="Comment added"
          description="John left a comment on Task #123"
          time="4 hours ago"
          status="success"
        />
        <TimelineItem
          title="Status changed"
          description="Task moved to In Progress"
          time="Yesterday"
          status="active"
        />
        <TimelineItem
          title="Task created"
          description="New task: Update documentation"
          time="2 days ago"
          status="success"
        />
      </Timeline>
    </div>
  ),
}

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => (
    <div style={{ width: 400 }}>
      <Timeline>
        <TimelineItem
          title="Completed Step"
          description="This step is completed"
          status="success"
        />
        <TimelineItem title="Active Step" description="Currently in progress" status="active" />
        <TimelineItem title="Pending Step" description="Waiting to start" status="pending" />
        <TimelineItem title="Error Step" description="Something went wrong" status="error" />
        <TimelineItem title="Warning Step" description="Needs attention" status="warning" />
        <TimelineItem title="Default Step" description="Standard state" status="default" />
      </Timeline>
    </div>
  ),
}

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 24,
        backgroundColor: '#f8fafc',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Basic Timeline</h3>
        <div style={{ width: 400 }}>
          <Timeline>
            <TimelineItem title="Title Text" description="This is a card description." />
            <TimelineItem title="Title Text" description="This is a card description." />
            <TimelineItem title="Title Text" description="This is a card description." />
            <TimelineItem title="Title Text" description="This is a card description." />
            <TimelineItem title="Title Text" description="This is a card description." />
            <TimelineItem
              title="Title Text"
              description="This is a card description."
              status="success"
            />
          </Timeline>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Statuses</h3>
        <div style={{ width: 400 }}>
          <Timeline>
            <TimelineItem
              title="Completed"
              description="Step completed successfully"
              status="success"
            />
            <TimelineItem
              title="In Progress"
              description="Currently working on this"
              status="active"
            />
            <TimelineItem title="Pending" description="Waiting to start" status="pending" />
            <TimelineItem title="Error" description="An error occurred" status="error" />
          </Timeline>
        </div>
      </div>
    </div>
  ),
}

export const LongProcess: Story = {
  name: 'Long Process Example',
  render: () => (
    <div style={{ width: 500 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600 }}>
        Legal Documentation Process
      </h3>
      <Timeline>
        <TimelineItem
          title="Initial Review"
          description="Documents submitted for review"
          time="Week 1"
          status="success"
        />
        <TimelineItem
          title="Legal Analysis"
          description="Compliance check completed"
          time="Week 2"
          status="success"
        />
        <TimelineItem
          title="Revision Request"
          description="Minor corrections needed"
          time="Week 3"
          status="warning"
        />
        <TimelineItem
          title="Resubmission"
          description="Updated documents received"
          time="Week 4"
          status="success"
        />
        <TimelineItem
          title="Final Approval"
          description="Awaiting final sign-off"
          time="Week 5"
          status="active"
        />
        <TimelineItem
          title="Completed"
          description="All documentation finalized"
          status="pending"
        />
      </Timeline>
    </div>
  ),
}
