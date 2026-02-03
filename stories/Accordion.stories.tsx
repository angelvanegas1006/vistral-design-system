import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../src/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Accordion

Based on Figma Design System: [Accordion Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=624-2306)

## Features
- **Single/Multiple**: Allow one or multiple items open
- **Collapsible**: Option to close all items
- **Controlled/Uncontrolled**: Both modes supported
- **Accessible**: ARIA attributes for screen readers
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the Vistral design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It has smooth expand/collapse animations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1']} style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>
          This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>
          Try opening this while the first one is still open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          All three can be open simultaneously!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  name: 'FAQ Example',
  render: () => (
    <div style={{ width: 500 }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 600 }}>
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards (Visa, MasterCard, American Express), 
            PayPal, and bank transfers. For enterprise customers, we also offer 
            invoicing options.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available 
            for 2-3 business days. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Can I return my purchase?</AccordionTrigger>
          <AccordionContent>
            Yes! We offer a 30-day return policy for all unused items in their 
            original packaging. Contact our support team to initiate a return.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
          <AccordionContent>
            Absolutely! Our support team is available 24/7 via chat, email, and 
            phone. Premium customers get priority support with dedicated account 
            managers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['item-1']);
    
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#71717a' }}>
            Currently open: {value.length ? value.join(', ') : 'none'}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setValue(['item-1', 'item-2', 'item-3'])}
              style={{
                padding: '6px 12px',
                border: '1px solid #d4d4d8',
                borderRadius: 6,
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Open All
            </button>
            <button 
              onClick={() => setValue([])}
              style={{
                padding: '6px 12px',
                border: '1px solid #d4d4d8',
                borderRadius: 6,
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Close All
            </button>
          </div>
        </div>
        
        <Accordion type="multiple" value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              Content for the first item.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              Content for the second item.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>
              Content for the third item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

export const NestedContent: Story = {
  name: 'Rich Content',
  render: () => (
    <Accordion type="single" style={{ width: 500 }}>
      <AccordionItem value="features">
        <AccordionTrigger>Product Features</AccordionTrigger>
        <AccordionContent>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>High-performance processing</li>
            <li>256GB storage capacity</li>
            <li>12-hour battery life</li>
            <li>Water-resistant design</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="specs">
        <AccordionTrigger>Technical Specifications</AccordionTrigger>
        <AccordionContent>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {[
                ['Processor', 'Octa-core 2.8 GHz'],
                ['RAM', '8GB DDR5'],
                ['Storage', '256GB SSD'],
                ['Display', '6.7" OLED, 120Hz'],
                ['Battery', '5000mAh'],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: '1px solid #e4e4e7' }}>
                  <td style={{ padding: '8px 0', fontWeight: 500 }}>{label}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#71717a' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="reviews">
        <AccordionTrigger>Customer Reviews</AccordionTrigger>
        <AccordionContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { rating: 5, text: 'Amazing product! Exceeded my expectations.' },
              { rating: 4, text: 'Great value for money.' },
            ].map((review, i) => (
              <div key={i} style={{ padding: 12, backgroundColor: '#fafafa', borderRadius: 8 }}>
                <div style={{ marginBottom: 4 }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p style={{ margin: 0, fontSize: 13 }}>{review.text}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
