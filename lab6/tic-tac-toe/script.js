let turn = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };
let aiEnabled = true;

const grid = document.getElementById("grid");

// ฟังก์ชันการเริ่มเกมใหม่
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  grid.querySelectorAll("div").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

// ฟังก์ชันตรวจสอบผู้ชนะ
function checkWinner() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      scores[gameBoard[a]]++;  // เพิ่มคะแนนให้กับผู้ชนะ
      alert(gameBoard[a] + " wins!");
      showScores();  // อัปเดตคะแนนที่แสดงบนหน้าเว็บ
      resetGame();  // รีเซ็ตเกมหลังจากผู้ชนะ
      return;
    }
  }

  if (!gameBoard.includes("")) {
    alert("It's a draw!");
    resetGame();
  }
}

// ฟังก์ชันที่ทำให้สามารถเล่นเกมได้
grid.addEventListener("click", (e) => {
  const index = Array.from(grid.children).indexOf(e.target);
  if (gameBoard[index] === "") {
    gameBoard[index] = turn;
    e.target.textContent = turn;
    e.target.classList.add(turn.toLowerCase());
    checkWinner();
    turn = turn === "X" ? "O" : "X";
    if (turn === "O" && aiEnabled) {
      aiMove();
    }
  }
});

// ฟังก์ชันแสดงคะแนน
function showScores() {
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `X: ${scores.X} | O: ${scores.O}`;
}

// ฟังก์ชันการเคลื่อนไหวของ AI
function aiMove() {
  if (!aiEnabled) return;
  const emptyCells = Array.from(document.querySelectorAll('#grid div')).filter(cell => cell.textContent === '');
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    gameBoard[Array.from(grid.children).indexOf(randomCell)] = 'O';
    randomCell.classList.add('o');
    checkWinner();
    turn = 'X';
  }
}