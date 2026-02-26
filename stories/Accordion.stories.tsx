import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../src/components/ui/accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
    defaultValue: { control: 'object' },
    value: { control: 'object' },
  },
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
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the Vistral design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It has smooth expand/collapse animations.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

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
        <AccordionContent>Try opening this while the first one is still open.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>All three can be open simultaneously!</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

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
            We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank
            transfers. For enterprise customers, we also offer invoicing options.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping is available for 2-3
            business days. International shipping times vary by location.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Can I return my purchase?</AccordionTrigger>
          <AccordionContent>
            Yes! We offer a 30-day return policy for all unused items in their original packaging.
            Contact our support team to initiate a return.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
          <AccordionContent>
            Absolutely! Our support team is available 24/7 via chat, email, and phone. Premium
            customers get priority support with dedicated account managers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['item-1'])

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
            <AccordionContent>Content for the first item.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>Content for the second item.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>Content for the third item.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
}

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
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#71717a' }}>
                    {value}
                  </td>
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
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p style={{ margin: 0, fontSize: 13 }}>{review.text}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const SingleExpand: Story = {
  name: 'Single Expand',
  render: () => (
    <Accordion type="single" style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>
          Only one section can be open at a time. Opening another will close this one.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>
          Click on Section Three to see this one collapse automatically.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>
          This is the third section. Only one section is visible at any given time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultipleExpand: Story = {
  name: 'Multiple Expand',
  render: () => (
    <Accordion type="multiple" style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Personal Information</AccordionTrigger>
        <AccordionContent>
          Name, email, phone number, and address fields would go here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Payment Details</AccordionTrigger>
        <AccordionContent>
          Credit card number, expiration date, and CVV fields would go here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Shipping Preferences</AccordionTrigger>
        <AccordionContent>
          Delivery method, special instructions, and preferred time slot options would go here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Collapsible: Story = {
  name: 'Collapsible',
  render: () => (
    <Accordion type="single" collapsible style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Click me, then click again to collapse</AccordionTrigger>
        <AccordionContent>
          With collapsible enabled, clicking the open trigger again will close it, leaving all items
          collapsed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another collapsible item</AccordionTrigger>
        <AccordionContent>
          Each item can be toggled open and closed independently of the others.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third collapsible item</AccordionTrigger>
        <AccordionContent>
          All items can be closed at the same time when collapsible is true.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DefaultOpen: Story = {
  name: 'Default Open',
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1']} style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Open by Default</AccordionTrigger>
        <AccordionContent>
          This item is expanded on initial render via the defaultValue prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Closed by Default</AccordionTrigger>
        <AccordionContent>
          This item starts collapsed but can be opened by clicking the trigger.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Also Closed by Default</AccordionTrigger>
        <AccordionContent>Another item that starts in the closed state.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: () => (
    <Accordion type="single" collapsible style={{ width: 400 }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Item</AccordionTrigger>
        <AccordionContent>
          This item works normally and can be expanded or collapsed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          Disabled Item (cannot expand)
        </AccordionTrigger>
        <AccordionContent>
          This content should not be reachable because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Enabled Item</AccordionTrigger>
        <AccordionContent>
          This item also works normally alongside the disabled one.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const CustomContent: Story = {
  name: 'Custom Content',
  render: () => (
    <Accordion type="multiple" style={{ width: 480 }}>
      <AccordionItem value="checklist">
        <AccordionTrigger>Project Checklist</AccordionTrigger>
        <AccordionContent>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {[
              { done: true, label: 'Set up repository' },
              { done: true, label: 'Configure CI/CD pipeline' },
              { done: false, label: 'Write unit tests' },
              { done: false, label: 'Deploy to staging' },
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 0',
                  fontSize: 13,
                  color: item.done ? '#16a34a' : '#52525b',
                }}
              >
                <span>{item.done ? '✓' : '○'}</span>
                <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="nested">
        <AccordionTrigger>Team Members</AccordionTrigger>
        <AccordionContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Ana López', role: 'Lead Designer', color: '#6366f1' },
              { name: 'Carlos Reyes', role: 'Frontend Engineer', color: '#0ea5e9' },
              { name: 'Mia Santos', role: 'Product Manager', color: '#f59e0b' },
            ].map(member => (
              <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: member.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {member.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{member.name}</div>
                  <div style={{ fontSize: 12, color: '#71717a' }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="stats">
        <AccordionTrigger>Project Statistics</AccordionTrigger>
        <AccordionContent>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Commits', value: '1,247' },
              { label: 'Pull Requests', value: '312' },
              { label: 'Open Issues', value: '28' },
              { label: 'Contributors', value: '9' },
            ].map(stat => (
              <div
                key={stat.label}
                style={{
                  padding: 12,
                  backgroundColor: '#fafafa',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: '#09090b' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const FAQSection: Story = {
  name: 'FAQ Section',
  render: () => (
    <div style={{ width: 540 }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: 24,
            fontWeight: 700,
            color: '#09090b',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Got Questions?
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: '#71717a',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Find answers to the most common questions about our platform.
        </p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="faq-1">
          <AccordionTrigger>How do I create an account?</AccordionTrigger>
          <AccordionContent>
            Click the "Sign Up" button in the top right corner. You can register with your email
            address or use Google/Apple sign-in. The process takes less than a minute.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>What are the subscription plans?</AccordionTrigger>
          <AccordionContent>
            We offer three plans: Free (up to 3 projects), Pro ($12/month for unlimited projects and
            priority support), and Enterprise (custom pricing with dedicated account management and
            SLA guarantees).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>Can I invite team members?</AccordionTrigger>
          <AccordionContent>
            Yes! Pro and Enterprise plans support unlimited team members. Go to Settings → Team to
            send invitations via email. Each member can be assigned roles like Admin, Editor, or
            Viewer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC
            2 Type II certified and conduct regular third-party security audits. Your data is backed
            up daily across multiple regions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-5">
          <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            You can cancel anytime from Settings → Billing → Cancel Plan. Your access continues
            until the end of the current billing period. We also offer a 30-day money-back guarantee
            for new subscribers.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
