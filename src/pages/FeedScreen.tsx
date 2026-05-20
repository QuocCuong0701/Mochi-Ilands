import { useState, useCallback } from 'react'
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
  const canFeed = mochi.starFruits >= amount && amount > 0

  // Xử lý cho Mochi ăn — được memo để pass xuống Button
  const handleFeed = useCallback(() => {
    if (!canFeed) return
    dispatch({ type: 'FEED_MOCHI', amount })
    setFed(true)
    setTimeout(() => setFed(false), 2000)
  }, [canFeed, amount, dispatch])

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
      {/* Tiêu đề */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: '24px',
        color: '#3D2F8F',
        marginBottom: '20px',
      }}>
        🍎 Cho Mochi ăn
      </div>

      {/* Số sao hiện có */}
      <div style={{ marginBottom: '12px' }}>
        <StarBadge count={mochi.starFruits} />
      </div>

      <PhaserGame width={160} height={160} />

      {/* Chỉ số hunger / happiness */}
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

      {/* Bộ chọn số lượng + nút cho ăn */}
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
            disabled={mochi.starFruits === 0 || amount <= 1}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              fontSize: '24px',
              fontWeight: 700,
              background: '#fff',
              color: mochi.starFruits === 0 ? '#ccc' : '#5B4FCF',
              border: `3px solid ${mochi.starFruits === 0 ? '#eee' : '#C5B8FF'}`,
              cursor: mochi.starFruits === 0 ? 'default' : 'pointer',
              opacity: mochi.starFruits === 0 ? 0.5 : 1,
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
            disabled={mochi.starFruits === 0 || amount >= 5}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              fontSize: '24px',
              fontWeight: 700,
              background: '#fff',
              color: mochi.starFruits === 0 ? '#ccc' : '#5B4FCF',
              border: `3px solid ${mochi.starFruits === 0 ? '#eee' : '#C5B8FF'}`,
              cursor: mochi.starFruits === 0 ? 'default' : 'pointer',
              opacity: mochi.starFruits === 0 ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
        </div>

        {/* Cảnh báo hết sao */}
        {mochi.starFruits === 0 && (
          <div style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#C94444',
            textAlign: 'center',
          }}>
            😅 Hết Star Fruit rồi! Chơi game để kiếm thêm nhé.
          </div>
        )}
        <Button
          variant="primary"
          onClick={handleFeed}
          disabled={!canFeed}
        >
          {fed ? '😋 Mochi đang ăn...' : `🍴 Cho ăn (${amount} ⭐)`}
        </Button>
      </div>

      {/* Nút về nhà */}
      <Button variant="secondary" onClick={() => navigate('/')}>
        ← Về nhà
      </Button>
    </div>
  )
}
