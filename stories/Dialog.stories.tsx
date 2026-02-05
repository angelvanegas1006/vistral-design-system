import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '../src/components/ui/dialog'
import { Button } from '../src/components/ui/button'
import { Input, Textarea } from '../src/components/ui/input'
import { Checkbox } from '../src/components/ui/checkbox'
import { AlertTriangle, Trash2, Upload, X } from 'lucide-react'

const meta: Meta = {
  title: 'Components/Dialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dialog

Dialog component matching Figma design.

Based on Figma:
- [Desktop Dialog](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=2777-56986)
- [Mobile Dialog & Bottom Sheet](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=381-6186)

## Features
- **5 Sizes**: Small (400px) to Full screen
- **Variants**: Desktop, Mobile, Bottom Sheet
- **Composable**: Header, Body, Footer sections
- **Accessible**: Focus trap, escape to close
- **Animations**: Smooth enter/exit transitions
- **Mobile Support**: Back button, full-width buttons
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title Text</DialogTitle>
          <DialogDescription>This is a card description.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div
            style={{
              padding: '16px',
              border: '1px dashed #d4d4d8',
              borderRadius: 8,
              textAlign: 'center',
              color: '#71717a',
              fontSize: 14,
            }}
          >
            Instance Slot
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Button</Button>
          </DialogClose>
          <Button>Button</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SingleButton: StoryObj = {
  name: 'Single Button (Full Width)',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title Text</DialogTitle>
          <DialogDescription>This is a card description.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div
            style={{
              padding: '16px',
              border: '1px dashed #d4d4d8',
              borderRadius: 8,
              textAlign: 'center',
              color: '#71717a',
              fontSize: 14,
              minHeight: 100,
            }}
          >
            Instance Slot
          </div>
        </DialogBody>
        <DialogFooter>
          <Button style={{ width: '100%' }}>Button</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SmallDialog: StoryObj = {
  name: 'Small Dialog (Figma Example)',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Approve Property Data</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Approve Property Data</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this property data? This action will make the property
            visible to all users.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Deny</Button>
          </DialogClose>
          <Button>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const MediumDialog: StoryObj = {
  name: 'Medium Dialog (Figma Example)',
  render: () => {
    const [category, setCategory] = React.useState('')
    const [minPrice, setMinPrice] = React.useState('')
    const [maxPrice, setMaxPrice] = React.useState('')
    const [amenities, setAmenities] = React.useState({
      wifi: false,
      parking: false,
      pool: false,
      gym: false,
    })

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Filter Properties</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Filter with more properties</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                  Select category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #e4e4e7',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                >
                  <option value="">Select...</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                  Price range
                </label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    fullWidth
                  />
                  <span style={{ color: '#71717a' }}>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>

              <div>
                <label
                  style={{ display: 'block', marginBottom: 12, fontSize: 14, fontWeight: 500 }}
                >
                  Amenities
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Checkbox
                    checked={amenities.wifi}
                    onCheckedChange={checked => setAmenities({ ...amenities, wifi: !!checked })}
                  >
                    WiFi
                  </Checkbox>
                  <Checkbox
                    checked={amenities.parking}
                    onCheckedChange={checked => setAmenities({ ...amenities, parking: !!checked })}
                  >
                    Parking
                  </Checkbox>
                  <Checkbox
                    checked={amenities.pool}
                    onCheckedChange={checked => setAmenities({ ...amenities, pool: !!checked })}
                  >
                    Pool
                  </Checkbox>
                  <Checkbox
                    checked={amenities.gym}
                    onCheckedChange={checked => setAmenities({ ...amenities, gym: !!checked })}
                  >
                    Gym
                  </Checkbox>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button style={{ width: '100%' }}>Apply filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const LargeDialog: StoryObj = {
  name: 'Large Dialog (Figma Example)',
  render: () => {
    const [files, setFiles] = React.useState([
      { name: 'DOC_Name.pdf', size: '2.4 MB' },
      { name: 'Doc_Photo.png', size: '1.2 MB' },
      { name: 'Spreadsheet.xlsx', size: '856 KB' },
    ])

    const removeFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index))
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Attach Documents</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Attach documents to all Units</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div
                style={{
                  border: '2px dashed #d4d4d8',
                  borderRadius: 12,
                  padding: '48px 24px',
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2050f6'
                  e.currentTarget.style.backgroundColor = '#f0f5ff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#d4d4d8'
                  e.currentTarget.style.backgroundColor = '#fafafa'
                }}
              >
                <Upload size={32} style={{ color: '#71717a', marginBottom: 12 }} />
                <p style={{ margin: 0, fontSize: 14, color: '#18181b', fontWeight: 500 }}>
                  Drop your files here, or browse
                </p>
              </div>

              {files.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: '#fafafa',
                        borderRadius: 8,
                        border: '1px solid #e4e4e7',
                      }}
                    >
                      <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#18181b' }}>
                          {file.name}
                        </p>
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#71717a' }}>
                          {file.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        style={{
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          borderRadius: 6,
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          color: '#71717a',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = '#fee2e2'
                          e.currentTarget.style.color = '#dc2626'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = '#71717a'
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const ExtraLargeDialog: StoryObj = {
  name: 'Extra Large Dialog (Figma Example)',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete Confirmation</Button>
      </DialogTrigger>
      <DialogContent size="xl">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                width: '100%',
                height: 300,
                backgroundColor: '#e4e4e7',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#71717a',
                fontSize: 14,
              }}
            >
              Image Placeholder
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#52525b', lineHeight: 1.6 }}>
              Are you sure you want to delete this item? This action cannot be undone and will
              permanently remove all associated data.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  style={{
                    width: 80,
                    height: 60,
                    backgroundColor: '#f4f4f5',
                    borderRadius: 8,
                    border: '1px solid #e4e4e7',
                  }}
                />
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button style={{ width: '100%' }} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Sizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">{size.toUpperCase()}</Button>
          </DialogTrigger>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>Size: {size.toUpperCase()}</DialogTitle>
              <DialogDescription>
                This dialog is{' '}
                {size === 'sm'
                  ? '400px'
                  : size === 'md'
                    ? '500px'
                    : size === 'lg'
                      ? '640px'
                      : '800px'}{' '}
                wide.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p style={{ margin: 0, color: '#3f3f46' }}>Dialog content goes here.</p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
}

export const MobileDialog: StoryObj = {
  name: 'Mobile Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Mobile Dialog</Button>
      </DialogTrigger>
      <DialogContent variant="mobile">
        <DialogHeader showBack>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>This is a mobile dialog example.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div
            style={{
              padding: '16px',
              border: '1px dashed #d4d4d8',
              borderRadius: 8,
              textAlign: 'center',
              color: '#71717a',
              fontSize: 14,
              minHeight: 200,
            }}
          >
            Instance Slot
          </div>
        </DialogBody>
        <DialogFooter stacked>
          <Button style={{ width: '100%' }}>Button</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const BottomSheet: StoryObj = {
  name: 'Bottom Sheet',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Bottom Sheet</Button>
      </DialogTrigger>
      <DialogContent variant="bottom-sheet">
        <DialogHeader>
          <DialogTitle>Title Text</DialogTitle>
          <DialogDescription>This is a card description.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div
            style={{
              padding: '16px',
              border: '1px dashed #d4d4d8',
              borderRadius: 8,
              textAlign: 'center',
              color: '#71717a',
              fontSize: 14,
              minHeight: 200,
            }}
          >
            Instance Slot
          </div>
        </DialogBody>
        <DialogFooter stacked>
          <Button style={{ width: '100%' }}>Button</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const DeleteConfirmation: StoryObj = {
  name: 'Delete Confirmation',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" leftIcon={Trash2}>
          Delete Item
        </Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              marginBottom: 16,
            }}
          >
            <AlertTriangle size={24} color="#dc2626" />
          </div>
          <DialogTitle>Delete Item?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item and remove all
            associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const AllVariations: StoryObj = {
  name: 'All Variations (Figma Reference)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
        backgroundColor: '#f8fafc',
      }}
    >
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Desktop - Two Buttons</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Title Text</DialogTitle>
              <DialogDescription>This is a card description.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div
                style={{
                  padding: '16px',
                  border: '1px dashed #d4d4d8',
                  borderRadius: 8,
                  textAlign: 'center',
                  color: '#71717a',
                  fontSize: 14,
                }}
              >
                Instance Slot
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Button</Button>
              </DialogClose>
              <Button>Button</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Desktop - Single Button</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Title Text</DialogTitle>
              <DialogDescription>This is a card description.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div
                style={{
                  padding: '16px',
                  border: '1px dashed #d4d4d8',
                  borderRadius: 8,
                  textAlign: 'center',
                  color: '#71717a',
                  fontSize: 14,
                  minHeight: 100,
                }}
              >
                Instance Slot
              </div>
            </DialogBody>
            <DialogFooter>
              <Button style={{ width: '100%' }}>Button</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ),
}
