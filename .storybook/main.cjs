const path = require("path")

/** @type {import('@storybook/react-webpack5').StorybookConfig} */
const config = {
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
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
    // Resolve paths
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
    
    const rules = config.module?.rules || []
    
    // Ensure TypeScript is handled
    const hasTsLoader = rules.some(
      (rule) => rule.test && rule.test.toString().includes("tsx")
    )
    
    if (!hasTsLoader) {
      rules.push({
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
    }
    
    return config
  },
}

module.exports = config
