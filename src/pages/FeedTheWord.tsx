import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getIsland } from '../data/islands'
import { useGame } from '../store/GameContext'
import { speak } from '../services/speech'
import { getEmoji } from '../data/emoji-map'
import WordCard from '../components/ui/WordCard'
import Button from '../components/ui/Button'
import type { Word } from '../types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FeedTheWord() {
  const { islandId, levelId } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useGame()

  const island = getIsland(islandId || '')
  const level = island?.levels.find((l) => l.id === Number(levelId))

  const [sessionWords, setSessionWords] = useState<Word[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [options, setOptions] = useState<Word[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [feedbackWord, setFeedbackWord] = useState<Word | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const allWords = island?.levels.flatMap((l) => l.words) || []

  useEffect(() => {
    if (!level) return
    const session = shuffle(level.words).slice(0, 5)
    setSessionWords(session)
    setCurrentIdx(0)
    setScore(0)
    setShowResult(false)
  }, [level])

  const buildOptions = useCallback((correct: Word) => {
    const others = shuffle(allWords.filter((w) => w.id !== correct.id))
    const distractors = others.slice(0, 2)
    setOptions(shuffle([correct, ...distractors]))
  }, [allWords])

  useEffect(() => {
    if (sessionWords.length > 0 && currentIdx < sessionWords.length) {
      buildOptions(sessionWords[currentIdx])
      setFeedback(null)
      setFeedbackWord(null)
    }
  }, [sessionWords, currentIdx, buildOptions])

  const handleSelect = async (word: Word) => {
    if (feedback) return
    const correct = sessionWords[currentIdx]
    setFeedbackWord(word)
    if (word.id === correct.id) {
      setFeedback('correct')
      dispatch({ type: 'ADD_STAR_FRUITS', amount: 1 })
      setScore((s) => s + 1)
      await speak(correct.word)
    } else {
      setFeedback('wrong')
    }
    setTimeout(() => {
      if (currentIdx + 1 >= sessionWords.length) {
        setShowResult(true)
      } else {
        setCurrentIdx((i) => i + 1)
      }
    }, 1200)
  }

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
        <div style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#333',
          margin: '16px 0',
        }}>
          Đúng {score}/{sessionWords.length}
        </div>
        <div style={{
          fontSize: '20px',
          fontWeight: 800,
          color: '#B85C00',
          marginBottom: '32px',
        }}>
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

  if (sessionWords.length === 0) {
    return <div style={pageStyle}><p style={{ color: '#7B68CC' }}>Đang tải...</p></div>
  }

  const currentWord = sessionWords[currentIdx]

  const getWordState = (word: Word): 'default' | 'correct' | 'wrong' => {
    if (!feedback || !feedbackWord) return 'default'
    if (word.id === currentWord.id && feedback === 'correct') return 'correct'
    if (word.id === feedbackWord.id && feedback === 'wrong') return 'wrong'
    if (word.id === currentWord.id && feedback === 'wrong') return 'correct'
    return 'default'
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
        gap: '12px',
      }}>
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '24px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '72px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '3px solid #E8E0FF',
        }}>
          {getEmoji(currentWord.word)}
        </div>
        <div style={{
          fontSize: '18px',
          color: '#3D2F8F',
          fontWeight: 700,
        }}>
          {currentWord.meaning}
        </div>
        <div style={{ fontSize: '14px', color: '#888', fontWeight: 600 }}>
          {currentWord.phonetic}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '420px',
        margin: '16px 0',
      }}>
        {options.map((opt) => (
          <WordCard
            key={opt.id}
            word={opt.word}
            meaning={opt.meaning}
            state={getWordState(opt)}
            onClick={() => handleSelect(opt)}
            disabled={!!feedback}
          />
        ))}
      </div>

      {feedback === 'correct' && (
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#1A7A3A', marginBottom: '8px' }}>
          ✅ Tuyệt vời!
        </div>
      )}
      {feedback === 'wrong' && (
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#C94444', marginBottom: '8px' }}>
          ❌ Thử lại nhé!
        </div>
      )}

      <Button variant="secondary" onClick={() => navigate('/map')}>
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
