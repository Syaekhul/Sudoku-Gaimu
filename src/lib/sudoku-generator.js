import { GRID_SIZE, EMPTY_CELL, DIFFICULTY_SETTINGS } from "../utils/constans";
import { isValid, solveSudoku, hasUniqueSolution } from "./sudoku-solver";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const fillDiagonalBoxes = (board) => {
  for (let box = 0; box < 3; box++) {
    const startRow = box * 3;
    const startCol = box * 3;
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let idx = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[startRow + i][startCol + j] = numbers[idx++];
      }
    }
  }
};

const fillRemaining = (board, row, col) => {
  if (col >= GRID_SIZE) {
    row++;
    col = 0;
  }

  if (row >= GRID_SIZE) {
    return true;
  }

  if (board[row][col] !== EMPTY_CELL) {
    return fillRemaining(board, row, col + 1);
  }

  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let num of numbers) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (fillRemaining(board, row, col + 1)) {
        return true;
      }

      board[row][col] = EMPTY_CELL;
    }
  }

  return false;
};

const generateCompletedBoard = () => {
  const board = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(EMPTY_CELL));

  fillDiagonalBoxes(board);
  fillRemaining(board, 0, 0);

  return board;
};

const removeNumbers = (board, cellsToRemove) => {
  const puzzle = board.map((row) => [...row]);
  let removed = 0;
  const attempts = cellsToRemove * 3;
  let attemptsCount = 0;

  while (removed < cellsToRemove && attemptsCount < attempts) {
    attemptsCount++;

    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);

    if (puzzle[row][col] !== EMPTY_CELL) {
      const backup = puzzle[row][col];
      puzzle[row][col] = EMPTY_CELL;

      const shouldCheckUnique = cellsToRemove > 45;

      if (shouldCheckUnique) {
        const puzzleCopy = puzzle.map((row) => [...row]);
        if (!hasUniqueSolution(puzzleCopy)) {
          puzzle[row][col] = backup;
          continue;
        }
      }

      removed++;
    }
  }

  return puzzle;
};
export const generateSudoku = (difficulty = "medium") => {
  console.log(`Generating ${difficulty} Sudoku puzzle...`);

  const solution = generateCompletedBoard();

  const settings =
    DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

  const puzzle = removeNumbers(solution, settings.cellsToRemove);
  console.log(`Puzzle generated! Removed ${settings.cellsToRemove} cells.`);

  return {
    puzzle: puzzle.map((row) => [...row]),
    solution: solution.map((row) => [...row])
  };
};

export const isValidSudoku = (board) => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const num = board[row][col];
      if (num !== EMPTY_CELL) {
        board[row][col] = EMPTY_CELL;
        if (!isValid(board, row, col, num)) {
          board[row][col] = num;
          return false;
        }
        board[row][col] = num;
      }
    }
  }

  return true;
};
