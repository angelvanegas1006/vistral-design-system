import type { Meta, StoryObj } from "@storybook/react"
import { useState, useCallback } from "react"
import tokensJson from "../src/tokens/vistral-tokens.json"
import type { DesignTokens } from "../lib/figma-sync/types"

const tokens = tokensJson as DesignTokens

// =============================================================================
// UTILITIES
// =============================================================================

function getCssVarName(name: string): string {
  return `--vistral-shadow-${name}`.toLowerCase()
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [value])

  return (
    <button
      onClick={handleCopy}
      style={{
        background: "transparent",
        border: "1px solid #e5e7eb",
        borderRadius: "4px",
        padding: "4px 8px",
        fontSize: "11px",
        fontFamily: "monospace",
        cursor: "pointer",
        color: copied ? "#059669" : "#6b7280",
        transition: "all 0.2s",
      }}
      title={`Copy ${label || value}`}
    >
      {copied ? "✓ Copied!" : label || "Copy"}
    </button>
  )
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Shadow card component
 */
function ShadowCard({
  name,
  value,
  description,
}: {
  name: string
  value: string
  description?: string
}) {
  const cssVar = getCssVarName(name)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        background: "#f9fafb",
        borderRadius: "12px",
      }}
    >
      {/* Shadow preview */}
      <div
        style={{
          width: "100%",
          height: "120px",
          background: "#ffffff",
          borderRadius: "12px",
          boxShadow: value,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "14px", color: "#6b7280" }}>Preview</span>
      </div>

      {/* Info */}
      <div>
        <div style={{ fontWeight: 600, fontSize: "16px", color: "#18181b", marginBottom: "4px" }}>
          {name}
        </div>
        {description && (
          <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
            {description}
          </div>
        )}
        <div
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            fontFamily: "monospace",
            background: "#f3f4f6",
            padding: "8px",
            borderRadius: "6px",
            wordBreak: "break-all",
          }}
        >
          {value}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px" }}>
        <CopyButton value={value} label="Copy value" />
        <CopyButton value={cssVar} label="Copy var" />
      </div>
    </div>
  )
}

/**
 * Elevation comparison
 */
function ElevationStack() {
  const shadows = tokens.shadows || {}
  const levels = Object.entries(shadows).filter(([name]) => name.startsWith("level"))

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "32px",
        padding: "48px",
        background: "#f3f4f6",
        borderRadius: "16px",
      }}
    >
      {levels.map(([name, value], index) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div
            style={{
              width: "100px",
              height: `${80 + index * 20}px`,
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: value,
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {index + 1}
          </div>
          <div style={{ fontWeight: 600, fontSize: "14px", color: "#18181b" }}>{name}</div>
        </div>
      ))}
    </div>
  )
}

/**
 * Interactive hover example
 */
function InteractiveCard() {
  const [isHovered, setIsHovered] = useState(false)
  const shadows = tokens.shadows || {}

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "280px",
        padding: "24px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: isHovered ? shadows["level-3"] || "0 8px 24px rgba(0,0,0,0.15)" : shadows["level-1"] || "0 1px 3px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          background: "#dbeafe",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          fontSize: "24px",
        }}
      >
        ✨
      </div>
      <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>
        Interactive Card
      </div>
      <div style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.5 }}>
        Hover over this card to see the shadow transition from level-1 to level-3.
      </div>
    </div>
  )
}

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: "Design System/Shadows",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete shadows documentation
 */
export const AllShadows: Story = {
  render: () => {
    const shadows = tokens.shadows || {}

    const shadowDescriptions: Record<string, string> = {
      "focus": "Focus ring for interactive elements like buttons and inputs",
      "level-1": "Subtle shadow for cards and containers at rest",
      "level-2": "Medium elevation for dropdowns and popovers",
      "level-3": "Higher elevation for modals and dialogs",
      "level-4": "Maximum elevation for notifications and toasts",
    }

    return (
      <div style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "#18181b" }}>
            Shadows
          </h1>
          <p style={{ color: "#6b7280", fontSize: "16px", lineHeight: 1.7, maxWidth: "700px" }}>
            Shadows create depth and hierarchy in the interface. Our elevation system uses 
            progressive shadow levels to indicate the importance and interactivity of elements.
          </p>
        </div>

        {/* Shadow Cards */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px", color: "#18181b" }}>
            Shadow Tokens
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {Object.entries(shadows).map(([name, value]) => (
              <ShadowCard
                key={name}
                name={name}
                value={value}
                description={shadowDescriptions[name]}
              />
            ))}
          </div>
        </section>

        {/* Elevation comparison */}
        <section style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px", color: "#18181b" }}>
            Elevation Levels
          </h2>
          <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
            Visual comparison of shadow depth. Higher levels indicate elements that are 
            more prominent or closer to the user.
          </p>
          <ElevationStack />
        </section>

        {/* Interactive example */}
        <section>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px", color: "#18181b" }}>
            Interactive Example
          </h2>
          <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
            Shadows can be animated to provide feedback on hover and focus states.
          </p>
          <InteractiveCard />
        </section>
      </div>
    )
  },
}

/**
 * Elevation system visualization
 */
export const ElevationSystem: Story = {
  render: () => {
    const shadows = tokens.shadows || {}

    return (
      <div style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "#18181b" }}>
          Elevation System
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "48px", maxWidth: "600px", lineHeight: 1.6 }}>
          Our elevation system creates visual hierarchy through progressive shadow depths.
          Use higher elevations for elements that need more prominence.
        </p>

        {/* 3D visualization */}
        <div
          style={{
            position: "relative",
            height: "400px",
            background: "linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)",
            borderRadius: "16px",
            perspective: "1000px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            padding: "48px",
          }}
        >
          {[
            { name: "Surface", shadow: "none", z: 0 },
            { name: "Level 1", shadow: shadows["level-1"], z: 8 },
            { name: "Level 2", shadow: shadows["level-2"], z: 16 },
            { name: "Level 3", shadow: shadows["level-3"], z: 24 },
            { name: "Level 4", shadow: shadows["level-4"], z: 32 },
          ].map((item, index) => (
            <div
              key={item.name}
              style={{
                width: "140px",
                height: "100px",
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: item.shadow || "none",
                border: item.shadow ? "none" : "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateY(${-index * 8}px)`,
                transition: "transform 0.3s ease",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                {item.name}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                z-index: {item.z}
              </div>
            </div>
          ))}
        </div>

        {/* Usage guide */}
        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "24px", color: "#18181b" }}>
            When to Use Each Level
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            {[
              { level: "Level 1", use: "Cards, containers, basic panels", examples: "Card, List item" },
              { level: "Level 2", use: "Dropdowns, popovers, menus", examples: "Dropdown, Popover" },
              { level: "Level 3", use: "Modals, dialogs, sidesheets", examples: "Modal, Dialog" },
              { level: "Level 4", use: "Notifications, toasts, alerts", examples: "Toast, Notification" },
            ].map((item) => (
              <div
                key={item.level}
                style={{
                  padding: "20px",
                  background: "#f9fafb",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px" }}>
                  {item.level}
                </div>
                <div style={{ fontSize: "13px", color: "#374151", marginBottom: "8px" }}>
                  {item.use}
                </div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                  Examples: {item.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Usage examples in real components
 */
export const UsageExamples: Story = {
  render: () => {
    const shadows = tokens.shadows || {}

    return (
      <div style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "#18181b" }}>
          Shadow Usage Examples
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "48px", maxWidth: "600px", lineHeight: 1.6 }}>
          Real-world examples of shadows applied to common UI components.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {/* Card */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Card (Level 1)
            </h3>
            <div
              style={{
                padding: "24px",
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: shadows["level-1"],
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>
                Project Update
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
                Your project has been updated successfully.
              </div>
              <button
                style={{
                  padding: "8px 16px",
                  background: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          </div>

          {/* Dropdown */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Dropdown (Level 2)
            </h3>
            <div style={{ position: "relative" }}>
              <button
                style={{
                  padding: "10px 16px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                Select option
                <span>▼</span>
              </button>
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "4px",
                  width: "200px",
                  background: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: shadows["level-2"],
                  padding: "4px",
                }}
              >
                {["Option 1", "Option 2", "Option 3"].map((opt) => (
                  <div
                    key={opt}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal preview */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Modal (Level 3)
            </h3>
            <div
              style={{
                padding: "24px",
                background: "#00000010",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
              }}
            >
              <div
                style={{
                  width: "280px",
                  padding: "24px",
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: shadows["level-3"],
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "18px", marginBottom: "8px" }}>
                  Confirm Action
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
                  Are you sure you want to continue?
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Toast */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Toast (Level 4)
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: shadows["level-4"],
                maxWidth: "320px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#dcfce7",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                ✓
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: "14px" }}>Success!</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Changes saved.</div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Focus ring */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Focus Ring
            </h3>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <button
                style={{
                  padding: "12px 24px",
                  background: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: shadows["focus"],
                }}
              >
                Focused Button
              </button>
              <input
                type="text"
                placeholder="Focused input"
                style={{
                  padding: "12px 16px",
                  border: "1px solid #3b82f6",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  boxShadow: shadows["focus"],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Dark mode shadows
 */
export const DarkMode: Story = {
  render: () => {
    const shadows = tokens.shadows || {}

    return (
      <div style={{ padding: "48px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px", color: "#18181b" }}>
          Shadows in Dark Mode
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "48px", maxWidth: "600px", lineHeight: 1.6 }}>
          In dark mode, shadows become less visible. Consider using borders or 
          lighter backgrounds to maintain visual hierarchy.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {/* Light mode */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px" }}>
              Light Mode
            </h3>
            <div
              style={{
                padding: "32px",
                background: "#f9fafb",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {["level-1", "level-2", "level-3"].map((level) => (
                <div
                  key={level}
                  style={{
                    padding: "20px",
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: shadows[level],
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{level}</span>
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>shadow only</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dark mode */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "16px" }}>
              Dark Mode
            </h3>
            <div
              style={{
                padding: "32px",
                background: "#18181b",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {["level-1", "level-2", "level-3"].map((level, i) => (
                <div
                  key={level}
                  style={{
                    padding: "20px",
                    background: "#27272a",
                    borderRadius: "12px",
                    border: "1px solid #3f3f46",
                    boxShadow: i > 0 ? "0 4px 12px rgba(0,0,0,0.4)" : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#ffffff",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{level}</span>
                  <span style={{ fontSize: "12px", color: "#a1a1aa" }}>
                    {i === 0 ? "border only" : "border + shadow"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
}
