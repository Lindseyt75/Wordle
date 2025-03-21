import React from "react";

const Keyboard = ({ handleKeyPress, handleEnter, keyboardColors }) => {
  const qwertyRows = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
  ];

  return (
    <div id="keyboard">
      {qwertyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              style={{ backgroundColor: keyboardColors[letter] || "#ccc" }}
              onClick={() => handleKeyPress(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button onClick={() => handleKeyPress("Backspace")}>←</button>
        <button onClick={handleEnter}>Enter</button>
      </div>
    </div>
  );
};

export default Keyboard;
