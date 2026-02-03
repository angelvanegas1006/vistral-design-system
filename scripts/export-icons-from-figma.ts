/**
 * Export icons directly from Figma with correct names
 * 
 * This script:
 * 1. Reads icon names and node IDs from the extracted Figma data
 * 2. Exports each icon as SVG using Figma's export API
 * 3. Saves them organized by category
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { figmaConfig, FIGMA_API_BASE, getFigmaHeaders } from '../lib/figma-sync/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/assets/icons/library');
const FIGMA_DATA_PATH = path.join(__dirname, '../public/assets/icons/icon-names-from-figma.json');

// Categories to export (main icon categories from the design system)
const CATEGORIES_TO_EXPORT = [
  'maps',
  'buildings', 
  'amenities',
  'states--filters-and-sorting',
  'sorting',
  'navigation',
  'actions',
  'arrows',
  'calendar',
  'time',
  'user',
  'media',
  'files',
];

interface IconInfo {
  name: string;
  category: string;
  nodeId: string;
}

interface FigmaExportResponse {
  err: string | null;
  images: Record<string, string>;
}

/**
 * Export images from Figma
 */
async function exportFromFigma(nodeIds: string[]): Promise<Record<string, string>> {
  const url = `${FIGMA_API_BASE}/images/${figmaConfig.fileId}?ids=${nodeIds.join(',')}&format=svg`;
  
  const response = await fetch(url, {
    headers: getFigmaHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Figma export failed: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json() as FigmaExportResponse;
  
  if (data.err) {
    throw new Error(`Figma export error: ${data.err}`);
  }
  
  return data.images;
}

/**
 * Download SVG content from URL
 */
async function downloadSvg(url: string): Promise<string> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to download SVG: ${response.status}`);
  }
  
  return await response.text();
}

/**
 * Clean up icon name
 */
function cleanIconName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Clean up category name
 */
function cleanCategoryName(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log('🎨 Exporting icons from Figma...\n');
  
  // Read Figma data
  if (!fs.existsSync(FIGMA_DATA_PATH)) {
    console.error('❌ Figma data not found. Run extract-icon-names-from-figma.ts first.');
    return;
  }
  
  const figmaData = JSON.parse(fs.readFileSync(FIGMA_DATA_PATH, 'utf-8'));
  const iconsByCategory = figmaData.iconsByCategory as Record<string, IconInfo[]>;
  
  // Filter and prepare icons for export
  const iconsToExport: IconInfo[] = [];
  const seenNames = new Set<string>();
  
  for (const [category, icons] of Object.entries(iconsByCategory)) {
    const cleanCategory = cleanCategoryName(category);
    
    // Skip non-icon categories
    if (!CATEGORIES_TO_EXPORT.some(c => cleanCategory.includes(c) || c.includes(cleanCategory))) {
      continue;
    }
    
    for (const icon of icons) {
      const cleanName = cleanIconName(icon.name);
      
      // Skip duplicates, empty names, and category labels
      if (!cleanName || 
          cleanName.length < 2 || 
          cleanName === cleanCategory ||
          cleanName === 'newtag' ||
          seenNames.has(`${cleanCategory}/${cleanName}`)) {
        continue;
      }
      
      seenNames.add(`${cleanCategory}/${cleanName}`);
      iconsToExport.push({
        name: cleanName,
        category: cleanCategory,
        nodeId: icon.nodeId,
      });
    }
  }
  
  console.log(`📦 Found ${iconsToExport.length} icons to export\n`);
  
  // Group by category for summary
  const byCategory: Record<string, IconInfo[]> = {};
  for (const icon of iconsToExport) {
    if (!byCategory[icon.category]) {
      byCategory[icon.category] = [];
    }
    byCategory[icon.category].push(icon);
  }
  
  console.log('📊 Icons by category:');
  for (const [category, icons] of Object.entries(byCategory)) {
    console.log(`   ${category}: ${icons.length} icons`);
  }
  console.log('');
  
  // Create output directories
  for (const category of Object.keys(byCategory)) {
    const categoryDir = path.join(OUTPUT_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  }
  
  // Export in batches (Figma API limit)
  const BATCH_SIZE = 50;
  const exportedIcons: { name: string; category: string; file: string }[] = [];
  
  for (let i = 0; i < iconsToExport.length; i += BATCH_SIZE) {
    const batch = iconsToExport.slice(i, i + BATCH_SIZE);
    const nodeIds = batch.map(icon => icon.nodeId);
    
    console.log(`🔄 Exporting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(iconsToExport.length / BATCH_SIZE)}...`);
    
    try {
      // Get export URLs from Figma
      const exportUrls = await exportFromFigma(nodeIds);
      
      // Download and save each SVG
      for (const icon of batch) {
        const exportUrl = exportUrls[icon.nodeId];
        
        if (!exportUrl) {
          console.warn(`   ⚠️ No export URL for ${icon.category}/${icon.name}`);
          continue;
        }
        
        try {
          const svgContent = await downloadSvg(exportUrl);
          
          const fileName = `${icon.name}.svg`;
          const filePath = path.join(OUTPUT_DIR, icon.category, fileName);
          
          fs.writeFileSync(filePath, svgContent);
          
          exportedIcons.push({
            name: icon.name,
            category: icon.category,
            file: `${icon.category}/${fileName}`,
          });
          
          console.log(`   ✅ ${icon.category}/${icon.name}`);
        } catch (downloadError) {
          console.warn(`   ⚠️ Failed to download ${icon.category}/${icon.name}`);
        }
      }
      
      // Rate limit delay between batches
      if (i + BATCH_SIZE < iconsToExport.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`   ❌ Batch export failed:`, error instanceof Error ? error.message : String(error));
    }
  }
  
  // Save index file
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  const indexData = {
    exportedAt: new Date().toISOString(),
    totalIcons: exportedIcons.length,
    categories: [...new Set(exportedIcons.map(i => i.category))],
    icons: exportedIcons,
  };
  
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
  
  console.log(`\n✅ Exported ${exportedIcons.length} icons`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📋 Index: ${indexPath}`);
}

main().catch(console.error);
