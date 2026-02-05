import * as React from 'react'
import { forwardRef } from 'react'

/**
 * Skeleton Design Tokens
 */
const SKELETON_TOKENS = {
  bg: '#e4e4e7',
  shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  animation: {
    duration: '1.5s',
  },
} as const

type SkeletonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of skeleton */
  width?: number | string
  /** Height of skeleton */
  height?: number | string
  /** Border radius */
  radius?: SkeletonRadius
  /** Circle shape (overrides width/height to be equal) */
  circle?: boolean
  /** Disable animation */
  animate?: boolean
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height = 20, radius = 'md', circle = false, animate = true, style, ...props }, ref) => {
    const size = circle ? (typeof height === 'number' ? height : 40) : undefined

    const skeletonStyle: React.CSSProperties = {
      display: 'block',
      width: circle ? size : width,
      height: circle ? size : height,
      backgroundColor: SKELETON_TOKENS.bg,
      borderRadius: circle ? '50%' : SKELETON_TOKENS.radius[radius],
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }

    const shimmerStyle: React.CSSProperties = animate
      ? {
          position: 'absolute',
          inset: 0,
          background: SKELETON_TOKENS.shimmer,
          animation: `skeleton-shimmer ${SKELETON_TOKENS.animation.duration} infinite`,
        }
      : {}

    return (
      <div ref={ref} style={skeletonStyle} {...props}>
        {animate && <div style={shimmerStyle} />}
      </div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

// ============================================================================
// Skeleton Text (multiple lines)
// ============================================================================
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of lines */
  lines?: number
  /** Gap between lines */
  gap?: number
  /** Last line width (percentage) */
  lastLineWidth?: number | string
}

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, gap = 8, lastLineWidth = '60%', style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap,
      ...style,
    }

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            height={16}
            width={i === lines - 1 ? lastLineWidth : '100%'}
            radius="sm"
          />
        ))}
      </div>
    )
  }
)

SkeletonText.displayName = 'SkeletonText'

// ============================================================================
// Skeleton Card (common card skeleton)
// ============================================================================
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show image placeholder */
  showImage?: boolean
  /** Image height */
  imageHeight?: number
}

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ showImage = true, imageHeight = 160, style, ...props }, ref) => {
    const cardStyle: React.CSSProperties = {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      border: '1px solid #e4e4e7',
      overflow: 'hidden',
      ...style,
    }

    const contentStyle: React.CSSProperties = {
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }

    return (
      <div ref={ref} style={cardStyle} {...props}>
        {showImage && <Skeleton width="100%" height={imageHeight} radius="none" />}
        <div style={contentStyle}>
          <Skeleton width="60%" height={20} />
          <SkeletonText lines={2} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Skeleton width={80} height={32} radius="full" />
            <Skeleton width={80} height={32} radius="full" />
          </div>
        </div>
      </div>
    )
  }
)

SkeletonCard.displayName = 'SkeletonCard'

// ============================================================================
// Skeleton Avatar
// ============================================================================
export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size */
  size?: number
}

const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 40, style, ...props }, ref) => {
    return <Skeleton ref={ref} circle width={size} height={size} style={style} {...props} />
  }
)

SkeletonAvatar.displayName = 'SkeletonAvatar'

// Add keyframes
if (typeof document !== 'undefined') {
  const styleId = 'vistral-skeleton-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes skeleton-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `
    document.head.appendChild(style)
  }
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SKELETON_TOKENS }
