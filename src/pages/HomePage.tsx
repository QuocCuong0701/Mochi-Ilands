import { useNavigate } from 'react-router-dom'
import PhaserGame from '../components/game/PhaserGame'
import { useGame } from '../store/GameContext'
import Button from '../components/ui/Button'
import StarBadge from '../components/ui/StarBadge'

export default function HomePage() {
  const navigate = useNavigate()
  const { mochi } = useGame()

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      background: 'linear-gradient(160deg, #F0EEFF 0%, #FFF7EF 100%)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        width: '100%',
        padding: '18px 20px',
        background: '#F0EEFF',
        borderRadius: '20px',
        border: '2px solid #C5B8FF',
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#FFE0B2',
          border: '3px solid #FFB347',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          boxShadow: '0 4px 0 #E09020',
        }}>
          🐣
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '26px',
            color: '#3D2F8F',
            lineHeight: 1.1,
          }}>
            Mochi Island
          </div>
          <div style={{
            fontSize: '13px',
            color: '#7B68CC',
            fontWeight: 600,
          }}>
            Học tiếng Anh qua game
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <StarBadge count={mochi.starFruits} />
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}>
        <PhaserGame width={200} height={200} />
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '18px',
          color: '#5B4FCF',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>
          {mochi.evolution}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          <span style={{ fontSize: '14px', color: '#7B68CC', fontWeight: 700 }}>
            ❤️ {mochi.happiness}%
          </span>
          <span style={{ fontSize: '14px', color: '#7B68CC', fontWeight: 700 }}>
            🍽️ {100 - mochi.hunger}%
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '280px', marginBottom: '20px' }}>
        <Button variant="primary" onClick={() => navigate('/game/feed-the-word/green-island/1')}>
          🎮 Chơi ngay!
        </Button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" onClick={() => navigate('/map')} style={{ flex: 1 }}>
            🌍 Bản đồ
          </Button>
          <Button variant="secondary" onClick={() => navigate('/feed')} style={{ flex: 1 }}>
            🍎 Cho ăn
          </Button>
        </div>
      </div>
    </div>
  )
}
