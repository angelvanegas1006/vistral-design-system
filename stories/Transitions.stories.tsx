import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import tokensJson from '../src/tokens/vistral-tokens.json'
import type { DesignTokens } from '../lib/figma-sync/types'

const tokens = tokensJson as DesignTokens

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: 'Design System/Transitions',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete transitions documentation
 */
export const Overview: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null)
    const transitions = tokens.transitions || { duration: {}, easing: {} }

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
            Transitions
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.7, maxWidth: '700px' }}>
            Transitions provide visual feedback and create smooth state changes. Consistent timing
            and easing make interactions feel natural.
          </p>
        </div>

        {/* Duration Scale */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#18181b' }}>
            Duration
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Click each bar to see the animation duration.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(transitions.duration || {}).map(([name, value]) => {
              const duration = parseInt(value)
              const isActive = activeDemo === `duration-${name}`

              return (
                <div
                  key={name}
                  onClick={() => {
                    setActiveDemo(`duration-${name}`)
                    setTimeout(() => setActiveDemo(null), duration + 100)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    padding: '12px 0',
                  }}
                >
                  <div style={{ width: '80px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#18181b' }}>
                      {name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                      {value}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '40px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: isActive ? '100%' : '0%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
                        borderRadius: '8px',
                        transition: `width ${value} ease-out`,
                      }}
                    />
                  </div>
                  <div style={{ width: '60px', fontSize: '12px', color: '#9ca3af' }}>
                    {duration}ms
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Easing Functions */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#18181b' }}>
            Easing Functions
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Hover over each card to see the easing in action.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {Object.entries(transitions.easing || {}).map(([name, value]) => (
              <div
                key={name}
                style={{
                  padding: '24px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    marginBottom: '4px',
                    color: '#18181b',
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    fontFamily: 'monospace',
                    marginBottom: '16px',
                    wordBreak: 'break-all',
                  }}
                >
                  {value}
                </div>

                {/* Demo ball */}
                <div
                  style={{
                    height: '48px',
                    background: '#ffffff',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    const ball = e.currentTarget.querySelector('.demo-ball') as HTMLElement
                    if (ball) ball.style.left = 'calc(100% - 24px)'
                  }}
                  onMouseLeave={e => {
                    const ball = e.currentTarget.querySelector('.demo-ball') as HTMLElement
                    if (ball) ball.style.left = '8px'
                  }}
                >
                  <div
                    className="demo-ball"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '8px',
                      width: '16px',
                      height: '16px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      transform: 'translateY(-50%)',
                      transition: `left 500ms ${value}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#18181b' }}>
            Common Patterns
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Hover state */}
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                Button Hover
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
                  transition: 'all 200ms ease-out',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#2563eb'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#3b82f6'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Hover me
              </button>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '12px',
                  fontFamily: 'monospace',
                }}
              >
                duration: 200ms, easing: ease-out
              </div>
            </div>

            {/* Scale on press */}
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                Press Scale
              </div>
              <button
                style={{
                  padding: '12px 24px',
                  background: '#18181b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'transform 100ms ease-out',
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'scale(0.95)'
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                Press me
              </button>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '12px',
                  fontFamily: 'monospace',
                }}
              >
                duration: 100ms (fast), easing: ease-out
              </div>
            </div>

            {/* Fade in */}
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                Fade Toggle
              </div>
              <FadeDemo />
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '12px',
                  fontFamily: 'monospace',
                }}
              >
                duration: 200ms, easing: ease-in-out
              </div>
            </div>

            {/* Slide */}
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                Slide Toggle
              </div>
              <SlideDemo />
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginTop: '12px',
                  fontFamily: 'monospace',
                }}
              >
                duration: 300ms, easing: ease-out
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  },
}

function FadeDemo() {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <button
        onClick={() => setVisible(!visible)}
        style={{
          padding: '8px 16px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          fontSize: '13px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        Toggle
      </button>
      <div
        style={{
          padding: '16px',
          background: '#dbeafe',
          borderRadius: '8px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease-in-out',
        }}
      >
        Content
      </div>
    </div>
  )
}

function SlideDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 16px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          fontSize: '13px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        Toggle
      </button>
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            padding: '16px',
            background: '#dcfce7',
            borderRadius: '8px',
            transform: open ? 'translateY(0)' : 'translateY(-100%)',
            opacity: open ? 1 : 0,
            transition: 'all 300ms ease-out',
          }}
        >
          Sliding content
        </div>
      </div>
    </div>
  )
}

/**
 * Easing curves visualization
 */
export const EasingCurves: Story = {
  render: () => {
    const transitions = tokens.transitions || { duration: {}, easing: {} }

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
          Easing Curves
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
          Easing functions control the rate of change during an animation. Different curves create
          different feelings.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {[
            {
              name: 'ease-out',
              value: 'cubic-bezier(0, 0, 0.2, 1)',
              desc: 'Quick start, slow end. Best for entrances.',
            },
            {
              name: 'ease-in',
              value: 'cubic-bezier(0.4, 0, 1, 1)',
              desc: 'Slow start, quick end. Best for exits.',
            },
            {
              name: 'ease-in-out',
              value: 'cubic-bezier(0.4, 0, 0.2, 1)',
              desc: 'Slow start and end. Best for movement.',
            },
            {
              name: 'linear',
              value: 'linear',
              desc: 'Constant speed. Best for loading indicators.',
            },
            {
              name: 'bounce',
              value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              desc: 'Overshoots then settles. Use sparingly.',
            },
          ].map(easing => (
            <div
              key={easing.name}
              style={{
                padding: '24px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                {easing.name}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                {easing.desc}
              </div>

              {/* Animation track */}
              <div
                style={{
                  height: '60px',
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  position: 'relative',
                  marginBottom: '16px',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const ball = e.currentTarget.querySelector('.curve-ball') as HTMLElement
                  if (ball) ball.style.left = 'calc(100% - 28px)'
                }}
                onMouseLeave={e => {
                  const ball = e.currentTarget.querySelector('.curve-ball') as HTMLElement
                  if (ball) ball.style.left = '8px'
                }}
              >
                <div
                  className="curve-ball"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '8px',
                    width: '20px',
                    height: '20px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    transform: 'translateY(-50%)',
                    transition: `left 800ms ${easing.value}`,
                  }}
                />
              </div>

              <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace' }}>
                {easing.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
