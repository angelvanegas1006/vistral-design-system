/**
 * Script to extract individual icons from the Vistral icons sprite SVG
 * 
 * The source SVG contains icons arranged in a grid layout with:
 * - Multiple sections (container rectangles)
 * - Individual icon paths with fill="#212121"
 * - NEW badges with fill="#10B981"
 * 
 * Icons are approximately 20x20 pixels positioned in rows
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_SVG = path.join(__dirname, '../public/assets/icons/icons-sprite.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/assets/icons/library');

// Icon names mapping based on position (row, column) or can be inferred from visual inspection
// This will be updated as we identify icons
const ICON_CATEGORIES = {
  'navigation': ['search', 'location', 'location-check', 'truck', 'car'],
  'status': ['verified', 'hourglass', 'alert', 'info', 'bell', 'bell-minus', 'bell-plus', 'bell-default'],
  'ui': ['settings', 'filter', 'list', 'grid', 'apps', 'layout-sidebar', 'layout-grid'],
  'actions': ['check-double', 'check', 'close', 'plus', 'minus', 'expand', 'collapse'],
  'misc': ['dots', 'arrow-left', 'arrow-right', 'chat', 'logout', 'circle', 'circle-check', 'circle-x'],
  'time': ['clock', 'calendar', 'calendar-settings', 'calendar-download', 'calendar-upload', 'calendar-check'],
  'download': ['download-1', 'download-2', 'download-3', 'download-long', 'arrow-corner'],
  'arrows': ['arrow-down-line', 'sort', 'arrow-zigzag', 'swap', 'expand-arrows']
};

interface PathInfo {
  d: string;
  fill: string;
  fillRule?: string;
  clipRule?: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

interface IconGroup {
  paths: PathInfo[];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

/**
 * Parse all numbers from a path d attribute to find bounding box
 */
function getPathBounds(d: string): { minX: number; minY: number; maxX: number; maxY: number } {
  // Extract all numbers from path
  const numbers = d.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length < 2) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  // Parse command-based coordinates
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let currentX = 0, currentY = 0;
  
  // Simple parsing - extract coordinate pairs
  const commands = d.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];
  
  for (const cmd of commands) {
    const letter = cmd[0];
    const args = cmd.slice(1).trim().match(/-?\d+\.?\d*/g)?.map(Number) || [];
    
    switch (letter) {
      case 'M':
      case 'L':
        for (let i = 0; i < args.length; i += 2) {
          currentX = args[i];
          currentY = args[i + 1];
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case 'm':
      case 'l':
        for (let i = 0; i < args.length; i += 2) {
          currentX += args[i];
          currentY += args[i + 1];
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case 'H':
        currentX = args[0];
        minX = Math.min(minX, currentX);
        maxX = Math.max(maxX, currentX);
        break;
      case 'h':
        currentX += args[0];
        minX = Math.min(minX, currentX);
        maxX = Math.max(maxX, currentX);
        break;
      case 'V':
        currentY = args[0];
        minY = Math.min(minY, currentY);
        maxY = Math.max(maxY, currentY);
        break;
      case 'v':
        currentY += args[0];
        minY = Math.min(minY, currentY);
        maxY = Math.max(maxY, currentY);
        break;
      case 'C':
        for (let i = 0; i < args.length; i += 6) {
          // Control points and end point
          for (let j = 0; j < 6; j += 2) {
            minX = Math.min(minX, args[i + j]);
            maxX = Math.max(maxX, args[i + j]);
            minY = Math.min(minY, args[i + j + 1]);
            maxY = Math.max(maxY, args[i + j + 1]);
          }
          currentX = args[i + 4];
          currentY = args[i + 5];
        }
        break;
      case 'c':
        for (let i = 0; i < args.length; i += 6) {
          for (let j = 0; j < 6; j += 2) {
            minX = Math.min(minX, currentX + args[i + j]);
            maxX = Math.max(maxX, currentX + args[i + j]);
            minY = Math.min(minY, currentY + args[i + j + 1]);
            maxY = Math.max(maxY, currentY + args[i + j + 1]);
          }
          currentX += args[i + 4];
          currentY += args[i + 5];
        }
        break;
      case 'Q':
        for (let i = 0; i < args.length; i += 4) {
          minX = Math.min(minX, args[i], args[i + 2]);
          maxX = Math.max(maxX, args[i], args[i + 2]);
          minY = Math.min(minY, args[i + 1], args[i + 3]);
          maxY = Math.max(maxY, args[i + 1], args[i + 3]);
          currentX = args[i + 2];
          currentY = args[i + 3];
        }
        break;
      case 'A':
        for (let i = 0; i < args.length; i += 7) {
          currentX = args[i + 5];
          currentY = args[i + 6];
          minX = Math.min(minX, currentX);
          maxX = Math.max(maxX, currentX);
          minY = Math.min(minY, currentY);
          maxY = Math.max(maxY, currentY);
        }
        break;
      case 'Z':
      case 'z':
        // Close path - no coordinates
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
 * Translate a path's d attribute by offset
 */
function translatePath(d: string, offsetX: number, offsetY: number): string {
  // Parse and translate all coordinate values
  let result = '';
  let i = 0;
  
  while (i < d.length) {
    const char = d[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      result += char;
      i++;
      continue;
    }
    
    // Command letters
    if (/[A-Za-z]/.test(char)) {
      result += char;
      i++;
      continue;
    }
    
    // Parse number
    let numStr = '';
    while (i < d.length && (/[\d.\-]/.test(d[i]) || (d[i] === 'e' && /[\d]/.test(d[i-1])))) {
      numStr += d[i];
      i++;
    }
    
    if (numStr) {
      // Find which coordinate this is
      const beforeNum = result.slice(-50);
      const lastCmd = beforeNum.match(/[A-Za-z][^A-Za-z]*$/)?.[0]?.[0] || 'M';
      
      // Count preceding numbers to determine if X or Y
      const precedingNums = beforeNum.match(/[A-Za-z][^A-Za-z]*$/)?.[0]?.slice(1) || '';
      const numCount = (precedingNums.match(/-?\d+\.?\d*/g) || []).length;
      
      const num = parseFloat(numStr);
      let translatedNum = num;
      
      // Translate based on command type
      const upperCmd = lastCmd.toUpperCase();
      const isRelative = lastCmd === lastCmd.toLowerCase();
      
      if (!isRelative) {
        if (upperCmd === 'H') {
          translatedNum = num - offsetX;
        } else if (upperCmd === 'V') {
          translatedNum = num - offsetY;
        } else if (upperCmd === 'A') {
          // A command: rx ry x-axis-rotation large-arc-flag sweep-flag x y
          const pos = numCount % 7;
          if (pos === 5) translatedNum = num - offsetX;
          else if (pos === 6) translatedNum = num - offsetY;
        } else if (['M', 'L', 'T'].includes(upperCmd)) {
          if (numCount % 2 === 0) translatedNum = num - offsetX;
          else translatedNum = num - offsetY;
        } else if (['C', 'S', 'Q'].includes(upperCmd)) {
          if (numCount % 2 === 0) translatedNum = num - offsetX;
          else translatedNum = num - offsetY;
        }
      }
      
      result += translatedNum.toString();
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
    
    // Skip container backgrounds and borders
    if (fill === '#FCFCFD' || fill.includes('opacity')) continue;
    
    // Extract fill-rule and clip-rule
    const fillRuleMatch = attrs.match(/fill-rule="([^"]*)"/);
    const clipRuleMatch = attrs.match(/clip-rule="([^"]*)"/);
    
    const bounds = getPathBounds(d);
    
    paths.push({
      d,
      fill,
      fillRule: fillRuleMatch?.[1],
      clipRule: clipRuleMatch?.[1],
      minX: bounds.minX,
      minY: bounds.minY,
      maxX: bounds.maxX,
      maxY: bounds.maxY,
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY
    });
  }
  
  return paths;
}

/**
 * Group nearby paths into icons
 * Icons are typically 20x20 to 24x24 pixels
 */
function groupPathsIntoIcons(paths: PathInfo[]): IconGroup[] {
  // Filter to only icon paths (dark fill)
  const iconPaths = paths.filter(p => p.fill === '#212121');
  
  // Sort by position (top-left to bottom-right)
  iconPaths.sort((a, b) => {
    // Row comparison (with tolerance)
    const rowA = Math.floor(a.minY / 50);
    const rowB = Math.floor(b.minY / 50);
    if (rowA !== rowB) return rowA - rowB;
    return a.minX - b.minX;
  });
  
  const groups: IconGroup[] = [];
  const used = new Set<number>();
  
  // Grid-based grouping
  const GRID_SIZE = 48; // Expected icon spacing
  const TOLERANCE = 10;
  
  for (let i = 0; i < iconPaths.length; i++) {
    if (used.has(i)) continue;
    
    const basePath = iconPaths[i];
    const group: PathInfo[] = [basePath];
    used.add(i);
    
    // Find paths that belong to the same icon (nearby paths)
    for (let j = i + 1; j < iconPaths.length; j++) {
      if (used.has(j)) continue;
      
      const candidatePath = iconPaths[j];
      
      // Check if paths overlap or are very close
      const centerX1 = (basePath.minX + basePath.maxX) / 2;
      const centerY1 = (basePath.minY + basePath.maxY) / 2;
      const centerX2 = (candidatePath.minX + candidatePath.maxX) / 2;
      const centerY2 = (candidatePath.minY + candidatePath.maxY) / 2;
      
      const distance = Math.sqrt(Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2));
      
      // If within the same icon area
      if (distance < 30) {
        group.push(candidatePath);
        used.add(j);
      }
    }
    
    // Calculate group bounds
    const minX = Math.min(...group.map(p => p.minX));
    const minY = Math.min(...group.map(p => p.minY));
    const maxX = Math.max(...group.map(p => p.maxX));
    const maxY = Math.max(...group.map(p => p.maxY));
    
    // Only include groups that look like icons (reasonable size)
    const width = maxX - minX;
    const height = maxY - minY;
    
    if (width >= 10 && width <= 30 && height >= 10 && height <= 30) {
      groups.push({
        paths: group,
        minX,
        minY,
        maxX,
        maxY,
        width,
        height
      });
    }
  }
  
  return groups;
}

/**
 * Generate SVG for a single icon
 */
function generateIconSvg(group: IconGroup, size: number = 24): string {
  const padding = 2;
  const viewBox = `0 0 ${size} ${size}`;
  
  // Scale factor to fit in target size
  const iconWidth = group.width;
  const iconHeight = group.height;
  const scale = Math.min((size - padding * 2) / iconWidth, (size - padding * 2) / iconHeight);
  
  // Center the icon
  const offsetX = (size - iconWidth * scale) / 2;
  const offsetY = (size - iconHeight * scale) / 2;
  
  let pathsContent = '';
  
  for (const pathInfo of group.paths) {
    // Translate path to origin and apply scale
    const translatedD = translatePath(pathInfo.d, group.minX, group.minY);
    
    // Build path attributes
    let attrs = `d="${translatedD}" fill="${pathInfo.fill}"`;
    if (pathInfo.fillRule) attrs += ` fill-rule="${pathInfo.fillRule}"`;
    if (pathInfo.clipRule) attrs += ` clip-rule="${pathInfo.clipRule}"`;
    
    pathsContent += `  <path ${attrs}/>\n`;
  }
  
  return `<svg width="${size}" height="${size}" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)}) scale(${scale.toFixed(4)})">
${pathsContent}  </g>
</svg>`;
}

/**
 * Generate a simpler SVG without transformation (direct coordinates)
 */
function generateSimpleIconSvg(group: IconGroup): string {
  const padding = 1;
  const width = Math.ceil(group.width) + padding * 2;
  const height = Math.ceil(group.height) + padding * 2;
  
  let pathsContent = '';
  
  for (const pathInfo of group.paths) {
    // Translate path to origin with padding
    const translatedD = translatePath(pathInfo.d, group.minX - padding, group.minY - padding);
    
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
  console.log('Extracting icons from SVG sprite...\n');
  
  // Check if source file exists
  if (!fs.existsSync(SOURCE_SVG)) {
    console.log('Source SVG file not found!');
    console.log(`Please save the icons SVG to: ${SOURCE_SVG}`);
    console.log('\nCreating placeholder file...');
    
    fs.writeFileSync(SOURCE_SVG, `<!-- Paste the complete icons SVG content here -->
<svg width="1250" height="3030" viewBox="0 0 1250 3030" fill="none" xmlns="http://www.w3.org/2000/svg">
</svg>`);
    
    console.log(`\nPlaceholder created at: ${SOURCE_SVG}`);
    console.log('Please paste the complete SVG content and run this script again.');
    return;
  }
  
  // Read source SVG
  const svgContent = fs.readFileSync(SOURCE_SVG, 'utf-8');
  
  // Check if placeholder
  if (svgContent.includes('<!-- Paste the complete')) {
    console.log('Source SVG is a placeholder. Please paste the complete SVG content.');
    return;
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Extract all paths
  console.log('Extracting paths from SVG...');
  const paths = extractPaths(svgContent);
  console.log(`Found ${paths.length} path elements\n`);
  
  // Filter icon paths
  const iconPaths = paths.filter(p => p.fill === '#212121');
  console.log(`Found ${iconPaths.length} icon paths (fill="#212121")\n`);
  
  // Group into icons
  console.log('Grouping paths into icons...');
  const iconGroups = groupPathsIntoIcons(paths);
  console.log(`Identified ${iconGroups.length} potential icons\n`);
  
  // Generate icon files
  const iconIndex: { name: string; file: string; width: number; height: number }[] = [];
  
  for (let i = 0; i < iconGroups.length; i++) {
    const group = iconGroups[i];
    const iconName = `icon-${String(i + 1).padStart(3, '0')}`;
    const fileName = `${iconName}.svg`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    
    // Generate SVG
    const svgContent = generateSimpleIconSvg(group);
    fs.writeFileSync(filePath, svgContent);
    
    iconIndex.push({
      name: iconName,
      file: fileName,
      width: Math.round(group.width),
      height: Math.round(group.height)
    });
    
    console.log(`Created: ${fileName} (${Math.round(group.width)}x${Math.round(group.height)})`);
  }
  
  // Write index file
  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(iconIndex, null, 2));
  
  console.log(`\n✅ Extracted ${iconGroups.length} icons`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📋 Index file: ${indexPath}`);
}

main().catch(console.error);
