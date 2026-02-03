/**
 * Story Template
 * 
 * Template for generating Storybook stories from Figma components
 * Placeholders:
 * - {{COMPONENT_NAME}} - Component name (PascalCase)
 * - {{STORY_TITLE}} - Story title (e.g., "UI/ComponentName")
 * - {{VARIANTS}} - Story variants
 */

export const storyTemplate = `import type { Meta, StoryObj } from "@storybook/react"
import { {{COMPONENT_NAME}} } from "@/components/ui/{{COMPONENT_NAME_LOWER}}"

const meta = {
  title: "{{STORY_TITLE}}",
  component: {{COMPONENT_NAME}},
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof {{COMPONENT_NAME}}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
}

{{VARIANTS}}
`
