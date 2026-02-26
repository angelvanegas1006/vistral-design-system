import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  FooterActions,
  PageFooter,
  FooterSection,
  FooterLink,
  FooterCopyright,
} from '../footer-actions'

describe('FooterActions', () => {
  it('renders children', () => {
    render(
      <FooterActions>
        <button>Save</button>
        <button>Cancel</button>
      </FooterActions>
    )

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('has region role and aria-label by default', () => {
    render(
      <FooterActions>
        <button>Save</button>
      </FooterActions>
    )

    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByLabelText('Form Actions')).toBeInTheDocument()
  })

  it('renders with top border when bordered', () => {
    const { container } = render(
      <FooterActions bordered>
        <button>Save</button>
      </FooterActions>
    )

    const footer = container.firstChild as HTMLElement
    expect(footer.style.borderTop).toContain('solid')
  })

  it('renders without border when bordered is false', () => {
    const { container } = render(
      <FooterActions bordered={false}>
        <button>Save</button>
      </FooterActions>
    )

    const footer = container.firstChild as HTMLElement
    expect(footer.style.borderTopStyle).toBe('none')
  })

  it('renders with custom aria-label', () => {
    render(
      <FooterActions aria-label="Page Actions">
        <button>Submit</button>
      </FooterActions>
    )

    expect(screen.getByLabelText('Page Actions')).toBeInTheDocument()
  })

  it('renders in mobile mode with vertical direction', () => {
    const { container } = render(
      <FooterActions mobile>
        <button>Primary</button>
        <button>Secondary</button>
      </FooterActions>
    )

    const footer = container.firstChild as HTMLElement
    expect(footer.style.flexDirection).toBe('column')
  })
})

describe('PageFooter', () => {
  it('renders as a footer element', () => {
    render(
      <PageFooter>
        <p>Footer content</p>
      </PageFooter>
    )

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders with dark variant', () => {
    render(
      <PageFooter variant="dark">
        <p>Dark footer</p>
      </PageFooter>
    )

    const footer = screen.getByRole('contentinfo')
    expect(footer.style.backgroundColor).toBeTruthy()
    expect(footer.style.color).toBeTruthy()
  })

  it('renders with light variant', () => {
    render(
      <PageFooter variant="light">
        <p>Light footer</p>
      </PageFooter>
    )

    const footer = screen.getByRole('contentinfo')
    expect(footer.style.backgroundColor).toBeTruthy()
  })
})

describe('FooterSection', () => {
  it('renders with title', () => {
    render(
      <FooterSection title="Company">
        <FooterLink href="/about">About</FooterLink>
      </FooterSection>
    )

    expect(screen.getByText('Company')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <FooterSection>
        <span>Content</span>
      </FooterSection>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

describe('FooterLink', () => {
  it('renders as an anchor element', () => {
    render(<FooterLink href="/about">About</FooterLink>)
    const link = screen.getByRole('link', { name: /about/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })
})

describe('FooterCopyright', () => {
  it('renders with default text', () => {
    render(<FooterCopyright name="Vistral" />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Vistral. All rights reserved.`)).toBeInTheDocument()
  })

  it('renders with custom year', () => {
    render(<FooterCopyright name="Acme" year={2024} />)
    expect(screen.getByText('© 2024 Acme. All rights reserved.')).toBeInTheDocument()
  })

  it('renders custom children over default text', () => {
    render(<FooterCopyright>Custom copyright notice</FooterCopyright>)
    expect(screen.getByText('Custom copyright notice')).toBeInTheDocument()
  })
})
