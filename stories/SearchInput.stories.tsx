import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../src/components/ui/search-input';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Search Input

Search input component matching Figma design.

Based on Figma:
- [Search Input Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=218-1949)

## Features
- **Search Icon**: Magnifying glass icon on the left
- **Clear Button**: X button appears when there's text
- **Filter Button**: Optional filter button with badge count
- **States**: Default, Focused, Filled, Disabled, Error
- **Accessibility**: role="search", aria-labels, keyboard navigation

## Best Practices
- Keep it simple and consistent
- Provide filter button for advanced searches
- Provide instant feedback
- Use clear and specific placeholder text
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const Focused: Story = {
  name: 'Focused State',
  render: () => {
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    React.useEffect(() => {
      inputRef.current?.focus();
    }, []);
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          ref={inputRef}
          value={value}
          onChange={setValue}
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const Filled: Story = {
  name: 'Filled State',
  render: () => {
    const [value, setValue] = React.useState('Searching');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  name: 'With Value',
  render: () => {
    const [value, setValue] = React.useState('First search value');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const WithFilter: Story = {
  name: 'With Filter Button',
  render: () => {
    const [value, setValue] = React.useState('');
    const [filterCount, setFilterCount] = React.useState(0);
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
          showFilter
          filterCount={filterCount}
          onFilterClick={() => {
            setFilterCount(filterCount === 0 ? 1 : 0);
            alert('Filter clicked');
          }}
        />
      </div>
    );
  },
};

export const WithFilterActive: Story = {
  name: 'With Active Filter',
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
          showFilter
          filterCount={1}
          onFilterClick={() => alert('Filter clicked')}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  render: () => (
    <div style={{ width: 400 }}>
      <SearchInput
        value=""
        placeholder="Search..."
        disabled
      />
    </div>
  ),
};

export const Error: Story = {
  name: 'Error State',
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
          error
          helperText="Please enter a valid search term"
        />
      </div>
    );
  },
};

export const Rounded: Story = {
  name: 'Rounded (Pill Shape)',
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
          rounded
        />
      </div>
    );
  },
};

export const FilledBackground: Story = {
  name: 'Filled Background',
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search..."
          filled
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
        <SearchInput
          value={value1}
          onChange={setValue1}
          placeholder="Small search..."
          size="sm"
        />
        <SearchInput
          value={value2}
          onChange={setValue2}
          placeholder="Medium search..."
          size="md"
        />
        <SearchInput
          value={value3}
          onChange={setValue3}
          placeholder="Large search..."
          size="lg"
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Default/Empty</p>
        <SearchInput
          value=""
          placeholder="Search..."
        />
      </div>
      
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Focused/Typing</p>
        <SearchInput
          value=""
          placeholder="Search..."
        />
      </div>
      
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Filled</p>
        <SearchInput
          value="Searching"
          onChange={() => {}}
          placeholder="Search..."
        />
      </div>
      
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>With Value</p>
        <SearchInput
          value="First search value"
          onChange={() => {}}
          placeholder="Search..."
        />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  name: 'With Label',
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          label="Search for properties..."
          placeholder="Search for properties..."
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ width: 400 }}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search for properties..."
          helperText="Type to search through available properties"
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const [search, setSearch] = React.useState('');
    const [filterCount, setFilterCount] = React.useState(0);
    
    return (
      <div style={{ 
        width: 500, 
        padding: 24, 
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600 }}>Property Search</h3>
        
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search for properties..."
          showFilter
          filterCount={filterCount}
          onFilterClick={() => {
            setFilterCount(filterCount === 0 ? 1 : 0);
          }}
          helperText="Search by location, price, or property type"
        />
      </div>
    );
  },
};
