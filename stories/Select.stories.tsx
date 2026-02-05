import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectLabel,
} from '../src/components/ui/select'

const meta: Meta = {
  title: 'Components/Select',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Select

Select component matching Figma design.

Based on Figma:
- [Select Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=212-4742)

## Features
- **Sizes**: Small, Medium, Large
- **States**: Default, Focused, Disabled, Error
- **Groups**: Organize options into groups
- **Placeholder**: First option should be a placeholder (not selectable)
- **Accessibility**: Full keyboard navigation, ARIA labels

## Best Practices
- Use for finite and short lists (15-20 options max)
- Use clear and concise labels for options
- Ensure the first option is a placeholder
- Don't use for long lists (use Autocomplete instead)
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div style={{ width: 250 }}>
      <Select>
        <SelectTrigger placeholder="Placeholder" label="Label" />
        <SelectContent>
          <SelectItem value="option1">Select Item</SelectItem>
          <SelectItem value="option2">Select Item</SelectItem>
          <SelectItem value="option3">Select Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Open: StoryObj = {
  name: 'Open State',
  render: () => {
    const [open, setOpen] = React.useState(true)

    return (
      <div style={{ width: 250 }}>
        <Select open={open} onOpenChange={setOpen}>
          <SelectTrigger placeholder="Placeholder" label="Label" />
          <SelectContent>
            <SelectItem value="option1">Select Item</SelectItem>
            <SelectItem value="option2">Select Item</SelectItem>
            <SelectItem value="option3">Select Item</SelectItem>
            <SelectItem value="option4">Select Item</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  },
}

export const WithValue: StoryObj = {
  name: 'With Selected Value',
  render: () => (
    <div style={{ width: 250 }}>
      <Select defaultValue="option2">
        <SelectTrigger placeholder="Placeholder" label="Select Label" />
        <SelectContent>
          <SelectItem value="option1">Select Item</SelectItem>
          <SelectItem value="option2">Select Item</SelectItem>
          <SelectItem value="option3">Select Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Disabled: StoryObj = {
  name: 'Disabled State',
  render: () => (
    <div style={{ width: 250 }}>
      <Select disabled>
        <SelectTrigger placeholder="Placeholder" label="Label" />
        <SelectContent>
          <SelectItem value="option1">Select Item</SelectItem>
          <SelectItem value="option2">Select Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Error: StoryObj = {
  name: 'Error State',
  render: () => (
    <div style={{ width: 250 }}>
      <Select>
        <SelectTrigger
          placeholder="Placeholder"
          label="Label"
          error
          helperText="This is an input description."
        />
        <SelectContent>
          <SelectItem value="option1">Select Item</SelectItem>
          <SelectItem value="option2">Select Item</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 250 }}>
      <Select>
        <SelectTrigger label="Small" size="sm" placeholder="Select..." />
        <SelectContent>
          <SelectItem value="option1">Small option</SelectItem>
          <SelectItem value="option2">Other option</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger label="Medium (default)" size="md" placeholder="Select..." />
        <SelectContent>
          <SelectItem value="option1">Medium option</SelectItem>
          <SelectItem value="option2">Other option</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger label="Large" size="lg" placeholder="Select..." />
        <SelectContent>
          <SelectItem value="option1">Large option</SelectItem>
          <SelectItem value="option2">Other option</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithPlaceholder: StoryObj = {
  name: 'With Placeholder',
  render: () => (
    <div style={{ width: 280 }}>
      <Select>
        <SelectTrigger placeholder="Choose a fruit..." label="Fruit" />
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="mango">Mango</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithGroups: StoryObj = {
  name: 'With Groups',
  render: () => (
    <div style={{ width: 280 }}>
      <Select>
        <SelectTrigger placeholder="Select a city..." label="City" />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="ny">New York</SelectItem>
            <SelectItem value="la">Los Angeles</SelectItem>
            <SelectItem value="toronto">Toronto</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="paris">Paris</SelectItem>
            <SelectItem value="berlin">Berlin</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="tokyo">Tokyo</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="manila">Manila</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const AllStates: StoryObj = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 250 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Default/Closed</p>
        <Select>
          <SelectTrigger placeholder="Placeholder" label="Label" />
          <SelectContent>
            <SelectItem value="option1">Select Item</SelectItem>
            <SelectItem value="option2">Select Item</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Open</p>
        <Select open>
          <SelectTrigger placeholder="Placeholder" label="Label" />
          <SelectContent>
            <SelectItem value="option1">Select Item</SelectItem>
            <SelectItem value="option2">Select Item</SelectItem>
            <SelectItem value="option3">Select Item</SelectItem>
            <SelectItem value="option4">Select Item</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Disabled</p>
        <Select disabled>
          <SelectTrigger placeholder="Placeholder" label="Label" />
          <SelectContent>
            <SelectItem value="option1">Select Item</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#71717a' }}>Error</p>
        <Select>
          <SelectTrigger
            placeholder="Placeholder"
            label="Label"
            error
            helperText="This is an input description."
          />
          <SelectContent>
            <SelectItem value="option1">Select Item</SelectItem>
            <SelectItem value="option2">Select Item</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

export const Controlled: StoryObj = {
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 250 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>Selected: {value || 'none'}</p>

        <Select value={value} onValueChange={setValue}>
          <SelectTrigger placeholder="Select..." label="Controlled" />
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </SelectContent>
        </Select>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setValue('react')}
            style={{
              padding: '6px 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 6,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Set React
          </button>
          <button
            onClick={() => setValue('')}
            style={{
              padding: '6px 12px',
              border: '1px solid #d4d4d8',
              borderRadius: 6,
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Clear
          </button>
        </div>
      </div>
    )
  },
}

export const FormExample: StoryObj = {
  name: 'Form Example',
  render: () => (
    <form
      style={{
        width: 350,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
      onSubmit={e => e.preventDefault()}
    >
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>Shipping Information</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Select defaultValue="ph">
          <SelectTrigger label="Country" fullWidth placeholder="Select country..." />
          <SelectContent>
            <SelectItem value="ph">Philippines</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger label="State/Province" placeholder="Select state..." fullWidth />
          <SelectContent>
            <SelectItem value="ncr">Metro Manila</SelectItem>
            <SelectItem value="cebu">Cebu</SelectItem>
            <SelectItem value="davao">Davao</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger label="Shipping Method" placeholder="Select method..." fullWidth />
          <SelectContent>
            <SelectItem value="standard">Standard (5-7 days)</SelectItem>
            <SelectItem value="express">Express (2-3 days)</SelectItem>
            <SelectItem value="overnight">Overnight</SelectItem>
          </SelectContent>
        </Select>

        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: '10px 20px',
            backgroundColor: '#2050f6',
            color: 'white',
            border: 'none',
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Continue
        </button>
      </div>
    </form>
  ),
}
