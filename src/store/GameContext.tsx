import { createContext, useContext, useReducer, useEffect, useRef, type ReactNode } from 'react'
import { Preferences } from '@capacitor/preferences'
import type { MochiState } from '../types'

const STORAGE_KEY = 'mochi_state'
const DECAY_MS = 120_000 // 2 phút giảm 1 điểm

const initialMochi: MochiState = {
  hunger: 50,
  happiness: 50,
  evolution: 'baby',
  starFruits: 0,
  totalFed: 0,
  lastActiveAt: Date.now(),
}

type Action =
  | { type: 'HYDRATE'; state: MochiState }
  | { type: 'ADD_STAR_FRUITS'; amount: number }
  | { type: 'FEED_MOCHI'; amount: number }
  | { type: 'SET_EVOLUTION'; level: MochiState['evolution'] }
  | { type: 'UPDATE_HUNGER'; value: number }
  | { type: 'UPDATE_HAPPINESS'; value: number }
  | { type: 'DECAY' }

// Tính decay dựa trên thời gian trôi qua kể từ lần tương tác cuối
const applyDecay = (state: MochiState, now: number): MochiState => {
  const elapsed = now - state.lastActiveAt
  if (elapsed < DECAY_MS) return state
  const ticks = Math.floor(elapsed / DECAY_MS)
  return {
    ...state,
    hunger: Math.max(0, state.hunger - ticks),
    happiness: Math.max(0, state.happiness - ticks),
    lastActiveAt: state.lastActiveAt + ticks * DECAY_MS,
  }
}

// Reducer xử lý tất cả action thay đổi state game
const mochiReducer = (state: MochiState, action: Action): MochiState => {
  switch (action.type) {
    case 'HYDRATE': {
      const now = Date.now()
      const safe = { ...action.state, lastActiveAt: action.state.lastActiveAt || now }
      return { ...applyDecay(safe, now), lastActiveAt: now }
    }
    case 'ADD_STAR_FRUITS':
      return { ...state, starFruits: state.starFruits + action.amount, lastActiveAt: Date.now() }
    case 'FEED_MOCHI':
      return {
        ...state,
        starFruits: Math.max(0, state.starFruits - action.amount),
        totalFed: state.totalFed + action.amount,
        hunger: Math.min(100, state.hunger + action.amount * 5),
        happiness: Math.min(100, state.happiness + action.amount * 3),
        lastActiveAt: Date.now(),
      }
    case 'SET_EVOLUTION':
      return { ...state, evolution: action.level, lastActiveAt: Date.now() }
    case 'UPDATE_HUNGER':
      return { ...state, hunger: Math.max(0, Math.min(100, action.value)), lastActiveAt: Date.now() }
    case 'UPDATE_HAPPINESS':
      return { ...state, happiness: Math.max(0, Math.min(100, action.value)), lastActiveAt: Date.now() }
    case 'DECAY':
      return applyDecay(state, Date.now())
    default:
      return state
  }
}

interface GameContextType {
  mochi: MochiState
  dispatch: React.Dispatch<Action>
}

const GameContext = createContext<GameContextType | null>(null)

// Provider bọc toàn bộ app, load/save state + chạy decay interval
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [mochi, dispatch] = useReducer(mochiReducer, initialMochi)
  const loaded = useRef(false)

  useEffect(() => {
    async function load() {
      const { value } = await Preferences.get({ key: STORAGE_KEY })
      if (value) {
        dispatch({ type: 'HYDRATE', state: JSON.parse(value) as MochiState })
      }
    }
    load()

    const interval = setInterval(() => {
      dispatch({ type: 'DECAY' })
    }, DECAY_MS)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      return
    }
    Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(mochi) })
  }, [mochi])

  return (
    <GameContext.Provider value={{ mochi, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// Hook để component con truy cập game state bất kỳ đâu trong tree
export const useGame = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
