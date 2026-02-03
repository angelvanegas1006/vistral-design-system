import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MediaHero } from '../src/components/ui/media-hero';

const DEMO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', alt: 'Modern house exterior' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', alt: 'Living room' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop', alt: 'Kitchen' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop', alt: 'Bedroom' },
  { src: 'https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=800&h=600&fit=crop', alt: 'Bathroom' },
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop', alt: 'Garden' },
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

Photo gallery hero for property listings.

## Features
- **Grid Layout**: Main image (60%) + side grid (40%)
- **Carousel**: Mobile-friendly swipe version
- **Lightbox**: Opens full gallery on click
- **Responsive**: Adapts to image count
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaHero>;

export const Default: Story = {
  name: 'Grid 5 Images',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero images={DEMO_IMAGES} height={420} />
    </div>
  ),
};

export const ThreeImages: Story = {
  name: 'Grid 3 Images',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero images={DEMO_IMAGES.slice(0, 3)} height={420} />
    </div>
  ),
};

export const FourImages: Story = {
  name: 'Grid 4 Images',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero images={DEMO_IMAGES.slice(0, 4)} height={420} />
    </div>
  ),
};

export const TwoImages: Story = {
  name: 'Grid 2 Images',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero images={DEMO_IMAGES.slice(0, 2)} height={420} />
    </div>
  ),
};

export const SingleImage: Story = {
  name: 'Single Image',
  render: () => (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <MediaHero images={[DEMO_IMAGES[0]]} variant="single" height={400} />
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
      />
    </div>
  ),
};

export const CustomButtonText: Story = {
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
  name: 'Property Detail Page',
  render: () => (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <MediaHero 
        images={DEMO_IMAGES}
        height={480}
      />
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
            Modern Villa in Barcelona
          </h1>
          <span style={{ 
            padding: '4px 10px', 
            backgroundColor: '#dcfce7', 
            color: '#15803d',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
          }}>
            Available
          </span>
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
