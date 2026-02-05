# Contributing to Vistral Design System

Thank you for your interest in contributing to the Vistral Design System! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Development](#component-development)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18+ (check `.nvmrc` for exact version)
- npm or pnpm
- Git

### Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/vistral-design-system.git
   cd vistral-design-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Run Storybook**
   ```bash
   npm run storybook
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feat/component-name` - New features
- `fix/component-name` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/component-name` - Code refactoring

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(button): add loading state
fix(input): correct border color on focus
docs(readme): update installation instructions
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Define proper types for all props
- Avoid `any` types (use `unknown` if necessary)
- Use interfaces for component props
- Export types alongside components

### Code Style

- Run `npm run lint` before committing
- Run `npm run format` to format code
- Follow ESLint rules (configured in `eslint.config.js`)
- Use Prettier for consistent formatting

### Component Structure

```tsx
import * as React from 'react'
import { forwardRef } from 'react'

/**
 * Component Design Tokens from Figma
 * [Figma URL]
 */
const COMPONENT_TOKENS = {
  // Tokens here
} as const

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Prop description */
  prop?: string
}

const Component = forwardRef<HTMLElement, ComponentProps>(({ prop, ...props }, ref) => {
  // Implementation
})

Component.displayName = 'Component'

export { Component, COMPONENT_TOKENS }
```

## Component Development

### Creating a New Component

1. **Create component file** in `src/components/ui/`
2. **Add design tokens** from Figma
3. **Implement component** following patterns
4. **Create Storybook story** in `stories/`
5. **Write tests** in `src/components/ui/__tests__/`
6. **Export from** `src/components/ui/index.ts`
7. **Update README** with component documentation

### Design Tokens

- Always reference Figma URL in component tokens
- Use tokens from `src/tokens/vistral-tokens.json` when possible
- Define component-specific tokens in the component file
- Follow naming conventions: `COMPONENT_TOKENS`

### Accessibility

- Use semantic HTML elements
- Add ARIA attributes where needed
- Ensure keyboard navigation works
- Test with screen readers
- Follow WCAG 2.1 AA guidelines

## Testing

### Writing Tests

- Write tests for all new components
- Test user interactions (clicks, keyboard, etc.)
- Test accessibility features
- Test edge cases and error states
- Aim for >80% code coverage

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage
```

### Test Structure

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

## Documentation

### Storybook Stories

- Create comprehensive stories for each component
- Document all props and variants
- Include usage examples
- Add accessibility examples
- Show different states (loading, error, etc.)

### Code Comments

- Add JSDoc comments for exported functions
- Comment complex logic
- Explain design decisions
- Reference Figma designs

## Pull Request Process

1. **Update your branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Run checks locally**

   ```bash
   npm run lint
   npm run typecheck
   npm run test:run
   npm run build
   ```

3. **Create Pull Request**
   - Use descriptive title
   - Fill out PR template
   - Link related issues
   - Add screenshots for UI changes

4. **PR Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests pass locally
   - [ ] Documentation updated
   - [ ] Storybook story added/updated
   - [ ] No console errors or warnings
   - [ ] Accessibility tested

5. **Review Process**
   - Address review comments
   - Keep PR focused and small
   - Update PR description if needed

## Questions?

If you have questions, please:

- Open an issue
- Check existing documentation
- Ask in team discussions

Thank you for contributing! 🎉
