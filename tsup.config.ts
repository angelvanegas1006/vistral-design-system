import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false, // Skipping DTS for faster builds - types inferred from source
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react", 
    "react-dom",
    "@radix-ui/react-dialog",
    "@radix-ui/react-select", 
    "@radix-ui/react-slot",
    "lucide-react"
  ],
  treeshake: true,
})
