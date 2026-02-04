import * as React from "react"
import { forwardRef, useState } from "react"
import { Heart, Building, Home, Bed, Bath, Maximize, Info } from "lucide-react"

/**
 * Property Card Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-15881
 */
const PROPERTY_CARD_TOKENS = {
  // Card - image goes edge-to-edge, only content has padding
  card: {
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 12,
    shadow: '0 1px 3px rgba(0,0,0,0.08)',
    shadowHover: '0 8px 24px rgba(0,0,0,0.12)',
    contentPadding: 16,
  },
  // Image - edge-to-edge, radius only on top
  image: {
    height: 180,
    radiusTop: 12,
  },
  // Type badge (on image)
  typeBadge: {
    bg: '#2050f6',
    fg: '#ffffff',
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 8px',
    radius: 6,
  },
  // Value added labels (on image)
  valueLabel: {
    offMarket: { bg: '#18181b', fg: '#ffffff', label: 'Off market' },
    highYield: { bg: '#2050f6', fg: '#ffffff', label: 'High Yield' },
    newConstruction: { bg: '#7c3aed', fg: '#ffffff', label: 'New Construction' },
    highValue: { bg: '#059669', fg: '#ffffff', label: 'High Value' },
  },
  // Status badge (on image, bottom)
  status: {
    available: { bg: '#dcfce7', fg: '#15803d', border: '#86efac', label: 'Available' },
    reserved: { bg: '#fef3c7', fg: '#b45309', border: '#fcd34d', label: 'Reserved' },
    sold: { bg: '#fee2e2', fg: '#b91c1c', border: '#fca5a5', label: 'Sold' },
    comingSoon: { bg: '#dbeafe', fg: '#1d4ed8', border: '#93c5fd', label: 'Coming Soon' },
  },
  // Title
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: '#18181b',
    lineHeight: 1.3,
  },
  // Location
  location: {
    fontSize: 12,
    color: '#71717a',
  },
  // Feature row (beds, baths, m2)
  features: {
    fontSize: 12,
    color: '#71717a',
    gap: 8,
  },
  // Price section
  priceValue: {
    fontSize: 18,
    fontWeight: 700,
    color: '#18181b',
  },
  // Net yield - BLUE as per Figma
  yieldValue: {
    fontSize: 18,
    fontWeight: 700,
    color: '#2050f6', // Blue color per Figma
  },
  // Info rows
  infoRow: {
    fontSize: 12,
    labelColor: '#71717a',
    valueColor: '#18181b',
    valueWeight: 500,
  },
} as const

type PropertyStatus = 'available' | 'reserved' | 'sold' | 'comingSoon'
type ValueLabel = 'offMarket' | 'highYield' | 'newConstruction' | 'highValue'

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
  /** Value added labels */
  valueLabels?: ValueLabel[]
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
    valueLabels = [],
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
            overflow: 'hidden',
            ...style,
          }}
          {...props}
        >
          <div style={{ 
            height: PROPERTY_CARD_TOKENS.image.height, 
            backgroundColor: '#f4f4f5',
          }} />
          <div style={{ padding: PROPERTY_CARD_TOKENS.card.contentPadding }}>
            <div style={{ height: 16, width: '80%', backgroundColor: '#f4f4f5', borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 12, width: '50%', backgroundColor: '#f4f4f5', borderRadius: 3, marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              <div style={{ height: 20, width: 80, backgroundColor: '#f4f4f5', borderRadius: 4 }} />
              <div style={{ height: 20, width: 60, backgroundColor: '#f4f4f5', borderRadius: 4 }} />
            </div>
            {[1,2,3].map(i => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ height: 12, width: '40%', backgroundColor: '#f4f4f5', borderRadius: 3 }} />
                <div style={{ height: 12, width: '25%', backgroundColor: '#f4f4f5', borderRadius: 3 }} />
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Card without padding - image goes edge-to-edge
    const cardStyle: React.CSSProperties = {
      backgroundColor: PROPERTY_CARD_TOKENS.card.bg,
      borderRadius: PROPERTY_CARD_TOKENS.card.radius,
      border: `1px solid ${PROPERTY_CARD_TOKENS.card.border}`,
      boxShadow: isHovered ? PROPERTY_CARD_TOKENS.card.shadowHover : PROPERTY_CARD_TOKENS.card.shadow,
      overflow: 'hidden', // Important for edge-to-edge image
      cursor: onCardClick ? 'pointer' : 'default',
      transition: 'box-shadow 200ms ease, transform 200ms ease',
      transform: isHovered ? 'translateY(-2px)' : 'none',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    // Image container - no margin, fills card width
    const imageContainerStyle: React.CSSProperties = {
      position: 'relative',
      height: PROPERTY_CARD_TOKENS.image.height,
      overflow: 'hidden',
    }

    const imageStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    }
    
    const isSold = status === 'sold'

    // Type badge (top left)
    const typeBadgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: 8,
      left: 8,
      padding: PROPERTY_CARD_TOKENS.typeBadge.padding,
      fontSize: PROPERTY_CARD_TOKENS.typeBadge.fontSize,
      fontWeight: PROPERTY_CARD_TOKENS.typeBadge.fontWeight,
      backgroundColor: PROPERTY_CARD_TOKENS.typeBadge.bg,
      color: PROPERTY_CARD_TOKENS.typeBadge.fg,
      borderRadius: PROPERTY_CARD_TOKENS.typeBadge.radius,
      zIndex: 2,
    }

    // Value labels style (on image)
    const getValueLabelStyle = (label: ValueLabel): React.CSSProperties => {
      const tokens = PROPERTY_CARD_TOKENS.valueLabel[label]
      return {
        padding: '4px 8px',
        fontSize: 10,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        borderRadius: 4,
      }
    }

    // Status badge (on image, bottom left)
    const getStatusStyle = (s: PropertyStatus): React.CSSProperties => {
      const tokens = PROPERTY_CARD_TOKENS.status[s]
      return {
        position: 'absolute',
        bottom: 8,
        left: 8,
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        fontSize: 10,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        borderRadius: 4,
        zIndex: 2,
      }
    }

    // Favorite button (top right)
    const favoriteButtonStyle: React.CSSProperties = {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 2,
    }

    // Content padding
    const contentStyle: React.CSSProperties = {
      padding: PROPERTY_CARD_TOKENS.card.contentPadding,
    }

    // Features inline text style
    const featuresStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: PROPERTY_CARD_TOKENS.features.gap,
      fontSize: PROPERTY_CARD_TOKENS.features.fontSize,
      color: PROPERTY_CARD_TOKENS.features.color,
      marginBottom: 12,
    }

    const hasFeatures = bedrooms !== undefined || bathrooms !== undefined || area !== undefined

    return (
      <div
        ref={ref}
        style={cardStyle}
        onClick={onCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Image section - edge-to-edge */}
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

          {/* Type badge (top left) */}
          {type && <span style={typeBadgeStyle}>{type}</span>}

          {/* Value labels (top left, after type) */}
          {valueLabels.length > 0 && (
            <div style={{ 
              position: 'absolute', 
              top: 8, 
              left: type ? 80 : 8, 
              display: 'flex', 
              gap: 4,
              zIndex: 2,
            }}>
              {valueLabels.map((label) => (
                <span key={label} style={getValueLabelStyle(label)}>
                  {PROPERTY_CARD_TOKENS.valueLabel[label].label}
                </span>
              ))}
            </div>
          )}

          {/* Favorite button (top right) */}
          <button type="button" style={favoriteButtonStyle} onClick={handleFavoriteClick}>
            <Heart 
              size={16} 
              fill={favorite ? '#ef4444' : 'none'} 
              color={favorite ? '#ef4444' : '#71717a'} 
            />
          </button>

          {/* Status badge (bottom left on image) */}
          {status && (
            <span style={getStatusStyle(status)}>
              {PROPERTY_CARD_TOKENS.status[status].label}
            </span>
          )}
        </div>

        {/* Content section with padding */}
        <div style={contentStyle}>
          {/* Title */}
          <h3 style={{
            margin: 0,
            marginBottom: 2,
            fontSize: PROPERTY_CARD_TOKENS.title.fontSize,
            fontWeight: PROPERTY_CARD_TOKENS.title.fontWeight,
            color: PROPERTY_CARD_TOKENS.title.color,
            lineHeight: PROPERTY_CARD_TOKENS.title.lineHeight,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </h3>

          {/* Location */}
          <div style={{
            fontSize: PROPERTY_CARD_TOKENS.location.fontSize,
            color: PROPERTY_CARD_TOKENS.location.color,
            marginBottom: 8,
          }}>
            {location}
          </div>

          {/* Features inline: beds · baths · m² */}
          {hasFeatures && (
            <div style={featuresStyle}>
              {bedrooms !== undefined && <span>{bedrooms} Hab</span>}
              {bedrooms !== undefined && bathrooms !== undefined && <span>·</span>}
              {bathrooms !== undefined && <span>{bathrooms} Baños</span>}
              {(bedrooms !== undefined || bathrooms !== undefined) && area !== undefined && <span>·</span>}
              {area !== undefined && <span>{area} m²</span>}
            </div>
          )}

          {/* Price + Yield row */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'baseline',
            gap: 8,
            marginBottom: infoRows.length > 0 ? 12 : 0,
            opacity: isSold ? 0.5 : 1,
          }}>
            <span style={{
              fontSize: PROPERTY_CARD_TOKENS.priceValue.fontSize,
              fontWeight: PROPERTY_CARD_TOKENS.priceValue.fontWeight,
              color: isSold ? '#71717a' : PROPERTY_CARD_TOKENS.priceValue.color,
            }}>
              {formatPrice(price)} {currency}
            </span>
            {yieldPercent !== undefined && (
              <span style={{
                fontSize: PROPERTY_CARD_TOKENS.yieldValue.fontSize,
                fontWeight: PROPERTY_CARD_TOKENS.yieldValue.fontWeight,
                color: isSold ? '#71717a' : PROPERTY_CARD_TOKENS.yieldValue.color,
              }}>
                {yieldPercent} %
              </span>
            )}
          </div>

          {/* Info rows */}
          {infoRows.length > 0 && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 6,
              paddingTop: 12,
              borderTop: '1px solid #f4f4f5',
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
                    {row.hasInfo && <Info size={12} style={{ opacity: 0.5 }} />}
                  </span>
                  <span style={{ 
                    color: isSold ? '#a1a1aa' : PROPERTY_CARD_TOKENS.infoRow.valueColor,
                    fontWeight: PROPERTY_CARD_TOKENS.infoRow.valueWeight,
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
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
export type { PropertyStatus, ValueLabel, PropertyInfoRow }
