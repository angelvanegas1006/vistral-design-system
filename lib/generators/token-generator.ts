#!/usr/bin/env tsx
/**
 * Token Generator
 * 
 * Generates CSS and TypeScript from design tokens JSON
 * Usage: npm run tokens:generate
 */

import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import { generateCSS } from "./css-generator"
import { generateTypeScript } from "./ts-generator"
import type { DesignTokens } from "../figma-sync/types"

const TOKENS_JSON_PATH = resolve(process.cwd(), "src/tokens/vistral-tokens.json")
const CSS_OUTPUT_PATH = resolve(process.cwd(), "src/tokens/vistral-tokens.css")
const TS_OUTPUT_PATH = resolve(process.cwd(), "src/tokens/types.ts")

async function main() {
  console.log("🔄 Generating CSS and TypeScript from tokens...\n")

  try {
    // Read tokens JSON
    console.log(`📖 Reading tokens from ${TOKENS_JSON_PATH}...`)
    const tokensJson = readFileSync(TOKENS_JSON_PATH, "utf-8")
    const tokens: DesignTokens = JSON.parse(tokensJson)

    // Generate CSS
    console.log("🎨 Generating CSS variables...")
    const css = generateCSS(tokens)
    writeFileSync(CSS_OUTPUT_PATH, css, "utf-8")
    console.log(`✅ Generated CSS: ${CSS_OUTPUT_PATH}`)

    // Generate TypeScript
    console.log("📝 Generating TypeScript types...")
    const ts = generateTypeScript(tokens)
    writeFileSync(TS_OUTPUT_PATH, ts, "utf-8")
    console.log(`✅ Generated TypeScript: ${TS_OUTPUT_PATH}`)

    console.log("\n✅ Token generation completed successfully!")
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      console.error(`\n❌ Tokens file not found: ${TOKENS_JSON_PATH}`)
      console.log("💡 Run 'npm run figma:sync:tokens' first to generate tokens from Figma")
    } else {
      console.error("\n❌ Token generation failed:", error instanceof Error ? error.message : String(error))
    }
    process.exit(1)
  }
}

main()
