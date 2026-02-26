import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs'

describe('Tabs', () => {
  const renderTabs = (props: Record<string, unknown> = {}) =>
    render(
      <Tabs defaultValue="tab1" {...props}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    )

  it('renders without crashing', () => {
    renderTabs()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders all tab triggers', () => {
    renderTabs()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('shows the default tab content', () => {
    renderTabs()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('switches content when a tab trigger is clicked', async () => {
    const user = userEvent.setup()
    renderTabs()

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('marks active tab with aria-selected', () => {
    renderTabs()
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })

    expect(tab1).toHaveAttribute('aria-selected', 'true')
    expect(tab2).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onValueChange when tab changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    renderTabs({ onValueChange: handleChange })

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(handleChange).toHaveBeenCalledWith('tab2')
  })

  it('supports controlled value', () => {
    render(
      <Tabs value="tab2" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  it('disables a tab trigger when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    const disabledTab = screen.getByRole('tab', { name: 'Tab 2' })
    expect(disabledTab).toBeDisabled()
    await user.click(disabledTab)
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('renders tab content with tabpanel role', () => {
    renderTabs()
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
  })

  it('renders level 2 (segmented) variant', () => {
    const { container } = render(
      <Tabs defaultValue="a" level={2}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A content</TabsContent>
      </Tabs>
    )
    const list = container.querySelector('[role="tablist"]') as HTMLElement
    expect(list.style.display).toBe('inline-flex')
  })

  it('sets data-state on active trigger', () => {
    renderTabs()
    const activeTab = screen.getByRole('tab', { name: 'Tab 1' })
    expect(activeTab).toHaveAttribute('data-state', 'active')
  })
})
