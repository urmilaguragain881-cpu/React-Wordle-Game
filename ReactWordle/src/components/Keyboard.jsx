const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
];

function Keyboard({ usedKeys, onKeyPress }) {

  return (
    <div className="keyboard">

      {keyboardRows.map((row, rowIndex) => (

        <div className="keyboard-row" key={rowIndex}>

          {row.map((key) => {

            const status = usedKeys[key];

            return (
              <button
                key={key}
                className={`key ${status || ""} ${
                  key === "Enter" || key === "Backspace"
                    ? "large"
                    : ""
                }`}
                onClick={() => onKeyPress(key)}
              >
                {key === "Backspace" ? "⌫" : key}
              </button>
            );

          })}

        </div>

      ))}

    </div>
  );
}

export default Keyboard;
