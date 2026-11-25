import { useState, useCallback } from "react";
import { checkGuess } from "../utils/checkGuess";
import { getRandomWord } from "../data/words";

export function useWordle() {

  // Select a random hidden word
  const [solutionWord, setSolutionWord] = useState(
    () => getRandomWord()
  );

  // Store the letters currently being typed
  const [currentGuess, setCurrentGuess] = useState("");

  // Store all previous guesses
  const [pastGuesses, setPastGuesses] = useState([]);

  // Track game status
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  // Store keyboard letter colors
  const [usedKeys, setUsedKeys] = useState({});

  // Handle keyboard input
  const handleKeyup = useCallback((key) => {

    if (gameStatus !== "IN_PROGRESS") return;

    
    // Handle Backspace
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // Handle Enter
    if (key === "Enter") {

      if (currentGuess.length !== 5) return;

      const result = checkGuess(currentGuess, solutionWord);

      const newGuess = {
        word: currentGuess,
        result: result
      };

      setPastGuesses((prev) => [...prev, newGuess]);

      // Update keyboard colors
      setUsedKeys((prev) => {
        const updatedKeys = { ...prev };

        result.forEach((status, index) => {
          const letter = currentGuess[index];

          const priority = {
            absent: 1,
            present: 2,
            correct: 3
          };

          if (
            !updatedKeys[letter] ||
            priority[status] > priority[updatedKeys[letter]]
          ) {
            updatedKeys[letter] = status;
          }
        });

        return updatedKeys;
      });

      // Check winning condition
      if (currentGuess === solutionWord) {
        setGameStatus("WON");
      }

      // Check losing condition
      else if (pastGuesses.length === 5) {
        setGameStatus("LOST");
      }

      setCurrentGuess("");
      return;
    }

    // Accept only alphabetical letters
    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key.toUpperCase());
    }

  }, [currentGuess, solutionWord, pastGuesses, gameStatus]);

  // Restart the game
  const restartGame = () => {
    setSolutionWord(getRandomWord());
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setUsedKeys({});
  };

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    usedKeys,
    handleKeyup,
    restartGame
  };
}
