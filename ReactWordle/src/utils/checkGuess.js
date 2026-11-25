export function checkGuess(guess, solutionWord) {
  const result = Array(5).fill("absent");
  const letterCounts = {};

  // Count letters in the solution word
  for (const letter of solutionWord) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // First pass: Check correct letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solutionWord[i]) {
      result[i] = "correct";
      letterCounts[guess[i]]--;
    }
  }

  // Second pass: Check present letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") {
      continue;
    }

    const letter = guess[i];

    if (letterCounts[letter] > 0) {
      result[i] = "present";
      letterCounts[letter]--;
    }
  }

  return result;
}
