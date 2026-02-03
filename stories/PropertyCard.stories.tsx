import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PropertyCard, PropertyCardGrid } from '../src/components/ui/property-card';

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop';

const meta: Meta<typeof PropertyCard> = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Property Card

Real estate listing card component matching Figma design.

## Structure
1. **Image** with type badge (Apartment) and favorite button
2. **Title + Status** badge inline
3. **Location** text
4. **Feature pills** (Flat, beds, baths, area)
5. **Price section** (Purchase price + Net yield)
6. **Info rows** (Estimated rent, Total investment, Capital gain)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
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
      />
    </div>
  ),
};

export const Available: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="Apartment"
        title="Modern Downtown Loft"
        status="available"
        location="Barcelona, Spain"
        category="Flat"
        bedrooms={3}
        bathrooms={2}
        area={120}
        price={185000}
        yieldPercent={7.2}
        infoRows={[
          { label: 'Estimated rent', value: '1,200€/month' },
          { label: 'Total investment', value: '198,500€' },
          { label: 'Capital gain', value: '145.000€', hasInfo: true },
        ]}
      />
    </div>
  ),
};

export const Reserved: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="House"
        title="Beach House with Views"
        status="reserved"
        location="Valencia, Spain"
        category="House"
        bedrooms={4}
        bathrooms={3}
        area={180}
        price={320000}
        yieldPercent={5.8}
        infoRows={[
          { label: 'Estimated rent', value: '2,100€/month' },
          { label: 'Total investment', value: '345,000€' },
        ]}
      />
    </div>
  ),
};

export const Sold: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="Apartment"
        title="City Center Studio"
        status="sold"
        location="Madrid, Spain"
        category="Studio"
        bedrooms={1}
        bathrooms={1}
        area={45}
        price={125000}
        yieldPercent={4.5}
      />
    </div>
  ),
};

export const ComingSoon: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="Project"
        title="New Development Phase 2"
        status="comingSoon"
        location="Málaga, Spain"
        price={150000}
      />
    </div>
  ),
};

export const MinimalInfo: Story = {
  name: 'Minimal (No Info Rows)',
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="Apartment"
        title="Simple Property Card"
        location="Sevilla, Spain"
        category="Flat"
        bedrooms={2}
        bathrooms={1}
        area={75}
        price={95000}
        yieldPercent={6.5}
      />
    </div>
  ),
};

export const WithAllInfo: Story = {
  name: 'Full Info Rows',
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="Apartment"
        title="Premium Investment Property"
        status="available"
        location="Barcelona, Spain"
        category="Flat"
        bedrooms={3}
        bathrooms={2}
        area={110}
        price={225000}
        yieldPercent={7.8}
        infoRows={[
          { label: 'Estimated rent', value: '1,450€/month' },
          { label: 'Total investment', value: '242,500€' },
          { label: 'Annual return', value: '17,400€' },
          { label: 'Capital gain', value: '180.000€', hasInfo: true },
          { label: 'ROI', value: '7.8%' },
        ]}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        loading
        title=""
        location=""
        price={0}
      />
    </div>
  ),
};

export const NoImage: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <PropertyCard
        type="Apartment"
        title="Property Without Image"
        location="Unknown, Spain"
        category="Flat"
        bedrooms={1}
        bathrooms={1}
        area={50}
        price={75000}
        yieldPercent={5}
      />
    </div>
  ),
};

export const Grid: Story = {
  name: 'Property Card Grid',
  render: () => (
    <div style={{ padding: 24, backgroundColor: '#f8fafc', minWidth: 1100 }}>
      <PropertyCardGrid columns={3} gap={24}>
        <PropertyCard
          image={DEMO_IMAGE}
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
        />
        <PropertyCard
          image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
          type="House"
          title="Coastal Villa Premium"
          status="reserved"
          location="Valencia, Spain"
          category="House"
          bedrooms={4}
          bathrooms={3}
          area={220}
          price={450000}
          yieldPercent={5.2}
          infoRows={[
            { label: 'Estimated rent', value: '2,800€/month' },
            { label: 'Total investment', value: '485,000€' },
          ]}
        />
        <PropertyCard
          image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop"
          type="Apartment"
          title="Downtown Studio"
          status="sold"
          location="Barcelona, Spain"
          category="Studio"
          bedrooms={1}
          bathrooms={1}
          area={42}
          price={125000}
          yieldPercent={4.8}
        />
        <PropertyCard
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop"
          type="Project"
          title="New Development"
          status="comingSoon"
          location="Málaga, Spain"
          price={175000}
        />
        <PropertyCard
          image="https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=600&h=400&fit=crop"
          type="Apartment"
          title="Investment Opportunity"
          status="available"
          location="Sevilla, Spain"
          category="Flat"
          bedrooms={2}
          bathrooms={1}
          area={68}
          price={82000}
          yieldPercent={8.5}
          infoRows={[
            { label: 'Estimated rent', value: '580€/month' },
            { label: 'Total investment', value: '95,400€' },
            { label: 'Capital gain', value: '72.000€', hasInfo: true },
          ]}
        />
        <PropertyCard
          loading
          title=""
          location=""
          price={0}
        />
      </PropertyCardGrid>
    </div>
  ),
};
