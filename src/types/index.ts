// Một từ vựng trong game
export interface Word {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  imageHint: string;
}

// Một level chứa danh sách từ
export interface Level {
  id: number;
  name: string;
  words: Word[];
}

// Một hòn đảo chứa nhiều level
export interface Island {
  id: string;
  name: string;
  theme: string;
  icon: string;
  order: number;
  levels: Level[];
}

// State của Mochi — được persist qua Preferences
export interface MochiState {
  hunger: number;
  happiness: number;
  evolution: 'baby' | 'child' | 'teen' | 'adult';
  starFruits: number;
  totalFed: number;
  lastActiveAt: number;
}

// Các màn hình game
export type GameScreen = 'home' | 'map' | 'feed-the-word' | 'say-it' | 'feed';
