import * as React from "react"
import { forwardRef } from "react"
import { User } from "lucide-react"

/**
 * Avatar Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=137-8968
 */
const AVATAR_TOKENS = {
  // Sizes
  sizes: {
    xs: { size: 24, fontSize: 10, iconSize: 14 },
    sm: { size: 32, fontSize: 12, iconSize: 18 },
    md: { size: 40, fontSize: 14, iconSize: 20 },
    lg: { size: 48, fontSize: 16, iconSize: 24 },
    xl: { size: 64, fontSize: 20, iconSize: 32 },
    '2xl': { size: 96, fontSize: 28, iconSize: 48 },
  },
  // Default colors for initials (based on name hash)
  colors: [
    { bg: '#dbeafe', fg: '#1d4ed8' },  // blue
    { bg: '#dcfce7', fg: '#15803d' },  // green
    { bg: '#fef3c7', fg: '#b45309' },  // amber
    { bg: '#fee2e2', fg: '#b91c1c' },  // red
    { bg: '#f3e8ff', fg: '#7c3aed' },  // violet
    { bg: '#ecfeff', fg: '#0e7490' },  // cyan
    { bg: '#fce7f3', fg: '#be185d' },  // pink
  ],
  // Fallback
  fallback: {
    bg: '#f4f4f5',   // zinc-100
    fg: '#71717a',   // zinc-500
  },
  // Border for group overlap
  border: '#ffffff',
  borderWidth: 2,
} as const

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Hash function for consistent color assignment
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Get initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ============================================================================
// Avatar
// ============================================================================
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source */
  src?: string
  /** Alt text for image */
  alt?: string
  /** Name for generating initials and color */
  name?: string
  /** Size of avatar */
  size?: AvatarSize
  /** Force specific initials */
  initials?: string
  /** Show online indicator */
  showStatus?: boolean
  /** Status color */
  status?: 'online' | 'offline' | 'busy' | 'away'
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ 
    src,
    alt,
    name,
    size = 'md',
    initials,
    showStatus = false,
    status = 'online',
    style, 
    ...props 
  }, ref) => {
    const [imgError, setImgError] = React.useState(false)
    const sizeTokens = AVATAR_TOKENS.sizes[size]
    
    // Get color based on name
    const colorIndex = name ? hashString(name) % AVATAR_TOKENS.colors.length : 0
    const colors = name ? AVATAR_TOKENS.colors[colorIndex] : AVATAR_TOKENS.fallback
    
    // Determine what to show
    const showImage = src && !imgError
    const displayInitials = initials || (name ? getInitials(name) : null)

    const avatarStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeTokens.size,
      height: sizeTokens.size,
      borderRadius: '50%',
      backgroundColor: showImage ? 'transparent' : colors.bg,
      color: colors.fg,
      fontSize: sizeTokens.fontSize,
      fontWeight: 600,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflow: 'hidden',
      flexShrink: 0,
      ...style,
    }

    const imgStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }

    const statusColors = {
      online: '#22c55e',   // green-500
      offline: '#71717a',  // zinc-500
      busy: '#ef4444',     // red-500
      away: '#f59e0b',     // amber-500
    }

    const statusSize = Math.max(8, sizeTokens.size * 0.25)
    const statusStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: statusSize,
      height: statusSize,
      borderRadius: '50%',
      backgroundColor: statusColors[status],
      border: `2px solid ${AVATAR_TOKENS.border}`,
      boxSizing: 'content-box',
    }

    return (
      <span ref={ref} style={avatarStyle} {...props}>
        {showImage ? (
          <img 
            src={src} 
            alt={alt || name || 'Avatar'} 
            style={imgStyle}
            onError={() => setImgError(true)}
          />
        ) : displayInitials ? (
          displayInitials
        ) : (
          <User size={sizeTokens.iconSize} />
        )}
        {showStatus && <span style={statusStyle} />}
      </span>
    )
  }
)

Avatar.displayName = "Avatar"

// ============================================================================
// Avatar Group
// ============================================================================
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show */
  max?: number
  /** Size of avatars in group */
  size?: AvatarSize
  /** Overlap amount (percentage of avatar size) */
  overlap?: number
  /** Children should be Avatar components */
  children: React.ReactNode
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ 
    max = 5,
    size = 'md',
    overlap = 0.3,
    style, 
    children, 
    ...props 
  }, ref) => {
    const sizeTokens = AVATAR_TOKENS.sizes[size]
    const overlapPx = sizeTokens.size * overlap

    const childArray = React.Children.toArray(children)
    const visibleChildren = childArray.slice(0, max)
    const remainingCount = childArray.length - max

    const groupStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      ...style,
    }

    const itemStyle: React.CSSProperties = {
      marginLeft: -overlapPx,
      border: `${AVATAR_TOKENS.borderWidth}px solid ${AVATAR_TOKENS.border}`,
      borderRadius: '50%',
    }

    const counterStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeTokens.size,
      height: sizeTokens.size,
      marginLeft: -overlapPx,
      borderRadius: '50%',
      backgroundColor: '#e4e4e7',
      color: '#3f3f46',
      fontSize: sizeTokens.fontSize,
      fontWeight: 600,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      border: `${AVATAR_TOKENS.borderWidth}px solid ${AVATAR_TOKENS.border}`,
    }

    return (
      <div ref={ref} style={groupStyle} {...props}>
        {remainingCount > 0 && (
          <span style={counterStyle}>+{remainingCount}</span>
        )}
        {visibleChildren.reverse().map((child, index) => (
          <span key={index} style={itemStyle}>
            {React.cloneElement(child as React.ReactElement<{ size?: string }>, { size })}
          </span>
        ))}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup, AVATAR_TOKENS }
