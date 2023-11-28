const board = document.getElementById("board");
const cells = board.getElementsByTagName("td");
const message = document.getElementById("message");
const toggleModeButton = document.getElementById("toggle-mode");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

resetButton.addEventListener("click", resetGame);

toggleModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  board.classList.toggle("dark-mode");
  toggleModeButton.classList.toggle("dark-mode");
  resetButton.classList.toggle("dark-mode");
});

board.addEventListener("click", (event) => {
  if (gameOver) {
    return;
  }

  if (event.target.classList.contains("cell") && !event.target.textContent) {
    event.target.textContent = currentPlayer;

    for (const combination of winningCombinations) {
      if (
        cells[combination[0]].textContent === currentPlayer &&
        cells[combination[1]].textContent === currentPlayer &&
        cells[combination[2]].textContent === currentPlayer
      ) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
      }
    }

    if (Array.from(cells).every((cell) => cell.textContent)) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
});

function resetGame() {
  for (const cell of cells) {
    cell.textContent = "";
  }

  message.textContent = "";
  currentPlayer = "X";
  gameOver = false;
}
