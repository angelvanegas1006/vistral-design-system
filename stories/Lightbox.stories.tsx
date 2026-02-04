import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox, LightboxTrigger } from '../src/components/ui/lightbox';
import { Button } from '../src/components/ui/button';

const DEMO_IMAGES = [
  { 
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop', 
    alt: 'Modern house exterior',
    name: 'Property Photo 1',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', 
    alt: 'Living room',
    name: 'Property Photo 2',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop', 
    alt: 'Kitchen',
    name: 'Property Photo 3',
    thumbnail: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', 
    alt: 'Bedroom',
    name: 'Property Photo 4',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=1200&h=800&fit=crop', 
    alt: 'Bathroom',
    name: 'Property Photo 5',
    thumbnail: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop', 
    alt: 'Garden',
    name: 'Property Photo 6',
    thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop',
  },
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

Lightbox component matching Figma design.

Based on Figma:
- [Lightbox Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=3985-4790)
- [Image Viewer](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1955-5771)
- [Document Viewer](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1955-5786)

## Features
- **Image Viewer**: Optimized for visual inspection with navigation arrows
- **Document Viewer**: Multi-page files with vertical navigation and page thumbnails
- **Top Bar**: Back button, file name, zoom controls, action buttons
- **Annotation Card**: Optional floating card for metadata
- **Thumbnails**: Bottom strip (images) or sidebar (documents)
- **Keyboard Navigation**: Arrow keys, Esc to close
- **Accessibility**: Focus trap, ARIA roles, screen reader announcements

## Best Practices
- Maintain intuitive zoom controls for documents
- Use Ghost or Secondary buttons for utility actions
- Implement keyboard navigation (arrow keys and Esc)
- Ensure clear loading state for heavy files
- Don't block pinch-to-zoom on mobile
- Always show file name
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

export const WithBackButton: Story = {
  name: 'With Back Button',
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open Lightbox</Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          showBack
          onBack={() => {
            console.log('Back clicked');
            setOpen(false);
          }}
        />
      </div>
    );
  },
};

export const WithZoom: Story = {
  name: 'With Zoom Controls',
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open with Zoom</Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          enableZoom
        />
      </div>
    );
  },
};

export const WithSecondaryAction: Story = {
  name: 'With Secondary Action',
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open with Actions</Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          secondaryAction={{
            label: 'Add Corrections',
            onClick: () => {
              console.log('Add corrections clicked');
            },
          }}
          enableDownload
        />
      </div>
    );
  },
};

export const WithAnnotation: Story = {
  name: 'With Annotation Card',
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open with Annotation</Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          annotation={{
            title: 'Property Details',
            description: 'This is a modern 3-bedroom house located in a quiet neighborhood.',
            tags: ['Verified', 'Featured', 'New Listing'],
          }}
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
            src={image.thumbnail || image.src}
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

export const NoThumbnails: Story = {
  name: 'Without Thumbnails',
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

export const FullFeatured: Story = {
  name: 'Full Featured Example',
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open Full Featured Lightbox</Button>
        <Lightbox
          images={DEMO_IMAGES}
          open={open}
          onOpenChange={setOpen}
          showBack
          enableZoom
          enableDownload
          secondaryAction={{
            label: 'Add Corrections',
            onClick: () => console.log('Add corrections'),
          }}
          annotation={{
            title: 'Property Information',
            description: 'Modern 3-bedroom house with updated kitchen and bathrooms.',
            tags: ['Verified', 'Featured'],
          }}
        />
      </div>
    );
  },
};
