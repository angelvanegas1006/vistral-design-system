#!/usr/bin/env tsx
/**
 * Figma Sync CLI
 *
 * Synchronizes tokens and components from Figma
 * Usage:
 *   npm run figma:sync:tokens      # Sync only tokens
 *   npm run figma:sync:components  # Sync only components
 *   npm run figma:sync:all        # Sync everything
 */

import { resolve } from 'path'
import { extractTokens, saveTokens } from '../lib/figma-sync/extract-tokens'
import { figmaConfig } from '../lib/figma-sync/config'

const command = process.argv[2] || 'all'

async function syncTokens() {
  const sectionFilter = process.argv[3] // Optional: filter by section name

  console.log('🔄 Syncing tokens from Figma...')
  console.log(`📁 File ID: ${figmaConfig.fileId}`)
  if (sectionFilter) {
    console.log(`🎯 Filtering for section: "${sectionFilter}"\n`)
  } else {
    console.log('📋 Syncing all FOUNDATION sections\n')
  }

  try {
    const tokens = await extractTokens(undefined, sectionFilter)
    await saveTokens(tokens, 'src/tokens/vistral-tokens.json')
    console.log('\n✅ Token sync completed successfully!')

    if (tokens.documentation) {
      const sections = Object.keys(tokens.documentation)
      console.log(
        `📚 Documentation extracted from ${sections.length} sections: ${sections.join(', ')}`
      )
    }
  } catch (error) {
    console.error('\n❌ Token sync failed:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

async function listComponents() {
  console.log('📋 Listing available components from Figma...')
  console.log(`📁 File ID: ${figmaConfig.fileId}\n`)

  try {
    const { getFigmaFile } = await import('../lib/figma-sync/client')
    const file = await getFigmaFile()

    const searchTerm = process.argv[4]?.toLowerCase()

    // Get component sets (main components)
    const componentSets = Object.values(file.componentSets || {})
      .map(cs => cs.name)
      .sort()
      .filter((name, index, arr) => arr.indexOf(name) === index)

    // Get all component names
    const allComponentNames = Object.values(file.components)
      .map(c => c.name)
      .sort()
      .filter((name, index, arr) => arr.indexOf(name) === index)

    // Extract main component names (before first = or /)
    const mainComponentNames = new Set<string>()
    for (const name of allComponentNames) {
      const mainName = name.split(/[=,]/)[0].split('/')[0].trim()
      if (mainName && mainName.length > 1) {
        mainComponentNames.add(mainName)
      }
    }

    // Combine component sets and main component names
    const allMainComponents = Array.from(
      new Set([...componentSets, ...Array.from(mainComponentNames)])
    ).sort()

    // Filter if search term provided
    const filtered = searchTerm
      ? allMainComponents.filter(name => name.toLowerCase().includes(searchTerm))
      : allMainComponents.slice(0, 100) // Limit to first 100 by default

    console.log(
      `📊 Found ${filtered.length} main components${searchTerm ? ` matching "${process.argv[4]}"` : ' (showing first 100)'}:\n`
    )

    filtered.forEach(name => {
      // Count how many variants/components belong to this main component
      const variants = allComponentNames.filter(
        n => n.split(/[=,]/)[0].split('/')[0].trim() === name
      )
      const variantCount = variants.length

      if (variantCount > 1) {
        console.log(`   - ${name} (${variantCount} variants)`)
      } else {
        console.log(`   - ${name}`)
      }
    })

    if (!searchTerm && allMainComponents.length > 100) {
      console.log(`   ... and ${allMainComponents.length - 100} more`)
      console.log(`\n💡 Tip: Use 'npm run figma:sync:components list <term>' to search`)
    }

    console.log(`\n💡 Use: npm run figma:sync:components <component-name>`)
  } catch (error) {
    console.error(
      '\n❌ Failed to list components:',
      error instanceof Error ? error.message : String(error)
    )
    process.exit(1)
  }
}

async function syncComponents() {
  console.log('🔄 Syncing components from Figma...')
  console.log(`📁 File ID: ${figmaConfig.fileId}\n`)

  try {
    const { extractComponents } = await import('../lib/figma-sync/extract-components')
    const { saveComponent, saveStory } = await import('../lib/figma-sync/component-generator')

    // Allow filtering by component name via CLI argument
    const componentFilter = process.argv[3]
    let filterFn: ((component: any, name: string) => boolean) | undefined

    if (componentFilter) {
      console.log(`🎯 Filtering for component: "${componentFilter}"\n`)
      const filterName = componentFilter.toLowerCase()
      let exactMatches = 0
      let variantMatches = 0
      const MAX_VARIANTS = 5 // Limit variants to avoid rate limits

      filterFn = (component: any, name: string) => {
        const nameLower = name.toLowerCase()

        // Extract main component name (before first = or /)
        const mainName = name.split(/[=,]/)[0].split('/')[0].trim().toLowerCase()

        // Priority 1: Exact match (component named exactly "Button")
        const isExactMatch = nameLower === filterName || mainName === filterName

        // Priority 2: Variants that start with filter (like "Button=Primary")
        const isVariantMatch =
          nameLower.startsWith(filterName + '=') ||
          nameLower.match(new RegExp(`^${filterName}=`)) ||
          (nameLower.includes('type=') &&
            nameLower.includes(filterName) &&
            nameLower.includes('variant='))

        if (isExactMatch) {
          exactMatches++
          if (exactMatches <= 3) {
            console.log(`   ✓ Exact match: "${name}"`)
          }
          return true
        }

        // Only include variants if we haven't exceeded the limit
        if (isVariantMatch && variantMatches < MAX_VARIANTS) {
          variantMatches++
          if (variantMatches <= 3) {
            console.log(`   ✓ Variant match: "${name}"`)
          }
          return true
        }

        return false
      }
    }

    const components = await extractComponents(undefined, filterFn)

    if (components.length === 0) {
      console.log('⚠️  No components found matching criteria')
      console.log("💡 Tip: Try 'npm run figma:sync:components Button' to sync a specific component")
      return
    }

    console.log(`\n📦 Generating ${components.length} components...\n`)

    const componentsDir = resolve(process.cwd(), 'src/components/ui')
    const storiesDir = resolve(process.cwd(), 'stories/components/ui')

    for (const component of components) {
      saveComponent(component, componentsDir)
      saveStory(component, storiesDir)
    }

    console.log('\n✅ Component sync completed successfully!')
    console.log(`📝 Generated ${components.length} components and stories`)
  } catch (error) {
    console.error(
      '\n❌ Component sync failed:',
      error instanceof Error ? error.message : String(error)
    )
    process.exit(1)
  }
}

async function syncAll() {
  console.log('🔄 Syncing everything from Figma...\n')

  await syncTokens()
  console.log('')
  await syncComponents()

  console.log('\n✅ Full sync completed!')
}

async function main() {
  switch (command) {
    case 'tokens':
      await syncTokens()
      break
    case 'components':
      if (process.argv[3] === 'list') {
        await listComponents()
      } else {
        await syncComponents()
      }
      break
    case 'all':
      await syncAll()
      break
    default:
      console.error(`❌ Unknown command: ${command}`)
      console.log('\nUsage:')
      console.log(
        '  npm run figma:sync:tokens                    # Sync all tokens from FOUNDATION'
      )
      console.log('  npm run figma:sync:tokens Colors            # Sync only Colors section')
      console.log('  npm run figma:sync:tokens Typography        # Sync only Typography section')
      console.log('  npm run figma:sync:components list           # List available components')
      console.log('  npm run figma:sync:components                # Sync all components')
      console.log('  npm run figma:sync:components Button         # Sync specific component')
      console.log('  npm run figma:sync:all                      # Sync everything')
      process.exit(1)
  }
}

main()
