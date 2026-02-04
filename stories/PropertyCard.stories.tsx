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

Based on Figma: [PropertyCard](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-15881)

## Features
- **Edge-to-edge image** - fills card width
- **Type badge** - Apartment, Project, House
- **Status badges** - Available, Reserved, Sold, Coming Soon
- **Value labels** - Off market, High Yield, New Construction, High Value
- **Net Yield in BLUE** color
- **Info rows** with optional info icon
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 380 }}>
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

export const StatusManagement: Story = {
  name: 'Status Management',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Available</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián"
          status="available"
          location="Madrid, Spain"
          category="Flat"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Reserved</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián"
          status="reserved"
          location="Madrid, Spain"
          category="Flat"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Sold</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián"
          status="sold"
          location="Madrid, Spain"
          category="Flat"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Coming Soon</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Project"
          title="Property in San Sebastián"
          status="comingSoon"
          location="Madrid, Spain"
          price={90000}
        />
      </div>
    </div>
  ),
};

export const Available: Story = {
  render: () => (
    <div style={{ width: 380 }}>
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
    <div style={{ width: 380 }}>
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
    <div style={{ width: 380 }}>
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
    <div style={{ width: 380 }}>
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

export const ValueLabels: Story = {
  name: 'Value Added Labels',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ width: 260 }}>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián..."
          valueLabels={['offMarket']}
          location="Madrid · Vallecas"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={134880}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€' },
            { label: 'Cashflow', value: '90.000€' },
            { label: 'Furniture', value: 'T0034' },
          ]}
        />
      </div>
      <div style={{ width: 260 }}>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián..."
          valueLabels={['highYield']}
          location="Madrid · Vallecas"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={134500}
          yieldPercent={8}
          infoRows={[
            { label: 'Estimated rent', value: '650€' },
            { label: 'Cashflow', value: '90.000€' },
            { label: 'Furniture', value: 'T0034' },
          ]}
        />
      </div>
      <div style={{ width: 260 }}>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián..."
          valueLabels={['newConstruction']}
          location="Madrid · Vallecas"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={134880}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€' },
            { label: 'Cashflow', value: '90.000€' },
            { label: 'Furniture', value: 'T0034' },
          ]}
        />
      </div>
      <div style={{ width: 260 }}>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián..."
          valueLabels={['highValue']}
          location="Madrid · Vallecas"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={134880}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€' },
            { label: 'Cashflow', value: '90.000€' },
            { label: 'Furniture', value: 'T0034' },
          ]}
        />
      </div>
      <div style={{ width: 260 }}>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property Value Example..."
          valueLabels={['highYield', 'newConstruction']}
          location="Madrid · Vallecas"
          bedrooms={4}
          bathrooms={1}
          area={85}
          price={134880}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€' },
            { label: 'Cashflow', value: '90.000€' },
            { label: 'Furniture', value: 'T0034' },
          ]}
        />
      </div>
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
