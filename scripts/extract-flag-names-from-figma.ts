/**
 * Extract flag names from Figma
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
}

interface FlagInfo {
  name: string
  code: string
  nodeId: string
}

/**
 * Recursively find nodes
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

/**
 * Clean flag name to code
 */
function toCode(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Clean flag name to display name
 */
function toDisplayName(name: string): string {
  return name
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

async function main() {
  console.log('🏳️ Extracting flag names from Figma...\n')

  try {
    const figmaFile = await getFigmaFile()
    console.log(`📄 File: ${figmaFile.name}\n`)

    const document = figmaFile.document as FigmaNode

    // Find flag-related frames
    const flagNodes = findNodes(document, node => {
      const nameLower = node.name.toLowerCase()
      return (
        (node.type === 'COMPONENT' || node.type === 'INSTANCE' || node.type === 'FRAME') &&
        (nameLower.includes('flag') ||
          nameLower.includes('country') ||
          // Common country names
          nameLower.includes('united states') ||
          nameLower.includes('united kingdom') ||
          nameLower.includes('germany') ||
          nameLower.includes('france') ||
          nameLower.includes('spain') ||
          nameLower.includes('italy') ||
          nameLower.includes('japan') ||
          nameLower.includes('china') ||
          nameLower.includes('brazil') ||
          nameLower.includes('mexico') ||
          nameLower.includes('canada') ||
          nameLower.includes('australia'))
      )
    })

    console.log(`Found ${flagNodes.length} potential flag nodes\n`)

    // Also search for component sets with flags
    const componentSets = findNodes(
      document,
      node => node.type === 'COMPONENT_SET' && node.name.toLowerCase().includes('flag')
    )

    const flags: FlagInfo[] = []
    const seenCodes = new Set<string>()

    // Process component sets
    for (const componentSet of componentSets) {
      console.log(`🎨 Component set: ${componentSet.name}`)

      if (componentSet.children) {
        for (const child of componentSet.children) {
          if (child.type === 'COMPONENT') {
            // Parse variant name like "Type=united states"
            const match =
              child.name.match(/type=([^,]+)/i) ||
              child.name.match(/country=([^,]+)/i) ||
              child.name.match(/name=([^,]+)/i)

            if (match) {
              const name = match[1].trim()
              const code = toCode(name)

              if (code && !seenCodes.has(code)) {
                seenCodes.add(code)
                flags.push({
                  name: toDisplayName(name),
                  code,
                  nodeId: child.id,
                })
                console.log(`   ✅ ${name}`)
              }
            } else {
              // Try to get name from node name
              const cleanName = child.name
                .replace(/^(flag|country|type)[=:\s]*/i, '')
                .replace(/,.*$/, '')
                .trim()

              if (cleanName && cleanName.length > 1) {
                const code = toCode(cleanName)
                if (!seenCodes.has(code)) {
                  seenCodes.add(code)
                  flags.push({
                    name: toDisplayName(cleanName),
                    code,
                    nodeId: child.id,
                  })
                  console.log(`   ✅ ${cleanName}`)
                }
              }
            }
          }
        }
      }
    }

    // Process individual flag nodes
    for (const node of flagNodes) {
      if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
        const cleanName = node.name
          .replace(/^(flag|country)[=:\s-]*/i, '')
          .replace(/\s*\d+$/, '')
          .trim()

        if (cleanName && cleanName.length > 2) {
          const code = toCode(cleanName)
          if (!seenCodes.has(code)) {
            seenCodes.add(code)
            flags.push({
              name: toDisplayName(cleanName),
              code,
              nodeId: node.id,
            })
          }
        }
      }
    }

    // Sort alphabetically
    flags.sort((a, b) => a.name.localeCompare(b.name))

    console.log(`\n✅ Found ${flags.length} unique flags\n`)

    // Save to file
    const outputPath = path.join(__dirname, '../public/assets/flags/flag-names-from-figma.json')
    fs.writeFileSync(
      outputPath,
      JSON.stringify(
        {
          extractedAt: new Date().toISOString(),
          total: flags.length,
          flags,
        },
        null,
        2
      )
    )

    console.log(`💾 Saved to: ${outputPath}`)

    // Print sample
    console.log('\nSample flags:')
    flags.slice(0, 20).forEach(f => console.log(`  ${f.code}: ${f.name}`))
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error))
  }
}

main()
