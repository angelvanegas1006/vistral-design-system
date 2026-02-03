import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Checkbox

Based on Figma Design System: [Checkbox Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=261-4582)

## Features
- **States**: Unchecked, Checked, Indeterminate, Disabled, Error
- **Label & Description**: Built-in support for labels
- **Accessible**: Proper ARIA attributes
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled checked />
      <Checkbox label="Error State" error />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox 
        label="Marketing emails"
        description="Receive emails about new products, features, and more."
      />
      <Checkbox 
        label="Security updates"
        description="Get notified about security updates and alerts."
        checked
      />
      <Checkbox 
        label="Newsletter"
        description="Weekly digest of the best content."
        disabled
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Checkbox 
          label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <button 
          onClick={() => setChecked(!checked)}
          style={{
            padding: '8px 16px',
            border: '1px solid #d4d4d8',
            borderRadius: 8,
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          Toggle from outside
        </button>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [values, setValues] = React.useState({
      terms: false,
      privacy: false,
      marketing: false,
    });
    
    const allChecked = values.terms && values.privacy && values.marketing;
    const someChecked = values.terms || values.privacy || values.marketing;
    
    const toggleAll = () => {
      const newValue = !allChecked;
      setValues({
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      });
    };
    
    return (
      <div style={{ 
        padding: 24, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
        width: 350,
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
          Preferences
        </h3>
        
        <Checkbox 
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked && !allChecked}
          onCheckedChange={toggleAll}
        />
        
        <div style={{ 
          marginLeft: 24, 
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <Checkbox 
            label="Terms of Service"
            description="I agree to the terms of service"
            checked={values.terms}
            onCheckedChange={(checked) => setValues(v => ({ ...v, terms: checked }))}
          />
          <Checkbox 
            label="Privacy Policy"
            description="I agree to the privacy policy"
            checked={values.privacy}
            onCheckedChange={(checked) => setValues(v => ({ ...v, privacy: checked }))}
          />
          <Checkbox 
            label="Marketing"
            description="Send me marketing emails"
            checked={values.marketing}
            onCheckedChange={(checked) => setValues(v => ({ ...v, marketing: checked }))}
          />
        </div>
      </div>
    );
  },
};
