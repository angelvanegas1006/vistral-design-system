#!/usr/bin/env tsx
import { getFigmaFile } from "../lib/figma-sync/client"

async function main() {
  const file = await getFigmaFile()
  
  const buttonComponents = Object.values(file.components)
    .filter(c => c.name.toLowerCase().includes("button"))
    .slice(0, 20)
    .map(c => c.name)
  
  console.log(`Found ${buttonComponents.length} components with "button":`)
  buttonComponents.forEach(name => console.log(`  - ${name}`))
}

main()
