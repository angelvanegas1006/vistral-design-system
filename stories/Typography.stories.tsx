import type { Meta, StoryObj } from '@storybook/react'
import { useState, useCallback } from 'react'
import tokensJson from '../src/tokens/vistral-tokens.json'
import type { DesignTokens } from '../lib/figma-sync/types'

const tokens = tokensJson as DesignTokens

// =============================================================================
// UTILITIES
// =============================================================================

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
 * Typography sample row
 */
function TypeScaleRow({
  name,
  fontSize,
  lineHeight,
  fontWeight = 400,
}: {
  name: string
  fontSize: string
  lineHeight?: string
  fontWeight?: number
}) {
  const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter, system-ui, sans-serif'
  const cssVar = getCssVarName('font-size', name)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 80px 80px 1fr',
        alignItems: 'center',
        gap: '24px',
        padding: '16px 0',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      {/* Name & Size */}
      <div>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
          {fontSize}
        </div>
      </div>

      {/* Line Height */}
      <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
        {lineHeight || 'auto'}
      </div>

      {/* CSS Variable */}
      <CopyButton value={cssVar} label="CSS variable" />

      {/* Sample */}
      <div
        style={{
          fontFamily,
          fontSize,
          lineHeight: lineHeight || '1.5',
          fontWeight,
          color: '#18181b',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  )
}

/**
 * Font weight sample
 */
function FontWeightSample({ name, weight }: { name: string; weight: number }) {
  const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter, system-ui, sans-serif'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '16px 0',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      <div style={{ width: '120px' }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: '14px',
            color: '#18181b',
            textTransform: 'capitalize',
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{weight}</div>
      </div>

      <div
        style={{
          fontFamily,
          fontSize: '24px',
          fontWeight: weight,
          color: '#18181b',
        }}
      >
        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn
      </div>
    </div>
  )
}

/**
 * Typography usage example card
 */
function UsageCard({
  title,
  description,
  children,
  dark = false,
}: {
  title: string
  description: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{description}</div>
      </div>
      <div
        style={{
          padding: '24px',
          background: dark ? '#18181b' : '#ffffff',
          color: dark ? '#ffffff' : '#18181b',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete typography documentation showing all type scales,
 * font weights, and usage examples.
 */
export const AllTypography: Story = {
  render: () => {
    const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter'
    const fontSizes = tokens.typography?.fontSize || {}
    const fontWeights = tokens.typography?.fontWeight || {}
    const lineHeights = tokens.typography?.lineHeight || {}

    return (
      <div
        style={{
          padding: '48px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
            Typography
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.7, maxWidth: '700px' }}>
            Our typography system is built on <strong>{fontFamily}</strong> as the primary typeface,
            with a carefully crafted scale that ensures readability and visual hierarchy across all
            contexts.
          </p>
        </div>

        {/* Font Family */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            Font Family
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {Object.entries(tokens.typography?.fontFamily || {}).map(([name, family]) => (
              <div
                key={name}
                style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 500,
                    fontFamily: family,
                    marginBottom: '16px',
                  }}
                >
                  Aa
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#6b7280' }}>
                  {family}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type Scale */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#18181b' }}>
            Type Scale
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Font sizes with corresponding line heights for optimal readability.
          </p>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 80px 80px 1fr',
                gap: '24px',
                padding: '12px 16px',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '11px',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <div>Size</div>
              <div>Line Height</div>
              <div>CSS Variable</div>
              <div>Sample</div>
            </div>

            {/* Rows */}
            <div style={{ padding: '0 16px' }}>
              {Object.entries(fontSizes)
                .sort(([, a], [, b]) => parseInt(b) - parseInt(a))
                .map(([name, size]) => (
                  <TypeScaleRow
                    key={name}
                    name={name}
                    fontSize={size}
                    lineHeight={lineHeights[name]}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#18181b' }}>
            Font Weights
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Available font weights for creating visual hierarchy and emphasis.
          </p>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '0 16px',
            }}
          >
            {Object.entries(fontWeights)
              .sort(([, a], [, b]) => (a as number) - (b as number))
              .map(([name, weight]) => (
                <FontWeightSample key={name} name={name} weight={weight as number} />
              ))}
          </div>
        </section>
      </div>
    )
  },
}

/**
 * Visual type scale showing all sizes in a compact view
 */
export const TypeScale: Story = {
  render: () => {
    const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter, system-ui, sans-serif'
    const fontSizes = tokens.typography?.fontSize || {}
    const lineHeights = tokens.typography?.lineHeight || {}

    return (
      <div
        style={{
          padding: '48px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Type Scale
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Our modular type scale provides consistent sizing across the interface. Each size is
          paired with an appropriate line height for optimal readability.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {Object.entries(fontSizes)
            .sort(([, a], [, b]) => parseInt(b) - parseInt(a))
            .map(([name, size]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                <div
                  style={{
                    width: '80px',
                    fontSize: '12px',
                    color: '#6b7280',
                    fontFamily: 'monospace',
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    width: '60px',
                    fontSize: '12px',
                    color: '#9ca3af',
                    fontFamily: 'monospace',
                  }}
                >
                  {size}
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: size,
                    lineHeight: lineHeights[name] || '1.5',
                    fontWeight: 500,
                    color: '#18181b',
                  }}
                >
                  The quick brown fox
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  },
}

/**
 * Font weights comparison
 */
export const FontWeights: Story = {
  render: () => {
    const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter, system-ui, sans-serif'
    const fontWeights = tokens.typography?.fontWeight || {}

    return (
      <div
        style={{
          padding: '48px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Font Weights
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Using the right font weight helps establish visual hierarchy and guides the reader's eye
          through your content.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {Object.entries(fontWeights)
            .sort(([, a], [, b]) => (a as number) - (b as number))
            .map(([name, weight]) => (
              <div key={name}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '8px',
                    textTransform: 'capitalize',
                  }}
                >
                  {name} ({weight})
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '48px',
                    fontWeight: weight as number,
                    color: '#18181b',
                    lineHeight: 1.2,
                  }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '48px',
                    fontWeight: weight as number,
                    color: '#18181b',
                    lineHeight: 1.2,
                  }}
                >
                  abcdefghijklmnopqrstuvwxyz
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: '48px',
                    fontWeight: weight as number,
                    color: '#18181b',
                    lineHeight: 1.2,
                  }}
                >
                  0123456789
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  },
}

/**
 * Typography usage examples in real-world contexts
 */
export const UsageExamples: Story = {
  render: () => {
    const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter, system-ui, sans-serif'

    return (
      <div
        style={{
          padding: '48px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Usage Examples
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Real-world examples of typography combinations for common UI patterns.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Page Header */}
          <UsageCard title="Page Header" description="3xl/semibold + base/regular">
            <div style={{ fontFamily }}>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  lineHeight: '58px',
                }}
              >
                Dashboard
              </h1>
              <p
                style={{ fontSize: '16px', fontWeight: 400, color: '#6b7280', lineHeight: '24px' }}
              >
                Welcome back! Here's an overview of your recent activity and key metrics.
              </p>
            </div>
          </UsageCard>

          {/* Section Header */}
          <UsageCard title="Section Header" description="xl/semibold + caption/regular">
            <div style={{ fontFamily }}>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  lineHeight: '38px',
                }}
              >
                Recent Orders
              </h2>
              <p
                style={{ fontSize: '14px', fontWeight: 400, color: '#6b7280', lineHeight: '20px' }}
              >
                Your latest transactions from the past 30 days
              </p>
            </div>
          </UsageCard>

          {/* Card Title */}
          <UsageCard title="Card Title" description="md/medium + small/regular">
            <div style={{ fontFamily }}>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  marginBottom: '8px',
                  lineHeight: '28px',
                }}
              >
                Revenue Overview
              </h3>
              <p
                style={{ fontSize: '12px', fontWeight: 400, color: '#6b7280', lineHeight: '16px' }}
              >
                Total revenue for the current quarter
              </p>
              <div style={{ fontSize: '36px', fontWeight: 600, marginTop: '16px' }}>$124,500</div>
            </div>
          </UsageCard>

          {/* Body Text */}
          <UsageCard title="Body Text" description="base/regular paragraph">
            <div style={{ fontFamily }}>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  marginBottom: '16px',
                }}
              >
                This is a standard body paragraph. It uses our base size with regular weight for
                optimal readability in long-form content.
              </p>
              <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>
                Multiple paragraphs maintain consistent spacing. Use{' '}
                <strong style={{ fontWeight: 600 }}>semibold</strong> for emphasis within body text.
              </p>
            </div>
          </UsageCard>

          {/* Caption & Labels */}
          <UsageCard title="Caption & Labels" description="small/medium + xs/regular">
            <div style={{ fontFamily }}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Email Address
                </label>
                <div
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  user@example.com
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>
                  We'll never share your email with anyone else.
                </div>
              </div>
            </div>
          </UsageCard>

          {/* Dark Mode */}
          <UsageCard title="Dark Mode" description="Typography on dark backgrounds" dark>
            <div style={{ fontFamily }}>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  lineHeight: '32px',
                }}
              >
                Dark Theme
              </h3>
              <p
                style={{ fontSize: '14px', fontWeight: 400, color: '#a3a3a3', lineHeight: '20px' }}
              >
                Text colors are adjusted for proper contrast on dark backgrounds. Primary text uses
                white, secondary text uses neutral-400.
              </p>
            </div>
          </UsageCard>
        </div>
      </div>
    )
  },
}

/**
 * Line heights and their effect on readability
 */
export const LineHeights: Story = {
  render: () => {
    const fontFamily = tokens.typography?.fontFamily?.sans || 'Inter, system-ui, sans-serif'
    const lineHeights = tokens.typography?.lineHeight || {}

    const sampleText =
      'Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.'

    return (
      <div
        style={{
          padding: '48px',
          maxWidth: '1200px',
          margin: '0 auto',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#18181b' }}>
          Line Heights
        </h1>
        <p
          style={{
            color: '#6b7280',
            fontSize: '16px',
            marginBottom: '48px',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          Proper line height improves readability by giving text room to breathe. Each font size has
          an optimized line height.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
          }}
        >
          {Object.entries(lineHeights).map(([name, value]) => (
            <div
              key={name}
              style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #e5e7eb',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}
              >
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                  line-height: {value}
                </div>
              </div>
              <p
                style={{
                  fontFamily,
                  fontSize: tokens.typography?.fontSize?.[name] || '16px',
                  lineHeight: value,
                  color: '#374151',
                  margin: 0,
                }}
              >
                {sampleText.slice(0, 150)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
