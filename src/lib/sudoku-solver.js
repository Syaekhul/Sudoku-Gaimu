import { GRID_SIZE, EMPTY_CELL } from "../utils/constans";

export const isValid = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < GRID_SIZE; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < GRID_SIZE; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }

  return true;
};

const findEmptyCell = (board) => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === EMPTY_CELL) {
        return [row, col];
      }
    }
  }

  return null;
};

export const solveSudoku = (board) => {
  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    return true; // Puzzle solved
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return true;
      }

      board[row][col] = EMPTY_CELL; // Backtrack
    }
  }

  return false; // Trigger backtracking
};

export const hasUniqueSolution = (board) => {
  const boardCopy = board.map((row) => [...row]);
  let solutionCount = 0;

  const countSolutions = (b) => {
    if (solutionCount > 1) return; // Early exit if more than one solution found

    const emptyCell = findEmptyCell(b);

    if (!emptyCell) {
      solutionCount++;
      return;
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(b, row, col, num)) {
        b[row][col] = num;
        countSolutions(b);
        b[row][col] = EMPTY_CELL; // Backtrack
      }
    }
  };

  countSolutions(boardCopy);
  return solutionCount === 1;
};
