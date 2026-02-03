/**
 * Script to convert Design Token Manager export to vistral-tokens.json format
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Types
interface TokenValue {
  $type: string
  $value: string | number | object
}

interface NestedTokens {
  [key: string]: TokenValue | NestedTokens
}

// Read files
const tokensDir = path.join(__dirname, '../figma-tokens-export')
const primitives = JSON.parse(fs.readFileSync(path.join(tokensDir, '1. Primitives.Light.tokens.json'), 'utf-8'))
const semantic = JSON.parse(fs.readFileSync(path.join(tokensDir, '2. Semantic.Light.tokens.json'), 'utf-8'))
const components = JSON.parse(fs.readFileSync(path.join(tokensDir, '3. Components .Light.tokens.json'), 'utf-8'))
const textStyles = JSON.parse(fs.readFileSync(path.join(tokensDir, 'text.styles.tokens.json'), 'utf-8'))
const effectStyles = JSON.parse(fs.readFileSync(path.join(tokensDir, 'effect.styles.tokens.json'), 'utf-8'))

// Helper to extract $value from token
function getValue(token: any): string {
  if (!token) return ''
  if (typeof token === 'string') return token
  if (token.$value !== undefined) {
    // Handle references like "{primitives.color.spaceblue.600}"
    if (typeof token.$value === 'string' && token.$value.startsWith('{')) {
      return resolveReference(token.$value)
    }
    return String(token.$value)
  }
  return ''
}

// Resolve token references
function resolveReference(ref: string): string {
  // Remove { and }
  const path = ref.slice(1, -1).split('.')
  
  let current: any = null
  
  // Determine source
  if (path[0] === 'primitives') {
    current = primitives.primitives
    path.shift()
  } else if (path[0] === 'color') {
    current = semantic.color
    path.shift()
  } else if (path[0] === 'components') {
    current = components.components
    path.shift()
  } else if (path[0] === 'radius') {
    current = semantic.radius
    path.shift()
  } else if (path[0] === 'text') {
    current = semantic.text
    path.shift()
  } else {
    current = primitives.primitives
  }
  
  // Navigate path
  for (const key of path) {
    if (current && current[key] !== undefined) {
      current = current[key]
    } else {
      return ref // Return original if can't resolve
    }
  }
  
  return getValue(current)
}

// Convert primitives colors to flat format
function convertColors() {
  const primary: Record<string, string> = {}
  const colorData = primitives.primitives.color
  
  // Color families to process
  const families = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 
                    'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 
                    'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
  
  for (const family of families) {
    if (colorData[family]) {
      for (const [shade, token] of Object.entries(colorData[family] as NestedTokens)) {
        primary[`${family}-${shade}`] = getValue(token)
      }
    }
  }
  
  // Semantic colors from semantic file
  const semanticColors: Record<string, string> = {}
  
  // Neutral from primitives
  if (colorData.neutral) {
    for (const [shade, token] of Object.entries(colorData.neutral as NestedTokens)) {
      semanticColors[`neutral-${shade}`] = getValue(token)
    }
  }
  
  // Success/Warning/Error/Info from semantic
  const semColor = semantic.color
  if (semColor?.bg) {
    if (semColor.bg.success) semanticColors['success-bg'] = getValue(semColor.bg.success)
    if (semColor.bg['success-alt']) semanticColors['success-bg-alt'] = getValue(semColor.bg['success-alt'])
    if (semColor.bg.warning) semanticColors['warning-bg'] = getValue(semColor.bg.warning)
    if (semColor.bg['warning-alt']) semanticColors['warning-bg-alt'] = getValue(semColor.bg['warning-alt'])
    if (semColor.bg.error) semanticColors['error-bg'] = getValue(semColor.bg.error)
    if (semColor.bg['error-alt']) semanticColors['error-bg-alt'] = getValue(semColor.bg['error-alt'])
    if (semColor.bg.primary) semanticColors['bg-primary'] = getValue(semColor.bg.primary)
    if (semColor.bg['primary-alt']) semanticColors['bg-primary-alt'] = getValue(semColor.bg['primary-alt'])
    if (semColor.bg.page) semanticColors['bg-page'] = getValue(semColor.bg.page)
    if (semColor.bg.card) semanticColors['bg-card'] = getValue(semColor.bg.card)
    if (semColor.bg.disabled) semanticColors['bg-disabled'] = getValue(semColor.bg.disabled)
  }
  if (semColor?.fg) {
    if (semColor.fg.success) semanticColors['success-fg'] = getValue(semColor.fg.success)
    if (semColor.fg.warning) semanticColors['warning-fg'] = getValue(semColor.fg.warning)
    if (semColor.fg.error) semanticColors['error-fg'] = getValue(semColor.fg.error)
    if (semColor.fg.info) semanticColors['info-fg'] = getValue(semColor.fg.info)
    if (semColor.fg.primary) semanticColors['fg-primary'] = getValue(semColor.fg.primary)
    if (semColor.fg.secondary) semanticColors['fg-secondary'] = getValue(semColor.fg.secondary)
    if (semColor.fg.tertiary) semanticColors['fg-tertiary'] = getValue(semColor.fg.tertiary)
    if (semColor.fg.disabled) semanticColors['fg-disabled'] = getValue(semColor.fg.disabled)
    if (semColor.fg.brand) semanticColors['fg-brand'] = getValue(semColor.fg.brand)
    if (semColor.fg['brand-hover']) semanticColors['fg-brand-hover'] = getValue(semColor.fg['brand-hover'])
  }
  if (semColor?.border) {
    if (semColor.border.default) semanticColors['border-default'] = getValue(semColor.border.default)
    if (semColor.border.elevated) semanticColors['border-elevated'] = getValue(semColor.border.elevated)
    if (semColor.border.focus) semanticColors['border-focus'] = getValue(semColor.border.focus)
    if (semColor.border.brand) semanticColors['border-brand'] = getValue(semColor.border.brand)
    if (semColor.border.error) semanticColors['border-error'] = getValue(semColor.border.error)
    if (semColor.border.success) semanticColors['border-success'] = getValue(semColor.border.success)
    if (semColor.border.warning) semanticColors['border-warning'] = getValue(semColor.border.warning)
  }
  
  // Component colors
  const componentColors: Record<string, string> = {}
  
  // Brand (spaceblue)
  if (colorData.spaceblue) {
    for (const [shade, token] of Object.entries(colorData.spaceblue as NestedTokens)) {
      componentColors[`brand-${shade}`] = getValue(token)
    }
  }
  
  // Vistral gray (black scale)
  if (colorData.black) {
    for (const [shade, token] of Object.entries(colorData.black as NestedTokens)) {
      componentColors[`vistral-gray-${shade}`] = getValue(token)
    }
  }
  
  // Alpha colors
  if (colorData.alpha) {
    if (colorData.alpha.white) {
      for (const [opacity, token] of Object.entries(colorData.alpha.white as NestedTokens)) {
        componentColors[`white-alpha-${opacity}`] = getValue(token)
      }
    }
    if (colorData.alpha.black) {
      for (const [opacity, token] of Object.entries(colorData.alpha.black as NestedTokens)) {
        componentColors[`black-alpha-${opacity}`] = getValue(token)
      }
    }
  }
  
  // Base colors
  if (colorData.base) {
    componentColors['base-black'] = getValue(colorData.base.black)
    componentColors['base-white'] = getValue(colorData.base.white)
    componentColors['base-overlay'] = getValue(colorData.base.overlay)
  }
  
  // Button component colors
  const btnComp = components.components?.button
  if (btnComp) {
    if (btnComp.primary) {
      componentColors['button-primary-bg'] = getValue(btnComp.primary['bg-default'])
      componentColors['button-primary-bg-hover'] = getValue(btnComp.primary['bg-hover'])
      componentColors['button-primary-bg-active'] = getValue(btnComp.primary['bg-active'])
      componentColors['button-primary-fg'] = getValue(btnComp.primary.fg)
    }
    if (btnComp.secondary) {
      componentColors['button-secondary-bg'] = getValue(btnComp.secondary['bg-default'])
      componentColors['button-secondary-bg-hover'] = getValue(btnComp.secondary['bg-hover'])
      componentColors['button-secondary-fg'] = getValue(btnComp.secondary.fg)
    }
    if (btnComp.destructive) {
      componentColors['button-destructive-bg'] = getValue(btnComp.destructive['bg-default'])
      componentColors['button-destructive-bg-hover'] = getValue(btnComp.destructive['bg-hover'])
      componentColors['button-destructive-fg'] = getValue(btnComp.destructive.fg)
    }
  }
  
  // Alert colors
  const alertComp = components.components?.alert
  if (alertComp) {
    componentColors['alert-success-bg'] = getValue(alertComp['success-bg'])
    componentColors['alert-success-fg'] = getValue(alertComp['success-fg'])
    componentColors['alert-success-border'] = getValue(alertComp['success-border'])
    componentColors['alert-error-bg'] = getValue(alertComp['error-bg'])
    componentColors['alert-error-fg'] = getValue(alertComp['error-fg'])
    componentColors['alert-error-border'] = getValue(alertComp['error-border'])
    componentColors['alert-warning-bg'] = getValue(alertComp['warning-bg'])
    componentColors['alert-warning-fg'] = getValue(alertComp['warning-fg'])
    componentColors['alert-warning-border'] = getValue(alertComp['warning-border'])
    componentColors['alert-info-bg'] = getValue(alertComp['info-bg'])
    componentColors['alert-info-fg'] = getValue(alertComp['info-fg'])
    componentColors['alert-info-border'] = getValue(alertComp['info-border'])
  }
  
  // Input colors
  const inputComp = components.components?.input
  if (inputComp) {
    componentColors['input-bg'] = getValue(inputComp.bg)
    componentColors['input-border'] = getValue(inputComp.border)
    componentColors['input-border-focus'] = getValue(inputComp['border-focus'])
    componentColors['input-border-error'] = getValue(inputComp['border-error'])
    componentColors['input-fg'] = getValue(inputComp.fg)
    componentColors['input-fg-placeholder'] = getValue(inputComp['fg-placeholder'])
  }
  
  return { primary, semantic: semanticColors, component: componentColors }
}

// Convert typography
function convertTypography() {
  const fontData = primitives.primitives.font
  
  // Base typography properties
  // Figma 9-step scale: 12, 14, 16, 18, 20, 24, 30, 36, 48
  const base = {
    fontFamily: {
      sans: getValue(fontData['font-family']['font-sans']) || 'Inter',
      mono: 'monospace'
    },
    // 9-step scale from Figma
    fontSize: {
      '1': '12px',   // step 1
      '2': '14px',   // step 2
      '3': '16px',   // step 3
      '4': '18px',   // step 4
      '5': '20px',   // step 5
      '6': '24px',   // step 6
      '7': '30px',   // step 7
      '8': '36px',   // step 8
      '9': '48px',   // step 9
      // Semantic aliases
      'sm': '12px',        // Text-sm = step 1
      'md': '14px',        // Text-md = step 2
      'lg': '16px',        // Text-lg = step 3
      'header-sm': '18px', // Header-sm = step 4
      'header-md': '20px', // Header-md = step 5
      'header-lg': '24px', // Header-lg = step 6
      'header-xl': '30px', // Header-xl = step 7
      'header-2xl': '36px',// Header-2xl = step 8
      'header-3xl': '48px',// Header-3xl = step 9
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {} as Record<string, string>,
    letterSpacing: {} as Record<string, string>,
  }
  
  // Extract text styles with full details
  const textStyles: Record<string, any> = {}
  
  // Process text styles from textStyles file
  for (const [styleName, variants] of Object.entries(textStyles as NestedTokens)) {
    if (typeof variants === 'object' && !variants.$type) {
      for (const [weight, style] of Object.entries(variants as NestedTokens)) {
        if (style && typeof style === 'object' && (style as any).$value) {
          const styleValue = (style as any).$value
          const key = `${styleName.toLowerCase()}-${weight.toLowerCase()}`
          
          // Get line height
          if (styleValue.lineHeight) {
            base.lineHeight[styleName.toLowerCase()] = styleValue.lineHeight
          }
          
          // Get letter spacing
          if (styleValue.letterSpacing) {
            base.letterSpacing[styleName.toLowerCase()] = styleValue.letterSpacing
          }
          
          // Store full text style
          textStyles[key] = {
            fontFamily: getValue(fontData['font-family']['font-sans']),
            fontSize: resolveFontSize(styleValue.fontSize),
            fontWeight: styleValue.fontWeight,
            lineHeight: styleValue.lineHeight,
            letterSpacing: styleValue.letterSpacing,
          }
        }
      }
    }
  }
  
  // Line heights matching Figma 9-step scale
  base.lineHeight = {
    '1': '16px',   // step 1 (12px font)
    '2': '20px',   // step 2 (14px font)
    '3': '24px',   // step 3 (16px font)
    '4': '26px',   // step 4 (18px font)
    '5': '28px',   // step 5 (20px font)
    '6': '32px',   // step 6 (24px font)
    '7': '38px',   // step 7 (30px font)
    '8': '44px',   // step 8 (36px font)
    '9': '58px',   // step 9 (48px font)
    // Semantic aliases
    'sm': '16px',
    'md': '20px',
    'lg': '24px',
    'header-sm': '26px',
    'header-md': '28px',
    'header-lg': '32px',
    'header-xl': '38px',
    'header-2xl': '44px',
    'header-3xl': '58px',
  }
  
  // Letter spacing matching Figma 9-step scale
  base.letterSpacing = {
    '1': '-0.2px',  // step 1
    '2': '-0.5px',  // step 2
    '3': '-0.7px',  // step 3
    '4': '-1px',    // step 4
    '5': '-1.2px',  // step 5
    '6': '-1.5px',  // step 6
    '7': '-2px',    // step 7
    '8': '-2px',    // step 8
    '9': '-3px',    // step 9
    // Semantic aliases
    'sm': '-0.2px',
    'md': '-0.5px',
    'lg': '-0.7px',
    'header-sm': '-1px',
    'header-md': '-1.2px',
    'header-lg': '-1.5px',
    'header-xl': '-2px',
    'header-2xl': '-2px',
    'header-3xl': '-3px',
  }
  
  return {
    ...base,
    textStyles: convertTextStyles()
  }
}

// Resolve font size from reference
function resolveFontSize(ref: string): string {
  if (!ref) return '16px'
  if (!ref.startsWith('{')) return ref
  
  // Map text.base-sizes references
  const baseSizeMap: Record<string, string> = {
    '1': '10px',  // Text-xs
    '2': '12px',  // Text-sm
    '3': '14px',  // Text-md
    '4': '16px',  // Text-lg
    '5': '18px',  // Header-sm
    '6': '20px',  // Header-md
    '7': '24px',  // Header-lg
    '8': '32px',  // Header-xl
    '9': '36px',  // Header-2xl
    '10': '48px', // Header-3xl
  }
  
  const match = ref.match(/base-sizes\.(\d+)/)
  if (match && baseSizeMap[match[1]]) {
    return baseSizeMap[match[1]]
  }
  
  return '16px'
}

// Convert text styles to structured format
// Based on Figma 9-step scale: 12, 14, 16, 18, 20, 24, 30, 36, 48
function convertTextStyles() {
  const styles: Record<string, any> = {}
  
  // Headers (steps 5-9 in Figma scale)
  // Header-3xl = step 9 = 48px
  // Header-2xl = step 8 = 36px
  // Header-xl = step 7 = 30px
  // Header-lg = step 6 = 24px
  // Header-md = step 5 = 20px
  // Header-sm = step 4 = 18px
  const headers = ['Header-3xl', 'Header-2xl', 'Header-xl', 'Header-lg', 'Header-md', 'Header-sm']
  const headerSizes = ['48px', '36px', '30px', '24px', '20px', '18px']
  const headerLineHeights = ['58px', '44px', '38px', '32px', '28px', '26px']
  const headerLetterSpacing = ['-3px', '-2px', '-2px', '-1.5px', '-1.2px', '-1px']
  
  headers.forEach((header, i) => {
    const key = header.toLowerCase()
    const weights = ['regular', 'medium', 'semibold']
    const weightValues = [400, 500, 600]
    
    weights.forEach((weight, wi) => {
      styles[`${key}-${weight}`] = {
        fontFamily: 'Inter',
        fontSize: headerSizes[i],
        fontWeight: weightValues[wi],
        lineHeight: headerLineHeights[i],
        letterSpacing: headerLetterSpacing[i],
      }
    })
  })
  
  // Text styles (steps 1-4 in Figma scale)
  // Text-lg = step 3 = 16px
  // Text-md = step 2 = 14px
  // Text-sm = step 1 = 12px
  const texts = ['Text-lg', 'Text-md', 'Text-sm']
  const textSizes = ['16px', '14px', '12px']
  const textLineHeights = ['24px', '20px', '16px']
  const textLetterSpacing = ['-0.7px', '-0.5px', '-0.2px']
  
  texts.forEach((text, i) => {
    const key = text.toLowerCase()
    const weights = ['regular', 'medium', 'semibold']
    const weightValues = [400, 500, 600]
    
    weights.forEach((weight, wi) => {
      styles[`${key}-${weight}`] = {
        fontFamily: 'Inter',
        fontSize: textSizes[i],
        fontWeight: weightValues[wi],
        lineHeight: textLineHeights[i],
        letterSpacing: textLetterSpacing[i],
      }
    })
  })
  
  return styles
}

// Convert spacing
function convertSpacing() {
  const spacingData = primitives.primitives.spacing
  const result: Record<string, string> = {}
  
  for (const [key, token] of Object.entries(spacingData as NestedTokens)) {
    result[key] = getValue(token)
  }
  
  return result
}

// Convert radius
function convertRadius() {
  const radiusData = primitives.primitives.radius
  const result: Record<string, string> = {}
  
  for (const [key, token] of Object.entries(radiusData as NestedTokens)) {
    result[key] = getValue(token)
  }
  
  return result
}

// Convert layout
function convertLayout() {
  const layoutData = primitives.primitives.layout
  const result: Record<string, string> = {}
  
  for (const [key, token] of Object.entries(layoutData as NestedTokens)) {
    result[key] = getValue(token)
  }
  
  return result
}

// Convert blur/elevation
function convertElevation() {
  const blurData = primitives.primitives.blur
  const result: Record<string, string> = {}
  
  for (const [key, token] of Object.entries(blurData as NestedTokens)) {
    result[`blur-${key}`] = getValue(token)
  }
  
  return result
}

// Convert border widths
function convertBorderWidth() {
  const borderData = primitives.primitives['border-w']
  const result: Record<string, string> = {}
  
  for (const [key, token] of Object.entries(borderData as NestedTokens)) {
    result[key] = getValue(token)
  }
  
  return result
}

// Build final tokens
const finalTokens = {
  colors: convertColors(),
  typography: convertTypography(),
  spacing: convertSpacing(),
  radius: convertRadius(),
  shadows: {
    // Focus ring
    'focus': '0px 0px 0px 2px rgba(0, 0, 0, 0.32)',
    'focus-button': '0px 0px 0px 2px rgba(0, 0, 0, 0.32)',
    // Elevation shadows (from Figma)
    'level-1': '0px 0px 16px 0px rgba(0, 0, 0, 0.06)',
    'level-2': '0px 0px 16px 0px rgba(0, 0, 0, 0.10)',
    'level-3': '0px 0px 24px 0px rgba(0, 0, 0, 0.16)',
    'level-4': '0px 0px 32px 0px rgba(0, 0, 0, 0.20)',
  },
  // Background blur (backdrop-filter)
  blur: {
    '1': '8px',
    '2': '12px',
    '3': '16px',
    '4': '24px',
    '5': '32px',
    '6': '40px',
    '7': '56px',
    '8': '64px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  elevation: convertElevation(),
  layout: convertLayout(),
  borderWidth: convertBorderWidth(),
  transitions: {
    duration: {
      instant: '0ms',
      fast: '100ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  stack: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
}

// Write output
const outputPath = path.join(__dirname, '../src/tokens/vistral-tokens.json')
fs.writeFileSync(outputPath, JSON.stringify(finalTokens, null, 2))

console.log('✅ Tokens converted successfully!')
console.log(`   Output: ${outputPath}`)
console.log(`   Colors: ${Object.keys(finalTokens.colors.primary).length} primary, ${Object.keys(finalTokens.colors.semantic).length} semantic, ${Object.keys(finalTokens.colors.component).length} component`)
console.log(`   Spacing: ${Object.keys(finalTokens.spacing).length} values`)
console.log(`   Radius: ${Object.keys(finalTokens.radius).length} values`)
