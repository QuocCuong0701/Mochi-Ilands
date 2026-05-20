interface Props {
  active?: boolean
  onClick?: () => void
  disabled?: boolean
}

// Nút mic hình tròn — đổi màu khi đang listening, có animation pulse
export default function MicButton({ active, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: active ? '#FF6B6B' : '#5B4FCF',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: active ? '0 5px 0 #C94444' : '0 5px 0 #3B2FA0',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '28px',
        transition: 'transform 0.1s, box-shadow 0.1s',
        animation: active ? 'pulse 1s infinite' : 'none',
        position: 'relative',
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(4px)'
          e.currentTarget.style.boxShadow = '0 1px 0 #3B2FA0'
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = active ? '0 5px 0 #C94444' : '0 5px 0 #3B2FA0'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = active ? '0 5px 0 #C94444' : '0 5px 0 #3B2FA0'
        }
      }}
    >
      🎙️
    </button>
  )
}
