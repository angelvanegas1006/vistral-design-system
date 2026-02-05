/**
 * Export Icons and Flags from Figma as SVG
 *
 * This script fetches icon and flag components from Figma and exports them as SVG files.
 *
 * Usage: npx tsx scripts/export-icons.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') })

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || 'i0plqavJ8VqpKeqr6TkLtD'
const FIGMA_API_BASE = 'https://api.figma.com/v1'

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_TOKEN is required in .env.local')
  process.exit(1)
}

const ICONS_OUTPUT_DIR = resolve(__dirname, '../public/assets/icons')
const FLAGS_OUTPUT_DIR = resolve(__dirname, '../public/assets/flags')

interface FigmaNode {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
}

/**
 * Fetch from Figma API with authentication
 */
async function figmaFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${FIGMA_API_BASE}${endpoint}`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN!,
    },
  })

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Find all nodes matching a pattern in their name
 */
function findNodesByName(node: FigmaNode, pattern: RegExp, results: FigmaNode[] = []): FigmaNode[] {
  if (pattern.test(node.name.toLowerCase())) {
    results.push(node)
  }

  if (node.children) {
    for (const child of node.children) {
      findNodesByName(child, pattern, results)
    }
  }

  return results
}

/**
 * Find all nodes of specific types (COMPONENT, COMPONENT_SET)
 */
function findComponentNodes(node: FigmaNode, results: FigmaNode[] = []): FigmaNode[] {
  if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
    results.push(node)
  }

  if (node.children) {
    for (const child of node.children) {
      findComponentNodes(child, results)
    }
  }

  return results
}

/**
 * Export nodes as SVG
 */
async function exportNodesAsSvg(nodeIds: string[]): Promise<Record<string, string>> {
  if (nodeIds.length === 0) return {}

  const idsParam = nodeIds.join(',')
  const data = await figmaFetch<{ images: Record<string, string> }>(
    `/images/${FIGMA_FILE_ID}?ids=${idsParam}&format=svg`
  )

  return data.images || {}
}

/**
 * Download SVG content from URL
 */
async function downloadSvg(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download SVG: ${response.status}`)
  }
  return response.text()
}

/**
 * Sanitize filename
 */
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Check if node is likely an icon based on name patterns
 */
function isIconNode(name: string): boolean {
  const iconPatterns = [
    /^icon/i,
    /icon$/i,
    /-icon-/i,
    /\/icon\//i,
    /^ic[-_]/i,
    /lucide/i,
    /heroicon/i,
    /feather/i,
  ]
  return iconPatterns.some(p => p.test(name))
}

/**
 * Check if node is likely a flag based on name patterns
 */
function isFlagNode(name: string): boolean {
  const flagPatterns = [
    /^flag/i,
    /flag$/i,
    /-flag-/i,
    /\/flag\//i,
    /country/i,
    /^[a-z]{2}$/i, // Two-letter country codes
  ]
  return flagPatterns.some(p => p.test(name))
}

async function main() {
  console.log('🎨 Exploring Figma for Icons and Flags...')

  // Create output directories
  for (const dir of [ICONS_OUTPUT_DIR, FLAGS_OUTPUT_DIR]) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  }

  try {
    // 1. Fetch Figma file structure
    console.log('\n📥 Fetching Figma file structure...')
    const fileData = await figmaFetch<{ document: FigmaNode }>(`/files/${FIGMA_FILE_ID}`)

    // 2. Find all components
    console.log('🔍 Searching for icon and flag components...')
    const allComponents = findComponentNodes(fileData.document)

    console.log(`   Found ${allComponents.length} total components`)

    // 3. Filter icons and flags
    const iconNodes = allComponents.filter(n => isIconNode(n.name))
    const flagNodes = allComponents.filter(n => isFlagNode(n.name))

    console.log(`\n📊 Results:`)
    console.log(`   Icons: ${iconNodes.length}`)
    console.log(`   Flags: ${flagNodes.length}`)

    // 4. Show sample of found icons
    if (iconNodes.length > 0) {
      console.log(`\n🎯 Sample icons found:`)
      iconNodes.slice(0, 20).forEach(node => {
        console.log(`   - ${node.name} (${node.type}, id: ${node.id})`)
      })
      if (iconNodes.length > 20) {
        console.log(`   ... and ${iconNodes.length - 20} more`)
      }
    }

    // 5. Show sample of found flags
    if (flagNodes.length > 0) {
      console.log(`\n🏳️ Sample flags found:`)
      flagNodes.slice(0, 10).forEach(node => {
        console.log(`   - ${node.name} (${node.type}, id: ${node.id})`)
      })
      if (flagNodes.length > 10) {
        console.log(`   ... and ${flagNodes.length - 10} more`)
      }
    }

    // 6. Also search for explicit "Icons" or "Flags" pages/frames
    const iconPagePattern = /icon|icono/i
    const flagPagePattern = /flag|bandera|country|país/i

    const iconPages = findNodesByName(fileData.document, iconPagePattern)
    const flagPages = findNodesByName(fileData.document, flagPagePattern)

    console.log(`\n📄 Pages/Frames with 'icon' in name: ${iconPages.length}`)
    iconPages.slice(0, 10).forEach(node => {
      console.log(`   - ${node.name} (${node.type})`)
    })

    console.log(`\n📄 Pages/Frames with 'flag' in name: ${flagPages.length}`)
    flagPages.slice(0, 10).forEach(node => {
      console.log(`   - ${node.name} (${node.type})`)
    })

    // 7. Export icons if found
    if (iconNodes.length > 0) {
      console.log(`\n📤 Exporting ${Math.min(iconNodes.length, 100)} icons as SVG...`)

      const nodesToExport = iconNodes.slice(0, 100) // Limit to 100 for now
      const batchSize = 10
      let exported = 0
      const exportedNames = new Set<string>()

      for (let i = 0; i < nodesToExport.length; i += batchSize) {
        const batch = nodesToExport.slice(i, i + batchSize)
        const nodeIds = batch.map(n => n.id)

        try {
          const imageUrls = await exportNodesAsSvg(nodeIds)

          for (const node of batch) {
            const url = imageUrls[node.id]
            if (!url) continue

            try {
              const svgContent = await downloadSvg(url)
              let filename = sanitizeFilename(node.name)

              // Ensure unique filename
              if (exportedNames.has(filename)) {
                filename = `${filename}-${node.id.replace(/[^a-z0-9]/gi, '-')}`
              }
              exportedNames.add(filename)

              const filepath = resolve(ICONS_OUTPUT_DIR, `${filename}.svg`)
              writeFileSync(filepath, svgContent)
              console.log(`   ✅ ${filename}.svg`)
              exported++
            } catch (err) {
              console.log(`   ❌ Failed: ${node.name}`)
            }
          }

          // Rate limit
          if (i + batchSize < nodesToExport.length) {
            await new Promise(r => setTimeout(r, 1000))
          }
        } catch (err) {
          console.log(`   ❌ Batch failed: ${err}`)
        }
      }

      console.log(`\n✅ Exported ${exported} icons to ${ICONS_OUTPUT_DIR}`)
    }

    // 8. Export flags if found
    if (flagNodes.length > 0) {
      console.log(`\n📤 Exporting ${flagNodes.length} flags as SVG...`)

      const batchSize = 10
      let exported = 0
      const exportedNames = new Set<string>()

      for (let i = 0; i < flagNodes.length; i += batchSize) {
        const batch = flagNodes.slice(i, i + batchSize)
        const nodeIds = batch.map(n => n.id)

        try {
          const imageUrls = await exportNodesAsSvg(nodeIds)

          for (const node of batch) {
            const url = imageUrls[node.id]
            if (!url) continue

            try {
              const svgContent = await downloadSvg(url)
              let filename = sanitizeFilename(node.name)

              if (exportedNames.has(filename)) {
                filename = `${filename}-${node.id.replace(/[^a-z0-9]/gi, '-')}`
              }
              exportedNames.add(filename)

              const filepath = resolve(FLAGS_OUTPUT_DIR, `${filename}.svg`)
              writeFileSync(filepath, svgContent)
              console.log(`   ✅ ${filename}.svg`)
              exported++
            } catch (err) {
              console.log(`   ❌ Failed: ${node.name}`)
            }
          }

          if (i + batchSize < flagNodes.length) {
            await new Promise(r => setTimeout(r, 1000))
          }
        } catch (err) {
          console.log(`   ❌ Batch failed: ${err}`)
        }
      }

      console.log(`\n✅ Exported ${exported} flags to ${FLAGS_OUTPUT_DIR}`)
    }

    if (iconNodes.length === 0 && flagNodes.length === 0) {
      console.log(`\n⚠️  No icons or flags found with standard naming patterns.`)
      console.log(`   Try providing the PNG images and tokens instead.`)
    }
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  }
}

main()
