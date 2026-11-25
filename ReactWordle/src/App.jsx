import { useEffect } from "react";
import { useWordle } from "./hooks/useWordle";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import "./App.css";

function App() {

  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    usedKeys,
    handleKeyup,
    restartGame
  } = useWordle();

  // Physical keyboard input
  useEffect(() => {

    const handleKeyDown = (event) => {
      handleKeyup(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [handleKeyup]);

  return (
    <div className="app">

      <h1>WORDLE</h1>

      <p className="subtitle">
        Guess the hidden five-letter word!
      </p>

      <Board
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
      />

      {gameStatus !== "IN_PROGRESS" && (

        <div className="game-message">

          <h2>
            {gameStatus === "WON"
              ? "Congratulations! You Won!"
              : "Game Over!"}
          </h2>

          <p>
            The correct word was: <strong>{solutionWord}</strong>
          </p>

          <button onClick={restartGame}>
            Play Again
          </button>

        </div>

      )}

      <Keyboard
        usedKeys={usedKeys}
        onKeyPress={handleKeyup}
      />

    </div>
  );
}

export default App;
