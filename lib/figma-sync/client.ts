import { figmaConfig, FIGMA_API_BASE, getFigmaHeaders } from "./config"
import type { FigmaFile } from "./types"

/**
 * Figma API Client
 * 
 * Provides methods to interact with Figma REST API
 * Includes retry logic and error handling
 */

interface FetchOptions {
  retries?: number
  retryDelay?: number
}

/**
 * Fetch with retry logic
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  fetchOptions: FetchOptions = {}
): Promise<T> {
  const { retries = 5, retryDelay = 1000 } = fetchOptions

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getFigmaHeaders(),
          ...options.headers,
        },
      })

      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After")
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay * Math.pow(2, attempt) * 2
          console.log(`⏳ Rate limited. Waiting ${waitTime / 1000}s before retry...`)
          await new Promise((resolve) => setTimeout(resolve, waitTime))
          continue
        }

        const errorText = await response.text()
        throw new Error(
          `Figma API error (${response.status}): ${errorText || response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      const isLastAttempt = attempt === retries - 1
      
      if (isLastAttempt) {
        throw error
      }

      // Exponential backoff with jitter
      const delay = retryDelay * Math.pow(2, attempt) + Math.random() * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw new Error("Max retries exceeded")
}

/**
 * Get Figma file data
 */
export async function getFigmaFile(fileId: string = figmaConfig.fileId): Promise<FigmaFile> {
  const url = `${FIGMA_API_BASE}/files/${fileId}`
  
  try {
    const data = await fetchWithRetry<FigmaFile>(url)
    return data
  } catch (error) {
    throw new Error(`Failed to fetch Figma file ${fileId}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Get Figma file nodes (batched to avoid rate limits)
 * 
 * @param fileId - File ID (defaults to config fileId)
 * @param nodeIds - Array of node IDs to fetch
 * @param batchSize - Number of nodes to fetch per request (default: 10)
 */
export async function getFigmaFileNodes(
  fileId: string = figmaConfig.fileId,
  nodeIds: string[],
  batchSize: number = 10
): Promise<Record<string, any>> {
  const allNodes: Record<string, any> = {}
  
  // Process in batches to avoid rate limits
  for (let i = 0; i < nodeIds.length; i += batchSize) {
    const batch = nodeIds.slice(i, i + batchSize)
    const url = `${FIGMA_API_BASE}/files/${fileId}/nodes?ids=${batch.join(",")}`
    
    try {
      const data = await fetchWithRetry<{ nodes: Record<string, any> }>(url, {}, {
        retries: 5,
        retryDelay: 2000, // Longer delay for batched requests
      })
      
      Object.assign(allNodes, data.nodes || {})
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < nodeIds.length) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.warn(`⚠️  Failed to fetch batch of ${batch.length} nodes:`, error instanceof Error ? error.message : String(error))
      // Continue with next batch instead of failing completely
    }
  }
  
  return allNodes
}

/**
 * Get Figma file styles
 * 
 * @param fileId - File ID (defaults to config fileId)
 */
export async function getFigmaFileStyles(
  fileId: string = figmaConfig.fileId
): Promise<Record<string, any>> {
  const url = `${FIGMA_API_BASE}/files/${fileId}/styles`
  
  try {
    const data = await fetchWithRetry<{ meta: { styles: Record<string, any> } }>(url)
    return data.meta?.styles || {}
  } catch (error) {
    throw new Error(`Failed to fetch Figma styles: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Get style values from Figma using node IDs
 * 
 * This function fetches the actual style values (colors, typography, etc.)
 * by using the node_id from style metadata.
 * 
 * @param fileId - File ID (defaults to config fileId)
 * @param styleNodeIds - Array of node IDs from styles
 */
export async function getFigmaStyleValues(
  fileId: string = figmaConfig.fileId,
  styleNodeIds: string[]
): Promise<Record<string, any>> {
  if (styleNodeIds.length === 0) {
    return {}
  }
  
  // Fetch nodes in batches
  const allNodes: Record<string, any> = {}
  const batchSize = 10
  
  for (let i = 0; i < styleNodeIds.length; i += batchSize) {
    const batch = styleNodeIds.slice(i, i + batchSize)
    const url = `${FIGMA_API_BASE}/files/${fileId}/nodes?ids=${batch.join(",")}`
    
    try {
      const data = await fetchWithRetry<{ nodes: Record<string, { document: any }> }>(url, {}, {
        retries: 5,
        retryDelay: 2000,
      })
      
      // Merge nodes into result
      Object.assign(allNodes, data.nodes || {})
      
      // Add delay between batches
      if (i + batchSize < styleNodeIds.length) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.warn(`⚠️  Failed to fetch style values batch:`, error instanceof Error ? error.message : String(error))
    }
  }
  
  return allNodes
}

/**
 * Test Figma API connection
 */
export async function testFigmaConnection(): Promise<boolean> {
  try {
    await getFigmaFile()
    return true
  } catch (error) {
    console.error("Figma connection test failed:", error)
    return false
  }
}
