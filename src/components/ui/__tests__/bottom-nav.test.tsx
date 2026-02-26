import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BottomNav, BottomNavItem, BottomNavSearch } from '../bottom-nav'
import { Home, Search, User, Settings } from 'lucide-react'

describe('BottomNav', () => {
  it('renders without crashing', () => {
    render(
      <BottomNav defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Home" />
      </BottomNav>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(
      <BottomNav defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="search" icon={Search} label="Search" />
        <BottomNavItem value="profile" icon={User} label="Profile" />
      </BottomNav>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('marks active item with aria-selected', () => {
    render(
      <BottomNav defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="search" icon={Search} label="Search" />
      </BottomNav>
    )

    const homeTab = screen.getByRole('tab', { name: /home/i })
    expect(homeTab).toHaveAttribute('aria-selected', 'true')

    const searchTab = screen.getByRole('tab', { name: /search/i })
    expect(searchTab).toHaveAttribute('aria-selected', 'false')
  })

  it('changes active item on click', async () => {
    const handleChange = vi.fn()
    render(
      <BottomNav defaultValue="home" onValueChange={handleChange}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="search" icon={Search} label="Search" />
      </BottomNav>
    )

    await userEvent.click(screen.getByRole('tab', { name: /search/i }))
    expect(handleChange).toHaveBeenCalledWith('search')
  })

  it('supports controlled value', () => {
    const { rerender } = render(
      <BottomNav value="home" onValueChange={vi.fn()}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="settings" icon={Settings} label="Settings" />
      </BottomNav>
    )

    expect(screen.getByRole('tab', { name: /home/i })).toHaveAttribute('aria-selected', 'true')

    rerender(
      <BottomNav value="settings" onValueChange={vi.fn()}>
        <BottomNavItem value="home" icon={Home} label="Home" />
        <BottomNavItem value="settings" icon={Settings} label="Settings" />
      </BottomNav>
    )

    expect(screen.getByRole('tab', { name: /settings/i })).toHaveAttribute('aria-selected', 'true')
  })

  it('shows badge on navigation item', () => {
    render(
      <BottomNav defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Home" badge={5} />
      </BottomNav>
    )

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('truncates large badge counts', () => {
    render(
      <BottomNav defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Home" badge={150} />
      </BottomNav>
    )

    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(
      <BottomNav ref={ref} defaultValue="home">
        <BottomNavItem value="home" icon={Home} label="Home" />
      </BottomNav>
    )
    expect(ref).toHaveBeenCalled()
  })
})

describe('BottomNavSearch', () => {
  it('renders without crashing', () => {
    render(
      <BottomNav defaultValue="home">
        <BottomNavSearch />
      </BottomNav>
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('calls onPress when clicked', async () => {
    const handlePress = vi.fn()
    render(
      <BottomNav defaultValue="home">
        <BottomNavSearch onPress={handlePress} aria-label="Search" />
      </BottomNav>
    )

    await userEvent.click(screen.getByRole('button', { name: /search/i }))
    expect(handlePress).toHaveBeenCalledTimes(1)
  })
})
