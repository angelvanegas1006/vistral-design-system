import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuCheckboxItem,
} from '../src/components/ui/context-menu';
import { Copy, Trash2, Edit, Share, Download, Star } from 'lucide-react';

const meta: Meta = {
  title: 'Components/ContextMenu',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Context Menu

Right-click context menu.

## Features
- **Right Click**: Opens on context menu
- **Items**: Action items with icons
- **Shortcuts**: Keyboard shortcut labels
- **Separators**: Visual grouping
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
        <ContextMenuItem icon={Edit}>Edit</ContextMenuItem>
        <ContextMenuItem icon={Copy}>Copy</ContextMenuItem>
        <ContextMenuItem icon={Share}>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} destructive>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithShortcuts: StoryObj = {
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
        <ContextMenuItem icon={Copy} shortcut="⌘C">Copy</ContextMenuItem>
        <ContextMenuItem icon={Edit} shortcut="⌘E">Edit</ContextMenuItem>
        <ContextMenuItem icon={Download} shortcut="⌘D">Download</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={Trash2} shortcut="⌫" destructive>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxes: StoryObj = {
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
            Starred
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={shared} onCheckedChange={setShared}>
            Shared
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem icon={Edit}>Edit</ContextMenuItem>
          <ContextMenuItem icon={Trash2} destructive>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
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
