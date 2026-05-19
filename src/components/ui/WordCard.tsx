import { getEmoji } from '../../data/emoji-map'

interface Props {
  word: string
  meaning: string
  state?: 'default' | 'correct' | 'wrong'
  onClick?: () => void
  disabled?: boolean
}

export default function WordCard({ word, meaning, state = 'default', onClick, disabled }: Props) {
  const borderColor =
    state === 'correct' ? '#5BC97A' :
    state === 'wrong' ? '#FF6B6B' : '#E8E0FF'
  const shadowColor =
    state === 'correct' ? '#33A055' :
    state === 'wrong' ? '#C94444' : '#C5B8FF'
  const wordColor =
    state === 'correct' ? '#1A7A3A' :
    state === 'wrong' ? '#C94444' : '#3D2F8F'
  const feedbackText =
    state === 'correct' ? '✓ Đúng rồi!' :
    state === 'wrong' ? '✗ Thử lại' : meaning

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '18px',
        border: `3px solid ${borderColor}`,
        boxShadow: `0 4px 0 ${shadowColor}`,
        textAlign: 'center',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'transform 0.15s',
        position: 'relative',
        fontFamily: 'var(--font-body)',
        width: '100%',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
    >
      <span style={{ fontSize: '36px', display: 'block', marginBottom: '6px' }}>
        {getEmoji(word)}
      </span>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '16px',
        color: wordColor,
      }}>
        {word}
      </div>
      <div style={{
        fontSize: '12px',
        color: state === 'correct' ? '#5BC97A' : state === 'wrong' ? '#FF6B6B' : '#888',
        fontWeight: 600,
        marginTop: '2px',
      }}>
        {feedbackText}
      </div>
    </button>
  )
}
