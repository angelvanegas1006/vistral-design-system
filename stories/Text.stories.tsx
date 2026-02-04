import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../src/components/ui/text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Text

Text component matching Figma design.

Based on Figma:
- [Text Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=176-4062)

## Features
- **Typography Variants**: h1-h6, body, bodyLarge, caption, small
- **Colors**: default, muted, subtle, error, success, warning, info
- **Semantic HTML**: Automatically uses correct HTML tags
- **Customizable**: Override weight, size, color, and element

## Best Practices
- Use the Text component for all text content
- Utilize typographic scale (predefined sizes and weights)
- Use semantic HTML elements (h1-h6, p, span)
- Maintain sufficient color contrast (WCAG 2.1)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text variant="body">This is body text</Text>
      <Text variant="bodyLarge">This is large body text</Text>
      <Text variant="caption">This is caption text</Text>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="body" color="default">Default color</Text>
      <Text variant="body" color="muted">Muted color</Text>
      <Text variant="body" color="subtle">Subtle color</Text>
      <Text variant="body" color="error">Error color</Text>
      <Text variant="body" color="success">Success color</Text>
      <Text variant="body" color="warning">Warning color</Text>
      <Text variant="body" color="info">Info color</Text>
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="h3" as="div">Rendered as div (h3 style)</Text>
      <Text variant="body" as="span">Rendered as span (body style)</Text>
      <Text variant="caption" as="p">Rendered as paragraph (caption style)</Text>
    </div>
  ),
};

export const CustomWeight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="body" weight={400}>Weight 400 (Regular)</Text>
      <Text variant="body" weight={500}>Weight 500 (Medium)</Text>
      <Text variant="body" weight={600}>Weight 600 (Semibold)</Text>
      <Text variant="body" weight={700}>Weight 700 (Bold)</Text>
    </div>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="body" size={12}>Custom size: 12px</Text>
      <Text variant="body" size={16}>Custom size: 16px</Text>
      <Text variant="body" size={20}>Custom size: 20px</Text>
      <Text variant="body" size="1.5rem">Custom size: 1.5rem</Text>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 600 }}>
      <div>
        <Text variant="h1">Heading 1</Text>
        <Text variant="caption" color="muted">32px, Bold, Line height 1.2</Text>
      </div>
      <div>
        <Text variant="h2">Heading 2</Text>
        <Text variant="caption" color="muted">24px, Semibold, Line height 1.3</Text>
      </div>
      <div>
        <Text variant="h3">Heading 3</Text>
        <Text variant="caption" color="muted">20px, Semibold, Line height 1.4</Text>
      </div>
      <div>
        <Text variant="h4">Heading 4</Text>
        <Text variant="caption" color="muted">18px, Semibold, Line height 1.4</Text>
      </div>
      <div>
        <Text variant="h5">Heading 5</Text>
        <Text variant="caption" color="muted">16px, Semibold, Line height 1.5</Text>
      </div>
      <div>
        <Text variant="h6">Heading 6</Text>
        <Text variant="caption" color="muted">14px, Semibold, Line height 1.5</Text>
      </div>
      <div>
        <Text variant="bodyLarge">Body Large</Text>
        <Text variant="caption" color="muted">16px, Regular, Line height 1.5</Text>
      </div>
      <div>
        <Text variant="body">Body</Text>
        <Text variant="caption" color="muted">14px, Regular, Line height 1.5</Text>
      </div>
      <div>
        <Text variant="small">Small</Text>
        <Text variant="caption" color="muted">13px, Regular, Line height 1.4</Text>
      </div>
      <div>
        <Text variant="caption">Caption</Text>
        <Text variant="caption" color="muted">12px, Regular, Line height 1.4</Text>
      </div>
    </div>
  ),
};

export const UseCases: Story = {
  name: 'Use Cases',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 600 }}>
      <div>
        <Text variant="h3" style={{ marginBottom: 8 }}>Article Title</Text>
        <Text variant="body" color="muted" style={{ marginBottom: 16 }}>
          Published on January 15, 2025
        </Text>
        <Text variant="body" style={{ marginBottom: 12 }}>
          This is the main content of the article. It uses the body variant for readability
          and maintains proper line height for comfortable reading.
        </Text>
        <Text variant="body">
          Additional paragraphs continue with the same styling to maintain consistency
          throughout the document.
        </Text>
      </div>

      <div>
        <Text variant="h4" style={{ marginBottom: 8 }}>Form Label</Text>
        <Text variant="caption" color="muted">
          Helper text explaining what this field is for
        </Text>
      </div>

      <div>
        <Text variant="body">
          Success message: <Text variant="body" color="success">Operation completed successfully</Text>
        </Text>
        <Text variant="body">
          Error message: <Text variant="body" color="error">Something went wrong</Text>
        </Text>
        <Text variant="body">
          Warning message: <Text variant="body" color="warning">Please review this information</Text>
        </Text>
      </div>
    </div>
  ),
};
