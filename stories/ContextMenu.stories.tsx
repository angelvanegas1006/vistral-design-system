import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuRadioItem,
  ContextMenuLabel, ContextMenuSubmenu,
} from '../src/components/ui/context-menu';
import { Copy, Trash2, Edit, Share, Download, Star, Folder, File, Image, Video } from 'lucide-react';

const meta: Meta = {
  title: 'Components/ContextMenu',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Context Menu

Context menu component matching Figma design.

Based on Figma: [Context Menu](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2890-6484)

## Features
- **Right Click**: Opens on context menu
- **Items**: Action items with icons
- **Labels**: Non-interactive group headers
- **Checkboxes**: Checkbox items
- **Radio**: Radio button items
- **Submenus**: Nested menus
- **Shortcuts**: Keyboard shortcut labels
- **Separators**: Visual grouping
- **Destructive**: Red color for delete actions
        `,
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{
          width: 300,
          height: 150,
          border: '2px dashed #e4e4e7',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#71717a',
          fontSize: 14,
        }}>
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={Edit}>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Copy}>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Share}>Menu Item</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} destructive>Menu Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithLabels: StoryObj = {
  name: 'With Labels',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{
          width: 300,
          height: 150,
          border: '2px dashed #e4e4e7',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#71717a',
          fontSize: 14,
        }}>
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem icon={Edit}>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Copy}>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Share}>Menu Item</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Danger Zone</ContextMenuLabel>
        <ContextMenuItem icon={Trash2} destructive>Menu Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithShortcuts: StoryObj = {
  name: 'With Shortcuts',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{
          width: 300,
          height: 150,
          border: '2px dashed #e4e4e7',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#71717a',
          fontSize: 14,
        }}>
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={Copy} shortcut="⌘C">Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Edit} shortcut="⌘E">Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Download} shortcut="⌘D">Menu Item</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} shortcut="⌫" destructive>Menu Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxes: StoryObj = {
  name: 'With Checkboxes',
  render: () => {
    const [starred, setStarred] = React.useState(false);
    const [shared, setShared] = React.useState(true);
    
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <div style={{
            width: 300,
            height: 150,
            border: '2px dashed #e4e4e7',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#71717a',
            fontSize: 14,
          }}>
            Right click here
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked={starred} onCheckedChange={setStarred}>
            Menu Item
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={shared} onCheckedChange={setShared}>
            Menu Item
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem icon={Edit}>Menu Item</ContextMenuItem>
          <ContextMenuItem icon={Trash2} destructive>Menu Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithRadio: StoryObj = {
  name: 'With Radio Buttons',
  render: () => {
    const [selected, setSelected] = React.useState('option1');
    
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <div style={{
            width: 300,
            height: 150,
            border: '2px dashed #e4e4e7',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#71717a',
            fontSize: 14,
          }}>
            Right click here
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuRadioItem checked={selected === 'option1'} onCheckedChange={() => setSelected('option1')}>
            Menu Item
          </ContextMenuRadioItem>
          <ContextMenuRadioItem checked={selected === 'option2'} onCheckedChange={() => setSelected('option2')}>
            Menu Item
          </ContextMenuRadioItem>
          <ContextMenuRadioItem checked={selected === 'option3'} onCheckedChange={() => setSelected('option3')}>
            Menu Item
          </ContextMenuRadioItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const WithSubmenu: StoryObj = {
  name: 'With Submenu',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{
          width: 300,
          height: 150,
          border: '2px dashed #e4e4e7',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#71717a',
          fontSize: 14,
        }}>
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={Edit}>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Copy}>Menu Item</ContextMenuItem>
        <ContextMenuSubmenu label="Menu Item" icon={Folder}>
          <ContextMenuItem icon={File}>Menu Item</ContextMenuItem>
          <ContextMenuItem icon={Image}>Menu Item</ContextMenuItem>
          <ContextMenuItem icon={Video}>Menu Item</ContextMenuItem>
        </ContextMenuSubmenu>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} destructive>Menu Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithDisabled: StoryObj = {
  name: 'With Disabled Items',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{
          width: 300,
          height: 150,
          border: '2px dashed #e4e4e7',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#71717a',
          fontSize: 14,
        }}>
          Right click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={Edit}>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Copy} disabled>Menu Item</ContextMenuItem>
        <ContextMenuItem icon={Share} disabled>Menu Item</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} destructive>Menu Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const FileExample: StoryObj = {
  name: 'File Browser Example',
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div style={{
          width: 120,
          padding: 16,
          backgroundColor: '#f4f4f5',
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <div style={{
            width: 48,
            height: 48,
            margin: '0 auto 8px',
            backgroundColor: '#dbeafe',
            borderRadius: 8,
          }} />
          <span style={{ fontSize: 13 }}>Document.pdf</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={Edit}>Rename</ContextMenuItem>
        <ContextMenuItem icon={Copy}>Duplicate</ContextMenuItem>
        <ContextMenuItem icon={Download}>Download</ContextMenuItem>
        <ContextMenuItem icon={Share}>Share</ContextMenuItem>
        <ContextMenuItem icon={Star}>Add to Favorites</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} destructive>Move to Trash</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const AllVariations: StoryObj = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Basic */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Basic</p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div style={{
              width: 200,
              height: 100,
              border: '2px dashed #e4e4e7',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#71717a',
              fontSize: 13,
            }}>
              Right click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Menu Item</ContextMenuItem>
            <ContextMenuItem>Menu Item</ContextMenuItem>
            <ContextMenuItem>Menu Item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* With Icons */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>With Icons</p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div style={{
              width: 200,
              height: 100,
              border: '2px dashed #e4e4e7',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#71717a',
              fontSize: 13,
            }}>
              Right click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem icon={Edit}>Menu Item</ContextMenuItem>
            <ContextMenuItem icon={Copy}>Menu Item</ContextMenuItem>
            <ContextMenuItem icon={Share}>Menu Item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* With Labels */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>With Labels</p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div style={{
              width: 200,
              height: 100,
              border: '2px dashed #e4e4e7',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#71717a',
              fontSize: 13,
            }}>
              Right click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Group</ContextMenuLabel>
            <ContextMenuItem>Menu Item</ContextMenuItem>
            <ContextMenuItem>Menu Item</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem icon={Trash2} destructive>Menu Item</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* With Checkboxes */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>With Checkboxes</p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div style={{
              width: 200,
              height: 100,
              border: '2px dashed #e4e4e7',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#71717a',
              fontSize: 13,
            }}>
              Right click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuCheckboxItem checked>Menu Item</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Menu Item</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked>Menu Item</ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* With Radio */}
      <div>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>With Radio</p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div style={{
              width: 200,
              height: 100,
              border: '2px dashed #e4e4e7',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#71717a',
              fontSize: 13,
            }}>
              Right click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuRadioItem checked>Menu Item</ContextMenuRadioItem>
            <ContextMenuRadioItem>Menu Item</ContextMenuRadioItem>
            <ContextMenuRadioItem>Menu Item</ContextMenuRadioItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  ),
};
