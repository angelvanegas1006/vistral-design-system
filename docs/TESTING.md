# Testing Guide

This guide covers testing strategies and best practices for the Vistral Design System.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Setup](#test-setup)
- [Writing Tests](#writing-tests)
- [Test Types](#test-types)
- [Best Practices](#best-practices)

## Testing Philosophy

We follow these principles:

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Accessibility first** - Ensure components are accessible
3. **Coverage goals** - Aim for >80% coverage
4. **Fast feedback** - Tests should run quickly
5. **Maintainable** - Tests should be easy to understand and update

## Test Setup

### Tools

- **Vitest** - Test runner (faster than Jest)
- **@testing-library/react** - Component testing utilities
- **@testing-library/jest-dom** - DOM matchers
- **@testing-library/user-event** - User interaction simulation

### Configuration

Tests are configured in `vitest.config.ts`:

- Environment: `jsdom` (browser-like)
- Setup file: `src/test/setup.ts`
- Coverage: V8 provider with HTML, JSON, LCOV reports

## Writing Tests

### Basic Test Structure

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```tsx
import userEvent from '@testing-library/user-event'

it('handles click events', async () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>Click</Button>)

  const button = screen.getByRole('button')
  await userEvent.click(button)

  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Testing Accessibility

```tsx
it('has proper ARIA attributes', () => {
  render(<Input label="Email" required />)
  const input = screen.getByLabelText(/email/i)
  expect(input).toHaveAttribute('aria-required', 'true')
})
```

## Test Types

### Unit Tests

Test individual components in isolation:

```tsx
describe('Button', () => {
  it('renders correctly', () => { ... })
  it('handles clicks', () => { ... })
  it('shows loading state', () => { ... })
})
```

### Integration Tests

Test component interactions:

```tsx
describe('Form', () => {
  it('submits form data', async () => {
    render(<Form />)
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    // Assert form submission
  })
})
```

### Snapshot Tests

Capture component output:

```tsx
it('matches snapshot', () => {
  const { container } = render(<Button>Test</Button>)
  expect(container).toMatchSnapshot()
})
```

## Best Practices

### DO

- ✅ Test user-visible behavior
- ✅ Use semantic queries (`getByRole`, `getByLabelText`)
- ✅ Test accessibility features
- ✅ Test edge cases and error states
- ✅ Keep tests focused and isolated
- ✅ Use descriptive test names

### DON'T

- ❌ Test implementation details
- ❌ Test third-party library code
- ❌ Use `container.querySelector` unless necessary
- ❌ Test multiple things in one test
- ❌ Skip accessibility testing

### Test Coverage

Run coverage report:

```bash
npm run test:coverage
```

View HTML report:

```bash
open coverage/index.html
```

### Coverage Goals

- **Lines**: >80%
- **Functions**: >80%
- **Branches**: >75%
- **Statements**: >80%

## Common Patterns

### Testing Controlled Components

```tsx
it('handles controlled value', () => {
  const { rerender } = render(<Input value="initial" />)
  expect(screen.getByRole('textbox')).toHaveValue('initial')

  rerender(<Input value="updated" />)
  expect(screen.getByRole('textbox')).toHaveValue('updated')
})
```

### Testing Async Behavior

```tsx
it('handles async updates', async () => {
  render(<AsyncComponent />)
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
```

### Testing Error States

```tsx
it('displays error message', () => {
  render(<Input error errorMessage="Invalid input" />)
  expect(screen.getByText(/invalid input/i)).toBeInTheDocument()
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
})
```

## Debugging Tests

### Vitest UI

```bash
npm run test:ui
```

### Debugging Tips

1. Use `screen.debug()` to see rendered output
2. Use `screen.logTestingPlaygroundURL()` for query suggestions
3. Check test output for helpful error messages
4. Use `--reporter=verbose` for detailed output

## Resources

- [Testing Library Docs](https://testing-library.com/)
- [Vitest Docs](https://vitest.dev/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
