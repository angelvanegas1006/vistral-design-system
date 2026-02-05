#!/usr/bin/env tsx
/**
 * Bundle Analysis Script
 *
 * Analyzes the bundle size of the design system package
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface BundleStats {
  name: string
  size: number
  gzipped?: number
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

function analyzeBundle(): void {
  const distPath = resolve(__dirname, '../dist')

  try {
    // Check if dist exists
    const fs = require('fs')
    if (!fs.existsSync(distPath)) {
      console.error('❌ dist/ directory not found. Run npm run build first.')
      process.exit(1)
    }

    // Read bundle files
    const files = ['index.js', 'index.mjs', 'index.d.ts']
    const stats: BundleStats[] = []

    for (const file of files) {
      const filePath = resolve(distPath, file)
      if (fs.existsSync(filePath)) {
        const content = readFileSync(filePath)
        const size = content.length

        stats.push({
          name: file,
          size,
        })

        console.log(`📦 ${file}: ${formatBytes(size)}`)
      }
    }

    // Calculate totals
    const totalSize = stats.reduce((sum, stat) => sum + stat.size, 0)
    console.log(`\n📊 Total bundle size: ${formatBytes(totalSize)}`)

    // Write stats to file
    const statsPath = resolve(__dirname, '../bundle-stats.json')
    writeFileSync(
      statsPath,
      JSON.stringify({ stats, totalSize, timestamp: new Date().toISOString() }, null, 2)
    )
    console.log(`\n✅ Bundle stats written to bundle-stats.json`)

    // Warn if bundle is too large
    const maxSize = 500 * 1024 // 500KB
    if (totalSize > maxSize) {
      console.warn(`\n⚠️  Warning: Bundle size exceeds ${formatBytes(maxSize)}`)
      console.warn('   Consider code splitting or tree-shaking optimizations')
    }
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error)
    process.exit(1)
  }
}

analyzeBundle()
