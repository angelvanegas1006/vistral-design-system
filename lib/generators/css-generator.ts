/**
 * CSS Generator
 *
 * Generates CSS variables from design tokens JSON
 */

import type { DesignTokens } from '../figma-sync/types'

/**
 * Convert token name to CSS variable name
 * Example: "primary-500" -> "--vistral-primary-500"
 */
function toCSSVariable(category: string, name: string): string {
  return `--vistral-${category}-${name}`
}

/**
 * Generate CSS variables from tokens
 */
export function generateCSS(tokens: DesignTokens): string {
  const lines: string[] = [
    '/* Vistral Design Tokens - CSS Variables */',
    '/* Generated from vistral-tokens.json */',
    '/* Do not edit manually - use npm run tokens:generate */',
    '',
    ':root {',
  ]

  // Colors
  for (const [category, values] of Object.entries(tokens.colors)) {
    for (const [name, value] of Object.entries(values)) {
      const varName = toCSSVariable(`color-${category}`, name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  // Typography
  if (tokens.typography.fontFamily) {
    for (const [name, value] of Object.entries(tokens.typography.fontFamily)) {
      const varName = toCSSVariable('font-family', name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  if (tokens.typography.fontSize) {
    for (const [name, value] of Object.entries(tokens.typography.fontSize)) {
      const varName = toCSSVariable('font-size', name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  if (tokens.typography.fontWeight) {
    for (const [name, value] of Object.entries(tokens.typography.fontWeight)) {
      const varName = toCSSVariable('font-weight', name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  if (tokens.typography.lineHeight) {
    for (const [name, value] of Object.entries(tokens.typography.lineHeight)) {
      const varName = toCSSVariable('line-height', name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  // Spacing
  for (const [name, value] of Object.entries(tokens.spacing)) {
    const varName = toCSSVariable('spacing', name)
    lines.push(`  ${varName}: ${value};`)
  }

  // Radius
  for (const [name, value] of Object.entries(tokens.radius)) {
    const varName = toCSSVariable('radius', name)
    lines.push(`  ${varName}: ${value};`)
  }

  // Shadows
  if (tokens.shadows) {
    for (const [name, value] of Object.entries(tokens.shadows)) {
      const varName = toCSSVariable('shadow', name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  // Breakpoints
  if (tokens.breakpoints) {
    for (const [name, value] of Object.entries(tokens.breakpoints)) {
      const varName = toCSSVariable('breakpoint', name)
      lines.push(`  ${varName}: ${value};`)
    }
  }

  lines.push('}')

  return lines.join('\n')
}
