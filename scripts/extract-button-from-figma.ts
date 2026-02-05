/**
 * Extract Button component design from Figma
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { getFigmaFile } from '../lib/figma-sync/client.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface FigmaNode {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
  fills?: any[]
  strokes?: any[]
  effects?: any[]
  cornerRadius?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
  itemSpacing?: number
  absoluteBoundingBox?: {
    x: number
    y: number
    width: number
    height: number
  }
  style?: any
  characters?: string
  componentPropertyDefinitions?: Record<string, any>
}

interface ButtonVariant {
  name: string
  nodeId: string
  properties: Record<string, string>
  styles: {
    fills?: any[]
    strokes?: any[]
    cornerRadius?: number
    padding?: { top: number; right: number; bottom: number; left: number }
    width?: number
    height?: number
  }
}

/**
 * Parse variant properties from node name
 * e.g., "Variant=Primary, Size=Md, State=Default" => { variant: 'Primary', size: 'Md', state: 'Default' }
 */
function parseVariantProperties(name: string): Record<string, string> {
  const props: Record<string, string> = {}

  // Handle comma-separated properties
  const parts = name.split(/,\s*/)
  for (const part of parts) {
    const [key, value] = part.split('=').map(s => s.trim())
    if (key && value) {
      props[key.toLowerCase()] = value
    }
  }

  return props
}

/**
 * Extract style info from a node
 */
function extractStyles(node: FigmaNode) {
  return {
    fills: node.fills,
    strokes: node.strokes,
    effects: node.effects,
    cornerRadius: node.cornerRadius,
    padding:
      node.paddingTop !== undefined
        ? {
            top: node.paddingTop || 0,
            right: node.paddingRight || 0,
            bottom: node.paddingBottom || 0,
            left: node.paddingLeft || 0,
          }
        : undefined,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
  }
}

/**
 * Find nodes by predicate
 */
function findNodes(
  node: FigmaNode,
  predicate: (node: FigmaNode) => boolean,
  results: FigmaNode[] = []
): FigmaNode[] {
  if (predicate(node)) {
    results.push(node)
  }
  if (node.children) {
    for (const child of node.children) {
      findNodes(child, predicate, results)
    }
  }
  return results
}

async function main() {
  console.log('🔘 Extracting Button component from Figma...\n')

  try {
    const figmaFile = await getFigmaFile()
    console.log(`📄 File: ${figmaFile.name}\n`)

    const document = figmaFile.document as FigmaNode

    // Find Button component sets
    const buttonComponentSets = findNodes(
      document,
      node =>
        node.type === 'COMPONENT_SET' &&
        node.name.toLowerCase().includes('button') &&
        !node.name.toLowerCase().includes('radio') &&
        !node.name.toLowerCase().includes('toggle')
    )

    console.log(`Found ${buttonComponentSets.length} Button component sets:\n`)

    const allVariants: ButtonVariant[] = []
    const componentInfo: any[] = []

    for (const componentSet of buttonComponentSets) {
      console.log(`\n🎨 Component Set: ${componentSet.name}`)
      console.log(`   ID: ${componentSet.id}`)

      // Get component property definitions
      if (componentSet.componentPropertyDefinitions) {
        console.log('\n   Properties:')
        for (const [key, def] of Object.entries(componentSet.componentPropertyDefinitions)) {
          const propDef = def as any
          console.log(`   - ${key}: ${propDef.type}`)
          if (propDef.variantOptions) {
            console.log(`     Options: ${propDef.variantOptions.join(', ')}`)
          }
        }
      }

      // Get variants (child components)
      if (componentSet.children) {
        const variants = componentSet.children.filter(c => c.type === 'COMPONENT')
        console.log(`\n   Variants (${variants.length}):`)

        for (const variant of variants.slice(0, 20)) {
          // Limit to first 20
          const props = parseVariantProperties(variant.name)
          const styles = extractStyles(variant)

          allVariants.push({
            name: variant.name,
            nodeId: variant.id,
            properties: props,
            styles,
          })

          console.log(`   - ${variant.name}`)
        }

        if (variants.length > 20) {
          console.log(`   ... and ${variants.length - 20} more`)
        }
      }

      componentInfo.push({
        name: componentSet.name,
        id: componentSet.id,
        propertyDefinitions: componentSet.componentPropertyDefinitions,
        variantCount: componentSet.children?.length || 0,
      })
    }

    // Also find individual Button components (not in sets)
    const buttonComponents = findNodes(
      document,
      node => node.type === 'COMPONENT' && node.name.toLowerCase() === 'button'
    )

    if (buttonComponents.length > 0) {
      console.log(`\n📦 Individual Button components: ${buttonComponents.length}`)
      for (const btn of buttonComponents) {
        console.log(`   - ${btn.name} (${btn.id})`)
      }
    }

    // Analyze unique properties
    const propertyValues: Record<string, Set<string>> = {}
    for (const variant of allVariants) {
      for (const [key, value] of Object.entries(variant.properties)) {
        if (!propertyValues[key]) {
          propertyValues[key] = new Set()
        }
        propertyValues[key].add(value)
      }
    }

    console.log('\n📊 Unique property values:')
    for (const [key, values] of Object.entries(propertyValues)) {
      console.log(`   ${key}: ${Array.from(values).join(', ')}`)
    }

    // Save to file
    const outputPath = path.join(__dirname, '../src/components/ui/button-figma-spec.json')
    fs.writeFileSync(
      outputPath,
      JSON.stringify(
        {
          extractedAt: new Date().toISOString(),
          componentSets: componentInfo,
          variants: allVariants.slice(0, 100), // Limit output
          propertyValues: Object.fromEntries(
            Object.entries(propertyValues).map(([k, v]) => [k, Array.from(v)])
          ),
        },
        null,
        2
      )
    )

    console.log(`\n💾 Saved spec to: ${outputPath}`)
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
  }
}

main()
