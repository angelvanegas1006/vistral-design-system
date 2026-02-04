import * as React from "react"
import { forwardRef, useState } from "react"
import { Heart, Building, Home, Bed, Bath, Maximize, Info } from "lucide-react"

/**
 * Property Card Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-15881
 */
const PROPERTY_CARD_TOKENS = {
  // Card
  card: {
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 16,
    shadow: '0 1px 3px rgba(0,0,0,0.08)',
    shadowHover: '0 8px 24px rgba(0,0,0,0.12)',
    padding: 16,
  },
  // Image
  image: {
    height: 200,
    radius: 12,
  },
  // Type badge (on image)
  typeBadge: {
    bg: '#2050f6',
    fg: '#ffffff',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 12px',
    radius: 8,
  },
  // Status badge (inline with title)
  status: {
    available: { bg: '#dcfce7', fg: '#15803d', border: '#86efac', label: 'Available' },
    reserved: { bg: '#fef3c7', fg: '#b45309', border: '#fcd34d', label: 'Reserved' },
    sold: { bg: '#fee2e2', fg: '#b91c1c', border: '#fca5a5', label: 'Sold' },
    comingSoon: { bg: '#dbeafe', fg: '#1d4ed8', border: '#93c5fd', label: 'Coming Soon' },
  },
  // Title
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: '#18181b',
  },
  // Location
  location: {
    fontSize: 14,
    color: '#71717a',
  },
  // Feature pills
  featurePill: {
    height: 32,
    paddingX: 12,
    fontSize: 13,
    fontWeight: 500,
    color: '#3f3f46',
    border: '#e4e4e7',
    radius: 8,
    gap: 6,
  },
  // Price section
  priceLabel: {
    fontSize: 13,
    color: '#71717a',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 700,
    color: '#18181b',
  },
  yieldValue: {
    fontSize: 24,
    fontWeight: 700,
    positive: '#16a34a',
  },
  // Info rows
  infoRow: {
    fontSize: 14,
    labelColor: '#71717a',
    valueColor: '#18181b',
    valueWeight: 500,
  },
} as const

type PropertyStatus = 'available' | 'reserved' | 'sold' | 'comingSoon'

export interface PropertyInfoRow {
  label: string
  value: string
  hasInfo?: boolean
}

export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Property image */
  image?: string
  /** Property type badge (e.g., "Apartment", "Project") */
  type?: string
  /** Property title */
  title: string
  /** Status */
  status?: PropertyStatus
  /** Location */
  location: string
  /** Property category (e.g., "Flat", "House") */
  category?: string
  /** Number of bedrooms */
  bedrooms?: number
  /** Number of bathrooms */
  bathrooms?: number
  /** Area in square meters */
  area?: number
  /** Purchase price */
  price: number
  /** Currency */
  currency?: string
  /** Net yield percentage */
  yieldPercent?: number
  /** Info rows (Estimated rent, Total investment, etc.) */
  infoRows?: PropertyInfoRow[]
  /** Favorite state */
  isFavorite?: boolean
  /** Callback when favorite clicked */
  onFavoriteChange?: (isFavorite: boolean) => void
  /** Callback when card clicked */
  onCardClick?: () => void
  /** Show skeleton loading state */
  loading?: boolean
}

const PropertyCard = forwardRef<HTMLDivElement, PropertyCardProps>(
  ({
    image,
    type,
    title,
    status,
    location,
    category,
    bedrooms,
    bathrooms,
    area,
    price,
    currency = '€',
    yieldPercent,
    infoRows = [],
    isFavorite = false,
    onFavoriteChange,
    onCardClick,
    loading = false,
    style,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    const [favorite, setFavorite] = useState(isFavorite)

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      const newValue = !favorite
      setFavorite(newValue)
      onFavoriteChange?.(newValue)
    }

    const formatPrice = (value: number) => {
      return value.toLocaleString('es-ES')
    }

    // Skeleton loading
    if (loading) {
      return (
        <div
          ref={ref}
          style={{
            backgroundColor: PROPERTY_CARD_TOKENS.card.bg,
            borderRadius: PROPERTY_CARD_TOKENS.card.radius,
            border: `1px solid ${PROPERTY_CARD_TOKENS.card.border}`,
            padding: PROPERTY_CARD_TOKENS.card.padding,
            ...style,
          }}
          {...props}
        >
          <div style={{ 
            height: PROPERTY_CARD_TOKENS.image.height, 
            backgroundColor: '#f4f4f5',
            borderRadius: PROPERTY_CARD_TOKENS.image.radius,
            marginBottom: 16,
          }} />
          <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
            <div style={{ height: 20, flex: 1, backgroundColor: '#f4f4f5', borderRadius: 4 }} />
            <div style={{ height: 20, width: 70, backgroundColor: '#f4f4f5', borderRadius: 4 }} />
          </div>
          <div style={{ height: 14, width: '40%', backgroundColor: '#f4f4f5', borderRadius: 4, marginBottom: 16 }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: 32, width: 70, backgroundColor: '#f4f4f5', borderRadius: 8 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 12, width: '60%', backgroundColor: '#f4f4f5', borderRadius: 3, marginBottom: 8 }} />
              <div style={{ height: 24, width: '80%', backgroundColor: '#f4f4f5', borderRadius: 4 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 12, width: '50%', backgroundColor: '#f4f4f5', borderRadius: 3, marginBottom: 8 }} />
              <div style={{ height: 24, width: '40%', backgroundColor: '#f4f4f5', borderRadius: 4 }} />
            </div>
          </div>
          {[1,2,3].map(i => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ height: 14, width: '35%', backgroundColor: '#f4f4f5', borderRadius: 3 }} />
              <div style={{ height: 14, width: '25%', backgroundColor: '#f4f4f5', borderRadius: 3 }} />
            </div>
          ))}
        </div>
      )
    }

    const cardStyle: React.CSSProperties = {
      backgroundColor: PROPERTY_CARD_TOKENS.card.bg,
      borderRadius: PROPERTY_CARD_TOKENS.card.radius,
      border: `1px solid ${PROPERTY_CARD_TOKENS.card.border}`,
      boxShadow: isHovered ? PROPERTY_CARD_TOKENS.card.shadowHover : PROPERTY_CARD_TOKENS.card.shadow,
      padding: PROPERTY_CARD_TOKENS.card.padding,
      cursor: onCardClick ? 'pointer' : 'default',
      transition: 'box-shadow 200ms ease, transform 200ms ease',
      transform: isHovered ? 'translateY(-2px)' : 'none',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    const imageContainerStyle: React.CSSProperties = {
      position: 'relative',
      height: PROPERTY_CARD_TOKENS.image.height,
      borderRadius: PROPERTY_CARD_TOKENS.image.radius,
      overflow: 'hidden',
      marginBottom: 16,
    }

    const imageStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    }
    
    // For sold properties, show a subtle overlay indicating unavailable
    const isSold = status === 'sold'

    const typeBadgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: 12,
      left: 12,
      padding: PROPERTY_CARD_TOKENS.typeBadge.padding,
      fontSize: PROPERTY_CARD_TOKENS.typeBadge.fontSize,
      fontWeight: PROPERTY_CARD_TOKENS.typeBadge.fontWeight,
      backgroundColor: PROPERTY_CARD_TOKENS.typeBadge.bg,
      color: PROPERTY_CARD_TOKENS.typeBadge.fg,
      borderRadius: PROPERTY_CARD_TOKENS.typeBadge.radius,
      zIndex: 2,
    }

    const favoriteButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: 12,
      right: 12,
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 2,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }

    const getStatusStyle = (s: PropertyStatus): React.CSSProperties => {
      const tokens = PROPERTY_CARD_TOKENS.status[s]
      return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        border: `1px solid ${tokens.border}`,
        borderRadius: 6,
        whiteSpace: 'nowrap',
      }
    }

    const featurePillStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: PROPERTY_CARD_TOKENS.featurePill.gap,
      height: PROPERTY_CARD_TOKENS.featurePill.height,
      padding: `0 ${PROPERTY_CARD_TOKENS.featurePill.paddingX}px`,
      fontSize: PROPERTY_CARD_TOKENS.featurePill.fontSize,
      fontWeight: PROPERTY_CARD_TOKENS.featurePill.fontWeight,
      color: PROPERTY_CARD_TOKENS.featurePill.color,
      border: `1px solid ${PROPERTY_CARD_TOKENS.featurePill.border}`,
      borderRadius: PROPERTY_CARD_TOKENS.featurePill.radius,
      backgroundColor: '#ffffff',
    }

    const hasFeatures = category || bedrooms !== undefined || bathrooms !== undefined || area !== undefined

    return (
      <div
        ref={ref}
        style={cardStyle}
        onClick={onCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Image section */}
        <div style={imageContainerStyle}>
          {image ? (
            <img src={image} alt={title} style={imageStyle} />
          ) : (
            <div style={{ 
              ...imageStyle, 
              backgroundColor: '#f4f4f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Building size={48} color="#d4d4d8" />
            </div>
          )}

          {/* Type badge */}
          {type && <span style={typeBadgeStyle}>{type}</span>}

          {/* Favorite button */}
          <button type="button" style={favoriteButtonStyle} onClick={handleFavoriteClick}>
            <Heart 
              size={18} 
              fill={favorite ? '#ef4444' : 'none'} 
              color={favorite ? '#ef4444' : '#71717a'} 
            />
          </button>
        </div>

        {/* Title + Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <h3 style={{
            margin: 0,
            fontSize: PROPERTY_CARD_TOKENS.title.fontSize,
            fontWeight: PROPERTY_CARD_TOKENS.title.fontWeight,
            color: PROPERTY_CARD_TOKENS.title.color,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </h3>
          {status && <span style={getStatusStyle(status)}>{PROPERTY_CARD_TOKENS.status[status].label}</span>}
        </div>

        {/* Location */}
        <div style={{
          fontSize: PROPERTY_CARD_TOKENS.location.fontSize,
          color: PROPERTY_CARD_TOKENS.location.color,
          marginBottom: 16,
        }}>
          {location}
        </div>

        {/* Feature pills */}
        {hasFeatures && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {category && (
              <span style={featurePillStyle}>
                <Home size={14} />
                {category}
              </span>
            )}
            {bedrooms !== undefined && (
              <span style={featurePillStyle}>
                <Bed size={14} />
                {bedrooms} beds
              </span>
            )}
            {bathrooms !== undefined && (
              <span style={featurePillStyle}>
                <Bath size={14} />
                {bathrooms} baths
              </span>
            )}
            {area !== undefined && (
              <span style={featurePillStyle}>
                <Maximize size={14} />
                {area} m²
              </span>
            )}
          </div>
        )}

        {/* Price section - two columns */}
        <div style={{ 
          display: 'flex', 
          gap: 24, 
          marginBottom: 20,
          opacity: isSold ? 0.5 : 1,
        }}>
          {/* Purchase price */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: PROPERTY_CARD_TOKENS.priceLabel.fontSize,
              color: PROPERTY_CARD_TOKENS.priceLabel.color,
              marginBottom: 4,
            }}>
              {isSold ? 'Was sold at' : 'Purchase price'}
            </div>
            <div style={{
              fontSize: PROPERTY_CARD_TOKENS.priceValue.fontSize,
              fontWeight: PROPERTY_CARD_TOKENS.priceValue.fontWeight,
              color: isSold ? '#71717a' : PROPERTY_CARD_TOKENS.priceValue.color,
              textDecoration: isSold ? 'line-through' : 'none',
            }}>
              {formatPrice(price)} {currency}
            </div>
          </div>

          {/* Net yield */}
          {yieldPercent !== undefined && (
            <div>
              <div style={{
                fontSize: PROPERTY_CARD_TOKENS.priceLabel.fontSize,
                color: PROPERTY_CARD_TOKENS.priceLabel.color,
                marginBottom: 4,
              }}>
                {isSold ? 'Yield was' : 'Net yield'}
              </div>
              <div style={{
                fontSize: PROPERTY_CARD_TOKENS.yieldValue.fontSize,
                fontWeight: PROPERTY_CARD_TOKENS.yieldValue.fontWeight,
                color: isSold ? '#71717a' : PROPERTY_CARD_TOKENS.yieldValue.positive,
                textDecoration: isSold ? 'line-through' : 'none',
              }}>
                {yieldPercent} %
              </div>
            </div>
          )}
        </div>

        {/* Info rows - show what was offered (even in sold state) */}
        {infoRows.length > 0 && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 12,
            opacity: isSold ? 0.5 : 1,
          }}>
            {infoRows.map((row, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: PROPERTY_CARD_TOKENS.infoRow.fontSize,
                }}
              >
                <span style={{ 
                  color: PROPERTY_CARD_TOKENS.infoRow.labelColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  {row.label}
                  {row.hasInfo && <Info size={14} style={{ opacity: 0.5 }} />}
                </span>
                <span style={{ 
                  color: isSold ? '#a1a1aa' : PROPERTY_CARD_TOKENS.infoRow.valueColor,
                  fontWeight: PROPERTY_CARD_TOKENS.infoRow.valueWeight,
                  textDecoration: isSold ? 'line-through' : 'none',
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

PropertyCard.displayName = "PropertyCard"

// ============================================================================
// Property Card Grid
// ============================================================================
export interface PropertyCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number
  gap?: number
}

const PropertyCardGrid = forwardRef<HTMLDivElement, PropertyCardGridProps>(
  ({ columns = 3, gap = 24, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PropertyCardGrid.displayName = "PropertyCardGrid"

export { PropertyCard, PropertyCardGrid, PROPERTY_CARD_TOKENS }
export type { PropertyStatus, PropertyInfoRow }
