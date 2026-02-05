/**
 * TypeScript Generator
 *
 * Generates TypeScript types from design tokens JSON
 */

import type { DesignTokens } from '../figma-sync/types'

/**
 * Generate TypeScript types from tokens
 */
export function generateTypeScript(tokens: DesignTokens): string {
  const lines: string[] = [
    '/**',
    ' * TypeScript types for Vistral Design Tokens',
    ' *',
    ' * These types are generated from vistral-tokens.json',
    ' * Do not edit manually - use npm run tokens:generate',
    ' */',
    '',
    'export interface VistralTokens {',
    '  colors: {',
  ]

  // Colors type
  const colorCategories: string[] = []
  for (const [category, values] of Object.entries(tokens.colors)) {
    const keys = Object.keys(values)
      .map(k => `"${k}"`)
      .join(' | ')
    colorCategories.push(`    ${category}: Record<${keys}, string>`)
  }
  lines.push(...colorCategories)
  lines.push('    [key: string]: Record<string, string>')
  lines.push('  }')

  // Typography type
  lines.push('  typography: {')
  if (tokens.typography.fontFamily) {
    const fontFamilyKeys = Object.keys(tokens.typography.fontFamily)
      .map(k => `"${k}"`)
      .join(' | ')
    lines.push(`    fontFamily: Record<${fontFamilyKeys}, string>`)
  } else {
    lines.push('    fontFamily: Record<string, string>')
  }

  if (tokens.typography.fontSize) {
    const fontSizeKeys = Object.keys(tokens.typography.fontSize)
      .map(k => `"${k}"`)
      .join(' | ')
    lines.push(`    fontSize: Record<${fontSizeKeys}, string>`)
  } else {
    lines.push('    fontSize: Record<string, string>')
  }

  lines.push('    fontWeight: Record<string, number>')
  lines.push('    lineHeight: Record<string, string>')
  lines.push('  }')

  // Spacing type
  const spacingKeys = Object.keys(tokens.spacing)
    .map(k => `"${k}"`)
    .join(' | ')
  lines.push(`  spacing: Record<${spacingKeys}, string>`)

  // Radius type
  const radiusKeys = Object.keys(tokens.radius)
    .map(k => `"${k}"`)
    .join(' | ')
  lines.push(`  radius: Record<${radiusKeys}, string>`)

  // Shadows type (optional)
  if (tokens.shadows) {
    const shadowKeys = Object.keys(tokens.shadows)
      .map(k => `"${k}"`)
      .join(' | ')
    lines.push(`  shadows?: Record<${shadowKeys}, string>`)
  } else {
    lines.push('  shadows?: Record<string, string>')
  }

  // Breakpoints type (optional)
  if (tokens.breakpoints) {
    const breakpointKeys = Object.keys(tokens.breakpoints)
      .map(k => `"${k}"`)
      .join(' | ')
    lines.push(`  breakpoints?: Record<${breakpointKeys}, string>`)
  } else {
    lines.push('  breakpoints?: Record<string, string>')
  }

  lines.push('}')
  lines.push('')

  // Export tokens object
  lines.push('// Tokens object (imported from JSON)')
  lines.push('// Note: In ESM environments, you may need to use dynamic import')
  lines.push("// import tokensJson from './vistral-tokens.json'")
  lines.push('// export const tokens: VistralTokens = tokensJson as VistralTokens')

  return lines.join('\n')
}
