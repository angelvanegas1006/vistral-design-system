import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MediaHero } from '../src/components/ui/media-hero';
import { Tag } from '../src/components/ui/tag';
import { Button } from '../src/components/ui/button';
import { Heart } from 'lucide-react';

const DEMO_IMAGES = [
  { 
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', 
    alt: 'Modern house exterior',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', 
    alt: 'Living room',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop', 
    alt: 'Kitchen',
    thumbnail: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', 
    alt: 'Bedroom',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=800&h=600&fit=crop', 
    alt: 'Bathroom',
    thumbnail: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=200&h=200&fit=crop',
  },
  { 
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', 
    alt: 'Garden',
    thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&h=200&fit=crop',
  },
];

const meta: Meta<typeof MediaHero> = {
  title: 'Components/MediaHero',
  component: MediaHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Media Hero

Media Hero component matching Figma design.

Based on Figma:
- [Media Hero Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2770-32645)
- [Grid Layouts](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2300-2230)
- [Mobile Carousel](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2826-1225)

## Features
- **Desktop Grid**: Dynamic grid (1-5 photos) with main image (60%) + side grid (40%)
- **Mobile Carousel**: Single-image format with horizontal scrolling
- **Instance Slot**: Overlay area for tags, buttons, or contextual elements
- **Show All Button**: Persistent trigger to open full gallery
- **Pagination**: Counter indicator on mobile
- **Hover Effects**: Subtle hover states on desktop
- **Accessibility**: Alt text, keyboard navigation, screen reader announcements

## Best Practices
- Prioritize best image as primary in largest slot
- Use consistent aspect ratios
- Implement subtle hover states on desktop
- Ensure high contrast for "Show all photos" button
- Don't overload Instance Slot with too many elements
- Always show pagination on mobile
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaHero>;

export const Default: Story = {
  name: 'Grid 5 Images (Figma Reference)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero images={DEMO_IMAGES} height={420} />
    </div>
  ),
};

export const AllGridVariations: Story = {
  name: 'All Grid Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, maxWidth: 900 }}>
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          5 Images (2x2 Grid)
        </h4>
        <MediaHero images={DEMO_IMAGES.slice(0, 5)} height={420} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          3 Images (2 Stacked)
        </h4>
        <MediaHero images={DEMO_IMAGES.slice(0, 3)} height={420} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          4 Images (3 Stacked)
        </h4>
        <MediaHero images={DEMO_IMAGES.slice(0, 4)} height={420} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          2 Images (50/50 Split)
        </h4>
        <MediaHero images={DEMO_IMAGES.slice(0, 2)} height={420} />
      </div>
    </div>
  ),
};

export const WithInstanceSlot: Story = {
  name: 'With Instance Slot (Tags & Buttons)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero 
        images={DEMO_IMAGES} 
        height={420}
        instanceSlot={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Tag variant="success" size="sm">Verified</Tag>
            <Tag variant="info" size="sm">Featured</Tag>
            <Button 
              variant="ghost" 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#18181b',
              }}
            >
              <Heart size={16} />
            </Button>
          </div>
        }
      />
    </div>
  ),
};

export const SingleImage: Story = {
  name: 'Single Image',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero 
        images={[DEMO_IMAGES[0]]} 
        variant="single" 
        height={400}
        instanceSlot={
          <Tag variant="success" size="sm">New Listing</Tag>
        }
      />
    </div>
  ),
};

export const Carousel: Story = {
  name: 'Carousel (Mobile)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <MediaHero 
        images={DEMO_IMAGES} 
        variant="carousel"
        height={280}
        instanceSlot={
          <Tag variant="success" size="sm">Verified</Tag>
        }
      />
    </div>
  ),
};

export const AutoVariant: Story = {
  name: 'Auto Variant (Responsive)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <p style={{ fontSize: 13, color: '#71717a', marginBottom: 16 }}>
        Resize window to see it switch between grid (desktop) and carousel (mobile)
      </p>
      <MediaHero 
        images={DEMO_IMAGES} 
        variant="auto"
        height={420}
      />
    </div>
  ),
};

export const CustomButtonText: Story = {
  name: 'Custom Button Text',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero 
        images={DEMO_IMAGES}
        buttonText="Ver 6 fotos"
        height={420}
      />
    </div>
  ),
};

export const PropertyPage: Story = {
  name: 'Property Detail Page Example',
  render: () => (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <MediaHero 
        images={DEMO_IMAGES}
        height={480}
        instanceSlot={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Tag variant="success" size="sm">Verified</Tag>
            <Tag variant="info" size="sm">Featured</Tag>
            <Button 
              variant="ghost" 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#18181b',
              }}
            >
              <Heart size={16} />
            </Button>
          </div>
        }
      />
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
            Modern Villa in Barcelona
          </h1>
          <Tag variant="success" size="sm">Available</Tag>
        </div>
        <p style={{ margin: '8px 0 0', color: '#71717a', fontSize: 16 }}>
          Paseo de Gracia, Eixample, Barcelona
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
          <div>
            <span style={{ fontSize: 28, fontWeight: 700 }}>€320,000</span>
            <span style={{ marginLeft: 8, color: '#16a34a', fontWeight: 600 }}>+7.2%</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ManyImages: Story = {
  name: 'Many Images (51 photos)',
  render: () => {
    const manyImages = Array.from({ length: 51 }, (_, i) => ({
      src: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&sig=${i}`,
      alt: `Property photo ${i + 1}`,
      thumbnail: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop&sig=${i}`,
    }));
    
    return (
      <div style={{ padding: 24, maxWidth: 900 }}>
        <MediaHero 
          images={manyImages}
          height={420}
          buttonText="Show all 51 photos"
        />
      </div>
    );
  },
};

export const WithoutHover: Story = {
  name: 'Without Hover Effects',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero 
        images={DEMO_IMAGES}
        height={420}
        enableHover={false}
      />
    </div>
  ),
};
