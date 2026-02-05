# Figma Synchronization Guide

This guide explains how the Figma synchronization system works and how to use it.

## Overview

The Vistral Design System automatically synchronizes design tokens and component specifications from Figma, ensuring pixel-perfect implementation and maintaining design consistency.

## Architecture

```
Figma Design → Figma API → Token Extraction → JSON → CSS/TS Generation
```

## Configuration

### Environment Variables

Create `.env.local`:

```env
FIGMA_TOKEN=your_figma_token
FIGMA_FILE_ID=i0plqavJ8VqpKeqr6TkLtD
```

### Getting a Figma Token

1. Go to Figma Settings → Account
2. Generate a Personal Access Token
3. Add to `.env.local`

## Sync Scripts

### Test Connection

```bash
npm run figma:test
```

Validates connection and shows:

- File information
- Component count
- Style count

### Sync Tokens

```bash
npm run figma:sync:tokens
```

Extracts design tokens from Figma:

- Colors
- Typography
- Spacing
- Radius
- Shadows

Output: `src/tokens/vistral-tokens.json`

### Sync Components

```bash
npm run figma:sync:components
```

Extracts component specifications:

- Component properties
- Variants
- Documentation

### Sync All

```bash
npm run figma:sync:all
```

Syncs both tokens and components.

## Token Mapping

### Color Tokens

Figma styles → JSON structure:

```
Figma Color Style → colors.primary.*
Figma Semantic → colors.semantic.*
Figma Component → colors.component.*
```

### Typography Tokens

```
Figma Text Style → typography.*
  - fontFamily
  - fontSize
  - fontWeight
  - lineHeight
  - letterSpacing
```

### Spacing Tokens

```
Figma Spacing → spacing.*
```

## Component Extraction

Components are extracted with:

- **Properties** - Props and variants
- **Documentation** - Descriptions from Figma
- **Tokens** - Component-specific design tokens

## Generated Files

### JSON Tokens

`src/tokens/vistral-tokens.json`

Contains all design tokens in structured format.

### CSS Variables

`src/tokens/vistral-tokens.css`

CSS custom properties for use in applications.

### TypeScript Types

`src/tokens/types.ts`

Type definitions for tokens (auto-generated).

## Workflow

### Initial Setup

1. Configure Figma token
2. Run `npm run figma:test` to verify connection
3. Run `npm run figma:sync:all` to sync everything

### Regular Updates

1. Designer updates Figma
2. Run sync script: `npm run figma:sync:all`
3. Review changes in `vistral-tokens.json`
4. Commit changes

### Component Updates

1. Designer updates component in Figma
2. Run `npm run figma:sync:components`
3. Update component implementation if needed
4. Update tests and stories

## Troubleshooting

### Connection Issues

```bash
# Test connection
npm run figma:test

# Check token validity
echo $FIGMA_TOKEN
```

### Sync Errors

- Verify Figma file ID is correct
- Check token permissions
- Ensure file is accessible

### Token Mismatches

- Compare Figma styles with generated JSON
- Check token mapping in `lib/figma-sync/token-mapping.ts`
- Verify style naming conventions

## Best Practices

1. **Regular Syncs** - Sync frequently to catch design changes early
2. **Review Changes** - Always review generated tokens before committing
3. **Version Control** - Commit token changes separately from code
4. **Documentation** - Update component docs when syncing new components

## Advanced Usage

### Custom Token Mapping

Edit `lib/figma-sync/token-mapping.ts` to customize how Figma styles map to tokens.

### Component Templates

Component generation uses templates in `lib/figma-sync/templates/`.

### Filtering Components

Modify sync scripts to filter specific components or pages.

## Resources

- [Figma API Docs](https://www.figma.com/developers/api)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
