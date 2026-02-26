import * as React from 'react'
import { forwardRef, useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Search, Check } from 'lucide-react'

/**
 * Phone Input Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=727-6398
 */
const PHONE_INPUT_TOKENS = {
  // Shared
  height: 44,
  bg: '#ffffff',
  border: '#d4d4d8',
  borderFocus: '#2050f6',
  borderError: '#dc2626',
  radius: 8,
  gap: 0,
  // Country selector
  country: {
    width: 90,
    paddingX: 12,
    fontSize: 14,
    bgHover: '#fafafa',
  },
  // Input
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
    searchPadding: 12,
    optionPadding: '8px 12px',
  },
} as const

// Extended country codes list
const COUNTRY_CODES = [
  { code: 'US', dialCode: '+1', flag: '\u{1F1FA}\u{1F1F8}', name: 'United States' },
  { code: 'MX', dialCode: '+52', flag: '\u{1F1F2}\u{1F1FD}', name: 'Mexico' },
  { code: 'CA', dialCode: '+1', flag: '\u{1F1E8}\u{1F1E6}', name: 'Canada' },
  { code: 'GB', dialCode: '+44', flag: '\u{1F1EC}\u{1F1E7}', name: 'United Kingdom' },
  { code: 'ES', dialCode: '+34', flag: '\u{1F1EA}\u{1F1F8}', name: 'Spain' },
  { code: 'FR', dialCode: '+33', flag: '\u{1F1EB}\u{1F1F7}', name: 'France' },
  { code: 'DE', dialCode: '+49', flag: '\u{1F1E9}\u{1F1EA}', name: 'Germany' },
  { code: 'IT', dialCode: '+39', flag: '\u{1F1EE}\u{1F1F9}', name: 'Italy' },
  { code: 'BR', dialCode: '+55', flag: '\u{1F1E7}\u{1F1F7}', name: 'Brazil' },
  { code: 'AR', dialCode: '+54', flag: '\u{1F1E6}\u{1F1F7}', name: 'Argentina' },
  { code: 'CO', dialCode: '+57', flag: '\u{1F1E8}\u{1F1F4}', name: 'Colombia' },
  { code: 'CL', dialCode: '+56', flag: '\u{1F1E8}\u{1F1F1}', name: 'Chile' },
  { code: 'PE', dialCode: '+51', flag: '\u{1F1F5}\u{1F1EA}', name: 'Peru' },
  { code: 'JP', dialCode: '+81', flag: '\u{1F1EF}\u{1F1F5}', name: 'Japan' },
  { code: 'CN', dialCode: '+86', flag: '\u{1F1E8}\u{1F1F3}', name: 'China' },
  { code: 'IN', dialCode: '+91', flag: '\u{1F1EE}\u{1F1F3}', name: 'India' },
  { code: 'AU', dialCode: '+61', flag: '\u{1F1E6}\u{1F1FA}', name: 'Australia' },
  { code: 'IE', dialCode: '+353', flag: '\u{1F1EE}\u{1F1EA}', name: 'Ireland' },
  { code: 'ID', dialCode: '+62', flag: '\u{1F1EE}\u{1F1E9}', name: 'Indonesia' },
  { code: 'NL', dialCode: '+31', flag: '\u{1F1F3}\u{1F1F1}', name: 'Netherlands' },
  { code: 'BE', dialCode: '+32', flag: '\u{1F1E7}\u{1F1EA}', name: 'Belgium' },
  { code: 'CH', dialCode: '+41', flag: '\u{1F1E8}\u{1F1ED}', name: 'Switzerland' },
  { code: 'AT', dialCode: '+43', flag: '\u{1F1E6}\u{1F1F9}', name: 'Austria' },
  { code: 'PT', dialCode: '+351', flag: '\u{1F1F5}\u{1F1F9}', name: 'Portugal' },
  { code: 'GR', dialCode: '+30', flag: '\u{1F1EC}\u{1F1F7}', name: 'Greece' },
  { code: 'PL', dialCode: '+48', flag: '\u{1F1F5}\u{1F1F1}', name: 'Poland' },
  { code: 'RU', dialCode: '+7', flag: '\u{1F1F7}\u{1F1FA}', name: 'Russia' },
  { code: 'ZA', dialCode: '+27', flag: '\u{1F1FF}\u{1F1E6}', name: 'South Africa' },
  { code: 'NZ', dialCode: '+64', flag: '\u{1F1F3}\u{1F1FF}', name: 'New Zealand' },
  { code: 'KR', dialCode: '+82', flag: '\u{1F1F0}\u{1F1F7}', name: 'South Korea' },
  { code: 'SG', dialCode: '+65', flag: '\u{1F1F8}\u{1F1EC}', name: 'Singapore' },
]

export type CountryCode = (typeof COUNTRY_CODES)[number]

export interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  /** Phone number value */
  value?: string
  /** Selected country code */
  countryCode?: string
  /** Callback when phone changes */
  onChange?: (phone: string, countryCode: string) => void
  /** Default country (auto-detected if not provided) */
  defaultCountry?: string
  /** Label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error state */
  error?: boolean
  /** Custom country list */
  countries?: CountryCode[]
  /** Enable auto-detection of country */
  autoDetectCountry?: boolean
  /** Format phone number as user types */
  formatOnType?: boolean
}

const formatPhoneNumber = (value: string, countryCode: string): string => {
  const digits = value.replace(/\D/g, '')

  const patterns: Record<string, (d: string) => string> = {
    US: d => {
      if (d.length <= 3) return d
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`
    },
    ES: d => {
      if (d.length <= 3) return d
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)}`
    },
    AU: d => {
      if (d.length <= 4) return d
      if (d.length <= 8) return `${d.slice(0, 4)} ${d.slice(4)}`
      return `${d.slice(0, 4)} ${d.slice(4, 8)} ${d.slice(8, 10)}`
    },
    IE: d => {
      if (d.length <= 3) return d
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)}`
    },
    ID: d => {
      if (d.length <= 4) return d
      if (d.length <= 8) return `${d.slice(0, 4)} ${d.slice(4)}`
      return `${d.slice(0, 4)}-${d.slice(4, 8)}-${d.slice(8, 12)}`
    },
  }

  const formatter = patterns[countryCode]
  return formatter ? formatter(digits) : digits
}

const detectCountry = (): string => {
  if (typeof navigator === 'undefined') return 'US'

  const locale = navigator.language || navigator.languages?.[0] || 'en-US'
  const country = locale.split('-')[1]?.toUpperCase()

  if (country && COUNTRY_CODES.find(c => c.code === country)) {
    return country
  }

  return 'US'
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = '',
      countryCode: controlledCountry,
      onChange,
      defaultCountry,
      label,
      helperText,
      error = false,
      disabled = false,
      countries = COUNTRY_CODES,
      autoDetectCountry = true,
      formatOnType = true,
      style,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [internalCountry, setInternalCountry] = useState(() => {
      if (defaultCountry) return defaultCountry
      if (autoDetectCountry) return detectCountry()
      return 'US'
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const country = controlledCountry || internalCountry
    const selectedCountry = countries.find(c => c.code === country) || countries[0]

    const filteredCountries = React.useMemo(() => {
      if (!searchQuery) return countries
      const query = searchQuery.toLowerCase()
      return countries.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.dialCode.includes(query) ||
          c.code.toLowerCase().includes(query)
      )
    }, [countries, searchQuery])

    useEffect(() => {
      if (isOpen && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0)
      }
    }, [isOpen])

    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
          setSearchQuery('')
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleCountrySelect = (c: CountryCode) => {
      setInternalCountry(c.code)
      setIsOpen(false)
      setSearchQuery('')
      onChange?.(value, c.code)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const digits = inputValue.replace(/\D/g, '')
      const formatted = formatOnType ? formatPhoneNumber(digits, country) : digits
      onChange?.(formatted, country)
    }

    const borderColor = error ? PHONE_INPUT_TOKENS.borderError : PHONE_INPUT_TOKENS.border
    const focusBorderColor = error ? PHONE_INPUT_TOKENS.borderError : PHONE_INPUT_TOKENS.borderFocus
    const focusRing = error
      ? '0 0 0 3px rgba(220, 38, 38, 0.15)'
      : '0 0 0 3px rgba(32, 80, 246, 0.15)'

    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      ...style,
    }

    const groupStyle: React.CSSProperties = {
      '--v-border': borderColor,
      '--v-border-focus': focusBorderColor,
      '--v-focus-ring': disabled ? 'none' : focusRing,
      display: 'flex',
      alignItems: 'stretch',
      height: PHONE_INPUT_TOKENS.height,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: PHONE_INPUT_TOKENS.radius,
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--vistral-font-family-sans)',
    } as React.CSSProperties

    const countrySelectorStyle: React.CSSProperties = {
      '--v-bg': PHONE_INPUT_TOKENS.bg,
      '--v-bg-hover': disabled ? PHONE_INPUT_TOKENS.bg : PHONE_INPUT_TOKENS.country.bgHover,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: `0 ${PHONE_INPUT_TOKENS.country.paddingX}px`,
      backgroundColor: 'var(--v-bg)',
      border: 'none',
      borderRight: `1px solid ${error ? PHONE_INPUT_TOKENS.borderError : '#e4e4e7'}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: PHONE_INPUT_TOKENS.country.fontSize,
      transition: 'background-color 150ms ease',
    } as React.CSSProperties

    const inputStyle: React.CSSProperties = {
      flex: 1,
      height: '100%',
      padding: `0 ${PHONE_INPUT_TOKENS.input.paddingX}px`,
      border: 'none',
      outline: 'none',
      fontSize: PHONE_INPUT_TOKENS.input.fontSize,
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 280,
      marginTop: 4,
      backgroundColor: PHONE_INPUT_TOKENS.dropdown.bg,
      border: `1px solid ${PHONE_INPUT_TOKENS.dropdown.border}`,
      borderRadius: PHONE_INPUT_TOKENS.dropdown.radius,
      boxShadow: PHONE_INPUT_TOKENS.dropdown.shadow,
      maxHeight: PHONE_INPUT_TOKENS.dropdown.maxHeight,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
    }

    const searchStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: PHONE_INPUT_TOKENS.dropdown.searchPadding,
      borderBottom: `1px solid ${PHONE_INPUT_TOKENS.dropdown.border}`,
    }

    const searchInputStyle: React.CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontSize: 14,
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
    }

    const optionsContainerStyle: React.CSSProperties = {
      overflowY: 'auto',
      maxHeight: PHONE_INPUT_TOKENS.dropdown.maxHeight - 60,
    }

    const optionStyle = (isSelected: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: PHONE_INPUT_TOKENS.dropdown.optionPadding,
      fontSize: 14,
      cursor: 'pointer',
      backgroundColor: isSelected ? '#f4f4f5' : 'transparent',
      transition: 'background-color 150ms ease',
    })

    return (
      <div style={wrapperStyle}>
        {label && (
          <label
            htmlFor={`phone-input-${country}`}
            style={{
              display: 'block',
              marginBottom: 6,
              fontSize: 14,
              fontWeight: 500,
              color: disabled ? '#a1a1aa' : '#18181b',
              fontFamily: 'var(--vistral-font-family-sans)',
            }}
          >
            {label}
          </label>
        )}

        <div ref={containerRef} style={{ position: 'relative' }}>
          <div data-vistral="input-group" data-disabled={disabled || undefined} style={groupStyle}>
            <button
              type="button"
              aria-label={`Select country code, currently ${selectedCountry.name}`}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              style={countrySelectorStyle}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              data-vistral-interactive=""
            >
              <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
              <span style={{ color: '#18181b', fontWeight: 500 }}>{selectedCountry.dialCode}</span>
              {isOpen ? (
                <ChevronUp size={16} style={{ color: '#71717a' }} />
              ) : (
                <ChevronDown size={16} style={{ color: '#71717a' }} />
              )}
            </button>

            <input
              ref={ref}
              id={`phone-input-${country}`}
              type="tel"
              value={value}
              onChange={handleInputChange}
              disabled={disabled}
              style={inputStyle}
              data-vistral="input"
              placeholder={`${selectedCountry.dialCode} Phone number`}
              aria-label={label || 'Phone number'}
              aria-invalid={error}
              aria-describedby={helperText ? `phone-helper-${country}` : undefined}
              {...props}
            />
          </div>

          {isOpen && (
            <div role="listbox" style={dropdownStyle}>
              <div style={searchStyle}>
                <Search size={16} style={{ color: '#71717a' }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={searchInputStyle}
                  aria-label="Search country"
                />
              </div>

              <div style={optionsContainerStyle}>
                {filteredCountries.map(c => {
                  const isSelected = c.code === country
                  return (
                    <div
                      key={c.code}
                      role="option"
                      aria-selected={isSelected}
                      data-vistral="list-item"
                      style={optionStyle(isSelected)}
                      onClick={() => handleCountrySelect(c)}
                    >
                      <span style={{ fontSize: 18 }}>{c.flag}</span>
                      <span style={{ flex: 1, color: '#18181b' }}>{c.name}</span>
                      <span style={{ color: '#71717a', marginRight: 8 }}>{c.dialCode}</span>
                      {isSelected && <Check size={16} style={{ color: '#2050f6' }} />}
                    </div>
                  )
                })}
                {filteredCountries.length === 0 && (
                  <div
                    style={{
                      padding: PHONE_INPUT_TOKENS.dropdown.optionPadding,
                      color: '#71717a',
                      fontSize: 14,
                    }}
                  >
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {helperText && (
          <p
            id={`phone-helper-${country}`}
            style={{
              margin: '6px 0 0',
              fontSize: 12,
              color: error ? '#dc2626' : '#71717a',
              fontFamily: 'var(--vistral-font-family-sans)',
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export { PhoneInput, PHONE_INPUT_TOKENS, COUNTRY_CODES }
