import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselItem } from '../src/components/ui/carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Carousel

Carousel component matching Figma design.

Based on Figma: [Carousel](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1364-4180)

## Features
- **Desktop**: Large navigation arrows (72px), positioned at edges
- **Mobile**: Edge masking, shrinking behavior
- **Indicators**: Dots, thumbnails, counter
- **Variants**: Single item, multi-item, hero
- **Orientations**: Horizontal, vertical
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

const SlideBox = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 240,
      backgroundColor: color,
      borderRadius: 12,
      color: 'white',
      fontSize: 24,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
)

const ImagePlaceholder = ({ index }: { index: number }) => (
  <div
    style={{
      width: '100%',
      height: 240,
      backgroundColor: '#f4f4f5',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e4e4e7',
    }}
  >
    <span style={{ color: '#a1a1aa', fontSize: 14 }}>Image {index}</span>
  </div>
)

export const Default: Story = {
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
        <SlideBox color="#d97706">Slide 5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const WithCounter: Story = {
  name: 'With Counter',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel showCounter>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
        <SlideBox color="#d97706">Slide 5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const SingleItem: Story = {
  name: 'Single Item (Desktop)',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel slidesToShow={1} showCounter>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
        <SlideBox color="#d97706">Slide 5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const TwoItems: Story = {
  name: 'Two Items',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel slidesToShow={2} gap={16} showCounter>
        <SlideBox color="#2050f6">1</SlideBox>
        <SlideBox color="#7c3aed">2</SlideBox>
        <SlideBox color="#db2777">3</SlideBox>
        <SlideBox color="#059669">4</SlideBox>
        <SlideBox color="#d97706">5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const ThreeItems: Story = {
  name: 'Three Items',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel slidesToShow={3} gap={16} showCounter>
        <SlideBox color="#2050f6">1</SlideBox>
        <SlideBox color="#7c3aed">2</SlideBox>
        <SlideBox color="#db2777">3</SlideBox>
        <SlideBox color="#059669">4</SlideBox>
        <SlideBox color="#d97706">5</SlideBox>
        <SlideBox color="#ec4899">6</SlideBox>
      </Carousel>
    </div>
  ),
}

export const WithThumbnails: Story = {
  name: 'With Thumbnails',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel showThumbnails showDots={false} showArrows={false}>
        <ImagePlaceholder index={1} />
        <ImagePlaceholder index={2} />
        <ImagePlaceholder index={3} />
        <ImagePlaceholder index={4} />
        <ImagePlaceholder index={5} />
      </Carousel>
    </div>
  ),
}

export const MobileMultiItem: Story = {
  name: 'Mobile - Multi Item',
  render: () => (
    <div style={{ width: 360 }}>
      <Carousel
        slidesToShow={1.2}
        slidesToScroll={1}
        edgeMasking
        mobileVariant="multi-item"
        showCounter
      >
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
        <SlideBox color="#d97706">Slide 5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const MobileHero: Story = {
  name: 'Mobile - Hero',
  render: () => (
    <div style={{ width: 360 }}>
      <Carousel slidesToShow={1} slidesToScroll={1} mobileVariant="hero" showCounter>
        <SlideBox color="#2050f6">Hero 1</SlideBox>
        <SlideBox color="#7c3aed">Hero 2</SlideBox>
        <SlideBox color="#db2777">Hero 3</SlideBox>
        <SlideBox color="#059669">Hero 4</SlideBox>
        <SlideBox color="#d97706">Hero 5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const Vertical: Story = {
  name: 'Vertical Orientation',
  render: () => (
    <div style={{ width: 312 }}>
      <Carousel orientation="vertical" height={360} showCounter>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
        <SlideBox color="#d97706">Slide 5</SlideBox>
      </Carousel>
    </div>
  ),
}

export const AutoPlay: Story = {
  name: 'Auto Play',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel autoPlay={3000} loop showCounter>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
      </Carousel>
    </div>
  ),
}

export const NoControls: Story = {
  name: 'No Controls',
  render: () => (
    <div style={{ width: 1104 }}>
      <Carousel showArrows={false} showDots={false} showCounter={false}>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
      </Carousel>
    </div>
  ),
}

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        padding: 24,
        backgroundColor: '#f8fafc',
      }}
    >
      {/* Desktop Single */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Desktop - Single Item</h3>
        <div style={{ width: 1104 }}>
          <Carousel slidesToShow={1} showCounter>
            <SlideBox color="#2050f6">1</SlideBox>
            <SlideBox color="#7c3aed">2</SlideBox>
            <SlideBox color="#db2777">3</SlideBox>
            <SlideBox color="#059669">4</SlideBox>
            <SlideBox color="#d97706">5</SlideBox>
          </Carousel>
        </div>
      </div>

      {/* Desktop Two Items */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Desktop - Two Items</h3>
        <div style={{ width: 1104 }}>
          <Carousel slidesToShow={2} showCounter>
            <SlideBox color="#2050f6">1</SlideBox>
            <SlideBox color="#7c3aed">2</SlideBox>
            <SlideBox color="#db2777">3</SlideBox>
            <SlideBox color="#059669">4</SlideBox>
            <SlideBox color="#d97706">5</SlideBox>
          </Carousel>
        </div>
      </div>

      {/* Desktop Three Items */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Desktop - Three Items</h3>
        <div style={{ width: 1104 }}>
          <Carousel slidesToShow={3} showCounter>
            <SlideBox color="#2050f6">1</SlideBox>
            <SlideBox color="#7c3aed">2</SlideBox>
            <SlideBox color="#db2777">3</SlideBox>
            <SlideBox color="#059669">4</SlideBox>
            <SlideBox color="#d97706">5</SlideBox>
            <SlideBox color="#ec4899">6</SlideBox>
          </Carousel>
        </div>
      </div>

      {/* Mobile */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Mobile - Multi Item</h3>
        <div style={{ width: 360 }}>
          <Carousel
            slidesToShow={1.2}
            slidesToScroll={1}
            edgeMasking
            mobileVariant="multi-item"
            showCounter
          >
            <SlideBox color="#2050f6">1</SlideBox>
            <SlideBox color="#7c3aed">2</SlideBox>
            <SlideBox color="#db2777">3</SlideBox>
            <SlideBox color="#059669">4</SlideBox>
            <SlideBox color="#d97706">5</SlideBox>
          </Carousel>
        </div>
      </div>

      {/* Vertical */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Vertical</h3>
        <div style={{ width: 312 }}>
          <Carousel orientation="vertical" height={360} showCounter>
            <SlideBox color="#2050f6">1</SlideBox>
            <SlideBox color="#7c3aed">2</SlideBox>
            <SlideBox color="#db2777">3</SlideBox>
            <SlideBox color="#059669">4</SlideBox>
            <SlideBox color="#d97706">5</SlideBox>
          </Carousel>
        </div>
      </div>

      {/* With Thumbnails */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>With Thumbnails</h3>
        <div style={{ width: 1104 }}>
          <Carousel showThumbnails showDots={false} showArrows={false}>
            <ImagePlaceholder index={1} />
            <ImagePlaceholder index={2} />
            <ImagePlaceholder index={3} />
            <ImagePlaceholder index={4} />
            <ImagePlaceholder index={5} />
          </Carousel>
        </div>
      </div>
    </div>
  ),
}
