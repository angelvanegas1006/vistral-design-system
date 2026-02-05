import type { Meta, StoryObj } from '@storybook/react'
import { useState, useCallback } from 'react'
import tokensJson from '../src/tokens/vistral-tokens.json'
import type { DesignTokens } from '../lib/figma-sync/types'

const tokens = tokensJson as DesignTokens

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Calculate relative luminance for WCAG contrast
 */
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculate WCAG contrast ratio between two colors
 */
function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get WCAG compliance level
 */
function getWCAGLevel(contrast: number): { level: string; color: string } {
  if (contrast >= 7) return { level: 'AAA', color: '#059669' }
  if (contrast >= 4.5) return { level: 'AA', color: '#10b981' }
  if (contrast >= 3) return { level: 'AA Large', color: '#f59e0b' }
  return { level: 'Fail', color: '#ef4444' }
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Determine if text should be light or dark based on background
 */
function getTextColor(bgHex: string): string {
  const luminance = getLuminance(bgHex)
  return luminance > 0.179 ? '#18181b' : '#ffffff'
}

/**
 * Generate CSS variable name from token path
 */
function getCssVarName(category: string, name: string): string {
  return `--vistral-${category}-${name}`.toLowerCase().replace(/\s+/g, '-')
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Copy button with feedback
 */
function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [value])

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'transparent',
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        padding: '4px 8px',
        fontSize: '11px',
        fontFamily: 'monospace',
        cursor: 'pointer',
        color: copied ? '#059669' : '#6b7280',
        transition: 'all 0.2s',
      }}
      title={`Copy ${label || value}`}
    >
      {copied ? '✓ Copied!' : value}
    </button>
  )
}

/**
 * Enhanced Color Swatch with WCAG info
 */
function ColorSwatch({ name, value, category }: { name: string; value: string; category: string }) {
  // Validate that value is a string
  if (typeof value !== 'string') {
    console.warn(`ColorSwatch: value for "${name}" is not a string:`, value)
    return null
  }

  const textColor = getTextColor(value)
  const contrastWhite = getContrastRatio(value, '#ffffff')
  const contrastBlack = getContrastRatio(value, '#000000')
  const wcagWhite = getWCAGLevel(contrastWhite)
  const wcagBlack = getWCAGLevel(contrastBlack)
  const cssVar = getCssVarName(category, name)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '180px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {/* Color preview */}
      <div
        style={{
          height: '100px',
          backgroundColor: value,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            color: textColor,
            fontSize: '24px',
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          Aa
        </span>
      </div>

      {/* Info section */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Name */}
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{name}</div>

        {/* Hex value with copy */}
        <CopyButton value={value} label="hex value" />

        {/* CSS Variable */}
        <div style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'monospace' }}>{cssVar}</div>

        {/* WCAG Contrast */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
            }}
          >
            <span
              style={{
                width: '14px',
                height: '14px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '2px',
              }}
            />
            <span style={{ color: wcagWhite.color, fontWeight: 600 }}>{wcagWhite.level}</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
            }}
          >
            <span
              style={{
                width: '14px',
                height: '14px',
                background: '#000000',
                borderRadius: '2px',
              }}
            />
            <span style={{ color: wcagBlack.color, fontWeight: 600 }}>{wcagBlack.level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Color category section
 */
function ColorCategory({
  title,
  description,
  colors,
  categoryKey,
}: {
  title: string
  description?: string
  colors: Record<string, string>
  categoryKey: string
}) {
  const colorEntries = Object.entries(colors)

  if (colorEntries.length === 0) {
    return (
      <div style={{ marginBottom: '48px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '8px',
            color: '#18181b',
            textTransform: 'capitalize',
          }}
        >
          {title}
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>
          No colors defined in this category yet.
        </p>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '48px' }}>
      <h3
        style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '8px',
          color: '#18181b',
          textTransform: 'capitalize',
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            color: '#6b7280',
            fontSize: '14px',
            marginBottom: '24px',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '20px',
        }}
      >
        {colorEntries
          .filter(([_, value]) => typeof value === 'string')
          .map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value as string} category={categoryKey} />
          ))}
      </div>
    </div>
  )
}

/**
 * Group colors by family (e.g., slate-50, slate-100 -> slate family)
 */
function groupColorsByFamily(
  colors: Record<string, string>
): Record<string, Record<string, string>> {
  const families: Record<string, Record<string, string>> = {}

  Object.entries(colors).forEach(([name, value]) => {
    // Skip non-string values
    if (typeof value !== 'string') {
      return
    }

    // Extract family name (e.g., "slate-500" -> "slate", "text-primary" -> "text")
    const match = name.match(/^([a-z-]+?)(?:-\d+)?$/)
    const family = match ? match[1] : name

    if (!families[family]) {
      families[family] = {}
    }
    families[family][name] = value
  })

  return families
}

/**
 * Sort color shades (950 first, then 900, 800... down to 50)
 */
function sortColorShades(colors: Record<string, string>): [string, string][] {
  return Object.entries(colors)
    .filter(([_, value]) => typeof value === 'string')
    .sort(([a], [b]) => {
      const shadeA = parseInt(a.match(/-(\d+)$/)?.[1] || '0')
      const shadeB = parseInt(b.match(/-(\d+)$/)?.[1] || '0')
      return shadeB - shadeA // Descending (dark to light)
    })
}

/**
 * Color family row (e.g., all slate colors in a row)
 */
function ColorFamilyRow({
  family,
  colors,
  category,
}: {
  family: string
  colors: Record<string, string>
  category: string
}) {
  const sortedColors = sortColorShades(colors)

  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '8px',
          color: '#18181b',
          textTransform: 'capitalize',
        }}
      >
        {family}
      </div>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {sortedColors
          .filter(([_, value]) => typeof value === 'string')
          .map(([name, value]) => {
            const shade = name.match(/-(\d+)$/)?.[1] || ''
            const textColor = getTextColor(value as string)

            return (
              <div
                key={name}
                title={`${name}: ${value}`}
                onClick={() => navigator.clipboard.writeText(value as string)}
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: value as string,
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: textColor }}>
                  {shade || 'base'}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

/**
 * Color palette overview (all colors in compact view)
 */
function ColorPaletteOverview({ colors }: { colors: DesignTokens['colors'] }) {
  const primaryFamilies = groupColorsByFamily(colors.primary || {})

  return (
    <div style={{ marginBottom: '48px' }}>
      <h3
        style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '24px',
          color: '#18181b',
        }}
      >
        Color Palette Overview
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>
        Click any color to copy its hex value to clipboard.
      </p>
      <div>
        {Object.entries(primaryFamilies).map(([family, familyColors]) => (
          <ColorFamilyRow key={family} family={family} colors={familyColors} category="primary" />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete color documentation showing all color tokens organized by category.
 * Each swatch includes:
 * - Visual preview with sample text
 * - Hex value (click to copy)
 * - CSS variable name
 * - WCAG contrast ratios against white and black backgrounds
 */
export const AllColors: Story = {
  render: () => {
    const documentation = tokens.documentation?.Colors

    return (
      <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
            Colors
          </h1>
          {documentation?.description && (
            <p
              style={{
                color: '#6b7280',
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '800px',
              }}
            >
              {documentation.description}
            </p>
          )}
        </div>

        {/* Overview */}
        <ColorPaletteOverview colors={tokens.colors} />

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '48px 0' }} />

        {/* Categories */}
        {Object.entries(tokens.colors).map(([category, colors]) => {
          // Recursive function to flatten nested color structures
          const flattenColors = (obj: any, prefix = ''): Record<string, string> => {
            const result: Record<string, string> = {}

            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
              return result
            }

            Object.entries(obj).forEach(([key, value]) => {
              const fullKey = prefix ? `${prefix}-${key}` : key

              if (typeof value === 'string') {
                // Found a color value (hex string)
                result[fullKey] = value
              } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                // Recursively flatten nested objects
                Object.assign(result, flattenColors(value, fullKey))
              }
            })

            return result
          }

          const flatColors = flattenColors(colors)

          return (
            <ColorCategory
              key={category}
              title={category}
              colors={flatColors}
              categoryKey={category}
            />
          )
        })}
      </div>
    )
  },
}

/**
 * Primary colors organized by family (slate, gray, blue, etc.)
 * These are the foundational color palette following Tailwind conventions.
 */
export const Primary: Story = {
  render: () => {
    const families = groupColorsByFamily(tokens.colors.primary || {})

    // Define color groups for better organization
    const grayscales = ['slate', 'gray', 'zinc', 'neutral', 'stone']
    const warmColors = ['red', 'orange', 'amber', 'yellow', 'lime']
    const coolColors = ['green', 'emerald', 'teal', 'cyan', 'sky']
    const blueViolet = ['blue', 'indigo', 'violet', 'purple', 'fuchsia']
    const pinks = ['pink', 'rose']

    const renderGroup = (title: string, familyNames: string[]) => {
      const groupFamilies = familyNames.filter(name => families[name])
      if (groupFamilies.length === 0) return null

      return (
        <div style={{ marginBottom: '48px' }}>
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#6b7280',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title}
          </h4>
          {groupFamilies.map(family => (
            <ColorFamilyRow
              key={family}
              family={family}
              colors={families[family]}
              category="primary"
            />
          ))}
        </div>
      )
    }

    return (
      <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Primary Colors
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '32px',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}
        >
          Our foundational color palette based on Tailwind CSS conventions. Each family includes
          shades from 50 (lightest) to 950 (darkest). Click any color to copy its hex value.
        </p>

        {renderGroup('Grayscales', grayscales)}
        {renderGroup('Warm Colors', warmColors)}
        {renderGroup('Cool Colors', coolColors)}
        {renderGroup('Blue & Violet', blueViolet)}
        {renderGroup('Pinks', pinks)}
      </div>
    )
  },
}

/**
 * Semantic colors - colors that convey meaning like success, error, warning.
 */
export const Semantic: Story = {
  render: () => {
    const semanticColors = tokens.colors.semantic || {}

    // Flatten nested semantic structure for display
    const flattenSemantic = (obj: any, prefix = ''): Record<string, string> => {
      const result: Record<string, string> = {}
      if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return result
      }
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}-${key}` : key
        if (typeof value === 'string') {
          result[fullKey] = value
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.assign(result, flattenSemantic(value, fullKey))
        }
      })
      return result
    }

    const flattened = flattenSemantic(semanticColors)
    const families = groupColorsByFamily(flattened)

    return (
      <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Semantic Colors
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '32px',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}
        >
          Semantic colors communicate status and feedback. Use these consistently to help users
          understand the state of the system at a glance.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {Object.entries(families).map(([family, colors]) => (
            <div
              key={family}
              style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px' }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  textTransform: 'capitalize',
                  color: '#18181b',
                }}
              >
                {family}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sortColorShades(colors).map(([name, value]) => {
                  if (typeof value !== 'string') return null
                  const shade = name.match(/-(\d+)$/)?.[1] || 'base'
                  return (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '32px',
                          backgroundColor: value,
                          borderRadius: '6px',
                          border: '1px solid rgba(0,0,0,0.08)',
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#18181b' }}>
                          {name.replace(`${family}-`, '')}
                        </div>
                        <div
                          style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * Component-specific colors - colors tied to specific UI components.
 */
export const Component: Story = {
  render: () => {
    const componentColors = tokens.colors.component || {}

    // Flatten nested component structure for display
    const flattenComponent = (obj: any, prefix = ''): Record<string, string> => {
      const result: Record<string, string> = {}
      if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return result
      }
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}-${key}` : key
        if (typeof value === 'string') {
          result[fullKey] = value
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.assign(result, flattenComponent(value, fullKey))
        }
      })
      return result
    }

    const flattened = flattenComponent(componentColors)
    const families = groupColorsByFamily(flattened)

    return (
      <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Component Colors
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '32px',
            maxWidth: '700px',
            lineHeight: 1.6,
          }}
        >
          These colors are designed for specific UI contexts: text colors with opacity variants,
          background colors, borders, and component-specific tokens like badges.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {Object.entries(families).map(([family, colors]) => (
            <div
              key={family}
              style={{
                background: family.includes('dark') ? '#18181b' : '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e5e7eb',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  textTransform: 'capitalize',
                  color: family.includes('dark') ? '#ffffff' : '#18181b',
                }}
              >
                {family.replace(/-/g, ' ')}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {Object.entries(colors).map(([name, value]) => {
                  if (typeof value !== 'string') return null
                  return (
                    <div
                      key={name}
                      title={`${name}: ${value}`}
                      onClick={() => navigator.clipboard.writeText(value)}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: value,
                        borderRadius: '6px',
                        border: '1px solid rgba(128,128,128,0.2)',
                        cursor: 'pointer',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * WCAG Contrast checker tool
 */
export const ContrastChecker: Story = {
  render: () => {
    const [bgColor, setBgColor] = useState('#10b981')
    const [textColor, setTextColor] = useState('#ffffff')

    const contrast = getContrastRatio(bgColor, textColor)
    const wcag = getWCAGLevel(contrast)

    return (
      <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Contrast Checker
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: 1.6 }}>
          Test color combinations for WCAG accessibility compliance. WCAG 2.2 requires a minimum
          contrast ratio of 4.5:1 for normal text (AA) and 7:1 for enhanced contrast (AAA).
        </p>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label
              style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}
            >
              Background Color
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={e => setBgColor(e.target.value)}
              style={{ width: '80px', height: '40px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={bgColor}
              onChange={e => setBgColor(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: 'monospace',
                width: '100px',
              }}
            />
          </div>
          <div>
            <label
              style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}
            >
              Text Color
            </label>
            <input
              type="color"
              value={textColor}
              onChange={e => setTextColor(e.target.value)}
              style={{ width: '80px', height: '40px', cursor: 'pointer' }}
            />
            <input
              type="text"
              value={textColor}
              onChange={e => setTextColor(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontFamily: 'monospace',
                width: '100px',
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div
          style={{
            backgroundColor: bgColor,
            color: textColor,
            padding: '48px',
            borderRadius: '12px',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Sample Heading</h2>
          <p style={{ fontSize: '16px', lineHeight: 1.6 }}>
            The quick brown fox jumps over the lazy dog. This sample text helps you evaluate the
            readability of your color combination.
          </p>
        </div>

        {/* Results */}
        <div
          style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
              Contrast Ratio
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#18181b' }}>
              {contrast.toFixed(2)}:1
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
              WCAG Level
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: wcag.color }}>{wcag.level}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              <div>✓ AA Normal Text: 4.5:1</div>
              <div>✓ AA Large Text: 3:1</div>
              <div>✓ AAA Normal Text: 7:1</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
