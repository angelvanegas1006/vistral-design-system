import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Uploader } from '../src/components/ui/uploader'

const meta: Meta<typeof Uploader> = {
  title: 'Components/Uploader',
  component: Uploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Uploader

Uploader component matching Figma design.

Based on Figma:
- [Uploader Documentation](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=459-8589)
- [Uploader States](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=459-14574)
- [File List Examples](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=459-14603)

## Features
- **Variants**: Dropzone (large), Button (compact)
- **Drag & Drop**: Drop files directly into the zone
- **Click to Browse**: Traditional file picker
- **File Previews**: Thumbnails for images, icons for documents
- **Upload Progress**: Shows progress percentage with spinner
- **Error States**: Invalid format, size limit, quantity limit, duplicate, network failure
- **File List**: Shows uploaded files with size and remove button

## Best Practices
- Set maximum file number/size clearly
- Show immediate visual feedback
- Use multiple upload inputs for multi-file use cases
- Define file types and size limits clearly
- Maximize interactive area (touch target)
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Uploader>

export const Default: Story = {
  name: 'Dropzone (Default)',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader
        variant="dropzone"
        helperText="Or click to browse (max 10 files, up to 5MB each)"
        maxFiles={10}
        maxSize={5 * 1024 * 1024}
        onChange={files => console.log('Files:', files)}
      />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'All States (Figma Reference)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <div>
        <Uploader
          variant="dropzone"
          helperText="Or click to browse (max 10 files, up to 5MB each)"
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
        />
      </div>
      <div>
        <Uploader
          variant="dropzone"
          helperText="Or click to browse (max 10 files, up to 5MB each)"
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
        />
      </div>
      <div>
        <Uploader
          variant="dropzone"
          error="This is an error description."
          helperText="Or click to browse (max 10 files, up to 5MB each)"
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
        />
      </div>
      <div>
        <Uploader
          variant="button"
          buttonText="Upload a file"
          helperText="PDF, JPG or PNG less than 5MB"
          accept=".pdf,.jpg,.png"
          maxSize={5 * 1024 * 1024}
        />
      </div>
      <div>
        <Uploader
          variant="button"
          buttonText="Upload a file"
          helperText="PDF, JPG or PNG less than 5MB"
          accept=".pdf,.jpg,.png"
          maxSize={5 * 1024 * 1024}
          disabled
        />
      </div>
      <div>
        <Uploader
          variant="button"
          buttonText="Upload a file"
          error="This is an error description."
          helperText="PDF, JPG or PNG less than 5MB"
          accept=".pdf,.jpg,.png"
          maxSize={5 * 1024 * 1024}
        />
      </div>
    </div>
  ),
}

export const ButtonVariant: Story = {
  name: 'Button Variant',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader
        variant="button"
        buttonText="Upload a file"
        helperText="PDF, JPG or PNG less than 5MB"
        accept=".pdf,.jpg,.png"
        maxSize={5 * 1024 * 1024}
        onChange={files => console.log('Files:', files)}
      />
    </div>
  ),
}

export const WithFiles: Story = {
  name: 'With Uploaded Files',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])

    return (
      <div style={{ width: 400 }}>
        <Uploader
          variant="dropzone"
          helperText="Or click to browse (max 10 files, up to 5MB each)"
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
          onChange={newFiles => {
            setFiles(newFiles)
            console.log('Files:', newFiles)
          }}
        />
        {files.length > 0 && (
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f4f4f5', borderRadius: 8 }}>
            <p style={{ margin: 0, fontSize: 12, color: '#71717a' }}>
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    )
  },
}

export const WithProgress: Story = {
  name: 'With Upload Progress',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader
        variant="dropzone"
        helperText="Or click to browse (max 10 files, up to 5MB each)"
        maxFiles={10}
        maxSize={5 * 1024 * 1024}
        simulateProgress
        onChange={files => console.log('Files:', files)}
      />
    </div>
  ),
}

export const ErrorStates: Story = {
  name: 'Error States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <div>
        <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#71717a' }}>
          Invalid Format
        </h4>
        <Uploader
          variant="dropzone"
          accept=".jpg,.png,.gif"
          error="This file format is not supported. Please upload files in JPG, PNG, or GIF."
          maxSize={5 * 1024 * 1024}
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#71717a' }}>
          Size Limit
        </h4>
        <Uploader
          variant="dropzone"
          maxSize={100 * 1024}
          error="File size exceeds size limit of 100.0 KB. Reduce file size or choose another document."
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#71717a' }}>
          Quantity Limit
        </h4>
        <Uploader
          variant="dropzone"
          maxFiles={25}
          error="You can only upload a maximum of 25 documents. Remove one before adding another."
        />
      </div>
    </div>
  ),
}

export const ImagesOnly: Story = {
  name: 'Images Only',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader
        variant="dropzone"
        accept="image/*"
        helperText="Or click to browse (max 10 files, up to 5MB each)"
        maxFiles={10}
        maxSize={5 * 1024 * 1024}
        onChange={files => console.log('Files:', files)}
      />
    </div>
  ),
}

export const SingleFile: Story = {
  name: 'Single File',
  render: () => (
    <div style={{ width: 400 }}>
      <Uploader
        variant="button"
        multiple={false}
        accept=".pdf,.doc,.docx"
        buttonText="Choose document"
        helperText="PDF, DOC or DOCX less than 5MB"
        maxSize={5 * 1024 * 1024}
        onChange={files => console.log('Files:', files)}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <Uploader variant="dropzone" label="Dropzone disabled" disabled />
      <Uploader variant="button" buttonText="Upload a file" disabled />
    </div>
  ),
}

export const ProfilePicture: Story = {
  name: 'Profile Picture Example',
  render: () => (
    <div
      style={{
        width: 400,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>Upload Profile Picture</h3>
      <Uploader
        variant="dropzone"
        multiple={false}
        accept="image/*"
        helperText="Or click to browse (JPG, PNG or GIF, up to 5MB)"
        maxSize={5 * 1024 * 1024}
        onChange={files => console.log('Profile picture:', files)}
      />
    </div>
  ),
}

export const DocumentUpload: Story = {
  name: 'Document Upload Example',
  render: () => (
    <div
      style={{
        width: 500,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
      }}
    >
      <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600 }}>Legal Documents</h3>
      <Uploader
        variant="dropzone"
        accept=".pdf,.doc,.docx"
        maxFiles={5}
        label="Required documents"
        helperText="Or click to browse (max 5 files, up to 5MB each)"
        maxSize={5 * 1024 * 1024}
        onChange={files => console.log('Documents:', files)}
      />
    </div>
  ),
}

export const FileListExample: Story = {
  name: 'File List Example (Figma Reference)',
  render: () => {
    const [files, setFiles] = React.useState<File[]>([])

    return (
      <div style={{ width: 400 }}>
        <Uploader
          variant="dropzone"
          helperText="Or click to browse (max 10 files, up to 5MB each)"
          maxFiles={10}
          maxSize={5 * 1024 * 1024}
          simulateProgress
          onChange={newFiles => {
            setFiles(newFiles)
            console.log('Files:', newFiles)
          }}
        />
      </div>
    )
  },
}
