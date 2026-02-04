import * as React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

/**
 * Phone Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=726-5492
 */
const PHONE_INPUT_TOKENS = {
  // Shared
  height: 44,
  bg: '#ffffff',
  border: '#d4d4d8',
  borderFocus: '#2050f6',
  borderError: '#dc2626',
  radius: 8,
  gap: 8, // Gap between two containers
  // Country selector (separate container)
  country: {
    width: 90,
    paddingX: 12,
    fontSize: 14,
  },
  // Input (separate container)
  input: {
    paddingX: 12,
    fontSize: 14,
  },
  // Dropdown
  dropdown: {
    bg: '#ffffff',
    border: '#e4e4e7',
    shadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    radius: 8,
    maxHeight: 240,
  },
} as const

// Common country codes
const COUNTRY_CODES = [
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'MX', dialCode: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'ES', dialCode: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'IT', dialCode: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'BR', dialCode: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'AR', dialCode: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'CO', dialCode: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'CL', dialCode: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: 'PE', dialCode: '+51', flag: '🇵🇪', name: 'Peru' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'CN', dialCode: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
]

export type CountryCode = typeof COUNTRY_CODES[number]

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Phone number value */
  value?: string
  /** Selected country code */
  countryCode?: string
  /** Callback when phone changes */
  onChange?: (phone: string, countryCode: string) => void
  /** Default country */
  defaultCountry?: string
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error state */
  error?: boolean
  /** Custom country list */
  countries?: CountryCode[]
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({
    value = '',
    countryCode: controlledCountry,
    onChange,
    defaultCountry = 'US',
    label,
    helperText,
    error = false,
    disabled = false,
    countries = COUNTRY_CODES,
    style,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [internalCountry, setInternalCountry] = useState(defaultCountry)
    const [isFocused, setIsFocused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const country = controlledCountry || internalCountry
    const selectedCountry = countries.find(c => c.code === country) || countries[0]

    // Close dropdown on outside click
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleCountrySelect = (c: CountryCode) => {
      setInternalCountry(c.code)
      setIsOpen(false)
      onChange?.(value, c.code)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only numbers and some formatting chars
      const cleaned = e.target.value.replace(/[^\d\s\-()]/g, '')
      onChange?.(cleaned, country)
    }

    const getBorderColor = () => {
      if (error) return PHONE_INPUT_TOKENS.borderError
      if (isFocused) return PHONE_INPUT_TOKENS.borderFocus
      return PHONE_INPUT_TOKENS.border
    }

    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      ...style,
    }

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',
      gap: PHONE_INPUT_TOKENS.gap,
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }

    // Separate container for country selector
    const countrySelectorStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: PHONE_INPUT_TOKENS.height,
      padding: `0 ${PHONE_INPUT_TOKENS.country.paddingX}px`,
      backgroundColor: PHONE_INPUT_TOKENS.bg,
      border: `1px solid ${PHONE_INPUT_TOKENS.border}`,
      borderRadius: PHONE_INPUT_TOKENS.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: PHONE_INPUT_TOKENS.country.fontSize,
      transition: 'border-color 150ms ease',
    }

    // Separate container for phone input
    const inputContainerStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      height: PHONE_INPUT_TOKENS.height,
      backgroundColor: PHONE_INPUT_TOKENS.bg,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: PHONE_INPUT_TOKENS.radius,
      transition: 'border-color 150ms ease',
    }

    const inputStyle: React.CSSProperties = {
      flex: 1,
      height: '100%',
      padding: `0 ${PHONE_INPUT_TOKENS.input.paddingX}px`,
      border: 'none',
      outline: 'none',
      fontSize: PHONE_INPUT_TOKENS.input.fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      borderRadius: PHONE_INPUT_TOKENS.radius,
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      backgroundColor: PHONE_INPUT_TOKENS.dropdown.bg,
      border: `1px solid ${PHONE_INPUT_TOKENS.dropdown.border}`,
      borderRadius: PHONE_INPUT_TOKENS.dropdown.radius,
      boxShadow: PHONE_INPUT_TOKENS.dropdown.shadow,
      maxHeight: PHONE_INPUT_TOKENS.dropdown.maxHeight,
      overflowY: 'auto',
      zIndex: 50,
    }

    const optionStyle = (isSelected: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      fontSize: 14,
      cursor: 'pointer',
      backgroundColor: isSelected ? '#f4f4f5' : 'transparent',
    })

    return (
      <div style={wrapperStyle}>
        {label && (
          <label style={{
            display: 'block',
            marginBottom: 6,
            fontSize: 14,
            fontWeight: 500,
            color: '#18181b',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}>
            {label}
          </label>
        )}

        <div ref={containerRef} style={containerStyle}>
          {/* Country Selector - Separate Container */}
          <div style={{ position: 'relative' }}>
            <div
              style={countrySelectorStyle}
              onClick={() => !disabled && setIsOpen(!isOpen)}
            >
              <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
              <span style={{ color: '#18181b', fontWeight: 500 }}>{selectedCountry.dialCode}</span>
              <ChevronDown size={16} style={{ color: '#71717a' }} />
            </div>

            {/* Country Dropdown */}
            {isOpen && (
              <div style={dropdownStyle}>
                {countries.map((c) => (
                  <div
                    key={c.code}
                    style={optionStyle(c.code === country)}
                    onClick={() => handleCountrySelect(c)}
                  >
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <span style={{ flex: 1 }}>{c.name}</span>
                    <span style={{ color: '#71717a' }}>{c.dialCode}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Phone Input - Separate Container */}
          <div style={inputContainerStyle}>
            <input
              ref={ref}
              type="tel"
              value={value}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              style={inputStyle}
              placeholder="Phone number"
              {...props}
            />
          </div>
        </div>

        {helperText && (
          <p style={{
            margin: '6px 0 0',
            fontSize: 12,
            color: error ? '#dc2626' : '#71717a',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput, PHONE_INPUT_TOKENS, COUNTRY_CODES }
