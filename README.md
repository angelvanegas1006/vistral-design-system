# Vistral Design System

React design system with components synced from Figma.

## Installation

### From npm (Recommended)

```bash
npm install @vistral/design-system
```

### Required Peer Dependencies

The design system requires these peer dependencies:

```bash
npm install react react-dom lucide-react @radix-ui/react-slot
```

### Optional Dependencies

Only install if you use Dialog or Select components:

```bash
# For Dialog component
npm install @radix-ui/react-dialog

# For Select component
npm install @radix-ui/react-select
```

### Quick Install (All dependencies)

```bash
npm install @vistral/design-system react react-dom lucide-react \
  @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-select
```

### From GitHub (Alternative)

```bash
npm install git+https://github.com/angelvanegas1006/vistral-design-system.git
```

## Basic Usage

```tsx
import { Button, Card, Input, PropertyCard } from '@vistral/design-system';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="you@email.com" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Available Components

### Basic
- `Button` - Buttons with variants (primary, secondary, ghost, destructive)
- `Card` - Container with header, body, footer
- `Badge` - Status labels
- `Avatar` - Profile images
- `Alert` - Alert messages
- `Divider` - Separators
- `Link` - Styled links

### Forms
- `Input` - Text field
- `Textarea` - Text area
- `Checkbox` - Checkboxes
- `Switch` - Toggle switches
- `Radio` - Radio buttons
- `Select` - Selectors
- `Combobox` - Select with search
- `Autocomplete` - Input with suggestions
- `Slider` - Slider control
- `DatePicker` - Date selector
- `PhoneInput` - International phone input
- `PinCode` - PIN code input
- `TagInput` - Multiple tags input
- `NumberInput` - Numeric input with +/-
- `SearchInput` - Search field
- `ColorPicker` - Color selector
- `FileUpload` - File upload

### Feedback
- `Progress` - Progress bars
- `Skeleton` - Loading placeholders
- `Toast` - Temporary notifications
- `EmptyState` - Empty states
- `Tooltip` - Informative tooltips
- `Banner` - Notification banners

### Navigation
- `Navbar` - Top navigation bar
- `BottomNav` - Bottom navigation (mobile)
- `Tabs` - Tabs
- `Breadcrumb` - Breadcrumbs
- `Pagination` - Pagination
- `SideNav` - Side navigation
- `Stepper` - Step wizard

### Overlays
- `Dialog` - Modal dialogs
- `Popover` - Floating popovers
- `DropdownMenu` - Dropdown menus
- `ContextMenu` - Context menu
- `Sheet` - Sliding side panel

### Layout
- `Accordion` - Accordions
- `Table` - Data tables
- `List` / `ListItem` - Lists
- `Carousel` - Image carousel
- `DataBlock` - KPI blocks
- `PageHeader` / `SectionHeader` - Headers
- `FooterActions` - Footer actions
- `Timeline` - Timeline
- `ToggleGroup` - Toggle groups

### Special
- `Chip` - Chips/Tags
- `Rating` - Star ratings
- `Calendar` - Calendar
- `Lightbox` - Image viewer
- `MediaHero` - Photo gallery hero
- `PropertyCard` - Real estate property card

## Design Tokens

### Use CSS tokens

```tsx
import '@vistral/design-system/tokens.css';
```

### Use JS tokens

```tsx
import { BUTTON_TOKENS, CARD_TOKENS } from '@vistral/design-system';

// Access specific values
console.log(BUTTON_TOKENS.primary.bg); // '#2050f6'
```

## Storybook

View interactive documentation:

```bash
# Clone the repository
git clone https://github.com/angelvanegas1006/vistral-design-system.git
cd vistral-design-system

# Install dependencies
npm install

# Start Storybook
npm run storybook
```

Open http://localhost:6006

Or view the live version at: https://vistral-design-system.vercel.app

## Development

### Requirements
- Node.js 18+
- React 19+

### Commands

```bash
# Development with watch
npm run dev

# Production build
npm run build

# Storybook
npm run storybook

# Build static Storybook
npm run build-storybook

# Type check
npm run typecheck
```

### Project Structure

```
vistral-design-system/
├── src/
│   ├── components/
│   │   └── ui/           # React components
│   ├── tokens/           # Design tokens
│   └── index.ts          # Main exports
├── stories/              # Storybook stories
├── lib/
│   └── figma-sync/       # Figma synchronization
└── dist/                 # Production build
```

## Complete Example

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Badge,
} from '@vistral/design-system';

function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
        <Badge variant="success">New</Badge>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input 
            label="Name" 
            placeholder="Your name" 
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="you@email.com" 
          />
          <Select>
            <SelectTrigger placeholder="Select a topic" />
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          <Button>Send message</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## PropertyCard (Real Estate)

```tsx
import { PropertyCard } from '@vistral/design-system';

<PropertyCard
  image="https://example.com/property.jpg"
  type="Apartment"
  title="Property in Navacerrada"
  status="available"
  location="Madrid, Spain"
  category="Flat"
  bedrooms={2}
  bathrooms={1}
  area={85}
  price={90000}
  yieldPercent={6}
  infoRows={[
    { label: 'Estimated rent', value: '650€/month' },
    { label: 'Total investment', value: '113,100€' },
    { label: 'Capital gain', value: '90.000€', hasInfo: true },
  ]}
  onFavoriteChange={(isFav) => console.log('Favorite:', isFav)}
  onCardClick={() => console.log('Card clicked')}
/>
```

## License

Private - Vistral Lab © 2024
