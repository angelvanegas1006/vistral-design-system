import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'

describe('Accordion', () => {
  it('renders without crashing', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole('button', { name: /section 1/i })).toBeInTheDocument()
  })

  it('expands item on trigger click', async () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: /section 1/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses item when clicked again (collapsible)', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: /section 1/i })
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('only allows one item open in single mode', async () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger1 = screen.getByRole('button', { name: /section 1/i })
    const trigger2 = screen.getByRole('button', { name: /section 2/i })

    await userEvent.click(trigger1)
    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger2)
    expect(trigger1).toHaveAttribute('aria-expanded', 'false')
    expect(trigger2).toHaveAttribute('aria-expanded', 'true')
  })

  it('allows multiple items open in multiple mode', async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger1 = screen.getByRole('button', { name: /section 1/i })
    const trigger2 = screen.getByRole('button', { name: /section 2/i })

    await userEvent.click(trigger1)
    await userEvent.click(trigger2)

    expect(trigger1).toHaveAttribute('aria-expanded', 'true')
    expect(trigger2).toHaveAttribute('aria-expanded', 'true')
  })

  it('supports default expanded items', () => {
    render(
      <Accordion type="single" defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    expect(screen.getByRole('button', { name: /section 1/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('calls onValueChange when expanded items change', async () => {
    const handleChange = vi.fn()
    render(
      <Accordion type="single" onValueChange={handleChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    await userEvent.click(screen.getByRole('button', { name: /section 1/i }))
    expect(handleChange).toHaveBeenCalledWith(['item-1'])
  })

  it('forwards ref on Accordion container', () => {
    const ref = vi.fn()
    render(
      <Accordion ref={ref} type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(ref).toHaveBeenCalled()
  })

  it('renders content region with correct aria attributes', async () => {
    render(
      <Accordion type="single" defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const region = screen.getByRole('region')
    expect(region).toBeInTheDocument()
    expect(region).toHaveAttribute('aria-labelledby')
  })

  it('hides content when item is collapsed', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const content = screen.getByText('Content 1')
    expect(content.closest('[hidden]')).toBeTruthy()
  })

  it('sets data-state attribute on accordion item', async () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" data-testid="accordion-item">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const item = screen.getByTestId('accordion-item')
    expect(item).toHaveAttribute('data-state', 'closed')

    await userEvent.click(screen.getByRole('button', { name: /section 1/i }))
    expect(item).toHaveAttribute('data-state', 'open')
  })
})
