import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline, TimelineItem } from '../timeline'

describe('Timeline', () => {
  it('renders without crashing', () => {
    render(
      <Timeline>
        <TimelineItem title="Event 1" />
      </Timeline>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders all timeline items as listitems', () => {
    render(
      <Timeline>
        <TimelineItem title="Step 1" />
        <TimelineItem title="Step 2" />
        <TimelineItem title="Step 3" />
      </Timeline>
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('displays item titles', () => {
    render(
      <Timeline>
        <TimelineItem title="Created" />
        <TimelineItem title="Shipped" />
      </Timeline>
    )
    expect(screen.getByText('Created')).toBeInTheDocument()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
  })

  it('displays item descriptions', () => {
    render(
      <Timeline>
        <TimelineItem title="Created" description="Order was placed" />
      </Timeline>
    )
    expect(screen.getByText('Order was placed')).toBeInTheDocument()
  })

  it('displays time labels', () => {
    render(
      <Timeline>
        <TimelineItem title="Created" time="Jan 1, 2025" />
      </Timeline>
    )
    expect(screen.getByText('Jan 1, 2025')).toBeInTheDocument()
  })

  it('renders different statuses with appropriate aria labels on nodes', () => {
    render(
      <Timeline>
        <TimelineItem title="Done" status="success" />
        <TimelineItem title="Failed" status="error" />
        <TimelineItem title="Active" status="active" />
      </Timeline>
    )
    expect(screen.getByLabelText('Completed')).toBeInTheDocument()
    expect(screen.getByLabelText('Error')).toBeInTheDocument()
    expect(screen.getByLabelText('In progress')).toBeInTheDocument()
  })

  it('renders icons for status variants', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Done" status="success" />
        <TimelineItem title="Active" status="active" />
      </Timeline>
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders children inside timeline items', () => {
    render(
      <Timeline>
        <TimelineItem title="Step">
          <span data-testid="custom-content">Extra info</span>
        </TimelineItem>
      </Timeline>
    )
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('builds accessible aria-label on items', () => {
    render(
      <Timeline>
        <TimelineItem title="Deployed" time="2pm" status="success" />
      </Timeline>
    )
    expect(screen.getByLabelText('Deployed, 2pm, completed')).toBeInTheDocument()
  })

  it('handles default status', () => {
    render(
      <Timeline>
        <TimelineItem title="Pending step" />
      </Timeline>
    )
    expect(screen.getByLabelText('Pending')).toBeInTheDocument()
  })

  it('forwards ref to root element', () => {
    let refValue: HTMLDivElement | null = null
    render(
      <Timeline
        ref={el => {
          refValue = el
        }}
      >
        <TimelineItem title="Step" />
      </Timeline>
    )
    expect(refValue).toBeInstanceOf(HTMLElement)
  })
})
