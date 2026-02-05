import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar, ProgressCircle } from '../src/components/ui/progress'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Progress

Based on Figma Design System: 
- [Progress Bar](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=321-16473)
- [Progress Circle](https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1746-2004)

## Features
- **Progress Bar**: Linear indicator with optional label
- **Progress Circle**: Circular indicator
- **3 Sizes**: Small, Medium, Large
- **3 Statuses**: Default (blue), Success (green), Error (red)
- **Indeterminate**: Animated loading state
        `,
      },
    },
  },
}

export default meta

export const Bar: StoryObj<typeof ProgressBar> = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Default
        </h3>
        <ProgressBar value={60} />
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          With Label
        </h3>
        <ProgressBar value={75} showLabel />
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ProgressBar value={50} size="sm" />
          <ProgressBar value={50} size="md" />
          <ProgressBar value={50} size="lg" />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Statuses
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ProgressBar value={60} showLabel />
          <ProgressBar value={100} status="success" showLabel />
          <ProgressBar value={30} status="error" showLabel />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Indeterminate
        </h3>
        <ProgressBar indeterminate />
      </div>
    </div>
  ),
}

export const Circle: StoryObj<typeof ProgressCircle> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Sizes
        </h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <ProgressCircle value={75} size="sm" showLabel />
          <ProgressCircle value={75} size="md" showLabel />
          <ProgressCircle value={75} size="lg" showLabel />
          <ProgressCircle value={75} size="xl" showLabel />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Statuses
        </h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <ProgressCircle value={65} size="lg" showLabel />
          <ProgressCircle value={100} size="lg" status="success" showLabel />
          <ProgressCircle value={25} size="lg" status="error" showLabel />
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
          Custom Labels
        </h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <ProgressCircle value={42} size="xl" label="42°C" />
          <ProgressCircle
            value={85}
            size="xl"
            label={
              <span style={{ fontSize: 14 }}>
                85<small>%</small>
              </span>
            }
          />
          <ProgressCircle value={100} size="xl" status="success" label="Done" />
        </div>
      </div>
    </div>
  ),
}

export const Animated: StoryObj<typeof ProgressBar> = {
  render: () => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0
          return prev + 5
        })
      }, 200)
      return () => clearInterval(timer)
    }, [])

    return (
      <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: '#71717a' }}>
            Animated Progress
          </h3>
          <ProgressBar value={progress} showLabel />
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          <ProgressCircle value={progress} size="lg" showLabel />
          <ProgressCircle
            value={progress}
            size="lg"
            status={progress === 100 ? 'success' : 'default'}
            showLabel
          />
        </div>
      </div>
    )
  },
}

export const FileUpload: StoryObj<typeof ProgressBar> = {
  name: 'File Upload Example',
  render: () => {
    const [files, setFiles] = React.useState([
      { name: 'document.pdf', progress: 100, status: 'success' as const },
      { name: 'image.png', progress: 65, status: 'default' as const },
      { name: 'video.mp4', progress: 23, status: 'error' as const },
    ])

    return (
      <div
        style={{
          width: 400,
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 12,
          border: '1px solid #e4e4e7',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Uploading Files</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {files.map((file, i) => (
            <div key={i}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 500 }}>{file.name}</span>
                <span
                  style={{
                    color:
                      file.status === 'success'
                        ? '#15803d'
                        : file.status === 'error'
                          ? '#b91c1c'
                          : '#71717a',
                  }}
                >
                  {file.status === 'success'
                    ? 'Complete'
                    : file.status === 'error'
                      ? 'Failed'
                      : `${file.progress}%`}
                </span>
              </div>
              <ProgressBar value={file.progress} status={file.status} size="sm" />
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const StorageUsage: StoryObj<typeof ProgressCircle> = {
  name: 'Storage Usage Example',
  render: () => (
    <div
      style={{
        width: 280,
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        border: '1px solid #e4e4e7',
        textAlign: 'center',
      }}
    >
      <ProgressCircle
        value={72}
        size="xl"
        label={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>72%</div>
            <div style={{ fontSize: 10, color: '#71717a' }}>Used</div>
          </div>
        }
      />

      <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600 }}>Storage</h3>
      <p style={{ margin: 0, fontSize: 14, color: '#71717a' }}>7.2 GB of 10 GB used</p>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#fef3c7',
          borderRadius: 8,
          fontSize: 13,
          color: '#b45309',
        }}
      >
        Running low on storage
      </div>
    </div>
  ),
}
