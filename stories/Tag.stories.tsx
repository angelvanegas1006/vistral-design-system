import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/ui/tag';
import { CreditCard, Star, Check } from 'lucide-react';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tag

Tag component matching Figma design.

Based on Figma:
- [Tag Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=166-3243)

## Features
- **6 Variants**: Default, Outlined, Dark, Error, Success, Info
- **3 Sizes**: Small, Medium, Large
- **Icons**: Optional icons for visual recognition
- **Closable**: Optional close button
- **Clickable**: Can be made interactive
- **Accessibility**: ARIA labels, keyboard navigation

## Best Practices
- Use for short, single-word labels
- Group similar tags together
- Keep text brief and to the point
- Don't use for long sentences or phrases
- Don't overuse tags in a single space
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Tag',
    variant: 'default',
    size: 'md',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Medium Size
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="default">Tag</Tag>
          <Tag variant="outlined">Tag</Tag>
          <Tag variant="dark">Tag</Tag>
          <Tag variant="error">Tag</Tag>
          <Tag variant="success">Tag</Tag>
          <Tag variant="info">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Small Size
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="default" size="sm">Tag</Tag>
          <Tag variant="outlined" size="sm">Tag</Tag>
          <Tag variant="dark" size="sm">Tag</Tag>
          <Tag variant="error" size="sm">Tag</Tag>
          <Tag variant="success" size="sm">Tag</Tag>
          <Tag variant="info" size="sm">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Large Size
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="default" size="lg">Tag</Tag>
          <Tag variant="outlined" size="lg">Tag</Tag>
          <Tag variant="dark" size="lg">Tag</Tag>
          <Tag variant="error" size="lg">Tag</Tag>
          <Tag variant="success" size="lg">Tag</Tag>
          <Tag variant="info" size="lg">Tag</Tag>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag icon={CreditCard}>Visa</Tag>
        <Tag icon={Star} variant="success">Featured</Tag>
        <Tag icon={Check} variant="info">Verified</Tag>
      </div>
    </div>
  ),
};

export const Closable: Story = {
  name: 'Closable Tags',
  render: () => {
    const [tags, setTags] = React.useState(['React', 'Vue', 'Angular', 'Svelte']);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              closable
              onClose={() => setTags(tags.filter(t => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
        </div>
        {tags.length === 0 && (
          <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>
            All tags removed
          </p>
        )}
      </div>
    );
  },
};

export const Clickable: Story = {
  name: 'Clickable Tags',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag clickable onClick={() => alert('Tag clicked!')}>
          Filter: Active
        </Tag>
        <Tag clickable variant="success" onClick={() => alert('Tag clicked!')}>
          Filter: Completed
        </Tag>
        <Tag clickable variant="error" onClick={() => alert('Tag clicked!')}>
          Filter: Error
        </Tag>
      </div>
    </div>
  ),
};

export const StatusTags: Story = {
  name: 'Status Tags',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag variant="success">Active</Tag>
        <Tag variant="error">Pending</Tag>
        <Tag variant="default">Archived</Tag>
        <Tag variant="info">In Progress</Tag>
      </div>
    </div>
  ),
};

export const CategoryTags: Story = {
  name: 'Category Tags',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tag>Travel</Tag>
        <Tag>Food</Tag>
        <Tag>Technology</Tag>
        <Tag>Design</Tag>
        <Tag>Marketing</Tag>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Default Variant
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag size="sm">Tag</Tag>
          <Tag size="md">Tag</Tag>
          <Tag size="lg">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Outlined Variant
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="outlined" size="sm">Tag</Tag>
          <Tag variant="outlined" size="md">Tag</Tag>
          <Tag variant="outlined" size="lg">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Dark Variant
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="dark" size="sm">Tag</Tag>
          <Tag variant="dark" size="md">Tag</Tag>
          <Tag variant="dark" size="lg">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Error Variant
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="error" size="sm">Tag</Tag>
          <Tag variant="error" size="md">Tag</Tag>
          <Tag variant="error" size="lg">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Success Variant
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="success" size="sm">Tag</Tag>
          <Tag variant="success" size="md">Tag</Tag>
          <Tag variant="success" size="lg">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Info Variant
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="info" size="sm">Tag</Tag>
          <Tag variant="info" size="md">Tag</Tag>
          <Tag variant="info" size="lg">Tag</Tag>
        </div>
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  name: 'Use Cases',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          User Profile - Skills
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Node.js</Tag>
          <Tag>PostgreSQL</Tag>
          <Tag>Docker</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Blog Post - Categories
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="info">Technology</Tag>
          <Tag variant="success">Tutorial</Tag>
          <Tag variant="default">Web Development</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Search Results - Keywords
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag clickable onClick={() => alert('Filter by: High Priority')}>
            High Priority
          </Tag>
          <Tag clickable onClick={() => alert('Filter by: Travel')}>
            Travel
          </Tag>
          <Tag clickable onClick={() => alert('Filter by: Urgent')}>
            Urgent
          </Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Status Indicators
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="success">Active</Tag>
          <Tag variant="error">Pending</Tag>
          <Tag variant="default">Archived</Tag>
          <Tag variant="info">In Progress</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Filter Tags (Closable)
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag closable onClose={() => alert('Removed')}>Category: Design</Tag>
          <Tag closable onClose={() => alert('Removed')}>Status: Active</Tag>
          <Tag closable onClose={() => alert('Removed')}>Priority: High</Tag>
        </div>
      </div>
    </div>
  ),
};

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>All Variants - Medium Size</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag variant="default">Tag</Tag>
          <Tag variant="outlined">Tag</Tag>
          <Tag variant="dark">Tag</Tag>
          <Tag variant="error">Tag</Tag>
          <Tag variant="success">Tag</Tag>
          <Tag variant="info">Tag</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Icons</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag icon={CreditCard}>Visa</Tag>
          <Tag icon={Star} variant="success">Featured</Tag>
          <Tag icon={Check} variant="info">Verified</Tag>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Closable</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <Tag closable onClose={() => {}}>Tag</Tag>
          <Tag closable variant="success" onClose={() => {}}>Tag</Tag>
          <Tag closable variant="error" onClose={() => {}}>Tag</Tag>
        </div>
      </div>
    </div>
  ),
};
