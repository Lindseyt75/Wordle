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
  const [wordleWord, setWordleWord] = useState(getRandomWord());
  const [currentGuess, setCurrentGuess] = useState("");  // Track the current guess
  const [attempts, setAttempts] = useState(0);  // Track the number of attempts
  const [board, setBoard] = useState(Array(6).fill(Array(5).fill('')));  // Board to hold guesses
  const [resultBoard, setResultBoard] = useState(Array(6).fill(Array(5).fill('')));  // Board to hold results
  const [keyboardColors, setKeyboardColors] = useState({});  // Track keyboard colors
  const [message, setMessage] = useState("");  // Message for win/loss

  const maxAttempts = 6;

  // Handle key presses for input
  const handleKeyPress = (letter) => {
    if (currentGuess.length < 5 && letter !== "Backspace") {
      setCurrentGuess((prevGuess) => prevGuess + letter); // Add letter to guess
    } else if (letter === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));  // Remove last letter
    }
  };

  // Handle the Enter key to submit guess
  const handleEnter = () => {
    if (currentGuess.length !== 5) return;  // Ignore if guess isn't 5 letters long

    // Validate word
    if (!wordList.includes(currentGuess.toLowerCase())) {
      setMessage("Invalid word! Try again.");
      return;
    }

    const wordle = new Wordle(wordleWord);
    const result = wordle.checkWord(currentGuess.toLowerCase());

    // Update the board with the results
    const newBoard = [...board];
    newBoard[attempts] = currentGuess.split('');
    setBoard(newBoard);

    const newResultBoard = [...resultBoard];
    newResultBoard[attempts] = result;
    setResultBoard(newResultBoard);

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

    setCurrentGuess("");  // Reset current guess for the next attempt
  };

  // Handle reset button click
  const handleReset = () => {
    setWordleWord(getRandomWord());
    setCurrentGuess("");
    setAttempts(0);
    setBoard(Array(6).fill(Array(5).fill('')));
    setResultBoard(Array(6).fill(Array(5).fill('')));
    setKeyboardColors({});
    setMessage("");
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
                style={{
                  backgroundColor: resultBoard[i] && resultBoard[i][j] === GREEN ? '#6aaa64' : 
                  resultBoard[i] && resultBoard[i][j] === YELLOW ? '#c9b458' : 
                  resultBoard[i] && resultBoard[i][j] === GRAY ? '#787c7e' : "#ddd"
                }}
              >
                {i === attempts ? currentGuess[j] : board[i][j]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Keyboard
        handleKeyPress={handleKeyPress}
        handleEnter={handleEnter}
        keyboardColors={keyboardColors}
      />

      <div id="message">{message}</div>
      <button id="reset-button" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default WordleGame;
