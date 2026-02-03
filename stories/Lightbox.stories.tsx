import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox, LightboxTrigger } from '../src/components/ui/lightbox';
import { Button } from '../src/components/ui/button';

const DEMO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop', alt: 'Modern house exterior' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', alt: 'Living room' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop', alt: 'Kitchen' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Bedroom' },
  { src: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=1200&h=800&fit=crop', alt: 'Bathroom' },
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop', alt: 'Garden' },
];

const meta: Meta<typeof Lightbox> = {
  title: 'Components/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Lightbox

Full-screen image gallery viewer with navigation.

## Features
- **Navigation**: Arrow keys + click navigation
- **Thumbnails**: Bottom strip for quick access
- **Counter**: Shows current position
- **Keyboard**: ESC to close, arrows to navigate
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open Lightbox</Button>
        <p style={{ fontSize: 13, color: '#71717a' }}>
          Use arrow keys to navigate, ESC to close
        </p>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

export const WithTrigger: Story = {
  name: 'Image with Trigger',
  render: () => (
    <LightboxTrigger images={DEMO_IMAGES}>
      <img
        src={DEMO_IMAGES[0].src}
        alt="Click to open gallery"
        style={{ 
          width: 400, 
          height: 260, 
          objectFit: 'cover', 
          borderRadius: 12,
          cursor: 'pointer',
        }}
      />
    </LightboxTrigger>
  ),
};

export const NoThumbnails: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open without Thumbnails
        </Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          showThumbnails={false}
        />
      </>
    );
  },
};

export const WithZoom: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open with Zoom</Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          enableZoom
        />
      </>
    );
  },
};

export const ImageGallery: Story = {
  name: 'Photo Gallery',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: 8, 
      width: 500,
    }}>
      {DEMO_IMAGES.map((image, index) => (
        <LightboxTrigger key={index} images={DEMO_IMAGES} initialIndex={index}>
          <img
            src={image.src}
            alt={image.alt}
            style={{ 
              width: '100%', 
              aspectRatio: '1',
              objectFit: 'cover', 
              borderRadius: 8,
              cursor: 'pointer',
            }}
          />
        </LightboxTrigger>
      ))}
    </div>
  ),
};
