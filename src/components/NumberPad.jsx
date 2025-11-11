import { Play, RotateCcw, Lightbulb } from "lucide-react";
import useGameStore from "../store/gameStore";
import clsx from "clsx";

const NumberPad = ({ onNewGame }) => {
  const {
    selectedCell,
    setUserInput,
    puzzle,
    userInput,
    gameStatus,
    newGame,
    difficulty,
    giveHint,
    hintsUsed,
    maxHints
  } = useGameStore();

  const handleNumberClick = (num) => {
    if (gameStatus === "gameover" || gameStatus === "completed") return;
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    if (puzzle[row][col] !== 0) return;

    setUserInput(row, col, num);
  };

  const handleClear = () => {
    if (gameStatus === "gameover" || gameStatus === "completed") return;
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    if (puzzle[row][col] !== 0) return;

    setUserInput(row, col, 0);
  };

  const getNumberCount = (num) => {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (userInput[i][j] === num) {
          count++;
        }
      }
    }
    return count;
  };

  const isInitialCellSelected =
    selectedCell && puzzle[selectedCell[0]][selectedCell[1]] !== 0;

  const handleNewGame = () => {
    if (
      confirm(
        "Start a new game? Current Progres will lost. You can choose a new difficulty."
      )
    ) {
      onNewGame();
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Generate a new puzzle with the same difficulty? Current progress will be lost."
      )
    ) {
      newGame(difficulty);
    }
  };

  const handleHint = () => {
    giveHint();
  };

  const isGameEnded = gameStatus === "gameover" || gameStatus === "completed";

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      {/* Info text jika initial cell dipilih */}
      {isInitialCellSelected && (
        <div className="mb-3 text-center text-sm text-orange-600 font-medium bg-orange-50 py-2 px-4 rounded-lg">
          ⚠️ This is a given number and cannot be changed
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const count = getNumberCount(num);
          const isComplete = count >= 9;

          return (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={
                !selectedCell ||
                isComplete ||
                isInitialCellSelected ||
                isGameEnded
              }
              className={clsx(
                "aspect-square rounded-lg text-xl font-bold transition-all",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500",
                {
                  "bg-indigo-600 text-white hover:bg-indigo-700":
                    !isComplete && !isInitialCellSelected && !isGameEnded,
                  "bg-gray-300 text-gray-500 cursor-not-allowed":
                    isComplete || isInitialCellSelected || isGameEnded,
                  "opacity-50": !selectedCell
                }
              )}
            >
              <div>{num}</div>
              {count > 0 && <div className="text-xs opacity-75">{count}/9</div>}
            </button>
          );
        })}

        {/* Clear Button */}
        <button
          onClick={handleClear}
          disabled={!selectedCell || isInitialCellSelected || isGameEnded}
          className={clsx(
            "aspect-square rounded-lg text-xl font-bold transition-all",
            "bg-red-500 text-white hover:bg-red-600",
            "focus:outline-none focus:ring-2 focus:ring-red-500",
            {
              "opacity-50 cursor-not-allowed":
                !selectedCell || isInitialCellSelected || isGameEnded
            }
          )}
        >
          x
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handleNewGame}
          disabled={isGameEnded}
          className={clsx(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all",
            "focus:outline-none focus:ring-2 focus:ring-green-500",
            {
              "bg-green-500 text-white hover:bg-green-600": !isGameEnded,
              "bg-gray-300 text-gray-500 cursor-not-allowed": isGameEnded
            }
          )}
        >
          <Play size={20} />
          <span className="font-semibold">New</span>
        </button>

        <button
          onClick={handleReset}
          disabled={isGameEnded}
          className={clsx(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all",
            "focus:outline-none focus:ring-2 focus:ring-orange-500",
            {
              "bg-orange-500 text-white hover:bg-orange-600": !isGameEnded,
              "bg-gray-300 text-gray-500 cursor-not-allowed": isGameEnded
            }
          )}
        >
          <RotateCcw size={20} />
          <span className="font-semibold">Reset</span>
        </button>

        <button
          onClick={handleHint}
          disabled={hintsUsed >= maxHints || isGameEnded}
          className={clsx(
            "flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all",
            "focus:outline-none focus:ring-2 focus:ring-purple-500",
            {
              "bg-purple-500 text-white hover:bg-purple-600":
                hintsUsed < maxHints && !isGameEnded,
              "bg-gray-300 text-gray-500 cursor-not-allowed":
                hintsUsed >= maxHints || isGameEnded
            }
          )}
        >
          <Lightbulb size={20} />
          <span className="font-semibold">
            Hint {hintsUsed}/{maxHints}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
