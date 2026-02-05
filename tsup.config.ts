import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Generate TypeScript declaration files
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/react-dialog',
    '@radix-ui/react-select',
    '@radix-ui/react-slot',
    'lucide-react',
  ],
  treeshake: true,
})
