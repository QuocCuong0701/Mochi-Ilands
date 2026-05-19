import { useNavigate } from 'react-router-dom'
import { islands } from '../data/islands'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'

export default function IslandMap() {
  const navigate = useNavigate()

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      background: 'linear-gradient(160deg, #F0EEFF 0%, #FFF7EF 100%)',
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: '28px',
        color: '#3D2F8F',
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        🗺️ Bản đồ đảo
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        flex: 1,
        overflow: 'auto',
        paddingBottom: '16px',
      }}>
        {islands.map((island, idx) => {
          const unlocked = idx === 0
          return (
            <button
              key={island.id}
              onClick={() => unlocked && navigate(`/game/feed-the-word/${island.id}/1`)}
              style={{
                borderRadius: '22px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: `3px solid ${unlocked ? '#5DCAA5' : '#DDD'}`,
                cursor: unlocked ? 'pointer' : 'default',
                transition: 'transform 0.15s',
                position: 'relative',
                background: unlocked ? '#F0FFFE' : '#F5F5F5',
                opacity: unlocked ? 1 : 0.6,
                width: '100%',
                fontFamily: 'var(--font-body)',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => { if (unlocked) e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
            >
              <span style={{ fontSize: '42px' }}>{island.icon}</span>
              <div>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '16px',
                  color: unlocked ? '#1A5C40' : '#888',
                  display: 'block',
                }}>
                  {island.name}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: unlocked ? '#6B9E87' : '#AAA',
                  fontWeight: 600,
                }}>
                  {island.theme} · {island.levels.length * 8} từ
                </span>
              </div>
              {idx === 0 && (
                <div style={{
                  marginLeft: 'auto',
                  background: '#5BC97A',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '50px',
                }}>
                  Đang học
                </div>
              )}
              {idx === 1 && (
                <div style={{
                  marginLeft: 'auto',
                  background: '#FFB347',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '50px',
                }}>
                  Mới!
                </div>
              )}
              {!unlocked && idx > 1 && (
                <span style={{ fontSize: '18px', position: 'absolute', top: '12px', right: '14px' }}>🔒</span>
              )}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          padding: '14px 18px',
          background: '#F0EEFF',
          borderRadius: '16px',
          border: '2px solid #C5B8FF',
        }}>
          <ProgressBar label="Level 1" percent={80} stars={3} />
          <div style={{ height: '8px' }} />
          <ProgressBar label="Level 2" percent={40} stars={2} />
          <div style={{ height: '8px' }} />
          <ProgressBar label="Level 3" percent={0} locked />
        </div>
        <Button variant="secondary" onClick={() => navigate('/')}>
          ← Về nhà
        </Button>
      </div>
    </div>
  )
}
