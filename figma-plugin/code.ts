/**
 * Vistral Design System Token Extractor
 * 
 * Figma Plugin to extract design tokens (colors, typography, spacing, etc.)
 * from Figma styles and export them as JSON
 * 
 * Features:
 * - Intelligent color name inference from hex values
 * - Automatic shade detection (Tailwind-style: 50-950)
 * - Color family grouping
 */

// Types matching our design tokens structure
interface DesignTokens {
  colors: {
    primary: Record<string, string>
    semantic: Record<string, string>
    component?: Record<string, string>
    [key: string]: Record<string, string> | undefined
  }
  typography: {
    fontFamily: Record<string, string>
    fontSize: Record<string, string>
    fontWeight: Record<string, number>
    lineHeight: Record<string, string>
  }
  spacing: Record<string, string>
  radius: Record<string, string>
  shadows?: Record<string, string>
  breakpoints?: Record<string, string>
}

// ============================================================================
// TAILWIND COLOR DATABASE - Used for intelligent name inference
// ============================================================================

const TAILWIND_COLORS: Record<string, Record<string, string>> = {
  slate: {
    "950": "#020617", "900": "#0f172a", "800": "#1e293b", "700": "#334155",
    "600": "#475569", "500": "#64748b", "400": "#94a3b8", "300": "#cbd5e1",
    "200": "#e2e8f0", "100": "#f1f5f9", "50": "#f8fafc"
  },
  gray: {
    "950": "#030712", "900": "#111827", "800": "#1f2937", "700": "#374151",
    "600": "#4b5563", "500": "#6b7280", "400": "#9ca3af", "300": "#d1d5db",
    "200": "#e5e7eb", "100": "#f3f4f6", "50": "#f9fafb"
  },
  zinc: {
    "950": "#09090b", "900": "#18181b", "800": "#27272a", "700": "#3f3f46",
    "600": "#52525b", "500": "#71717a", "400": "#a1a1aa", "300": "#d4d4d8",
    "200": "#e4e4e7", "100": "#f4f4f5", "50": "#fafafa"
  },
  neutral: {
    "950": "#0a0a0a", "900": "#171717", "800": "#262626", "700": "#404040",
    "600": "#525252", "500": "#737373", "400": "#a3a3a3", "300": "#d4d4d4",
    "200": "#e5e5e5", "100": "#f5f5f5", "50": "#fafafa"
  },
  stone: {
    "950": "#0c0a09", "900": "#1c1917", "800": "#292524", "700": "#44403c",
    "600": "#57534e", "500": "#78716c", "400": "#a8a29e", "300": "#d6d3d1",
    "200": "#e7e5e4", "100": "#f5f5f4", "50": "#fafaf9"
  },
  red: {
    "950": "#450a0a", "900": "#7f1d1d", "800": "#991b1b", "700": "#b91c1c",
    "600": "#dc2626", "500": "#ef4444", "400": "#f87171", "300": "#fca5a5",
    "200": "#fecaca", "100": "#fee2e2", "50": "#fef2f2"
  },
  orange: {
    "950": "#431407", "900": "#7c2d12", "800": "#9a3412", "700": "#c2410c",
    "600": "#ea580c", "500": "#f97316", "400": "#fb923c", "300": "#fdba74",
    "200": "#fed7aa", "100": "#ffedd5", "50": "#fff7ed"
  },
  amber: {
    "950": "#451a03", "900": "#78350f", "800": "#92400e", "700": "#b45309",
    "600": "#d97706", "500": "#f59e0b", "400": "#fbbf24", "300": "#fcd34d",
    "200": "#fde68a", "100": "#fef3c7", "50": "#fffbeb"
  },
  yellow: {
    "950": "#422006", "900": "#713f12", "800": "#854d0e", "700": "#a16207",
    "600": "#ca8a04", "500": "#eab308", "400": "#facc15", "300": "#fde047",
    "200": "#fef08a", "100": "#fef9c3", "50": "#fefce8"
  },
  lime: {
    "950": "#1a2e05", "900": "#365314", "800": "#3f6212", "700": "#4d7c0f",
    "600": "#65a30d", "500": "#84cc16", "400": "#a3e635", "300": "#bef264",
    "200": "#d9f99d", "100": "#ecfccb", "50": "#f7fee7"
  },
  green: {
    "950": "#052e16", "900": "#14532d", "800": "#166534", "700": "#15803d",
    "600": "#16a34a", "500": "#22c55e", "400": "#4ade80", "300": "#86efac",
    "200": "#bbf7d0", "100": "#dcfce7", "50": "#f0fdf4"
  },
  emerald: {
    "950": "#022c22", "900": "#064e3b", "800": "#065f46", "700": "#047857",
    "600": "#059669", "500": "#10b981", "400": "#34d399", "300": "#6ee7b7",
    "200": "#a7f3d0", "100": "#d1fae5", "50": "#ecfdf5"
  },
  teal: {
    "950": "#042f2e", "900": "#134e4a", "800": "#115e59", "700": "#0f766e",
    "600": "#0d9488", "500": "#14b8a6", "400": "#2dd4bf", "300": "#5eead4",
    "200": "#99f6e4", "100": "#ccfbf1", "50": "#f0fdfa"
  },
  cyan: {
    "950": "#083344", "900": "#164e63", "800": "#155e75", "700": "#0e7490",
    "600": "#0891b2", "500": "#06b6d4", "400": "#22d3ee", "300": "#67e8f9",
    "200": "#a5f3fc", "100": "#cffafe", "50": "#ecfeff"
  },
  sky: {
    "950": "#082f49", "900": "#0c4a6e", "800": "#075985", "700": "#0369a1",
    "600": "#0284c7", "500": "#0ea5e9", "400": "#38bdf8", "300": "#7dd3fc",
    "200": "#bae6fd", "100": "#e0f2fe", "50": "#f0f9ff"
  },
  blue: {
    "950": "#172554", "900": "#1e3a8a", "800": "#1e40af", "700": "#1d4ed8",
    "600": "#2563eb", "500": "#3b82f6", "400": "#60a5fa", "300": "#93c5fd",
    "200": "#bfdbfe", "100": "#dbeafe", "50": "#eff6ff"
  },
  indigo: {
    "950": "#1e1b4b", "900": "#312e81", "800": "#3730a3", "700": "#4338ca",
    "600": "#4f46e5", "500": "#6366f1", "400": "#818cf8", "300": "#a5b4fc",
    "200": "#c7d2fe", "100": "#e0e7ff", "50": "#eef2ff"
  },
  violet: {
    "950": "#2e1065", "900": "#4c1d95", "800": "#5b21b6", "700": "#6d28d9",
    "600": "#7c3aed", "500": "#8b5cf6", "400": "#a78bfa", "300": "#c4b5fd",
    "200": "#ddd6fe", "100": "#ede9fe", "50": "#f5f3ff"
  },
  purple: {
    "950": "#3b0764", "900": "#581c87", "800": "#6b21a8", "700": "#7e22ce",
    "600": "#9333ea", "500": "#a855f7", "400": "#c084fc", "300": "#d8b4fe",
    "200": "#e9d5ff", "100": "#f3e8ff", "50": "#faf5ff"
  },
  fuchsia: {
    "950": "#4a044e", "900": "#701a75", "800": "#86198f", "700": "#a21caf",
    "600": "#c026d3", "500": "#d946ef", "400": "#e879f9", "300": "#f0abfc",
    "200": "#f5d0fe", "100": "#fae8ff", "50": "#fdf4ff"
  },
  pink: {
    "950": "#500724", "900": "#831843", "800": "#9d174d", "700": "#be185d",
    "600": "#db2777", "500": "#ec4899", "400": "#f472b6", "300": "#f9a8d4",
    "200": "#fbcfe8", "100": "#fce7f3", "50": "#fdf2f8"
  },
  rose: {
    "950": "#4c0519", "900": "#881337", "800": "#9f1239", "700": "#be123c",
    "600": "#e11d48", "500": "#f43f5e", "400": "#fb7185", "300": "#fda4af",
    "200": "#fecdd3", "100": "#ffe4e6", "50": "#fff1f2"
  }
}

// Build reverse lookup: hex -> {family, shade}
const HEX_TO_TAILWIND: Map<string, {family: string, shade: string}> = new Map()

for (const [family, shades] of Object.entries(TAILWIND_COLORS)) {
  for (const [shade, hex] of Object.entries(shades)) {
    HEX_TO_TAILWIND.set(hex.toLowerCase(), { family, shade })
  }
}

// Known brand colors (Vistral specific)
const BRAND_COLORS: Record<string, string> = {
  "#2050f6": "brand-600",
  "#1337e2": "brand-700",
  "#162eb7": "brand-800",
  "#182c90": "brand-900",
  "#141d57": "brand-950",
  "#316eff": "brand-500",
  "#5895ff": "brand-400",
  "#8dbbff": "brand-300",
  "#cfe1ff": "brand-200",
  "#d9e7ff": "brand-100",
  "#eef4ff": "brand-50",
}

// Vistral custom gray scale (not Tailwind)
const VISTRAL_GRAYS: Record<string, string> = {
  "#3d3d3d": "vistral-gray-950",
  "#454545": "vistral-gray-900",
  "#4f4f4f": "vistral-gray-800",
  "#5d5d5d": "vistral-gray-700",
  "#6d6d6d": "vistral-gray-600",
  "#888888": "vistral-gray-500",
  "#b0b0b0": "vistral-gray-400",
  "#d1d1d1": "vistral-gray-300",
  "#e7e7e7": "vistral-gray-200",
  "#f6f6f6": "vistral-gray-100",
}

// Opacity-based colors
const OPACITY_COLORS: Record<string, string> = {
  // Black with opacity
  "#00000005": "black-opacity-2",
  "#0000000a": "black-opacity-4",
  "#00000014": "black-opacity-8",
  "#0000001f": "black-opacity-12",
  "#00000029": "black-opacity-16",
  "#0000003d": "black-opacity-24",
  "#00000052": "black-opacity-32",
  "#00000066": "black-opacity-40",
  "#0000007a": "black-opacity-48",
  "#000000a3": "black-opacity-64",
  "#000000cc": "black-opacity-80",
  "#000000f5": "black-opacity-96",
  // White with opacity
  "#ffffff05": "white-opacity-2",
  "#ffffff0a": "white-opacity-4",
  "#ffffff14": "white-opacity-8",
  "#ffffff1f": "white-opacity-12",
  "#ffffff29": "white-opacity-16",
  "#ffffff3d": "white-opacity-24",
  "#ffffff52": "white-opacity-32",
  "#ffffff66": "white-opacity-40",
  "#ffffff7a": "white-opacity-48",
  "#ffffffa3": "white-opacity-64",
  "#ffffffcc": "white-opacity-80",
  "#fffffff5": "white-opacity-96",
}

// Semantic color inference by hex (common badge/status colors)
const SEMANTIC_COLORS: Record<string, string> = {
  // Success (greens)
  "#d1faec": "success-bg",
  "#065f42": "success-text",
  "#065f46": "success-dark",
  "#10b981": "success-500",
  "#ecfdf5": "success-50",
  "#d1fae5": "success-100",
  "#a7f3d0": "success-200",
  // Warning (ambers/yellows)
  "#feeac7": "warning-bg",
  "#92610e": "warning-text",
  "#fef3c7": "warning-100",
  "#fde68a": "warning-200",
  "#f59e0b": "warning-500",
  // Error (reds)
  "#ffe0df": "error-bg",
  "#ff3d34": "error-500",
  "#a5160f": "error-text",
  "#fee2e2": "error-100",
  "#fecaca": "error-200",
  "#ef4444": "error-default",
  // Info (blues)
  "#dbeafe": "info-100",
  "#bfdbfe": "info-200",
  "#3b82f6": "info-500",
}

// Component-specific color patterns
const COMPONENT_COLOR_PATTERNS: Record<string, RegExp> = {
  "button": /button|btn/i,
  "input": /input|field|form/i,
  "text": /text|typography|font/i,
  "background": /background|bg|surface/i,
  "border": /border|stroke|outline/i,
  "badge": /badge|tag|chip|label/i,
  "header": /header|nav|navbar/i,
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert RGB color to hex
 */
function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0")
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return a !== undefined && a < 1 
    ? `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}` 
    : hex
}

/**
 * Normalize hex color (lowercase, strip alpha if fully opaque)
 */
function normalizeHex(hex: string): string {
  let normalized = hex.toLowerCase()
  // Remove alpha if fully opaque (ff or 100%)
  if (normalized.length === 9 && normalized.endsWith("ff")) {
    normalized = normalized.slice(0, 7)
  }
  return normalized
}

/**
 * Look up color name from hex value using color databases
 */
function lookupColorName(hex: string): string | null {
  const normalized = normalizeHex(hex)
  
  // 1. Check brand colors first (highest priority)
  if (BRAND_COLORS[normalized]) {
    return BRAND_COLORS[normalized]
  }
  
  // 2. Check Vistral custom grays
  if (VISTRAL_GRAYS[normalized]) {
    return VISTRAL_GRAYS[normalized]
  }
  
  // 3. Check opacity-based colors
  if (OPACITY_COLORS[normalized]) {
    return OPACITY_COLORS[normalized]
  }
  
  // 4. Check semantic colors (badges, status)
  if (SEMANTIC_COLORS[normalized]) {
    return SEMANTIC_COLORS[normalized]
  }
  
  // 5. Check Tailwind colors
  const tailwind = HEX_TO_TAILWIND.get(normalized)
  if (tailwind) {
    return `${tailwind.family}-${tailwind.shade}`
  }
  
  // 6. Try to infer from hex pattern (opacity detection)
  if (normalized.length === 9) {
    const baseColor = normalized.slice(0, 7)
    const alpha = normalized.slice(7)
    const alphaPercent = Math.round((parseInt(alpha, 16) / 255) * 100)
    
    if (baseColor === "#000000") {
      return `black-opacity-${alphaPercent}`
    }
    if (baseColor === "#ffffff") {
      return `white-opacity-${alphaPercent}`
    }
  }
  
  return null
}

/**
 * Normalize token name (kebab-case, lowercase)
 */
function normalizeTokenName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

/**
 * Determine color category based on context and name
 */
function categorizeColor(tokenName: string, hex: string, context: string): "primary" | "semantic" | "component" {
  const nameLower = tokenName.toLowerCase()
  const contextLower = context.toLowerCase()
  
  // Semantic colors (status colors)
  const semanticKeywords = ["success", "warning", "error", "danger", "info"]
  for (const kw of semanticKeywords) {
    if (nameLower.includes(kw) || contextLower.includes(kw)) {
      return "semantic"
    }
  }
  
  // Neutral goes to semantic
  if (nameLower.startsWith("neutral-")) {
    return "semantic"
  }
  
  // Component colors
  const componentKeywords = ["button", "input", "background", "border", "badge", "header", "tag", "card", "modal", "opacity", "vistral-gray", "brand"]
  for (const kw of componentKeywords) {
    if (nameLower.includes(kw) || contextLower.includes(kw)) {
      return "component"
    }
  }
  
  // Alpha/opacity colors go to component
  const normalizedHex = normalizeHex(hex)
  if (normalizedHex.length === 9 && !normalizedHex.endsWith("ff")) {
    return "component"
  }
  
  // Check if it's a Tailwind color family - these go to primary
  const tailwindFamilies = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
  for (const family of tailwindFamilies) {
    if (nameLower.startsWith(family + "-") && nameLower.match(/^[a-z]+-\d+$/)) {
      // Neutral is semantic, others are primary
      if (family === "neutral") {
        return "semantic"
      }
      return "primary"
    }
  }
  
  // Default to primary
  return "primary"
}

// ============================================================================
// COLOR EXTRACTION
// ============================================================================

/**
 * Extract color from PaintStyle
 */
function extractColorFromPaintStyle(style: PaintStyle): string | null {
  if (!style.paints || style.paints.length === 0) {
    return null
  }
  
  for (const paint of style.paints) {
    if (paint.type === "SOLID") {
      const opacity = paint.opacity !== undefined ? paint.opacity : 1
      return rgbToHex(paint.color.r, paint.color.g, paint.color.b, opacity)
    }
  }
  
  return null
}

/**
 * Get context from node hierarchy (for categorization)
 */
function getNodeContext(node: SceneNode): string {
  const parts: string[] = []
  let current: BaseNode | null = node
  let depth = 0
  
  while (current && depth < 10) {
    if ("name" in current) {
      parts.unshift(current.name)
    }
    current = current.parent
    depth++
  }
  
  return parts.join("/")
}

/**
 * Main color extraction function
 */
function extractColors(): DesignTokens["colors"] {
  const colors: DesignTokens["colors"] = {
    primary: {},
    semantic: {},
    component: {},
  }
  
  const processedHexes = new Set<string>()
  const colorCounters: Record<string, number> = {}
  
  // Helper to add color with unique name
  function addColor(hex: string, suggestedName: string, context: string) {
    const normalized = normalizeHex(hex)
    
    // Skip if already processed (exact hex match)
    if (processedHexes.has(normalized)) {
      return
    }
    processedHexes.add(normalized)
    
    // Try to get name from hex lookup first
    let tokenName = lookupColorName(normalized)
    
    if (!tokenName) {
      // Use suggested name, ensuring uniqueness
      tokenName = suggestedName
      if (colorCounters[tokenName] !== undefined) {
        colorCounters[tokenName]++
        tokenName = `${suggestedName}-${colorCounters[tokenName]}`
      } else {
        colorCounters[tokenName] = 0
      }
    }
    
    // Determine category
    const category = categorizeColor(tokenName, normalized, context)
    
    // Add to appropriate category
    if (category === "semantic") {
      colors.semantic[tokenName] = normalized
    } else if (category === "component") {
      if (!colors.component) colors.component = {}
      colors.component[tokenName] = normalized
    } else {
      colors.primary[tokenName] = normalized
    }
    
    console.log(`Added: ${tokenName} = ${normalized} (${category})`)
  }
  
  // Strategy 1: Extract from Paint Styles
  const paintStyles = figma.getLocalPaintStyles()
  console.log(`Found ${paintStyles.length} paint styles`)
  
  for (const style of paintStyles) {
    const hex = extractColorFromPaintStyle(style)
    if (hex) {
      const styleName = normalizeTokenName(style.name.split("/").pop() || style.name)
      addColor(hex, styleName, style.name)
    }
  }
  
  // Strategy 2: Extract from document nodes
  console.log("Scanning document nodes for colors...")
  
  function scanNode(node: SceneNode) {
    if ("fills" in node && Array.isArray(node.fills)) {
      for (const fill of node.fills) {
        if (fill.type === "SOLID" && fill.visible !== false) {
          const opacity = fill.opacity !== undefined ? fill.opacity : 1
          const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b, opacity)
          
          // Skip pure white/black unless they have meaningful names
          const normalized = normalizeHex(hex)
          if ((normalized === "#ffffff" || normalized === "#000000") && 
              (node.name === "color" || node.name === "Color" || node.name.match(/^(rectangle|frame|ellipse)/i))) {
            continue
          }
          
          // Generate suggested name from node context
          const context = getNodeContext(node)
          let suggestedName = normalizeTokenName(node.name)
          
          // If generic name, try parent
          if (suggestedName === "color" || suggestedName.match(/^(rectangle|frame|ellipse)/i)) {
            if (node.parent && "name" in node.parent) {
              suggestedName = normalizeTokenName(node.parent.name)
            }
          }
          
          // If still generic, use context-based name
          if (suggestedName === "color" || suggestedName.match(/^(rectangle|frame|ellipse|group)/i)) {
            suggestedName = "color"
          }
          
          addColor(hex, suggestedName, context)
        }
      }
    }
    
    if ("children" in node) {
      for (const child of node.children) {
        scanNode(child)
      }
    }
  }
  
  for (const child of figma.currentPage.children) {
    scanNode(child)
  }
  
  // Sort colors within each category
  function sortColors(obj: Record<string, string>): Record<string, string> {
    const entries = Object.entries(obj)
    entries.sort((a, b) => {
      // Extract family and shade
      const matchA = a[0].match(/^(.+)-(\d+)$/)
      const matchB = b[0].match(/^(.+)-(\d+)$/)
      
      if (matchA && matchB) {
        // Same family: sort by shade (950 first, 50 last)
        if (matchA[1] === matchB[1]) {
          return parseInt(matchB[2]) - parseInt(matchA[2])
        }
        // Different family: alphabetical
        return matchA[1].localeCompare(matchB[1])
      }
      
      // Fallback to alphabetical
      return a[0].localeCompare(b[0])
    })
    
    const result: Record<string, string> = {}
    for (const [key, value] of entries) {
      result[key] = value
    }
    return result
  }
  
  colors.primary = sortColors(colors.primary)
  colors.semantic = sortColors(colors.semantic)
  if (colors.component) {
    colors.component = sortColors(colors.component)
  }
  
  console.log(`Extracted: ${Object.keys(colors.primary).length} primary, ${Object.keys(colors.semantic).length} semantic, ${Object.keys(colors.component || {}).length} component`)
  
  return colors
}

/**
 * Extract typography from Text Styles
 */
function extractTypography(): DesignTokens["typography"] {
  const typography: DesignTokens["typography"] = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
  }
  
  const textStyles = figma.getLocalTextStyles()
  const fontFamilies = new Set<string>()
  
  for (const style of textStyles) {
    const fontName = style.fontName
    if (fontName) {
      fontFamilies.add(fontName.family)
    }
    
    // Parse style name
    const parts = style.name.split("/").map(p => p.trim())
    const tokenName = normalizeTokenName(parts.join("-"))
    
    typography.fontSize[tokenName] = `${style.fontSize}px`
    
    // Get font weight
    if (fontName) {
      const weightMap: Record<string, number> = {
        "thin": 100, "extralight": 200, "light": 300, "regular": 400,
        "medium": 500, "semibold": 600, "bold": 700, "extrabold": 800, "black": 900,
      }
      const styleLower = fontName.style.toLowerCase()
      typography.fontWeight[tokenName] = weightMap[styleLower] || 400
    }
    
    // Get line height
    if (style.lineHeight) {
      const lh = style.lineHeight
      if (lh.unit === "PIXELS") {
        typography.lineHeight[tokenName] = `${lh.value}px`
      } else if (lh.unit === "PERCENT") {
        typography.lineHeight[tokenName] = `${lh.value}%`
      } else {
        typography.lineHeight[tokenName] = "auto"
      }
    }
  }
  
  // Convert font families
  Array.from(fontFamilies).forEach((font, index) => {
    typography.fontFamily[`font${index + 1}`] = font
  })
  
  return typography
}

/**
 * Extract shadows from Effect Styles
 */
function extractShadows(): DesignTokens["shadows"] {
  const shadows: DesignTokens["shadows"] = {}
  
  const effectStyles = figma.getLocalEffectStyles()
  
  for (const style of effectStyles) {
    const shadowEffects = style.effects.filter(
      (e) => e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW"
    )
    
    if (shadowEffects.length > 0) {
      const shadow = shadowEffects[0]
      const tokenName = normalizeTokenName(style.name.split("/").pop() || style.name)
      
      if (shadow.type === "DROP_SHADOW" || shadow.type === "INNER_SHADOW") {
        const color = shadow.color
        const offset = shadow.offset || { x: 0, y: 0 }
        const hexColor = rgbToHex(color.r, color.g, color.b, color.a)
        shadows[tokenName] = `${offset.x}px ${offset.y}px ${shadow.radius || 0}px ${shadow.spread || 0}px ${hexColor}`
      }
    }
  }
  
  return shadows
}

/**
 * Main function to extract all tokens
 */
function extractAllTokens(): DesignTokens {
  return {
    colors: extractColors(),
    typography: extractTypography(),
    spacing: {},
    radius: {},
    shadows: extractShadows(),
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  }
}

// Handle messages from UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "extract-tokens") {
    try {
      const tokens = extractAllTokens()
      figma.ui.postMessage({
        type: "tokens-extracted",
        tokens: tokens,
      })
    } catch (error) {
      figma.ui.postMessage({
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      })
    }
  } else if (msg.type === "close") {
    figma.closePlugin()
  }
}

// Show UI
figma.showUI(__html__, {
  width: 400,
  height: 600,
  title: "Vistral Token Extractor",
})

console.log("Vistral Token Extractor plugin loaded (v2 - with hex lookup)")
