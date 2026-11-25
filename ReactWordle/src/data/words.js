export const WORDS = [
  "apple",
  "brave",
  "crane",
  "dream",
  "earth",
  "flame",
  "grape",
  "house",
  "lemon",
  "music",
  "plant",
  "smile",
  "water",
  "zebra"
];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);

  return WORDS[randomIndex].toUpperCase();
}
