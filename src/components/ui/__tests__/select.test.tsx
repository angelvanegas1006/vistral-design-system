import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../select'

describe('Select', () => {
  it('renders the trigger button', () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('displays placeholder text', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Choose option')).toBeInTheDocument()
  })

  it('renders with a label', () => {
    render(
      <Select>
        <SelectTrigger label="Country">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">US</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Country')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(
      <Select>
        <SelectTrigger helperText="Required field">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is true', () => {
    render(
      <Select>
        <SelectTrigger error>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('can be disabled', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('shows the default selected value', () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('renders with the combobox role', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger.tagName).toBe('BUTTON')
  })
})
