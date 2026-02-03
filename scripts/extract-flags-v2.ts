/**
 * Script to extract individual flags from the combined flag.svg
 * Each flag is 128x128 pixels, arranged in a grid
 * 
 * The flags in the source SVG have absolute coordinates.
 * This script extracts each flag group and transforms coordinates to 0,0.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Country names/codes in order of appearance (left to right, top to bottom)
// Based on common flag circle icon sets
const FLAG_NAMES: string[] = [
  // Row 1 (y ~= 5-133)
  'algeria', 'afghanistan', 'uk', 'albania', 'united-states', 'andorra', 'angola', 'antigua-barbuda', 'argentina',
  // Row 2 (y ~= 233-361)
  'armenia', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus',
  // Row 3 (y ~= 461-589)
  'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'bosnia', 'botswana', 'brazil', 'brunei',
  // Row 4 (y ~= 689-817)
  'bulgaria', 'burkina-faso', 'burundi', 'cambodia', 'cameroon', 'canada', 'cape-verde', 'central-african-republic', 'chad',
  // Row 5 (y ~= 917-1045)
  'chile', 'china', 'colombia', 'comoros', 'congo-drc', 'congo', 'costa-rica', 'croatia', 'cuba',
  // Row 6 (y ~= 1145-1273)
  'cyprus', 'czech-republic', 'denmark', 'djibouti', 'dominica', 'dominican-republic', 'east-timor', 'ecuador', 'egypt',
  // Row 7 (y ~= 1373-1501)
  'el-salvador', 'equatorial-guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'fiji', 'finland', 'france',
  // Row 8 (y ~= 1601-1729)
  'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea',
  // Row 9 (y ~= 1829-1957)
  'guinea-bissau', 'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran',
  // Row 10 (y ~= 2057-2185)
  'iraq', 'ireland', 'israel', 'italy', 'ivory-coast', 'jamaica', 'japan', 'jordan', 'kazakhstan',
  // Row 11 (y ~= 2285-2413)
  'kenya', 'kiribati', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia',
  // Row 12 (y ~= 2513-2641)
  'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali',
  // Row 13 (y ~= 2741-2869)
  'malta', 'marshall-islands', 'mauritania', 'mauritius', 'mexico', 'micronesia', 'moldova', 'monaco', 'mongolia',
  // ... continues for all 260 flags
];

// Grid parameters based on SVG analysis
const FLAG_SIZE = 128;
const CELL_WIDTH = 228;  // 128 + 100 gap
const CELL_HEIGHT = 228;
const COLS = 9;  // Flags per row

interface ParsedFlag {
  index: number;
  clipPathId: string;
  groupContent: string;
  clipPathDef: string;
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number };
}

/**
 * Extract minimum coordinates from path data to determine offset
 */
function getPathBoundingBox(pathData: string): { minX: number; minY: number } {
  // Extract all numbers from path data
  const coords = pathData.match(/[+-]?\d+\.?\d*/g)?.map(Number) || [];
  
  let minX = Infinity;
  let minY = Infinity;
  
  // Simple heuristic: first few numbers often indicate position
  // M command takes x,y
  const mMatch = pathData.match(/M\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)/);
  if (mMatch) {
    minX = Math.min(minX, parseFloat(mMatch[1]));
    minY = Math.min(minY, parseFloat(mMatch[2]));
  }
  
  return { minX, minY };
}

/**
 * Transform path coordinates by subtracting offset
 */
function transformPath(pathData: string, offsetX: number, offsetY: number): string {
  // Replace coordinate pairs in the path
  return pathData.replace(/([MLHVCSQTAZmlhvcsqtaz])\s*([^MLHVCSQTAZmlhvcsqtaz]*)/g, 
    (match, command, coords) => {
      if (!coords.trim()) return match;
      
      const numbers = coords.match(/[+-]?\d+\.?\d*/g);
      if (!numbers) return match;
      
      const transformedNumbers = numbers.map((num, i) => {
        const val = parseFloat(num);
        // For commands that use x,y pairs, transform appropriately
        if ('MLCSQT'.includes(command.toUpperCase())) {
          // Even indices are X, odd are Y
          return i % 2 === 0 ? (val - offsetX).toFixed(2) : (val - offsetY).toFixed(2);
        } else if (command.toUpperCase() === 'H') {
          return (val - offsetX).toFixed(2);
        } else if (command.toUpperCase() === 'V') {
          return (val - offsetY).toFixed(2);
        } else if (command.toUpperCase() === 'A') {
          // Arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
          // Only transform the last x,y
          if (i === 5) return (val - offsetX).toFixed(2);
          if (i === 6) return (val - offsetY).toFixed(2);
          return num;
        }
        return num;
      });
      
      return command + ' ' + transformedNumbers.join(' ');
    }
  );
}

/**
 * Transform SVG element by adjusting all coordinate-based attributes
 */
function transformElement(element: string, offsetX: number, offsetY: number): string {
  // Transform d attribute in paths
  let transformed = element.replace(/\sd="([^"]*)"/g, (match, d) => {
    return ` d="${transformPath(d, offsetX, offsetY)}"`;
  });
  
  // Transform individual attributes like x, y, cx, cy, x1, y1, x2, y2
  const attrTransforms: [string, 'x' | 'y'][] = [
    ['x', 'x'], ['y', 'y'], ['cx', 'x'], ['cy', 'y'],
    ['x1', 'x'], ['y1', 'y'], ['x2', 'x'], ['y2', 'y'],
    ['width', 'x'], ['height', 'y']
  ];
  
  for (const [attr, axis] of attrTransforms) {
    const regex = new RegExp(`\\s${attr}="([+-]?\\d+\\.?\\d*)"`, 'g');
    transformed = transformed.replace(regex, (match, val) => {
      const offset = axis === 'x' ? offsetX : offsetY;
      // Don't transform width/height, only position attributes
      if (attr === 'width' || attr === 'height') return match;
      return ` ${attr}="${(parseFloat(val) - offset).toFixed(2)}"`;
    });
  }
  
  return transformed;
}

function extractFlags(svgContent: string): ParsedFlag[] {
  const flags: ParsedFlag[] = [];
  
  // Extract all groups with clip-path
  const groupRegex = /<g\s+clip-path="url\(#(clip\d+_\d+_\d+)\)">([\s\S]*?)<\/g>/g;
  
  let match;
  let index = 0;
  
  while ((match = groupRegex.exec(svgContent)) !== null) {
    const clipPathId = match[1];
    const groupContent = match[2];
    
    // Skip if empty
    if (!groupContent.trim()) continue;
    
    // Get the clip path definition
    const clipPathRegex = new RegExp(`<clipPath\\s+id="${clipPathId}"[^>]*>([\\s\\S]*?)</clipPath>`);
    const clipMatch = svgContent.match(clipPathRegex);
    const clipPathDef = clipMatch ? clipMatch[0] : '';
    
    // Calculate expected position based on grid
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    const expectedX = 5 + (col * CELL_WIDTH);
    const expectedY = 5 + (row * CELL_HEIGHT);
    
    flags.push({
      index,
      clipPathId,
      groupContent,
      clipPathDef,
      boundingBox: {
        minX: expectedX,
        minY: expectedY,
        maxX: expectedX + FLAG_SIZE,
        maxY: expectedY + FLAG_SIZE,
      },
    });
    
    index++;
  }
  
  return flags;
}

function createFlagSvg(flag: ParsedFlag): string {
  const offsetX = flag.boundingBox.minX;
  const offsetY = flag.boundingBox.minY;
  
  // Transform the group content
  const transformedContent = transformElement(flag.groupContent, offsetX, offsetY);
  
  // Transform the clip path
  const transformedClipPath = transformElement(flag.clipPathDef, offsetX, offsetY);
  
  return `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#${flag.clipPathId})">
${transformedContent}
</g>
<defs>
${transformedClipPath}
</defs>
</svg>`;
}

async function main() {
  const inputPath = path.join(__dirname, '../public/assets/flags/flag.svg');
  const outputDir = path.join(__dirname, '../public/assets/flags/countries');
  
  if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath);
    process.exit(1);
  }
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('Reading SVG file...');
  const svgContent = fs.readFileSync(inputPath, 'utf-8');
  
  console.log('Extracting flags...');
  const flags = extractFlags(svgContent);
  console.log(`Found ${flags.length} flags`);
  
  // Save each flag
  let savedCount = 0;
  const flagIndex: { code: string; name: string; file: string }[] = [];
  
  for (const flag of flags) {
    const name = FLAG_NAMES[flag.index] || `flag-${flag.index.toString().padStart(3, '0')}`;
    const filename = `${name}.svg`;
    
    try {
      const flagSvg = createFlagSvg(flag);
      const outputPath = path.join(outputDir, filename);
      fs.writeFileSync(outputPath, flagSvg);
      
      flagIndex.push({
        code: name,
        name: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        file: filename,
      });
      
      savedCount++;
      
      if (savedCount % 20 === 0) {
        console.log(`Saved ${savedCount} flags...`);
      }
    } catch (error) {
      console.error(`Error saving flag ${flag.index}:`, error);
    }
  }
  
  console.log(`\nSaved ${savedCount} flag SVG files to ${outputDir}`);
  
  // Save index
  fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify({ total: savedCount, flags: flagIndex }, null, 2)
  );
  
  console.log('Generated index.json');
}

main().catch(console.error);
