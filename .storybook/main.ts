import type { StorybookConfig } from "@storybook/react-webpack5"
import path from "path"

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      }
      config.resolve.extensions = [
        ...(config.resolve.extensions || []),
        ".ts",
        ".tsx",
      ]
    }

    // Add TypeScript loader
    config.module = config.module || {}
    config.module.rules = config.module.rules || []
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            transpileOnly: true,
            compilerOptions: {
              jsx: "react-jsx",
            },
          },
        },
      ],
    })

    // Reduce chunk splitting to avoid loading failures
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    }

    return config
  },
}

export default config
