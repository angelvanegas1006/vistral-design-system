import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert, AlertTitle, AlertDescription } from '../alert'

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert>Test message</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert description text</AlertDescription>
      </Alert>
    )

    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert description text')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()

    rerender(<Alert variant="success">Success</Alert>)
    expect(screen.getByText('Success')).toBeInTheDocument()

    rerender(<Alert variant="warning">Warning</Alert>)
    expect(screen.getByText('Warning')).toBeInTheDocument()

    rerender(<Alert variant="error">Error</Alert>)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders dismissible alert with close button', () => {
    render(<Alert dismissible>Dismissible alert</Alert>)
    const dismissButton = screen.getByRole('button', { name: /dismiss/i })
    expect(dismissButton).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const handleDismiss = vi.fn()
    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Dismissible alert
      </Alert>
    )

    await userEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('renders action button when actionLabel is provided', () => {
    const handleAction = vi.fn()
    render(
      <Alert actionLabel="Retry" onAction={handleAction}>
        Action alert
      </Alert>
    )

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('calls onAction when action button is clicked', async () => {
    const handleAction = vi.fn()
    render(
      <Alert actionLabel="Retry" onAction={handleAction}>
        Action alert
      </Alert>
    )

    await userEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('renders icon by default', () => {
    render(<Alert variant="info">With icon</Alert>)
    const alert = screen.getByRole('alert')
    const icon = alert.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('hides icon when icon prop is null', () => {
    render(<Alert icon={null}>No icon</Alert>)
    const alert = screen.getByRole('alert')
    const icons = alert.querySelectorAll('svg')
    expect(icons.length).toBe(0)
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Alert ref={ref}>Ref test</Alert>)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom className and style', () => {
    render(
      <Alert data-testid="custom-alert" style={{ margin: 10 }}>
        Custom
      </Alert>
    )
    expect(screen.getByTestId('custom-alert')).toHaveStyle({ margin: '10px' })
  })
})
