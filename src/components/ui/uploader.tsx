import * as React from "react"
import { forwardRef, useState, useRef, useCallback } from "react"
import { Upload, X, File, Image, FileText, Film, Music } from "lucide-react"

/**
 * Uploader Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=450-8246
 */
const UPLOADER_TOKENS = {
  // Dropzone
  dropzone: {
    padding: 32,
    border: '#d4d4d8',
    borderDashed: 'dashed',
    borderWidth: 2,
    borderActive: '#2050f6',
    bg: '#fafafa',
    bgActive: 'rgba(32, 80, 246, 0.04)',
    radius: 12,
  },
  // Text
  text: {
    primary: '#18181b',
    secondary: '#71717a',
    link: '#2050f6',
  },
  // File item
  fileItem: {
    padding: 12,
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 8,
    gap: 12,
  },
  // Thumbnail
  thumbnail: {
    size: 40,
    radius: 6,
    bg: '#f4f4f5',
  },
} as const

type UploadedFile = {
  id: string
  file: File
  preview?: string
  progress?: number
}

export interface UploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Visual variant */
  variant?: 'dropzone' | 'button' | 'gallery'
  /** Accepted file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Max file size in bytes */
  maxSize?: number
  /** Max number of files */
  maxFiles?: number
  /** Callback when files change */
  onChange?: (files: File[]) => void
  /** Callback when file is removed */
  onRemove?: (file: File) => void
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Show file previews */
  showPreviews?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Button text for button variant */
  buttonText?: string
}

const Uploader = forwardRef<HTMLDivElement, UploaderProps>(
  ({
    variant = 'dropzone',
    accept,
    multiple = true,
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 10,
    onChange,
    onRemove,
    label,
    helperText,
    showPreviews = true,
    disabled = false,
    buttonText = 'Select file',
    style,
    ...props
  }, ref) => {
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [isDragActive, setIsDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = useCallback((newFiles: FileList | null) => {
      if (!newFiles || disabled) return

      const validFiles: UploadedFile[] = []
      const currentCount = files.length

      Array.from(newFiles).forEach((file, index) => {
        // Check max files
        if (currentCount + validFiles.length >= maxFiles) return
        
        // Check file size
        if (file.size > maxSize) return

        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${index}`,
          file,
          preview: file.type.startsWith('image/') 
            ? URL.createObjectURL(file) 
            : undefined,
        }
        validFiles.push(uploadedFile)
      })

      if (validFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
        setFiles(updatedFiles)
        onChange?.(updatedFiles.map(f => f.file))
      }
    }, [files, maxFiles, maxSize, multiple, disabled, onChange])

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setIsDragActive(false)
      handleFiles(e.dataTransfer.files)
    }, [handleFiles])

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) {
        setIsDragActive(true)
      }
    }, [disabled])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setIsDragActive(false)
    }, [])

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      // Reset input value to allow selecting same file again
      e.target.value = ''
    }

    const removeFile = (fileId: string) => {
      const fileToRemove = files.find(f => f.id === fileId)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      
      const updatedFiles = files.filter(f => f.id !== fileId)
      setFiles(updatedFiles)
      
      if (fileToRemove) {
        onRemove?.(fileToRemove.file)
      }
      onChange?.(updatedFiles.map(f => f.file))
    }

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    const getFileIcon = (file: File) => {
      if (file.type.startsWith('image/')) return Image
      if (file.type.startsWith('video/')) return Film
      if (file.type.startsWith('audio/')) return Music
      if (file.type.includes('pdf') || file.type.includes('document')) return FileText
      return File
    }

    const containerStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const labelStyle: React.CSSProperties = {
      display: 'block',
      marginBottom: 8,
      fontSize: 14,
      fontWeight: 500,
      color: UPLOADER_TOKENS.text.primary,
    }

    const dropzoneStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: UPLOADER_TOKENS.dropzone.padding,
      backgroundColor: isDragActive 
        ? UPLOADER_TOKENS.dropzone.bgActive 
        : UPLOADER_TOKENS.dropzone.bg,
      border: `${UPLOADER_TOKENS.dropzone.borderWidth}px ${UPLOADER_TOKENS.dropzone.borderDashed} ${
        isDragActive ? UPLOADER_TOKENS.dropzone.borderActive : UPLOADER_TOKENS.dropzone.border
      }`,
      borderRadius: UPLOADER_TOKENS.dropzone.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 200ms ease',
      opacity: disabled ? 0.5 : 1,
    }

    const iconStyle: React.CSSProperties = {
      marginBottom: 12,
      color: isDragActive ? UPLOADER_TOKENS.dropzone.borderActive : '#a1a1aa',
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
      gap: UPLOADER_TOKENS.fileItem.gap,
      padding: UPLOADER_TOKENS.fileItem.padding,
      backgroundColor: UPLOADER_TOKENS.fileItem.bg,
      border: `1px solid ${UPLOADER_TOKENS.fileItem.border}`,
      borderRadius: UPLOADER_TOKENS.fileItem.radius,
    }

    const thumbnailStyle: React.CSSProperties = {
      width: UPLOADER_TOKENS.thumbnail.size,
      height: UPLOADER_TOKENS.thumbnail.size,
      borderRadius: UPLOADER_TOKENS.thumbnail.radius,
      backgroundColor: UPLOADER_TOKENS.thumbnail.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    }

    const removeButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      padding: 0,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: 6,
      color: '#71717a',
      cursor: 'pointer',
      transition: 'all 150ms ease',
    }

    const helperStyle: React.CSSProperties = {
      marginTop: 8,
      fontSize: 12,
      color: UPLOADER_TOKENS.text.secondary,
    }

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      backgroundColor: '#ffffff',
      color: UPLOADER_TOKENS.text.primary,
      border: '1px solid #d4d4d8',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease',
      opacity: disabled ? 0.5 : 1,
    }

    const galleryStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: 12,
      marginTop: 16,
    }

    const galleryItemStyle: React.CSSProperties = {
      position: 'relative',
      aspectRatio: '1',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#f4f4f5',
    }

    const galleryRemoveStyle: React.CSSProperties = {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#ffffff',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      padding: 0,
    }

    const renderDropzone = () => (
      <div
        style={dropzoneStyle}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={32} style={iconStyle} />
        <p style={{ 
          margin: 0, 
          fontSize: 14, 
          fontWeight: 500,
          color: UPLOADER_TOKENS.text.primary,
        }}>
          Drag & drop files here
        </p>
        <p style={{ 
          margin: '4px 0 0', 
          fontSize: 13, 
          color: UPLOADER_TOKENS.text.secondary,
        }}>
          or{' '}
          <span style={{ color: UPLOADER_TOKENS.text.link, fontWeight: 500 }}>
            click to browse
          </span>
        </p>
      </div>
    )

    const renderButton = () => (
      <button
        type="button"
        style={buttonStyle}
        onClick={handleClick}
        disabled={disabled}
      >
        <Upload size={18} />
        {buttonText}
      </button>
    )

    const renderFileList = () => (
      showPreviews && files.length > 0 && (
        <div style={fileListStyle}>
          {files.map((uploadedFile) => {
            const FileIcon = getFileIcon(uploadedFile.file)
            
            return (
              <div key={uploadedFile.id} style={fileItemStyle}>
                <div style={thumbnailStyle}>
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <FileIcon size={20} color="#71717a" />
                  )}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 500,
                    color: UPLOADER_TOKENS.text.primary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {uploadedFile.file.name}
                  </p>
                  <p style={{
                    margin: '2px 0 0',
                    fontSize: 12,
                    color: UPLOADER_TOKENS.text.secondary,
                  }}>
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>
                
                <button
                  type="button"
                  style={removeButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(uploadedFile.id)
                  }}
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )
    )

    const renderGallery = () => (
      showPreviews && files.length > 0 && (
        <div style={galleryStyle}>
          {files.map((uploadedFile) => {
            const FileIcon = getFileIcon(uploadedFile.file)
            
            return (
              <div key={uploadedFile.id} style={galleryItemStyle}>
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                    <FileIcon size={32} color="#71717a" />
                  </div>
                )}
                <button
                  type="button"
                  style={galleryRemoveStyle}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(uploadedFile.id)
                  }}
                  aria-label="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            )
          })}
          {/* Add button in gallery */}
          <div 
            style={{
              ...galleryItemStyle,
              border: '2px dashed #d4d4d8',
              backgroundColor: 'transparent',
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: disabled ? 0.5 : 1,
            }}
            onClick={handleClick}
          >
            <Upload size={24} color="#a1a1aa" />
          </div>
        </div>
      )
    )

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {label && <label style={labelStyle}>{label}</label>}

        {variant === 'dropzone' && renderDropzone()}
        {variant === 'button' && renderButton()}
        {variant === 'gallery' && files.length === 0 && renderDropzone()}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          style={{ display: 'none' }}
        />

        {helperText && <p style={helperStyle}>{helperText}</p>}

        {variant === 'gallery' ? renderGallery() : renderFileList()}
      </div>
    )
  }
)

Uploader.displayName = "Uploader"

export { Uploader, UPLOADER_TOKENS }
