/**
 * Component Generator
 *
 * Generates React components and Storybook stories from Figma component data
 */

import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import type { ComponentInfo } from './extract-components'
import { toComponentName, toPropName } from './extract-components'
import { componentTemplate } from './templates/component.template'
import { storyTemplate } from './templates/story.template'

/**
 * Generate CSS classes for a variant option based on property name and value
 */
function generateVariantClasses(propName: string, value: string): string {
  const valueLower = value.toLowerCase()
  const propLower = propName.toLowerCase()

  // Variant (Primary, Secondary, Ghost, Destructive)
  if (propLower === 'variant') {
    if (valueLower.includes('primary')) {
      return 'bg-primary text-primary-foreground hover:bg-primary/90'
    }
    if (valueLower.includes('secondary')) {
      return 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }
    if (valueLower.includes('ghost')) {
      return 'hover:bg-accent hover:text-accent-foreground'
    }
    if (valueLower.includes('destructive')) {
      return 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    }
    return 'bg-primary text-primary-foreground'
  }

  // Size (sm, md, lg)
  if (propLower === 'size') {
    if (valueLower === 'sm') {
      return 'h-9 px-3 text-sm'
    }
    if (valueLower === 'md') {
      return 'h-10 px-4 py-2'
    }
    if (valueLower === 'lg') {
      return 'h-11 px-8 text-base'
    }
    return 'h-10 px-4 py-2'
  }

  // Type (Button, IconButton)
  if (propLower === 'type') {
    if (valueLower.includes('icon')) {
      return 'aspect-square p-0'
    }
    return ''
  }

  // State (Default, Hover, Pressed, Focus, Disabled)
  if (propLower === 'state') {
    if (valueLower === 'hover') {
      return '' // Handled by hover: classes
    }
    if (valueLower === 'pressed') {
      return 'active:scale-95'
    }
    if (valueLower === 'focus') {
      return 'focus-visible:ring-2 focus-visible:ring-ring'
    }
    if (valueLower === 'disabled') {
      return 'disabled:pointer-events-none disabled:opacity-50'
    }
    return ''
  }

  return ''
}

/**
 * Normalize variant option name to valid JavaScript identifier
 */
function normalizeVariantOption(option: string): string {
  // Convert to camelCase and remove invalid characters
  return option
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
    .replace(/^[0-9]/, '_$&') // Can't start with number
}

/**
 * Generate CVA variants from component properties
 */
function generateVariants(component: ComponentInfo): string {
  const variants: string[] = []

  if (component.variants && Object.keys(component.variants).length > 0) {
    for (const [variantName, options] of Object.entries(component.variants)) {
      const propName = toPropName(variantName)
      variants.push(`      ${propName}: {`)

      // Determine default value (first option or "default")
      const normalizedOptions = options.map(normalizeVariantOption)
      const defaultOption = normalizedOptions[0] || 'default'

      for (let i = 0; i < options.length; i++) {
        const option = options[i]
        const normalized = normalizedOptions[i]
        const classes = generateVariantClasses(variantName, option)
        variants.push(`        ${normalized}: ${classes ? `"${classes}"` : '""'},`)
      }

      variants.push(`      },`)
    }
  } else {
    // Default variants
    variants.push(`      variant: {`)
    variants.push(`        default: "bg-primary text-primary-foreground",`)
    variants.push(`        secondary: "bg-secondary text-secondary-foreground",`)
    variants.push(`      },`)
    variants.push(`      size: {`)
    variants.push(`        default: "h-10 px-4 py-2",`)
    variants.push(`        sm: "h-9 px-3",`)
    variants.push(`        lg: "h-11 px-8",`)
    variants.push(`      },`)
  }

  return variants.join('\n')
}

/**
 * Generate TypeScript props interface
 */
function generateProps(component: ComponentInfo): string {
  const props: string[] = []

  if (component.properties && Object.keys(component.properties).length > 0) {
    for (const [key, prop] of Object.entries(component.properties)) {
      const propName = toPropName(key)
      let type = 'string'

      if (prop.type === 'BOOLEAN') {
        type = 'boolean'
      } else if (prop.type === 'TEXT') {
        type = 'string'
      } else if (prop.type === 'VARIANT' && prop.variantOptions) {
        type = prop.variantOptions.map((opt: string) => `"${opt}"`).join(' | ')
      }

      props.push(`  ${propName}?: ${type}`)
    }
  }

  return props.length > 0 ? props.join('\n') : '  // No additional props'
}

/**
 * Determine HTML element type based on component name
 */
function getElementType(componentName: string): 'button' | 'div' | 'input' | 'a' {
  const nameLower = componentName.toLowerCase()
  if (nameLower.includes('button')) return 'button'
  if (nameLower.includes('input') || nameLower.includes('field')) return 'input'
  if (nameLower.includes('link')) return 'a'
  return 'div'
}

/**
 * Generate default variants for CVA
 */
function generateDefaultVariants(component: ComponentInfo): string {
  const defaults: string[] = []

  if (component.variants && Object.keys(component.variants).length > 0) {
    for (const [variantName, options] of Object.entries(component.variants)) {
      const propName = toPropName(variantName)
      const normalizedOptions = options.map(normalizeVariantOption)

      // Only set defaults for variant and size, skip type and state
      if (propName === 'variant') {
        // Prefer "primary" or "default" over "destructive" as default
        let defaultOption =
          normalizedOptions.find(o => o === 'primary' || o === 'default') || normalizedOptions[0]
        defaults.push(`      ${propName}: "${defaultOption}",`)
      } else if (propName === 'size') {
        // Prefer "md" or "default" over "lg" as default
        let defaultOption =
          normalizedOptions.find(o => o === 'md' || o === 'default') || normalizedOptions[0]
        defaults.push(`      ${propName}: "${defaultOption}",`)
      }
    }
  } else {
    defaults.push(`      variant: "default",`)
    defaults.push(`      size: "default",`)
  }

  return defaults.length > 0 ? defaults.join('\n') : ''
}

/**
 * Generate React component code
 */
export function generateComponent(component: ComponentInfo): string {
  const componentName = toComponentName(component.name)
  const variants = generateVariants(component)
  const props = generateProps(component)
  const defaultVariants = generateDefaultVariants(component)
  const elementType = getElementType(component.name)
  const isButton = elementType === 'button'

  // Use button element for button components
  const elementTag = elementType
  const elementRefType = isButton
    ? 'HTMLButtonElement'
    : elementType === 'input'
      ? 'HTMLInputElement'
      : elementType === 'a'
        ? 'HTMLAnchorElement'
        : 'HTMLDivElement'
  const elementPropsType = isButton
    ? 'React.ButtonHTMLAttributes<HTMLButtonElement>'
    : elementType === 'input'
      ? 'React.InputHTMLAttributes<HTMLInputElement>'
      : elementType === 'a'
        ? 'React.AnchorHTMLAttributes<HTMLAnchorElement>'
        : 'React.HTMLAttributes<HTMLDivElement>'

  const template = componentTemplate
    .replace(/{{COMPONENT_NAME}}/g, componentName)
    .replace(/{{COMPONENT_DESCRIPTION}}/g, component.description || `${componentName} component`)
    .replace(/{{VARIANTS}}/g, variants)
    .replace(/{{PROPS}}/g, props)
    .replace(/{{DEFAULT_VARIANTS}}/g, defaultVariants)
    .replace(
      /{{BASE_CLASSES}}/g,
      isButton
        ? 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50'
        : 'inline-flex items-center justify-center'
    )
    .replace(/{{ELEMENT_TAG}}/g, elementTag)
    .replace(/{{ELEMENT_REF_TYPE}}/g, elementRefType)
    .replace(/{{ELEMENT_PROPS_TYPE}}/g, elementPropsType)

  return template
}

/**
 * Generate Storybook story code
 */
export function generateStory(component: ComponentInfo): string {
  const componentName = toComponentName(component.name)
  const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1)
  const storyTitle = `UI/${componentName}`

  // Generate variant stories with better organization
  const variantStories: string[] = []
  const usedStoryNames = new Set<string>()

  if (component.variants && Object.keys(component.variants).length > 0) {
    // Generate argTypes from variants
    const argTypes: string[] = []
    for (const [variantName, options] of Object.entries(component.variants)) {
      const propName = toPropName(variantName)
      const normalizedOptions = options.map(normalizeVariantOption)
      argTypes.push(`    ${propName}: {`)
      argTypes.push(`      control: "select",`)
      argTypes.push(`      options: [${normalizedOptions.map(o => `"${o}"`).join(', ')}],`)
      argTypes.push(`    },`)
    }

    // Generate main stories: one for each primary variant (variant prop)
    const variantProp = Object.keys(component.variants).find(k => toPropName(k) === 'variant')
    const sizeProp = Object.keys(component.variants).find(k => toPropName(k) === 'size')

    if (variantProp) {
      const variantOptions = component.variants[variantProp]
      const normalizedVariants = variantOptions.map(normalizeVariantOption)

      for (let i = 0; i < variantOptions.length; i++) {
        const variant = variantOptions[i]
        const normalizedVariant = normalizedVariants[i]
        const storyName = normalizedVariant.charAt(0).toUpperCase() + normalizedVariant.slice(1)

        if (!usedStoryNames.has(storyName)) {
          usedStoryNames.add(storyName)
          variantStories.push(`export const ${storyName}: Story = {`)
          variantStories.push(`  args: {`)
          variantStories.push(`    children: "${storyName}",`)
          variantStories.push(`    ${toPropName(variantProp)}: "${normalizedVariant}",`)
          if (sizeProp) {
            const sizeOptions = component.variants[sizeProp]
            const normalizedSizes = sizeOptions.map(normalizeVariantOption)
            variantStories.push(
              `    ${toPropName(sizeProp)}: "${normalizedSizes[1] || normalizedSizes[0]}",`
            )
          }
          variantStories.push(`  },`)
          variantStories.push(`}`)
          variantStories.push('')
        }
      }
    }

    // Generate size stories if size prop exists
    if (sizeProp && variantProp) {
      const sizeOptions = component.variants[sizeProp]
      const normalizedSizes = sizeOptions.map(normalizeVariantOption)
      const defaultVariant = normalizeVariantOption(component.variants[variantProp][0])

      for (let i = 0; i < sizeOptions.length; i++) {
        const size = sizeOptions[i]
        const normalizedSize = normalizedSizes[i]
        const storyName = `Size${normalizedSize.charAt(0).toUpperCase() + normalizedSize.slice(1)}`

        if (!usedStoryNames.has(storyName)) {
          usedStoryNames.add(storyName)
          variantStories.push(`export const ${storyName}: Story = {`)
          variantStories.push(`  args: {`)
          variantStories.push(`    children: "Button",`)
          variantStories.push(`    ${toPropName(variantProp)}: "${defaultVariant}",`)
          variantStories.push(`    ${toPropName(sizeProp)}: "${normalizedSize}",`)
          variantStories.push(`  },`)
          variantStories.push(`}`)
          variantStories.push('')
        }
      }
    }
  }

  // Generate argTypes from variants
  const argTypes: string[] = []
  if (component.variants && Object.keys(component.variants).length > 0) {
    for (const [variantName, options] of Object.entries(component.variants)) {
      const propName = toPropName(variantName)
      const normalizedOptions = options.map(normalizeVariantOption)
      argTypes.push(`    ${propName}: {`)
      argTypes.push(`      control: "select",`)
      argTypes.push(`      options: [${normalizedOptions.map(o => `"${o}"`).join(', ')}],`)
      argTypes.push(`    },`)
    }
  } else {
    // Default argTypes
    argTypes.push(`    variant: {`)
    argTypes.push(`      control: "select",`)
    argTypes.push(`      options: ["default", "secondary"],`)
    argTypes.push(`    },`)
    argTypes.push(`    size: {`)
    argTypes.push(`      control: "select",`)
    argTypes.push(`      options: ["default", "sm", "lg"],`)
    argTypes.push(`    },`)
  }

  // Generate Default story with correct defaults
  const variantProp = component.variants
    ? Object.keys(component.variants).find(k => toPropName(k) === 'variant')
    : null
  const sizeProp = component.variants
    ? Object.keys(component.variants).find(k => toPropName(k) === 'size')
    : null
  const defaultVariant = variantProp
    ? normalizeVariantOption(
        component.variants[variantProp].find(o => o.toLowerCase().includes('primary')) ||
          component.variants[variantProp][0]
      )
    : 'default'
  const defaultSize = sizeProp
    ? normalizeVariantOption(
        component.variants[sizeProp].find(
          o => o.toLowerCase() === 'md' || o.toLowerCase() === 'default'
        ) || component.variants[sizeProp][0]
      )
    : 'default'

  const defaultStory = `export const Default: Story = {
  args: {
    children: "Button",
    ${variantProp ? `${toPropName(variantProp)}: "${defaultVariant}",` : ''}
    ${sizeProp ? `${toPropName(sizeProp)}: "${defaultSize}",` : ''}
  },
}
`

  // Update story template
  let storyCode = storyTemplate
    .replace(/{{COMPONENT_NAME}}/g, componentName)
    .replace(/{{COMPONENT_NAME_LOWER}}/g, componentNameLower)
    .replace(/{{STORY_TITLE}}/g, storyTitle)
    .replace(/{{VARIANTS}}/g, variantStories.join('\n'))

  // Replace argTypes section (match multiline with all content until closing brace, including nested braces)
  // Use a more robust regex that matches everything between argTypes: { and the closing },
  const argTypesRegex = /argTypes: \{[\s\S]*?\n  \},/
  if (argTypesRegex.test(storyCode)) {
    storyCode = storyCode.replace(argTypesRegex, `argTypes: {\n${argTypes.join('\n')}\n  },`)
  } else {
    // Fallback: try simpler replacement
    storyCode = storyCode.replace(
      /argTypes: \{[\s\S]*?\},/,
      `argTypes: {\n${argTypes.join('\n')}\n  },`
    )
  }

  // Remove any duplicate argTypes sections (safety check)
  const argTypesMatches = storyCode.match(/argTypes: \{[\s\S]*?\n  \},/g)
  if (argTypesMatches && argTypesMatches.length > 1) {
    // Keep only the first one
    storyCode = storyCode.replace(/argTypes: \{[\s\S]*?\n  \},/, (match, offset) => {
      return offset === storyCode.indexOf('argTypes: {') ? match : ''
    })
    // Clean up any double closing braces
    storyCode = storyCode.replace(/\n  \},\n  \},/g, '\n  },')
  }

  // Replace Default story
  storyCode = storyCode.replace(/export const Default: Story = \{[\s\S]*?\}\n/, defaultStory)

  return storyCode
}

/**
 * Save component to file
 */
export function saveComponent(component: ComponentInfo, outputDir: string): void {
  const componentName = toComponentName(component.name)
  const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1)

  const componentCode = generateComponent(component)
  const componentPath = resolve(outputDir, `${componentNameLower}.tsx`)

  // Ensure directory exists
  mkdirSync(dirname(componentPath), { recursive: true })

  writeFileSync(componentPath, componentCode, 'utf-8')
  console.log(`✅ Generated component: ${componentPath}`)
}

/**
 * Save story to file
 */
export function saveStory(component: ComponentInfo, outputDir: string): void {
  const componentName = toComponentName(component.name)

  const storyCode = generateStory(component)
  const storyPath = resolve(outputDir, `${componentName}.stories.tsx`)

  // Ensure directory exists
  mkdirSync(dirname(storyPath), { recursive: true })

  writeFileSync(storyPath, storyCode, 'utf-8')
  console.log(`✅ Generated story: ${storyPath}`)
}
