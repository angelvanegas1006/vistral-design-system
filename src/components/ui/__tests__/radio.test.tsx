import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, Radio } from '../radio'

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Option A" />
      </RadioGroup>
    )
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders all radio options', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    )
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('selects a radio on click', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    )

    await user.click(screen.getByLabelText('Option A'))
    expect(onValueChange).toHaveBeenCalledWith('a')
  })

  it('reflects controlled value', () => {
    render(
      <RadioGroup value="b">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('Option B')).toBeChecked()
    expect(screen.getByLabelText('Option A')).not.toBeChecked()
  })

  it('uses defaultValue for uncontrolled mode', () => {
    render(
      <RadioGroup defaultValue="a">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('Option A')).toBeChecked()
  })

  it('disables all radios when group is disabled', () => {
    render(
      <RadioGroup disabled>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    )
    screen.getAllByRole('radio').forEach(radio => expect(radio).toBeDisabled())
  })
})

describe('Radio', () => {
  it('renders with label text', () => {
    render(
      <RadioGroup>
        <Radio value="test" label="Test Label" />
      </RadioGroup>
    )
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(
      <RadioGroup>
        <Radio value="test" label="Label" description="Description text" />
      </RadioGroup>
    )
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('can be individually disabled', () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Enabled" />
        <Radio value="b" label="Disabled" disabled />
      </RadioGroup>
    )
    expect(screen.getByLabelText('Enabled')).not.toBeDisabled()
    expect(screen.getByLabelText('Disabled')).toBeDisabled()
  })

  it('renders as radio input type', () => {
    render(
      <RadioGroup>
        <Radio value="x" label="X" />
      </RadioGroup>
    )
    expect(screen.getByRole('radio')).toHaveAttribute('type', 'radio')
  })
})
