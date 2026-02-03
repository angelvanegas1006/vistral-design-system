import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipGroup } from '../src/components/ui/chip';
import { Tag, Star, Filter, User } from 'lucide-react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Chip

Based on Figma Design System: [Chip Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1476-26875)

## Features
- **2 Variants**: Filled, Outlined
- **2 Sizes**: Small (24px), Medium (32px)
- **States**: Default, Selected, Disabled
- **Removable**: Optional remove button
- **Icons**: Optional left icon
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Chip',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Filled
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled">Default</Chip>
          <Chip variant="filled" selected>Selected</Chip>
          <Chip variant="filled" disabled>Disabled</Chip>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Outlined
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="outlined">Default</Chip>
          <Chip variant="outlined" selected>Selected</Chip>
          <Chip variant="outlined" disabled>Disabled</Chip>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Small (24px)
        </h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Chip size="sm">Small</Chip>
          <Chip size="sm" selected>Selected</Chip>
          <Chip size="sm" leftIcon={Tag}>With Icon</Chip>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Medium (32px)
        </h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Chip size="md">Medium</Chip>
          <Chip size="md" selected>Selected</Chip>
          <Chip size="md" leftIcon={Tag}>With Icon</Chip>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip leftIcon={Tag}>Tag</Chip>
      <Chip leftIcon={Star}>Featured</Chip>
      <Chip leftIcon={Filter}>Filter</Chip>
      <Chip leftIcon={User}>User</Chip>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [chips, setChips] = React.useState(['React', 'TypeScript', 'Tailwind', 'Storybook']);
    
    const removeChip = (chip: string) => {
      setChips(chips.filter(c => c !== chip));
    };
    
    const resetChips = () => {
      setChips(['React', 'TypeScript', 'Tailwind', 'Storybook']);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {chips.map(chip => (
            <Chip key={chip} removable onRemove={() => removeChip(chip)}>
              {chip}
            </Chip>
          ))}
        </div>
        {chips.length === 0 && (
          <button 
            onClick={resetChips}
            style={{
              padding: '8px 16px',
              border: '1px solid #d4d4d8',
              borderRadius: 8,
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            Reset chips
          </button>
        )}
      </div>
    );
  },
};

export const FilterExample: Story = {
  name: 'Filter Selection',
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['All']);
    
    const filters = ['All', '1 Bed', '2 Beds', '3 Beds', '4+ Beds'];
    
    const toggleFilter = (filter: string) => {
      if (filter === 'All') {
        setSelected(['All']);
      } else {
        const newSelected = selected.includes(filter)
          ? selected.filter(f => f !== filter)
          : [...selected.filter(f => f !== 'All'), filter];
        setSelected(newSelected.length ? newSelected : ['All']);
      }
    };
    
    return (
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>
          Bedrooms
        </h3>
        <ChipGroup>
          {filters.map(filter => (
            <Chip 
              key={filter}
              variant="outlined"
              selected={selected.includes(filter)}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </Chip>
          ))}
        </ChipGroup>
      </div>
    );
  },
};

export const TagsInput: Story = {
  name: 'Tags Input',
  render: () => {
    const [tags, setTags] = React.useState(['JavaScript', 'React']);
    const [input, setInput] = React.useState('');
    
    const addTag = () => {
      if (input.trim() && !tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
        setInput('');
      }
    };
    
    const removeTag = (tag: string) => {
      setTags(tags.filter(t => t !== tag));
    };
    
    return (
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
        width: 350,
      }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 8, 
          fontSize: 14, 
          fontWeight: 500 
        }}>
          Skills
        </label>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 8, 
          padding: 8,
          border: '1px solid #d4d4d8',
          borderRadius: 8,
          minHeight: 44,
        }}>
          {tags.map(tag => (
            <Chip 
              key={tag} 
              size="sm" 
              removable 
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Chip>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add skill..."
            style={{
              flex: 1,
              minWidth: 80,
              border: 'none',
              outline: 'none',
              fontSize: 14,
              padding: '4px 0',
            }}
          />
        </div>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>
          Press Enter to add a skill
        </p>
      </div>
    );
  },
};
