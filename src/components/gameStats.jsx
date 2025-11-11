import { Clock, AlertCircle, Lightbulb, Award } from "lucide-react";
import useGameStore from "../store/gameStore";
import { formatTime } from "../utils/storage";

const GameStats = () => {
  const {
    mistakes,
    maxMistakes,
    hintsUsed,
    maxHints,
    difficulty,
    timer,
    bestTimes
  } = useGameStore();

  const bestTime = bestTimes[difficulty];

  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          {/* Timer */}
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center justify-center gap-1">
              <Clock size={14} />
              Time
            </div>
            <div className="text-lg font-bold text-indigo-600">
              {formatTime(timer)}
            </div>
            {bestTime && (
              <div className=" text-xs text-gray-400 mt-1">
                Best: {formatTime(bestTime)}
              </div>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Difficulty
            </div>
            <div className="text-lg font-bold text-indigo-600 capitalize">
              {difficulty}
            </div>
          </div>

          {/* Mistakes */}
          <div>
            <div className="text-xs text-gray-500 font-semibold mb-1 flex items-center justify-center gap-1">
              <AlertCircle size={14} />
              Mistakes
            </div>
            <div className="text-lg font-bold">
              <span className={mistakes > 0 ? "text-red-600" : "text-gray-700"}>
                {mistakes}
              </span>
              <span className="text-gray-400">/{maxMistakes}</span>
            </div>
          </div>

          {/* Hints */}
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase mb-1 flex items-center justify-center gap-1">
              <Lightbulb size={14} />
              Hints
            </div>
            <div className="text-lg font-bold">
              <span
                className={
                  hintsUsed >= maxHints ? "text-gray-400" : "text-purple-600"
                }
              >
                {hintsUsed}
              </span>
              <span className="text-gray-400">/{maxHints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
