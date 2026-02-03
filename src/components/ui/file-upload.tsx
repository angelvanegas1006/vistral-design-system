import * as React from "react"
import { forwardRef, useState, useRef } from "react"
import { Upload, X, File, Image, FileText, Film, Music, AlertCircle, CheckCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * File Upload Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4037-2795
 */
const FILE_UPLOAD_TOKENS = {
  // Dropzone
  dropzone: {
    padding: 32,
    border: '#d4d4d8',
    borderActive: '#2050f6',
    borderError: '#dc2626',
    bg: '#fafafa',
    bgActive: '#eef4ff',
    radius: 12,
  },
  // File item
  file: {
    padding: 12,
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 8,
  },
  // Progress
  progress: {
    height: 4,
    bg: '#e4e4e7',
    fill: '#2050f6',
    radius: 2,
  },
} as const

type FileStatus = 'pending' | 'uploading' | 'success' | 'error'

type UploadFile = {
  id: string
  file: File
  status: FileStatus
  progress: number
  error?: string
}

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accepted file types */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Callback when files change */
  onChange?: (files: File[]) => void
  /** Callback for upload simulation */
  onUpload?: (file: File) => Promise<void>
  /** Disabled state */
  disabled?: boolean
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({
    accept,
    multiple = false,
    maxSize,
    maxFiles,
    onChange,
    onUpload,
    disabled = false,
    label,
    helperText,
    error,
    style,
    ...props
  }, ref) => {
    const [files, setFiles] = useState<UploadFile[]>([])
    const [isDragActive, setIsDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = async (newFiles: FileList | null) => {
      if (!newFiles || disabled) return

      const fileArray = Array.from(newFiles)
      
      // Validate
      const validFiles = fileArray.filter(file => {
        if (maxSize && file.size > maxSize) return false
        return true
      })

      if (maxFiles && files.length + validFiles.length > maxFiles) {
        return
      }

      const uploadFiles: UploadFile[] = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        status: 'pending' as FileStatus,
        progress: 0,
      }))

      setFiles(prev => multiple ? [...prev, ...uploadFiles] : uploadFiles)
      onChange?.(validFiles)

      // Simulate upload
      if (onUpload) {
        for (const uploadFile of uploadFiles) {
          try {
            setFiles(prev => prev.map(f => 
              f.id === uploadFile.id ? { ...f, status: 'uploading' } : f
            ))

            // Simulate progress
            for (let i = 0; i <= 100; i += 10) {
              await new Promise(r => setTimeout(r, 100))
              setFiles(prev => prev.map(f => 
                f.id === uploadFile.id ? { ...f, progress: i } : f
              ))
            }

            await onUpload(uploadFile.file)

            setFiles(prev => prev.map(f => 
              f.id === uploadFile.id ? { ...f, status: 'success', progress: 100 } : f
            ))
          } catch (err) {
            setFiles(prev => prev.map(f => 
              f.id === uploadFile.id ? { ...f, status: 'error', error: 'Upload failed' } : f
            ))
          }
        }
      }
    }

    const removeFile = (id: string) => {
      setFiles(prev => prev.filter(f => f.id !== id))
    }

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDragIn = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setIsDragActive(true)
    }

    const handleDragOut = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)
      handleFiles(e.dataTransfer.files)
    }

    const getFileIcon = (file: File): LucideIcon => {
      const type = file.type.split('/')[0]
      switch (type) {
        case 'image': return Image
        case 'video': return Film
        case 'audio': return Music
        default: return file.type.includes('pdf') ? FileText : File
      }
    }

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    const containerStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const getBorderColor = () => {
      if (error) return FILE_UPLOAD_TOKENS.dropzone.borderError
      if (isDragActive) return FILE_UPLOAD_TOKENS.dropzone.borderActive
      return FILE_UPLOAD_TOKENS.dropzone.border
    }

    const dropzoneStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: FILE_UPLOAD_TOKENS.dropzone.padding,
      border: `2px dashed ${getBorderColor()}`,
      borderRadius: FILE_UPLOAD_TOKENS.dropzone.radius,
      backgroundColor: isDragActive ? FILE_UPLOAD_TOKENS.dropzone.bgActive : FILE_UPLOAD_TOKENS.dropzone.bg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 150ms ease',
    }

    const fileListStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 16,
    }

    const fileItemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: FILE_UPLOAD_TOKENS.file.padding,
      backgroundColor: FILE_UPLOAD_TOKENS.file.bg,
      border: `1px solid ${FILE_UPLOAD_TOKENS.file.border}`,
      borderRadius: FILE_UPLOAD_TOKENS.file.radius,
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {label && (
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500, color: '#18181b' }}>
            {label}
          </label>
        )}

        <div
          style={dropzoneStyle}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            style={{ display: 'none' }}
            disabled={disabled}
          />
          
          <Upload size={32} style={{ color: '#71717a', marginBottom: 12 }} />
          <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 500, color: '#18181b' }}>
            {isDragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: '#71717a' }}>
            {accept ? `Accepted: ${accept}` : 'Any file type'}
            {maxSize && ` • Max ${formatFileSize(maxSize)}`}
          </p>
        </div>

        {helperText && !error && (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#71717a' }}>{helperText}</p>
        )}
        {error && (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#dc2626' }}>{error}</p>
        )}

        {files.length > 0 && (
          <div style={fileListStyle}>
            {files.map((uploadFile) => {
              const FileIcon = getFileIcon(uploadFile.file)
              
              return (
                <div key={uploadFile.id} style={fileItemStyle}>
                  <FileIcon size={20} style={{ color: '#71717a', flexShrink: 0 }} />
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {uploadFile.file.name}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: '#71717a' }}>
                      {formatFileSize(uploadFile.file.size)}
                    </p>
                    
                    {uploadFile.status === 'uploading' && (
                      <div style={{ marginTop: 6, height: FILE_UPLOAD_TOKENS.progress.height, backgroundColor: FILE_UPLOAD_TOKENS.progress.bg, borderRadius: FILE_UPLOAD_TOKENS.progress.radius }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${uploadFile.progress}%`, 
                          backgroundColor: FILE_UPLOAD_TOKENS.progress.fill,
                          borderRadius: FILE_UPLOAD_TOKENS.progress.radius,
                          transition: 'width 100ms ease',
                        }} />
                      </div>
                    )}
                  </div>
                  
                  {uploadFile.status === 'success' && <CheckCircle size={16} style={{ color: '#16a34a' }} />}
                  {uploadFile.status === 'error' && <AlertCircle size={16} style={{ color: '#dc2626' }} />}
                  
                  <button
                    type="button"
                    onClick={() => removeFile(uploadFile.id)}
                    style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload, FILE_UPLOAD_TOKENS }
