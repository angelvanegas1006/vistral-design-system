import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox, CheckboxGroup } from '../checkbox'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('renders unchecked by default', () => {
    render(<Checkbox label="Test" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders checked when checked prop is true', () => {
    render(<Checkbox checked label="Test" onChange={vi.fn()} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Test" onChange={handleChange} />)

    await userEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('calls onCheckedChange with boolean value', async () => {
    const handleCheckedChange = vi.fn()
    render(<Checkbox label="Test" onCheckedChange={handleCheckedChange} />)

    await userEvent.click(screen.getByRole('checkbox'))
    expect(handleCheckedChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled label="Disabled" />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('renders with description', () => {
    render(<Checkbox label="Subscribe" description="Get email notifications" />)
    expect(screen.getByText('Subscribe')).toBeInTheDocument()
    expect(screen.getByText('Get email notifications')).toBeInTheDocument()
  })

  it('renders indeterminate state', () => {
    render(<Checkbox indeterminate label="Select all" onChange={vi.fn()} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
  })

  it('shows error state', () => {
    render(<Checkbox error label="Required" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Checkbox ref={ref} label="Ref test" />)
    expect(ref).toHaveBeenCalled()
  })

  it('associates label with checkbox via htmlFor', () => {
    render(<Checkbox label="Labeled" />)
    const checkbox = screen.getByRole('checkbox')
    const label = checkbox.closest('label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', checkbox.id)
  })
})

describe('CheckboxGroup', () => {
  it('renders group with label', () => {
    render(
      <CheckboxGroup label="Preferences">
        <Checkbox label="Option A" />
        <Checkbox label="Option B" />
      </CheckboxGroup>
    )

    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(
      <CheckboxGroup error="Please select at least one">
        <Checkbox label="Option A" />
      </CheckboxGroup>
    )

    expect(screen.getByText('Please select at least one')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(
      <CheckboxGroup ref={ref}>
        <Checkbox label="Option" />
      </CheckboxGroup>
    )
    expect(ref).toHaveBeenCalled()
  })
})
