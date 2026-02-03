import * as React from "react"
import { forwardRef, useState, useRef } from "react"
import { X } from "lucide-react"

/**
 * Tag Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=518-6107
 */
const TAG_INPUT_TOKENS = {
  // Container
  container: {
    minHeight: 40,
    paddingX: 8,
    paddingY: 6,
    bg: '#ffffff',
    border: '#d4d4d8',
    borderFocus: '#2050f6',
    borderError: '#dc2626',
    radius: 8,
  },
  // Tag
  tag: {
    height: 26,
    paddingX: 8,
    fontSize: 13,
    bg: '#f4f4f5',
    bgHover: '#e4e4e7',
    fg: '#18181b',
    radius: 4,
  },
  // Input
  input: {
    fontSize: 14,
    placeholder: '#a1a1aa',
  },
  gap: 6,
} as const

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current tags */
  value?: string[]
  /** Default tags */
  defaultValue?: string[]
  /** Callback when tags change */
  onChange?: (tags: string[]) => void
  /** Placeholder */
  placeholder?: string
  /** Maximum tags */
  maxTags?: number
  /** Allow duplicates */
  allowDuplicates?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Separator keys (default: Enter, comma) */
  separators?: string[]
}

const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  ({
    value: controlledValue,
    defaultValue = [],
    onChange,
    placeholder = 'Add tag...',
    maxTags,
    allowDuplicates = false,
    disabled = false,
    error = false,
    label,
    helperText,
    separators = ['Enter', ','],
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue)
    const [inputValue, setInputValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const isControlled = controlledValue !== undefined
    const tags = isControlled ? controlledValue : internalValue

    const addTag = (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed) return
      if (!allowDuplicates && tags.includes(trimmed)) return
      if (maxTags && tags.length >= maxTags) return

      const newTags = [...tags, trimmed]
      
      if (!isControlled) {
        setInternalValue(newTags)
      }
      onChange?.(newTags)
      setInputValue('')
    }

    const removeTag = (index: number) => {
      if (disabled) return
      
      const newTags = tags.filter((_, i) => i !== index)
      
      if (!isControlled) {
        setInternalValue(newTags)
      }
      onChange?.(newTags)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (separators.includes(e.key)) {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1)
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData('text')
      const pastedTags = pastedText.split(/[,\n]/).map(t => t.trim()).filter(Boolean)
      
      let newTags = [...tags]
      for (const tag of pastedTags) {
        if (maxTags && newTags.length >= maxTags) break
        if (!allowDuplicates && newTags.includes(tag)) continue
        newTags.push(tag)
      }
      
      if (!isControlled) {
        setInternalValue(newTags)
      }
      onChange?.(newTags)
    }

    const getBorderColor = () => {
      if (error) return TAG_INPUT_TOKENS.container.borderError
      if (isFocused) return TAG_INPUT_TOKENS.container.borderFocus
      return TAG_INPUT_TOKENS.container.border
    }

    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: TAG_INPUT_TOKENS.gap,
      minHeight: TAG_INPUT_TOKENS.container.minHeight,
      padding: `${TAG_INPUT_TOKENS.container.paddingY}px ${TAG_INPUT_TOKENS.container.paddingX}px`,
      backgroundColor: TAG_INPUT_TOKENS.container.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: TAG_INPUT_TOKENS.container.radius,
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color 150ms ease',
    }

    const tagStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: TAG_INPUT_TOKENS.tag.height,
      padding: `0 ${TAG_INPUT_TOKENS.tag.paddingX}px`,
      fontSize: TAG_INPUT_TOKENS.tag.fontSize,
      backgroundColor: TAG_INPUT_TOKENS.tag.bg,
      color: TAG_INPUT_TOKENS.tag.fg,
      borderRadius: TAG_INPUT_TOKENS.tag.radius,
    }

    const removeButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#71717a',
      marginLeft: 2,
    }

    const inputStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 80,
      border: 'none',
      outline: 'none',
      fontSize: TAG_INPUT_TOKENS.input.fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
    }

    return (
      <div ref={ref} style={wrapperStyle} {...props}>
        {label && (
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: '#18181b' }}>
            {label}
          </label>
        )}

        <div
          style={containerStyle}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {tags.map((tag, index) => (
            <span key={`${tag}-${index}`} style={tagStyle}>
              {tag}
              {!disabled && (
                <button
                  type="button"
                  style={removeButtonStyle}
                  onClick={(e) => { e.stopPropagation(); removeTag(index); }}
                >
                  <X size={14} />
                </button>
              )}
            </span>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => { setIsFocused(false); if (inputValue) addTag(inputValue); }}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled || (maxTags !== undefined && tags.length >= maxTags)}
            style={inputStyle}
          />
        </div>

        {helperText && (
          <p style={{ margin: '6px 0 0', fontSize: 12, color: error ? '#dc2626' : '#71717a' }}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TagInput.displayName = "TagInput"

export { TagInput, TAG_INPUT_TOKENS }
