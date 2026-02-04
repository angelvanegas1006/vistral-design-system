import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, Item } from '../src/components/ui/list-item';
import { Avatar } from '../src/components/ui/avatar';
import { Badge } from '../src/components/ui/badge';
import { Switch } from '../src/components/ui/switch';
import { Button } from '../src/components/ui/button';
import { Checkbox } from '../src/components/ui/checkbox';
import { 
  User, Settings, Bell, Lock, CreditCard, HelpCircle, LogOut,
  Mail, Phone, MapPin, Star, Wifi, Bluetooth, Moon, ChevronRight
} from 'lucide-react';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Item

Item component matching Figma design.

Based on Figma:
- [Item Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1754-6315)

## Features
- **Header**: Optional tag or helper text
- **Media**: Icon, Avatar, Checkbox, Radio Button (Start Area)
- **Primary Text**: Main title
- **Secondary Text**: Description (max 2 lines)
- **Actions**: Chevron, Toggle, Badge, Button (End Area)
- **Footer**: Optional additional actions
- **Divider**: Optional separator
- **States**: Hover, Active, Selected, Disabled
- **Accessibility**: ARIA labels, focus indicators, keyboard navigation

## Anatomy
1. Container
2. Header (Optional): Tag or helper text
3. Media (Optional): Icon, Avatar, Checkbox, Radio
4. Primary Text
5. Secondary Text (Optional)
6. Actions (Optional): Chevron, Toggle, Badge, Button
7. Footer (Optional): Additional actions
8. Divider (Optional)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item title="Title" />
        <Item title="Title" />
        <Item title="Title" />
      </List>
    </div>
  ),
};

export const WithDescription: Story = {
  name: 'With Description',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          title="Title" 
          description="This is a card description."
        />
        <Item 
          title="Title" 
          description="This is a card description."
        />
        <Item 
          title="Title" 
          description="This is a card description."
        />
      </List>
    </div>
  ),
};

export const WithHeader: Story = {
  name: 'With Header (Tag/Helper Text)',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          header={<Badge variant="default">Tag</Badge>}
          helperText="2min ago"
          title="Title" 
          description="This is a card description."
        />
        <Item 
          header={<Badge variant="primary">New</Badge>}
          helperText="5min ago"
          title="Title" 
          description="This is a card description."
        />
      </List>
    </div>
  ),
};

export const WithMedia: Story = {
  name: 'With Media (Icon/Avatar)',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          leadingIcon={User}
          title="John Doe" 
          description="john@example.com"
          showChevron
          clickable
        />
        <Item 
          media={<Avatar name="Jane Smith" size="md" />}
          title="Jane Smith" 
          description="jane@example.com"
          showChevron
          clickable
        />
        <Item 
          leadingIcon={Settings}
          title="Settings"
          showChevron
          clickable
        />
      </List>
    </div>
  ),
};

export const WithActions: Story = {
  name: 'With Actions (Badge/Toggle/Button)',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          leadingIcon={Bell} 
          title="Notifications" 
          actions={<Badge variant="primary">3</Badge>}
          clickable
        />
        <Item 
          leadingIcon={Mail} 
          title="Messages" 
          actions={<Badge variant="error">12</Badge>}
          clickable
        />
        <Item 
          leadingIcon={Wifi} 
          title="Wi-Fi" 
          description="Connected"
          actions={<Switch defaultChecked />}
        />
        <Item 
          leadingIcon={Bluetooth} 
          title="Bluetooth" 
          description="Off"
          actions={<Switch />}
        />
        <Item 
          title="Title"
          description="This is a card description."
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          clickable
        />
      </List>
    </div>
  ),
};

export const WithFooter: Story = {
  name: 'With Footer Actions',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          title="Title"
          description="This is a card description."
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          footer={
            <>
              <Button size="sm" variant="ghost">Action 1</Button>
              <Button size="sm" variant="ghost">Action 2</Button>
            </>
          }
          clickable
        />
        <Item 
          title="Title"
          description="This is a card description."
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          footer={
            <>
              <Button size="sm" variant="ghost">Action 1</Button>
              <Button size="sm" variant="ghost">Action 2</Button>
            </>
          }
          clickable
        />
      </List>
    </div>
  ),
};

export const WithDividers: Story = {
  name: 'With Dividers',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          title="Title"
          description="This is a card description."
          showDivider
        />
        <Item 
          title="Title"
          description="This is a card description."
          showDivider
        />
        <Item 
          title="Title"
          description="This is a card description."
        />
      </List>
    </div>
  ),
};

export const States: Story = {
  name: 'All States',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          title="Default State"
          description="Hover to see effect"
          clickable
        />
        <Item 
          title="Selected State"
          description="This item is selected"
          selected
          clickable
        />
        <Item 
          title="Disabled State"
          description="This item is disabled"
          disabled
          clickable
        />
      </List>
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: 'With Checkbox (Selection)',
  render: () => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(true);
    const [checked3, setChecked3] = React.useState(false);

    return (
      <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
        <List>
          <Item 
            media={<Checkbox checked={checked1} onCheckedChange={setChecked1} />}
            title="Selectable Item 1"
            description="Click checkbox to select"
            clickable
            onClick={() => setChecked1(!checked1)}
          />
          <Item 
            media={<Checkbox checked={checked2} onCheckedChange={setChecked2} />}
            title="Selectable Item 2"
            description="Pre-selected"
            clickable
            onClick={() => setChecked2(!checked2)}
          />
          <Item 
            media={<Checkbox checked={checked3} onCheckedChange={setChecked3} />}
            title="Selectable Item 3"
            description="Unselected"
            clickable
            onClick={() => setChecked3(!checked3)}
          />
        </List>
      </div>
    );
  },
};

export const LongContent: Story = {
  name: 'Long Content (Multi-line)',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          title="Short Content"
          description="Short description"
        />
        <Item 
          title="Medium Content"
          description="This is a medium length description that might wrap to a second line if needed."
        />
        <Item 
          title="Long Content"
          description="This is a very long description that will definitely wrap to multiple lines. The component should handle this gracefully and limit to maximum 2 lines as per Figma specifications. Any overflow beyond 2 lines should be truncated with ellipsis."
        />
      </List>
    </div>
  ),
};

export const HorizontalLayout: Story = {
  name: 'Horizontal Layout (Grid)',
  render: () => (
    <div style={{ width: 800, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7', padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <Item 
          title="Title"
          description="<text content>"
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          clickable
        />
        <Item 
          title="Title"
          description="<text content>"
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          clickable
        />
        <Item 
          title="Title"
          description="<short content>"
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          clickable
        />
        <Item 
          title="Title"
          description="<short content>"
          actions={<Button size="sm" variant="outline">Instance 54</Button>}
          clickable
        />
      </div>
    </div>
  ),
};

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, backgroundColor: '#f8fafc' }}>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Basic Item</h3>
        <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
          <List>
            <Item title="Title" />
            <Item title="Title" />
            <Item title="Title" />
          </List>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Description</h3>
        <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
          <List>
            <Item 
              title="Title"
              description="This is a card description."
            />
            <Item 
              title="Title"
              description="This is a card description."
            />
          </List>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Actions</h3>
        <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
          <List>
            <Item 
              title="Title"
              description="This is a card description."
              actions={<Button size="sm" variant="outline">Instance 54</Button>}
              clickable
            />
            <Item 
              title="Title"
              description="This is a card description."
              actions={<Button size="sm" variant="outline">Instance 54</Button>}
              clickable
            />
          </List>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>With Header and Footer</h3>
        <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
          <List>
            <Item 
              header={<Badge variant="default">Tag</Badge>}
              helperText="2min ago"
              title="Title"
              description="This is a card description."
              actions={<Button size="sm" variant="outline">Instance 54</Button>}
              footer={
                <>
                  <Button size="sm" variant="ghost">Action 1</Button>
                  <Button size="sm" variant="ghost">Action 2</Button>
                </>
              }
              clickable
            />
          </List>
        </div>
      </div>
    </div>
  ),
};

export const SettingsMenu: Story = {
  name: 'Settings Menu Example',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List>
        <Item 
          leadingIcon={Wifi} 
          title="Wi-Fi" 
          description="Connected"
          actions={<Switch defaultChecked />}
        />
        <Item 
          leadingIcon={Bluetooth} 
          title="Bluetooth" 
          description="Off"
          actions={<Switch />}
        />
        <Item 
          leadingIcon={Moon} 
          title="Dark Mode" 
          actions={<Switch />}
        />
        <Item 
          leadingIcon={Bell} 
          title="Notifications" 
          actions={<Switch defaultChecked />}
        />
      </List>
    </div>
  ),
};

export const ContactList: Story = {
  name: 'Contact List Example',
  render: () => (
    <div style={{ width: 400, backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e4e4e7' }}>
      <List divided>
        {[
          { name: 'Alice Chen', email: 'alice@company.com', status: 'online' },
          { name: 'Bob Smith', email: 'bob@company.com', status: 'away' },
          { name: 'Carol White', email: 'carol@company.com', status: 'offline' },
          { name: 'David Lee', email: 'david@company.com', status: 'online' },
        ].map((contact) => (
          <Item
            key={contact.email}
            title={contact.name}
            description={contact.email}
            media={
              <Avatar 
                name={contact.name} 
                size="md" 
                showStatus 
                status={contact.status as any}
              />
            }
            showChevron
            clickable
          />
        ))}
      </List>
    </div>
  ),
};
