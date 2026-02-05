# Development Guide

This guide covers the development workflow and best practices for working on the Vistral Design System.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Development](#component-development)
- [Testing](#testing)
- [Code Style](#code-style)
- [Debugging](#debugging)

## Getting Started

### Prerequisites

- Node.js 18+ (use `.nvmrc` for exact version)
- npm or pnpm
- Git

### Initial Setup

```bash
# Clone repository
git clone https://github.com/angelvanegas1006/vistral-design-system.git
cd vistral-design-system

# Install dependencies
npm install

# Verify setup
npm run typecheck
npm run lint
npm test
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/component-name
# or
git checkout -b fix/component-name
```

### 2. Make Changes

- Write code following the [Component Development](#component-development) guidelines
- Add tests for new functionality
- Update Storybook stories
- Update documentation if needed

### 3. Test Locally

```bash
# Run all checks
npm run lint
npm run typecheck
npm run test:run
npm run build
```

### 4. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(button): add loading state"
```

### 5. Push and Create PR

```bash
git push origin feat/component-name
```

## Component Development

### Creating a New Component

1. **Create component file** in `src/components/ui/`
2. **Add design tokens** from Figma
3. **Implement component** following patterns
4. **Create Storybook story** in `stories/`
5. **Write tests** in `src/components/ui/__tests__/`
6. **Export from** `src/components/ui/index.ts`

### Component Template

```tsx
import * as React from 'react'
import { forwardRef } from 'react'

/**
 * Component Design Tokens from Figma
 * https://www.figma.com/design/...
 */
const COMPONENT_TOKENS = {
  // Tokens here
} as const

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Prop description */
  prop?: string
}

const Component = forwardRef<HTMLElement, ComponentProps>(({ prop = 'default', ...props }, ref) => {
  // Implementation
  return (
    <div ref={ref} {...props}>
      {/* Component content */}
    </div>
  )
})

Component.displayName = 'Component'

export { Component, COMPONENT_TOKENS }
```

### Design Tokens

- Always reference Figma URL
- Use tokens from `src/tokens/vistral-tokens.json` when possible
- Define component-specific tokens in component file
- Follow naming: `COMPONENT_TOKENS`

## Testing

### Writing Tests

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Component } from '../component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
# Watch mode
npm test

# Single run
npm run test:run

# With coverage
npm run test:coverage
```

## Code Style

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Linting

```bash
# Check for errors
npm run lint

# Auto-fix errors
npm run lint:fix
```

## Debugging

### Storybook

Use Storybook for visual debugging:

```bash
npm run storybook
```

### Tests

Use Vitest UI for test debugging:

```bash
npm run test:ui
```

### TypeScript

Check types:

```bash
npm run typecheck
```

## Troubleshooting

### Build Issues

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Test Issues

```bash
# Clear cache
rm -rf node_modules/.vite
npm test
```

### Linting Issues

```bash
# Reset ESLint cache
rm -rf .eslintcache
npm run lint:fix
```
