/**
 * Extract Components from Figma
 *
 * Reads components from Figma API and extracts their properties
 */

import { getFigmaFile, getFigmaFileNodes } from './client'
import type { FigmaFile, FigmaComponent, FigmaNode } from './types'

export interface ComponentInfo {
  key: string
  name: string
  description: string
  variants?: Record<string, string[]>
  properties?: Record<string, any>
  nodeId?: string
}

/**
 * Filter components to sync (exclude variants and internal components)
 */
function shouldSyncComponent(component: FigmaComponent, name: string): boolean {
  // Skip components that are variants (usually have "=" in name like "Variant=Value")
  // But allow if it's a main component name (like "Button" even if it has "Button=Primary")
  const isVariant = name.includes('=') && !/^[A-Z][a-zA-Z]+=/.test(name)
  if (isVariant) return false

  // Skip components with very generic names that are likely internal
  const skipPatterns = [
    /^type=/i,
    /^subtext=/i,
    /^Size=/i,
    /^Tone=/i,
    /^Theme=/i,
    /^arrow-/i,
    /^Design-note/i,
    /^Color-base/i,
    /^Footer=/i,
    /^Logomark/i,
  ]

  if (skipPatterns.some(pattern => pattern.test(name))) return false

  // Prioritize main components (usually have descriptive names without special prefixes)
  // Common component names: Button, Input, Card, etc.
  const mainComponentPatterns = [
    /^Button/i,
    /^Input/i,
    /^Card/i,
    /^Modal/i,
    /^Dialog/i,
    /^Select/i,
    /^Checkbox/i,
    /^Radio/i,
    /^Switch/i,
    /^Badge/i,
    /^Avatar/i,
    /^Tooltip/i,
    /^Popover/i,
    /^Dropdown/i,
    /^Menu/i,
    /^Tabs/i,
    /^Accordion/i,
  ]

  // If it matches a main component pattern, include it
  if (mainComponentPatterns.some(pattern => pattern.test(name))) return true

  // Otherwise, include if it doesn't look like an internal/variant component
  return !name.includes('=') && name.length > 2
}

/**
 * Parse variant properties from component name
 * Example: "Variant=Primary, Type=Button, State=Default, Size=lg"
 * Returns: { variant: ["Primary"], type: ["Button"], state: ["Default"], size: ["lg"] }
 */
function parseVariantProperties(name: string): Record<string, string[]> {
  const properties: Record<string, string[]> = {}

  // Split by comma and parse key=value pairs
  const parts = name.split(',').map(p => p.trim())

  for (const part of parts) {
    const match = part.match(/^([^=]+)=(.+)$/)
    if (match) {
      const [, key, value] = match
      const propKey = key.trim().toLowerCase()
      const propValue = value.trim()

      if (!properties[propKey]) {
        properties[propKey] = []
      }
      if (!properties[propKey].includes(propValue)) {
        properties[propKey].push(propValue)
      }
    }
  }

  return properties
}

/**
 * Group components by Component Set or main component name
 */
function groupComponentsBySet(
  components: Array<[string, FigmaComponent]>,
  componentSets: Record<string, FigmaComponentSet>
): Map<string, Array<[string, FigmaComponent]>> {
  const groups = new Map<string, Array<[string, FigmaComponent]>>()

  for (const [key, component] of components) {
    let groupKey: string

    // If component belongs to a Component Set, use the Component Set name
    if (component.componentSetId && componentSets[component.componentSetId]) {
      groupKey = componentSets[component.componentSetId].name
    } else {
      // Otherwise, extract main component name (before first = or /)
      const mainName = component.name.split(/[=,]/)[0].split('/')[0].trim()
      groupKey = mainName || component.name
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, [])
    }
    groups.get(groupKey)!.push([key, component])
  }

  return groups
}

/**
 * Extract component information from Figma file
 *
 * @param fileId - Figma file ID
 * @param filter - Optional filter function to select which components to sync
 */
export async function extractComponents(
  fileId?: string,
  filter?: (component: FigmaComponent, name: string) => boolean
): Promise<ComponentInfo[]> {
  console.log('📥 Fetching Figma file for components...')
  const file = await getFigmaFile(fileId)

  const allComponents = Object.entries(file.components)
  const componentSets = file.componentSets || {}
  console.log(
    `📊 Found ${allComponents.length} total components, ${Object.keys(componentSets).length} component sets`
  )

  // Filter components if filter function provided, otherwise use default
  let componentsToProcess: Array<[string, FigmaComponent]>

  if (filter) {
    // When custom filter is provided, prioritize Component Sets
    // First, find matching component sets
    const matchingComponentSets = Object.entries(componentSets)
      .filter(([key, componentSet]) => filter(componentSet as any, componentSet.name))
      .map(([key, cs]) => ({ key, name: cs.name }))

    console.log(`🎯 Found ${matchingComponentSets.length} matching component sets`)

    // Find components matching the filter OR belonging to matching component sets
    let matchingComponents = allComponents.filter(([key, component]) => {
      const nameMatch = filter(component, component.name)
      const belongsToMatchingSet =
        component.componentSetId &&
        matchingComponentSets.some(cs => cs.key === component.componentSetId)
      return nameMatch || belongsToMatchingSet
    })

    // Group by Component Set or main name
    const grouped = groupComponentsBySet(matchingComponents, componentSets)

    // If we have Component Sets, prioritize them and include all their variants
    if (matchingComponentSets.length > 0) {
      const setComponents: Array<[string, FigmaComponent]> = []

      for (const { key: setKey, name: setName } of matchingComponentSets) {
        // Get all components belonging to this Component Set
        const setVariants = matchingComponents.filter(([_, c]) => c.componentSetId === setKey)
        setComponents.push(...setVariants)

        console.log(`   ✓ Component Set "${setName}": ${setVariants.length} variants`)
      }

      // Limit total variants to avoid rate limits (max 20 per Component Set)
      if (setComponents.length > 20) {
        console.log(`⚠️  Limiting to first 20 variants from Component Sets`)
        matchingComponents = setComponents.slice(0, 20)
      } else {
        matchingComponents = setComponents
      }
    } else {
      // No Component Sets found, use individual components with limit
      if (matchingComponents.length > 10) {
        console.log(`⚠️  Too many matches (${matchingComponents.length}). Limiting to first 10`)
        matchingComponents = matchingComponents.slice(0, 10)
      }
    }

    // Debug: show matching component names
    if (matchingComponents.length > 0) {
      const matchedNames = matchingComponents.slice(0, 10).map(([_, c]) => c.name)
      console.log(
        `🔍 Found ${matchingComponents.length} matching components: ${matchedNames.join(', ')}${matchingComponents.length > 10 ? '...' : ''}`
      )
    } else {
      // Show sample of component names to help debug
      const sampleNames = allComponents.slice(0, 20).map(([_, c]) => c.name)
      console.log(`🔍 No matches found. Sample component names: ${sampleNames.join(', ')}`)
    }

    componentsToProcess = matchingComponents
  } else {
    // Use default filter that excludes variants
    componentsToProcess = allComponents.filter(([key, component]) =>
      shouldSyncComponent(component, component.name)
    )
  }

  console.log(`🎨 Processing ${componentsToProcess.length} filtered components...`)
  console.log(
    `⏭️  Skipping ${allComponents.length - componentsToProcess.length} components (variants/internal)`
  )

  // Group components by Component Set for unified generation
  const grouped = groupComponentsBySet(componentsToProcess, componentSets)
  const unifiedComponents: ComponentInfo[] = []
  const nodeIdsToFetch: string[] = []
  const nodeIdToComponentKey: Map<string, string> = new Map()

  // Process each group (Component Set or individual component)
  for (const [groupName, groupComponents] of grouped.entries()) {
    // If this is a Component Set with multiple variants, create unified component
    if (groupComponents.length > 1) {
      // Find the Component Set
      const firstComponent = groupComponents[0][1]
      const componentSet = firstComponent.componentSetId
        ? componentSets[firstComponent.componentSetId]
        : null

      // Collect all variant properties from component names
      const allVariantProperties: Record<string, Set<string>> = {}

      for (const [_, component] of groupComponents) {
        const props = parseVariantProperties(component.name)
        for (const [key, values] of Object.entries(props)) {
          if (!allVariantProperties[key]) {
            allVariantProperties[key] = new Set()
          }
          values.forEach(v => allVariantProperties[key].add(v))
        }
      }

      // Convert Sets to Arrays
      const variants: Record<string, string[]> = {}
      for (const [key, values] of Object.entries(allVariantProperties)) {
        variants[key] = Array.from(values).sort()
      }

      // Create unified component info
      const unifiedComponent: ComponentInfo = {
        key: componentSet?.key || groupComponents[0][0],
        name: groupName, // Use Component Set name or main component name
        description: componentSet?.description || firstComponent.description || '',
        variants,
        properties: {},
      }

      // Find node ID for the Component Set or first component
      const nodeId = componentSet
        ? findComponentNode(file.document, componentSet.key)
        : findComponentNode(file.document, groupComponents[0][0])

      if (nodeId) {
        unifiedComponent.nodeId = nodeId
        nodeIdsToFetch.push(nodeId)
        nodeIdToComponentKey.set(nodeId, unifiedComponent.key)
      }

      unifiedComponents.push(unifiedComponent)
      console.log(
        `   📦 Grouped "${groupName}": ${groupComponents.length} variants → unified component`
      )
    } else {
      // Single component, process normally
      const [key, component] = groupComponents[0]
      const componentInfo: ComponentInfo = {
        key,
        name: component.name,
        description: component.description || '',
      }

      const nodeId = findComponentNode(file.document, key)
      if (nodeId) {
        componentInfo.nodeId = nodeId
        nodeIdsToFetch.push(nodeId)
        nodeIdToComponentKey.set(nodeId, key)
      }

      unifiedComponents.push(componentInfo)
    }
  }

  // Fetch nodes in batches
  if (nodeIdsToFetch.length > 0) {
    console.log(`📦 Fetching ${nodeIdsToFetch.length} component nodes in batches...`)
    const nodes = await getFigmaFileNodes(fileId, nodeIdsToFetch, 10) // Batch size of 10

    // Extract properties from fetched nodes
    for (const componentInfo of unifiedComponents) {
      if (componentInfo.nodeId) {
        const node = nodes[componentInfo.nodeId]?.document

        if (node) {
          // Extract component properties
          componentInfo.properties = extractComponentProperties(node)

          // If variants weren't extracted from names, try to extract from Component Set
          if (!componentInfo.variants || Object.keys(componentInfo.variants).length === 0) {
            const component = file.components[componentInfo.key]
            if (component?.componentSetId) {
              const componentSet = componentSets[component.componentSetId]
              if (componentSet) {
                // Extract variants from Component Set node
                componentInfo.variants = extractVariantsFromSet(
                  node,
                  file.components,
                  componentSet.key
                )
              }
            }
          }
        }
      }
    }
  }

  console.log(`✅ Extracted ${unifiedComponents.length} components`)
  return unifiedComponents
}

/**
 * Find component node ID in document tree
 */
function findComponentNode(node: FigmaNode, componentKey: string): string | null {
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    // Check if this is the component we're looking for
    // Note: We'd need to match by component key, which isn't directly available
    // This is a simplified implementation
    return node.id
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findComponentNode(child, componentKey)
      if (found) return found
    }
  }

  return null
}

/**
 * Extract component properties from node
 */
function extractComponentProperties(node: FigmaNode): Record<string, any> {
  const properties: Record<string, any> = {}

  if (node.componentPropertyDefinitions) {
    for (const [key, prop] of Object.entries(node.componentPropertyDefinitions)) {
      properties[key] = {
        type: prop.type,
        defaultValue: prop.defaultValue,
        variantOptions: prop.variantOptions,
      }
    }
  }

  return properties
}

/**
 * Extract variants from component set node
 */
function extractVariantsFromSet(
  node: FigmaNode,
  components: Record<string, FigmaComponent>,
  componentSetKey: string
): Record<string, string[]> {
  const variants: Record<string, string[]> = {}

  // Extract variant properties from componentPropertyDefinitions
  if (node.componentPropertyDefinitions) {
    for (const [key, prop] of Object.entries(node.componentPropertyDefinitions)) {
      if (prop.type === 'VARIANT' && prop.variantOptions) {
        const propName = key.toLowerCase()
        variants[propName] = prop.variantOptions
      }
    }
  }

  // Also extract from component names in the set
  const setComponents = Object.values(components).filter(c => c.componentSetId === componentSetKey)
  for (const component of setComponents) {
    const props = parseVariantProperties(component.name)
    for (const [key, values] of Object.entries(props)) {
      if (!variants[key]) {
        variants[key] = []
      }
      for (const value of values) {
        if (!variants[key].includes(value)) {
          variants[key].push(value)
        }
      }
    }
  }

  // Sort variant options
  for (const key in variants) {
    variants[key] = variants[key].sort()
  }

  return variants
}

/**
 * Convert Figma component name to React component name
 */
export function toComponentName(figmaName: string): string {
  // Remove special characters and convert to PascalCase
  return figmaName
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

/**
 * Convert Figma property name to React prop name
 */
export function toPropName(figmaName: string): string {
  // Convert to camelCase
  return figmaName
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}
