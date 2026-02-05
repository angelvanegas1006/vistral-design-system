import { z } from 'zod'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

/**
 * Figma API Configuration
 *
 * Validates and exports Figma API credentials from environment variables.
 * This configuration is used by all Figma sync scripts.
 */

const figmaConfigSchema = z.object({
  token: z.string().min(1, 'FIGMA_TOKEN is required'),
  fileId: z.string().min(1, 'FIGMA_FILE_ID is required'),
})

/**
 * Validated Figma configuration
 *
 * Throws error if required environment variables are missing or invalid
 */
export const figmaConfig = figmaConfigSchema.parse({
  token: process.env.FIGMA_TOKEN,
  fileId: process.env.FIGMA_FILE_ID || 'i0plqavJ8VqpKeqr6TkLtD',
})

/**
 * Figma API base URL
 */
export const FIGMA_API_BASE = 'https://api.figma.com/v1'

/**
 * Get Figma API headers with authentication
 */
export function getFigmaHeaders() {
  return {
    'X-Figma-Token': figmaConfig.token,
    'Content-Type': 'application/json',
  }
}
