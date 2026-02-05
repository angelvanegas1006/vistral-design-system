/**
 * Component Template
 *
 * Template for generating React components from Figma
 * Placeholders:
 * - {{COMPONENT_NAME}} - Component name (PascalCase)
 * - {{COMPONENT_DESCRIPTION}} - Component description
 * - {{VARIANTS}} - CVA variants definition
 * - {{PROPS}} - TypeScript props interface
 * - {{BASE_CLASSES}} - Base CSS classes
 */

export const componentTemplate = `import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * {{COMPONENT_DESCRIPTION}}
 */
const {{COMPONENT_NAME}}Variants = cva(
  "{{BASE_CLASSES}}",
  {
    variants: {
{{VARIANTS}}
    },
    defaultVariants: {
{{DEFAULT_VARIANTS}}
    },
  }
)

export interface {{COMPONENT_NAME}}Props
  extends {{ELEMENT_PROPS_TYPE}},
    VariantProps<typeof {{COMPONENT_NAME}}Variants> {
{{PROPS}}
}

const {{COMPONENT_NAME}} = forwardRef<{{ELEMENT_REF_TYPE}}, {{COMPONENT_NAME}}Props>(
  ({ className, ...props }, ref) => {
    return (
      <{{ELEMENT_TAG}}
        ref={ref}
        className={cn({{COMPONENT_NAME}}Variants(props), className)}
        {...props}
      />
    )
  }
)
{{COMPONENT_NAME}}.displayName = "{{COMPONENT_NAME}}"

export { {{COMPONENT_NAME}}, {{COMPONENT_NAME}}Variants }
`
