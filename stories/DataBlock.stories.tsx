import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataBlock, DataBlockGrid } from '../src/components/ui/data-block';
import { DollarSign, Users, ShoppingCart, TrendingUp, Eye, MousePointer } from 'lucide-react';

const meta: Meta<typeof DataBlock> = {
  title: 'Components/DataBlock',
  component: DataBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Data Block

Metric/KPI display component.

## Features
- **Value Display**: Large formatted values
- **Trend Indicator**: Up/down percentage
- **Icon**: Optional icon display
- **Loading State**: Skeleton loading
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataBlock>;

export const Default: Story = {
  render: () => (
    <DataBlock
      label="Total Revenue"
      value="$45,231"
      trend={12.5}
      trendLabel="vs last month"
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <DataBlock
      label="Total Revenue"
      value="$45,231"
      trend={12.5}
      trendLabel="vs last month"
      icon={DollarSign}
      iconBg="#dcfce7"
      iconColor="#16a34a"
    />
  ),
};

export const NegativeTrend: Story = {
  render: () => (
    <DataBlock
      label="Bounce Rate"
      value="42.3%"
      trend={-8.2}
      trendLabel="vs last week"
      icon={MousePointer}
      iconBg="#fee2e2"
      iconColor="#dc2626"
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <DataBlock label="Small" value="1,234" size="sm" />
      <DataBlock label="Medium" value="1,234" size="md" />
      <DataBlock label="Large" value="1,234" size="lg" />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <DataBlock
      label="Loading..."
      value=""
      loading
      icon={DollarSign}
    />
  ),
};

export const DashboardGrid: Story = {
  name: 'Dashboard Grid',
  render: () => (
    <DataBlockGrid columns={4} style={{ width: 900 }}>
      <DataBlock
        label="Total Revenue"
        value="$45,231"
        trend={12.5}
        icon={DollarSign}
        iconBg="#dcfce7"
        iconColor="#16a34a"
      />
      <DataBlock
        label="Active Users"
        value="2,345"
        trend={8.2}
        icon={Users}
        iconBg="#dbeafe"
        iconColor="#2563eb"
      />
      <DataBlock
        label="Orders"
        value="1,234"
        trend={-3.1}
        icon={ShoppingCart}
        iconBg="#fef3c7"
        iconColor="#d97706"
      />
      <DataBlock
        label="Conversion"
        value="3.24%"
        trend={1.8}
        icon={TrendingUp}
        iconBg="#f3e8ff"
        iconColor="#9333ea"
      />
    </DataBlockGrid>
  ),
};

export const AnalyticsDashboard: Story = {
  name: 'Analytics Dashboard',
  render: () => (
    <div style={{ width: 700 }}>
      <DataBlockGrid columns={3}>
        <DataBlock
          label="Page Views"
          value="124,892"
          trend={18.2}
          trendLabel="vs last period"
          icon={Eye}
        />
        <DataBlock
          label="Unique Visitors"
          value="45,678"
          trend={12.4}
          trendLabel="vs last period"
          icon={Users}
        />
        <DataBlock
          label="Avg. Session"
          value="4m 32s"
          trend={-5.1}
          trendLabel="vs last period"
        />
      </DataBlockGrid>
    </div>
  ),
};
