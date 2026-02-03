/**
 * Script to extract individual icons from the Vistral icons sprite SVG
 * Version 2 - Improved path extraction without coordinate corruption
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_SVG = path.join(__dirname, '../public/assets/icons/icons-sprite.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/assets/icons/library');

interface PathBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface PathInfo {
  d: string;
  fill: string;
  fillRule?: string;
  clipRule?: string;
  bounds: PathBounds;
}

interface IconGroup {
  paths: PathInfo[];
  bounds: PathBounds;
}

/**
 * Parse a path d attribute to find its bounding box
 * This is a simplified approach that extracts all numbers
 */
function getPathBounds(d: string): PathBounds {
  // Simple regex to extract coordinate-like numbers
  // This extracts numbers that appear in pairs (x, y coordinates)
  const coordPattern = /(-?\d+\.?\d*)/g;
  const matches = [...d.matchAll(coordPattern)];
  
  if (matches.length < 2) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }
  
  // Parse all numbers and find bounds
  // In SVG paths, the first coordinate of M/L commands is usually X
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  
  // Extract coordinate sequences from path commands
  const commands = d.match(/[MLHVCSQTAZmlhvcsqtaz][^MLHVCSQTAZmlhvcsqtaz]*/g) || [];
  
  for (const cmd of commands) {
    const letter = cmd[0];
    const nums = cmd.slice(1).trim().match(/-?\d+\.?\d*/g)?.map(Number) || [];
    
    // Handle different command types
    switch (letter.toUpperCase()) {
      case 'M':
      case 'L':
      case 'T':
        // Pairs of x,y coordinates
        for (let i = 0; i < nums.length; i += 2) {
          if (letter === letter.toUpperCase()) {
            minX = Math.min(minX, nums[i]);
            maxX = Math.max(maxX, nums[i]);
            if (i + 1 < nums.length) {
              minY = Math.min(minY, nums[i + 1]);
              maxY = Math.max(maxY, nums[i + 1]);
            }
          }
        }
        break;
      case 'H':
        // Horizontal line - x coordinate only
        if (letter === letter.toUpperCase()) {
          for (const n of nums) {
            minX = Math.min(minX, n);
            maxX = Math.max(maxX, n);
          }
        }
        break;
      case 'V':
        // Vertical line - y coordinate only
        if (letter === letter.toUpperCase()) {
          for (const n of nums) {
            minY = Math.min(minY, n);
            maxY = Math.max(maxY, n);
          }
        }
        break;
      case 'C':
        // Cubic bezier - 3 pairs of x,y
        for (let i = 0; i < nums.length; i += 6) {
          for (let j = 0; j < 6 && i + j + 1 < nums.length; j += 2) {
            if (letter === letter.toUpperCase()) {
              minX = Math.min(minX, nums[i + j]);
              maxX = Math.max(maxX, nums[i + j]);
              minY = Math.min(minY, nums[i + j + 1]);
              maxY = Math.max(maxY, nums[i + j + 1]);
            }
          }
        }
        break;
      case 'S':
      case 'Q':
        // S: 2 pairs, Q: 2 pairs
        for (let i = 0; i < nums.length; i += 2) {
          if (letter === letter.toUpperCase()) {
            minX = Math.min(minX, nums[i]);
            maxX = Math.max(maxX, nums[i]);
            if (i + 1 < nums.length) {
              minY = Math.min(minY, nums[i + 1]);
              maxY = Math.max(maxY, nums[i + 1]);
            }
          }
        }
        break;
      case 'A':
        // Arc - last 2 nums are x,y
        for (let i = 0; i < nums.length; i += 7) {
          if (i + 5 < nums.length && letter === letter.toUpperCase()) {
            minX = Math.min(minX, nums[i + 5]);
            maxX = Math.max(maxX, nums[i + 5]);
          }
          if (i + 6 < nums.length && letter === letter.toUpperCase()) {
            minY = Math.min(minY, nums[i + 6]);
            maxY = Math.max(maxY, nums[i + 6]);
          }
        }
        break;
    }
  }
  
  return {
    minX: minX === Infinity ? 0 : minX,
    minY: minY === Infinity ? 0 : minY,
    maxX: maxX === -Infinity ? 0 : maxX,
    maxY: maxY === -Infinity ? 0 : maxY
  };
}

/**
 * Translate a path d attribute by applying an offset
 * This version uses regex replacement to be more reliable
 */
function translatePath(d: string, offsetX: number, offsetY: number): string {
  let result = '';
  let lastCommand = 'M';
  let argIndex = 0;
  
  // Process character by character
  let i = 0;
  while (i < d.length) {
    const char = d[i];
    
    // Handle whitespace and commas
    if (/[\s,]/.test(char)) {
      result += char;
      i++;
      continue;
    }
    
    // Handle command letters
    if (/[MLHVCSQTAZmlhvcsqtaz]/.test(char)) {
      result += char;
      lastCommand = char;
      argIndex = 0;
      i++;
      continue;
    }
    
    // Parse a number
    let numStr = '';
    // Handle negative sign
    if (char === '-') {
      numStr += char;
      i++;
    }
    // Handle digits and decimal point
    while (i < d.length && /[\d.]/.test(d[i])) {
      numStr += d[i];
      i++;
    }
    // Handle scientific notation
    if (i < d.length && d[i] === 'e') {
      numStr += d[i];
      i++;
      if (i < d.length && /[-+]/.test(d[i])) {
        numStr += d[i];
        i++;
      }
      while (i < d.length && /\d/.test(d[i])) {
        numStr += d[i];
        i++;
      }
    }
    
    if (numStr) {
      const num = parseFloat(numStr);
      let translated = num;
      
      // Only translate absolute commands
      const isRelative = lastCommand === lastCommand.toLowerCase();
      const cmd = lastCommand.toUpperCase();
      
      if (!isRelative) {
        if (cmd === 'H') {
          translated = num - offsetX;
        } else if (cmd === 'V') {
          translated = num - offsetY;
        } else if (cmd === 'A') {
          // A: rx ry rotation large-arc sweep-flag x y
          const posInArc = argIndex % 7;
          if (posInArc === 5) translated = num - offsetX;
          else if (posInArc === 6) translated = num - offsetY;
        } else if (['M', 'L', 'T', 'C', 'S', 'Q'].includes(cmd)) {
          // For these, even indices are X, odd are Y
          if (argIndex % 2 === 0) translated = num - offsetX;
          else translated = num - offsetY;
        }
      }
      
      // Format the number nicely
      if (Number.isInteger(translated)) {
        result += translated.toString();
      } else {
        result += translated.toFixed(3).replace(/\.?0+$/, '');
      }
      
      argIndex++;
    }
  }
  
  return result;
}

/**
 * Extract all paths from SVG content
 */
function extractPaths(svgContent: string): PathInfo[] {
  const pathRegex = /<path\s+([^>]*)\/>/g;
  const paths: PathInfo[] = [];
  
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    const attrs = match[1];
    
    // Extract d attribute
    const dMatch = attrs.match(/d="([^"]*)"/);
    if (!dMatch) continue;
    
    const d = dMatch[1];
    
    // Extract fill
    const fillMatch = attrs.match(/fill="([^"]*)"/);
    const fill = fillMatch ? fillMatch[1] : '#212121';
    
    // Skip container backgrounds, borders, and badges
    if (fill === '#FCFCFD') continue; // Background
    if (fill.includes('opacity')) continue; // Border
    if (fill === '#10B981') continue; // NEW badge background
    if (fill === 'white') continue; // NEW badge text
    
    // Extract optional attributes
    const fillRuleMatch = attrs.match(/fill-rule="([^"]*)"/);
    const clipRuleMatch = attrs.match(/clip-rule="([^"]*)"/);
    
    const bounds = getPathBounds(d);
    
    paths.push({
      d,
      fill,
      fillRule: fillRuleMatch?.[1],
      clipRule: clipRuleMatch?.[1],
      bounds
    });
  }
  
  return paths;
}

/**
 * Group nearby paths into icons based on position
 */
function groupPathsIntoIcons(paths: PathInfo[]): IconGroup[] {
  // Filter to only icon paths (dark fill, reasonable size)
  const iconPaths = paths.filter(p => {
    if (p.fill !== '#212121') return false;
    const width = p.bounds.maxX - p.bounds.minX;
    const height = p.bounds.maxY - p.bounds.minY;
    // Filter out very small or very large elements
    return width >= 8 && width <= 35 && height >= 8 && height <= 35;
  });
  
  // Sort by position (row first, then column)
  iconPaths.sort((a, b) => {
    const rowA = Math.floor(a.bounds.minY / 50);
    const rowB = Math.floor(b.bounds.minY / 50);
    if (rowA !== rowB) return rowA - rowB;
    return a.bounds.minX - b.bounds.minX;
  });
  
  const groups: IconGroup[] = [];
  const used = new Set<number>();
  
  for (let i = 0; i < iconPaths.length; i++) {
    if (used.has(i)) continue;
    
    const basePath = iconPaths[i];
    const group: PathInfo[] = [basePath];
    used.add(i);
    
    // Calculate center of base path
    const centerX = (basePath.bounds.minX + basePath.bounds.maxX) / 2;
    const centerY = (basePath.bounds.minY + basePath.bounds.maxY) / 2;
    
    // Find other paths that belong to the same icon
    for (let j = i + 1; j < iconPaths.length; j++) {
      if (used.has(j)) continue;
      
      const candidate = iconPaths[j];
      const candCenterX = (candidate.bounds.minX + candidate.bounds.maxX) / 2;
      const candCenterY = (candidate.bounds.minY + candidate.bounds.maxY) / 2;
      
      const distance = Math.sqrt(
        Math.pow(candCenterX - centerX, 2) + 
        Math.pow(candCenterY - centerY, 2)
      );
      
      // If within same icon area (icons are roughly 20-24px with 48px grid)
      if (distance < 20) {
        group.push(candidate);
        used.add(j);
      }
    }
    
    // Calculate group bounds
    const groupBounds = {
      minX: Math.min(...group.map(p => p.bounds.minX)),
      minY: Math.min(...group.map(p => p.bounds.minY)),
      maxX: Math.max(...group.map(p => p.bounds.maxX)),
      maxY: Math.max(...group.map(p => p.bounds.maxY))
    };
    
    const width = groupBounds.maxX - groupBounds.minX;
    const height = groupBounds.maxY - groupBounds.minY;
    
    // Only include reasonable icon sizes
    if (width >= 10 && width <= 30 && height >= 10 && height <= 30) {
      groups.push({
        paths: group,
        bounds: groupBounds
      });
    }
  }
  
  return groups;
}

/**
 * Generate SVG content for an icon
 */
function generateIconSvg(group: IconGroup): string {
  const padding = 1;
  const width = Math.ceil(group.bounds.maxX - group.bounds.minX) + padding * 2;
  const height = Math.ceil(group.bounds.maxY - group.bounds.minY) + padding * 2;
  
  const offsetX = group.bounds.minX - padding;
  const offsetY = group.bounds.minY - padding;
  
  let pathsContent = '';
  
  for (const pathInfo of group.paths) {
    const translatedD = translatePath(pathInfo.d, offsetX, offsetY);
    
    let attrs = `d="${translatedD}" fill="${pathInfo.fill}"`;
    if (pathInfo.fillRule) attrs += ` fill-rule="${pathInfo.fillRule}"`;
    if (pathInfo.clipRule) attrs += ` clip-rule="${pathInfo.clipRule}"`;
    
    pathsContent += `  <path ${attrs}/>\n`;
  }
  
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
${pathsContent}</svg>`;
}

/**
 * Main extraction function
 */
async function main() {
  console.log('🎨 Extracting icons from SVG sprite (v2)...\n');
  
  // Check source file
  if (!fs.existsSync(SOURCE_SVG)) {
    console.log('❌ Source SVG file not found!');
    console.log(`   Path: ${SOURCE_SVG}`);
    return;
  }
  
  // Read source
  const svgContent = fs.readFileSync(SOURCE_SVG, 'utf-8');
  console.log(`📄 Source file size: ${(svgContent.length / 1024).toFixed(1)}KB`);
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Clear previous output
  const existingFiles = fs.readdirSync(OUTPUT_DIR);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(OUTPUT_DIR, file));
  }
  
  // Extract paths
  console.log('\n📦 Extracting paths...');
  const paths = extractPaths(svgContent);
  console.log(`   Found ${paths.length} path elements`);
  
  const iconPaths = paths.filter(p => p.fill === '#212121');
  console.log(`   Found ${iconPaths.length} icon paths`);
  
  // Group into icons
  console.log('\n🔗 Grouping paths into icons...');
  const iconGroups = groupPathsIntoIcons(paths);
  console.log(`   Identified ${iconGroups.length} icons\n`);
  
  // Generate icon files
  const iconIndex: { name: string; file: string; width: number; height: number }[] = [];
  
  console.log('💾 Generating icon files...');
  for (let i = 0; i < iconGroups.length; i++) {
    const group = iconGroups[i];
    const iconName = `icon-${String(i + 1).padStart(3, '0')}`;
    const fileName = `${iconName}.svg`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    
    const svg = generateIconSvg(group);
    fs.writeFileSync(filePath, svg);
    
    const width = Math.round(group.bounds.maxX - group.bounds.minX);
    const height = Math.round(group.bounds.maxY - group.bounds.minY);
    
    iconIndex.push({ name: iconName, file: fileName, width, height });
  }
  
  // Write index
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(iconIndex, null, 2));
  
  console.log(`\n✅ Extracted ${iconGroups.length} icons`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📋 Index: ${indexPath}`);
}

main().catch(console.error);
