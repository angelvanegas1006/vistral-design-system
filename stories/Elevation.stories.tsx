import type { Meta, StoryObj } from '@storybook/react'
import tokensJson from '../src/tokens/vistral-tokens.json'
import type { DesignTokens } from '../lib/figma-sync/types'

const tokens = tokensJson as DesignTokens

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: 'Design System/Elevation',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Elevation system documentation
 */
export const Overview: Story = {
  render: () => {
    const elevation = tokens.elevation || {}
    const shadows = tokens.shadows || {}

    const elevationConfig = [
      { level: '0', shadow: 'none', zIndex: 0, usage: 'Base level, no elevation' },
      { level: '1', shadow: shadows['level-1'], zIndex: 10, usage: 'Cards, containers' },
      { level: '2', shadow: shadows['level-2'], zIndex: 20, usage: 'Dropdowns, menus' },
      { level: '3', shadow: shadows['level-3'], zIndex: 30, usage: 'Modals, dialogs' },
      { level: '4', shadow: shadows['level-4'], zIndex: 40, usage: 'Toasts, notifications' },
      { level: '5', shadow: shadows['level-4'], zIndex: 50, usage: 'Maximum elevation' },
    ]

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
            Elevation
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.7, maxWidth: '700px' }}>
            Elevation creates visual hierarchy through shadows and z-index stacking. Higher
            elevation means elements appear closer to the user.
          </p>
        </div>

        {/* Elevation Scale */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            Elevation Scale
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '32px',
              padding: '48px',
              background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '16px',
              minHeight: '300px',
            }}
          >
            {elevationConfig.map((item, index) => (
              <div key={item.level} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: `${80 + index * 16}px`,
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: item.shadow || 'none',
                    border: item.shadow ? 'none' : '1px solid #e5e7eb',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateY(${-index * 4}px)`,
                  }}
                >
                  <span style={{ fontSize: '32px', fontWeight: 700, color: '#3b82f6' }}>
                    {item.level}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>
                  Level {item.level}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                  z-index: {item.zIndex}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Table */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            When to Use
          </h2>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 100px 1fr 1fr',
                padding: '16px 24px',
                background: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '12px',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <div>Level</div>
              <div>Z-Index</div>
              <div>Usage</div>
              <div>Components</div>
            </div>
            {[
              {
                level: 0,
                zIndex: 0,
                usage: 'Base content',
                components: 'Page content, backgrounds',
              },
              {
                level: 1,
                zIndex: 10,
                usage: 'Subtle elevation',
                components: 'Cards, list items, form fields',
              },
              {
                level: 2,
                zIndex: 20,
                usage: 'Overlays on content',
                components: 'Dropdowns, popovers, tooltips',
              },
              {
                level: 3,
                zIndex: 30,
                usage: 'Primary overlays',
                components: 'Modals, dialogs, sidesheets',
              },
              {
                level: 4,
                zIndex: 40,
                usage: 'Urgent content',
                components: 'Toasts, notifications, alerts',
              },
              {
                level: 5,
                zIndex: 50,
                usage: 'Critical overlays',
                components: 'System dialogs, loading screens',
              },
            ].map(row => (
              <div
                key={row.level}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 100px 1fr 1fr',
                  padding: '16px 24px',
                  borderBottom: '1px solid #f3f4f6',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#3b82f6' }}>
                  {row.level}
                </div>
                <div style={{ fontSize: '14px', fontFamily: 'monospace', color: '#6b7280' }}>
                  {row.zIndex}
                </div>
                <div style={{ fontSize: '14px', color: '#374151' }}>{row.usage}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{row.components}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Stacking Example */}
        <section>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            Stacking Context
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Elements at higher elevations always appear above lower ones, regardless of DOM order.
          </p>

          <div
            style={{
              position: 'relative',
              height: '300px',
              background: '#f9fafb',
              borderRadius: '16px',
              padding: '24px',
              overflow: 'hidden',
            }}
          >
            {/* Level 0 - Background */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                width: '200px',
                height: '120px',
                background: '#e5e7eb',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#6b7280',
                zIndex: 0,
              }}
            >
              Level 0 (Background)
            </div>

            {/* Level 1 - Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '80px',
                width: '200px',
                padding: '20px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: shadows['level-1'],
                zIndex: 10,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Level 1 Card</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>z-index: 10</div>
            </div>

            {/* Level 2 - Dropdown */}
            <div
              style={{
                position: 'absolute',
                bottom: '100px',
                left: '160px',
                width: '160px',
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: shadows['level-2'],
                zIndex: 20,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  fontWeight: 500,
                  fontSize: '13px',
                }}
              >
                Level 2 Menu
              </div>
              {['Item 1', 'Item 2'].map(item => (
                <div
                  key={item}
                  style={{ padding: '10px 16px', fontSize: '13px', color: '#374151' }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Level 3 - Modal */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '220px',
                padding: '20px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: shadows['level-3'],
                zIndex: 30,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>Level 3 Modal</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                z-index: 30
              </div>
              <button
                style={{
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Action
              </button>
            </div>

            {/* Level 4 - Toast */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '12px 20px',
                background: '#18181b',
                color: '#ffffff',
                borderRadius: '8px',
                boxShadow: shadows['level-4'],
                zIndex: 40,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>✓</span>
              Level 4 Toast (z-index: 40)
            </div>
          </div>
        </section>
      </div>
    )
  },
}
