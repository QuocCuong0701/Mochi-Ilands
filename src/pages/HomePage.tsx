import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PhaserGame from '../components/game/PhaserGame'
import type { PhaserGameHandle } from '../components/game/PhaserGame'
import ProgressBar from '../components/ui/ProgressBar'
import { useGame } from '../store/GameContext'
import Button from '../components/ui/Button'
import StarBadge from '../components/ui/StarBadge'

// Emoji và nhãn hiển thị theo giai đoạn tiến hóa
const evolutionEmoji: Record<string, string> = {
  baby: '🐣', child: '🐥', teen: '🦆', adult: '🦢',
}
const evolutionLabel: Record<string, string> = {
  baby: 'Sơ sinh', child: 'Bé bỏng', teen: 'Thiếu niên', adult: 'Trưởng thành',
}

export default function HomePage() {
  const navigate = useNavigate()
  const { mochi } = useGame()
  const phaserRef = useRef<PhaserGameHandle>(null)

  // Đồng bộ evolution lên Phaser scene
  useEffect(() => {
    phaserRef.current?.setEvolution(mochi.evolution)
  }, [mochi.evolution])

  // Tự động chạy animation dựa trên trạng thái
  useEffect(() => {
    if (mochi.hunger < 20 || mochi.happiness < 20) {
      phaserRef.current?.play('sad')
    } else if (mochi.hunger > 80 && mochi.happiness > 80) {
      phaserRef.current?.play('dance')
    } else {
      phaserRef.current?.play('happy')
    }
  }, [mochi.hunger, mochi.happiness])

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      background: 'linear-gradient(160deg, #F0EEFF 0%, #FFF7EF 100%)',
    }}>
      {/* Header: logo + tên + Star Badge */}
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
          {evolutionEmoji[mochi.evolution]}
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

      {/* Khu vực Mochi: Phaser canvas + tên giai đoạn */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
      }}>
        <PhaserGame ref={phaserRef} width={200} height={200} />
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '16px',
          color: '#5B4FCF',
          letterSpacing: '1px',
        }}>
          {evolutionLabel[mochi.evolution]}
        </div>
      </div>

      {/* Thanh trạng thái HUD */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: '100%',
        maxWidth: '320px',
        margin: '0 auto 16px',
      }}>
        <ProgressBar label="❤️ Hạnh phúc" percent={mochi.happiness} />
        <ProgressBar label="🍽️ Đói bụng" percent={100 - mochi.hunger} />
        <ProgressBar label="⭐ Sao" percent={Math.min(100, (mochi.starFruits / 50) * 100)} />
      </div>

      {/* Các nút hành động chính */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '280px',
        margin: '0 auto 20px',
      }}>
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
