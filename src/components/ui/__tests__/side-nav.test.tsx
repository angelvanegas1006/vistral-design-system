import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SideNav, SideNavItem, SideNavGroup, SideNavDivider } from '../side-nav'

describe('SideNav', () => {
  it('renders without crashing', () => {
    render(
      <SideNav>
        <SideNavItem value="home" label="Home" />
      </SideNav>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders nav items', () => {
    render(
      <SideNav>
        <SideNavItem value="home" label="Home" />
        <SideNavItem value="settings" label="Settings" />
      </SideNav>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('calls onActiveItemChange when an item is clicked', async () => {
    const user = userEvent.setup()
    const onActiveItemChange = vi.fn()
    render(
      <SideNav onActiveItemChange={onActiveItemChange}>
        <SideNavItem value="home" label="Home" />
        <SideNavItem value="settings" label="Settings" />
      </SideNav>
    )

    await user.click(screen.getByText('Settings'))
    expect(onActiveItemChange).toHaveBeenCalledWith('settings')
  })

  it('sets controlled active item', () => {
    const { container } = render(
      <SideNav activeItem="settings">
        <SideNavItem value="home" label="Home" />
        <SideNavItem value="settings" label="Settings" />
      </SideNav>
    )
    const activeButton = container.querySelector('[data-vistral="list-item"]')
    expect(activeButton).toBeInTheDocument()
  })

  it('renders disabled items', () => {
    render(
      <SideNav>
        <SideNavItem value="disabled" label="Disabled Item" disabled />
      </SideNav>
    )
    expect(screen.getByText('Disabled Item').closest('button')).toBeDisabled()
  })

  it('renders items as links when href is provided', () => {
    render(
      <SideNav>
        <SideNavItem value="link" label="Link Item" href="/dashboard" />
      </SideNav>
    )
    const link = screen.getByText('Link Item').closest('a')
    expect(link).toHaveAttribute('href', '/dashboard')
  })

  it('renders badge count on items', () => {
    render(
      <SideNav>
        <SideNavItem value="notifications" label="Notifications" badge={5} />
      </SideNav>
    )
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})

describe('SideNavGroup', () => {
  it('renders with a group label', () => {
    render(
      <SideNav>
        <SideNavGroup label="Main Menu">
          <SideNavItem value="home" label="Home" />
        </SideNavGroup>
      </SideNav>
    )
    expect(screen.getByText('Main Menu')).toBeInTheDocument()
  })

  it('renders children inside the group', () => {
    render(
      <SideNav>
        <SideNavGroup label="Section">
          <SideNavItem value="item1" label="Item 1" />
          <SideNavItem value="item2" label="Item 2" />
        </SideNavGroup>
      </SideNav>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })
})

describe('SideNavDivider', () => {
  it('renders a separator element', () => {
    render(
      <SideNav>
        <SideNavDivider />
      </SideNav>
    )
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
