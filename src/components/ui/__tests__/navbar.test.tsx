import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Navbar,
  NavbarBrand,
  NavbarTitle,
  NavbarActions,
  NavbarButton,
  NavbarBack,
} from '../navbar'
import { Bell } from 'lucide-react'

describe('Navbar', () => {
  it('renders as a nav element', () => {
    render(<Navbar>Content</Navbar>)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <Navbar>
        <span>Nav Content</span>
      </Navbar>
    )
    expect(screen.getByText('Nav Content')).toBeInTheDocument()
  })

  it('renders with bottom border by default', () => {
    render(<Navbar data-testid="nav">Content</Navbar>)
    const nav = screen.getByTestId('nav')
    expect(nav.style.borderBottom).toContain('solid')
  })

  it('renders without border when bordered is false', () => {
    render(
      <Navbar bordered={false} data-testid="nav">
        Content
      </Navbar>
    )
    const nav = screen.getByTestId('nav')
    expect(nav.style.borderBottomStyle).toBe('none')
  })

  it('renders with transparent background', () => {
    render(
      <Navbar transparent data-testid="nav">
        Content
      </Navbar>
    )
    const nav = screen.getByTestId('nav')
    expect(nav.style.backgroundColor).toBe('transparent')
  })

  it('renders with fixed positioning', () => {
    render(
      <Navbar fixed data-testid="nav">
        Content
      </Navbar>
    )
    const nav = screen.getByTestId('nav')
    expect(nav.style.position).toBe('fixed')
  })
})

describe('NavbarBrand', () => {
  it('renders with brand name', () => {
    render(<NavbarBrand name="Vistral" />)
    expect(screen.getByText('Vistral')).toBeInTheDocument()
  })

  it('renders with logo element', () => {
    render(<NavbarBrand logo={<img src="/logo.svg" alt="Logo" />} name="Brand" />)
    expect(screen.getByAltText('Logo')).toBeInTheDocument()
  })

  it('renders as a link when href is provided', () => {
    render(<NavbarBrand name="Home" href="/" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders as a div when no href', () => {
    const { container } = render(<NavbarBrand name="Brand" />)
    expect(container.querySelector('a')).not.toBeInTheDocument()
  })
})

describe('NavbarTitle', () => {
  it('renders title text', () => {
    render(<NavbarTitle>Page Title</NavbarTitle>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Title')
  })

  it('renders centered with absolute positioning', () => {
    render(<NavbarTitle data-testid="title">Centered</NavbarTitle>)
    const title = screen.getByTestId('title')
    expect(title.style.position).toBe('absolute')
  })
})

describe('NavbarActions', () => {
  it('renders children', () => {
    render(
      <NavbarActions>
        <button>Action 1</button>
        <button>Action 2</button>
      </NavbarActions>
    )
    expect(screen.getByRole('button', { name: /action 1/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /action 2/i })).toBeInTheDocument()
  })

  it('aligns to the right by default', () => {
    render(
      <NavbarActions data-testid="actions">
        <button>Btn</button>
      </NavbarActions>
    )
    const actions = screen.getByTestId('actions')
    expect(actions.style.marginLeft).toBe('auto')
  })

  it('aligns to the left when specified', () => {
    render(
      <NavbarActions align="left" data-testid="actions">
        <button>Btn</button>
      </NavbarActions>
    )
    const actions = screen.getByTestId('actions')
    expect(actions.style.marginRight).toBe('auto')
  })
})

describe('NavbarButton', () => {
  it('renders icon button', () => {
    render(<NavbarButton icon={Bell} aria-label="Notifications" />)
    const button = screen.getByRole('button', { name: /notifications/i })
    expect(button).toBeInTheDocument()
  })

  it('renders with badge dot', () => {
    const { container } = render(<NavbarButton icon={Bell} badge aria-label="Alerts" />)
    const badge = container.querySelector('span[style*="background-color"]')
    expect(badge).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<NavbarButton icon={Bell} onClick={handleClick} aria-label="Bell" />)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})

describe('NavbarBack', () => {
  it('renders with default "Back" label', () => {
    render(<NavbarBack />)
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<NavbarBack label="Go Back" />)
    expect(screen.getByText('Go Back')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<NavbarBack onClick={handleClick} />)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders chevron icon', () => {
    const { container } = render(<NavbarBack />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
