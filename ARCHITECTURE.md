# Architecture Overview

This document describes the architecture and design decisions of the Vistral Design System.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Design Tokens](#design-tokens)
- [Component Architecture](#component-architecture)
- [Build System](#build-system)
- [Figma Integration](#figma-integration)
- [Testing Strategy](#testing-strategy)

## Overview

The Vistral Design System is a React component library built with TypeScript, designed to provide a consistent UI experience across Vistral products. It follows a token-driven architecture where design decisions are centralized in design tokens, which are synchronized from Figma.

## Project Structure

```
vistral-design-system/
├── src/
│   ├── components/
│   │   └── ui/              # React components
│   ├── tokens/              # Design tokens (JSON, CSS, TS)
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn, etc.)
│   └── index.ts             # Main exports
├── stories/                  # Storybook stories
├── lib/
│   ├── figma-sync/          # Figma synchronization scripts
│   └── generators/           # Code generators (CSS, TS)
├── scripts/                  # CLI scripts
├── .github/
│   └── workflows/           # CI/CD workflows
└── dist/                     # Build output
```

## Design Tokens

### Token Structure

Design tokens are stored in `src/tokens/vistral-tokens.json` and follow this structure:

```json
{
  "colors": {
    "primary": { ... },
    "semantic": { ... },
    "component": { ... }
  },
  "typography": { ... },
  "spacing": { ... },
  "radius": { ... },
  "shadows": { ... }
}
```

### Token Generation

Tokens are generated from Figma using:

- `lib/figma-sync/` - Extracts tokens from Figma API
- `lib/generators/` - Converts tokens to CSS and TypeScript

### Token Usage

**In Components:**

```tsx
const BUTTON_TOKENS = {
  primary: {
    bg: '#2050f6',
    fg: '#ffffff',
  },
} as const
```

**In CSS:**

```css
.button {
  background-color: var(--vistral-primary-default-bg);
}
```

## Component Architecture

### Component Pattern

All components follow a consistent pattern:

1. **Design Tokens** - Component-specific tokens from Figma
2. **TypeScript Interface** - Props interface extending HTML attributes
3. **Component Implementation** - Using `forwardRef` for ref forwarding
4. **Display Name** - For better debugging
5. **Exports** - Component and tokens exported

### Example Component Structure

```tsx
import * as React from 'react'
import { forwardRef } from 'react'

const COMPONENT_TOKENS = {
  // Tokens from Figma
} as const

export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary'
}

const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ variant = 'default', ...props }, ref) => {
    // Implementation using tokens
  }
)

Component.displayName = 'Component'

export { Component, COMPONENT_TOKENS }
```

### State Management

Components use React hooks for local state:

- `useState` - Component state
- `useRef` - DOM references
- `useEffect` - Side effects
- `useId` - Unique IDs for accessibility

### Styling Approach

- **Inline Styles** - Using React's `style` prop with design tokens
- **CSS Variables** - For global tokens (via `vistral-tokens.css`)
- **No CSS-in-JS libraries** - Keeping bundle size small

## Build System

### tsup Configuration

The project uses `tsup` for building:

- **Formats**: ESM (`dist/index.mjs`) and CJS (`dist/index.js`)
- **Type Definitions**: Generated `.d.ts` files
- **Source Maps**: Enabled for debugging
- **Tree Shaking**: Enabled for optimal bundle size

### External Dependencies

Peer dependencies are externalized:

- `react`, `react-dom`
- `@radix-ui/*` components
- `lucide-react` icons

This keeps the bundle small and allows consumers to manage their own versions.

## Figma Integration

### Synchronization Flow

```
Figma Design → Figma API → Token Extraction → JSON → CSS/TS Generation
```

### Sync Scripts

- `scripts/sync-figma.ts` - Main sync script
- `lib/figma-sync/extract-tokens.ts` - Token extraction
- `lib/figma-sync/extract-components.ts` - Component extraction

### Token Mapping

Tokens are mapped from Figma styles to our token structure:

- Colors → `colors.*`
- Typography → `typography.*`
- Spacing → `spacing.*`
- Effects → `shadows.*`

## Testing Strategy

### Testing Layers

1. **Unit Tests** - Component behavior (Vitest + Testing Library)
2. **Integration Tests** - Component interactions
3. **Visual Regression** - Storybook + Chromatic (future)
4. **E2E Tests** - Playwright (future)

### Test Coverage Goals

- **Lines**: >80%
- **Functions**: >80%
- **Branches**: >75%
- **Statements**: >80%

### Testing Tools

- **Vitest** - Test runner
- **@testing-library/react** - Component testing
- **@testing-library/jest-dom** - DOM matchers
- **@testing-library/user-event** - User interaction simulation

## Code Quality

### Linting

- **ESLint** - Code quality and style
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Pre-commit Hooks

- Lint staged files
- Format code
- Run type checking
- Prevent commits with errors

### CI/CD Pipeline

Automated checks on every PR:

- Linting
- Type checking
- Tests
- Build verification
- Bundle size tracking

## Performance Considerations

### Bundle Size

- Tree shaking enabled
- External dependencies as peer deps
- No unnecessary dependencies
- Code splitting where appropriate

### Runtime Performance

- Minimal re-renders (React.memo where needed)
- Efficient state management
- Optimized event handlers

## Accessibility

### Standards

- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation
- Screen reader support

### Testing

- Automated a11y tests in CI
- Manual testing with screen readers
- Keyboard-only navigation testing

## Future Improvements

- [ ] Visual regression testing with Chromatic
- [ ] E2E testing with Playwright
- [ ] Performance benchmarking
- [ ] Bundle size optimization
- [ ] More comprehensive documentation

## Questions?

For architecture questions, please:

- Check this document first
- Review existing components
- Open an issue for discussion
