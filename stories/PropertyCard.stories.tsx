import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PropertyCard, PropertyCardGrid } from '../src/components/ui/property-card'

const DEMO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop'
const PROJECT_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop'

const meta: Meta<typeof PropertyCard> = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Property Card

Property Card component matching Figma design.

Based on Figma:
- [Property Card Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-20788)
- [Status Management](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-20901)
- [Value Labels](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-24261)
- [Edge Cases](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-24297)

## Features
- **Type Badge**: Apartment, Project (dark grey pill on image)
- **Status Badges**: Available (green), Reserved (orange), Sold (grey), Coming Soon (purple)
- **Value Labels**: Off market, High yield, New Construction, High Value (max 2)
- **Feature Pills**: Flat, beds, baths, m² with icons
- **Delivery Info**: For projects (Delivery date + construction status)
- **Info Rows**: Estimated rent, Total investment, Capital gain with optional info icon
- **Edge Cases**: Long numbers, long names, missing data
- **Skeleton Loading**: Loading placeholder state

## Best Practices
- Prioritize best image as primary
- Use consistent aspect ratios
- Implement subtle hover states
- Limit value labels to max 2
- Handle missing data gracefully
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PropertyCard>

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
}

export const TypeOfProduct: Story = {
  name: 'Type of Product (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Apartment</p>
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
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Project</p>
        <PropertyCard
          image={PROJECT_IMAGE}
          type="Project"
          title="Property in Navacerrada"
          status="available"
          location="Madrid, Spain"
          deliveryDate="June 2028"
          constructionStatus="under construction"
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
            { label: 'Capital gain', value: '90.000€', hasInfo: true },
          ]}
        />
      </div>
    </div>
  ),
}

export const StatusManagement: Story = {
  name: 'Status Management (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Available</p>
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
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Reserved</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in Navacerrada"
          status="reserved"
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
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Sold</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in Navacerrada"
          status="sold"
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
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Coming Soon</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Project"
          title="Property in Navacerrada"
          status="comingSoon"
          location="Madrid, Spain"
          price={90000}
        />
      </div>
    </div>
  ),
}

export const ValueAddedLabels: Story = {
  name: 'Value Added Labels (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Off market</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in Navacerrada"
          status="available"
          valueLabels={['offMarket']}
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
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>High yield</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in Navacerrada"
          status="available"
          valueLabels={['highYield']}
          location="Madrid, Spain"
          category="Flat"
          bedrooms={2}
          bathrooms={1}
          area={85}
          price={90000}
          yieldPercent={8}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>New Construction</p>
        <PropertyCard
          image={PROJECT_IMAGE}
          type="Project"
          title="Property in Navacerrada"
          status="available"
          valueLabels={['newConstruction']}
          location="Madrid, Spain"
          deliveryDate="June 2028"
          constructionStatus="under construction"
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>High Value</p>
        <PropertyCard
          image={PROJECT_IMAGE}
          type="Project"
          title="Property in Navacerrada"
          status="available"
          valueLabels={['highValue']}
          location="Madrid, Spain"
          deliveryDate="June 2028"
          constructionStatus="under construction"
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Combined (Max 2)</p>
        <PropertyCard
          image={PROJECT_IMAGE}
          type="Project"
          title="Property in Navacerrada"
          status="available"
          valueLabels={['highValue', 'offMarket']}
          location="Madrid, Spain"
          deliveryDate="June 2028"
          constructionStatus="under construction"
          price={90000}
          yieldPercent={6}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
    </div>
  ),
}

export const EdgeCases: Story = {
  name: 'Edge Cases (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Long Numbers</p>
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
          price={1548866}
          yieldPercent={8}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Long Names</p>
        <PropertyCard
          image={DEMO_IMAGE}
          type="Apartment"
          title="Property in San Sebastián de los Reyes"
          status="available"
          location="Madrid, Spain"
          category="Flat"
          bedrooms={2}
          bathrooms={1}
          area={85}
          price={1548866}
          yieldPercent={8}
          infoRows={[
            { label: 'Estimated rent', value: '650€/month' },
            { label: 'Total investment', value: '113,100€' },
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Missing Data</p>
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
          price={1548866}
          yieldPercent={8}
          infoRows={[
            { label: 'Estimated rent', value: null },
            { label: 'Total investment', value: 'XXXXX' },
            { label: 'Capital gain', value: null },
          ]}
        />
      </div>
    </div>
  ),
}

export const FeedbackStatus: Story = {
  name: 'Feedback Status (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Hover</p>
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
          ]}
        />
      </div>
      <div style={{ width: 320 }}>
        <p style={{ fontSize: 12, color: '#71717a', marginBottom: 8 }}>Skeleton</p>
        <PropertyCard loading title="" location="" price={0} />
      </div>
    </div>
  ),
}

export const ProjectCard: Story = {
  name: 'Project Card',
  render: () => (
    <div style={{ width: 380 }}>
      <PropertyCard
        image={PROJECT_IMAGE}
        type="Project"
        title="New Development Phase 2"
        status="comingSoon"
        location="Málaga, Spain"
        deliveryDate="June 2026"
        constructionStatus="under construction"
        price={150000}
        yieldPercent={6}
        infoRows={[
          { label: 'Estimated rent', value: '650€/month' },
          { label: 'Total investment', value: '113,100€' },
          { label: 'Capital gain', value: '90.000€', hasInfo: true },
        ]}
      />
    </div>
  ),
}

export const WithFavoriteButton: Story = {
  name: 'With Favorite Button',
  render: () => (
    <div style={{ width: 380 }}>
      <PropertyCard
        image={DEMO_IMAGE}
        type="Apartment"
        title="Property with Favorite"
        status="available"
        location="Madrid, Spain"
        category="Flat"
        bedrooms={2}
        bathrooms={1}
        area={85}
        price={90000}
        yieldPercent={6}
        showFavorite={true}
        isFavorite={false}
        onFavoriteChange={fav => console.log('Favorite:', fav)}
        infoRows={[
          { label: 'Estimated rent', value: '650€/month' },
          { label: 'Total investment', value: '113,100€' },
        ]}
      />
    </div>
  ),
}

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24, maxWidth: 1200 }}>
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Type of Product</h3>
        <div style={{ display: 'flex', gap: 20 }}>
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
            image={PROJECT_IMAGE}
            type="Project"
            title="Property in Navacerrada"
            status="available"
            location="Madrid, Spain"
            deliveryDate="June 2028"
            constructionStatus="under construction"
            price={90000}
            yieldPercent={6}
            infoRows={[
              { label: 'Estimated rent', value: '650€/month' },
              { label: 'Total investment', value: '113,100€' },
              { label: 'Capital gain', value: '90.000€', hasInfo: true },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Status Management</h3>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {(['available', 'reserved', 'sold', 'comingSoon'] as const).map(status => (
            <PropertyCard
              key={status}
              image={DEMO_IMAGE}
              type="Apartment"
              title="Property in Navacerrada"
              status={status}
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
              ]}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Value Added Labels</h3>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <PropertyCard
            image={DEMO_IMAGE}
            type="Apartment"
            title="Property in Navacerrada"
            status="available"
            valueLabels={['offMarket']}
            location="Madrid, Spain"
            category="Flat"
            bedrooms={2}
            bathrooms={1}
            area={85}
            price={90000}
            yieldPercent={6}
          />
          <PropertyCard
            image={DEMO_IMAGE}
            type="Apartment"
            title="Property in Navacerrada"
            status="available"
            valueLabels={['highYield']}
            location="Madrid, Spain"
            category="Flat"
            bedrooms={2}
            bathrooms={1}
            area={85}
            price={90000}
            yieldPercent={8}
          />
          <PropertyCard
            image={PROJECT_IMAGE}
            type="Project"
            title="Property in Navacerrada"
            status="available"
            valueLabels={['newConstruction']}
            location="Madrid, Spain"
            deliveryDate="June 2028"
            constructionStatus="under construction"
            price={90000}
            yieldPercent={6}
          />
          <PropertyCard
            image={PROJECT_IMAGE}
            type="Project"
            title="Property in Navacerrada"
            status="available"
            valueLabels={['highValue', 'offMarket']}
            location="Madrid, Spain"
            deliveryDate="June 2028"
            constructionStatus="under construction"
            price={90000}
            yieldPercent={6}
          />
        </div>
      </div>
    </div>
  ),
}

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
          deliveryDate="June 2026"
          constructionStatus="under construction"
          price={175000}
        />
        <PropertyCard
          image="https://images.unsplash.com/photo-1600573472591-ee6981cf35c4?w=600&h=400&fit=crop"
          type="Apartment"
          title="Investment Opportunity"
          status="available"
          valueLabels={['highYield']}
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
        <PropertyCard loading title="" location="" price={0} />
      </PropertyCardGrid>
    </div>
  ),
}
