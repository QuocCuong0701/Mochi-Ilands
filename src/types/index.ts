export interface Word {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  imageHint: string;
}

export interface Level {
  id: number;
  name: string;
  words: Word[];
}

export interface Island {
  id: string;
  name: string;
  theme: string;
  icon: string;
  order: number;
  levels: Level[];
}

export interface MochiState {
  hunger: number;
  happiness: number;
  evolution: 'baby' | 'child' | 'teen' | 'adult';
  starFruits: number;
  totalFed: number;
}

export type GameScreen = 'home' | 'map' | 'feed-the-word' | 'say-it' | 'feed';
