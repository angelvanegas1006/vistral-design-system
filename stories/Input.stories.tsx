import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input, Textarea } from '../src/components/ui/input'
import { Search, Mail, Lock, Eye, EyeOff, AtSign, User } from 'lucide-react'

const meta: Meta<typeof Input> = {
  title: 'Components/Text Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Text Input

Text input component matching Figma design.

Based on Figma:
- [Text Input Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=181-3410)
- [Text Input Examples](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=168-2935)

## Features
- **Label**: Always present, descriptive text above input
- **Placeholder**: Temporary hint text
- **Helper Text**: Additional instructions below input
- **Left/Right Icons**: Optional icons for categorization or actions
- **Character Counter**: Shows current/max characters
- **Suffix**: Fixed value below input
- **States**: Default, Focused, Disabled, Error
- **Sizes**: Small, Medium, Large

## Best Practices
- Always use a clear, descriptive label
- Provide helpful helper text for complex inputs
- Use correct HTML input type for accessibility
- Provide clear error state with specific messages
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Input label="Label" placeholder="Placeholder" helperText="This is an input description." />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <Input label="Label" placeholder="Placeholder" helperText="This is an input description." />
      <Input label="Label" placeholder="Placeholder" helperText="This is an input description." />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        disabled
      />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        error
        errorMessage="This is an input description."
      />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        error
        errorMessage="This is an input description."
      />
      <Input label="Label" value="Hel" helperText="This is an input description." />
      <Input label="Label" placeholder="Placeholder" helperText="This is an input description." />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        disabled
      />
    </div>
  ),
}

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Input label="Search" placeholder="Search..." leftIcon={Search} />
      <Input label="Email" placeholder="Enter your email" leftIcon={Mail} type="email" />
      <Input label="Username" placeholder="Enter username" rightIcon={AtSign} />
      <Input label="User" placeholder="Enter name" leftIcon={User} />
    </div>
  ),
}

export const WithCharacterCounter: Story = {
  name: 'With Character Counter',
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div style={{ width: 400 }}>
        <Input
          label="Label"
          placeholder="Placeholder"
          helperText="This is an input description."
          value={value}
          onChange={e => setValue(e.target.value)}
          maxLength={200}
          showCounter
        />
      </div>
    )
  },
}

export const WithSuffix: Story = {
  name: 'With Suffix',
  render: () => (
    <div style={{ width: 400 }}>
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        suffix="Suffix"
      />
    </div>
  ),
}

export const OptionalField: Story = {
  name: 'Optional Field',
  render: () => (
    <div style={{ width: 400 }}>
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        optional
      />
    </div>
  ),
}

export const ErrorState: Story = {
  name: 'Error State',
  render: () => (
    <div style={{ width: 400 }}>
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        error
        errorMessage="This is an input description."
      />
    </div>
  ),
}

export const DisabledState: Story = {
  name: 'Disabled State',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        disabled
      />
      <Input
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        disabled
        value="Disabled with value"
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium (default)" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
}

export const PasswordInput: Story = {
  name: 'Password with Toggle',
  render: () => {
    const [show, setShow] = React.useState(false)

    return (
      <div style={{ width: 400 }}>
        <div style={{ position: 'relative' }}>
          <Input
            label="Password"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            leftIcon={Lock}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            style={{
              position: 'absolute',
              right: 12,
              top: 32,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={18} color="#71717a" /> : <Eye size={18} color="#71717a" />}
          </button>
        </div>
      </div>
    )
  },
}

export const TextareaComponent: Story = {
  name: 'Text Area',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <Textarea
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
      />
      <Textarea label="Label" value="Hel" helperText="This is an input description." />
      <Textarea
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        error
        errorMessage="This is an input description."
      />
      <Textarea
        label="Label"
        placeholder="Placeholder"
        helperText="This is an input description."
        disabled
      />
    </div>
  ),
}

export const TextareaWithCounter: Story = {
  name: 'Text Area with Character Counter',
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div style={{ width: 400 }}>
        <Textarea
          label="Description"
          placeholder="Write your comments here..."
          helperText="This is an input description."
          value={value}
          onChange={e => setValue(e.target.value)}
          maxLength={100}
          showCounter
          rows={4}
        />
      </div>
    )
  },
}

export const TextareaAutoResize: Story = {
  name: 'Text Area Auto Resize',
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div style={{ width: 400 }}>
        <Textarea
          label="Message"
          placeholder="Type your message..."
          value={value}
          onChange={e => setValue(e.target.value)}
          autoResize
          rows={3}
        />
      </div>
    )
  },
}

export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
    })

    return (
      <form
        style={{
          width: 500,
          padding: 24,
          backgroundColor: '#fff',
          borderRadius: 12,
          border: '1px solid #e4e4e7',
        }}
        onSubmit={e => e.preventDefault()}
      >
        <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 600 }}>Contact Us</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Input
              label="First Name"
              placeholder="John"
              fullWidth
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              fullWidth
              optional
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            leftIcon={Mail}
            fullWidth
            helperText="We'll never share your email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            rows={4}
            fullWidth
            helperText="Max 500 characters"
            maxLength={500}
            showCounter
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
          />

          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#2050f6',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Send Message
          </button>
        </div>
      </form>
    )
  },
}
