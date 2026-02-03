/**
 * Script to extract individual flags from a combined SVG file
 * Parses the large flag SVG and saves each flag as a separate file
 */

import * as fs from 'fs';
import * as path from 'path';

// Country codes mapping based on position (row-major order)
// This mapping is based on common flag collections and visual inspection
const COUNTRY_CODES = [
  // Row 1
  'dz', 'af', 'gb', 'al', 'us', 'ad', 'ao', 'ai', 'aq',
  // Row 2
  'bd', 'bb', 'bs', 'bh', 'be', 'bz', 'bj', 'bm', 'bt',
  // Row 3
  'bo', 'ba', 'bw', 'br', 'vg', 'bn', 'bg', 'bf', 'bi',
  // Row 4
  'cv', 'kh', 'cm', 'ca', 'ky', 'cf', 'td', 'cl', 'cn',
  // Row 5
  'co', 'km', 'cg', 'cd', 'ck', 'cr', 'ci', 'hr', 'cu',
  // Row 6
  'cy', 'cz', 'dk', 'dj', 'dm', 'do', 'ec', 'eg', 'sv',
  // Row 7
  'gq', 'er', 'ee', 'sz', 'et', 'eu', 'fk', 'fo', 'fj',
  // Row 8
  'fi', 'fr', 'gf', 'pf', 'ga', 'gm', 'ge', 'de', 'gh',
  // Row 9
  'gi', 'gr', 'gl', 'gd', 'gp', 'gu', 'gt', 'gg', 'gn',
  // Row 10
  'gw', 'gy', 'ht', 'hn', 'hk', 'hu', 'is', 'in', 'id',
  // Row 11
  'ir', 'iq', 'ie', 'im', 'il', 'it', 'jm', 'jp', 'je',
  // Row 12
  'jo', 'kz', 'ke', 'ki', 'xk', 'kw', 'kg', 'la', 'lv',
  // Row 13
  'lb', 'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mo', 'mg',
  // Row 14
  'mw', 'my', 'mv', 'ml', 'mt', 'mh', 'mq', 'mr', 'mu',
  // Row 15
  'yt', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ms', 'ma',
  // Row 16
  'mz', 'mm', 'na', 'nr', 'np', 'nl', 'nc', 'nz', 'ni',
  // Row 17
  'ne', 'ng', 'nu', 'nf', 'kp', 'mk', 'mp', 'no', 'om',
  // Row 18
  'pk', 'pw', 'ps', 'pa', 'pg', 'py', 'pe', 'ph', 'pn',
  // Row 19
  'pl', 'pt', 'pr', 'qa', 're', 'ro', 'ru', 'rw', 'bl',
  // Row 20
  'sh', 'kn', 'lc', 'mf', 'pm', 'vc', 'ws', 'sm', 'st',
  // Row 21
  'sa', 'sn', 'rs', 'sc', 'sl', 'sg', 'sx', 'sk', 'si',
  // Row 22
  'sb', 'so', 'za', 'gs', 'kr', 'ss', 'es', 'lk', 'sd',
  // Row 23
  'sr', 'se', 'ch', 'sy', 'tw', 'tj', 'tz', 'th', 'tl',
  // Row 24
  'tg', 'tk', 'to', 'tt', 'tn', 'tr', 'tm', 'tc', 'tv',
  // Row 25
  'ug', 'ua', 'ae', 'gb-eng', 'gb-nir', 'gb-sct', 'gb-wls', 'un', 'uy',
  // Row 26
  'uz', 'vu', 'va', 've', 'vn', 'wf', 'eh', 'ye', 'zm',
  // Row 27
  'zw', 'ax', 'bq', 'cw', 'gg-sark', 'ta', 'ac', 'ic', 'basque',
  // Additional flags
];

const FLAG_SIZE = 128; // Each flag is 128x128
const COLS_PER_ROW = 9; // Based on the SVG layout (5175 / 228 ≈ 22 per row in the original)

interface FlagGroup {
  id: string;
  clipPathId: string;
  content: string;
  row: number;
  col: number;
}

function extractFlags(svgContent: string): FlagGroup[] {
  const flags: FlagGroup[] = [];
  
  // Match all <g clip-path="url(#clip{N}_...)"> elements
  const groupRegex = /<g clip-path="url\(#(clip\d+_\d+_\d+)\)">([\s\S]*?)<\/g>/g;
  
  let match;
  let index = 0;
  
  while ((match = groupRegex.exec(svgContent)) !== null) {
    const clipPathId = match[1];
    const content = match[2].trim();
    
    // Skip empty groups
    if (!content) continue;
    
    // Calculate row and column from index
    const row = Math.floor(index / COLS_PER_ROW);
    const col = index % COLS_PER_ROW;
    
    flags.push({
      id: `flag-${index.toString().padStart(3, '0')}`,
      clipPathId,
      content,
      row,
      col,
    });
    
    index++;
  }
  
  return flags;
}

function extractClipPath(svgContent: string, clipPathId: string): string | null {
  const regex = new RegExp(`<clipPath id="${clipPathId}"[^>]*>([\\s\\S]*?)<\\/clipPath>`);
  const match = svgContent.match(regex);
  return match ? match[0] : null;
}

function createFlagSvg(flag: FlagGroup, clipPath: string): string {
  // Adjust coordinates - each flag group has paths that need to be translated
  // The original flags are positioned at various x,y coordinates
  // We need to normalize them to start at 0,0
  
  return `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
${flag.content}
<defs>
${clipPath}
</defs>
</svg>`;
}

function normalizeCoordinates(svgContent: string, offsetX: number, offsetY: number): string {
  // This would need complex path parsing to properly adjust coordinates
  // For now, we'll use the transform attribute
  return svgContent;
}

async function main() {
  const inputPath = path.join(__dirname, '../public/assets/flags/flag.svg');
  const outputDir = path.join(__dirname, '../public/assets/flags/countries');
  
  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    console.log('Input file not found at:', inputPath);
    console.log('Looking for alternative location...');
    
    // Try reading from transcript or other location
    return;
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
  
  // Extract all clip paths from defs section
  const defsMatch = svgContent.match(/<defs>([\s\S]*?)<\/defs>/);
  const defsContent = defsMatch ? defsMatch[1] : '';
  
  // Save each flag
  let savedCount = 0;
  for (let i = 0; i < flags.length; i++) {
    const flag = flags[i];
    const countryCode = COUNTRY_CODES[i] || `unknown-${i.toString().padStart(3, '0')}`;
    
    // Get clip path for this flag
    const clipPath = extractClipPath(svgContent, flag.clipPathId);
    if (!clipPath) {
      console.warn(`Clip path not found for flag ${i}: ${flag.clipPathId}`);
      continue;
    }
    
    const flagSvg = createFlagSvg(flag, clipPath);
    const outputPath = path.join(outputDir, `${countryCode}.svg`);
    
    fs.writeFileSync(outputPath, flagSvg);
    savedCount++;
  }
  
  console.log(`Saved ${savedCount} flag SVG files to ${outputDir}`);
  
  // Generate index file with all country codes
  const indexContent = flags.map((_, i) => COUNTRY_CODES[i] || `unknown-${i.toString().padStart(3, '0')}`);
  fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify({ flags: indexContent }, null, 2)
  );
  
  console.log('Generated index.json');
}

main().catch(console.error);
