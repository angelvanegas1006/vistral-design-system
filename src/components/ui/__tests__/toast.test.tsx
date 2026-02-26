import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ToastProvider, useToast } from '../toast'

function TestToastTrigger({ toastProps }: { toastProps?: Record<string, unknown> }) {
  const { toast } = useToast()
  return (
    <button
      onClick={() => toast({ title: 'Test toast', variant: 'default', ...toastProps } as any)}
    >
      Show toast
    </button>
  )
}

function renderWithProvider(ui: React.ReactElement, providerProps: Record<string, unknown> = {}) {
  return render(<ToastProvider {...providerProps}>{ui}</ToastProvider>)
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders provider without crashing', () => {
    renderWithProvider(<div>App</div>)
    expect(screen.getByText('App')).toBeInTheDocument()
  })

  it('throws when useToast is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function BadComponent() {
      useToast()
      return null
    }
    expect(() => render(<BadComponent />)).toThrow('useToast must be used within a ToastProvider')
    spy.mockRestore()
  })

  it('shows a toast when triggered', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider(<TestToastTrigger />)

    await user.click(screen.getByText('Show toast'))
    expect(screen.getByText('Test toast')).toBeInTheDocument()
  })

  it('shows toast with description', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider(<TestToastTrigger toastProps={{ description: 'More details here' }} />)

    await user.click(screen.getByText('Show toast'))
    expect(screen.getByText('More details here')).toBeInTheDocument()
  })

  it('auto-dismisses toast after duration', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider(<TestToastTrigger toastProps={{ duration: 1000 }} />)

    await user.click(screen.getByText('Show toast'))
    expect(screen.getByText('Test toast')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1100)
    })

    expect(screen.queryByText('Test toast')).not.toBeInTheDocument()
  })

  it('dismisses toast when close button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider(<TestToastTrigger toastProps={{ duration: 0 }} />)

    await user.click(screen.getByText('Show toast'))
    expect(screen.getByText('Test toast')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Dismiss notification'))
    expect(screen.queryByText('Test toast')).not.toBeInTheDocument()
  })

  it('renders with correct ARIA role for error variant', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider(<TestToastTrigger toastProps={{ variant: 'error', duration: 0 }} />)

    await user.click(screen.getByText('Show toast'))
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders with status role for info variant', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider(<TestToastTrigger toastProps={{ variant: 'info', duration: 0 }} />)

    await user.click(screen.getByText('Show toast'))
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders notification region', () => {
    renderWithProvider(<div>App</div>)
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument()
  })

  it('renders toast action button', async () => {
    const actionHandler = vi.fn()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    renderWithProvider(
      <TestToastTrigger
        toastProps={{
          duration: 0,
          action: { label: 'Undo', onClick: actionHandler },
        }}
      />
    )

    await user.click(screen.getByText('Show toast'))
    const actionBtn = screen.getByText('Undo')
    expect(actionBtn).toBeInTheDocument()

    await user.click(actionBtn)
    expect(actionHandler).toHaveBeenCalledTimes(1)
  })

  it('limits visible toasts to max prop', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    function MultiTrigger() {
      const { toast } = useToast()
      return (
        <button onClick={() => toast({ title: `Toast ${Date.now()}`, duration: 0 })}>Add</button>
      )
    }

    renderWithProvider(<MultiTrigger />, { max: 2 })

    await user.click(screen.getByText('Add'))
    await user.click(screen.getByText('Add'))
    await user.click(screen.getByText('Add'))

    const toasts = screen.getAllByLabelText('Dismiss notification')
    expect(toasts.length).toBeLessThanOrEqual(2)
  })
})
