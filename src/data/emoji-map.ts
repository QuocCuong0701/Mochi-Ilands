// Map từ vựng -> emoji tương ứng để hiển thị trực quan
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

// Trả về emoji cho từ vựng, fallback '✨' nếu không có
export const getEmoji = (word: string): string =>
  emojiMap[word.toLowerCase()] || '✨'
