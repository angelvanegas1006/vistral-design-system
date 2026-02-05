import React, { useState, useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const meta: Meta = {
  title: 'Assets/Icons (Lucide)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Lucide Icons

The Vistral Design System uses **Lucide** icons - a beautiful & consistent icon toolkit.

## Installation

\`\`\`bash
npm install lucide-react
\`\`\`

## Usage

\`\`\`tsx
import { Search, MapPin, Home, Bell } from 'lucide-react';

// Basic usage
<Search />

// With size
<Search size={24} />

// With color
<Search color="#4361ee" />

// With stroke width
<Search strokeWidth={1.5} />

// With className
<Search className="text-blue-500" />
\`\`\`

## Icon Categories

Icons are grouped by function:
- **Maps & Navigation**: Search, MapPin, Navigation, Compass, Route
- **Buildings**: Home, Building, Store, Warehouse, Hotel
- **Amenities**: Bed, Bath, Pool, Sofa, Trees
- **Actions**: Check, X, Plus, Minus, Edit, Trash
- **Arrows**: ChevronUp/Down/Left/Right, ArrowUp/Down/Left/Right
- **UI**: Menu, Filter, Grid, List, Settings
- **User**: User, Users, UserPlus, UserCheck
- **Time & Calendar**: Calendar, Clock, Timer
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

// Get all icon names (excluding non-icon exports)
const allIconNames = Object.keys(LucideIcons).filter(
  name =>
    name !== 'default' &&
    name !== 'createLucideIcon' &&
    name !== 'icons' &&
    typeof (LucideIcons as any)[name] === 'function' &&
    name[0] === name[0].toUpperCase()
)

// Icon categories for the design system
const ICON_CATEGORIES: Record<string, string[]> = {
  'Maps & Navigation': [
    'Search',
    'SearchX',
    'MapPin',
    'MapPinOff',
    'MapPinCheck',
    'MapPinPlus',
    'MapPinMinus',
    'MapPinned',
    'Map',
    'Navigation',
    'Navigation2',
    'Compass',
    'Route',
    'RouteOff',
    'Locate',
    'LocateFixed',
    'LocateOff',
    'Globe',
    'Globe2',
  ],
  Buildings: [
    'Home',
    'House',
    'HousePlus',
    'Building',
    'Building2',
    'Store',
    'Warehouse',
    'Hotel',
    'Hospital',
    'Landmark',
    'Factory',
    'School',
    'Church',
  ],
  Amenities: [
    'Bed',
    'BedDouble',
    'BedSingle',
    'Bath',
    'ShowerHead',
    'Sofa',
    'Armchair',
    'Lamp',
    'LampDesk',
    'LampCeiling',
    'Fence',
    'Trees',
    'TreePalm',
    'TreePine',
    'Flower',
    'Flower2',
    'Waves',
    'Droplets',
    'Wind',
    'Sun',
    'Moon',
    'Tv',
    'Wifi',
    'Car',
    'Bike',
    'ParkingCircle',
    'Accessibility',
  ],
  'Status & Alerts': [
    'Check',
    'CheckCheck',
    'CheckCircle',
    'CheckCircle2',
    'X',
    'XCircle',
    'AlertCircle',
    'AlertTriangle',
    'Info',
    'HelpCircle',
    'Bell',
    'BellOff',
    'BellPlus',
    'BellMinus',
    'BellRing',
    'CircleAlert',
    'ShieldCheck',
    'ShieldX',
    'BadgeCheck',
    'BadgeX',
    'BadgeAlert',
    'BadgeInfo',
  ],
  Actions: [
    'Plus',
    'Minus',
    'PlusCircle',
    'MinusCircle',
    'Edit',
    'Edit2',
    'Edit3',
    'Pencil',
    'PenLine',
    'Trash',
    'Trash2',
    'Copy',
    'Clipboard',
    'Download',
    'Upload',
    'Share',
    'Share2',
    'ExternalLink',
    'Link',
    'Unlink',
    'Eye',
    'EyeOff',
    'Lock',
    'Unlock',
    'Key',
    'Settings',
    'Settings2',
    'Sliders',
    'SlidersHorizontal',
    'Filter',
    'FilterX',
    'RefreshCw',
    'RefreshCcw',
    'RotateCw',
    'RotateCcw',
    'Undo',
    'Redo',
    'Save',
    'FolderOpen',
    'FileText',
  ],
  'Arrows & Chevrons': [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUpRight',
    'ArrowUpLeft',
    'ArrowDownRight',
    'ArrowDownLeft',
    'ChevronUp',
    'ChevronDown',
    'ChevronLeft',
    'ChevronRight',
    'ChevronsUp',
    'ChevronsDown',
    'ChevronsLeft',
    'ChevronsRight',
    'ChevronFirst',
    'ChevronLast',
    'ArrowUpDown',
    'ArrowLeftRight',
    'MoveUp',
    'MoveDown',
    'MoveLeft',
    'MoveRight',
    'Move',
    'Maximize',
    'Minimize',
    'Maximize2',
    'Minimize2',
    'Expand',
    'Shrink',
  ],
  'UI Elements': [
    'Menu',
    'MoreHorizontal',
    'MoreVertical',
    'Grid',
    'Grid2X2',
    'Grid3X3',
    'LayoutGrid',
    'LayoutList',
    'LayoutTemplate',
    'List',
    'ListOrdered',
    'Table',
    'Table2',
    'Columns',
    'Rows',
    'PanelLeft',
    'PanelRight',
    'PanelTop',
    'PanelBottom',
    'Sidebar',
    'SidebarOpen',
    'SidebarClose',
    'Layers',
    'Layers2',
    'Layers3',
    'Square',
    'Circle',
    'Triangle',
  ],
  'User & People': [
    'User',
    'UserPlus',
    'UserMinus',
    'UserCheck',
    'UserX',
    'UserCog',
    'UserCircle',
    'UserCircle2',
    'Users',
    'Users2',
    'Contact',
    'Contact2',
    'UserRound',
    'UserRoundPlus',
    'UserRoundMinus',
    'UserRoundCheck',
    'UserRoundX',
    'UsersRound',
    'CircleUser',
    'CircleUserRound',
  ],
  'Time & Calendar': [
    'Calendar',
    'CalendarDays',
    'CalendarCheck',
    'CalendarCheck2',
    'CalendarX',
    'CalendarPlus',
    'CalendarMinus',
    'CalendarClock',
    'CalendarSearch',
    'CalendarRange',
    'CalendarHeart',
    'Clock',
    'Clock1',
    'Clock2',
    'Clock3',
    'Clock4',
    'Clock5',
    'Clock6',
    'Clock7',
    'Clock8',
    'Clock9',
    'Clock10',
    'Clock11',
    'Clock12',
    'Timer',
    'TimerOff',
    'TimerReset',
    'Hourglass',
    'History',
    'AlarmClock',
    'AlarmClockOff',
    'Watch',
    'Stopwatch',
  ],
  Communication: [
    'Mail',
    'MailOpen',
    'MailPlus',
    'MailMinus',
    'MailCheck',
    'MailX',
    'MessageCircle',
    'MessageSquare',
    'MessagesSquare',
    'Phone',
    'PhoneCall',
    'PhoneIncoming',
    'PhoneOutgoing',
    'PhoneMissed',
    'PhoneOff',
    'Video',
    'VideoOff',
    'Mic',
    'MicOff',
    'Volume',
    'Volume1',
    'Volume2',
    'VolumeX',
    'Send',
    'SendHorizontal',
    'Reply',
    'ReplyAll',
    'Forward',
  ],
  'Media & Files': [
    'Image',
    'Images',
    'Camera',
    'CameraOff',
    'Video',
    'Film',
    'Music',
    'Music2',
    'Headphones',
    'Play',
    'Pause',
    'PlayCircle',
    'PauseCircle',
    'SkipBack',
    'SkipForward',
    'Rewind',
    'FastForward',
    'File',
    'FileText',
    'FileImage',
    'FileVideo',
    'FileAudio',
    'FilePlus',
    'FileMinus',
    'FileCheck',
    'FileX',
    'Folder',
    'FolderOpen',
    'FolderPlus',
    'FolderMinus',
    'FolderCheck',
  ],
  Commerce: [
    'ShoppingCart',
    'ShoppingBag',
    'Package',
    'Package2',
    'PackageCheck',
    'PackageX',
    'PackagePlus',
    'PackageMinus',
    'PackageSearch',
    'PackageOpen',
    'Truck',
    'CreditCard',
    'Wallet',
    'Wallet2',
    'Receipt',
    'Tag',
    'Tags',
    'Percent',
    'DollarSign',
    'Euro',
    'PoundSterling',
    'Banknote',
    'Coins',
    'PiggyBank',
    'Landmark',
    'Store',
    'Building',
    'Building2',
  ],
  'Social & Favorites': [
    'Heart',
    'HeartOff',
    'HeartCrack',
    'HeartHandshake',
    'ThumbsUp',
    'ThumbsDown',
    'Star',
    'StarOff',
    'StarHalf',
    'Bookmark',
    'BookmarkPlus',
    'BookmarkMinus',
    'BookmarkCheck',
    'BookmarkX',
    'Flag',
    'FlagOff',
    'Award',
    'Trophy',
    'Medal',
    'Crown',
    'Gem',
    'Gift',
    'Cake',
    'PartyPopper',
  ],
}

// Icon card component
interface IconCardProps {
  name: string
  Icon: LucideIcon
  size?: number
}

const IconCard: React.FC<IconCardProps> = ({ name, Icon, size = 24 }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`<${name} />`)
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
        padding: '12px 8px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        backgroundColor: copied ? '#dcfce7' : '#fff',
        minWidth: '80px',
      }}
      title={`Click to copy: <${name} />`}
    >
      <Icon size={size} color="#212121" />
      <span
        style={{
          marginTop: '8px',
          fontSize: '9px',
          color: copied ? '#16a34a' : '#6b7280',
          textAlign: 'center',
          wordBreak: 'break-word',
          maxWidth: '70px',
        }}
      >
        {copied ? 'Copied!' : name}
      </span>
    </div>
  )
}

// Category section
interface CategorySectionProps {
  category: string
  iconNames: string[]
  iconSize?: number
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  iconNames,
  iconSize = 24,
}) => {
  const validIcons = iconNames.filter(name => (LucideIcons as any)[name])

  if (validIcons.length === 0) return null

  return (
    <div style={{ marginBottom: '32px' }}>
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
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{category}</h3>
        <span
          style={{
            fontSize: '12px',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '2px 8px',
            borderRadius: '12px',
          }}
        >
          {validIcons.length}
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: '8px',
        }}
      >
        {validIcons.map(name => {
          const Icon = (LucideIcons as any)[name] as LucideIcon
          return <IconCard key={name} name={name} Icon={Icon} size={iconSize} />
        })}
      </div>
    </div>
  )
}

/**
 * All Icons by Category
 */
export const ByCategory: Story = {
  name: 'All Icons (by Category)',
  render: () => {
    const [search, setSearch] = useState('')
    const [iconSize, setIconSize] = useState(24)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const filteredCategories = useMemo(() => {
      let categories = { ...ICON_CATEGORIES }

      if (selectedCategory !== 'all') {
        categories = { [selectedCategory]: ICON_CATEGORIES[selectedCategory] || [] }
      }

      if (search) {
        const lower = search.toLowerCase()
        const filtered: Record<string, string[]> = {}

        for (const [cat, icons] of Object.entries(categories)) {
          const matches = icons.filter(name => name.toLowerCase().includes(lower))
          if (matches.length > 0) {
            filtered[cat] = matches
          }
        }
        return filtered
      }

      return categories
    }, [search, selectedCategory])

    const totalIcons = Object.values(filteredCategories).flat().length

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '600' }}>Lucide Icons</h1>
        <p style={{ margin: '0 0 24px', color: '#6b7280' }}>
          {allIconNames.length}+ icons • Click to copy import
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
            placeholder="Search icons..."
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              minWidth: '200px',
            }}
          />

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <option value="all">All Categories</option>
            {Object.keys(ICON_CATEGORIES).map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={iconSize}
            onChange={e => setIconSize(Number(e.target.value))}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <option value={16}>16px</option>
            <option value={20}>20px</option>
            <option value={24}>24px</option>
            <option value={32}>32px</option>
          </select>
        </div>

        {search && (
          <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#6b7280' }}>
            Found {totalIcons} icons
          </p>
        )}

        {Object.entries(filteredCategories).map(([category, icons]) => (
          <CategorySection
            key={category}
            category={category}
            iconNames={icons}
            iconSize={iconSize}
          />
        ))}
      </div>
    )
  },
}

/**
 * Maps & Navigation Icons
 */
export const MapsNavigation: Story = {
  name: 'Maps & Navigation',
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <CategorySection
        category="Maps & Navigation"
        iconNames={ICON_CATEGORIES['Maps & Navigation']}
      />
    </div>
  ),
}

/**
 * Status & Alerts Icons
 */
export const StatusAlerts: Story = {
  name: 'Status & Alerts',
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <CategorySection category="Status & Alerts" iconNames={ICON_CATEGORIES['Status & Alerts']} />
    </div>
  ),
}

/**
 * Actions Icons
 */
export const Actions: Story = {
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <CategorySection category="Actions" iconNames={ICON_CATEGORIES['Actions']} />
    </div>
  ),
}

/**
 * Size & Color Variants
 */
export const Variants: Story = {
  name: 'Size & Color Variants',
  render: () => {
    const { Search, MapPin, Home, Bell, Heart, Star } = LucideIcons
    const icons = [
      { Icon: Search, name: 'Search' },
      { Icon: MapPin, name: 'MapPin' },
      { Icon: Home, name: 'Home' },
      { Icon: Bell, name: 'Bell' },
      { Icon: Heart, name: 'Heart' },
      { Icon: Star, name: 'Star' },
    ]
    const sizes = [16, 20, 24, 32, 48]
    const colors = [
      { name: 'Default', value: '#212121' },
      { name: 'Primary', value: '#4361ee' },
      { name: 'Success', value: '#10b981' },
      { name: 'Warning', value: '#f59e0b' },
      { name: 'Error', value: '#ef4444' },
    ]

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ margin: '0 0 24px' }}>Size Variants</h2>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}
        >
          {icons.slice(0, 3).map(({ Icon, name }) => (
            <div key={name}>
              <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#6b7280' }}>{name}</p>
              <div style={{ display: 'flex', alignItems: 'end', gap: '24px' }}>
                {sizes.map(size => (
                  <div key={size} style={{ textAlign: 'center' }}>
                    <Icon size={size} />
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

        <h2 style={{ margin: '0 0 24px' }}>Color Variants</h2>

        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {colors.map(({ name, value }) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                }}
              >
                {icons.map(({ Icon, name: iconName }) => (
                  <Icon key={iconName} size={24} color={value} />
                ))}
              </div>
              <span
                style={{ display: 'block', marginTop: '8px', fontSize: '12px', color: '#6b7280' }}
              >
                {name}
              </span>
              <code style={{ fontSize: '10px', color: value }}>{value}</code>
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
    const { Search, Home, Bell, ChevronRight, Plus, Heart } = LucideIcons

    return (
      <div style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        <h2 style={{ margin: '0 0 24px' }}>Usage Examples</h2>

        {/* Button */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '500' }}>
            Button with Icon
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#4361ee',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Search size={18} />
              Search
            </button>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <Plus size={18} />
              Add Property
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '500' }}>Navigation</h3>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              width: '240px',
              padding: '8px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
            }}
          >
            {[
              { icon: Home, label: 'Home', active: true },
              { icon: Search, label: 'Search' },
              { icon: Heart, label: 'Favorites' },
              { icon: Bell, label: 'Notifications' },
            ].map(({ icon: Icon, label, active }) => (
              <a
                key={label}
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: active ? '#4361ee' : '#374151',
                  backgroundColor: active ? '#e8ecfc' : 'transparent',
                  fontSize: '14px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={20} />
                  {label}
                </span>
                <ChevronRight size={16} color="#9ca3af" />
              </a>
            ))}
          </nav>
        </div>

        {/* Code */}
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '500' }}>Code Example</h3>
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
            {`import { Search, MapPin, Home } from 'lucide-react';

// Basic
<Search />

// With props
<Search size={24} color="#4361ee" strokeWidth={2} />

// In a button
<button>
  <Search size={18} />
  Search
</button>`}
          </pre>
        </div>
      </div>
    )
  },
}
