import Row from "./Row";

function Board({ pastGuesses, currentGuess }) {

  return (
    <div className="board">

      {Array.from({ length: 6 }).map((_, index) => {

        const guess = pastGuesses[index] || null;

        const activeRow = index === pastGuesses.length;

        return (
          <Row
            key={index}
            guess={guess}
            currentGuess={
              activeRow ? currentGuess : null
            }
          />
        );

      })}

    </div>
  );
}
export default Board;
