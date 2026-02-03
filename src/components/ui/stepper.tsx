import * as React from "react"
import { forwardRef, createContext, useContext } from "react"
import { Check } from "lucide-react"

/**
 * Stepper Design Tokens from Figma
 * https://www.figma.com/design/i0plqavJ8VqpKeqr6TkLtD/Design-System---PropHero?node-id=1584-629
 */
const STEPPER_TOKENS = {
  // Step indicator
  indicator: {
    size: 32,
    fontSize: 14,
    fontWeight: 600,
    // States
    default: { bg: '#f4f4f5', fg: '#71717a', border: '#e4e4e7' },
    active: { bg: '#2050f6', fg: '#ffffff', border: '#2050f6' },
    completed: { bg: '#16a34a', fg: '#ffffff', border: '#16a34a' },
    error: { bg: '#fee2e2', fg: '#dc2626', border: '#dc2626' },
  },
  // Connector line
  connector: {
    height: 2,
    bg: '#e4e4e7',
    bgCompleted: '#16a34a',
  },
  // Label
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#18181b',
    colorMuted: '#71717a',
  },
  // Description
  description: {
    fontSize: 12,
    color: '#71717a',
  },
} as const

type StepStatus = 'pending' | 'active' | 'completed' | 'error'

// ============================================================================
// Context
// ============================================================================
type StepperContextValue = {
  currentStep: number
  orientation: 'horizontal' | 'vertical'
  totalSteps: number
}

const StepperContext = createContext<StepperContextValue | null>(null)

function useStepper() {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper components must be used within a Stepper')
  }
  return context
}

// ============================================================================
// Stepper Root
// ============================================================================
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current active step (0-indexed) */
  currentStep: number
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ currentStep, orientation = 'horizontal', style, children, ...props }, ref) => {
    const totalSteps = React.Children.count(children)

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      alignItems: orientation === 'horizontal' ? 'flex-start' : 'stretch',
      gap: orientation === 'horizontal' ? 0 : 0,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      ...style,
    }

    return (
      <StepperContext.Provider value={{ currentStep, orientation, totalSteps }}>
        <div ref={ref} style={containerStyle} role="list" {...props}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { index } as any)
            }
            return child
          })}
        </div>
      </StepperContext.Provider>
    )
  }
)

Stepper.displayName = "Stepper"

// ============================================================================
// Stepper Step
// ============================================================================
export interface StepperStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step label */
  label: string
  /** Step description */
  description?: string
  /** Override status */
  status?: StepStatus
  /** Optional icon */
  icon?: React.ReactNode
  /** Internal index (set by parent) */
  index?: number
}

const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  ({ label, description, status: statusProp, icon, index = 0, style, ...props }, ref) => {
    const { currentStep, orientation, totalSteps } = useStepper()

    const isLast = index === totalSteps - 1

    // Determine status
    const status: StepStatus = statusProp || (
      index < currentStep ? 'completed' :
      index === currentStep ? 'active' :
      'pending'
    )

    const getIndicatorColors = () => {
      switch (status) {
        case 'completed': return STEPPER_TOKENS.indicator.completed
        case 'active': return STEPPER_TOKENS.indicator.active
        case 'error': return STEPPER_TOKENS.indicator.error
        default: return STEPPER_TOKENS.indicator.default
      }
    }

    const colors = getIndicatorColors()

    const stepStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'horizontal' ? 'column' : 'row',
      alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
      flex: orientation === 'horizontal' && !isLast ? 1 : undefined,
      gap: orientation === 'vertical' ? 12 : 0,
      ...style,
    }

    const indicatorRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: orientation === 'horizontal' ? '100%' : undefined,
    }

    const indicatorStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: STEPPER_TOKENS.indicator.size,
      height: STEPPER_TOKENS.indicator.size,
      borderRadius: '50%',
      backgroundColor: colors.bg,
      color: colors.fg,
      border: `2px solid ${colors.border}`,
      fontSize: STEPPER_TOKENS.indicator.fontSize,
      fontWeight: STEPPER_TOKENS.indicator.fontWeight,
      flexShrink: 0,
    }

    const connectorStyle: React.CSSProperties = orientation === 'horizontal' ? {
      flex: 1,
      height: STEPPER_TOKENS.connector.height,
      backgroundColor: status === 'completed' || index < currentStep 
        ? STEPPER_TOKENS.connector.bgCompleted 
        : STEPPER_TOKENS.connector.bg,
      marginLeft: 8,
      marginRight: 8,
    } : {
      width: STEPPER_TOKENS.connector.height,
      minHeight: 40,
      backgroundColor: status === 'completed' || index < currentStep 
        ? STEPPER_TOKENS.connector.bgCompleted 
        : STEPPER_TOKENS.connector.bg,
      marginLeft: STEPPER_TOKENS.indicator.size / 2 - 1,
      marginTop: 4,
      marginBottom: 4,
    }

    const contentStyle: React.CSSProperties = {
      textAlign: orientation === 'horizontal' ? 'center' : 'left',
      marginTop: orientation === 'horizontal' ? 8 : 0,
      flex: orientation === 'vertical' ? 1 : undefined,
    }

    const labelStyle: React.CSSProperties = {
      fontSize: STEPPER_TOKENS.label.fontSize,
      fontWeight: STEPPER_TOKENS.label.fontWeight,
      color: status === 'pending' ? STEPPER_TOKENS.label.colorMuted : STEPPER_TOKENS.label.color,
    }

    const descriptionStyle: React.CSSProperties = {
      fontSize: STEPPER_TOKENS.description.fontSize,
      color: STEPPER_TOKENS.description.color,
      marginTop: 2,
    }

    return (
      <div ref={ref} role="listitem" style={stepStyle} {...props}>
        {orientation === 'horizontal' ? (
          <>
            <div style={indicatorRowStyle}>
              <div style={indicatorStyle}>
                {status === 'completed' ? <Check size={16} /> : (icon || index + 1)}
              </div>
              {!isLast && <div style={connectorStyle} />}
            </div>
            <div style={contentStyle}>
              <div style={labelStyle}>{label}</div>
              {description && <div style={descriptionStyle}>{description}</div>}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={indicatorStyle}>
                {status === 'completed' ? <Check size={16} /> : (icon || index + 1)}
              </div>
              {!isLast && <div style={connectorStyle} />}
            </div>
            <div style={contentStyle}>
              <div style={labelStyle}>{label}</div>
              {description && <div style={descriptionStyle}>{description}</div>}
            </div>
          </>
        )}
      </div>
    )
  }
)

StepperStep.displayName = "StepperStep"

export { Stepper, StepperStep, STEPPER_TOKENS }
