import type { Meta, StoryObj } from "@storybook/react"

// =============================================================================
// LOGO ASSETS - Exported from Figma
// =============================================================================

// Logo paths (relative to public folder)
const LOGO_ASSETS = {
  propHero: {
    full: "/assets/logos/logo-prophero.svg",
    wordmark: "/assets/logos/type-prophero-state-wordmark.svg",
    icon: "/assets/logos/type-prophero-state-icon.svg",
    logomarkBrand: "/assets/logos/tone-brand-type-logomark.svg",
    logomarkLight: "/assets/logos/tone-light-type-logomark.svg",
    logomarkDark: "/assets/logos/tone-dark-type-logomark.svg",
  },
  vistral: {
    full: "/assets/logos/logo-vistral.svg",
    horizontalLightNoBrand: "/assets/logos/distribution-horizontal-tone-light-prophero-branded-false.svg",
    horizontalLightBrand: "/assets/logos/distribution-horizontal-tone-light-prophero-branded-true.svg",
    horizontalDarkNoBrand: "/assets/logos/distribution-horizontal-tone-dark-prophero-branded-false.svg",
    horizontalDarkBrand: "/assets/logos/distribution-horizontal-tone-dark-prophero-branded-true.svg",
    verticalLightNoBrand: "/assets/logos/distribution-vertical-tone-light-prophero-branded-false.svg",
    verticalLightBrand: "/assets/logos/distribution-vertical-tone-light-prophero-branded-true.svg",
    verticalDarkNoBrand: "/assets/logos/distribution-vertical-tone-dark-prophero-branded-false.svg",
    verticalDarkBrand: "/assets/logos/distribution-vertical-tone-dark-prophero-branded-true.svg",
    centralLight: "/assets/logos/distribution-central-tone-light-prophero-branded-false.svg",
    centralDark: "/assets/logos/distribution-central-tone-dark-prophero-branded-false.svg",
  },
}

// =============================================================================
// LOGO COMPONENTS
// =============================================================================

/**
 * Logo image component with fallback
 */
function LogoImage({ 
  src, 
  alt, 
  height = 40,
  style = {}
}: { 
  src: string
  alt: string
  height?: number
  style?: React.CSSProperties
}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      style={{ 
        height, 
        width: "auto",
        objectFit: "contain",
        ...style
      }} 
    />
  )
}

/**
 * Page header component
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

// =============================================================================
// STORIES
// =============================================================================

const meta = {
  title: "Assets/Logos",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete Logo Documentation
 */
export const LogoDocumentation: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#ffffff" }}>
        <PageHeader title="Logo" breadcrumb="Foundations - Transitions" />

        <div style={{ padding: "48px", maxWidth: "1000px" }}>
          {/* Description */}
          <Section title="Description">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
              PropHero's logo is our brand identity. Use it consistently to ensure we're representing our brand correctly
              in all our visual, digital and media.
            </p>
          </Section>

          {/* Usage */}
          <Section title="Usage">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
              Use the PropHero logo in branding materials, in all screens as your UI exhibits. It's the primary
              visual identifier for our company and logotype is the primary element of the Logomark. The
              PropHero Logo is recommended to be used in every setting, as it is the key signature of our brand and
              performs as a confident position and must be recognizable. What is established must also be used,
              ensuring the same treatment everywhere. The Logomark is the icon element. This is often used when the
              global context is set anywhere the text option is also rendered, the Logomark offers a visual
              signal and provides our brand image. Since this element is not full itself already it doesn't need the
              symbol to hint of its own representation. The Logomark is our shorter element, in isolation, for instance, for
              any avatars, in mobile icons for app screens, browser fav, etc. The short option for the brand is actually
              in any cases when you want the use case to be narrow-sized. Although designed for instances requiring limited
              vertical visibility, the use case for very limited branding. Make sure the logotype fits the container, scaled
              accordingly in order to provide maximum legibility. Avoid improper background fit, when the logo is on or under the
              background is made to be precise.
            </p>
          </Section>

          {/* Content */}
          <Section title="Content">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
              The logo is comprised of two distinct parts, each of which is tailored to capture different brand visibility. The
              first part is our logomark, acting as the direct icon backup of what a logo is. The solution for smaller
              file resolution or icon forms, just like a favicon as well as app icons for mobile. For print or low visibility
              with letter only for Logomark, the relationship can form more than a small spacing. The logomark is not a
              full logo pack. It is branded so Part-of the Logomark add the Logotype. At a low resolution of view (for
              our Monogram, the primary variant is not app-a. The Logotype is to form the letters representing them at other
              than short a limited usage that case is more than a generic format to see/aim, and necessarily also set as part
              of a system.
            </p>
          </Section>

          {/* Anatomy */}
          <Section title="Anatomy">
            <ul style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.8, paddingLeft: "20px", marginBottom: "24px" }}>
              <li>
                <strong>Logomark:</strong> Our icon composed of three shapes representing the accent points of our brand (blue),
                properly formatted with enough sizing.
              </li>
              <li>
                <strong>Logotype:</strong> The word "PropHero" which is the typography and component of our logo.
              </li>
              <li>
                <strong>Wordmark:</strong> "by Vistral", which is the combination of the Logomark and the Logotype. This is the
                most visible for the public.
              </li>
              <li>
                <strong>Clearspace:</strong> The protected space around the logo so it remains visible at all times (against). This
                required margin represents this way by the size of the logo instance.
              </li>
              <li>
                <strong>Minimum Size:</strong> The smallest size in which the logo can be sized and visible in maintaining below the
                16px.
              </li>
            </ul>

            {/* Anatomy visual */}
            <div style={{ 
              padding: "48px", 
              background: "#f9fafb", 
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "48px"
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  padding: "24px 48px", 
                  border: "1px dashed #d4d4d8",
                  borderRadius: "8px",
                  position: "relative"
                }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "-10px", 
                    left: "50%", 
                    transform: "translateX(-50%)",
                    background: "#ffffff",
                    padding: "0 8px",
                    fontSize: "10px",
                    color: "#9ca3af"
                  }}>
                    clearspace
                  </div>
                  <LogoImage src={LOGO_ASSETS.propHero.full} alt="PropHero Logo" height={48} />
                </div>
                <div style={{ display: "flex", gap: "32px", fontSize: "12px", color: "#6b7280" }}>
                  <div style={{ textAlign: "center" }}>
                    <LogoImage src={LOGO_ASSETS.propHero.logomarkBrand} alt="PropHero Logomark" height={32} />
                    <div style={{ marginTop: "8px" }}>Logomark</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 600, color: "#4361ee" }}>PropHero</div>
                    <div style={{ marginTop: "8px" }}>Logotype</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ 
                      width: "60px", 
                      height: "60px", 
                      border: "1px dashed #d4d4d8",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      color: "#9ca3af"
                    }}>
                      space
                    </div>
                    <div style={{ marginTop: "8px" }}>Clearspace</div>
                  </div>
                </div>
              </div>
            </div>
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
                  <li>Use the original, unaltered logo assets provided for brand consistency</li>
                  <li>Give the logo adequate clearspace based on the defined minimum</li>
                  <li>Use the logo to communicate the brand identity - not for visual filler</li>
                  <li>Place the logo on backgrounds that ensure adequate contrast</li>
                  <li>Use high-quality file formats (SVG, PNG with transparency)</li>
                  <li>Maintain minimum size requirements for legibility</li>
                  <li>Use the appropriate color variant for the background</li>
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
                  <li>Don't alter the logo's colors outside of approved variants</li>
                  <li>Don't stretch, skew, rotate or distort the logo</li>
                  <li>Don't add effects like shadows, gradients or outlines</li>
                  <li>Don't place the logo on busy or low-contrast backgrounds</li>
                  <li>Don't recreate or approximate the logo with other fonts</li>
                  <li>Don't use the logo smaller than the minimum size</li>
                  <li>Don't crop or partially hide any part of the logo</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Accessibility */}
          <Section title="Accessibility">
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              For the logo to meet its use in accessibility, it is essential to keep a contrast ratio of 4.5:1. The value
              contrast ratio between the logo and its background is a 1 for those users who use the display or color blindness.
              This ensures that even for visually impaired users, the brand imagery is easily recognizable.
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "16px" }}>
              Good contrast examples: Use a strong light + Logo in a dark background on a white logo on light.
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
              For digital implementations, always include descriptive alt text such as (title) for the image. The alt text shall
              convey the contents of the image (a good example is "PropHero logo"). If the Logo is acting in a link, in the
              branding/layout, not just a CTA label description like "Log in" or "sign up" is needed for the screen reader to
              output it as a "PropHero Logo" (Logo in a Link). Then always consider the possible instances using adaptive for the
              assistive users. If the logo of our layout is very readable and the brand is accessible as text, Auto resize using
              resolution like "logo" or "brand".
            </p>
          </Section>
        </div>
      </div>
    )
  },
}

/**
 * PropHero Logo Variants - Official SVGs from Figma
 */
export const PropHeroVariants: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#0a0a0a", minHeight: "100vh", padding: "48px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#ffffff", marginBottom: "48px" }}>
          PropHero Logo Variants
        </h1>

        {/* Full logo */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Full Logo (Logomark + Logotype)
          </h2>
          <div style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.propHero.full} alt="PropHero Full Logo" height={48} />
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#6b7280" }}>Full Logo (White)</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.propHero.wordmark} alt="PropHero Wordmark" height={48} />
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#374151" }}>Wordmark</div>
            </div>
          </div>
        </div>

        {/* Logomarks */}
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Logomark Variants
          </h2>
          <div style={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.propHero.logomarkBrand} alt="PropHero Logomark Brand" height={64} />
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#6b7280" }}>Brand (Blue)</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.propHero.logomarkLight} alt="PropHero Logomark Light" height={64} />
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#6b7280" }}>Light (White)</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.propHero.logomarkDark} alt="PropHero Logomark Dark" height={64} />
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#374151" }}>Dark</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.propHero.icon} alt="PropHero Icon" height={64} />
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#374151" }}>Icon</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Vistral Logo Variants - Official SVGs from Figma
 */
export const VistralVariants: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#0a0a0a", minHeight: "100vh", padding: "48px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#ffffff", marginBottom: "48px" }}>
          Vistral Logo Variants
        </h1>

        {/* Main Logo */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Main Logo
          </h2>
          <div style={{ display: "flex", gap: "48px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.full} alt="Vistral Logo" height={60} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#6b7280" }}>Full Logo (with PropHero)</div>
            </div>
          </div>
        </div>

        {/* Horizontal Layout */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Horizontal Layout
          </h2>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.horizontalLightNoBrand} alt="Vistral Horizontal Light" height={40} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#6b7280" }}>Light (no brand)</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.horizontalLightBrand} alt="Vistral Horizontal Light Branded" height={40} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#6b7280" }}>Light (with PropHero)</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.vistral.horizontalDarkNoBrand} alt="Vistral Horizontal Dark" height={40} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#374151" }}>Dark (no brand)</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.vistral.horizontalDarkBrand} alt="Vistral Horizontal Dark Branded" height={40} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#374151" }}>Dark (with PropHero)</div>
            </div>
          </div>
        </div>

        {/* Vertical Layout */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Vertical Layout
          </h2>
          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.verticalLightNoBrand} alt="Vistral Vertical Light" height={80} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#6b7280" }}>Light (no brand)</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.verticalLightBrand} alt="Vistral Vertical Light Branded" height={80} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#6b7280" }}>Light (with PropHero)</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.vistral.verticalDarkNoBrand} alt="Vistral Vertical Dark" height={80} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#374151" }}>Dark (no brand)</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.vistral.verticalDarkBrand} alt="Vistral Vertical Dark Branded" height={80} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#374151" }}>Dark (with PropHero)</div>
            </div>
          </div>
        </div>

        {/* Central/Icon Layout */}
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Central / Icon Only
          </h2>
          <div style={{ display: "flex", gap: "48px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.centralLight} alt="Vistral Central Light" height={64} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#6b7280" }}>Light</div>
            </div>
            <div style={{ textAlign: "center", background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <LogoImage src={LOGO_ASSETS.vistral.centralDark} alt="Vistral Central Dark" height={64} />
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#374151" }}>Dark</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Logo Sizes
 */
export const LogoSizes: Story = {
  render: () => {
    const sizes = [
      { name: "Micro", height: 20 },
      { name: "Small", height: 32 },
      { name: "Default", height: 48 },
      { name: "Large", height: 64 },
    ]

    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: "48px", maxWidth: "1000px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#18181b", marginBottom: "48px" }}>
          Logo Sizes
        </h1>

        {/* PropHero sizes */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            PropHero Logo Sizes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {sizes.map((size) => (
              <div key={size.name} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ width: "80px", fontSize: "14px", fontWeight: 500, color: "#374151" }}>
                  {size.name}
                </div>
                <LogoImage src={LOGO_ASSETS.propHero.full} alt={`PropHero ${size.name}`} height={size.height} />
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>{size.height}px</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vistral sizes */}
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280", marginBottom: "24px" }}>
            Vistral Logo Sizes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", background: "#18181b", padding: "32px", borderRadius: "12px" }}>
            {sizes.map((size) => (
              <div key={size.name} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ width: "80px", fontSize: "14px", fontWeight: 500, color: "#9ca3af" }}>
                  {size.name}
                </div>
                <LogoImage src={LOGO_ASSETS.vistral.horizontalLightNoBrand} alt={`Vistral ${size.name}`} height={size.height} />
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{size.height}px</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Logo Usage Examples
 */
export const UsageExamples: Story = {
  render: () => {
    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Header example - light */}
        <div style={{ 
          padding: "16px 24px", 
          background: "#ffffff", 
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <LogoImage src={LOGO_ASSETS.propHero.logomarkBrand} alt="PropHero" height={32} />
          <div style={{ display: "flex", gap: "24px", fontSize: "14px", color: "#6b7280" }}>
            <span>Products</span>
            <span>Solutions</span>
            <span>Pricing</span>
          </div>
        </div>

        {/* Hero section */}
        <div style={{ 
          padding: "80px 48px", 
          background: "linear-gradient(135deg, #4361ee 0%, #7c3aed 100%)", 
          textAlign: "center"
        }}>
          <div style={{ display: "inline-flex", marginBottom: "24px" }}>
            <LogoImage src={LOGO_ASSETS.propHero.full} alt="PropHero" height={64} />
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: 700, color: "#ffffff", marginBottom: "16px" }}>
            Welcome to PropHero
          </h1>
          <p style={{ fontSize: "18px", color: "#ffffff", opacity: 0.9 }}>
            The future of property investment
          </p>
        </div>

        {/* Footer example - dark */}
        <div style={{ 
          padding: "48px", 
          background: "#18181b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <div>
            <LogoImage src={LOGO_ASSETS.propHero.full} alt="PropHero" height={40} />
            <p style={{ marginTop: "16px", fontSize: "14px", color: "#6b7280", maxWidth: "300px" }}>
              Making property investment accessible to everyone.
            </p>
          </div>
          <div style={{ display: "flex", gap: "48px" }}>
            <div>
              <div style={{ fontWeight: 600, color: "#ffffff", marginBottom: "16px" }}>Product</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#6b7280" }}>
                <span>Features</span>
                <span>Pricing</span>
                <span>Security</span>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "#ffffff", marginBottom: "16px" }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#6b7280" }}>
                <span>About</span>
                <span>Careers</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>

        {/* App icon example */}
        <div style={{ padding: "48px", background: "#f9fafb" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px" }}>App Icon Usage</h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              background: "#4361ee", 
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px"
            }}>
              <LogoImage src={LOGO_ASSETS.propHero.logomarkLight} alt="PropHero Icon" height={40} />
            </div>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              background: "#4361ee", 
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px"
            }}>
              <LogoImage src={LOGO_ASSETS.propHero.logomarkLight} alt="PropHero Icon" height={28} />
            </div>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              background: "#4361ee", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px"
            }}>
              <LogoImage src={LOGO_ASSETS.propHero.logomarkLight} alt="PropHero Icon" height={20} />
            </div>
            <span style={{ fontSize: "14px", color: "#6b7280" }}>← App icons at different sizes</span>
          </div>
        </div>

        {/* Vistral usage */}
        <div style={{ padding: "48px", background: "#18181b" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px", color: "#ffffff" }}>Vistral Brand Usage</h3>
          <div style={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.horizontalLightBrand} alt="Vistral with PropHero" height={40} />
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#6b7280" }}>With PropHero branding</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.horizontalLightNoBrand} alt="Vistral" height={40} />
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#6b7280" }}>Standalone</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <LogoImage src={LOGO_ASSETS.vistral.centralLight} alt="Vistral Icon" height={48} />
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#6b7280" }}>Icon only</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
