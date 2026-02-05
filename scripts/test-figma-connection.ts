#!/usr/bin/env tsx
/**
 * Test Figma API Connection
 *
 * Validates that the Figma API credentials are correct
 * and the file is accessible.
 */

import { testFigmaConnection, getFigmaFile } from '../lib/figma-sync/client'
import { figmaConfig } from '../lib/figma-sync/config'

async function main() {
  console.log('🔍 Testing Figma API connection...')
  console.log(`📁 File ID: ${figmaConfig.fileId}`)
  console.log(`🔑 Token: ${figmaConfig.token.substring(0, 10)}...`)

  try {
    const isConnected = await testFigmaConnection()

    if (!isConnected) {
      console.error('❌ Connection test failed')
      process.exit(1)
    }

    console.log('✅ Connection successful!')

    // Get file info
    const file = await getFigmaFile()
    console.log(`\n📄 File: ${file.name}`)
    console.log(`🕒 Last modified: ${file.lastModified}`)
    console.log(`📊 Components: ${Object.keys(file.components).length}`)
    console.log(`🎨 Styles: ${Object.keys(file.styles).length}`)

    console.log('\n✅ All checks passed!')
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

main()
