interface Props {
  label: string
  percent: number
  stars?: number
  locked?: boolean
}

// Thanh progress có label + % + sao, hỗ trợ trạng thái locked
export default function ProgressBar({ label, percent, stars = 0, locked }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{
        fontSize: '13px',
        fontWeight: 700,
        minWidth: '60px',
        color: locked ? '#999' : '#5B4FCF',
        fontFamily: 'var(--font-heading)',
      }}>
        {label}
      </span>
      <div style={{
        flex: 1,
        background: '#EDE9FF',
        borderRadius: '50px',
        height: '18px',
        overflow: 'hidden',
        border: '2px solid #C5B8FF',
        opacity: locked ? 0.4 : 1,
      }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #FF8C42, #FFB347)',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '8px',
          fontSize: '10px',
          fontWeight: 800,
          color: '#fff',
          transition: 'width 0.3s ease',
          minWidth: percent > 0 ? '30px' : '0',
        }}>
          {percent > 0 ? `${Math.round(percent)}%` : ''}
        </div>
      </div>
      <span style={{ fontSize: '16px', opacity: locked ? 0.3 : 1 }}>
        {locked ? '🔒' : '⭐'.repeat(stars)}
      </span>
    </div>
  )
}
