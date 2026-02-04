import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Uploader } from '../src/components/ui/uploader';

const meta: Meta<typeof Uploader> = {
  title: 'Components/Uploader',
  component: Uploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Uploader

File upload component with drag & drop support.

Based on Figma Design System: [Uploader Component](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=450-8246)

## Features
- **Variants**: Dropzone, Button, Gallery
- **Drag & Drop**: Drop files directly into the zone
- **Click to Browse**: Traditional file picker
- **File Previews**: Thumbnails for images
- **File List**: Shows uploaded files with size and remove button
- **Validation**: Max size and max files limits
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Uploader>;

export const Default: Story = {
  name: 'Dropzone (Default)',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader 
        variant="dropzone"
        label="Upload files"
        helperText="Max 10MB per file. Supports images, PDFs, and documents."
        onChange={(files) => console.log('Files:', files)}
      />
    </div>
  ),
};

export const ButtonVariant: Story = {
  name: 'Button Variant',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader 
        variant="button"
        label="Upload document"
        buttonText="Select file"
        helperText="PDF, DOC, DOCX up to 10MB"
        onChange={(files) => console.log('Files:', files)}
      />
    </div>
  ),
};

export const GalleryVariant: Story = {
  name: 'Gallery Variant',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader 
        variant="gallery"
        label="Property photos"
        accept="image/*"
        helperText="Upload images to see them in a gallery grid"
        onChange={(files) => console.log('Files:', files)}
      />
    </div>
  ),
};

export const ImagesOnly: Story = {
  name: 'Images Only',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader 
        label="Upload images"
        accept="image/*"
        helperText="Only image files are accepted (JPG, PNG, GIF, WebP)"
        onChange={(files) => console.log('Files:', files)}
      />
    </div>
  ),
};

export const SingleFile: Story = {
  name: 'Single File',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader 
        variant="button"
        multiple={false}
        accept=".pdf,.doc,.docx"
        buttonText="Choose document"
        helperText="Upload a single PDF or Word document"
        onChange={(files) => console.log('Files:', files)}
      />
    </div>
  ),
};

export const WithLimits: Story = {
  name: 'With Limits',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader 
        label="Upload files (max 3 files, 5MB each)"
        maxFiles={3}
        maxSize={5 * 1024 * 1024}
        helperText="Maximum 3 files, 5MB each"
        onChange={(files) => console.log('Files:', files)}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <Uploader 
        variant="dropzone"
        label="Dropzone disabled"
        disabled
      />
      <Uploader 
        variant="button"
        buttonText="Select file"
        disabled
      />
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 450 }}>
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          Dropzone
        </h4>
        <Uploader 
          variant="dropzone"
          helperText="Drag & drop or click to browse"
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          Button
        </h4>
        <Uploader 
          variant="button"
          buttonText="Select file"
          helperText="Click button to choose files"
        />
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: '#71717a' }}>
          Gallery (for images)
        </h4>
        <Uploader 
          variant="gallery"
          accept="image/*"
          helperText="Upload images to see gallery grid"
        />
      </div>
    </div>
  ),
};

export const PropertyImages: Story = {
  name: 'Property Images Example',
  render: () => (
    <div style={{ 
      width: 500, 
      padding: 24, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>
        Property Photos
      </h3>
      <Uploader 
        variant="gallery"
        accept="image/*"
        maxFiles={20}
        maxSize={10 * 1024 * 1024}
        helperText="Upload up to 20 photos. Max 10MB each. First image will be the cover."
        onChange={(files) => console.log('Property images:', files)}
      />
    </div>
  ),
};

export const DocumentUpload: Story = {
  name: 'Document Upload Example',
  render: () => (
    <div style={{ 
      width: 500, 
      padding: 24, 
      backgroundColor: '#fff', 
      borderRadius: 12,
      border: '1px solid #e4e4e7',
    }}>
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>
        Legal Documents
      </h3>
      <Uploader 
        variant="dropzone"
        accept=".pdf,.doc,.docx"
        maxFiles={5}
        label="Required documents"
        helperText="Upload title deed, ID documents, and contracts (PDF or Word)"
        onChange={(files) => console.log('Documents:', files)}
      />
    </div>
  ),
};
