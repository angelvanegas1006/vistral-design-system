import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stepper, StepperStep } from '../stepper'

describe('Stepper', () => {
  it('renders without crashing', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="Step 1" />
        <StepperStep label="Step 2" />
      </Stepper>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders all steps as listitems', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="First" />
        <StepperStep label="Second" />
        <StepperStep label="Third" />
      </Stepper>
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('displays step labels', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="Account" />
        <StepperStep label="Profile" />
      </Stepper>
    )
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('displays step descriptions when provided', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="Account" description="Set up your account" />
        <StepperStep label="Profile" />
      </Stepper>
    )
    expect(screen.getByText('Set up your account')).toBeInTheDocument()
  })

  it('marks previous steps as completed', () => {
    const { container } = render(
      <Stepper currentStep={2}>
        <StepperStep label="Step 1" />
        <StepperStep label="Step 2" />
        <StepperStep label="Step 3" />
      </Stepper>
    )
    const checkIcons = container.querySelectorAll('svg')
    expect(checkIcons.length).toBeGreaterThanOrEqual(2)
  })

  it('shows step numbers for pending steps', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="Step 1" />
        <StepperStep label="Step 2" />
        <StepperStep label="Step 3" />
      </Stepper>
    )
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('supports vertical orientation', () => {
    render(
      <Stepper currentStep={0} orientation="vertical">
        <StepperStep label="Step 1" />
        <StepperStep label="Step 2" />
      </Stepper>
    )
    const list = screen.getByRole('list')
    expect(list.style.flexDirection).toBe('column')
  })

  it('supports horizontal orientation by default', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="Step 1" />
        <StepperStep label="Step 2" />
      </Stepper>
    )
    const list = screen.getByRole('list')
    expect(list.style.flexDirection).toBe('row')
  })

  it('allows overriding step status', () => {
    const { container } = render(
      <Stepper currentStep={0}>
        <StepperStep label="Error Step" status="error" />
        <StepperStep label="Normal Step" />
      </Stepper>
    )
    const indicators = container.querySelectorAll(
      '[role="listitem"] > div > div > div, [role="listitem"] > div > div'
    )
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('renders custom icon in step', () => {
    render(
      <Stepper currentStep={0}>
        <StepperStep label="Custom" icon={<span data-testid="custom-icon">★</span>} />
        <StepperStep label="Normal" />
      </Stepper>
    )
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('forwards ref to root element', () => {
    let refValue: HTMLDivElement | null = null
    render(
      <Stepper
        currentStep={0}
        ref={el => {
          refValue = el
        }}
      >
        <StepperStep label="Step 1" />
      </Stepper>
    )
    expect(refValue).toBeInstanceOf(HTMLElement)
  })
})
