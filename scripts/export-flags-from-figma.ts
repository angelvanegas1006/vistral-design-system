/**
 * Export flags directly from Figma with correct names
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { figmaConfig, FIGMA_API_BASE, getFigmaHeaders } from '../lib/figma-sync/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/assets/flags/countries')
const FIGMA_DATA_PATH = path.join(__dirname, '../public/assets/flags/flag-names-from-figma.json')

interface FlagInfo {
  name: string
  code: string
  nodeId: string
}

interface FigmaExportResponse {
  err: string | null
  images: Record<string, string>
}

/**
 * Export images from Figma
 */
async function exportFromFigma(nodeIds: string[]): Promise<Record<string, string>> {
  const url = `${FIGMA_API_BASE}/images/${figmaConfig.fileId}?ids=${nodeIds.join(',')}&format=svg`

  const response = await fetch(url, {
    headers: getFigmaHeaders(),
  })

  if (!response.ok) {
    throw new Error(`Figma export failed: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as FigmaExportResponse

  if (data.err) {
    throw new Error(`Figma export error: ${data.err}`)
  }

  return data.images
}

/**
 * Download SVG content from URL
 */
async function downloadSvg(url: string): Promise<string> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download SVG: ${response.status}`)
  }

  return await response.text()
}

async function main() {
  console.log('🏳️ Exporting flags from Figma...\n')

  // Read Figma data
  if (!fs.existsSync(FIGMA_DATA_PATH)) {
    console.error('❌ Flag names not found. Run extract-flag-names-from-figma.ts first.')
    return
  }

  const figmaData = JSON.parse(fs.readFileSync(FIGMA_DATA_PATH, 'utf-8'))
  const flags = figmaData.flags as FlagInfo[]

  console.log(`📦 Found ${flags.length} flags to export\n`)

  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    const files = fs.readdirSync(OUTPUT_DIR)
    for (const file of files) {
      if (file.endsWith('.svg') || file === 'index.json') {
        fs.unlinkSync(path.join(OUTPUT_DIR, file))
      }
    }
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Export in batches
  const BATCH_SIZE = 50
  const exportedFlags: { code: string; name: string; file: string }[] = []

  for (let i = 0; i < flags.length; i += BATCH_SIZE) {
    const batch = flags.slice(i, i + BATCH_SIZE)
    const nodeIds = batch.map(flag => flag.nodeId)

    console.log(
      `🔄 Exporting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(flags.length / BATCH_SIZE)}...`
    )

    try {
      const exportUrls = await exportFromFigma(nodeIds)

      for (const flag of batch) {
        const exportUrl = exportUrls[flag.nodeId]

        if (!exportUrl) {
          console.warn(`   ⚠️ No export URL for ${flag.code}`)
          continue
        }

        try {
          const svgContent = await downloadSvg(exportUrl)

          const fileName = `${flag.code}.svg`
          const filePath = path.join(OUTPUT_DIR, fileName)

          fs.writeFileSync(filePath, svgContent)

          exportedFlags.push({
            code: flag.code,
            name: flag.name,
            file: fileName,
          })

          console.log(`   ✅ ${flag.code}`)
        } catch (downloadError) {
          console.warn(`   ⚠️ Failed to download ${flag.code}`)
        }
      }

      // Rate limit delay
      if (i + BATCH_SIZE < flags.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error(
        `   ❌ Batch export failed:`,
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  // Sort alphabetically
  exportedFlags.sort((a, b) => a.name.localeCompare(b.name))

  // Save index
  const indexPath = path.join(OUTPUT_DIR, 'index.json')
  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        total: exportedFlags.length,
        flags: exportedFlags,
      },
      null,
      2
    )
  )

  console.log(`\n✅ Exported ${exportedFlags.length} flags`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)
  console.log(`📋 Index: ${indexPath}`)
}

main().catch(console.error)
