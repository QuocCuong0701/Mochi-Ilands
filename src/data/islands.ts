import vocabulary from './vocabulary.json'
import type { Island } from '../types'

// Danh sách đảo được parse từ vocabulary.json, gán thứ tự
export const islands: Island[] = vocabulary.islands.map((island, idx) => ({
  ...island,
  order: idx,
}))

// Tìm đảo theo id
export const getIsland = (id: string): Island | undefined =>
  islands.find((i) => i.id === id)

// Tìm từ vựng theo islandId + wordId, kèm levelId
export const getWordById = (islandId: string, wordId: number) => {
  const island = getIsland(islandId)
  if (!island) return undefined
  for (const level of island.levels) {
    const word = level.words.find((w) => w.id === wordId)
    if (word) return { ...word, levelId: level.id }
  }
  return undefined
}
