/**
 * Token Mapping Configuration
 * 
 * Maps Figma styles to Vistral design tokens structure
 * This file can be customized to match your Figma naming conventions
 */

import type { FigmaStyle, FigmaFill, FigmaTextStyle, FigmaEffect } from "./types"
import type { DesignTokens } from "./types"

/**
 * Extract color value from Figma fill
 */
export function extractColor(fill: FigmaFill): string | null {
  if (fill.type === "SOLID" && fill.color) {
    const { r, g, b, a = 1 } = fill.color
    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0")
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
    return a < 1 ? `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}` : hex
  }
  return null
}

/**
 * Parse style name to extract category and token name
 * Examples:
 * - "Colors/Primary/500" -> { category: "primary", name: "500" }
 * - "Colors/Semantic/Success" -> { category: "semantic", name: "success" }
 * - "Text Styles/Heading/H1" -> { category: "heading", name: "h1" }
 */
export function parseStyleName(name: string): { category: string; name: string } {
  const parts = name.split("/").map((p) => p.trim().toLowerCase())
  
  if (parts.length >= 2) {
    const category = parts[parts.length - 2]
    const tokenName = parts[parts.length - 1]
    return { category, name: tokenName }
  }
  
  // Fallback: use last part as name, first part as category
  return {
    category: parts[0] || "default",
    name: parts[parts.length - 1] || "default",
  }
}

/**
 * Map Figma FILL styles to colors
 */
export function mapFillStyles(styles: Record<string, FigmaStyle>, fills: Record<string, FigmaFill>): DesignTokens["colors"] {
  const colors: DesignTokens["colors"] = {
    primary: {},
    semantic: {},
  }

  for (const [key, style] of Object.entries(styles)) {
    if (style.styleType === "FILL") {
      const fill = fills[key]
      if (fill) {
        const color = extractColor(fill)
        if (color) {
          const { category, name } = parseStyleName(style.name)
          
          // Map to appropriate color category
          if (category === "primary" || category === "color" || category === "colors") {
            colors.primary[name] = color
          } else if (category === "semantic" || category === "semantics") {
            colors.semantic[name] = color
          } else {
            // Create new category if needed
            if (!colors[category]) {
              colors[category] = {}
            }
            colors[category][name] = color
          }
        }
      }
    }
  }

  return colors
}

/**
 * Map Figma TEXT styles to typography
 */
export function mapTextStyles(styles: Record<string, FigmaStyle>, textStyles: Record<string, FigmaTextStyle>): DesignTokens["typography"] {
  const typography: DesignTokens["typography"] = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
  }

  // Extract unique font families
  const fontFamilies = new Set<string>()
  const fontSizes = new Map<string, number>()
  const fontWeights = new Map<string, number>()
  const lineHeights = new Map<string, string>()

  for (const [key, style] of Object.entries(styles)) {
    if (style.styleType === "TEXT") {
      const textStyle = textStyles[key]
      if (textStyle) {
        fontFamilies.add(textStyle.fontFamily)
        
        const { category, name } = parseStyleName(style.name)
        const sizeKey = `${category}-${name}`
        
        fontSizes.set(sizeKey, textStyle.fontSize)
        fontWeights.set(sizeKey, textStyle.fontWeight)
        
        if (textStyle.lineHeight) {
          const lh = textStyle.lineHeight
          if (lh.unit === "PIXELS") {
            lineHeights.set(sizeKey, `${lh.value}px`)
          } else if (lh.unit === "PERCENT") {
            lineHeights.set(sizeKey, `${lh.value}%`)
          }
        }
      }
    }
  }

  // Convert sets/maps to objects
  Array.from(fontFamilies).forEach((font, index) => {
    typography.fontFamily[`font${index + 1}`] = font
  })

  fontSizes.forEach((value, key) => {
    typography.fontSize[key] = `${value}px`
  })

  fontWeights.forEach((value, key) => {
    typography.fontWeight[key] = value
  })

  lineHeights.forEach((value, key) => {
    typography.lineHeight[key] = value
  })

  return typography
}

/**
 * Map Figma EFFECT styles to shadows
 */
export function mapEffectStyles(styles: Record<string, FigmaStyle>, effects: Record<string, FigmaEffect[]>): DesignTokens["shadows"] {
  const shadows: DesignTokens["shadows"] = {}

  for (const [key, style] of Object.entries(styles)) {
    if (style.styleType === "EFFECT") {
      const effectList = effects[key]
      if (effectList && effectList.length > 0) {
        const shadowEffects = effectList.filter(
          (e) => e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW"
        )
        
        if (shadowEffects.length > 0) {
          const { name } = parseStyleName(style.name)
          const shadow = shadowEffects[0]
          
          if (shadow.color && shadow.offset) {
            const color = extractColor({ type: "SOLID", color: shadow.color })
            const offsetX = shadow.offset.x || 0
            const offsetY = shadow.offset.y || 0
            const blur = shadow.radius || 0
            const spread = shadow.spread || 0
            
            shadows[name] = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color || "rgba(0,0,0,0.1)"}`
          }
        }
      }
    }
  }

  return shadows
}

/**
 * Default spacing scale (can be overridden)
 */
export const defaultSpacing: DesignTokens["spacing"] = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
}

/**
 * Default radius scale (can be overridden)
 */
export const defaultRadius: DesignTokens["radius"] = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
}

/**
 * Default breakpoints (can be overridden)
 */
export const defaultBreakpoints: DesignTokens["breakpoints"] = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}
