import * as React from "react"
import { forwardRef, useState, useRef, useCallback, useEffect } from "react"
import { Upload, X, File, Image, FileText, Film, Music, Loader2 } from "lucide-react"

/**
 * Uploader Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=459-8589
 */
const UPLOADER_TOKENS = {
  // Dropzone
  dropzone: {
    padding: 32,
    border: '#d4d4d8',
    borderDashed: 'dashed',
    borderWidth: 2,
    borderActive: '#2050f6',
    borderError: '#dc2626',
    bg: '#fafafa',
    bgActive: 'rgba(32, 80, 246, 0.04)',
    bgHover: '#ffffff',
    radius: 12,
    minWidth: 320,
    maxWidth: 600,
  },
  // Button variant
  button: {
    padding: '10px 16px',
    border: '#d4d4d8',
    borderError: '#dc2626',
    bg: '#ffffff',
    bgHover: '#fafafa',
    radius: 8,
    gap: 8,
  },
  // Text
  text: {
    primary: '#18181b',
    secondary: '#71717a',
    link: '#2050f6',
    linkHover: '#1d4ed8',
    error: '#dc2626',
  },
  // File item
  fileItem: {
    padding: 12,
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 8,
    gap: 12,
    shadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  // Thumbnail
  thumbnail: {
    size: 40,
    radius: 6,
    bg: '#f4f4f5',
  },
  // Icon
  icon: {
    size: 32,
    color: '#a1a1aa',
    colorActive: '#2050f6',
  },
  // Close button
  closeButton: {
    size: 28,
    color: '#2050f6', // Blue X per Figma
    bg: '#f4f4f5',
  },
} as const

type UploadedFile = {
  id: string
  file: File
  preview?: string
  progress?: number
  error?: string
}

type UploadError = 
  | 'invalid-format'
  | 'size-limit'
  | 'quantity-limit'
  | 'duplicate'
  | 'network-failure'
  | 'required'

export interface UploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Visual variant */
  variant?: 'dropzone' | 'button'
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
  /** Callback when upload progress changes */
  onProgress?: (fileId: string, progress: number) => void
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
  /** Show file previews */
  showPreviews?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Button text for button variant */
  buttonText?: string
  /** Display mode for file list */
  displayMode?: 'list' | 'thumbnails' | 'compact'
  /** Simulate upload progress (for demo) */
  simulateProgress?: boolean
}

const Uploader = forwardRef<HTMLDivElement, UploaderProps>(
  ({
    variant = 'dropzone',
    accept,
    multiple = true,
    maxSize = 5 * 1024 * 1024, // 5MB default per Figma
    maxFiles = 10,
    onChange,
    onRemove,
    onProgress,
    label,
    helperText,
    error,
    showPreviews = true,
    disabled = false,
    buttonText = 'Upload a file',
    displayMode = 'list',
    simulateProgress = false,
    style,
    ...props
  }, ref) => {
    const [files, setFiles] = useState<UploadedFile[]>([])
    const [isDragActive, setIsDragActive] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [currentError, setCurrentError] = useState<string | null>(error || null)
    const inputRef = useRef<HTMLInputElement>(null)
    const progressTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

    // Simulate upload progress
    useEffect(() => {
      if (!simulateProgress) return

      files.forEach((uploadedFile) => {
        if (uploadedFile.progress === undefined || uploadedFile.progress >= 100) return

        const timer = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === uploadedFile.id && f.progress !== undefined && f.progress < 100) {
                const newProgress = Math.min(f.progress + 10, 100)
                onProgress?.(f.id, newProgress)
                return { ...f, progress: newProgress }
              }
              return f
            })
          )
        }, 300)

        progressTimersRef.current.set(uploadedFile.id, timer)

        return () => {
          const timer = progressTimersRef.current.get(uploadedFile.id)
          if (timer) {
            clearInterval(timer)
            progressTimersRef.current.delete(uploadedFile.id)
          }
        }
      })
    }, [files, simulateProgress, onProgress])

    const validateFile = (file: File): UploadError | null => {
      // Check file type
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim())
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
        const matchesType = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension === type.toLowerCase()
          }
          if (type.includes('/*')) {
            const baseType = type.split('/')[0]
            return file.type.startsWith(baseType + '/')
          }
          return file.type === type
        })
        if (!matchesType) {
          return 'invalid-format'
        }
      }

      // Check file size
      if (file.size > maxSize) {
        return 'size-limit'
      }

      // Check duplicate
      if (files.some((f) => f.file.name === file.name && f.file.size === file.size)) {
        return 'duplicate'
      }

      return null
    }

    const getErrorMessage = (errorType: UploadError, file?: File): string => {
      switch (errorType) {
        case 'invalid-format':
          return accept
            ? `This file format is not supported. Please upload files in ${accept}.`
            : 'This file format is not supported.'
        case 'size-limit':
          return `File size exceeds size limit of ${formatFileSize(maxSize)}. Reduce file size or choose another document.`
        case 'quantity-limit':
          return `You can only upload a maximum of ${maxFiles} documents. Remove one before adding another.`
        case 'duplicate':
          return 'This document is already in the upload list.'
        case 'network-failure':
          return 'The upload could not be completed due to a network issue.'
        case 'required':
          return 'You must upload at least one document to continue with the process.'
        default:
          return 'An error occurred while uploading the file.'
      }
    }

    const handleFiles = useCallback(
      (newFiles: FileList | null) => {
        if (!newFiles || disabled) return

        setCurrentError(null)
        const validFiles: UploadedFile[] = []
        const errors: string[] = []
        const currentCount = files.length

        Array.from(newFiles).forEach((file, index) => {
          // Check max files
          if (currentCount + validFiles.length >= maxFiles) {
            errors.push(getErrorMessage('quantity-limit'))
            return
          }

          const validationError = validateFile(file)
          if (validationError) {
            errors.push(getErrorMessage(validationError, file))
            return
          }

          const uploadedFile: UploadedFile = {
            id: `${Date.now()}-${index}`,
            file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
            progress: simulateProgress ? 0 : undefined,
          }
          validFiles.push(uploadedFile)
        })

        if (errors.length > 0) {
          setCurrentError(errors[0])
        }

        if (validFiles.length > 0) {
          const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
          setFiles(updatedFiles)
          onChange?.(updatedFiles.map((f) => f.file))
        }
      },
      [files, maxFiles, maxSize, multiple, disabled, onChange, accept, simulateProgress]
    )

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragActive(false)
        handleFiles(e.dataTransfer.files)
      },
      [handleFiles]
    )

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        if (!disabled) {
          setIsDragActive(true)
        }
      },
      [disabled]
    )

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
      const fileToRemove = files.find((f) => f.id === fileId)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }

      const timer = progressTimersRef.current.get(fileId)
      if (timer) {
        clearInterval(timer)
        progressTimersRef.current.delete(fileId)
      }

      const updatedFiles = files.filter((f) => f.id !== fileId)
      setFiles(updatedFiles)

      if (fileToRemove) {
        onRemove?.(fileToRemove.file)
      }
      onChange?.(updatedFiles.map((f) => f.file))
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

    const hasError = currentError || error
    const errorMessage = currentError || error

    const containerStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: variant === 'dropzone' ? UPLOADER_TOKENS.dropzone.maxWidth : '100%',
      minWidth: variant === 'dropzone' ? UPLOADER_TOKENS.dropzone.minWidth : undefined,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const labelStyle: React.CSSProperties = {
      display: 'block',
      marginBottom: 8,
      fontSize: 14,
      fontWeight: 500,
      color: disabled ? UPLOADER_TOKENS.text.secondary : hasError ? UPLOADER_TOKENS.text.error : UPLOADER_TOKENS.text.primary,
    }

    const dropzoneStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: UPLOADER_TOKENS.dropzone.padding,
      backgroundColor: isDragActive
        ? UPLOADER_TOKENS.dropzone.bgActive
        : isHovered
          ? UPLOADER_TOKENS.dropzone.bgHover
          : UPLOADER_TOKENS.dropzone.bg,
      border: `${UPLOADER_TOKENS.dropzone.borderWidth}px ${UPLOADER_TOKENS.dropzone.borderDashed} ${
        hasError
          ? UPLOADER_TOKENS.dropzone.borderError
          : isDragActive
            ? UPLOADER_TOKENS.dropzone.borderActive
            : UPLOADER_TOKENS.dropzone.border
      }`,
      borderRadius: UPLOADER_TOKENS.dropzone.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 200ms ease',
      opacity: disabled ? 0.5 : 1,
    }

    const iconStyle: React.CSSProperties = {
      marginBottom: 12,
      color: isDragActive ? UPLOADER_TOKENS.icon.colorActive : UPLOADER_TOKENS.icon.color,
    }

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: UPLOADER_TOKENS.button.gap,
      padding: UPLOADER_TOKENS.button.padding,
      backgroundColor: UPLOADER_TOKENS.button.bg,
      color: UPLOADER_TOKENS.text.primary,
      border: `1px solid ${hasError ? UPLOADER_TOKENS.button.borderError : UPLOADER_TOKENS.button.border}`,
      borderRadius: UPLOADER_TOKENS.button.radius,
      fontSize: 14,
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease',
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const errorStyle: React.CSSProperties = {
      marginTop: 8,
      fontSize: 13,
      color: UPLOADER_TOKENS.text.error,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const helperStyle: React.CSSProperties = {
      marginTop: 8,
      fontSize: 13,
      color: UPLOADER_TOKENS.text.secondary,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    const renderDropzone = () => {
      const fileSizeText = maxSize ? formatFileSize(maxSize) : '5MB'
      const fileCountText = maxFiles ? `max ${maxFiles} files` : ''
      const constraintsText = fileCountText ? `(${fileCountText}, up to ${fileSizeText} each)` : `(up to ${fileSizeText} each)`

      return (
        <div
          style={dropzoneStyle}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload files"
          aria-describedby={helperText ? 'uploader-helper' : undefined}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              handleClick()
            }
          }}
        >
          <Upload size={UPLOADER_TOKENS.icon.size} style={iconStyle} />
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 500,
              color: UPLOADER_TOKENS.text.primary,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Drag & drop files here
          </p>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 13,
              color: UPLOADER_TOKENS.text.secondary,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Or{' '}
            <span
              style={{
                color: isDragActive || isHovered ? UPLOADER_TOKENS.text.linkHover : UPLOADER_TOKENS.text.link,
                fontWeight: 500,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              click to browse
            </span>{' '}
            {constraintsText}
          </p>
        </div>
      )
    }

    const renderButton = () => {
      const fileTypesText = accept
        ? accept
            .split(',')
            .map((t) => t.trim().replace(/^\./, '').toUpperCase())
            .join(', ')
        : 'PDF, JPG or PNG'
      const fileSizeText = maxSize ? formatFileSize(maxSize) : '5MB'

      return (
        <button
          type="button"
          style={buttonStyle}
          onClick={handleClick}
          disabled={disabled}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={buttonText}
          aria-describedby={helperText ? 'uploader-helper' : undefined}
        >
          <Upload size={18} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <span>{buttonText}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: UPLOADER_TOKENS.text.secondary,
              }}
            >
              {fileTypesText} less than {fileSizeText}
            </span>
          </div>
        </button>
      )
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
      boxShadow: UPLOADER_TOKENS.fileItem.shadow,
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
      width: UPLOADER_TOKENS.closeButton.size,
      height: UPLOADER_TOKENS.closeButton.size,
      padding: 0,
      backgroundColor: UPLOADER_TOKENS.closeButton.bg,
      border: 'none',
      borderRadius: '50%',
      color: UPLOADER_TOKENS.closeButton.color,
      cursor: 'pointer',
      transition: 'all 150ms ease',
      flexShrink: 0,
    }

    const renderFileList = () => {
      if (!showPreviews || files.length === 0) return null

      return (
        <div style={fileListStyle}>
          {files.map((uploadedFile) => {
            const FileIcon = getFileIcon(uploadedFile.file)
            const isUploading = uploadedFile.progress !== undefined && uploadedFile.progress < 100

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
                  {isUploading && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        padding: 4,
                      }}
                    >
                      <Loader2 
                        size={16} 
                        color="#71717a" 
                        style={{ 
                          animation: 'spin 1s linear infinite',
                        }} 
                      />
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 500,
                      color: UPLOADER_TOKENS.text.primary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                  >
                    {uploadedFile.file.name}
                  </p>
                  <p
                    style={{
                      margin: '2px 0 0',
                      fontSize: 12,
                      color: UPLOADER_TOKENS.text.secondary,
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                  >
                    {isUploading && uploadedFile.progress !== undefined
                      ? `${uploadedFile.progress}%`
                      : formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>

                {isUploading && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Loader2 
                      size={16} 
                      color="#71717a" 
                      style={{ 
                        animation: 'spin 1s linear infinite',
                      }} 
                    />
                  </div>
                )}

                <button
                  type="button"
                  style={removeButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(uploadedFile.id)
                  }}
                  aria-label={`Remove ${uploadedFile.file.name}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {label && <label style={labelStyle}>{label}</label>}

        {variant === 'dropzone' && renderDropzone()}
        {variant === 'button' && renderButton()}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          style={{ display: 'none' }}
          aria-label="File input"
        />

        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        {helperText && !errorMessage && (
          <p id="uploader-helper" style={helperStyle}>
            {helperText}
          </p>
        )}

        {renderFileList()}
      </div>
    )
  }
)

Uploader.displayName = "Uploader"

// Add spinner animation
if (typeof document !== 'undefined') {
  const styleId = 'vistral-uploader-spinner'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)
  }
}

export { Uploader, UPLOADER_TOKENS }
