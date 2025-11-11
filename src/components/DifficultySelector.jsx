import { useState } from "react";
import { Check } from "lucide-react";
import useGameStore from "../store/gameStore";
import { DIFFICULTY, DIFFICULTY_SETTINGS } from "../utils/constans";
import clsx from "clsx";

const DifficultySelector = ({ onStartGame }) => {
  const { difficulty, setDifficulty } = useGameStore();
  const [selectedDifficulty, setSelectedDiffulty] = useState(difficulty);

  const handleSelect = (diff) => {
    setSelectedDiffulty(diff);
    setDifficulty(diff);
  };

  const handleStart = () => {
    onStartGame(selectedDifficulty);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Choose Difficulty
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Select your challenge level
      </p>

      <div className="space-y-3 mb-6">
        {Object.values(DIFFICULTY).map((diff) => {
          const settings = DIFFICULTY_SETTINGS[diff];
          const isSelected = selectedDifficulty === diff;

          return (
            <button
              key={diff}
              onClick={() => handleSelect(diff)}
              className={clsx(
                "w-full p-4 rounded-lg border-2 transition-all text-left",
                "hover:border-indigo-400 hover:shadow-md",
                {
                  "border-indigo-600 bg-indigo-50": isSelected,
                  "border-gray-200 bg-white": !isSelected
                }
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={clsx("text-kg font-bold", {
                        "text-indigo-900": isSelected,
                        "text-gray-800": !isSelected
                      })}
                    >
                      {" "}
                      {settings.label}
                    </h3>
                    {isSelected && (
                      <Check className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {settings.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {81 - settings.cellsToRemove} cells filled
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleStart}
        className=" w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
      >
        Start Game
      </button>
    </div>
  );
};

export default DifficultySelector;
