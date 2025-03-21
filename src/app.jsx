import React, { useState } from 'react';
import Wordle, { GREEN, YELLOW, GRAY } from './classes/Wordle.js';
import wordList from './words/fiveLetterWords.js';
import Keyboard from './components/Keyboard.jsx';

// Get a random word from the list
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

const WordleGame = () => {
  const [wordleWord] = useState(getRandomWord());
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [board, setBoard] = useState(Array(6).fill(Array(5).fill("")));
  const [keyboardColors, setKeyboardColors] = useState({});

  const maxAttempts = 6;

  const handleKeyPress = (letter) => {
    if (currentGuess.length < 5 && letter !== "Backspace") {
      setCurrentGuess((prevGuess) => prevGuess + letter);
    } else if (letter === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  };

  const handleEnter = () => {
    if (currentGuess.length !== 5) return;

    if (!wordList.includes(currentGuess.toLowerCase())) {
      setMessage("Invalid word! Try again.");
      return;
    }

    const wordle = new Wordle(wordleWord);
    const result = wordle.checkWord(currentGuess.toLowerCase());

    // Update the board with the results
    const newBoard = [...board];
    newBoard[attempts] = result.map((color) => {
      if (color === GREEN) return "green";
      if (color === YELLOW) return "yellow";
      return "gray"; // GRAY for incorrect letters
    });
    setBoard(newBoard);

    // Update the keyboard colors
    setKeyboardColors((prevColors) => {
      const newColors = { ...prevColors };
      currentGuess.split("").forEach((letter, i) => {
        if (result[i] === GREEN) {
          newColors[letter] = "green";
        } else if (result[i] === YELLOW) {
          newColors[letter] = "yellow";
        } else if (result[i] === GRAY) {
          newColors[letter] = "gray"; // GRAY for incorrect letters
        }
      });
      return newColors;
    });

    // Handle win or game over
    if (currentGuess === wordleWord) {
      setMessage("You Win!");
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts + 1 === maxAttempts) {
        setMessage(`Game Over! The word was: ${wordleWord}`);
      }
    }

    setCurrentGuess("");
  };

  return (
    <div id="game">
      <div id="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={j}
                className="cell"
                style={{ backgroundColor: cell }}
              >
                {currentGuess[j] && cell !== "gray" ? currentGuess[j] : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Keyboard
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        keyboardColors={keyboardColors}
      />

      <div id="message">{message}</div>
    </div>
  );
};

export default WordleGame;