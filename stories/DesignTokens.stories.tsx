import type { Meta, StoryObj } from "@storybook/react"
import tokensJson from "../src/tokens/vistral-tokens.json"
import type { DesignTokens } from "../lib/figma-sync/types"

const tokens = tokensJson as DesignTokens

const meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Color Swatch Component
 */
function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: value,
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
      <div style={{ fontSize: "12px", fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
        {value}
      </div>
    </div>
  )
}

/**
 * Typography Example Component
 */
function TypographyExample({
  name,
  fontSize,
  fontWeight,
  lineHeight,
}: {
  name: string
  fontSize?: string
  fontWeight?: number
  lineHeight?: string
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "0.5rem" }}>
        {name}
      </div>
      <div
        style={{
          fontSize: fontSize || "16px",
          fontWeight: fontWeight || 400,
          lineHeight: lineHeight || "1.5",
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "0.25rem", fontFamily: "monospace" }}>
        {fontSize && `font-size: ${fontSize}`}
        {fontWeight && ` | font-weight: ${fontWeight}`}
        {lineHeight && ` | line-height: ${lineHeight}`}
      </div>
    </div>
  )
}

/**
 * Spacing Example Component
 */
function SpacingExample({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ width: "100px", fontSize: "12px", fontWeight: 500 }}>{name}</div>
      <div
        style={{
          width: value,
          height: "24px",
          backgroundColor: "#3b82f6",
          borderRadius: "4px",
        }}
      />
      <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
        {value}
      </div>
    </div>
  )
}

/**
 * Radius Example Component
 */
function RadiusExample({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ width: "100px", fontSize: "12px", fontWeight: 500 }}>{name}</div>
      <div
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#3b82f6",
          borderRadius: value,
        }}
      />
      <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
        {value}
      </div>
    </div>
  )
}

export const Colors: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Colors</h2>
      
      {Object.entries(tokens.colors).map(([category, values]) => (
        <div key={category} style={{ marginBottom: "3rem" }}>
          <h3 style={{ marginBottom: "1rem", textTransform: "capitalize" }}>{category}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {Object.entries(values).map(([name, value]) => (
              <ColorSwatch key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <h2 style={{ marginBottom: "2rem" }}>Typography</h2>
      
      {tokens.typography.fontFamily && (
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Font Families</h3>
          {Object.entries(tokens.typography.fontFamily).map(([name, value]) => (
            <div key={name} style={{ marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: 500 }}>{name}:</span>{" "}
              <span style={{ fontFamily: "monospace" }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {tokens.typography.fontSize && (
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Font Sizes</h3>
          {Object.entries(tokens.typography.fontSize).map(([name, fontSize]) => {
            const fontWeight = tokens.typography.fontWeight?.[name]
            const lineHeight = tokens.typography.lineHeight?.[name]
            return (
              <TypographyExample
                key={name}
                name={name}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
              />
            )
          })}
        </div>
      )}
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2 style={{ marginBottom: "2rem" }}>Spacing</h2>
      {Object.entries(tokens.spacing).map(([name, value]) => (
        <SpacingExample key={name} name={name} value={value} />
      ))}
    </div>
  ),
}

export const Radius: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Border Radius</h2>
      {Object.entries(tokens.radius).map(([name, value]) => (
        <RadiusExample key={name} name={name} value={value} />
      ))}
    </div>
  ),
}

export const Shadows: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Shadows</h2>
      {tokens.shadows ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {Object.entries(tokens.shadows).map(([name, value]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: value,
                  border: "1px solid #e5e7eb",
                }}
              />
              <div style={{ fontSize: "12px", fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: "#6b7280" }}>No shadows defined</div>
      )}
    </div>
  ),
}

export const Breakpoints: Story = {
  render: () => (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem" }}>Breakpoints</h2>
      {tokens.breakpoints ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Object.entries(tokens.breakpoints).map(([name, value]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "100px", fontSize: "12px", fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: "14px", fontFamily: "monospace" }}>{value}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: "#6b7280" }}>No breakpoints defined</div>
      )}
    </div>
  ),
}
