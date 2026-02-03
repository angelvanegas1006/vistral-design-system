/**
 * Extract Design Tokens from Figma
 * 
 * Reads styles from Figma API and maps them to Vistral design tokens structure
 */

import { z } from "zod"
import { writeFileSync } from "fs"
import { resolve } from "path"
import { getFigmaFile, getFigmaFileStyles, getFigmaStyleValues } from "./client"
import type { FigmaFile, DesignTokens, FigmaStyle, PageDocumentation, FigmaNode } from "./types"
import {
  mapFillStyles,
  mapTextStyles,
  mapEffectStyles,
  defaultSpacing,
  defaultRadius,
  defaultBreakpoints,
  extractColor,
} from "./token-mapping"

/**
 * Design Tokens Schema for validation
 */
const designTokensSchema = z.object({
  colors: z.object({
    primary: z.record(z.string()).default({}),
    semantic: z.record(z.string()).default({}),
  }).catchall(z.record(z.string())),
  typography: z.object({
    fontFamily: z.record(z.string()).default({}),
    fontSize: z.record(z.string()).default({}),
    fontWeight: z.record(z.number()).default({}),
    lineHeight: z.record(z.string()).default({}),
  }),
  spacing: z.record(z.string()),
  radius: z.record(z.string()),
  shadows: z.record(z.string()).optional(),
  breakpoints: z.record(z.string()).optional(),
  documentation: z.record(z.any()).optional(), // Documentation by page/tab name
})

/**
 * Find page node by name in document tree
 */
function findPageByName(node: FigmaNode, pageName: string): FigmaNode | null {
  // Check if this is a page (CANVAS type) with matching name
  if (node.type === "CANVAS" && node.name === pageName) {
    return node
  }
  
  // Recurse children
  if (node.children) {
    for (const child of node.children) {
      const found = findPageByName(child, pageName)
      if (found) return found
    }
  }
  
  return null
}

/**
 * Find all pages/tabs within a parent page
 * Tabs can be CANVAS nodes or FRAME nodes with specific names
 */
function findChildPages(parentNode: FigmaNode): FigmaNode[] {
  const pages: FigmaNode[] = []
  const tabNames = [
    "Colors",
    "Typography", 
    "Spacing & Radius",
    "Elevation",
    "Transitions",
    "Layout (Grids & Layout)",
    "Stack"
  ]
  
  function searchForTabs(node: FigmaNode, depth: number = 0) {
    if (!node.children || depth > 3) return // Limit depth to avoid infinite recursion
    
    for (const child of node.children) {
      // Check if this child matches any tab name
      const matchesTab = tabNames.some(tabName => 
        child.name === tabName || 
        child.name.toLowerCase().includes(tabName.toLowerCase())
      )
      
      // Tabs can be CANVAS, FRAME, or SECTION nodes
      if (matchesTab && (child.type === "CANVAS" || child.type === "FRAME" || child.type === "SECTION")) {
        pages.push(child)
      }
      
      // Also search deeper (tabs might be nested)
      if (child.children && depth < 2) {
        searchForTabs(child, depth + 1)
      }
    }
  }
  
  searchForTabs(parentNode)
  
  // If no tabs found, try finding by name pattern
  if (pages.length === 0 && parentNode.children) {
    for (const child of parentNode.children) {
      // Look for frames that might contain tabs
      if (child.type === "FRAME" && child.children) {
        for (const grandchild of child.children) {
          const matchesTab = tabNames.some(tabName => 
            grandchild.name === tabName || 
            grandchild.name.toLowerCase().includes(tabName.toLowerCase())
          )
          if (matchesTab) {
            pages.push(grandchild)
          }
        }
      }
    }
  }
  
  return pages
}

/**
 * Extract text content from a node and its children
 * Filters out repetitive content and UI elements
 */
function extractTextContent(node: FigmaNode, depth: number = 0): string {
  let text = ""
  const seenTexts = new Set<string>() // Track seen texts to avoid duplicates
  
  // Skip UI elements and navigation
  const skipPatterns = [
    /^menu item$/i,
    /^group title$/i,
    /^header$/i,
    /^footer$/i,
    /^navigation$/i,
    /^button$/i,
    /^icon$/i,
    /^©/i,
    /^figma status$/i,
  ]
  
  if (node.characters) {
    const trimmed = node.characters.trim()
    // Skip if it's a UI element or too short
    if (trimmed.length > 5 && !skipPatterns.some(pattern => pattern.test(trimmed))) {
      // Check for duplicates (avoid repetitive content)
      const normalized = trimmed.toLowerCase().replace(/\s+/g, " ")
      if (!seenTexts.has(normalized)) {
        seenTexts.add(normalized)
        text += trimmed + "\n"
      }
    }
  }
  
  if (node.children && depth < 5) {
    for (const child of node.children) {
      // Skip certain node types
      if (child.type === "INSTANCE" || child.type === "COMPONENT") {
        continue // Skip component instances
      }
      
      if (child.type === "TEXT" && child.characters) {
        const trimmed = child.characters.trim()
        if (trimmed.length > 5 && !skipPatterns.some(pattern => pattern.test(trimmed))) {
          const normalized = trimmed.toLowerCase().replace(/\s+/g, " ")
          if (!seenTexts.has(normalized)) {
            seenTexts.add(normalized)
            text += trimmed + "\n"
          }
        }
      } else if (child.children && depth < 4) {
        // Recursively get text from nested children
        const childText = extractTextContent(child, depth + 1)
        if (childText) {
          // Merge and deduplicate
          const lines = childText.split("\n").filter(line => line.trim().length > 5)
          for (const line of lines) {
            const normalized = line.toLowerCase().replace(/\s+/g, " ")
            if (!seenTexts.has(normalized)) {
              seenTexts.add(normalized)
              text += line + "\n"
            }
          }
        }
      }
    }
  }
  
  return text.trim()
}

/**
 * Clean and normalize text content
 */
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/\n{3,}/g, "\n\n") // Max 2 consecutive newlines
    .trim()
}

/**
 * Extract documentation text from a node
 * Looks for common documentation section names in frame/node names
 */
function extractDocumentation(node: FigmaNode): Partial<PageDocumentation> | null {
  if (!node.name) return null
  
  const nodeNameLower = node.name.toLowerCase().trim()
  const text = cleanText(extractTextContent(node))
  
  // Skip empty or very short text
  if (text.length < 15) return null
  
  // Identify documentation sections by name patterns
  const doc: Partial<PageDocumentation> = {}
  
  // Description section - exact match or contains "description" but not other keywords
  if (nodeNameLower === "description" || 
      (nodeNameLower.includes("description") && 
       !nodeNameLower.includes("content") && 
       !nodeNameLower.includes("usage") &&
       !nodeNameLower.includes("anatomy"))) {
    doc.description = text
    return doc
  }
  
  // Content section - exact match preferred
  if (nodeNameLower === "content" || 
      (nodeNameLower.includes("content") && 
       !nodeNameLower.includes("description") &&
       !nodeNameLower.includes("usage") &&
       !nodeNameLower.includes("anatomy"))) {
    doc.content = text
    return doc
  }
  
  // Usage section
  if (nodeNameLower === "usage" || 
      nodeNameLower === "how to use" ||
      nodeNameLower === "when to use" ||
      (nodeNameLower.includes("usage") && !nodeNameLower.includes("content"))) {
    doc.usage = text
    return doc
  }
  
  // Anatomy section
  if (nodeNameLower === "anatomy" || 
      nodeNameLower === "structure" ||
      nodeNameLower === "parts" ||
      (nodeNameLower.includes("anatomy") && !nodeNameLower.includes("description"))) {
    doc.anatomy = text
    return doc
  }
  
  // Best Practices - DO'S
  if (nodeNameLower === "do's" || 
      nodeNameLower === "dos" ||
      nodeNameLower === "do's and don'ts" ||
      (nodeNameLower.includes("do's") && !nodeNameLower.includes("don't"))) {
    if (!doc.bestPractices) doc.bestPractices = {}
    if (!doc.bestPractices.dos) doc.bestPractices.dos = []
    // Split by line breaks, bullets, or numbered lists
    const items = text.split(/\n+|•|[-*]|\d+\./).filter(item => item.trim().length > 10)
    doc.bestPractices.dos = items.map(item => cleanText(item)).filter(item => item.length > 0)
    if (doc.bestPractices.dos.length > 0) return doc
  }
  
  // Best Practices - DON'TS
  if (nodeNameLower === "don'ts" || 
      nodeNameLower === "donts" ||
      nodeNameLower === "don't" ||
      nodeNameLower === "avoid" ||
      (nodeNameLower.includes("don't") || nodeNameLower.includes("dont"))) {
    if (!doc.bestPractices) doc.bestPractices = {}
    if (!doc.bestPractices.donts) doc.bestPractices.donts = []
    // Split by line breaks, bullets, or numbered lists
    const items = text.split(/\n+|•|[-*]|\d+\./).filter(item => item.trim().length > 10)
    doc.bestPractices.donts = items.map(item => cleanText(item)).filter(item => item.length > 0)
    if (doc.bestPractices.donts.length > 0) return doc
  }
  
  return null
}

/**
 * Extract documentation from page nodes
 * Looks for frames/sections with specific names like "Description", "Usage", etc.
 */
function extractPageDocumentation(pageNode: FigmaNode): PageDocumentation {
  const documentation: PageDocumentation = {}
  
  function traverseForDocs(node: FigmaNode, depth: number = 0) {
    if (!node || depth > 10) return // Limit depth
    
    const nodeNameLower = (node.name || "").toLowerCase().trim()
    
    // Look for frames/sections with documentation section names
    if (node.type === "FRAME" || node.type === "SECTION" || node.type === "GROUP") {
      // Check if this frame/section is a documentation section
      const doc = extractDocumentation(node)
      if (doc) {
        // Merge documentation (prioritize first found)
        if (doc.description && !documentation.description) {
          documentation.description = doc.description
        }
        if (doc.content && !documentation.content) {
          documentation.content = doc.content
        }
        if (doc.usage && !documentation.usage) {
          documentation.usage = doc.usage
        }
        if (doc.anatomy && !documentation.anatomy) {
          documentation.anatomy = doc.anatomy
        }
        if (doc.bestPractices) {
          if (!documentation.bestPractices) {
            documentation.bestPractices = { dos: [], donts: [] }
          }
          if (doc.bestPractices.dos && doc.bestPractices.dos.length > 0) {
            documentation.bestPractices.dos = [
              ...(documentation.bestPractices.dos || []),
              ...doc.bestPractices.dos
            ]
          }
          if (doc.bestPractices.donts && doc.bestPractices.donts.length > 0) {
            documentation.bestPractices.donts = [
              ...(documentation.bestPractices.donts || []),
              ...doc.bestPractices.donts
            ]
          }
        }
      }
    }
    
    // Also check for text nodes that might be section titles
    if (node.type === "TEXT" && node.characters) {
      const text = node.characters.trim()
      const nodeNameLower = (node.name || "").toLowerCase()
      
      // If this text node has a name matching a section, use it
      if (nodeNameLower === "description" && text.length > 20 && !documentation.description) {
        documentation.description = text
      } else if (nodeNameLower === "usage" && text.length > 20 && !documentation.usage) {
        documentation.usage = text
      } else if (nodeNameLower === "content" && text.length > 20 && !documentation.content) {
        documentation.content = text
      } else if (nodeNameLower === "anatomy" && text.length > 20 && !documentation.anatomy) {
        documentation.anatomy = text
      }
    }
    
    // Recurse children
    if (node.children) {
      for (const child of node.children) {
        traverseForDocs(child, depth + 1)
      }
    }
  }
  
  traverseForDocs(pageNode)
  return documentation
}

/**
 * Normalize token name from node name or label
 */
function normalizeTokenName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
}

/**
 * Check if a node name is a generic UI element name or section title
 */
function isGenericName(name: string): boolean {
  const genericPatterns = [
    /^(frame|rectangle|group|text|container|box|element|item|ellipse|circle|shape)(\s+\d+)?$/i,
    /^(swatch|badge|overlay|header|footer|nav|menu|button|icon)(\s+\d+)?$/i,
    /^unknown$/i,
    /^color$/i,
    // Filter out section titles
    /^(primary|semantic|component)\s*colors?\s*(palette)?$/i,
    /^primitives?$/i,
    /^semantic$/i,
    /^components?$/i,
  ]
  return genericPatterns.some(pattern => pattern.test(name))
}

/**
 * Check if text looks like a section title or header (not a token name)
 */
function isSectionTitle(text: string): boolean {
  const titlePatterns = [
    /^(primary|semantic|component)\s*colors?\s*(palette)?$/i,
    /^primitives?$/i,
    /^semantic$/i,
    /^components?$/i,
    /^prophero$/i,
    /^design system/i,
  ]
  return titlePatterns.some(pattern => pattern.test(text.trim()))
}

/**
 * Extract token name from node or nearby label
 * Looks for meaningful names in parent frames, siblings, or children
 */
function extractTokenName(node: FigmaNode, parent?: FigmaNode, grandparent?: FigmaNode): string {
  // Try node name first
  if (node.name && node.name.trim().length > 0) {
    const name = node.name.trim()
    if (!isGenericName(name)) {
      return normalizeTokenName(name)
    }
  }
  
  // Try parent name
  if (parent?.name && !isGenericName(parent.name)) {
    const parentName = normalizeTokenName(parent.name)
    if (parentName !== "unknown") {
      return parentName
    }
  }
  
  // Try grandparent name
  if (grandparent?.name && !isGenericName(grandparent.name)) {
    const grandparentName = normalizeTokenName(grandparent.name)
    if (grandparentName !== "unknown") {
      return grandparentName
    }
  }
  
  // Try to find a label in siblings
  if (parent?.children) {
    for (const sibling of parent.children) {
      if (sibling.type === "TEXT" && sibling.characters && sibling !== node) {
        const text = sibling.characters.trim()
        // Check if it's a label (short text, looks like a token name)
        if (text.length > 0 && text.length < 30 && 
            !text.includes(" ") && 
            !isGenericName(text) &&
            /^[a-z0-9-]+$/i.test(text)) {
          return normalizeTokenName(text)
        }
      }
    }
  }
  
  // Try children for labels (but prefer text that looks like a token name)
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "TEXT" && child.characters) {
        const text = child.characters.trim()
        // Look for token-like names (alphanumeric with hyphens, not sentences)
        if (text.length > 0 && text.length < 30 && 
            !text.includes(".") && 
            !text.match(/^[A-Z][a-z]+ [a-z]+/) && // Not a sentence
            !isGenericName(text)) {
          return normalizeTokenName(text)
        }
      }
    }
  }
  
  return null // Return null instead of "unknown" to filter out
}

/**
 * Find text label near a color node
 * Looks for text nodes that might be token names or color values
 * Searches in multiple directions and contexts (including parent frames)
 */
function findColorLabel(node: FigmaNode, parent?: FigmaNode, searchRadius: number = 15): string | null {
  if (!parent?.children) {
    // Try grandparent if parent has no children
    return null
  }
  
  const nodeIndex = parent.children.indexOf(node)
  if (nodeIndex === -1) return null
  
  // Search nearby siblings for labels (wider radius for color palettes)
  const start = Math.max(0, nodeIndex - searchRadius)
  const end = Math.min(parent.children.length, nodeIndex + searchRadius + 1)
  
  // Priority: check nodes before the color swatch first (labels usually come before)
  const searchOrder = []
  for (let i = nodeIndex - 1; i >= start; i--) {
    searchOrder.push(i)
  }
  for (let i = nodeIndex + 1; i < end; i++) {
    searchOrder.push(i)
  }
  
  // Also check the node itself and its children first
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "TEXT" && child.characters) {
        const text = child.characters.trim()
        if (isValidTokenName(text)) {
          return normalizeTokenName(text)
        }
      }
    }
  }
  
  for (const i of searchOrder) {
    const sibling = parent.children[i]
    if (sibling === node || sibling.type !== "TEXT" || !sibling.characters) continue
    
    const text = sibling.characters.trim()
    
    if (isValidTokenName(text)) {
      return normalizeTokenName(text)
    }
  }
  
  return null
}

/**
 * Check if text looks like a valid token name
 */
function isValidTokenName(text: string): boolean {
  // Skip section titles
  if (isSectionTitle(text)) {
    return false
  }
  
  // Skip hex color codes (these are values, not names)
  if (/^#[0-9a-f]{6,8}$/i.test(text)) {
    return false
  }
  
  // Skip accessibility ratings (AAA, AA)
  if (/^(AAA|AA|A)$/i.test(text)) {
    return false
  }
  
  // Skip very long text (likely descriptions)
  if (text.length > 80) {
    return false
  }
  
  // Look for token names (alphanumeric with hyphens, no spaces)
  // Token names can be like: "blue-50", "background-primary", "button-primary-default-background"
  if (text.length > 0 && 
      !text.includes(" ") && // No spaces (tokens use hyphens)
      !text.includes(".") && // No periods
      !isGenericName(text) &&
      !isSectionTitle(text) &&
      /^[a-z0-9-]+$/i.test(text)) {
    const normalized = normalizeTokenName(text)
    // Double check it's not a section title after normalization
    if (!isSectionTitle(normalized) && normalized.length > 0) {
      return true
    }
  }
  
  return false
}

/**
 * Find color family name from parent hierarchy
 * Looks for color family names like "Blue", "Red", "Gray", etc.
 * Also checks semantic families like "Success", "Error", "Warning"
 * Also checks for common patterns like "huspy-rebu" -> "huspy-rebu"
 */
function findColorFamily(node: FigmaNode, parent?: FigmaNode, grandparent?: FigmaNode, greatGrandparent?: FigmaNode): string | null {
  const colorFamilies = ["blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "teal", "indigo", "gray", "grey", "neutral", "black", "white"]
  const semanticFamilies = ["success", "error", "warning", "info", "danger", "alert"]
  
  const checkNode = (n?: FigmaNode) => {
    if (!n?.name) return null
    const name = n.name.toLowerCase().trim()
    
    // Check semantic families first
    for (const family of semanticFamilies) {
      if (name === family || name.startsWith(family + " ") || name.startsWith(family + "-")) {
        return family
      }
    }
    
    // Check color families
    for (const family of colorFamilies) {
      if (name === family || name.startsWith(family + " ") || name.startsWith(family + "-")) {
        return family
      }
    }
    
    // Check if name contains a color family (e.g., "Blue 50" -> "blue")
    for (const family of colorFamilies) {
      if (name.includes(family)) {
        // Extract just the family name (before any number or other text)
        const match = name.match(new RegExp(`(${family})(?:[-\\s]|$)`))
        if (match) {
          return match[1]
        }
        return family
      }
    }
    
    // Check for custom color families (e.g., "huspy-rebu")
    // Look for patterns like "word-word" that might be color families
    const customFamilyMatch = name.match(/^([a-z]+-[a-z]+)(?:[-\\s]|$)/)
    if (customFamilyMatch && !name.match(/^(primary|semantic|component)/)) {
      return customFamilyMatch[1]
    }
    
    return null
  }
  
  // Check in order: parent, grandparent, great-grandparent
  return checkNode(parent) || checkNode(grandparent) || checkNode(greatGrandparent) || null
}

/**
 * Find shade number (50, 100, 200, etc.) from nearby text
 * Also checks node children and parent frame names
 */
function findShadeNumber(node: FigmaNode, parent?: FigmaNode): string | null {
  // Check node's own children first
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "TEXT" && child.characters) {
        const text = child.characters.trim()
        if (/^\d+$/.test(text) && parseInt(text) >= 50 && parseInt(text) <= 10000) {
          return text
        }
      }
    }
  }
  
  if (!parent?.children) return null
  
  const nodeIndex = parent.children.indexOf(node)
  if (nodeIndex === -1) return null
  
  // Look for numeric labels near the color swatch (wider search)
  for (let i = Math.max(0, nodeIndex - 8); i < Math.min(parent.children.length, nodeIndex + 9); i++) {
    const sibling = parent.children[i]
    if (sibling.type === "TEXT" && sibling.characters) {
      const text = sibling.characters.trim()
      // Look for numbers that might be shade values (50, 100, 200, etc.)
      if (/^\d+$/.test(text) && parseInt(text) >= 50 && parseInt(text) <= 10000) {
        return text
      }
    }
  }
  
  // Also check parent frame name for shade numbers
  if (parent?.name) {
    const parentName = parent.name
    const shadeMatch = parentName.match(/-(\d+)$/)
    if (shadeMatch) {
      const shade = shadeMatch[1]
      const shadeNum = parseInt(shade)
      if (shadeNum >= 50 && shadeNum <= 10000) {
        return shade
      }
    }
  }
  
  return null
}

/**
 * Extract color token name from context
 * Looks at parent frames, siblings, and children to find the token name
 * Handles color families with shades (e.g., "blue-50", "red-500")
 */
function extractColorTokenName(
  node: FigmaNode, 
  parent?: FigmaNode, 
  grandparent?: FigmaNode,
  greatGrandparent?: FigmaNode
): string | null {
  // Strategy 1: Check node's own children first (labels are often inside the swatch)
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "TEXT" && child.characters) {
        const text = child.characters.trim()
        if (isValidTokenName(text)) {
          const normalized = normalizeTokenName(text)
          if (normalized && normalized !== "unknown") {
            return normalized
          }
        }
      }
    }
  }
  
  // Strategy 2: If node name is generic ("color", "text"), check parent name
  const nodeNameLower = node.name?.toLowerCase() || ""
  if (nodeNameLower === "color" || nodeNameLower === "text" || nodeNameLower === "swatch") {
    // Parent name is likely the token name or color family
    if (parent?.name && !isGenericName(parent.name) && !isSectionTitle(parent.name)) {
      const parentNameRaw = parent.name
      const parentName = normalizeTokenName(parentNameRaw)
      if (parentName && parentName !== "unknown") {
        // Check if parent name contains shade number
        const shadeMatch = parentName.match(/-(\d+)$/)
        if (shadeMatch) {
          return parentName
        }
        // Look for shade number nearby (in siblings or children)
        const shadeNumber = findShadeNumber(node, parent)
        if (shadeNumber) {
          return `${parentName}-${shadeNumber}`
        }
        // If parent name is just a number, check grandparent for color family
        if (/^\d+$/.test(parentName)) {
          const colorFamily = findColorFamily(node, parent, grandparent, greatGrandparent)
          if (colorFamily) {
            return `${colorFamily}-${parentName}`
          }
        }
        // Use parent name directly (e.g., "Color-base" -> "color-base")
        return parentName
      }
    }
    // If parent name is generic too, check grandparent
    if (grandparent?.name && !isGenericName(grandparent.name) && !isSectionTitle(grandparent.name)) {
      const grandparentName = normalizeTokenName(grandparent.name)
      if (grandparentName && grandparentName !== "unknown") {
        const shadeNumber = findShadeNumber(node, parent)
        if (shadeNumber) {
          return `${grandparentName}-${shadeNumber}`
        }
        return grandparentName
      }
    }
  }
  
  // Strategy 2.5: If node name is just a number, combine with color family
  // This should run early to catch numeric swatch names
  if (node.name && /^\d+$/.test(node.name.trim())) {
    const number = node.name.trim()
    
    // First try to find color family from hierarchy
    const colorFamily = findColorFamily(node, parent, grandparent, greatGrandparent)
    if (colorFamily) {
      return `${colorFamily}-${number}`
    }
    
    // If no color family found, check parent name more carefully
    if (parent?.name && !isGenericName(parent.name) && !isSectionTitle(parent.name)) {
      const parentNameRaw = parent.name
      const parentNameLower = parentNameRaw.toLowerCase()
      
      // Check if parent name contains a color family
      const colorFamilies = ["blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "teal", "indigo", "gray", "grey", "neutral", "black", "white", "success", "error", "warning", "huspy-rebu", "huspy"]
      for (const family of colorFamilies) {
        if (parentNameLower.includes(family)) {
          const normalizedFamily = family.replace("huspy", "huspy-rebu")
          return `${normalizedFamily}-${number}`
        }
      }
      
      // If parent name doesn't contain a color family but is not a number, use it
      const parentName = normalizeTokenName(parentNameRaw)
      if (parentName && parentName !== "unknown" && !/^\d+$/.test(parentName)) {
        // Check if parent name already ends with a number (don't duplicate)
        if (!parentName.match(/-\d+$/)) {
          return `${parentName}-${number}`
        }
        return parentName
      }
    }
    
    // Check grandparent for color family
    if (grandparent?.name) {
      const grandparentNameLower = grandparent.name.toLowerCase()
      const colorFamilies = ["blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "teal", "indigo", "gray", "grey", "neutral", "black", "white", "success", "error", "warning", "huspy-rebu", "huspy"]
      for (const family of colorFamilies) {
        if (grandparentNameLower.includes(family)) {
          const normalizedFamily = family.replace("huspy", "huspy-rebu")
          return `${normalizedFamily}-${number}`
        }
      }
    }
    
    // Last resort: return the number (will be filtered if no context found)
    return number
  }
  
  // Strategy 3: Look for label in nearby siblings (prioritize this)
  const siblingLabel = findColorLabel(node, parent, 20)
  if (siblingLabel && !isSectionTitle(siblingLabel)) {
    // Check if it's just a shade number - combine with color family
    if (/^\d+$/.test(siblingLabel)) {
      const colorFamily = findColorFamily(node, parent, grandparent, greatGrandparent)
      if (colorFamily) {
        return `${colorFamily}-${siblingLabel}`
      }
      // If no color family, try parent name
      if (parent?.name && !isGenericName(parent.name) && !isSectionTitle(parent.name)) {
        const parentName = normalizeTokenName(parent.name)
        if (parentName && parentName !== "unknown" && !/^\d+$/.test(parentName)) {
          return `${parentName}-${siblingLabel}`
        }
      }
      // Last resort: return just the number (will be filtered later if no context)
      return siblingLabel
    }
    return siblingLabel
  }
  
  // Strategy 4: Look for color family + shade combination
  const colorFamily = findColorFamily(node, parent, grandparent, greatGrandparent)
  const shadeNumber = findShadeNumber(node, parent)
  
  if (colorFamily && shadeNumber) {
    return `${colorFamily}-${shadeNumber}`
  }
  
  // Strategy 5: Check node name
  if (node.name && !isGenericName(node.name) && !isSectionTitle(node.name)) {
    const nodeName = normalizeTokenName(node.name)
    if (nodeName && nodeName !== "unknown") {
      // If it's just a number, combine with color family or parent name
      if (/^\d+$/.test(nodeName)) {
        if (colorFamily) {
          return `${colorFamily}-${nodeName}`
        }
        // Try parent name if no color family
        if (parent?.name && !isGenericName(parent.name) && !isSectionTitle(parent.name)) {
          const parentName = normalizeTokenName(parent.name)
          if (parentName && parentName !== "unknown" && !/^\d+$/.test(parentName)) {
            return `${parentName}-${nodeName}`
          }
        }
        // Return just number if no context (will be filtered if needed)
        return nodeName
      }
      return nodeName
    }
  }
  
  // Strategy 6: Check parent frame name (often contains token name or family)
  if (parent?.name && !isGenericName(parent.name) && !isSectionTitle(parent.name)) {
    const parentName = normalizeTokenName(parent.name)
    if (parentName && parentName !== "unknown") {
      // Check if parent name contains shade number
      const shadeMatch = parentName.match(/-(\d+)$/)
      if (shadeMatch) {
        return parentName
      }
      // If parent is a color family, combine with shade if found
      if (colorFamily && shadeNumber) {
        return `${colorFamily}-${shadeNumber}`
      }
      // If parent name looks like a token (has hyphens), use it
      if (parentName.includes("-")) {
        return parentName
      }
      // Otherwise, combine with shade if we have one
      if (shadeNumber) {
        return `${parentName}-${shadeNumber}`
      }
      return parentName
    }
  }
  
  // Strategy 7: Check grandparent for palette context and search wider
  if (grandparent?.name) {
    const grandparentName = grandparent.name.toLowerCase()
    if (grandparentName.includes("primary colors") || 
        grandparentName.includes("primary palette") ||
        grandparentName.includes("semantic colors") || 
        grandparentName.includes("semantic palette") ||
        grandparentName.includes("component colors") || 
        grandparentName.includes("component palette")) {
      // Search even wider in this palette section
      const label = findColorLabel(node, parent, 30)
      if (label && !isSectionTitle(label)) {
        // Combine with color family if we have one and label is just a number
        if (/^\d+$/.test(label) && colorFamily) {
          return `${colorFamily}-${label}`
        }
        return label
      }
    }
  }
  
  // Strategy 8: Check great-grandparent for additional context
  if (greatGrandparent?.name) {
    const ggName = greatGrandparent.name.toLowerCase()
    if (ggName.includes("primary") || ggName.includes("semantic") || ggName.includes("component")) {
      const label = findColorLabel(node, parent, 40)
      if (label && !isSectionTitle(label)) {
        if (/^\d+$/.test(label) && colorFamily) {
          return `${colorFamily}-${label}`
        }
        return label
      }
    }
  }
  
  // Strategy 9: If we found a color family but no shade, use just the family name
  if (colorFamily) {
    return colorFamily
  }
  
  // Strategy 9: Try to extract from parent's parent if it has a meaningful name
  if (grandparent?.name && !isGenericName(grandparent.name)) {
    const ggName = normalizeTokenName(grandparent.name)
    if (ggName && ggName !== "unknown" && !isSectionTitle(ggName)) {
      // Combine with shade if available
      if (shadeNumber) {
        return `${ggName}-${shadeNumber}`
      }
      return ggName
    }
  }
  
  return null
}

/**
 * Determine color category based on context and name
 */
function categorizeColor(
  tokenName: string,
  parent?: FigmaNode,
  grandparent?: FigmaNode,
  greatGrandparent?: FigmaNode
): string {
  const nameLower = tokenName.toLowerCase()
  
  // Check parent hierarchy for palette section
  const checkName = (node?: FigmaNode) => {
    if (!node?.name) return null
    const nodeName = node.name.toLowerCase()
    if (nodeName.includes("semantic colors") || nodeName.includes("semantic palette")) return "semantic"
    if (nodeName.includes("component colors") || nodeName.includes("component palette")) return "component"
    if (nodeName.includes("primary colors") || nodeName.includes("primary palette")) return "primary"
    return null
  }
  
  // Check hierarchy from closest to furthest
  const categoryFromParent = checkName(parent) || checkName(grandparent) || checkName(greatGrandparent)
  if (categoryFromParent) {
    return categoryFromParent
  }
  
  // Fallback to name-based categorization
  if (nameLower.includes("semantic") || 
      nameLower.includes("success") || 
      nameLower.includes("error") || 
      nameLower.includes("warning") ||
      nameLower.includes("info") ||
      nameLower.includes("danger") ||
      nameLower.includes("alert") ||
      nameLower.includes("status") ||
      nameLower.includes("background") ||
      nameLower.includes("text-") ||
      nameLower.includes("interactive-")) {
    return "semantic"
  } else if (nameLower.includes("component") ||
             nameLower.includes("button-") ||
             nameLower.includes("input-") ||
             nameLower.includes("avatar") ||
             nameLower.includes("card-")) {
    return "component"
  } else {
    return "primary"
  }
}

/**
 * Check if a node looks like a color swatch (not a container)
 */
function isColorSwatch(node: FigmaNode, parent?: FigmaNode): boolean {
  const bbox = (node as any).absoluteBoundingBox
  if (!bbox) return false
  
  const width = bbox.width
  const height = bbox.height
  
  // Skip very small nodes (icons, UI elements)
  if (width < 10 || height < 10) return false
  
  // Skip very large nodes (full-width containers)
  // But allow medium-large nodes that might be swatches in a grid
  if (width > 800 || height > 800) return false
  
  // Check if parent name suggests this is in a color palette section
  const parentName = parent?.name?.toLowerCase() || ""
  const isInPalette = parentName.includes("palette") || 
                     parentName.includes("color") ||
                     parentName.includes("swatch") ||
                     parentName.match(/^(blue|red|green|yellow|purple|orange|pink|cyan|teal|indigo|gray|grey|neutral|black|white)$/)
  
  // If in a palette section, be more lenient
  if (isInPalette) {
    // Allow nodes up to 600px if they're in a palette section
    if (width > 600 || height > 600) return false
    // Allow more children if in palette (might have labels)
    if (node.children && node.children.length > 8) return false
    return true
  }
  
  // For other contexts, be more strict
  // Swatches are typically between 20-300px
  if (width > 300 || height > 300) {
    // Check aspect ratio - very wide/tall nodes are likely containers
    const aspectRatio = Math.max(width, height) / Math.min(width, height)
    if (aspectRatio > 8) return false // Too rectangular
    // If it has many children, it's likely a container
    if (node.children && node.children.length > 5) return false
  }
  
  return true
}

/**
 * Extract colors from Colors section
 * Extracts from all three palettes: Primary, Semantic, and Component
 * Uses both visual extraction and Figma style names
 */
function extractColorsFromPage(pageNode: FigmaNode, file: FigmaFile): DesignTokens["colors"] {
  const colors: DesignTokens["colors"] = { primary: {}, semantic: {}, component: {} }
  const colorMap = new Map<string, { color: string, category: string }>() // tokenName -> {color, category}
  const stats = { checked: 0, extracted: 0, skipped: 0, reasons: new Map<string, number>() }
  
  // First, collect Figma FILL style names for reference
  const styleNames = new Set<string>()
  for (const [key, style] of Object.entries(file.styles)) {
    if (style.styleType === "FILL") {
      styleNames.add(style.name.toLowerCase())
    }
  }
  
  const debugNodes: Array<{name: string, type: string, width: number, height: number, color: string, parent: string, path: string}> = []
  
  function traverseForColors(
    node: FigmaNode, 
    parent?: FigmaNode, 
    grandparent?: FigmaNode,
    greatGrandparent?: FigmaNode,
    path: string = ""
  ) {
    if (!node) return
    
    const currentPath = path ? `${path} > ${node.name || node.type}` : (node.name || node.type)
    
    // Look for rectangles/frames with fills (color swatches)
    if ((node.type === "RECTANGLE" || node.type === "FRAME" || node.type === "ELLIPSE") && node.fills) {
      stats.checked++
      
      const bbox = (node as any).absoluteBoundingBox
      const width = bbox?.width || 0
      const height = bbox?.height || 0
      
      // Extract color for debugging
      let debugColor = ""
      for (const fill of node.fills) {
        if (fill.type === "SOLID" && fill.color) {
          debugColor = extractColor(fill) || ""
          break
        }
      }
      
      // Log interesting nodes for debugging
      if (process.env.DEBUG && width > 20 && width < 500 && height > 20 && height < 500) {
        debugNodes.push({
          name: node.name || "unnamed",
          type: node.type,
          width: Math.round(width),
          height: Math.round(height),
          color: debugColor,
          parent: parent?.name || "none",
          path: currentPath
        })
      }
      
      // More lenient filtering - check multiple conditions
      let shouldProcess = false
      let skipReason = ""
      
      const parentName = parent?.name?.toLowerCase() || ""
      const grandparentName = grandparent?.name?.toLowerCase() || ""
      const nodeName = node.name?.toLowerCase() || ""
      
      // Check if we're in a color context
      const isInColorContext = parentName.includes("color") || 
                              parentName.includes("palette") ||
                              parentName.includes("swatch") ||
                              parentName.includes("base") ||
                              grandparentName.includes("color") ||
                              grandparentName.includes("palette") ||
                              // Check for color family names
                              /^(blue|red|green|yellow|purple|orange|pink|cyan|teal|indigo|gray|grey|neutral|black|white|success|error|warning|info)/.test(parentName) ||
                              // Check if node name suggests it's a color swatch
                              nodeName === "color" ||
                              nodeName.includes("swatch")
      
      // Skip very small nodes (icons)
      if (width < 8 || height < 8) {
        skipReason = "too-small"
      }
      // Skip very large full-width containers
      else if (width > 1000 || height > 1000) {
        skipReason = "too-large"
      }
      // If in color context, be very lenient
      else if (isInColorContext) {
        // Allow nodes up to 600px if in color context (swatches can be larger)
        if (width <= 600 && height <= 600) {
          shouldProcess = true
        } else {
          skipReason = "large-in-context"
        }
      } else {
        // Outside color context, be more strict
        if (width <= 300 && height <= 300) {
          // Check aspect ratio
          const aspectRatio = Math.max(width, height) / Math.min(width, height)
          if (aspectRatio <= 10) {
            shouldProcess = true
          } else {
            skipReason = "bad-aspect-ratio"
          }
        } else {
          skipReason = "too-large-outside-context"
        }
      }
      
      if (!shouldProcess) {
        stats.skipped++
        const count = stats.reasons.get(skipReason) || 0
        stats.reasons.set(skipReason, count + 1)
        // Still recurse children
        if (node.children) {
          for (const child of node.children) {
            traverseForColors(child, node, parent, grandparent, currentPath)
          }
        }
        return
      }
      
      // This looks like a color swatch, extract color
      // First, try to find the actual color swatch inside (children might have the real color)
      let actualColor: string | null = null
      let actualColorNode: FigmaNode | null = null
      
      // Helper function to extract color from a node
      const extractColorFromNode = (n: FigmaNode): string | null => {
        if (!n.fills) return null
        for (const fill of n.fills) {
          if (fill.type === "SOLID" && fill.color) {
            return extractColor(fill)
          }
        }
        return null
      }
      
      // Check if we're in a color palette context (allows white/black)
      // Reuse variables already declared above
      const isInPaletteContext = parentName.includes("palette") ||
                                parentName.includes("color") ||
                                grandparentName.includes("palette") ||
                                grandparentName.includes("color") ||
                                /^(blue|red|green|yellow|purple|orange|pink|cyan|teal|indigo|gray|grey|neutral|black|white|success|error|warning)/.test(parentName)
      
      // Look for child nodes with fills (the actual swatch might be nested)
      // Search recursively through children to find the actual color swatch
      function findColorInChildren(n: FigmaNode, depth: number = 0): { color: string, node: FigmaNode } | null {
        if (depth > 5) return null // Increased recursion depth
        
        // Check this node's color first
        const nodeColor = extractColorFromNode(n)
        if (nodeColor) {
          // In palette context, prefer non-white/black colors, but accept all
          // Outside palette context, only accept non-white/black
          if (isInPaletteContext) {
            // Prefer non-white/black, but accept white/black if no other option
            if (nodeColor !== "#ffffff" && nodeColor !== "#000000") {
              return { color: nodeColor, node: n }
            }
          } else {
            if (nodeColor !== "#ffffff" && nodeColor !== "#000000") {
              return { color: nodeColor, node: n }
            }
          }
        }
        
        // Check children - be more aggressive in finding colors
        if (n.children) {
          // First pass: look for smaller children (likely the actual swatch)
          for (const child of n.children) {
            if ((child.type === "RECTANGLE" || child.type === "FRAME" || child.type === "ELLIPSE")) {
              const childBbox = (child as any).absoluteBoundingBox
              const childWidth = childBbox?.width || 0
              const childHeight = childBbox?.height || 0
              
              // If child is significantly smaller, it's likely the actual swatch
              if (childWidth < width * 0.98 && childHeight < height * 0.98) {
                const result = findColorInChildren(child, depth + 1)
                if (result && result.color !== "#ffffff" && result.color !== "#000000") {
                  return result
                }
                
                // Also check this child directly
                const childColor = extractColorFromNode(child)
                if (childColor && childColor !== "#ffffff" && childColor !== "#000000") {
                  return { color: childColor, node: child }
                }
              }
            }
          }
          
          // Second pass: if no good color found, accept any color from children
          if (!nodeColor || nodeColor === "#ffffff" || nodeColor === "#000000") {
            for (const child of n.children) {
              if ((child.type === "RECTANGLE" || child.type === "FRAME" || child.type === "ELLIPSE")) {
                const childColor = extractColorFromNode(child)
                if (childColor && childColor !== "#ffffff" && childColor !== "#000000") {
                  return { color: childColor, node: child }
                }
              }
            }
          }
        }
        
        // If we found a color (even white/black) and we're in palette context, return it
        if (nodeColor && isInPaletteContext) {
          return { color: nodeColor, node: n }
        }
        
        return null
      }
      
      // Try to find color in children first
      const childColorResult = findColorInChildren(node)
      if (childColorResult) {
        actualColor = childColorResult.color
        actualColorNode = childColorResult.node
      }
      
      // If no child color found, use the node's own fills
      if (!actualColor) {
        const nodeColor = extractColorFromNode(node)
        if (nodeColor) {
          // In palette context, accept all colors
          if (isInPaletteContext || (nodeColor !== "#ffffff" && nodeColor !== "#000000")) {
            actualColor = nodeColor
            actualColorNode = node
          }
        }
      }
      
      if (!actualColor) {
        // Recurse children and return
        if (node.children) {
          for (const child of node.children) {
            traverseForColors(child, node, parent, grandparent, currentPath)
          }
        }
        return
      }
      
      // Extract token name using multiple strategies
      const tokenName = extractColorTokenName(actualColorNode || node, parent, grandparent, greatGrandparent)
      
      if (!tokenName) {
        stats.skipped++
        const count = stats.reasons.get("no-name") || 0
        stats.reasons.set("no-name", count + 1)
        // Recurse children and return
        if (node.children) {
          for (const child of node.children) {
            traverseForColors(child, node, parent, grandparent, currentPath)
          }
        }
        return
      }
      
      // Skip section titles and generic names
      // But allow pure numbers if they're combined with a color family (handled above)
      if (isSectionTitle(tokenName) || (isGenericName(tokenName) && !/^\d+$/.test(tokenName))) {
        stats.skipped++
        const count = stats.reasons.get("generic-name") || 0
        stats.reasons.set("generic-name", count + 1)
        // Recurse children and return
        if (node.children) {
          for (const child of node.children) {
            traverseForColors(child, node, parent, grandparent, currentPath)
          }
        }
        return
      }
      
      // Skip pure numbers without context, BUT allow them if we're in a color palette context
      // (they might be shade numbers that we'll process later or combine with parent)
      if (/^\d+$/.test(tokenName)) {
        // Check if we're in a color palette context
        const isInPaletteContext = parentName.includes("palette") ||
                                  parentName.includes("color") ||
                                  parentName.includes("base") ||
                                  grandparentName.includes("palette") ||
                                  grandparentName.includes("color") ||
                                  /^(blue|red|green|yellow|purple|orange|pink|cyan|teal|indigo|gray|grey|neutral|black|white|success|error|warning|huspy)/.test(parentName)
        
        if (!isInPaletteContext) {
          stats.skipped++
          const count = stats.reasons.get("no-name") || 0
          stats.reasons.set("no-name", count + 1)
          // Recurse children and return
          if (node.children) {
            for (const child of node.children) {
              traverseForColors(child, node, parent, grandparent, currentPath)
            }
          }
          return
        }
        // If in palette context, try to find color family from parent hierarchy
        // Look more deeply for color family
        let foundFamily: string | null = null
        
        // Check parent name for color family
        if (parent?.name) {
          const parentNameLower = parent.name.toLowerCase()
          for (const family of ["blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "teal", "indigo", "gray", "grey", "neutral", "black", "white", "success", "error", "warning", "huspy-rebu", "huspy"]) {
            if (parentNameLower.includes(family)) {
              foundFamily = family.replace("huspy", "huspy-rebu") // Normalize
              break
            }
          }
        }
        
        // Check grandparent
        if (!foundFamily && grandparent?.name) {
          const grandparentNameLower = grandparent.name.toLowerCase()
          for (const family of ["blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "teal", "indigo", "gray", "grey", "neutral", "black", "white", "success", "error", "warning", "huspy-rebu", "huspy"]) {
            if (grandparentNameLower.includes(family)) {
              foundFamily = family.replace("huspy", "huspy-rebu")
              break
            }
          }
        }
        
        // If we found a family, combine it
        if (foundFamily) {
          const combinedName = `${foundFamily}-${tokenName}`
          // Update tokenName for rest of processing
          const category = categorizeColor(combinedName, parent, grandparent, greatGrandparent)
          if (!colors[category]) colors[category] = {}
          colors[category][combinedName] = actualColor
          colorMap.set(combinedName, { color: actualColor, tokenName: combinedName, category })
          stats.extracted++
          // Recurse children
          if (node.children) {
            for (const child of node.children) {
              traverseForColors(child, node, parent, grandparent, currentPath)
            }
          }
          return
        }
        
        // If no family found but in palette context, still skip (better to skip than have bad names)
        stats.skipped++
        const count = stats.reasons.get("no-name") || 0
        stats.reasons.set("no-name", count + 1)
        // Recurse children and return
        if (node.children) {
          for (const child of node.children) {
            traverseForColors(child, node, parent, grandparent, currentPath)
          }
        }
        return
      }
      
      // For white/black, be smarter about filtering
      const isBackgroundColor = actualColor === "#ffffff" || actualColor === "#000000"
      if (isBackgroundColor) {
        const nameLower = tokenName.toLowerCase()
        const isExplicitWhiteBlack = nameLower.includes("white") || 
                                    nameLower.includes("black") ||
                                    nameLower.match(/^(white|black)(-\d+)?$/) ||
                                    // Also allow if it's a shade (e.g., "neutral-50" could be white)
                                    /-\d+$/.test(nameLower)
        
        // Check if parent context suggests this is a real token
        // Reuse variables already declared above
        const isInTokenContext = parentName.includes("palette") ||
                                parentName.includes("color") ||
                                parentName.includes("base") ||
                                grandparentName.includes("palette") ||
                                grandparentName.includes("color") ||
                                /^(blue|red|green|yellow|purple|orange|pink|cyan|teal|indigo|gray|grey|neutral|black|white|success|error|warning)/.test(parentName)
        
        // In color context, accept white/black if we have a valid token name
        if (!isExplicitWhiteBlack && !isInTokenContext) {
          stats.skipped++
          const count = stats.reasons.get("background-color") || 0
          stats.reasons.set("background-color", count + 1)
          // Recurse children and return
          if (node.children) {
            for (const child of node.children) {
              traverseForColors(child, node, parent, grandparent, currentPath)
            }
          }
          return
        }
      }
      
      // Create unique key for duplicate detection
      const colorKey = `${tokenName}`
      
      // Check for duplicates
      const existing = colorMap.get(colorKey)
      if (existing) {
        // Prefer non-white colors, or keep existing if both are non-white
        if (actualColor !== "#ffffff" && existing.color === "#ffffff") {
          // Replace white with actual color
          const oldCategory = existing.category
          delete colors[oldCategory][tokenName]
          const category = categorizeColor(tokenName, parent, grandparent, greatGrandparent)
          if (!colors[category]) colors[category] = {}
          colors[category][tokenName] = actualColor
          colorMap.set(colorKey, { color: actualColor, tokenName, category })
          stats.extracted++
        }
        // Recurse children and return
        if (node.children) {
          for (const child of node.children) {
            traverseForColors(child, node, parent, grandparent, currentPath)
          }
        }
        return
      }
      
      // Determine category
      const category = categorizeColor(tokenName, parent, grandparent, greatGrandparent)
      
      // Store color
      if (!colors[category]) colors[category] = {}
      colors[category][tokenName] = actualColor
      colorMap.set(colorKey, { color: actualColor, tokenName, category })
      stats.extracted++
      
      // Recurse children
      if (node.children) {
        for (const child of node.children) {
          traverseForColors(child, node, parent, grandparent, currentPath)
        }
      }
    }
    
    // Recurse
    if (node.children) {
      for (const child of node.children) {
        traverseForColors(child, node, parent, grandparent, currentPath)
      }
    }
  }
  
  traverseForColors(pageNode)
  
  // Log stats for debugging
  console.log(`     📊 Color extraction stats: ${stats.extracted} extracted, ${stats.skipped} skipped (${stats.checked} checked)`)
  if (stats.reasons.size > 0 && process.env.DEBUG) {
    console.log(`     📋 Skip reasons:`, Object.fromEntries(stats.reasons))
  }
  
  // Log sample nodes for debugging
  if (process.env.DEBUG && debugNodes.length > 0) {
    console.log(`     🔍 Sample nodes found (first 20):`)
    debugNodes.slice(0, 20).forEach((n, i) => {
      console.log(`        ${i + 1}. ${n.name} (${n.type}) ${n.width}x${n.height} ${n.color} | parent: ${n.parent}`)
    })
  }
  
  return colors
}

/**
 * Extract typography from Typography section
 */
function extractTypographyFromPage(pageNode: FigmaNode): DesignTokens["typography"] {
  const typography: DesignTokens["typography"] = {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
  }
  
  const seenStyles = new Set<string>()
  
  function traverseForTypography(node: FigmaNode, parent?: FigmaNode, grandparent?: FigmaNode) {
    if (!node) return
    
    // Look for text nodes with styles
    if (node.type === "TEXT" && node.characters && node.style) {
      const style = node.style
      const tokenName = extractTokenName(node, parent, grandparent)
      
      // Skip if no meaningful name found
      if (!tokenName || tokenName === "unknown" || isGenericName(tokenName)) {
        // Try to use the text content as name if it's short and looks like a token name
        const textContent = node.characters.trim()
        if (textContent.length < 30 && /^[a-z0-9-]+$/i.test(textContent) && !isGenericName(textContent)) {
          const useName = normalizeTokenName(textContent)
          if (useName && useName !== "unknown") {
            // Use this name
          } else {
            return // Skip this node
          }
        } else {
          return // Skip this node
        }
      }
      
      // Create unique key for this style combination
      const styleKey = `${style.fontSize}-${style.fontWeight}-${style.fontFamily || ""}`
      
      if (!seenStyles.has(styleKey)) {
        seenStyles.add(styleKey)
        
        const finalTokenName = tokenName || normalizeTokenName(node.characters.trim())
        
        // Extract font family
        if (style.fontFamily && !typography.fontFamily[finalTokenName]) {
          typography.fontFamily[finalTokenName] = style.fontFamily
        }
        
        // Extract font size
        if (style.fontSize) {
          typography.fontSize[finalTokenName] = `${style.fontSize}px`
        }
        
        // Extract font weight
        if (style.fontWeight) {
          typography.fontWeight[finalTokenName] = style.fontWeight
        }
        
        // Extract line height
        if (style.lineHeight) {
          const lh = style.lineHeight
          if (lh.unit === "PIXELS") {
            typography.lineHeight[finalTokenName] = `${lh.value}px`
          } else if (lh.unit === "PERCENT") {
            typography.lineHeight[finalTokenName] = `${lh.value}%`
          } else if (lh.unit === "AUTO") {
            typography.lineHeight[finalTokenName] = "auto"
          }
        }
      }
    }
    
    // Recurse
    if (node.children) {
      for (const child of node.children) {
        traverseForTypography(child, node, parent)
      }
    }
  }
  
  traverseForTypography(pageNode)
  return typography
}

/**
 * Extract spacing and radius from Spacing & Radius section
 */
function extractSpacingAndRadiusFromPage(pageNode: FigmaNode): { spacing: Record<string, string>, radius: Record<string, string> } {
  const spacing: Record<string, string> = {}
  const radius: Record<string, string> = {}
  
  function traverseForSpacingRadius(node: FigmaNode, parent?: FigmaNode) {
    if (!node) return
    
    // Look for text nodes with spacing/radius values
    if (node.type === "TEXT" && node.characters) {
      const text = node.characters.trim()
      const tokenName = extractTokenName(node, parent)
      
      // Try to parse spacing value (e.g., "8px", "16px", "1rem")
      const spacingMatch = text.match(/^(\d+(?:\.\d+)?)\s*(px|rem|em)$/i)
      if (spacingMatch && tokenName !== "unknown") {
        const value = spacingMatch[1]
        const unit = spacingMatch[2].toLowerCase()
        spacing[tokenName] = `${value}${unit}`
      }
      
      // Try to parse radius value
      const radiusMatch = text.match(/radius[:\s]+(\d+(?:\.\d+)?)\s*(px|rem|em)?/i)
      if (radiusMatch) {
        const value = radiusMatch[1]
        const unit = (radiusMatch[2] || "px").toLowerCase()
        radius[tokenName] = `${value}${unit}`
      }
    }
    
    // Also check frame dimensions for spacing
    if ((node.type === "FRAME" || node.type === "RECTANGLE") && node.children) {
      // Look for frames with specific widths/heights that might represent spacing
      for (const child of node.children) {
        if (child.type === "TEXT" && child.characters) {
          const text = child.characters.trim()
          const match = text.match(/^(\d+)\s*(px|rem|em)?$/i)
          if (match) {
            const value = match[1]
            const unit = (match[2] || "px").toLowerCase()
            const tokenName = extractTokenName(node, parent)
            if (tokenName !== "unknown") {
              spacing[tokenName] = `${value}${unit}`
            }
          }
        }
      }
    }
    
    // Recurse
    if (node.children) {
      for (const child of node.children) {
        traverseForSpacingRadius(child, node)
      }
    }
  }
  
  traverseForSpacingRadius(pageNode)
  return { spacing, radius }
}

/**
 * Extract shadows from Elevation section
 */
function extractShadowsFromPage(pageNode: FigmaNode): Record<string, string> {
  const shadows: Record<string, string> = {}
  
  function traverseForShadows(node: FigmaNode, parent?: FigmaNode) {
    if (!node) return
    
    // Look for nodes with shadow effects
    if (node.effects && Array.isArray(node.effects)) {
      const shadowEffects = node.effects.filter(
        (e: any) => e.type === "DROP_SHADOW" || e.type === "INNER_SHADOW"
      )
      
      if (shadowEffects.length > 0) {
        const shadow = shadowEffects[0]
        if (shadow.color && shadow.offset) {
          const color = extractColor({ type: "SOLID", color: shadow.color })
          const offsetX = shadow.offset.x || 0
          const offsetY = shadow.offset.y || 0
          const blur = shadow.radius || 0
          const spread = shadow.spread || 0
          
          const tokenName = extractTokenName(node, parent)
          if (tokenName !== "unknown") {
            shadows[tokenName] = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color || "rgba(0,0,0,0.1)"}`
          }
        }
      }
    }
    
    // Recurse
    if (node.children) {
      for (const child of node.children) {
        traverseForShadows(child, node)
      }
    }
  }
  
  traverseForShadows(pageNode)
  return shadows
}

/**
 * Extract tokens from a specific page/tab
 */
function extractTokensFromPage(pageNode: FigmaNode, pageName: string, file: FigmaFile): Partial<DesignTokens> {
  const tokens: Partial<DesignTokens> = {}
  
  // Extract documentation first
  const documentation = extractPageDocumentation(pageNode)
  if (Object.keys(documentation).length > 0) {
    if (!tokens.documentation) tokens.documentation = {}
    tokens.documentation[pageName] = documentation
  }
  
  // Normalize page name for matching
  const normalizedName = pageName.toLowerCase().trim()
  
  // Extract tokens based on page type
  if (normalizedName.includes("color")) {
    console.log(`     🎨 Extracting colors...`)
    tokens.colors = extractColorsFromPage(pageNode, file)
    const colorCount = Object.values(tokens.colors).reduce((sum, cat) => sum + Object.keys(cat).length, 0)
    const primaryCount = Object.keys(tokens.colors.primary || {}).length
    const semanticCount = Object.keys(tokens.colors.semantic || {}).length
    const componentCount = Object.keys(tokens.colors.component || {}).length
    const otherCount = colorCount - primaryCount - semanticCount - componentCount
    console.log(`     ✅ Extracted ${colorCount} colors (${primaryCount} primary, ${semanticCount} semantic, ${componentCount} component, ${otherCount} other)`)
  } else if (normalizedName.includes("typography")) {
    console.log(`     📝 Extracting typography...`)
    tokens.typography = extractTypographyFromPage(pageNode)
    const typeCount = Object.keys(tokens.typography.fontSize).length
    console.log(`     ✅ Extracted ${typeCount} typography styles`)
  } else if (normalizedName.includes("spacing") || normalizedName.includes("radius")) {
    console.log(`     📏 Extracting spacing & radius...`)
    const { spacing, radius } = extractSpacingAndRadiusFromPage(pageNode)
    if (Object.keys(spacing).length > 0) {
      tokens.spacing = spacing
      console.log(`     ✅ Extracted ${Object.keys(spacing).length} spacing values`)
    }
    if (Object.keys(radius).length > 0) {
      tokens.radius = radius
      console.log(`     ✅ Extracted ${Object.keys(radius).length} radius values`)
    }
  } else if (normalizedName.includes("elevation") || normalizedName.includes("shadow")) {
    console.log(`     🌑 Extracting shadows...`)
    tokens.shadows = extractShadowsFromPage(pageNode)
    console.log(`     ✅ Extracted ${Object.keys(tokens.shadows).length} shadows`)
  }
  
  return tokens
}

/**
 * Extract tokens from Figma file
 * 
 * Now respects Figma page structure, specifically FOUNDATION section
 * 
 * @param fileId - Optional Figma file ID
 * @param sectionFilter - Optional section name to filter (e.g., "Colors", "Typography")
 */
export async function extractTokens(fileId?: string, sectionFilter?: string): Promise<DesignTokens> {
  console.log("📥 Fetching Figma file...")
  const file = await getFigmaFile(fileId)
  
  console.log(`📊 Found ${Object.keys(file.styles).length} styles`)
  console.log(`🎨 Processing styles...`)
  
  // Tab names to search for (with and without prefix)
  const allTabNames = ["Colors", "Typography", "Spacing & Radius", "Elevation", "Transitions", "Layout (Grids & Layout)", "Stack"]
  
  // Filter tabs if sectionFilter provided
  const tabNames = sectionFilter 
    ? allTabNames.filter(name => {
        const nameLower = name.toLowerCase()
        const filterLower = sectionFilter.toLowerCase()
        return nameLower === filterLower ||
               nameLower.includes(filterLower) ||
               filterLower.includes(nameLower.split(" ")[0]) ||
               nameLower.split(" ")[0] === filterLower.split(" ")[0]
      })
    : allTabNames
  
  if (sectionFilter) {
    if (tabNames.length === 0) {
      console.log(`⚠️  No matching section found for "${sectionFilter}"`)
      console.log(`💡 Available sections: ${allTabNames.join(", ")}`)
    } else {
      console.log(`🎯 Filtering for section(s): ${tabNames.join(", ")}`)
    }
  }
  
  // Find FOUNDATION page
  const foundationPage = findPageByName(file.document, "FOUNDATION")
  
  // Search for foundation tabs throughout the document
  const foundTabs: FigmaNode[] = []
  
  // Helper to normalize tab name (remove prefix like "↳")
  function normalizeTabName(name: string): string {
    return name.replace(/^[↳→▶\s]+/, "").trim()
  }
  
  // Helper to check if a name matches a tab
  function matchesTabName(nodeName: string, tabName: string): boolean {
    const normalized = normalizeTabName(nodeName).toLowerCase()
    const tabLower = tabName.toLowerCase()
    return normalized === tabLower ||
           normalized.includes(tabLower) ||
           normalized.includes(tabLower.split(" ")[0]) ||
           normalized.includes(tabLower.split("&")[0].trim())
  }
  
  // Search for tabs as top-level pages (they're siblings of FOUNDATION)
  if (file.document.children) {
    const searchMsg = sectionFilter 
      ? `🔍 Searching for "${sectionFilter}" in ${file.document.children.length} top-level pages...`
      : `🔍 Searching for tabs in ${file.document.children.length} top-level pages...`
    console.log(searchMsg)
    
    for (const topLevelPage of file.document.children) {
      if (topLevelPage.type === "CANVAS") {
        const matchesTab = tabNames.some(tabName => matchesTabName(topLevelPage.name, tabName))
        if (matchesTab) {
          const cleanName = normalizeTabName(topLevelPage.name)
          console.log(`   ✅ Found tab page: "${topLevelPage.name}" → "${cleanName}"`)
          foundTabs.push(topLevelPage)
        }
      }
    }
  }
  
  // Remove duplicates and normalize names for logging
  const uniqueTabs = Array.from(new Map(foundTabs.map(tab => [normalizeTabName(tab.name), tab])).values())
  
  // Initialize tokens structure respecting FOUNDATION tabs
  let tokens: DesignTokens = {
    colors: { primary: {}, semantic: {}, component: {} },
    typography: { fontFamily: {}, fontSize: {}, fontWeight: {}, lineHeight: {} },
    spacing: {},
    radius: {},
    shadows: undefined,
    breakpoints: defaultBreakpoints,
    documentation: {},
  }
  
  // Extract tokens from tabs if found
  if (uniqueTabs.length > 0) {
    const tabDisplayNames = uniqueTabs.map(t => normalizeTabName(t.name))
    console.log(`✅ Found ${uniqueTabs.length} foundation tabs: ${tabDisplayNames.join(", ")}`)
    
    // Extract tokens from each tab
    for (const tab of uniqueTabs) {
      const cleanTabName = normalizeTabName(tab.name)
      console.log(`  📄 Processing tab: "${cleanTabName}"`)
      const tabTokens = extractTokensFromPage(tab, cleanTabName, file)
      
      // Merge tab tokens into main tokens object (deep merge for colors)
      if (tabTokens.colors) {
        // Deep merge colors to preserve all categories
        for (const [category, colorTokens] of Object.entries(tabTokens.colors)) {
          if (!tokens.colors[category]) {
            tokens.colors[category] = {}
          }
          Object.assign(tokens.colors[category], colorTokens)
        }
      }
      if (tabTokens.typography) {
        Object.assign(tokens.typography.fontFamily, tabTokens.typography.fontFamily || {})
        Object.assign(tokens.typography.fontSize, tabTokens.typography.fontSize || {})
        Object.assign(tokens.typography.fontWeight, tabTokens.typography.fontWeight || {})
        Object.assign(tokens.typography.lineHeight, tabTokens.typography.lineHeight || {})
      }
      if (tabTokens.spacing) {
        Object.assign(tokens.spacing, tabTokens.spacing)
      }
      if (tabTokens.radius) {
        Object.assign(tokens.radius, tabTokens.radius)
      }
      if (tabTokens.shadows) {
        if (!tokens.shadows) tokens.shadows = {}
        Object.assign(tokens.shadows, tabTokens.shadows)
      }
      if (tabTokens.documentation) {
        Object.assign(tokens.documentation || {}, tabTokens.documentation)
      }
    }
    
    console.log(`📚 Extracted documentation from ${Object.keys(tokens.documentation || {}).length} tabs`)
  } else {
    console.log("⚠️  No foundation tabs found")
  }
  
  // Also extract from styles as fallback/complement
  // Try to get style values using the /styles endpoint (may include node_ids)
  console.log("🎨 Fetching style metadata...")
  try {
    const styleMetadata = await getFigmaFileStyles(fileId)
    
    const fillStyles: Record<string, FigmaStyle> = {}
    const textStyles: Record<string, FigmaStyle> = {}
    const effectStyles: Record<string, FigmaStyle> = {}
    
    // Collect node_ids from styles (if available in metadata)
    const fillStyleNodeIds: string[] = []
    const textStyleNodeIds: string[] = []
    const effectStyleNodeIds: string[] = []
    
    for (const [key, style] of Object.entries(file.styles)) {
      if (style.styleType === "FILL") {
        fillStyles[key] = style
        // Try to find node_id from style metadata
        const styleMeta = Object.values(styleMetadata).find((s: any) => s.key === key)
        if (styleMeta?.node_id) {
          fillStyleNodeIds.push(styleMeta.node_id)
        }
      } else if (style.styleType === "TEXT") {
        textStyles[key] = style
        const styleMeta = Object.values(styleMetadata).find((s: any) => s.key === key)
        if (styleMeta?.node_id) {
          textStyleNodeIds.push(styleMeta.node_id)
        }
      } else if (style.styleType === "EFFECT") {
        effectStyles[key] = style
        const styleMeta = Object.values(styleMetadata).find((s: any) => s.key === key)
        if (styleMeta?.node_id) {
          effectStyleNodeIds.push(styleMeta.node_id)
        }
      }
    }
    
    // Fetch actual style values using node_ids (if available)
    const fills: Record<string, any> = {}
    const textStyleData: Record<string, any> = {}
    const effects: Record<string, any[]> = {}
    
    if (fillStyleNodeIds.length > 0) {
      console.log(`  📥 Fetching ${fillStyleNodeIds.length} fill style values from node_ids...`)
      const styleNodes = await getFigmaStyleValues(fileId, fillStyleNodeIds)
      
      // Extract fill values from nodes
      for (const [nodeId, nodeData] of Object.entries(styleNodes)) {
        const node = nodeData?.document
        if (node?.fills && Array.isArray(node.fills)) {
          for (const fill of node.fills) {
            if (fill.type === "SOLID") {
              // Find the style key that matches this node_id
              const styleKey = Object.keys(fillStyles).find(key => {
                const styleMeta = Object.values(styleMetadata).find((s: any) => s.key === key)
                return styleMeta?.node_id === nodeId
              })
              if (styleKey) {
                fills[styleKey] = fill
              }
            }
          }
        }
      }
    }
    
    if (textStyleNodeIds.length > 0) {
      console.log(`  📥 Fetching ${textStyleNodeIds.length} text style values from node_ids...`)
      const styleNodes = await getFigmaStyleValues(fileId, textStyleNodeIds)
      
      // Extract text style values from nodes
      for (const [nodeId, nodeData] of Object.entries(styleNodes)) {
        const node = nodeData?.document
        if (node?.style) {
          const styleKey = Object.keys(textStyles).find(key => {
            const styleMeta = Object.values(styleMetadata).find((s: any) => s.key === key)
            return styleMeta?.node_id === nodeId
          })
          if (styleKey) {
            textStyleData[styleKey] = node.style
          }
        }
      }
    }
    
    if (effectStyleNodeIds.length > 0) {
      console.log(`  📥 Fetching ${effectStyleNodeIds.length} effect style values from node_ids...`)
      const styleNodes = await getFigmaStyleValues(fileId, effectStyleNodeIds)
      
      // Extract effect values from nodes
      for (const [nodeId, nodeData] of Object.entries(styleNodes)) {
        const node = nodeData?.document
        if (node?.effects && Array.isArray(node.effects)) {
          const styleKey = Object.keys(effectStyles).find(key => {
            const styleMeta = Object.values(styleMetadata).find((s: any) => s.key === key)
            return styleMeta?.node_id === nodeId
          })
          if (styleKey) {
            effects[styleKey] = node.effects
          }
        }
      }
    }
    
    // Map styles to tokens and merge with page-based tokens
    const styleColors = mapFillStyles(fillStyles, fills)
    const styleTypography = mapTextStyles(textStyles, textStyleData)
    const styleShadows = mapEffectStyles(effectStyles, effects)

    // Merge style-based tokens (deep merge to preserve page-extracted colors)
    const styleColorCount = Object.values(styleColors).reduce((sum, cat) => sum + Object.keys(cat).length, 0)
    if (styleColorCount > 0) {
      console.log(`     🎨 Also found ${styleColorCount} colors from Figma styles`)
      for (const [category, colorTokens] of Object.entries(styleColors)) {
        if (Object.keys(colorTokens).length > 0) {
          if (!tokens.colors[category]) {
            tokens.colors[category] = {}
          }
          // Merge non-conflicting tokens (page-extracted take precedence)
          for (const [tokenName, colorValue] of Object.entries(colorTokens)) {
            // Only add if not already present or if style color is more specific (not white)
            if (!tokens.colors[category][tokenName] || 
                (tokens.colors[category][tokenName] === "#ffffff" && colorValue !== "#ffffff")) {
              tokens.colors[category][tokenName] = colorValue
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not fetch style values: ${error instanceof Error ? error.message : String(error)}`)
    console.warn(`   Continuing with page-based extraction only...`)
  }
  
  // Use defaults if empty
  if (Object.keys(tokens.spacing).length === 0) {
    tokens.spacing = defaultSpacing
  }
  if (Object.keys(tokens.radius).length === 0) {
    tokens.radius = defaultRadius
  }

  // Ensure colors object has at least primary and semantic
  if (!tokens.colors.primary) tokens.colors.primary = {}
  if (!tokens.colors.semantic) tokens.colors.semantic = {}

  // Validate with Zod
  console.log("✅ Validating tokens structure...")
  try {
    const validated = designTokensSchema.parse(tokens)
    
    console.log(`✅ Extracted ${Object.keys(colors.primary).length + Object.keys(colors.semantic).length} colors`)
    console.log(`✅ Extracted ${Object.keys(typography.fontSize).length} typography styles`)
    if (validated.shadows) {
      console.log(`✅ Extracted ${Object.keys(validated.shadows).length} shadows`)
    }

    return validated
  } catch (error) {
    console.warn("⚠️  Validation warning:", error instanceof Error ? error.message : String(error))
    console.log("📝 Returning tokens without strict validation")
    return tokens
  }
}

/**
 * Save tokens to JSON file
 */
export async function saveTokens(tokens: DesignTokens, outputPath: string): Promise<void> {
  const fullPath = resolve(process.cwd(), outputPath)
  writeFileSync(fullPath, JSON.stringify(tokens, null, 2), "utf-8")
  console.log(`💾 Saved tokens to ${fullPath}`)
}
