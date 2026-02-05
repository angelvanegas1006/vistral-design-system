import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Rating, RatingDisplay } from '../src/components/ui/rating'

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Rating

Star rating component.

## Features
- **Interactive**: Click to rate
- **Half Stars**: Allow half ratings
- **Read-Only**: Display mode
- **Sizes**: sm, md, lg, xl
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(3)
    return <Rating value={value} onChange={setValue} />
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState(4)
    return <Rating value={value} onChange={setValue} showValue />
  },
}

export const HalfStars: Story = {
  render: () => {
    const [value, setValue] = React.useState(3.5)
    return <Rating value={value} onChange={setValue} allowHalf showValue />
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Rating defaultValue={3} size="sm" />
      <Rating defaultValue={3} size="md" />
      <Rating defaultValue={3} size="lg" />
      <Rating defaultValue={3} size="xl" />
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => <Rating value={4} readOnly />,
}

export const Disabled: Story = {
  render: () => <Rating value={3} disabled />,
}

export const Display: Story = {
  name: 'Rating Display',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RatingDisplay value={4.5} count={128} />
      <RatingDisplay value={4.8} count={1024} size="md" />
      <RatingDisplay value={3.2} count={56} size="lg" />
    </div>
  ),
}

export const ProductCard: Story = {
  name: 'Product Card Example',
  render: () => (
    <div
      style={{
        width: 280,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <div
        style={{
          height: 160,
          backgroundColor: '#f4f4f5',
          borderRadius: 8,
          marginBottom: 12,
        }}
      />
      <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600 }}>Product Name</h3>
      <RatingDisplay value={4.5} count={128} size="sm" />
      <p style={{ margin: '8px 0 0', fontSize: 18, fontWeight: 700, color: '#2050f6' }}>$99.00</p>
    </div>
  ),
}
