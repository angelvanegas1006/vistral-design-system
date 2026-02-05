import React, { useState, useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// Import flags index
import flagsIndex from '../public/assets/flags/countries/index.json'

const meta: Meta = {
  title: 'Assets/Flags',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Country Flags

A comprehensive collection of **${flagsIndex.total} country and region flags** for the Vistral Design System.

## Usage

Flags are available as SVG files in \`public/assets/flags/countries/\`.

### Import in React

\`\`\`tsx
// As img src
<img src="/assets/flags/countries/united-states.svg" alt="United States" width={32} height={32} />

// With dynamic import
import USFlag from '@/assets/flags/countries/united-states.svg';
\`\`\`

## Available Flags

${flagsIndex.total} flags including:
- All UN member states
- Territories and dependencies
- Regional flags (England, Scotland, Wales, etc.)
- Organizations (EU, NATO, UN)
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

// Types
interface FlagData {
  code: string
  name: string
  file: string
}

// Flag image component
interface FlagImageProps {
  src: string
  alt: string
  size?: number
}

const FlagImage: React.FC<FlagImageProps> = ({ src, alt, size = 32 }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    style={{
      display: 'block',
      borderRadius: '4px',
      objectFit: 'cover',
    }}
  />
)

// Flag card component
interface FlagCardProps {
  flag: FlagData
  size?: number
}

const FlagCard: React.FC<FlagCardProps> = ({ flag, size = 48 }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(flag.file)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        backgroundColor: copied ? '#dcfce7' : '#fff',
        minWidth: '100px',
      }}
      title={`Click to copy: ${flag.file}`}
    >
      <FlagImage src={`/assets/flags/countries/${flag.file}`} alt={flag.name} size={size} />
      <span
        style={{
          marginTop: '8px',
          fontSize: '11px',
          color: copied ? '#16a34a' : '#374151',
          textAlign: 'center',
          fontWeight: 500,
        }}
      >
        {copied ? 'Copied!' : flag.name}
      </span>
      <span
        style={{
          fontSize: '9px',
          color: '#9ca3af',
          fontFamily: 'monospace',
        }}
      >
        {flag.code}
      </span>
    </div>
  )
}

// Region groupings
const REGIONS: Record<string, string[]> = {
  'North America': [
    'united-states',
    'canada',
    'mexico',
    'guatemala',
    'belize',
    'honduras',
    'el-salvador',
    'nicaragua',
    'costa-rica',
    'panama',
    'cuba',
    'jamaica',
    'haiti',
    'dominican-republic',
    'puerto-rico',
    'bahamas',
    'barbados',
    'trinidad-and-tobago',
  ],
  'South America': [
    'brazil',
    'argentina',
    'colombia',
    'peru',
    'venezuela',
    'chile',
    'ecuador',
    'bolivia',
    'paraguay',
    'uruguay',
    'guyana',
    'suriname',
  ],
  Europe: [
    'united-kingdom',
    'germany',
    'france',
    'italy',
    'spain',
    'portugal',
    'netherlands',
    'belgium',
    'switzerland',
    'austria',
    'poland',
    'czech-republic',
    'hungary',
    'romania',
    'greece',
    'sweden',
    'norway',
    'denmark',
    'finland',
    'ireland',
    'scotland',
    'wales',
    'england',
  ],
  Asia: [
    'china',
    'japan',
    'south-korea',
    'india',
    'indonesia',
    'thailand',
    'vietnam',
    'philippines',
    'malaysia',
    'singapore',
    'taiwan',
    'hong-kong',
    'pakistan',
    'bangladesh',
    'sri-lanka',
    'nepal',
    'myanmar',
  ],
  'Middle East': [
    'saudi-arabia',
    'united-arab-emirates',
    'israel',
    'turkey',
    'iran',
    'iraq',
    'egypt',
    'jordan',
    'lebanon',
    'syria',
    'qatar',
    'kuwait',
    'bahrain',
    'oman',
    'yemen',
    'palestine',
  ],
  Africa: [
    'south-africa',
    'nigeria',
    'kenya',
    'morocco',
    'algeria',
    'egypt',
    'ethiopia',
    'ghana',
    'tanzania',
    'uganda',
    'senegal',
    'ivory-coast',
    'cameroon',
    'zimbabwe',
    'zambia',
  ],
  Oceania: [
    'australia',
    'new-zealand',
    'fiji',
    'papua-new-guinea',
    'samoa',
    'tonga',
    'vanuatu',
    'solomon-islands',
  ],
  Organizations: ['european-union', 'united-nations', 'nato'],
}

/**
 * All Flags - Searchable Grid
 */
export const AllFlags: Story = {
  name: 'All Flags',
  render: () => {
    const [search, setSearch] = useState('')
    const [flagSize, setFlagSize] = useState(48)

    const filteredFlags = useMemo(() => {
      if (!search) return flagsIndex.flags
      const lower = search.toLowerCase()
      return flagsIndex.flags.filter(
        (flag: FlagData) =>
          flag.name.toLowerCase().includes(lower) || flag.code.toLowerCase().includes(lower)
      )
    }, [search])

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '600' }}>Country Flags</h1>
        <p style={{ margin: '0 0 24px', color: '#6b7280' }}>
          {flagsIndex.total} flags • Click any flag to copy filename
        </p>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search flags..."
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              minWidth: '250px',
            }}
          />

          <select
            value={flagSize}
            onChange={e => setFlagSize(Number(e.target.value))}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <option value={32}>32px</option>
            <option value={48}>48px</option>
            <option value={64}>64px</option>
            <option value={96}>96px</option>
          </select>
        </div>

        {search && (
          <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#6b7280' }}>
            Found {filteredFlags.length} flags
          </p>
        )}

        {/* Flags Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '10px',
          }}
        >
          {filteredFlags.map((flag: FlagData) => (
            <FlagCard key={flag.code} flag={flag} size={flagSize} />
          ))}
        </div>

        {filteredFlags.length === 0 && (
          <div
            style={{
              padding: '48px',
              textAlign: 'center',
              color: '#9ca3af',
            }}
          >
            No flags found matching "{search}"
          </div>
        )}
      </div>
    )
  },
}

/**
 * Flags by Region
 */
export const ByRegion: Story = {
  name: 'By Region',
  render: () => {
    const [flagSize, setFlagSize] = useState(48)

    const getFlagsForRegion = (codes: string[]) => {
      return codes
        .map(code => flagsIndex.flags.find((f: FlagData) => f.code === code))
        .filter(Boolean) as FlagData[]
    }

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '600' }}>Flags by Region</h1>
          <select
            value={flagSize}
            onChange={e => setFlagSize(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '6px',
            }}
          >
            <option value={32}>32px</option>
            <option value={48}>48px</option>
            <option value={64}>64px</option>
          </select>
        </div>

        {Object.entries(REGIONS).map(([region, codes]) => {
          const flags = getFlagsForRegion(codes)
          if (flags.length === 0) return null

          return (
            <div key={region} style={{ marginBottom: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{region}</h2>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '2px 8px',
                    borderRadius: '12px',
                  }}
                >
                  {flags.length}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {flags.map(flag => (
                  <FlagCard key={flag.code} flag={flag} size={flagSize} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
}

/**
 * Size Variants
 */
export const SizeVariants: Story = {
  render: () => {
    const sizes = [16, 24, 32, 48, 64, 96, 128]
    const sampleFlags = flagsIndex.flags.slice(0, 4) as FlagData[]

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '600' }}>Size Variants</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {sampleFlags.map(flag => (
            <div key={flag.code}>
              <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#6b7280' }}>{flag.name}</p>
              <div style={{ display: 'flex', alignItems: 'end', gap: '24px' }}>
                {sizes.map(size => (
                  <div key={size} style={{ textAlign: 'center' }}>
                    <FlagImage
                      src={`/assets/flags/countries/${flag.file}`}
                      alt={flag.name}
                      size={size}
                    />
                    <span
                      style={{
                        display: 'block',
                        marginTop: '8px',
                        fontSize: '10px',
                        color: '#9ca3af',
                      }}
                    >
                      {size}px
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * Usage Examples
 */
export const UsageExamples: Story = {
  render: () => {
    const sampleFlags = flagsIndex.flags.slice(0, 6) as FlagData[]

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '600' }}>Usage Examples</h2>

        {/* Country selector */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '500' }}>
            Country Selector
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              width: 'fit-content',
            }}
          >
            <FlagImage src="/assets/flags/countries/united-states.svg" alt="US" size={24} />
            <span style={{ fontSize: '14px' }}>United States</span>
            <span style={{ color: '#9ca3af' }}>▼</span>
          </div>
        </div>

        {/* Phone input */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '500' }}>
            Phone Number Input
          </h3>
          <div
            style={{
              display: 'flex',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              width: '300px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                borderRight: '2px solid #e5e7eb',
                backgroundColor: '#f9fafb',
              }}
            >
              <FlagImage src="/assets/flags/countries/united-states.svg" alt="US" size={20} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>+1</span>
            </div>
            <input
              type="text"
              placeholder="(555) 123-4567"
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Flag list */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '500' }}>
            Available Markets
          </h3>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {sampleFlags.map(flag => (
              <div
                key={flag.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '20px',
                }}
              >
                <FlagImage src={`/assets/flags/countries/${flag.file}`} alt={flag.name} size={20} />
                <span style={{ fontSize: '13px' }}>{flag.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '500' }}>Code Example</h3>
          <pre
            style={{
              padding: '16px',
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              borderRadius: '8px',
              fontSize: '13px',
              overflow: 'auto',
            }}
          >
            {`// Import flag data
import flagsIndex from '@/assets/flags/countries/index.json';

// Use as image
<img 
  src="/assets/flags/countries/united-states.svg" 
  alt="United States"
  width={32}
  height={32}
/>

// Get flag by code
const flag = flagsIndex.flags.find(f => f.code === 'united-states');
// { code: 'united-states', name: 'United States', file: 'united-states.svg' }`}
          </pre>
        </div>
      </div>
    )
  },
}
