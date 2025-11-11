const STORAGE_KEYS = {
  GAME_STATE: "sudoku_game_state",
  BEST_TIME: "sudoku_best_time",
  STATISTICS: "sudoku_statistics"
};

export const saveGameState = (gameState) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
  } catch (error) {
    console.error("Error saving game state:", error);
    return false;
  }
};

export const loadGameState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error loading game state:", error);
    return null;
  }
};

export const clearGameState = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
    return true;
  } catch (error) {
    console.error("Error clearing game state:", error);
    return false;
  }
};

export const saveBestTimes = (bestTimes) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BEST_TIME, JSON.stringify(bestTimes));
    return true;
  } catch (error) {
    console.error("Error saving best times:", error);
    return false;
  }
};

export const loadBestTimes = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BEST_TIME);
    return saved
      ? JSON.parse(saved)
      : {
          easy: null,
          medium: null,
          hard: null,
          expert: null
        };
  } catch (error) {
    console.error("Error loading best times:", error);
    return {
      easy: null,
      medium: null,
      hard: null,
      expert: null
    };
  }
};

export const saveStatistics = (stats) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
    return true;
  } catch (error) {
    console.error("Error saving statistics:", error);
    return false;
  }
};

export const loadStatistics = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    return saved
      ? JSON.parse(saved)
      : {
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          totalTime: 0,
          byDifficulty: {
            easy: { played: 0, won: 0, lost: 0 },
            medium: { played: 0, won: 0, lost: 0 },
            hard: { played: 0, won: 0, lost: 0 },
            expert: { played: 0, won: 0, lost: 0 }
          }
        };
  } catch (error) {
    console.error("Error loading statistics:", error);
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      totalTime: 0,
      byDifficulty: {
        easy: { played: 0, won: 0, lost: 0 },
        medium: { played: 0, won: 0, lost: 0 },
        hard: { played: 0, won: 0, lost: 0 },
        expert: { played: 0, won: 0, lost: 0 }
      }
    };
  }
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
