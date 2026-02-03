import type { Meta, StoryObj } from "@storybook/react"
import tokensJson from "../src/tokens/vistral-tokens.json"
import type { DesignTokens } from "../lib/figma-sync/types"

const tokens = tokensJson as DesignTokens

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Page header matching Figma style
 */
function PageHeader({ title, breadcrumb }: { title: string; breadcrumb?: string }) {
  return (
    <div
      style={{
        background: "#4361ee",
        color: "#ffffff",
        padding: "48px",
        marginBottom: "0",
      }}
    >
      {breadcrumb && (
        <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 600 }}>PropHero</span>
          <span>→</span>
          <span>{breadcrumb}</span>
        </div>
      )}
      <h1 style={{ fontSize: "36px", fontWeight: 600, margin: 0 }}>{title}</h1>
    </div>
  )
}

/**
 * Section component
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#18181b", marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  )
}

/**
 * Instance Slot visual component
 */
function InstanceSlot() {
  return (
    <div
      style={{
        border: "1px dashed #a78bfa",
        borderRadius: "4px",
        padding: "8px 16px",
        background: "transparent",
        color: "#a78bfa",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: 500,
      }}
    >
      Instance Slot
    </div>
  )
}

/**
 * Stack component
 */
interface StackProps {
  gap?: keyof typeof tokens.stack
  direction?: "vertical" | "horizontal"
  align?: "start" | "center" | "end" | "stretch"
  children: React.ReactNode
}

function Stack({ gap = "md", direction = "vertical", align = "stretch", children }: StackProps) {
  const stack = tokens.stack || {}
  const gapValue = stack[gap] || "16px"
  
  const alignMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        gap: gapValue,
        alignItems: alignMap[align],
      }}
    >
      {children}
    </div>
  )
}

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: "Design System/Stack Component",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete Stack Component Documentation
 */
export const StackComponent: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#ffffff" }}>
        <PageHeader title="Stack Component" breadcrumb="Foundations - Transitions" />

        <div style={{ padding: "48px", maxWidth: "1000px" }}>
          {/* Description */}
          <Section title="Description">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
              Stack components are a generic way to add consistent spacing between, often wrapping the children of spacing
              for building any elements vertically.
            </p>
          </Section>

          {/* Usage */}
          <Section title="Usage">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
              Use the Stack component to arrange elements vertically, often used by the UI kit
              anatomy of child components. It provides for grouping related Form fields, Lists of cards,
              ensuring consistent vertical spacing and distribution in layouts. The Stack is not meant to act as
              spacing/spacer between elements but to be used like a divider or a layout helper similar to what you'd
              apply to sets of form elements, or just be used as a foundation for more complex components like
              FlexRow/FlexColumn. It also helps with things like the visual block within the document. This forms
              the building blocks for more visual layouts.
            </p>
          </Section>

          {/* Content */}
          <Section title="Content">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              The anatomy of the Stack component is composed of 2 variations. Its core consists of a container (div) that
              wraps the children for content layout. Basically, this can contain, you place the child
              items/elements, which also key part of it is a CSS class prefix.
            </p>
          </Section>

          {/* Anatomy */}
          <Section title="Anatomy">
            <ul style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.8, paddingLeft: "20px" }}>
              <li>
                <strong>Main Container:</strong> A flexbox container, horizontal or vertical-like content spacing of its children.
              </li>
              <li>
                <strong>Child Elements:</strong> The components contained with the vertical/horizontal. These can be
                any type of content, and this is important, etc.
              </li>
              <li>
                <strong>Spacing:</strong> The property that defines the blank space between each element. It uses the
                token prefixes spacing.
              </li>
              <li>
                <strong>Divider (Optional):</strong> An optional element to add visual horizontal/border between items, by using navigation.
              </li>
            </ul>
          </Section>

          {/* Best Practices */}
          <Section title="Best Practices">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Do's */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                    padding: "8px 12px",
                    background: "#dcfce7",
                    borderRadius: "6px",
                    color: "#166534",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  ✓ Do's
                </div>
                <ul style={{ fontSize: "13px", color: "#374151", lineHeight: 1.8, paddingLeft: "20px" }}>
                  <li>Use Stack for consistent vertical or horizontal grouping</li>
                  <li>Just like you keep your closet or a closet in-harmony group elements, just the same way use Stack to display items with similar purpose</li>
                  <li>Use spacing tokens and not pixels or properties for consistency, the spacing must be one from your Design System</li>
                  <li>Use the Stack for button groups, menu bars, dialog with a spacing</li>
                  <li>Include dividers where different ideas/concepts are important, for example, blocks of form sections</li>
                  <li>Use the Scale spacing property default on layout for forms and similar consistent elements, the spacing is generally more compact on dense interface/areas</li>
                  <li>Consider using the Stack property when layout design for simple, single-line groups but do not use it for complex layout structures</li>
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                    padding: "8px 12px",
                    background: "#fee2e2",
                    borderRadius: "6px",
                    color: "#b91c1c",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  ✗ Don'ts
                </div>
                <ul style={{ fontSize: "13px", color: "#374151", lineHeight: 1.8, paddingLeft: "20px" }}>
                  <li>Don't nest Stacks for a high to low, or vice versa, creating Block levels, items that already have equal spacing won't give up as expected</li>
                  <li>Stack should not be used if you're building a grid, or the elements inside must use HTML Grid</li>
                  <li>Don't rely on nested margins if the children already have inherent styling for items or spacing</li>
                  <li>Don't use Stack to stack 1 single element. Components with this functionality already exist (flex that by name indicate its full purpose)</li>
                  <li>Don't mix direction (horizontal &amp; vertical stacks on one Stack without good reason)</li>
                  <li>Don't overuse Stack, it is not a replace to every container, there are layouts that need Grid, Container, etc</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Accessibility */}
          <Section title="Accessibility">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              The nature of the Stack component is accessible. The purpose is to arrange visual reading order and semantics.
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              <strong>Tab Order:</strong> When the Stack maintains the native (tab-able) element of a list of items where a focus
              sequence starts (first TAB leads) if you change the Stack direction with "reverse", the visible order might change but
              the tab order doesn't automatically swap.
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              <strong>Screen Readers:</strong> The Stack layout might be non-obvious for screen readers but is clear when testing with
              assistive technology. However, the Stack is read in DOM order as linear flow without any interruption.
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              <strong>Use ARIA:</strong> If the Stack maintains a list of items similar to a &lt;nav&gt; or &lt;ul&gt; &lt;li&gt;, consider adding
              role="list" or role="listitem". This improves accessibility for users who rely on screen readers. For example, a
              Stack to maintain a navigation menu should use role="list" and each item should use role="listitem", plus aria-
              labelled/by or role="menu".
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              <strong>Content and Spacing:</strong> Make sure the content is the main focus, not the content or its content (never exceed
              spacing requirements). Stack elements should use proper semantic HTML and structural elements when necessary - the
              content within the Stack should not rely on visual positioning for their meaning.
            </p>
          </Section>
        </div>
      </div>
    )
  },
}

/**
 * Instance Slot visualization
 */
export const InstanceSlotDemo: Story = {
  render: () => {
    return (
      <div style={{ padding: "48px", fontFamily: "Inter, system-ui, sans-serif", background: "#f9fafb", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <InstanceSlot />
        </div>
      </div>
    )
  },
}

/**
 * Stack Variants Matrix - All gap and direction combinations
 */
export const StackVariantsMatrix: Story = {
  render: () => {
    const stack = tokens.stack || {}
    const gaps = Object.keys(stack) as (keyof typeof stack)[]
    const directions = ["vertical", "horizontal"] as const

    return (
      <div style={{ padding: "24px", fontFamily: "Inter, system-ui, sans-serif", background: "#0a0a0a", minHeight: "100vh" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#a78bfa", marginBottom: "32px" }}>
          Stack Variants Matrix
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${gaps.length}, 1fr)`, gap: "16px" }}>
          {/* Header row - gap names */}
          {gaps.map((gap) => (
            <div key={gap} style={{ textAlign: "center", marginBottom: "8px" }}>
              <div style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600 }}>{gap}</div>
              <div style={{ color: "#6b7280", fontSize: "10px" }}>{stack[gap]}</div>
            </div>
          ))}

          {/* Vertical stacks */}
          {gaps.map((gap) => (
            <div
              key={`v-${gap}`}
              style={{
                padding: "12px",
                background: "#1a1a2e",
                borderRadius: "8px",
                border: "1px solid #2d2d44",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "10px", marginBottom: "8px" }}>vertical</div>
              <Stack gap={gap} direction="vertical">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: "20px",
                      background: "#4361ee",
                      borderRadius: "4px",
                    }}
                  />
                ))}
              </Stack>
            </div>
          ))}

          {/* Horizontal stacks */}
          {gaps.map((gap) => (
            <div
              key={`h-${gap}`}
              style={{
                padding: "12px",
                background: "#1a1a2e",
                borderRadius: "8px",
                border: "1px solid #2d2d44",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "10px", marginBottom: "8px" }}>horizontal</div>
              <Stack gap={gap} direction="horizontal">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "20px",
                      height: "40px",
                      background: "#4361ee",
                      borderRadius: "4px",
                    }}
                  />
                ))}
              </Stack>
            </div>
          ))}

          {/* With divider - vertical */}
          {gaps.map((gap) => (
            <div
              key={`vd-${gap}`}
              style={{
                padding: "12px",
                background: "#1a1a2e",
                borderRadius: "8px",
                border: "1px solid #2d2d44",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "10px", marginBottom: "8px" }}>with divider</div>
              <div style={{ display: "flex", flexDirection: "column", gap: stack[gap] }}>
                <div style={{ height: "16px", background: "#4361ee", borderRadius: "4px" }} />
                <div style={{ height: "1px", background: "#3d3d5c" }} />
                <div style={{ height: "16px", background: "#4361ee", borderRadius: "4px" }} />
                <div style={{ height: "1px", background: "#3d3d5c" }} />
                <div style={{ height: "16px", background: "#4361ee", borderRadius: "4px" }} />
              </div>
            </div>
          ))}

          {/* Mixed content */}
          {gaps.map((gap) => (
            <div
              key={`m-${gap}`}
              style={{
                padding: "12px",
                background: "#1a1a2e",
                borderRadius: "8px",
                border: "1px solid #2d2d44",
              }}
            >
              <div style={{ color: "#6b7280", fontSize: "10px", marginBottom: "8px" }}>mixed sizes</div>
              <Stack gap={gap} direction="vertical">
                <div style={{ height: "12px", background: "#4361ee", borderRadius: "4px" }} />
                <div style={{ height: "24px", background: "#7c3aed", borderRadius: "4px" }} />
                <div style={{ height: "16px", background: "#4361ee", borderRadius: "4px" }} />
              </Stack>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * Stack Spacing Scale
 */
export const SpacingScale: Story = {
  render: () => {
    const stack = tokens.stack || {}

    return (
      <div style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "#18181b" }}>
          Stack Spacing Scale
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "48px", maxWidth: "700px", lineHeight: 1.6 }}>
          Predefined gap values for consistent spacing between stacked elements.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {Object.entries(stack).map(([name, value]) => {
            const numericValue = parseInt(value)

            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ width: "80px" }}>
                  <div style={{ fontWeight: 600, fontSize: "16px", color: "#18181b" }}>{name}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "monospace" }}>{value}</div>
                </div>

                {/* Visual representation */}
                <div
                  style={{
                    display: "flex",
                    gap: value,
                    padding: "16px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ width: "48px", height: "48px", background: "#4361ee", borderRadius: "8px" }} />
                  <div style={{ width: "48px", height: "48px", background: "#4361ee", borderRadius: "8px" }} />
                  <div style={{ width: "48px", height: "48px", background: "#4361ee", borderRadius: "8px" }} />
                </div>

                {/* CSS Variable */}
                <div style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "monospace" }}>
                  --vistral-stack-{name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}

/**
 * Usage Examples
 */
export const UsageExamples: Story = {
  render: () => {
    const stack = tokens.stack || {}

    return (
      <div style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "#18181b" }}>
          Stack Usage Examples
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "48px", maxWidth: "700px", lineHeight: 1.6 }}>
          Common patterns using the Stack component for layouts.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {/* Form Layout */}
          <div style={{ padding: "24px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "16px" }}>Form Layout</div>
            <Stack gap="lg">
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                style={{
                  padding: "12px 20px",
                  background: "#4361ee",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </Stack>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px", fontFamily: "monospace" }}>
              Stack gap="lg"
            </div>
          </div>

          {/* Card Content */}
          <div style={{ padding: "24px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "16px" }}>Card Content</div>
            <Stack gap="sm">
              <div style={{ fontSize: "18px", fontWeight: 600 }}>Card Title</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                This is a description of the card content with some details.
              </div>
              <Stack gap="xs" direction="horizontal">
                <span style={{ padding: "4px 10px", background: "#eef4ff", color: "#4361ee", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>
                  Tag 1
                </span>
                <span style={{ padding: "4px 10px", background: "#dcfce7", color: "#166534", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>
                  Tag 2
                </span>
              </Stack>
            </Stack>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px", fontFamily: "monospace" }}>
              Stack gap="sm" (nested Stack gap="xs")
            </div>
          </div>

          {/* Button Group */}
          <div style={{ padding: "24px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "16px" }}>Button Groups</div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>Tight spacing (xs)</div>
              <Stack gap="xs" direction="horizontal">
                <button style={{ padding: "10px 16px", background: "#4361ee", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                  Save
                </button>
                <button style={{ padding: "10px 16px", background: "#ffffff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                  Cancel
                </button>
              </Stack>
            </div>

            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>Normal spacing (sm)</div>
              <Stack gap="sm" direction="horizontal">
                <button style={{ padding: "10px 16px", background: "#4361ee", color: "#ffffff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                  Primary
                </button>
                <button style={{ padding: "10px 16px", background: "#ffffff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                  Secondary
                </button>
              </Stack>
            </div>
          </div>

          {/* List Items */}
          <div style={{ padding: "24px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <div style={{ fontWeight: 600, marginBottom: "16px", fontSize: "16px" }}>Navigation List</div>
            <Stack gap="xs">
              {["Dashboard", "Projects", "Team", "Settings"].map((item, index) => (
                <div
                  key={item}
                  style={{
                    padding: "12px 16px",
                    background: index === 0 ? "#eef4ff" : "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    cursor: "pointer",
                    color: index === 0 ? "#4361ee" : "#374151",
                    fontWeight: index === 0 ? 500 : 400,
                  }}
                >
                  {item}
                </div>
              ))}
            </Stack>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px", fontFamily: "monospace" }}>
              Stack gap="xs"
            </div>
          </div>
        </div>
      </div>
    )
  },
}
