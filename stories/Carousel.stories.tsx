import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselItem } from '../src/components/ui/carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Carousel

Slideshow/carousel component.

## Features
- **Navigation**: Arrows and dots
- **Auto Play**: Optional auto-advance
- **Multiple Slides**: Show multiple at once
- **Loop**: Infinite scrolling
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const SlideBox = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: color,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 600,
  }}>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
      </Carousel>
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel autoPlay={3000} loop>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
      </Carousel>
    </div>
  ),
};

export const MultipleSlides: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <Carousel slidesToShow={2} gap={16}>
        <SlideBox color="#2050f6">1</SlideBox>
        <SlideBox color="#7c3aed">2</SlideBox>
        <SlideBox color="#db2777">3</SlideBox>
        <SlideBox color="#059669">4</SlideBox>
        <SlideBox color="#d97706">5</SlideBox>
      </Carousel>
    </div>
  ),
};

export const ThreeSlides: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <Carousel slidesToShow={3} gap={12}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <SlideBox key={n} color={`hsl(${n * 50}, 70%, 50%)`}>{n}</SlideBox>
        ))}
      </Carousel>
    </div>
  ),
};

export const ImageCarousel: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Carousel loop>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{
            height: 280,
            backgroundColor: '#f4f4f5',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: '#a1a1aa' }}>Image {n}</span>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};

export const NoControls: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Carousel showArrows={false} showDots={false}>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  name: 'Vertical Carousel',
  render: () => (
    <div style={{ width: 300 }}>
      <Carousel orientation="vertical" height={400}>
        <SlideBox color="#2050f6">Slide 1</SlideBox>
        <SlideBox color="#7c3aed">Slide 2</SlideBox>
        <SlideBox color="#db2777">Slide 3</SlideBox>
        <SlideBox color="#059669">Slide 4</SlideBox>
      </Carousel>
    </div>
  ),
};
