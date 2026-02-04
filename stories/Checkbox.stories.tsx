import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '../src/components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Checkbox

Checkbox component matching Figma design.

Based on Figma: [Checkbox](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=360-4634)

## Features
- **States**: Unchecked, Checked, Indeterminate, Disabled, Error
- **Hover States**: Visual feedback on hover
- **Focus Ring**: Accessible focus indicator
- **Label & Description**: Built-in support
- **Position**: Left or right of label
- **Checkbox Group**: Container for multiple checkboxes
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
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Unchecked States */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Unchecked</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Label" description="Description" />
          <Checkbox label="Label" description="Description" showHoverBg />
          <Checkbox label="Label" description="Description" error />
        </div>
      </div>

      {/* Checked States */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Checked</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Label" description="Description" checked />
          <Checkbox label="Label" description="Description" checked showHoverBg />
          <Checkbox label="Label" description="Description" checked error />
        </div>
      </div>

      {/* Indeterminate States */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Indeterminate</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Label" description="Description" indeterminate />
          <Checkbox label="Label" description="Description" indeterminate showHoverBg />
          <Checkbox label="Label" description="Description" indeterminate disabled />
        </div>
      </div>

      {/* Disabled States */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Disabled</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Label" description="Description" disabled />
          <Checkbox label="Label" description="Description" disabled checked />
          <Checkbox label="Label" description="Description" disabled indeterminate />
        </div>
      </div>
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

export const PositionVariations: Story = {
  name: 'Position Variations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Left Position (Default) */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Checkbox on Left (Default)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Label" description="Description" position="left" />
          <Checkbox label="Label" description="Description" position="left" checked />
          <Checkbox label="Label" description="Description" position="left" error />
        </div>
      </div>

      {/* Right Position */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>Checkbox on Right</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox label="Label" description="Description" position="right" />
          <Checkbox label="Label" description="Description" position="right" checked />
          <Checkbox label="Label" description="Description" position="right" error />
        </div>
      </div>
    </div>
  ),
};

export const WithHoverBackground: Story = {
  name: 'With Hover Background',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox 
        label="Option 1"
        description="Hover to see background"
        showHoverBg
      />
      <Checkbox 
        label="Option 2"
        description="Hover to see background"
        checked
        showHoverBg
      />
      <Checkbox 
        label="Option 3"
        description="Hover to see background"
        indeterminate
        showHoverBg
      />
    </div>
  ),
};

export const ErrorStates: Story = {
  name: 'Error States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox 
        label="Required field"
        description="This field is required"
        error
      />
      <Checkbox 
        label="Invalid selection"
        description="Please select a valid option"
        error
        checked
      />
      <div style={{ 
        padding: 16, 
        backgroundColor: '#fff', 
        borderRadius: 8,
        border: '1px solid #e4e4e7',
      }}>
        <CheckboxGroup 
          label="Select at least one option"
          error="This is an error description."
        >
          <Checkbox label="Label" description="Description" error />
          <Checkbox label="Label" description="Description" error />
          <Checkbox label="Label" description="Description" error />
        </CheckboxGroup>
      </div>
    </div>
  ),
};

export const CheckboxGroupExample: Story = {
  name: 'Checkbox Group',
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
        width: 400,
      }}>
        <CheckboxGroup label="Preferences">
          <Checkbox 
            label="Select all"
            checked={allChecked}
            indeterminate={someChecked && !allChecked}
            onCheckedChange={toggleAll}
          />
          
          <div style={{ marginLeft: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
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
        </CheckboxGroup>
      </div>
    );
  },
};

export const HorizontalGroup: Story = {
  name: 'Horizontal Group',
  render: () => (
    <div style={{ width: 600 }}>
      <CheckboxGroup label="Select options" orientation="horizontal">
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" checked />
        <Checkbox label="Option 3" />
      </CheckboxGroup>
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

export const AllVariations: Story = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 24, backgroundColor: '#f8fafc' }}>
      {/* Left Position Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#71717a' }}>Checkbox Left</h3>
        <Checkbox label="Label" description="Description" />
        <Checkbox label="Label" description="Description" checked />
        <Checkbox label="Label" description="Description" error />
        <Checkbox label="Label" description="Description" disabled />
        <Checkbox label="Label" description="Description" disabled checked />
      </div>

      {/* Right Position Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#71717a' }}>Checkbox Right</h3>
        <Checkbox label="Label" description="Description" position="right" />
        <Checkbox label="Label" description="Description" position="right" checked />
        <Checkbox label="Label" description="Description" position="right" error />
        <Checkbox label="Label" description="Description" position="right" disabled />
        <Checkbox label="Label" description="Description" position="right" disabled checked />
      </div>

      {/* With Hover Background */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#71717a' }}>With Hover BG</h3>
        <Checkbox label="Label" description="Description" showHoverBg />
        <Checkbox label="Label" description="Description" checked showHoverBg />
        <Checkbox label="Label" description="Description" disabled showHoverBg />
      </div>
    </div>
  ),
};
