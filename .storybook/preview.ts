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
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
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
