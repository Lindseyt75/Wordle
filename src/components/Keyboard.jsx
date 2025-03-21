import React from "react";

const Keyboard = ({ onKeyPress, onEnter, keyboardColors }) => {
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
              onClick={() => onKeyPress(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button onClick={() => onKeyPress("Backspace")}>←</button>
        <button onClick={onEnter}>Enter</button>
      </div>
    </div>
  );
};

export default Keyboard;
