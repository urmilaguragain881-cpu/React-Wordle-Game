import Tile from "./Tile";

function Row({ guess, currentGuess }) {

  // Submitted guess
  if (guess) {
    return (
      <div className="row">
        {guess.word.split("").map((letter, index) => (
          <Tile
            key={index}
            letter={letter}
            status={guess.result[index]}
          />
        ))}
      </div>
    );
  }

  // Current typing row
  if (currentGuess !== null) {
    const letters = currentGuess.split("");

    return (
      <div className="row">
        {Array.from({ length: 5 }).map((_, index) => (
          <Tile
            key={index}
            letter={letters[index] || ""}
          />
        ))}
      </div>
    );
  }

  // Empty future row
  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Tile key={index} letter="" />
      ))}
    </div>
  );
}

export default Row;
