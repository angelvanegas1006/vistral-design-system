import type { Meta, StoryObj } from '@storybook/react'
import { useState, useCallback } from 'react'
import tokensJson from '../src/tokens/vistral-tokens.json'
import type { DesignTokens } from '../lib/figma-sync/types'

const tokens = tokensJson as DesignTokens

// =============================================================================
// UTILITIES
// =============================================================================

function getCssVarName(category: string, name: string): string {
  return `--vistral-${category}-${name}`.toLowerCase()
}

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

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Spacing visual block
 */
function SpacingBlock({ name, value }: { name: string; value: string }) {
  const numericValue = parseInt(value)
  const cssVar = getCssVarName('spacing', name)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 0',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      {/* Name & Value */}
      <div style={{ width: '80px' }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{value}</div>
      </div>

      {/* Visual representation */}
      <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: `${numericValue}px`,
            height: '24px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            borderRadius: '4px',
            minWidth: numericValue > 0 ? '2px' : '0',
          }}
        />
        {numericValue === 0 && (
          <div style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic' }}>none</div>
        )}
      </div>

      {/* CSS Variable */}
      <CopyButton value={cssVar} label="CSS variable" />
    </div>
  )
}

/**
 * Radius visual block
 */
function RadiusBlock({ name, value }: { name: string; value: string }) {
  const cssVar = getCssVarName('radius', name)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '24px',
        background: '#f9fafb',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        minWidth: '140px',
      }}
    >
      {/* Visual representation */}
      <div
        style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
          borderRadius: value,
        }}
      />

      {/* Info */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{value}</div>
      </div>

      {/* CSS Variable */}
      <CopyButton value={cssVar} label="CSS variable" />
    </div>
  )
}

/**
 * Spacing example card
 */
function SpacingExampleCard({
  title,
  description,
  spacingValue,
  type = 'padding',
}: {
  title: string
  description: string
  spacingValue: string
  type?: 'padding' | 'gap' | 'margin'
}) {
  const numericValue = parseInt(spacingValue)

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{description}</div>
      </div>
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
        {type === 'padding' && (
          <div
            style={{
              padding: `${numericValue}px`,
              background: '#dbeafe',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            <div
              style={{
                background: '#3b82f6',
                color: '#ffffff',
                padding: '12px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Content
            </div>
          </div>
        )}
        {type === 'gap' && (
          <div
            style={{
              display: 'flex',
              gap: `${numericValue}px`,
            }}
          >
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#3b82f6',
                  borderRadius: '8px',
                }}
              />
            ))}
          </div>
        )}
        {type === 'margin' && (
          <div style={{ background: '#fef3c7', padding: '4px', borderRadius: '8px' }}>
            <div
              style={{
                margin: `${numericValue}px`,
                background: '#3b82f6',
                color: '#ffffff',
                padding: '12px 16px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Element
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px', background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <code style={{ fontSize: '12px', color: '#6b7280' }}>
          {type}: {spacingValue}
        </code>
      </div>
    </div>
  )
}

/**
 * Radius example with different element types
 */
function RadiusExampleCard({
  title,
  radiusValue,
  elementType,
}: {
  title: string
  radiusValue: string
  elementType: 'button' | 'card' | 'input' | 'avatar' | 'badge'
}) {
  const renderElement = () => {
    switch (elementType) {
      case 'button':
        return (
          <button
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: radiusValue,
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Button
          </button>
        )
      case 'card':
        return (
          <div
            style={{
              width: '200px',
              padding: '20px',
              background: '#ffffff',
              borderRadius: radiusValue,
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Card Title</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Card content goes here</div>
          </div>
        )
      case 'input':
        return (
          <input
            type="text"
            placeholder="Input field"
            style={{
              padding: '12px 16px',
              borderRadius: radiusValue,
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              width: '200px',
              outline: 'none',
            }}
          />
        )
      case 'avatar':
        return (
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: radiusValue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '24px',
            }}
          >
            JD
          </div>
        )
      case 'badge':
        return (
          <span
            style={{
              padding: '4px 12px',
              background: '#dcfce7',
              color: '#166534',
              borderRadius: radiusValue,
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            Active
          </span>
        )
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          marginBottom: '12px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderElement()}
      </div>
      <div style={{ fontSize: '12px', color: '#6b7280' }}>{title}</div>
      <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace' }}>
        {radiusValue}
      </div>
    </div>
  )
}

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: 'Design System/Spacing & Radius',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete spacing and radius documentation
 */
export const Overview: Story = {
  render: () => {
    const spacing = tokens.spacing || {}
    const radius = tokens.radius || {}

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
            Spacing & Radius
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.7, maxWidth: '700px' }}>
            Consistent spacing and border radius values create visual rhythm and harmony. Our scale
            is based on a 4px grid for precise alignment.
          </p>
        </div>

        {/* Spacing Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#18181b' }}>
            Spacing Scale
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Use these values for padding, margin, and gap. Built on a 4px base unit.
          </p>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '0 16px',
            }}
          >
            {Object.entries(spacing)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([name, value]) => (
                <SpacingBlock key={name} name={name} value={value} />
              ))}
          </div>
        </section>

        {/* Radius Section */}
        <section>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#18181b' }}>
            Border Radius
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Consistent rounding for buttons, cards, inputs, and other UI elements.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {Object.entries(radius).map(([name, value]) => (
              <RadiusBlock key={name} name={name} value={value} />
            ))}
          </div>
        </section>
      </div>
    )
  },
}

/**
 * Visual spacing scale
 */
export const SpacingScale: Story = {
  render: () => {
    const spacing = tokens.spacing || {}

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
          Spacing Scale
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
          Our spacing scale follows a 4px grid system. Each step increases predictably to maintain
          visual consistency across the interface.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.entries(spacing)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([name, value]) => {
              const numericValue = parseInt(value)
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{ width: '60px', fontSize: '14px', fontWeight: 600, color: '#18181b' }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      width: '60px',
                      fontSize: '12px',
                      color: '#6b7280',
                      fontFamily: 'monospace',
                    }}
                  >
                    {value}
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: `${numericValue}px`,
                        height: '32px',
                        background: `linear-gradient(90deg, #3b82f6 0%, #6366f1 ${Math.min(100, numericValue)}%)`,
                        borderRadius: '4px',
                        minWidth: numericValue > 0 ? '2px' : '0',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              )
            })}
        </div>

        {/* Grid overlay example */}
        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#18181b' }}>
            4px Grid System
          </h2>
          <div
            style={{
              position: 'relative',
              width: '400px',
              height: '200px',
              background: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '4px 4px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              padding: '16px',
            }}
          >
            <div
              style={{
                width: '96px',
                height: '48px',
                background: '#3b82f6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              96 × 48
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
            All spacing values align to the 4px grid for pixel-perfect layouts.
          </p>
        </div>
      </div>
    )
  },
}

/**
 * Spacing usage examples
 */
export const SpacingExamples: Story = {
  render: () => {
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
          Spacing Examples
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
          See how different spacing values affect layout in real components.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          <SpacingExampleCard
            title="Tight (8px)"
            description="Use for compact elements"
            spacingValue="8px"
            type="padding"
          />
          <SpacingExampleCard
            title="Default (16px)"
            description="Standard component padding"
            spacingValue="16px"
            type="padding"
          />
          <SpacingExampleCard
            title="Relaxed (24px)"
            description="Cards and sections"
            spacingValue="24px"
            type="padding"
          />
          <SpacingExampleCard
            title="Small Gap (8px)"
            description="Tight element groups"
            spacingValue="8px"
            type="gap"
          />
          <SpacingExampleCard
            title="Medium Gap (16px)"
            description="Standard flex layouts"
            spacingValue="16px"
            type="gap"
          />
          <SpacingExampleCard
            title="Large Gap (24px)"
            description="Card grids and lists"
            spacingValue="24px"
            type="gap"
          />
        </div>
      </div>
    )
  },
}

/**
 * Border radius showcase
 */
export const RadiusShowcase: Story = {
  render: () => {
    const radius = tokens.radius || {}

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
          Border Radius
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
          Consistent border radius creates visual harmony. Use smaller values for compact elements
          and larger values for prominent containers.
        </p>

        {/* Visual comparison */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            Visual Comparison
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end' }}>
            {Object.entries(radius).map(([name, value]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    borderRadius: value,
                    marginBottom: '12px',
                  }}
                />
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>{name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage examples */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            Usage by Element Type
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '32px',
            }}
          >
            <RadiusExampleCard title="Button (md)" radiusValue="8px" elementType="button" />
            <RadiusExampleCard title="Card (lg)" radiusValue="12px" elementType="card" />
            <RadiusExampleCard title="Input (md)" radiusValue="8px" elementType="input" />
            <RadiusExampleCard title="Avatar (full)" radiusValue="9999px" elementType="avatar" />
            <RadiusExampleCard title="Badge (full)" radiusValue="9999px" elementType="badge" />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Combined layout examples
 */
export const LayoutExamples: Story = {
  render: () => {
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
          Layout Examples
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
          See how spacing and radius work together in real UI patterns.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Card Example */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Card Component
            </h3>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px', // radius-lg
                border: '1px solid #e5e7eb',
                padding: '24px', // spacing-6
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#dbeafe',
                    borderRadius: '9999px', // radius-full
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📊</span>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                    Analytics
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Track your metrics</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    padding: '8px 16px', // spacing-2, spacing-4
                    background: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px', // radius-md
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  View
                </button>
                <button
                  style={{
                    padding: '8px 16px',
                    background: '#ffffff',
                    color: '#374151',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Settings
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: '12px',
                fontSize: '12px',
                color: '#9ca3af',
                fontFamily: 'monospace',
              }}
            >
              padding: 24px, radius: 12px, gap: 16px/8px
            </div>
          </div>

          {/* Form Example */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Form Layout
            </h3>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '8px',
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <button
                  style={{
                    padding: '12px 24px',
                    background: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: '12px',
                fontSize: '12px',
                color: '#9ca3af',
                fontFamily: 'monospace',
              }}
            >
              gap: 16px, input padding: 12px 16px, radius: 8px
            </div>
          </div>

          {/* List Example */}
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              List Items
            </h3>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
              }}
            >
              {['Inbox', 'Drafts', 'Sent', 'Archive'].map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                    }}
                  >
                    📁
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{item}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: '12px',
                fontSize: '12px',
                color: '#9ca3af',
                fontFamily: 'monospace',
              }}
            >
              item padding: 16px 20px, gap: 12px
            </div>
          </div>
        </div>
      </div>
    )
  },
}
