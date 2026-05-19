const emojiMap: Record<string, string> = {
  cat: '🐱', dog: '🐶', fish: '🐟', bird: '🐦',
  rabbit: '🐰', duck: '🦆', frog: '🐸', turtle: '🐢',
  cow: '🐄', pig: '🐷', horse: '🐴', sheep: '🐑',
  hen: '🐔', chick: '🐤', goat: '🐐', donkey: '🫏',
  lion: '🦁', elephant: '🐘', monkey: '🐒', bear: '🐻',
  tiger: '🐯', zebra: '🦓', giraffe: '🦒', hippo: '🦛',
  apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇',
  mango: '🥭', watermelon: '🍉', strawberry: '🍓', coconut: '🥥',
  milk: '🥛', juice: '🧃', water: '💧', cake: '🎂',
  cookie: '🍪', candy: '🍬', 'ice cream': '🍦', chocolate: '🍫',
  rice: '🍚', bread: '🍞', egg: '🥚', soup: '🍜',
  noodle: '🍜', pizza: '🍕', burger: '🍔', sandwich: '🥪',
}

export function getEmoji(word: string): string {
  return emojiMap[word.toLowerCase()] || '✨'
}
