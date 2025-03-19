import { Wordle, GREEN, YELLOW, BLACK } from './classes/Wordle.js';

// Import the list of valid words
const wordList = require('./words/fiveLetterWords.js');

// Get a random word for the game
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// Game state
let wordleWord = getRandomWord();
let currentGuess = '';
let attempts = 0;
const maxAttempts = 6;

const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');

// Initialize game board
for (let i = 0; i < maxAttempts; i++) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < 5; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.appendChild(cell);
  }
  board.appendChild(row);
}

// Initialize keyboard
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
alphabet.split('').forEach(letter => {
  const button = document.createElement('button');
  button.textContent = letter;
  button.addEventListener('click', () => handleKeyPress(letter));
  keyboard.appendChild(button);
});

const backspaceButton = document.createElement('button');
backspaceButton.textContent = '←';
backspaceButton.addEventListener('click', () => handleKeyPress('Backspace'));
keyboard.appendChild(backspaceButton);

const enterButton = document.createElement('button');
enterButton.textContent = 'Enter';
enterButton.addEventListener('click', handleEnter);
keyboard.appendChild(enterButton);

// Handle key press
function handleKeyPress(letter) {
  if (currentGuess.length < 5 && letter !== 'Backspace') {
    currentGuess += letter;
    updateBoard();
  } else if (letter === 'Backspace') {
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
  }
}

// Update the board with the current guess
function updateBoard() {
  const currentRow = board.children[attempts];
  for (let i = 0; i < 5; i++) {
    const cell = currentRow.children[i];
    cell.textContent = currentGuess[i] || '';
  }
}

// Update the keyboard colors based on the guess results
function updateKeyboardColors(result) {
  const keys = keyboard.querySelectorAll('button');
  result.forEach((color, index) => {
    const letter = currentGuess[index].toUpperCase();
    const button = Array.from(keys).find(btn => btn.textContent === letter);

    if (button) {
      if (color === GREEN) {
        button.style.backgroundColor = 'green';
      } else if (color === YELLOW) {
        button.style.backgroundColor = 'yellow';
      } else if (color === BLACK) {
        button.style.backgroundColor = 'gray';
      }
    }
  });
}

// Handle enter key (submit guess)
function handleEnter() {
  if (currentGuess.length !== 5) return;

  if (!wordList.includes(currentGuess.toLowerCase())) {
    message.textContent = "Invalid word! Try again.";
    message.style.color = 'red';
    return;
  }

  const wordle = new Wordle(wordleWord);
  const result = wordle.checkWord(currentGuess.toLowerCase());

  // Update the board colors
  const currentRow = board.children[attempts];
  for (let i = 0; i < 5; i++) {
    const cell = currentRow.children[i];
    const color = result[i] === GREEN ? 'green' : result[i] === YELLOW ? 'yellow' : 'black';
    cell.style.backgroundColor = color;
  }

  // Update the keyboard key colors
  updateKeyboardColors(result);

  // Game Over / Win condition
  if (currentGuess === wordleWord) {
    message.textContent = 'You Win!';
    message.style.color = 'green';
  } else {
    attempts++;
    if (attempts === maxAttempts) {
      message.textContent = `Game Over! The word was: ${wordleWord}`;
      message.style.color = 'red';
    }
  }

  currentGuess = '';
  if (attempts < maxAttempts) {
    updateBoard();
  }
}
