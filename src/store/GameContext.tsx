import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { MochiState } from '../types'

const initialMochi: MochiState = {
  hunger: 50,
  happiness: 50,
  evolution: 'baby',
  starFruits: 0,
  totalFed: 0,
}

type Action =
  | { type: 'ADD_STAR_FRUITS'; amount: number }
  | { type: 'FEED_MOCHI'; amount: number }
  | { type: 'SET_EVOLUTION'; level: MochiState['evolution'] }
  | { type: 'UPDATE_HUNGER'; value: number }
  | { type: 'UPDATE_HAPPINESS'; value: number }

function mochiReducer(state: MochiState, action: Action): MochiState {
  switch (action.type) {
    case 'ADD_STAR_FRUITS':
      return { ...state, starFruits: state.starFruits + action.amount }
    case 'FEED_MOCHI':
      return {
        ...state,
        starFruits: Math.max(0, state.starFruits - action.amount),
        totalFed: state.totalFed + action.amount,
        hunger: Math.min(100, state.hunger + action.amount * 5),
        happiness: Math.min(100, state.happiness + action.amount * 3),
      }
    case 'SET_EVOLUTION':
      return { ...state, evolution: action.level }
    case 'UPDATE_HUNGER':
      return { ...state, hunger: Math.max(0, Math.min(100, action.value)) }
    case 'UPDATE_HAPPINESS':
      return { ...state, happiness: Math.max(0, Math.min(100, action.value)) }
    default:
      return state
  }
}

interface GameContextType {
  mochi: MochiState
  dispatch: React.Dispatch<Action>
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [mochi, dispatch] = useReducer(mochiReducer, initialMochi)
  return (
    <GameContext.Provider value={{ mochi, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
