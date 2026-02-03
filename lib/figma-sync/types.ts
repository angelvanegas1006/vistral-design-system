/**
 * Type definitions for Figma API responses
 * 
 * These types match the Figma REST API specification
 * See: https://www.figma.com/developers/api
 */

export interface FigmaFile {
  document: FigmaNode
  components: Record<string, FigmaComponent>
  componentSets: Record<string, FigmaComponentSet>
  styles: Record<string, FigmaStyle>
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  role: string
  editorType: string
  linkAccess: string
}

export interface FigmaNode {
  id: string
  name: string
  type: string
  visible?: boolean
  children?: FigmaNode[]
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  effects?: FigmaEffect[]
  characters?: string
  style?: FigmaTextStyle
  componentPropertyDefinitions?: Record<string, FigmaComponentPropertyDefinition>
}

export interface FigmaComponent {
  key: string
  name: string
  description: string
  componentSetId?: string
  documentationLinks: FigmaDocumentationLink[]
}

export interface FigmaComponentSet {
  key: string
  name: string
  description: string
  documentationLinks: FigmaDocumentationLink[]
}

export interface FigmaStyle {
  key: string
  name: string
  styleType: "FILL" | "TEXT" | "EFFECT" | "GRID"
  description?: string
  node_id?: string // Node ID to fetch actual style values
}

export interface FigmaFill {
  type: "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND" | "IMAGE" | "VIDEO"
  color?: FigmaColor
  opacity?: number
  gradientStops?: FigmaColorStop[]
}

export interface FigmaColor {
  r: number
  g: number
  b: number
  a?: number
}

export interface FigmaColorStop {
  position: number
  color: FigmaColor
}

export interface FigmaStroke {
  type: "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND"
  color?: FigmaColor
  opacity?: number
}

export interface FigmaEffect {
  type: "INNER_SHADOW" | "DROP_SHADOW" | "LAYER_BLUR" | "BACKGROUND_BLUR"
  visible: boolean
  radius: number
  color?: FigmaColor
  offset?: { x: number; y: number }
  spread?: number
}

export interface FigmaTextStyle {
  fontFamily: string
  fontPostScriptName?: string
  paragraphSpacing?: number
  paragraphIndent?: number
  italic?: boolean
  fontWeight: number
  fontSize: number
  textCase?: "UPPER" | "LOWER" | "TITLE" | "SMALL_CAPS" | "SMALL_CAPS_FORCED"
  textDecoration?: "UNDERLINE" | "STRIKETHROUGH"
  letterSpacing?: { value: number; unit: "PIXELS" | "PERCENT" }
  lineHeight?: { value: number; unit: "PIXELS" | "PERCENT" | "AUTO" }
  textAlignHorizontal?: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"
  textAlignVertical?: "TOP" | "CENTER" | "BOTTOM"
}

export interface FigmaComponentPropertyDefinition {
  type: "BOOLEAN" | "TEXT" | "INSTANCE_SWAP" | "VARIANT"
  defaultValue?: boolean | string
  variantOptions?: string[]
}

export interface FigmaDocumentationLink {
  uri: string
}

/**
 * Documentation content from Figma pages
 */
export interface PageDocumentation {
  description?: string
  content?: string
  usage?: string
  anatomy?: string
  bestPractices?: {
    dos?: string[]
    donts?: string[]
  }
  [key: string]: any // Allow additional sections
}

/**
 * Design tokens structure (output format)
 */
export interface DesignTokens {
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
  elevation?: Record<string, string>
  transitions?: {
    duration: Record<string, string>
    easing: Record<string, string>
  }
  layout?: {
    padding?: Record<string, string>
    spacing?: Record<string, string>
    sidebar?: Record<string, string>
    container?: Record<string, string>
    views?: Record<string, { name: string; description: string }>
    mobile?: Record<string, string>
  }
  grid?: Record<string, {
    name: string
    widthRange: string
    columns: number
    margin: string
    gutter: string
    behavior: string
    alignment?: string
  }>
  stack?: Record<string, string>
  documentation?: Record<string, PageDocumentation> // Documentation by tab/page name
}
