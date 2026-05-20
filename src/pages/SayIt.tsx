import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getIsland } from '../data/islands'
import { useGame } from '../store/GameContext'
import { speak, startListening } from '../services/speech'
import { similarity } from '../utils/stringSimilarity'
import Button from '../components/ui/Button'
import MicButton from '../components/ui/MicButton'
import type { Word } from '../types'

// Xáo trộn mảng (Fisher-Yates)
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SayIt() {
  const { islandId, levelId } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useGame()

  const island = getIsland(islandId || '')
  const level = island?.levels.find((l) => l.id === Number(levelId))

  const [sessionWords, setSessionWords] = useState<Word[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [listening, setListening] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Khởi tạo session khi level thay đổi
  useEffect(() => {
    if (!level) return
    const session = shuffle(level.words).slice(0, 5)
    setSessionWords(session)
    setCurrentIdx(0)
    setScore(0)
    setShowResult(false)
  }, [level])

  const currentWord = sessionWords[currentIdx]

  // Xử lý bấm mic — được memo để pass xuống MicButton
  const handleListen = useCallback(async () => {
    if (!currentWord || listening) return
    setListening(true)
    setFeedback(null)
    try {
      await speak(currentWord.word)
      const transcript = await startListening()
      const sim = similarity(transcript.trim(), currentWord.word)
      if (sim > 0.5) {
        setFeedback('correct')
        dispatch({ type: 'ADD_STAR_FRUITS', amount: 1 })
        setScore((s) => s + 1)
      } else {
        setFeedback('wrong')
      }
    } catch {
      setFeedback('wrong')
    }
    setListening(false)
    setTimeout(() => {
      if (currentIdx + 1 >= sessionWords.length) {
        setShowResult(true)
      } else {
        setCurrentIdx((i) => i + 1)
      }
    }, 1500)
  }, [currentWord, listening, dispatch, currentIdx, sessionWords.length])

  if (!island || !level) {
    return (
      <div style={pageStyle}>
        <p style={{ color: '#7B68CC' }}>Không tìm thấy level này.</p>
        <Button variant="secondary" onClick={() => navigate('/map')}>← Quay lại</Button>
      </div>
    )
  }

  if (showResult) {
    return (
      <div style={pageStyle}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '28px',
          color: '#3D2F8F',
          marginTop: '40px',
        }}>
          🎉 Hoàn thành!
        </div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: '#333', margin: '16px 0' }}>
          Đúng {score}/{sessionWords.length}
        </div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#B85C00', marginBottom: '32px' }}>
          ⭐ +{score} Star Fruit!
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" onClick={() => navigate('/')}>← Về nhà</Button>
          <Button variant="primary" onClick={() => {
            setShowResult(false)
            const session = shuffle(level.words).slice(0, 5)
            setSessionWords(session)
            setCurrentIdx(0)
            setScore(0)
          }}>
            🔄 Chơi lại
          </Button>
        </div>
      </div>
    )
  }

  if (!currentWord) {
    return <div style={pageStyle}><p style={{ color: '#7B68CC' }}>Đang tải...</p></div>
  }

  return (
    <div style={pageStyle}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'var(--font-heading)',
        fontSize: '18px',
        color: '#5B4FCF',
        fontWeight: 700,
        marginBottom: '12px',
      }}>
        <span style={{
          background: '#EDE9FF',
          borderRadius: '50px',
          padding: '4px 14px',
          border: '2px solid #C5B8FF',
        }}>
          {currentIdx + 1} / {sessionWords.length}
        </span>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}>
        <div style={{ fontSize: '16px', color: '#7B68CC', fontWeight: 700 }}>
          Mochi nói:
        </div>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '48px',
          fontWeight: 800,
          color: '#3D2F8F',
          letterSpacing: '4px',
          textAlign: 'center',
        }}>
          {currentWord.word}
        </div>
        <div style={{ fontSize: '18px', color: '#7B68CC', fontWeight: 600 }}>
          {currentWord.meaning}
        </div>
        <div style={{ fontSize: '14px', color: '#888', fontWeight: 600 }}>
          {currentWord.phonetic}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <MicButton
          active={listening}
          onClick={handleListen}
          disabled={listening}
        />
        {listening && (
          <div style={{ fontSize: '14px', color: '#5B4FCF', fontWeight: 700 }}>
            🎤 Đang nghe...
          </div>
        )}
        {!listening && !feedback && (
          <div style={{ fontSize: '14px', color: '#888', fontWeight: 600 }}>
            Nhấn mic để nói
          </div>
        )}
        {feedback === 'correct' && (
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#1A7A3A' }}>
            ✅ Tuyệt vời!
          </div>
        )}
        {feedback === 'wrong' && (
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#C94444' }}>
            ❌ Gần đúng rồi, thử lại!
          </div>
        )}
      </div>

      <Button variant="secondary" onClick={() => navigate('/')}>
        ← Thoát
      </Button>
    </div>
  )
}

const pageStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  background: 'linear-gradient(160deg, #F0EEFF 0%, #FFF7EF 100%)',
  fontFamily: 'var(--font-body)',
}
