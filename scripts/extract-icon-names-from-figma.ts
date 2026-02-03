/**
 * Extract icon names and categories from Figma
 * 
 * This script connects to Figma API, finds the Icons component set,
 * and extracts all icon names organized by category.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getFigmaFile } from '../lib/figma-sync/client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IconInfo {
  name: string;
  category: string;
  nodeId: string;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

/**
 * Recursively find nodes by type or name pattern
 */
function findNodes(
  node: FigmaNode,
  predicate: (node: FigmaNode) => boolean,
  results: FigmaNode[] = []
): FigmaNode[] {
  if (predicate(node)) {
    results.push(node);
  }
  
  if (node.children) {
    for (const child of node.children) {
      findNodes(child, predicate, results);
    }
  }
  
  return results;
}

/**
 * Extract icons from a category frame
 */
function extractIconsFromCategory(categoryNode: FigmaNode, categoryName: string): IconInfo[] {
  const icons: IconInfo[] = [];
  
  if (!categoryNode.children) return icons;
  
  for (const child of categoryNode.children) {
    // Icons are typically COMPONENT or INSTANCE nodes
    if (child.type === 'COMPONENT' || child.type === 'INSTANCE' || child.type === 'FRAME') {
      // Clean up icon name
      let iconName = child.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      // Skip if it's a category label or non-icon element
      if (iconName && !iconName.includes('label') && iconName.length > 1) {
        icons.push({
          name: iconName,
          category: categoryName,
          nodeId: child.id,
        });
      }
    }
    
    // Check children for nested icons
    if (child.children) {
      for (const grandChild of child.children) {
        if (grandChild.type === 'COMPONENT' || grandChild.type === 'INSTANCE') {
          let iconName = grandChild.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          if (iconName && iconName.length > 1) {
            icons.push({
              name: iconName,
              category: categoryName,
              nodeId: grandChild.id,
            });
          }
        }
      }
    }
  }
  
  return icons;
}

/**
 * Known icon category names to look for in Figma
 */
const ICON_CATEGORIES = [
  'Maps',
  'Buildings', 
  'Amenities',
  'States, filters and sorting',
  'States',
  'Filters',
  'Sorting',
  'Navigation',
  'Actions',
  'Media',
  'Communication',
  'Files',
  'Arrows',
  'Calendar',
  'Time',
  'User',
  'Social',
  'Misc',
  'Icons',
];

async function main() {
  console.log('🔍 Connecting to Figma...\n');
  
  try {
    const figmaFile = await getFigmaFile();
    console.log(`📄 File: ${figmaFile.name}`);
    console.log(`📅 Last modified: ${figmaFile.lastModified}\n`);
    
    const document = figmaFile.document as FigmaNode;
    
    // Find icon-related frames/pages
    const allIcons: IconInfo[] = [];
    
    // Search for frames with category names
    for (const categoryName of ICON_CATEGORIES) {
      const categoryNodes = findNodes(
        document,
        (node) => {
          const nameLower = node.name.toLowerCase();
          const categoryLower = categoryName.toLowerCase();
          return nameLower === categoryLower || 
                 nameLower.includes(categoryLower) ||
                 (node.type === 'FRAME' && nameLower.startsWith(categoryLower));
        }
      );
      
      for (const categoryNode of categoryNodes) {
        console.log(`📁 Found category: ${categoryNode.name} (${categoryNode.type})`);
        const icons = extractIconsFromCategory(categoryNode, categoryName.toLowerCase().replace(/[^a-z]/g, '-'));
        
        if (icons.length > 0) {
          console.log(`   └─ ${icons.length} icons found`);
          allIcons.push(...icons);
        }
      }
    }
    
    // Also search for component sets
    const componentSets = findNodes(
      document,
      (node) => node.type === 'COMPONENT_SET' && 
                (node.name.toLowerCase().includes('icon') || 
                 node.name.toLowerCase().includes('symbol'))
    );
    
    for (const componentSet of componentSets) {
      console.log(`🎨 Found component set: ${componentSet.name}`);
      
      if (componentSet.children) {
        for (const child of componentSet.children) {
          if (child.type === 'COMPONENT') {
            const iconName = child.name
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '');
            
            if (iconName && iconName.length > 1) {
              allIcons.push({
                name: iconName,
                category: componentSet.name.toLowerCase().replace(/\s+/g, '-'),
                nodeId: child.id,
              });
            }
          }
        }
      }
    }
    
    // Remove duplicates
    const uniqueIcons = Array.from(
      new Map(allIcons.map(icon => [icon.nodeId, icon])).values()
    );
    
    console.log(`\n✅ Total unique icons found: ${uniqueIcons.length}\n`);
    
    // Group by category
    const iconsByCategory: Record<string, IconInfo[]> = {};
    for (const icon of uniqueIcons) {
      if (!iconsByCategory[icon.category]) {
        iconsByCategory[icon.category] = [];
      }
      iconsByCategory[icon.category].push(icon);
    }
    
    // Print summary
    console.log('📊 Icons by category:');
    for (const [category, icons] of Object.entries(iconsByCategory)) {
      console.log(`   ${category}: ${icons.length} icons`);
    }
    
    // Save to file
    const outputPath = path.join(__dirname, '../public/assets/icons/icon-names-from-figma.json');
    const output = {
      extractedAt: new Date().toISOString(),
      totalIcons: uniqueIcons.length,
      categories: Object.keys(iconsByCategory),
      iconsByCategory,
      allIcons: uniqueIcons,
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n💾 Saved to: ${outputPath}`);
    
    // Also save a flat list for easy mapping
    const flatListPath = path.join(__dirname, '../public/assets/icons/icon-name-list.json');
    const flatList = uniqueIcons.map((icon, index) => ({
      index: index + 1,
      name: icon.name,
      category: icon.category,
      suggestedFile: `${icon.category}/${icon.name}.svg`,
    }));
    
    fs.writeFileSync(flatListPath, JSON.stringify(flatList, null, 2));
    console.log(`💾 Flat list saved to: ${flatListPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error && error.message.includes('FIGMA_TOKEN')) {
      console.log('\n💡 Make sure you have FIGMA_TOKEN set in .env.local');
    }
  }
}

main();
