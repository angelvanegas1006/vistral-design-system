import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from '../src/components/ui/alert'
import { Rocket } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Alert

Based on Figma Design System: [Alert Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=251-17891)

## Features
- **4 Variants**: Info, Success, Warning, Error
- **Auto Icon**: Each variant has a default icon
- **Dismissible**: Optional close button
- **Composable**: Title and Description sub-components
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert style={{ width: 400 }}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 450 }}>
      <Alert variant="info">
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>Your account has been created successfully.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your subscription will expire in 3 days.</AlertDescription>
      </Alert>

      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was a problem with your request.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true)

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: 8,
            backgroundColor: '#2050f6',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Show Alert
        </button>
      )
    }

    return (
      <Alert variant="info" dismissible onDismiss={() => setVisible(false)} style={{ width: 400 }}>
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>Click the X button to dismiss this alert.</AlertDescription>
      </Alert>
    )
  },
}

export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Alert variant="info" icon={Rocket}>
        <AlertTitle>Custom Icon</AlertTitle>
        <AlertDescription>You can use any Lucide icon.</AlertDescription>
      </Alert>

      <Alert variant="success" icon={null}>
        <AlertTitle>No Icon</AlertTitle>
        <AlertDescription>Set icon to null to hide it.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Alert variant="info">
        <AlertTitle>This is an info alert</AlertTitle>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Operation completed successfully</AlertTitle>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Please review your settings</AlertTitle>
      </Alert>

      <Alert variant="error">
        <AlertTitle>Failed to save changes</AlertTitle>
      </Alert>
    </div>
  ),
}

export const DescriptionOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Alert variant="info">
        <AlertDescription>This alert only has a description without a title.</AlertDescription>
      </Alert>
    </div>
  ),
}
