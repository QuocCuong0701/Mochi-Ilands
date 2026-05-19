import vocabulary from './vocabulary.json'
import type { Island } from '../types'

export const islands: Island[] = vocabulary.islands.map((island, idx) => ({
  ...island,
  order: idx,
}))

export function getIsland(id: string): Island | undefined {
  return islands.find((i) => i.id === id)
}

export function getWordById(islandId: string, wordId: number) {
  const island = getIsland(islandId)
  if (!island) return undefined
  for (const level of island.levels) {
    const word = level.words.find((w) => w.id === wordId)
    if (word) return { ...word, levelId: level.id }
  }
  return undefined
}
