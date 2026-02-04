import React from "react"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#18181b' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Elevation', 'Shadows'],
          'Components',
          '*',
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        "div",
        { 
          style: { 
            padding: "2rem",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          } 
        },
        React.createElement(Story)
      )
    },
  ],
}

export default preview
