import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper, StepperStep } from '../src/components/ui/stepper'
import { Button } from '../src/components/ui/button'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Stepper

Multi-step wizard indicator.

## Features
- **Step Status**: Pending, active, completed, error
- **Orientation**: Horizontal or vertical
- **Labels**: Title and description
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Stepper currentStep={1}>
        <StepperStep label="Account" description="Create your account" />
        <StepperStep label="Profile" description="Set up your profile" />
        <StepperStep label="Complete" description="Finish setup" />
      </Stepper>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Stepper currentStep={1} orientation="vertical">
        <StepperStep label="Order Placed" description="Your order has been received" />
        <StepperStep label="Processing" description="We're preparing your order" />
        <StepperStep label="Shipped" description="On the way to you" />
        <StepperStep label="Delivered" description="Enjoy your purchase" />
      </Stepper>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = React.useState(0)
    const steps = ['Details', 'Address', 'Payment', 'Review']

    return (
      <div style={{ width: 700 }}>
        <Stepper currentStep={step}>
          {steps.map(label => (
            <StepperStep key={label} label={label} />
          ))}
        </Stepper>

        <div style={{ marginTop: 32, display: 'flex', gap: 8 }}>
          <Button variant="secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}>
            Previous
          </Button>
          <Button disabled={step === steps.length - 1} onClick={() => setStep(s => s + 1)}>
            {step === steps.length - 2 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    )
  },
}

export const WithError: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Stepper currentStep={2}>
        <StepperStep label="Details" status="completed" />
        <StepperStep label="Verification" status="error" />
        <StepperStep label="Complete" />
      </Stepper>
    </div>
  ),
}
