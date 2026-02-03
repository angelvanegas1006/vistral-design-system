import * as React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import { Pipette } from "lucide-react"

/**
 * Color Picker Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=166-2959
 */
const COLOR_PICKER_TOKENS = {
  // Trigger
  trigger: {
    height: 40,
    paddingX: 12,
    radius: 8,
    border: '#d4d4d8',
    borderFocus: '#2050f6',
  },
  // Swatch
  swatch: {
    size: 24,
    radius: 4,
  },
  // Dropdown
  dropdown: {
    width: 240,
    padding: 12,
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 12,
  },
  // Presets
  presetSize: 28,
} as const

// Preset colors
const PRESET_COLORS = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#78716c', '#71717a', '#6b7280', '#64748b', '#475569',
]

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current color value (hex) */
  value?: string
  /** Default color */
  defaultValue?: string
  /** Callback when color changes */
  onChange?: (color: string) => void
  /** Label */
  label?: string
  /** Disabled state */
  disabled?: boolean
  /** Show preset colors */
  showPresets?: boolean
  /** Custom preset colors */
  presets?: string[]
  /** Show hex input */
  showInput?: boolean
}

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({
    value: controlledValue,
    defaultValue = '#2050f6',
    onChange,
    label,
    disabled = false,
    showPresets = true,
    presets = PRESET_COLORS,
    showInput = true,
    style,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    const isControlled = controlledValue !== undefined
    const color = isControlled ? controlledValue : internalValue

    useEffect(() => {
      setInputValue(color)
    }, [color])

    // Close on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const setColor = (newColor: string) => {
      if (!isControlled) {
        setInternalValue(newColor)
      }
      onChange?.(newColor)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setInputValue(val)
      
      // Validate hex
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        setColor(val)
      }
    }

    const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setColor(e.target.value)
    }

    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      width: 'fit-content',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: COLOR_PICKER_TOKENS.trigger.height,
      padding: `0 ${COLOR_PICKER_TOKENS.trigger.paddingX}px`,
      backgroundColor: '#ffffff',
      border: `1px solid ${isOpen ? COLOR_PICKER_TOKENS.trigger.borderFocus : COLOR_PICKER_TOKENS.trigger.border}`,
      borderRadius: COLOR_PICKER_TOKENS.trigger.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color 150ms ease',
    }

    const swatchStyle: React.CSSProperties = {
      width: COLOR_PICKER_TOKENS.swatch.size,
      height: COLOR_PICKER_TOKENS.swatch.size,
      backgroundColor: color,
      borderRadius: COLOR_PICKER_TOKENS.swatch.radius,
      border: '1px solid rgba(0,0,0,0.1)',
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      width: COLOR_PICKER_TOKENS.dropdown.width,
      padding: COLOR_PICKER_TOKENS.dropdown.padding,
      backgroundColor: COLOR_PICKER_TOKENS.dropdown.bg,
      border: `1px solid ${COLOR_PICKER_TOKENS.dropdown.border}`,
      borderRadius: COLOR_PICKER_TOKENS.dropdown.radius,
      boxShadow: COLOR_PICKER_TOKENS.dropdown.shadow,
      zIndex: 50,
    }

    const nativeInputStyle: React.CSSProperties = {
      width: '100%',
      height: 120,
      padding: 0,
      border: 'none',
      borderRadius: 8,
      cursor: 'pointer',
    }

    const presetsGridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(8, ${COLOR_PICKER_TOKENS.presetSize}px)`,
      gap: 4,
      marginTop: 12,
    }

    const presetStyle = (presetColor: string): React.CSSProperties => ({
      width: COLOR_PICKER_TOKENS.presetSize,
      height: COLOR_PICKER_TOKENS.presetSize,
      backgroundColor: presetColor,
      border: color === presetColor ? '2px solid #2050f6' : '1px solid rgba(0,0,0,0.1)',
      borderRadius: 4,
      cursor: 'pointer',
      padding: 0,
    })

    const hexInputStyle: React.CSSProperties = {
      width: '100%',
      height: 36,
      marginTop: 12,
      padding: '0 8px',
      fontSize: 13,
      fontFamily: 'monospace',
      border: '1px solid #e4e4e7',
      borderRadius: 6,
      outline: 'none',
    }

    return (
      <div ref={containerRef} style={wrapperStyle} {...props}>
        {label && (
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 500, color: '#18181b' }}>
            {label}
          </label>
        )}

        <div
          ref={ref}
          style={triggerStyle}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div style={swatchStyle} />
          <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#3f3f46' }}>
            {color.toUpperCase()}
          </span>
          <Pipette size={16} style={{ color: '#71717a', marginLeft: 'auto' }} />
        </div>

        {isOpen && (
          <div style={dropdownStyle}>
            {/* Native color picker */}
            <input
              type="color"
              value={color}
              onChange={handleNativeChange}
              style={nativeInputStyle}
            />

            {/* Preset colors */}
            {showPresets && (
              <div style={presetsGridStyle}>
                {presets.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    style={presetStyle(presetColor)}
                    onClick={() => setColor(presetColor)}
                    title={presetColor}
                  />
                ))}
              </div>
            )}

            {/* Hex input */}
            {showInput && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#000000"
                style={hexInputStyle}
                maxLength={7}
              />
            )}
          </div>
        )}
      </div>
    )
  }
)

ColorPicker.displayName = "ColorPicker"

export { ColorPicker, COLOR_PICKER_TOKENS, PRESET_COLORS }
