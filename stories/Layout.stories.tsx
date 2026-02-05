import type { Meta, StoryObj } from '@storybook/react'
import tokensJson from '../src/tokens/vistral-tokens.json'
import type { DesignTokens } from '../lib/figma-sync/types'

const tokens = tokensJson as DesignTokens

// =============================================================================
// TYPES
// =============================================================================

interface GridConfig {
  name: string
  widthRange: string
  columns: number
  margin: string
  gutter: string
  behavior: string
  alignment?: string
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Page header component matching Figma style
 */
function PageHeader({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  return (
    <div
      style={{
        background: '#4361ee',
        color: '#ffffff',
        padding: '48px',
        marginBottom: '48px',
      }}
    >
      {breadcrumb && (
        <div
          style={{
            fontSize: '14px',
            opacity: 0.8,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontWeight: 600 }}>PropHero</span>
          <span>→</span>
          <span>{breadcrumb}</span>
        </div>
      )}
      <h1 style={{ fontSize: '36px', fontWeight: 600, margin: 0 }}>{title}</h1>
    </div>
  )
}

/**
 * Section header
 */
function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#18181b', marginBottom: '8px' }}>
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

/**
 * Breakpoint table row
 */
function BreakpointRow({
  breakpoint,
  widthRange,
  columns,
  margin,
  gutter,
  behavior,
}: {
  breakpoint: string
  widthRange: string
  columns: number
  margin: string
  gutter: string
  behavior: string
}) {
  return (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '16px', verticalAlign: 'top' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          {breakpoint}
        </span>
      </td>
      <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>{widthRange}</td>
      <td style={{ padding: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '13px',
          }}
        >
          {columns}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '13px',
          }}
        >
          {margin}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '13px',
          }}
        >
          {gutter}
        </span>
      </td>
      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280', maxWidth: '200px' }}>
        {behavior}
      </td>
    </tr>
  )
}

/**
 * Grid visualization component
 */
function GridVisualization({
  columns,
  margin,
  gutter,
  label,
  width,
  subLabel,
}: {
  columns: number
  margin: string
  gutter: string
  label: string
  width: number
  subLabel?: string
}) {
  const scale = Math.min(width / 1400, 1)
  const containerWidth = width * scale
  const marginPx = parseInt(margin)
  const gutterPx = parseInt(gutter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '8px', textAlign: 'left', width: containerWidth }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#18181b' }}>{label}</div>
        {subLabel && <div style={{ fontSize: '11px', color: '#6b7280' }}>{subLabel}</div>}
        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
          Columns: {columns} | Margin: {margin} | Gutter: {gutter}
        </div>
      </div>
      <div
        style={{
          width: containerWidth,
          height: 200 * scale,
          background: '#f9fafb',
          borderRadius: '8px',
          padding: `${marginPx * scale}px`,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gutterPx * scale}px`,
            height: '100%',
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              style={{
                background: '#e5e7eb',
                borderRadius: '4px',
                height: '100%',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Coexistence rule row
 */
function CoexistenceRow({ context, rule }: { context: string; rule: string }) {
  return (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '16px', verticalAlign: 'top', width: '200px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          {context}
        </span>
      </td>
      <td style={{ padding: '16px', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
        {rule}
      </td>
    </tr>
  )
}

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: 'Design System/Layout',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete Page Layout Documentation
 */
export const PageLayoutDocumentation: Story = {
  render: () => {
    const grid = (tokens as any).grid as Record<string, GridConfig> | undefined

    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#ffffff' }}>
        <PageHeader title="Layout" breadcrumb="Foundations - Layout" />

        <div style={{ padding: '0 48px 64px', maxWidth: '1200px' }}>
          {/* Intro */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{ fontSize: '24px', fontWeight: 600, color: '#18181b', marginBottom: '16px' }}
            >
              Page Layout Documentation
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, maxWidth: '900px' }}>
              This documentation establishes the principles and rules for constructing all views of
              the application, ensuring spatial consistency, stability, and visual hierarchy in the
              composition of fixed components and content.
            </p>
          </section>

          {/* 1. Column System */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#18181b', marginBottom: '8px' }}
            >
              1. Column System (Grid System)
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '32px' }}
            >
              We implement a highly adaptable grid system that uses 6 or 12 columns depending on the
              screen size, along with specific margins and gutters for each breakpoint.
            </p>

            <SectionHeader
              title="Breakpoints and Scaling"
              description="The following 6 breakpoints govern the structure of the layout and the allocation of columns, margins, and gutters."
            />

            {/* Breakpoints Table */}
            <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              >
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Breakpoint
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Width Range
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Columns
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Margin
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Gutter
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Key UX Behavior
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grid &&
                    Object.entries(grid).map(([key, config]) => (
                      <BreakpointRow
                        key={key}
                        breakpoint={config.name}
                        widthRange={config.widthRange}
                        columns={config.columns}
                        margin={config.margin}
                        gutter={config.gutter}
                        behavior={config.behavior}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Spacing and Coexistence Rules */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#18181b', marginBottom: '8px' }}
            >
              2. Spacing and Coexistence Rules
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '32px' }}
            >
              These rules define the vertical and horizontal separation between fixed components and
              the content area, ensuring adaptability across all breakpoints.
            </p>

            {/* A. Horizontal Coexistence */}
            <h4
              style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '16px' }}
            >
              A. Horizontal Coexistence and Sidebar
            </h4>

            <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              >
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Context
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6b7280',
                      }}
                    >
                      Sidebar and Navbar Rule
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <CoexistenceRow
                    context="Desktop (MD-XXL):"
                    rule="0px spacing between the Navbar and the Sidebar. The Sidebar takes up a fixed portion of the width, and the 12-column Grid applies to the remaining workspace area."
                  />
                  <CoexistenceRow
                    context="Mobile (XS/SM):"
                    rule="The Sidebar is hidden (Off-Canvas). Therefore, the 6-column Grid applies to the full width of the screen (100% width, minus XS/SM margins of 20px and 32px, respectively). The Navbar occupies 100% of the width to manage escape navigation and menu activation."
                  />
                </tbody>
              </table>
            </div>

            {/* B. Vertical Relationship */}
            <h4
              style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}
            >
              B. Vertical Relationship with Content
            </h4>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '16px' }}
            >
              We use the token{' '}
              <code
                style={{
                  background: '#f3f4f6',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                spacing-4
              </code>{' '}
              (16px) as the standard value for vertical separation.
            </p>
            <ul
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, paddingLeft: '20px' }}
            >
              <li>
                <strong>Navbar and Content Heading:</strong> The vertical spacing between the bottom
                edge of the fixed Navbar and the top edge of the Content Heading (Body Header) will
                be 16px (spacing-4).
              </li>
              <li>
                <strong>Internal Separation:</strong> The vertical space between the Content Heading
                and the start of the main content should be 24px (spacing-6).
              </li>
            </ul>
          </section>
        </div>
      </div>
    )
  },
}

/**
 * Grid System Visual Overview
 */
export const GridVisual: Story = {
  render: () => {
    const grid = (tokens as any).grid as Record<string, GridConfig> | undefined

    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#ffffff' }}>
        <PageHeader title="Grid" breadcrumb="Foundations - Spacing, radius & grids" />

        <div style={{ padding: '0 48px 64px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2
              style={{ fontSize: '20px', fontWeight: 600, color: '#18181b', marginBottom: '8px' }}
            >
              Grid
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
              Our grid system ensures that our content is{' '}
              <span style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                appropriately designed
              </span>{' '}
              for all screen sizes.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h3
              style={{ fontSize: '16px', fontWeight: 600, color: '#18181b', marginBottom: '8px' }}
            >
              Grid scale
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, maxWidth: '400px' }}>
              Our grid consists of 6 or 12 columns to fit a desktop, building larger than 12 or
              condensed down to show the minimum.
            </p>
          </section>

          {/* Grid visualizations */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              marginBottom: '48px',
            }}
          >
            {/* Mobile sizes (first row) */}
            <GridVisualization
              columns={6}
              margin="20px"
              gutter="12px"
              label="X-Small"
              subLabel="<576px"
              width={180}
            />
            <GridVisualization
              columns={6}
              margin="32px"
              gutter="12px"
              label="Small"
              subLabel="577px-768px"
              width={240}
            />
            <GridVisualization
              columns={12}
              margin="40px"
              gutter="16px"
              label="Medium"
              subLabel="769px-992px"
              width={320}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {/* Desktop sizes (second row) */}
            <GridVisualization
              columns={12}
              margin="80px"
              gutter="28px"
              label="Large"
              subLabel="993px-1200px"
              width={400}
            />
            <GridVisualization
              columns={12}
              margin="100px"
              gutter="32px"
              label="X-Large"
              subLabel="1201px-1400px"
              width={480}
            />
            <GridVisualization
              columns={12}
              margin="112px"
              gutter="32px"
              label="XX-Large"
              subLabel=">1400px (centered)"
              width={560}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            background: '#18181b',
            padding: '24px 48px',
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#a1a1aa' }}>© 2024 PropHero Design System</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500 }}>PropHero</span>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Desktop Layout Views (L1, L2, L3)
 */
export const DesktopLayout: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#ffffff' }}>
        <PageHeader title="Desktop Layout" breadcrumb="Foundations - Views" />

        <div style={{ padding: '0 48px 64px', maxWidth: '1000px' }}>
          {/* L1: Collection Views */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#4361ee', marginBottom: '16px' }}
            >
              L1: Collection and Application Views
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}
            >
              Level L1 represents the highest-level of display for tables or lists. Functions for
              displaying information, lists of derived data from the internal listing section.
            </p>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '24px',
                fontSize: '13px',
              }}
            >
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280', width: '140px' }}>Use</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Data tables, Collection grids, Dashboard analytics, Lists
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Content</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Mainly structured and scannable information
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Interaction Density</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Focused on quick actions and exploration
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Typography</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Compact headers, info-dense layouts
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Key Tokens</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Grids, condensed typography, low vertical spacing
                  </td>
                </tr>
              </tbody>
            </table>

            {/* L1 Visual */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '200px',
                    background: '#f9fafb',
                    padding: '16px',
                    borderRight: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                    Sidebar
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Navigation</div>
                </div>
                <div style={{ flex: 1, padding: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>Section heading</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          background: '#ffffff',
                        }}
                      >
                        Filter
                      </button>
                      <button
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          border: 'none',
                          borderRadius: '6px',
                          background: '#4361ee',
                          color: '#ffffff',
                        }}
                      >
                        Primary
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      height: '120px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                    }}
                  />
                  <div style={{ marginTop: '16px', fontSize: '11px', color: '#9ca3af' }}>
                    Pagination
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* L2: Entity Detail Views */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#4361ee', marginBottom: '16px' }}
            >
              L2: Entity Detail Views
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}
            >
              Level L2 represents the View of a single instance of an entity. The focus is on the
              report and its specific contents.
            </p>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '24px',
                fontSize: '13px',
              }}
            >
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280', width: '140px' }}>Use</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Property Details, User Profile, Project Summary
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Content</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Rich content: hero images, structured data, narrative text
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Interaction Density</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    CTAs and secondary actions, contextual at section level
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Layout Behavior</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Uses relaxed spacing, 2/3 + 1/3 or full-width sections
                  </td>
                </tr>
              </tbody>
            </table>

            {/* L2 Visual */}
            <div
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                padding: '24px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                Section heading
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div
                  style={{
                    height: '150px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}
                />
                <div
                  style={{
                    height: '150px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}
                />
              </div>
            </div>
          </section>

          {/* L3: Flow Views */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#4361ee', marginBottom: '16px' }}
            >
              L3: Flow Views and Complex Form
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}
            >
              Level L3 represents a sequential flow (like a checkout) or complex form that needs to
              be completed in several steps or sections.
            </p>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '24px',
                fontSize: '13px',
              }}
            >
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280', width: '140px' }}>Use</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Multi-step forms, Wizard/Onboarding flows, Checkout
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Content</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Progressive disclosure, narrow focused content blocks
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Interaction Density</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    High interactivity with form inputs and field validation
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', color: '#6b7280' }}>Typography</td>
                  <td style={{ padding: '8px 0', color: '#374151' }}>
                    Clear sections, larger inputs, visible progress indicators
                  </td>
                </tr>
              </tbody>
            </table>

            {/* L3 Visual */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    width: '200px',
                    background: '#f9fafb',
                    padding: '16px',
                    borderRight: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                    Sidebar
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                    Step 1
                  </div>
                  <div style={{ fontSize: '11px', color: '#4361ee', fontWeight: 500 }}>
                    Step 2 (current)
                  </div>
                </div>
                <div style={{ flex: 1, padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                    Section heading
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      maxWidth: '400px',
                    }}
                  >
                    <div
                      style={{
                        height: '36px',
                        background: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                    <div
                      style={{
                        height: '36px',
                        background: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                    <div
                      style={{
                        height: '36px',
                        background: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#4361ee',
                        color: '#ffffff',
                      }}
                    >
                      Primary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div
          style={{
            background: '#18181b',
            padding: '24px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#a1a1aa' }}>© 2024 PropHero Design System</span>
        </div>
      </div>
    )
  },
}

/**
 * Mobile Layout Patterns
 */
export const MobileLayout: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#ffffff' }}>
        <PageHeader title="Mobile Layout" breadcrumb="Foundations - Views" />

        <div style={{ padding: '0 48px 64px', maxWidth: '800px' }}>
          {/* Full screen */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#4361ee', marginBottom: '8px' }}
            >
              Full screen
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}
            >
              This is the regular layout of your screen, presented through normal form navigation.
            </p>

            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Phone mockup 1 */}
              <div
                style={{
                  width: '180px',
                  height: '320px',
                  border: '8px solid #18181b',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                <div
                  style={{
                    height: '32px',
                    background: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 500 }}>Title</span>
                </div>
                <div style={{ padding: '12px' }}>
                  <div
                    style={{
                      height: '60px',
                      background: '#f3f4f6',
                      borderRadius: '6px',
                      marginBottom: '8px',
                    }}
                  />
                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      width: '80%',
                      marginBottom: '4px',
                    }}
                  />
                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      width: '60%',
                    }}
                  />
                </div>
              </div>

              {/* Phone mockup 2 */}
              <div
                style={{
                  width: '180px',
                  height: '320px',
                  border: '8px solid #18181b',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                <div
                  style={{
                    height: '32px',
                    background: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 500 }}>Title</span>
                </div>
                <div style={{ padding: '12px' }}>
                  <div
                    style={{
                      height: '100px',
                      background: '#f3f4f6',
                      borderRadius: '6px',
                      marginBottom: '8px',
                    }}
                  />
                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      width: '100%',
                      marginBottom: '4px',
                    }}
                  />
                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      width: '70%',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Dialog */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#4361ee', marginBottom: '8px' }}
            >
              Dialog
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}
            >
              Dialog panels that always stick to the bottom edge of the screen and stretch the
              entire viewport to nearly the entire screen height.
            </p>

            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Dialog mockup */}
              <div
                style={{
                  width: '180px',
                  height: '320px',
                  border: '8px solid #18181b',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    height: '85%',
                    background: '#ffffff',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '4px',
                      background: '#d4d4d8',
                      borderRadius: '2px',
                      margin: '0 auto 16px',
                    }}
                  />
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                    Title
                  </div>
                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      width: '100%',
                      marginBottom: '8px',
                    }}
                  />
                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      width: '80%',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bottom sheet */}
          <section style={{ marginBottom: '64px' }}>
            <h3
              style={{ fontSize: '20px', fontWeight: 600, color: '#4361ee', marginBottom: '8px' }}
            >
              Bottom sheet
            </h3>
            <p
              style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '24px' }}
            >
              A partial-height overlay sliding up from the bottom, letting you interface gently for
              smaller interactions, with the background visible above.
            </p>

            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Bottom sheet mockup */}
              <div
                style={{
                  width: '180px',
                  height: '320px',
                  border: '8px solid #18181b',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    height: '45%',
                    background: '#ffffff',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '4px',
                      background: '#d4d4d8',
                      borderRadius: '2px',
                      margin: '0 auto 16px',
                    }}
                  />
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                    Title
                  </div>
                  <div
                    style={{
                      height: '32px',
                      background: '#f3f4f6',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb',
                      marginBottom: '12px',
                    }}
                  />
                  <button
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#4361ee',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    Action
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div
          style={{
            background: '#18181b',
            padding: '24px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#a1a1aa' }}>© 2024 PropHero Design System</span>
        </div>
      </div>
    )
  },
}

/**
 * All Layout Tokens
 */
export const LayoutTokens: Story = {
  render: () => {
    const layout = (tokens as any).layout
    const grid = (tokens as any).grid as Record<string, GridConfig> | undefined

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
          Layout Tokens
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '48px', lineHeight: 1.6 }}>
          All layout-related tokens for building consistent interfaces.
        </p>

        {/* Padding tokens */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
            Layout Padding
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {layout?.padding &&
              Object.entries(layout.padding).map(([name, value]) => (
                <div
                  key={name}
                  style={{
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                    {name}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6' }}>
                    {value as string}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      fontFamily: 'monospace',
                      marginTop: '8px',
                    }}
                  >
                    --vistral-layout-padding-{name}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Grid tokens */}
        {grid && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              Grid Configurations
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {Object.entries(grid).map(([key, config]) => (
                <div
                  key={key}
                  style={{
                    padding: '20px',
                    background: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                    {config.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                    {config.widthRange}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>Columns</div>
                      <div style={{ fontSize: '18px', fontWeight: 600 }}>{config.columns}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>Margin</div>
                      <div style={{ fontSize: '18px', fontWeight: 600 }}>{config.margin}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>Gutter</div>
                      <div style={{ fontSize: '18px', fontWeight: 600 }}>{config.gutter}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Spacing tokens */}
        {layout?.spacing && (
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>
              Layout Spacing
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
              }}
            >
              {Object.entries(layout.spacing).map(([name, value]) => (
                <div
                  key={name}
                  style={{
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '13px' }}>
                      {name.replace(/-/g, ' ')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace' }}>
                      --vistral-layout-{name}
                    </div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#3b82f6' }}>
                    {value as string}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  },
}
