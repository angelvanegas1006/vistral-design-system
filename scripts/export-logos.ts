/**
 * Export Logos from Figma as SVG
 * 
 * This script fetches logo components from Figma and exports them as SVG files.
 * 
 * Usage: npx tsx scripts/export-logos.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { config } from "dotenv"

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
config({ path: resolve(__dirname, "../.env.local") })

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || "i0plqavJ8VqpKeqr6TkLtD"
const FIGMA_API_BASE = "https://api.figma.com/v1"

if (!FIGMA_TOKEN) {
  console.error("❌ FIGMA_TOKEN is required in .env.local")
  process.exit(1)
}

const OUTPUT_DIR = resolve(__dirname, "../public/assets/logos")

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
      "X-Figma-Token": FIGMA_TOKEN!,
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
 * Export nodes as SVG
 */
async function exportNodesAsSvg(nodeIds: string[]): Promise<Record<string, string>> {
  if (nodeIds.length === 0) return {}

  const idsParam = nodeIds.join(",")
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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

async function main() {
  console.log("🎨 Exporting logos from Figma...")
  console.log(`📁 Output directory: ${OUTPUT_DIR}`)

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  try {
    // 1. Fetch Figma file structure
    console.log("\n📥 Fetching Figma file structure...")
    const fileData = await figmaFetch<{ document: FigmaNode }>(`/files/${FIGMA_FILE_ID}`)

    // 2. Find logo-related nodes
    console.log("🔍 Searching for logo components...")
    const logoPattern = /logo|logomark|logotype|prophero|vistral/i
    const logoNodes = findNodesByName(fileData.document, logoPattern)

    console.log(`   Found ${logoNodes.length} potential logo nodes:`)
    logoNodes.forEach((node) => {
      console.log(`   - ${node.name} (${node.type}, id: ${node.id})`)
    })

    if (logoNodes.length === 0) {
      console.log("\n⚠️  No logo nodes found. Try searching manually in Figma.")
      return
    }

    // 3. Filter to only COMPONENT and COMPONENT_SET types (or FRAME for grouped logos)
    const exportableNodes = logoNodes.filter(
      (node) => ["COMPONENT", "COMPONENT_SET", "FRAME", "GROUP", "INSTANCE"].includes(node.type)
    )

    if (exportableNodes.length === 0) {
      console.log("\n⚠️  No exportable logo components found.")
      return
    }

    console.log(`\n📤 Exporting ${exportableNodes.length} logo components as SVG...`)

    // 4. Export as SVG (batch by 10 to avoid rate limits)
    const batchSize = 10
    let exported = 0

    for (let i = 0; i < exportableNodes.length; i += batchSize) {
      const batch = exportableNodes.slice(i, i + batchSize)
      const nodeIds = batch.map((n) => n.id)

      try {
        const imageUrls = await exportNodesAsSvg(nodeIds)

        // Download and save each SVG
        for (const node of batch) {
          const url = imageUrls[node.id]
          if (!url) {
            console.log(`   ⚠️  No image URL for ${node.name}`)
            continue
          }

          try {
            const svgContent = await downloadSvg(url)
            const filename = `${sanitizeFilename(node.name)}.svg`
            const filepath = resolve(OUTPUT_DIR, filename)

            writeFileSync(filepath, svgContent)
            console.log(`   ✅ ${filename}`)
            exported++
          } catch (err) {
            console.log(`   ❌ Failed to download ${node.name}: ${err}`)
          }
        }

        // Rate limit delay between batches
        if (i + batchSize < exportableNodes.length) {
          await new Promise((r) => setTimeout(r, 1000))
        }
      } catch (err) {
        console.log(`   ❌ Batch export failed: ${err}`)
      }
    }

    console.log(`\n✅ Exported ${exported} logo files to ${OUTPUT_DIR}`)

  } catch (error) {
    console.error("\n❌ Error:", error)
    process.exit(1)
  }
}

main()
