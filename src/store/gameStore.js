import { create } from "zustand";
import { GRID_SIZE, EMPTY_CELL } from "../utils/constans";
import { generateSudoku } from "../lib/sudoku-generator";
import {
  saveGameState,
  loadGameState,
  clearGameState,
  saveBestTimes,
  loadBestTimes,
  saveStatistics,
  loadStatistics
} from "../utils/storage";

const useGameStore = create((set, get) => ({
  puzzle: Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(EMPTY_CELL)),
  solution: Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(EMPTY_CELL)),
  userInput: Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(EMPTY_CELL)),
  selectedCell: null,
  difficulty: "medium",
  gameStatus: "idle",
  mistakes: 0,
  maxMistakes: 3,
  hintsUsed: 0,
  maxHints: 3,

  // Timer state
  timer: 0,
  isPaused: false,

  // Bes times & statistics
  bestTimes: loadBestTimes(),
  statistics: loadStatistics(),

  setSelectedCell: (cell) => set({ selectedCell: cell }),

  setUserInput: (row, col, value) =>
    set((state) => {
      const newInput = state.userInput.map((r) => [...r]);
      newInput[row][col] = value;
      return { userInput: newInput };
    }),

  setPuzzle: (puzzle, solution) =>
    set({
      puzzle,
      solution,
      userInput: puzzle.map((row) => [...row]),
      gameStatus: "playing",
      mistakes: 0,
      hintsUsed: 0,
      selectedCell: null,
      timer: 0,
      isPaused: false
    }),

  setDifficulty: (difficulty) => set({ difficulty }),

  // Timer actions
  setTimer: (time) => set({ timer: time }),

  pauseTimer: () => set({ isPaused: true }),

  resumeTimer: () => set({ isPaused: false }),

  resetTimer: () => set({ timer: 0, isPaused: false }),

  incrementMistake: () => {
    const state = get();
    const newMistakes = state.mistakes + 1;

    set({ mistakes: newMistakes });

    if (newMistakes >= state.maxMistakes) {
      console.log("Game Over!");
      set({ gameStatus: "gameover" });

      // Updatae statistics
      get().updateStatisticsOnLoss();

      // Clear saved game state
      clearGameState();
    }
  },

  resetGame: () =>
    set((state) => ({
      userInput: state.puzzle.map((row) => [...row]),
      mistakes: 0,
      hintsUsed: 0,
      selectedCell: null,
      gameStatus: "playing",
      timer: 0,
      isPaused: false
    })),

  newGame: (difficulty) => {
    const state = get();
    const selectedDifficulty = difficulty || state.difficulty;

    console.log(`Starting new ${selectedDifficulty} game...`);

    // Clear saved game state
    clearGameState();

    // Generate new puzzle
    const { puzzle, solution } = generateSudoku(selectedDifficulty);

    set({
      puzzle,
      solution,
      userInput: puzzle.map((row) => [...row]),
      mistakes: 0,
      hintsUsed: 0,
      selectedCell: null,
      gameStatus: "playing",
      timer: 0,
      isPaused: false
    });

    // Save initial
    get().saveGame();
  },

  giveHint: () => {
    const state = get();

    if (state.hintsUsed >= state.maxHints) {
      alert("No more hints available!");
      return;
    }

    if (state.selectedCell) {
      const [row, col] = state.selectedCell;
      if (
        state.puzzle[row][col] === EMPTY_CELL &&
        state.userInput[row][col] === EMPTY_CELL
      ) {
        const correctValue = state.solution[row][col];
        const newInput = state.userInput.map((r) => [...r]);
        newInput[row][col] = correctValue;

        set({
          userInput: newInput,
          hintsUsed: state.hintsUsed + 1
        });

        setTimeout(() => get().checkWin(), 100);
        return;
      }
    }

    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (
          state.puzzle[i][j] === EMPTY_CELL &&
          state.userInput[i][j] === EMPTY_CELL
        ) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length === 0) {
      alert("No Empty cells to give hints!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];
    const correctValue = state.solution[row][col];

    const newInput = state.userInput.map((r) => [...r]);
    newInput[row][col] = correctValue;

    set({
      userInput: newInput,
      hintsUsed: state.hintsUsed + 1,
      selectedCell: [row, col]
    });

    setTimeout(() => get().checkWin(), 100);
  },

  pauseGame: () => set({ gameStatus: "paused", isPaused: true }),

  resumeGame: () => set({ gameStatus: "playing", isPaused: false }),

  checkWin: () => {
    const { userInput, solution, gameStatus } = get();

    if (gameStatus === "completed") return true;

    let isComplete = true;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (userInput[i][j] !== solution[i][j]) {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) break;
    }

    if (isComplete) {
      console.log("Puzzle Solved!");
      set({ gameStatus: "completed" });

      // Update best times and statistics
      get().updateBestTime();
      get().updateStatisticsOnWin();

      // Clear saved game state
      clearGameState();

      return true;
    }
    return false;
  },

  // Save game to localStorage
  saveGame: () => {
    const state = get();

    if (state.gameStatus !== "playing") return;

    const gameState = {
      puzzle: state.puzzle,
      solution: state.solution,
      userInput: state.userInput,
      difficulty: state.difficulty,
      mistakes: state.mistakes,
      hintsUsed: state.hintsUsed,
      timer: state.timer,
      timestamp: Date.now()
    };

    saveGameState(gameState);
  },

  // Load game from localStorage
  loadGame: () => {
    const savedState = loadGameState();

    if (!savedState) return false;

    const hoursSinceLastSave =
      (Date.now() - savedState.timestamp) / (1000 * 60 * 60);
    if (hoursSinceLastSave > 24) {
      clearGameState();
      return false;
    }

    set({
      puzzle: savedState.puzzle,
      solution: savedState.solution,
      userInput: savedState.userInput,
      difficulty: savedState.difficulty,
      mistakes: savedState.mistakes,
      hintsUsed: savedState.hintsUsed,
      timer: savedState.timer,
      gameStatus: "playing",
      isPaused: false,
      selectedCell: null
    });

    return true;
  },

  // Update best time
  updateBestTime: () => {
    const state = get();
    const currentTime = state.timer;
    const difficulty = state.difficulty;
    const bestTimes = { ...state.bestTimes };

    if (!bestTimes[difficulty] || currentTime < bestTimes[difficulty]) {
      bestTimes[difficulty] = currentTime;
      set({ bestTimes });
      saveBestTimes(bestTimes);
      console.log(`New best time for ${difficulty}: ${currentTime} seconds`);
    }
  },

  // Update statistics
  updateStatisticsOnWin: () => {
    const state = get();
    const stats = { ...state.statistics };
    const difficulty = state.difficulty;

    stats.gamesPlayed++;
    stats.gamesWon++;
    stats.totalTime += state.timer;
    stats.byDifficulty[difficulty].played++;
    stats.byDifficulty[difficulty].won++;

    set({ statistics: stats });
    saveStatistics(stats);
  },

  // Update statistics on loss
  updateStatisticsOnLoss: () => {
    const state = get();
    const stats = { ...state.statistics };
    const difficulty = state.difficulty;

    stats.gamesPlayed++;
    stats.gamesLost++;
    stats.totalTime += state.timer;
    stats.byDifficulty[difficulty].played++;
    stats.byDifficulty[difficulty].lost++;

    set({ statistics: stats });
    saveStatistics(stats);
  }
}));

export default useGameStore;
