import type { ReactNode } from 'react'

interface Props {
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  style?: React.CSSProperties
}

const baseStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 800,
  fontSize: '15px',
  padding: '12px 24px',
  borderRadius: '50px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  letterSpacing: '0.01em',
  transition: 'transform 0.1s, box-shadow 0.1s',
  border: 'none',
}

export default function Button({ variant = 'primary', onClick, disabled, children, style }: Props) {
  const variantStyles: React.CSSProperties =
    variant === 'primary'
      ? {
          background: '#FF8C42',
          color: '#fff',
          boxShadow: '0 4px 0 #C95F15',
        }
      : {
          background: '#fff',
          color: '#5B4FCF',
          border: '3px solid #5B4FCF',
          boxShadow: 'none',
        }

  return (
    <button
      style={{ ...baseStyle, ...variantStyles, ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}), ...style }}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(3px)'
          if (variant === 'primary') e.currentTarget.style.boxShadow = '0 1px 0 #C95F15'
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = ''
          if (variant === 'primary') e.currentTarget.style.boxShadow = '0 4px 0 #C95F15'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = ''
          if (variant === 'primary') e.currentTarget.style.boxShadow = '0 4px 0 #C95F15'
        }
      }}
    >
      {children}
    </button>
  )
}
