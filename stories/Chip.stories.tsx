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

Chip component matching Figma design.

Based on Figma: [Chip](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1478-29203)

## Features
- **2 Variants**: Filled, Outlined
- **States**: Default, Hover, Active/Open, Selected, Disabled
- **Right Elements**: Remove, Dropdown, Count, Custom
- **Divider**: Optional divider before right element
- **Focus Ring**: Accessible focus indicator
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

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Filled Variant */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Filled (Light)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Default:</span>
            <Chip variant="filled">Label</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Hover:</span>
            <Chip variant="filled">Label</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Active:</span>
            <Chip variant="filled" active>Label</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Disabled:</span>
            <Chip variant="filled" disabled>Label</Chip>
          </div>
        </div>
      </div>

      {/* Outlined Variant (Blue) */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Outlined (Blue)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Default:</span>
            <Chip variant="outlined" selected>Label</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Hover:</span>
            <Chip variant="outlined" selected>Label</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Active:</span>
            <Chip variant="outlined" selected active>Label</Chip>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 100, fontSize: 12, color: '#71717a' }}>Disabled:</span>
            <Chip variant="outlined" selected disabled>Label</Chip>
          </div>
        </div>
      </div>
    </div>
  ),
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

export const WithRightElements: Story = {
  name: 'With Right Elements',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* With Dropdown */}
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Dropdown Arrow
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled" rightElement="dropdown">Label</Chip>
          <Chip variant="filled" rightElement="dropdown" active>Label</Chip>
          <Chip variant="outlined" selected rightElement="dropdown">Label</Chip>
          <Chip variant="outlined" selected rightElement="dropdown" active>Label</Chip>
        </div>
      </div>

      {/* With Count */}
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Count
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled" rightElement="count" count={9}>Label</Chip>
          <Chip variant="filled" rightElement="count" count={9} selected>Label</Chip>
          <Chip variant="outlined" selected rightElement="count" count={9}>Label</Chip>
        </div>
      </div>

      {/* With Remove */}
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Remove Button
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled" rightElement="remove">Label</Chip>
          <Chip variant="filled" rightElement="remove" selected>Label</Chip>
          <Chip variant="outlined" selected rightElement="remove">Label</Chip>
        </div>
      </div>

      {/* With Divider */}
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Divider
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled" rightElement="count" count={9} showDivider>Label</Chip>
          <Chip variant="filled" rightElement="dropdown" showDivider>Label</Chip>
          <Chip variant="outlined" selected rightElement="remove" showDivider>Label</Chip>
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
          <Chip size="sm" rightElement="remove">Removable</Chip>
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
          <Chip size="md" rightElement="remove">Removable</Chip>
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
      <Chip leftIcon={Tag} rightElement="dropdown">With Dropdown</Chip>
      <Chip leftIcon={Star} rightElement="count" count={5}>With Count</Chip>
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
            <Chip key={chip} rightElement="remove" onRemove={() => removeChip(chip)}>
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

export const DropdownExample: Story = {
  name: 'Dropdown Chips',
  render: () => {
    const [activeChip, setActiveChip] = React.useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip 
            variant="filled"
            rightElement="dropdown"
            active={activeChip === 'option1'}
            onClick={() => setActiveChip(activeChip === 'option1' ? null : 'option1')}
          >
            Option 1
          </Chip>
          <Chip 
            variant="filled"
            rightElement="dropdown"
            active={activeChip === 'option2'}
            onClick={() => setActiveChip(activeChip === 'option2' ? null : 'option2')}
          >
            Option 2
          </Chip>
          <Chip 
            variant="outlined"
            selected
            rightElement="dropdown"
            active={activeChip === 'option3'}
            onClick={() => setActiveChip(activeChip === 'option3' ? null : 'option3')}
          >
            Option 3
          </Chip>
        </div>
        {activeChip && (
          <p style={{ fontSize: 12, color: '#71717a' }}>
            Active: {activeChip}
          </p>
        )}
      </div>
    );
  },
};

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Filled States */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Filled - All States</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled">Label</Chip>
          <Chip variant="filled" rightElement="dropdown">Label</Chip>
          <Chip variant="filled" rightElement="dropdown" active>Label</Chip>
          <Chip variant="filled" disabled>Label</Chip>
        </div>
      </div>

      {/* Outlined Selected States */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Outlined Selected - All States</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="outlined" selected>Label</Chip>
          <Chip variant="outlined" selected rightElement="dropdown">Label</Chip>
          <Chip variant="outlined" selected rightElement="dropdown" active>Label</Chip>
          <Chip variant="outlined" selected disabled>Label</Chip>
        </div>
      </div>

      {/* With Count */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>With Count</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled" rightElement="count" count={9}>Label</Chip>
          <Chip variant="filled" rightElement="count" count={9} selected>Label</Chip>
          <Chip variant="outlined" selected rightElement="count" count={9}>Label</Chip>
          <Chip variant="filled" rightElement="count" count={9} showDivider>Label</Chip>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip variant="filled" leftIcon={Tag}>Label</Chip>
          <Chip variant="filled" leftIcon={Tag} rightElement="dropdown">Label</Chip>
          <Chip variant="outlined" selected leftIcon={Star}>Label</Chip>
          <Chip variant="outlined" selected leftIcon={Filter} rightElement="count" count={5}>Label</Chip>
        </div>
      </div>
    </div>
  ),
};
