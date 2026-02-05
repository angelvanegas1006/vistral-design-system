/**
 * Script to extract individual flags from the combined flag.svg
 * This version extracts the actual position from the clip path transform attribute
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Country names in order of visual appearance (estimated based on common flag collections)
const FLAG_NAMES: string[] = [
  // These will be used in index order - the actual country may not match perfectly
  // Row by row, left to right
  'algeria',
  'afghanistan',
  'uk',
  'albania',
  'united-states',
  'andorra',
  'angola',
  'antigua-barbuda',
  'argentina',
  'armenia',
  'australia',
  'austria',
  'azerbaijan',
  'bahamas',
  'bahrain',
  'bangladesh',
  'barbados',
  'belarus',
  'belgium',
  'belize',
  'benin',
  'bhutan',
  'bolivia',
  'bosnia',
  'botswana',
  'brazil',
  'brunei',
  'bulgaria',
  'burkina-faso',
  'burundi',
  'cambodia',
  'cameroon',
  'canada',
  'cape-verde',
  'central-african-republic',
  'chad',
  'chile',
  'china',
  'colombia',
  'comoros',
  'congo-drc',
  'congo',
  'costa-rica',
  'croatia',
  'cuba',
  'cyprus',
  'czech-republic',
  'denmark',
  'djibouti',
  'dominica',
  'dominican-republic',
  'east-timor',
  'ecuador',
  'egypt',
  'el-salvador',
  'equatorial-guinea',
  'eritrea',
  'estonia',
  'eswatini',
  'ethiopia',
  'fiji',
  'finland',
  'france',
  'gabon',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'greece',
  'grenada',
  'guatemala',
  'guinea',
  'guinea-bissau',
  'guyana',
  'haiti',
  'honduras',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'israel',
  'italy',
  'ivory-coast',
  'jamaica',
  'japan',
  'jordan',
  'kazakhstan',
  'kenya',
  'kiribati',
  'kuwait',
  'kyrgyzstan',
  'laos',
  'latvia',
  'lebanon',
  'lesotho',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'madagascar',
  'malawi',
  'malaysia',
  'maldives',
  'mali',
  'malta',
  'marshall-islands',
  'mauritania',
  'mauritius',
  'mexico',
  'micronesia',
  'moldova',
  'monaco',
  'mongolia',
  'montenegro',
  'morocco',
  'mozambique',
  'myanmar',
  'namibia',
  'nauru',
  'nepal',
  'netherlands',
  'new-zealand',
  'nicaragua',
  'niger',
  'nigeria',
  'north-korea',
  'north-macedonia',
  'norway',
  'oman',
  'pakistan',
  'palau',
  'palestine',
  'panama',
  'papua-new-guinea',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'qatar',
  'romania',
  'russia',
  'rwanda',
  'saint-kitts',
  'saint-lucia',
  'saint-vincent',
  'samoa',
  'san-marino',
  'sao-tome',
  'saudi-arabia',
  'senegal',
  'serbia',
  'seychelles',
  'sierra-leone',
  'singapore',
  'slovakia',
  'slovenia',
  'solomon-islands',
  'somalia',
  'south-africa',
  'south-korea',
  'south-sudan',
  'spain',
  'sri-lanka',
  'sudan',
  'suriname',
  'sweden',
  'switzerland',
  'syria',
  'taiwan',
  'tajikistan',
  'tanzania',
  'thailand',
  'timor-leste',
  'togo',
  'tonga',
  'trinidad',
  'tunisia',
  'turkey',
  'turkmenistan',
  'tuvalu',
  'uganda',
  'ukraine',
  'uae',
  'uruguay',
  'uzbekistan',
  'vanuatu',
  'vatican',
  'venezuela',
  'vietnam',
  'yemen',
  'zambia',
  'zimbabwe',
  // Additional territories/regions
  'hong-kong',
  'macau',
  'puerto-rico',
  'kosovo',
  'tibet',
  'catalonia',
  'scotland',
  'wales',
  'england',
  'northern-ireland',
  'basque-country',
  'galicia',
  'european-union',
  'united-nations',
  'olympics',
  'nato',
  'african-union',
  'arab-league',
  'asean',
  'caribbean',
  'commonwealth',
  'francophonie',
]

interface ExtractedFlag {
  index: number
  clipPathId: string
  groupContent: string
  clipPathDef: string
  offsetX: number
  offsetY: number
}

/**
 * Extract offset from clip path transform attribute
 */
function extractClipPathOffset(clipPathDef: string): { x: number; y: number } | null {
  // Look for transform="translate(x y)" or transform="translate(x, y)"
  const translateMatch = clipPathDef.match(
    /transform="translate\(([+-]?\d+\.?\d*)[,\s]+([+-]?\d+\.?\d*)\)"/
  )
  if (translateMatch) {
    return {
      x: parseFloat(translateMatch[1]),
      y: parseFloat(translateMatch[2]),
    }
  }

  // Also try to extract from rect x/y attributes
  const rectMatch = clipPathDef.match(
    /<rect[^>]*\s+x="([+-]?\d+\.?\d*)"[^>]*\s+y="([+-]?\d+\.?\d*)"/
  )
  if (rectMatch) {
    return {
      x: parseFloat(rectMatch[1]),
      y: parseFloat(rectMatch[2]),
    }
  }

  return null
}

/**
 * Transform path coordinates by subtracting offset
 */
function transformPathD(pathD: string, offsetX: number, offsetY: number): string {
  // Parse the path and transform coordinates
  let result = ''
  let i = 0

  while (i < pathD.length) {
    const char = pathD[i]

    // Check if it's a command
    if (/[MLHVCSQTAZmlhvcsqtaz]/.test(char)) {
      result += char
      i++
      continue
    }

    // Skip whitespace and commas
    if (/[\s,]/.test(char)) {
      result += char
      i++
      continue
    }

    // Parse a number
    let numStr = ''
    while (i < pathD.length && /[0-9.eE+-]/.test(pathD[i])) {
      // Handle negative signs at the start of numbers
      if (pathD[i] === '-' && numStr.length > 0 && !/[eE]/.test(numStr[numStr.length - 1])) {
        break
      }
      numStr += pathD[i]
      i++
    }

    if (numStr) {
      const num = parseFloat(numStr)
      // This is a simplified transform - just subtract offset from all numbers
      // A proper implementation would track command context
      result += (num - offsetX).toFixed(2)
    }
  }

  return result
}

/**
 * Transform SVG content by adjusting path d attributes
 */
function transformContent(content: string, offsetX: number, offsetY: number): string {
  // For each path element, transform the d attribute
  return content
    .replace(/<path\s+d="([^"]*)"/g, (match, d) => {
      // Parse and transform the path data
      // This is a simplified approach - transform all coordinates
      const transformed = transformCoordinates(d, offsetX, offsetY)
      return `<path d="${transformed}"`
    })
    .replace(/<rect([^>]*)\/>/g, (match, attrs) => {
      // Transform rect x and y attributes
      let transformed = attrs
      transformed = transformed.replace(/\s+x="([^"]*)"/, (m, x) => {
        return ` x="${(parseFloat(x) - offsetX).toFixed(2)}"`
      })
      transformed = transformed.replace(/\s+y="([^"]*)"/, (m, y) => {
        return ` y="${(parseFloat(y) - offsetY).toFixed(2)}"`
      })
      return `<rect${transformed}/>`
    })
    .replace(/<circle([^>]*)\/>/g, (match, attrs) => {
      // Transform circle cx and cy attributes
      let transformed = attrs
      transformed = transformed.replace(/\s+cx="([^"]*)"/, (m, cx) => {
        return ` cx="${(parseFloat(cx) - offsetX).toFixed(2)}"`
      })
      transformed = transformed.replace(/\s+cy="([^"]*)"/, (m, cy) => {
        return ` cy="${(parseFloat(cy) - offsetY).toFixed(2)}"`
      })
      return `<circle${transformed}/>`
    })
}

/**
 * Transform path d attribute coordinates
 */
function transformCoordinates(d: string, offsetX: number, offsetY: number): string {
  // Track the current command for context
  let currentCmd = ''
  let result = ''
  let numberIndex = 0

  const tokens = d.match(/[MLHVCSQTAZmlhvcsqtaz]|[+-]?\d+\.?\d*(?:[eE][+-]?\d+)?/g) || []

  for (const token of tokens) {
    if (/[MLHVCSQTAZmlhvcsqtaz]/.test(token)) {
      currentCmd = token
      result += token
      numberIndex = 0
    } else {
      const num = parseFloat(token)
      let transformed = num

      // Apply transformation based on command and position
      const upperCmd = currentCmd.toUpperCase()
      const isRelative = currentCmd !== upperCmd

      if (!isRelative) {
        if (upperCmd === 'H') {
          // Horizontal line - x coordinate
          transformed = num - offsetX
        } else if (upperCmd === 'V') {
          // Vertical line - y coordinate
          transformed = num - offsetY
        } else if (upperCmd === 'A') {
          // Arc: rx ry rotation large-arc sweep x y
          // Only transform x (index 5) and y (index 6)
          if (numberIndex === 5) transformed = num - offsetX
          else if (numberIndex === 6) transformed = num - offsetY
        } else if (upperCmd === 'Z') {
          // Close path - no coordinates
        } else {
          // M, L, C, S, Q, T all have x,y pairs
          // Even indices are x, odd indices are y
          if (numberIndex % 2 === 0) {
            transformed = num - offsetX
          } else {
            transformed = num - offsetY
          }
        }
      }

      // Format number
      if (Number.isInteger(transformed)) {
        result += transformed
      } else {
        result += transformed.toFixed(2).replace(/\.?0+$/, '')
      }

      numberIndex++
    }

    // Add space between tokens
    result += ' '
  }

  return result.trim()
}

function extractFlags(svgContent: string): ExtractedFlag[] {
  const flags: ExtractedFlag[] = []

  // Match all <g clip-path="url(#clip{N}_...)"> elements
  const groupRegex = /<g\s+clip-path="url\(#(clip\d+_\d+_\d+)\)">([\s\S]*?)<\/g>/g

  let match
  let index = 0

  while ((match = groupRegex.exec(svgContent)) !== null) {
    const clipPathId = match[1]
    const groupContent = match[2]

    if (!groupContent.trim()) continue

    // Get the clip path definition
    const clipPathRegex = new RegExp(`<clipPath\\s+id="${clipPathId}"[^>]*>([\\s\\S]*?)</clipPath>`)
    const clipMatch = svgContent.match(clipPathRegex)

    if (!clipMatch) continue

    const clipPathDef = clipMatch[0]

    // Extract offset from clip path
    const offset = extractClipPathOffset(clipPathDef)

    if (!offset) {
      console.warn(`Could not extract offset for flag ${index} (${clipPathId})`)
      continue
    }

    flags.push({
      index,
      clipPathId,
      groupContent,
      clipPathDef,
      offsetX: offset.x,
      offsetY: offset.y,
    })

    index++
  }

  return flags
}

function createFlagSvg(flag: ExtractedFlag): string {
  // Transform the group content
  const transformedContent = transformContent(flag.groupContent, flag.offsetX, flag.offsetY)

  // Create a new clip path at origin
  const newClipPathId = `clip_${flag.index}`
  const newClipPath = `<clipPath id="${newClipPathId}"><rect width="128" height="128" fill="white"/></clipPath>`

  return `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#${newClipPathId})">
${transformedContent}
</g>
<defs>
${newClipPath}
</defs>
</svg>`
}

async function main() {
  const inputPath = path.join(__dirname, '../public/assets/flags/flag.svg')
  const outputDir = path.join(__dirname, '../public/assets/flags/countries')

  if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath)
    process.exit(1)
  }

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  console.log('Reading SVG file...')
  const svgContent = fs.readFileSync(inputPath, 'utf-8')

  console.log('Extracting flags...')
  const flags = extractFlags(svgContent)
  console.log(`Found ${flags.length} flags`)

  // Save each flag
  let savedCount = 0
  const flagIndex: { code: string; name: string; file: string }[] = []

  for (const flag of flags) {
    const name = FLAG_NAMES[flag.index] || `flag-${flag.index.toString().padStart(3, '0')}`
    const filename = `${name}.svg`

    try {
      const flagSvg = createFlagSvg(flag)
      const outputPath = path.join(outputDir, filename)
      fs.writeFileSync(outputPath, flagSvg)

      flagIndex.push({
        code: name,
        name: name
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        file: filename,
      })

      savedCount++

      if (savedCount % 50 === 0) {
        console.log(`Saved ${savedCount} flags...`)
      }
    } catch (error) {
      console.error(`Error saving flag ${flag.index} (${name}):`, error)
    }
  }

  console.log(`\nSaved ${savedCount} flag SVG files to ${outputDir}`)

  // Save index
  fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify({ total: savedCount, flags: flagIndex }, null, 2)
  )

  console.log('Generated index.json')
}

main().catch(console.error)
