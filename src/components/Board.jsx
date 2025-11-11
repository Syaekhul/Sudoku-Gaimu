import { useCallback } from "react";
import useGameStore from "../store/gameStore";
import Cell from "./Cell";
import { GRID_SIZE, EMPTY_CELL } from "../utils/constans";

const Board = () => {
  const {
    puzzle,
    solution,
    userInput,
    selectedCell,
    gameStatus,
    setSelectedCell,
    setUserInput,
    checkWin,
    incrementMistake
  } = useGameStore();

  // Helper Function
  const isSameRowColBox = useCallback(
    (row, col) => {
      if (!selectedCell) return false;
      const [selectedRow, selectedCol] = selectedCell;
      // Check same row or column
      if (row === selectedRow || col === selectedCol) return true;

      // Check 3x3 Board
      const boxRowStart = Math.floor(selectedRow / 3) * 3;
      const boxColStart = Math.floor(selectedCol / 3) * 3;

      const cellBoxRowStart = Math.floor(row / 3) * 3;
      const cellBoxColStart = Math.floor(col / 3) * 3;

      return boxRowStart === cellBoxRowStart && boxColStart === cellBoxColStart;
    },
    [selectedCell]
  );

  // Helper Function check if same number
  const isSameNumber = useCallback(
    (row, col) => {
      if (!selectedCell) return false;
      const [selRow, selCol] = selectedCell;

      const selectedValue = userInput[selRow][selCol];
      const currentValue = userInput[row][col];

      if (selectedValue === EMPTY_CELL || currentValue === EMPTY_CELL)
        return false;

      if (row === selRow && col === selCol) return false;

      return selectedValue === currentValue;
    },
    [selectedCell, userInput]
  );

  // Handle cell click
  const HandleCellClick = useCallback(
    (row, col) => {
      setSelectedCell([row, col]);
    },
    [setSelectedCell]
  );

  // Handle Input
  const handleInput = useCallback(
    (row, col, value) => {
      if (gameStatus === "gameover" || gameStatus === "completed") return;

      if (puzzle[row][col] !== EMPTY_CELL) return;

      const previousValue = userInput[row][col];

      setUserInput(row, col, value);

      // Check if game is won
      if (value !== EMPTY_CELL && solution[row][col] !== value) {
        if (previousValue === EMPTY_CELL || previousValue !== value) {
          incrementMistake();
        }
      }

      if (value !== EMPTY_CELL) {
        setTimeout(() => checkWin(), 100);
      }
    },
    [puzzle, solution, userInput, setUserInput, checkWin, incrementMistake]
  );

  // Check if cell error
  const hasError = useCallback(
    (row, col, value) => {
      if (value === EMPTY_CELL) return false;
      if (puzzle[row][col] !== EMPTY_CELL) return false;
      return solution[row][col] !== value;
    },
    [solution, puzzle]
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Board Grid */}
      <div
        className="grid grid-cols-9 bg-gray-800 gap-0 border-4 border-gray-800 rounded-lg overflow-hidden shadow-xl"
        style={{ aspectRatio: "1/1" }}
      >
        {Array.from({ length: GRID_SIZE }, (_, row) =>
          Array.from({ length: GRID_SIZE }, (_, col) => {
            const value = userInput[row][col];
            const isInitial = puzzle[row][col] !== EMPTY_CELL;
            const isSelected =
              selectedCell?.[0] === row && selectedCell?.[1] === col;
            const isError = hasError(row, col, value);
            const inSameRowColBox = isSameRowColBox(row, col);
            const hasSameNumber = isSameNumber(row, col);

            return (
              <Cell
                key={`${row}-${col}`}
                value={value}
                row={row}
                col={col}
                isSelected={isSelected}
                isInitial={isInitial}
                isError={isError}
                isSameNumber={hasSameNumber}
                isSameRowColBox={inSameRowColBox}
                onClick={HandleCellClick}
                onInput={handleInput}
              />
            );
          })
        )}
      </div>

      {/* Helper Text */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Click a cell and type a number (1-9) or press Backspace to clear</p>
      </div>
    </div>
  );
};

export default Board;
