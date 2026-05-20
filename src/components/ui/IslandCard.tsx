interface Props {
  icon: string
  name: string
  subtitle: string
  badge?: string
  badgeColor?: string
  locked?: boolean
  onClick?: () => void
}

// Card hiển thị một hòn đảo trên bản đồ, hỗ trợ locked/badge
export default function IslandCard({
  icon, name, subtitle, badge, badgeColor = '#5BC97A', locked, onClick,
}: Props) {
  const bg = locked ? '#F5F5F5' : '#F0FFFE'
  const borderColor = locked ? '#DDD' : '#5DCAA5'

  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: '22px',
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        border: `3px solid ${borderColor}`,
        cursor: locked ? 'default' : 'pointer',
        transition: 'transform 0.15s',
        position: 'relative',
        background: bg,
        opacity: locked ? 0.6 : 1,
        width: '100%',
        fontFamily: 'var(--font-body)',
      }}
      onMouseEnter={(e) => { if (!locked) e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
    >
      <span style={{ fontSize: '42px' }}>{icon}</span>
      <div style={{ textAlign: 'left' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '16px',
          color: locked ? '#888' : '#1A5C40',
          display: 'block',
        }}>
          {name}
        </span>
        <span style={{
          fontSize: '12px',
          color: locked ? '#AAA' : '#6B9E87',
          fontWeight: 600,
        }}>
          {subtitle}
        </span>
      </div>
      {badge && !locked && (
        <div style={{
          marginLeft: 'auto',
          background: badgeColor,
          color: '#fff',
          fontSize: '11px',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: '50px',
          whiteSpace: 'nowrap',
        }}>
          {badge}
        </div>
      )}
      {locked && (
        <span style={{
          fontSize: '18px',
          position: 'absolute',
          top: '12px',
          right: '14px',
        }}>
          🔒
        </span>
      )}
    </button>
  )
}
