import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader, SectionHeader, CardHeaderTitle } from '../header'

describe('PageHeader', () => {
  it('renders with title', () => {
    render(<PageHeader title="Dashboard" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders title as h1 by default', () => {
    render(<PageHeader title="Page Title" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Title')
  })

  it('renders title with different heading levels', () => {
    const { rerender } = render(<PageHeader title="H2 Title" level="h2" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('H2 Title')

    rerender(<PageHeader title="H3 Title" level="h3" />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('H3 Title')
  })

  it('renders with description', () => {
    render(<PageHeader title="Settings" description="Manage your account preferences" />)
    expect(screen.getByText('Manage your account preferences')).toBeInTheDocument()
  })

  it('renders without description when not provided', () => {
    const { container } = render(<PageHeader title="Simple" />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs).toHaveLength(0)
  })

  it('renders actions slot', () => {
    render(<PageHeader title="Users" actions={<button>Add User</button>} />)
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument()
  })

  it('renders breadcrumb slot', () => {
    render(<PageHeader title="User Details" breadcrumb={<nav>Home &gt; Users &gt; Details</nav>} />)
    expect(screen.getByText(/Home/)).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <PageHeader title="With Children">
        <p>Extra content below header</p>
      </PageHeader>
    )
    expect(screen.getByText('Extra content below header')).toBeInTheDocument()
  })
})

describe('SectionHeader', () => {
  it('renders with title', () => {
    render(<SectionHeader title="General Settings" />)
    expect(screen.getByText('General Settings')).toBeInTheDocument()
  })

  it('renders title as h3', () => {
    render(<SectionHeader title="Section" />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section')
  })

  it('renders with description', () => {
    render(<SectionHeader title="Section" description="A brief description" />)
    expect(screen.getByText('A brief description')).toBeInTheDocument()
  })

  it('renders actions', () => {
    render(<SectionHeader title="Items" actions={<button>View All</button>} />)
    expect(screen.getByRole('button', { name: /view all/i })).toBeInTheDocument()
  })

  it('renders with border when bordered is true', () => {
    const { container } = render(<SectionHeader title="Bordered" bordered />)
    const header = container.firstChild as HTMLElement
    expect(header.style.borderBottom).toContain('solid')
  })
})

describe('CardHeaderTitle', () => {
  it('renders with title', () => {
    render(<CardHeaderTitle title="Card Title" />)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders title as h4', () => {
    render(<CardHeaderTitle title="Heading" />)
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Heading')
  })

  it('renders with subtitle', () => {
    render(<CardHeaderTitle title="Card" subtitle="Subtitle text" />)
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
  })

  it('renders with leading element', () => {
    render(<CardHeaderTitle title="With Icon" leading={<span data-testid="icon">★</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders with trailing element', () => {
    render(<CardHeaderTitle title="With Badge" trailing={<span data-testid="badge">New</span>} />)
    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })
})
