import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhaserGame from '../components/game/PhaserGame'
import { useGame } from '../store/GameContext'
import Button from '../components/ui/Button'
import StarBadge from '../components/ui/StarBadge'

export default function FeedScreen() {
  const navigate = useNavigate()
  const { mochi, dispatch } = useGame()
  const [amount, setAmount] = useState(1)
  const [fed, setFed] = useState(false)

  const handleFeed = () => {
    if (mochi.starFruits < amount) return
    dispatch({ type: 'FEED_MOCHI', amount })
    setFed(true)
    setTimeout(() => setFed(false), 2000)
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      background: 'linear-gradient(160deg, #F0EEFF 0%, #FFF7EF 100%)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: '24px',
        color: '#3D2F8F',
        marginBottom: '20px',
      }}>
        🍎 Cho Mochi ăn
      </div>

      <div style={{ marginBottom: '12px' }}>
        <StarBadge count={mochi.starFruits} />
      </div>

      <PhaserGame width={160} height={160} />

      <div style={{
        display: 'flex',
        gap: '20px',
        margin: '16px 0',
        fontSize: '14px',
        color: '#7B68CC',
        fontWeight: 700,
      }}>
        <span>🍽️ Đói: {100 - mochi.hunger}%</span>
        <span>❤️ Hạnh phúc: {mochi.happiness}%</span>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setAmount(Math.max(1, amount - 1))}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              fontSize: '24px',
              fontWeight: 700,
              background: '#fff',
              color: '#5B4FCF',
              border: '3px solid #C5B8FF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </button>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '36px',
            fontWeight: 800,
            color: '#FF8C42',
            minWidth: '50px',
            textAlign: 'center',
          }}>
            {amount}
          </span>
          <button
            onClick={() => setAmount(Math.min(5, amount + 1))}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              fontSize: '24px',
              fontWeight: 700,
              background: '#fff',
              color: '#5B4FCF',
              border: '3px solid #C5B8FF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
        </div>

        <Button
          variant="primary"
          onClick={handleFeed}
          disabled={mochi.starFruits < amount}
        >
          {fed ? '😋 Mochi đang ăn...' : `🍴 Cho ăn (${amount} ⭐)`}
        </Button>
      </div>

      <Button variant="secondary" onClick={() => navigate('/')}>
        ← Về nhà
      </Button>
    </div>
  )
}
