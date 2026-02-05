import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from '../src/components/ui/skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Skeleton

Loading placeholder component.

## Features
- **Basic Skeleton**: Rectangle with shimmer
- **SkeletonText**: Multiple text lines
- **SkeletonCard**: Card placeholder
- **SkeletonAvatar**: Circle placeholder
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Skeleton width="100%" height={20} />
      <Skeleton width="80%" height={20} />
      <Skeleton width="60%" height={20} />
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Skeleton width={100} height={100} radius="none" />
      <Skeleton width={100} height={100} radius="md" />
      <Skeleton width={100} height={100} radius="lg" />
      <Skeleton width={100} height={100} circle />
    </div>
  ),
}

export const Text: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <SkeletonText lines={4} />
    </div>
  ),
}

export const Avatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SkeletonAvatar size={32} />
      <SkeletonAvatar size={40} />
      <SkeletonAvatar size={48} />
      <SkeletonAvatar size={64} />
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <SkeletonCard style={{ width: 280 }} />
      <SkeletonCard style={{ width: 280 }} showImage={false} />
    </div>
  ),
}

export const ProfileCard: Story = {
  name: 'Profile Card Loading',
  render: () => (
    <div
      style={{
        width: 350,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <SkeletonAvatar size={64} />
        <div style={{ flex: 1 }}>
          <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Skeleton width={100} height={36} radius="full" />
        <Skeleton width={100} height={36} radius="full" />
      </div>
    </div>
  ),
}

export const TableLoading: Story = {
  name: 'Table Loading',
  render: () => (
    <div
      style={{
        width: 500,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: 16,
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <Skeleton width={120} height={16} />
        <Skeleton width={100} height={16} />
        <Skeleton width={80} height={16} />
        <Skeleton width={60} height={16} />
      </div>

      {/* Rows */}
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 16,
            padding: 16,
            borderBottom: i < 4 ? '1px solid #e4e4e7' : 'none',
            alignItems: 'center',
          }}
        >
          <div style={{ width: 120, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SkeletonAvatar size={32} />
            <Skeleton width={70} height={14} />
          </div>
          <Skeleton width={100} height={14} />
          <Skeleton width={80} height={14} />
          <Skeleton width={60} height={24} radius="full" />
        </div>
      ))}
    </div>
  ),
}

export const NoAnimation: Story = {
  name: 'Without Animation',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
      <Skeleton width="100%" height={20} animate={false} />
      <Skeleton width="80%" height={20} animate={false} />
      <Skeleton width="60%" height={20} animate={false} />
    </div>
  ),
}
