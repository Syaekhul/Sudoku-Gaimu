export const GRID_SIZE = 9;
export const BOX_SIZE = 3;
export const EMPTY_CELL = 0;

export const DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
  EXPERT: "expert"
};

export const DIFFICULTY_SETTINGS = {
  [DIFFICULTY.EASY]: {
    cellsToRemove: 35,
    label: "Easy",
    description: "Perfect for Beginner"
  },
  [DIFFICULTY.MEDIUM]: {
    cellsToRemove: 45,
    label: "Medium",
    description: "A bit challenging"
  },
  [DIFFICULTY.HARD]: {
    cellsToRemove: 52,
    label: "Hard",
    description: "Quite difficult"
  },
  [DIFFICULTY.EXPERT]: {
    cellsToRemove: 60,
    label: "Expert",
    description: "For the masters"
  }
};
