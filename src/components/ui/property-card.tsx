import * as React from "react"
import { forwardRef, useState } from "react"
import { Heart, Building, Home, Bed, Bath, Maximize, Info } from "lucide-react"

/**
 * Property Card Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=4363-20788
 */
const PROPERTY_CARD_TOKENS = {
  // Card - image goes edge-to-edge, only content has padding
  card: {
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 16,
    shadow: '0 1px 3px rgba(0,0,0,0.08)',
    shadowHover: '0 8px 24px rgba(0,0,0,0.12)',
    contentPadding: 20,
  },
  // Image - edge-to-edge, radius only on top
  image: {
    height: 200,
    radiusTop: 16,
  },
  // Type badge (on image, top-left)
  typeBadge: {
    bg: '#18181b', // Dark grey per Figma
    fg: '#ffffff',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 14px',
    radius: 20,
  },
  // Value added labels (on image, max 2)
  valueLabel: {
    offMarket: { bg: '#18181b', fg: '#ffffff', label: 'Off market' },
    highYield: { bg: '#16a34a', fg: '#ffffff', label: 'High yield' },
    newConstruction: { bg: '#2050f6', fg: '#ffffff', label: 'New Construction' },
    highValue: { bg: '#f59e0b', fg: '#ffffff', label: 'High Value' },
  },
  // Status badge (inline with title)
  status: {
    available: { bg: '#dcfce7', fg: '#15803d', border: '#86efac', label: 'Available' },
    reserved: { bg: '#fef3c7', fg: '#b45309', border: '#fcd34d', label: 'Reserved' },
    sold: { bg: '#ffffff', fg: '#71717a', border: '#e4e4e7', label: 'Sold' },
    comingSoon: { bg: '#e0e7ff', fg: '#4338ca', border: '#c7d2fe', label: 'Coming Soon' },
  },
  // Title
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#18181b',
    lineHeight: 1.3,
  },
  // Location
  location: {
    fontSize: 14,
    color: '#71717a',
  },
  // Feature pills
  featurePill: {
    height: 36,
    paddingX: 14,
    fontSize: 14,
    fontWeight: 500,
    color: '#3f3f46',
    bg: '#ffffff',
    border: '#e4e4e7',
    radius: 8,
    gap: 8,
  },
  // Price labels
  priceLabel: {
    fontSize: 14,
    color: '#71717a',
  },
  // Price value
  priceValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#18181b',
  },
  // Net yield - GREEN per Figma
  yieldValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#16a34a', // Green color per Figma
  },
  // Info rows
  infoRow: {
    fontSize: 16,
    labelColor: '#71717a',
    valueColor: '#18181b',
    valueWeight: 500,
  },
  // Delivery info (for projects)
  delivery: {
    fontSize: 14,
    color: '#71717a',
  },
} as const

type PropertyStatus = 'available' | 'reserved' | 'sold' | 'comingSoon'
type ValueLabel = 'offMarket' | 'highYield' | 'newConstruction' | 'highValue'

export interface PropertyInfoRow {
  label: string
  value: string | null // null for missing data
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
  /** Value added labels (max 2 per Figma) */
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
  /** Delivery date (for projects) */
  deliveryDate?: string
  /** Construction status (for projects) */
  constructionStatus?: string
  /** Show favorite button */
  showFavorite?: boolean
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
    deliveryDate,
    constructionStatus,
    showFavorite = false,
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

    // Limit value labels to max 2 per Figma
    const displayValueLabels = valueLabels.slice(0, 2)

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
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ height: 36, width: 80, backgroundColor: '#f4f4f5', borderRadius: 8 }} />
              ))}
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
      overflow: 'hidden',
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
    const isProject = type === 'Project'

    // Type badge (top left) - dark grey pill per Figma
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

    // Value labels style (on image, after type badge)
    const getValueLabelStyle = (label: ValueLabel): React.CSSProperties => {
      const tokens = PROPERTY_CARD_TOKENS.valueLabel[label]
      return {
        padding: '4px 10px',
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        borderRadius: 4,
      }
    }

    // Status badge (inline with title)
    const getStatusStyle = (s: PropertyStatus): React.CSSProperties => {
      const tokens = PROPERTY_CARD_TOKENS.status[s]
      return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: tokens.bg,
        color: tokens.fg,
        border: `1px solid ${tokens.border}`,
        borderRadius: 6,
        whiteSpace: 'nowrap',
      }
    }

    // Favorite button (top right)
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

    // Content padding
    const contentStyle: React.CSSProperties = {
      padding: PROPERTY_CARD_TOKENS.card.contentPadding,
    }

    // Feature pill style
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
      backgroundColor: PROPERTY_CARD_TOKENS.featurePill.bg,
    }

    const hasFeatures = category || bedrooms !== undefined || bathrooms !== undefined || area !== undefined

    return (
      <div
        ref={ref}
        style={cardStyle}
        onClick={onCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        aria-label={`Property: ${title}`}
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

          {/* Value labels (on image, max 2) */}
          {displayValueLabels.length > 0 && (
            <div style={{ 
              position: 'absolute', 
              top: 12, 
              left: type ? 110 : 12, 
              display: 'flex', 
              gap: 6,
              zIndex: 2,
            }}>
              {displayValueLabels.map((label) => (
                <span key={label} style={getValueLabelStyle(label)}>
                  {PROPERTY_CARD_TOKENS.valueLabel[label].label}
                </span>
              ))}
            </div>
          )}

          {/* Favorite button (top right) */}
          {showFavorite && (
            <button 
              type="button" 
              style={favoriteButtonStyle} 
              onClick={handleFavoriteClick}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                size={18} 
                fill={favorite ? '#ef4444' : 'none'} 
                color={favorite ? '#ef4444' : '#71717a'} 
              />
            </button>
          )}
        </div>

        {/* Content section with padding */}
        <div style={contentStyle}>
          {/* Title + Status inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h3 style={{
              margin: 0,
              fontSize: PROPERTY_CARD_TOKENS.title.fontSize,
              fontWeight: PROPERTY_CARD_TOKENS.title.fontWeight,
              color: PROPERTY_CARD_TOKENS.title.color,
              lineHeight: PROPERTY_CARD_TOKENS.title.lineHeight,
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

          {/* Feature pills (for apartments) or Delivery info (for projects) */}
          {isProject && (deliveryDate || constructionStatus) ? (
            <div style={{ 
              fontSize: PROPERTY_CARD_TOKENS.delivery.fontSize,
              color: PROPERTY_CARD_TOKENS.delivery.color,
              marginBottom: 20,
            }}>
              {deliveryDate && `Delivery: ${deliveryDate}`}
              {deliveryDate && constructionStatus && ' · '}
              {constructionStatus && `Status: ${constructionStatus}`}
            </div>
          ) : hasFeatures ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {category && (
                <span style={featurePillStyle}>
                  <Home size={16} />
                  {category}
                </span>
              )}
              {bedrooms !== undefined && (
                <span style={featurePillStyle}>
                  <Bed size={16} />
                  {bedrooms} beds
                </span>
              )}
              {bathrooms !== undefined && (
                <span style={featurePillStyle}>
                  <Bath size={16} />
                  {bathrooms} baths
                </span>
              )}
              {area !== undefined && (
                <span style={featurePillStyle}>
                  <Maximize size={16} />
                  {area} m²
                </span>
              )}
            </div>
          ) : null}

          {/* Price section - two columns with labels */}
          <div style={{ 
            display: 'flex', 
            gap: 32, 
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
                Purchase price
              </div>
              <div style={{
                fontSize: PROPERTY_CARD_TOKENS.priceValue.fontSize,
                fontWeight: PROPERTY_CARD_TOKENS.priceValue.fontWeight,
                color: isSold ? '#71717a' : PROPERTY_CARD_TOKENS.priceValue.color,
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
                  Net yield
                </div>
                <div style={{
                  fontSize: PROPERTY_CARD_TOKENS.yieldValue.fontSize,
                  fontWeight: PROPERTY_CARD_TOKENS.yieldValue.fontWeight,
                  color: isSold ? '#71717a' : PROPERTY_CARD_TOKENS.yieldValue.color,
                }}>
                  {yieldPercent} %
                </div>
              </div>
            )}
          </div>

          {/* Separator + Info rows */}
          {infoRows.length > 0 && (
            <div style={{ 
              borderTop: '1px solid #e4e4e7',
              paddingTop: 16,
              display: 'flex', 
              flexDirection: 'column', 
              gap: 16,
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
                    gap: 6,
                  }}>
                    {row.label}
                    {row.hasInfo && (
                      <Info 
                        size={16} 
                        style={{ opacity: 0.5 }} 
                        aria-label="More information"
                      />
                    )}
                  </span>
                  <span style={{ 
                    color: row.value === null || row.value === '—' || row.value === 'XXXXX'
                      ? '#a1a1aa'
                      : isSold 
                        ? '#a1a1aa' 
                        : PROPERTY_CARD_TOKENS.infoRow.valueColor,
                    fontWeight: PROPERTY_CARD_TOKENS.infoRow.valueWeight,
                  }}>
                    {row.value === null ? '—' : row.value}
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
