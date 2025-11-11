import { useEffect, useState } from "react";
import useGameStore from "./store/gameStore";
import Board from "./components/Board";
import NumberPad from "./components/NumberPad";
import GameStats from "./components/gameStats";
import DifficultySelector from "./components/DifficultySelector";
import InstallPrompt from "./components/InstallPrompt";
import OfflineIndicator from "./components/OfflineIndicator";
import useTimer from "./hooks/useTimer";
import { Trophy, XCircle, Target, Play } from "lucide-react";
import { formatTime } from "./utils/storage";
import UpdateNotification from "./components/UpdateNotification";

function App() {
  const {
    gameStatus,
    newGame,
    mistakes,
    hintsUsed,
    difficulty,
    timer,
    setTimer,
    isPaused,
    saveGame
  } = useGameStore();

  const [showDifficultySelector, setShowDifficultySelector] = useState(true);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Timer hook
  const {
    seconds,
    reset: resetTimerHook,
    setTime
  } = useTimer(gameStatus === "playing", isPaused);

  // Sync timer
  useEffect(() => {
    setTimer(seconds);
  }, [seconds, setTimer]);

  // Check for saved game
  useEffect(() => {
    if (!initialLoadDone) {
      // Call loadGame directly from store without dependency
      const loaded = useGameStore.getState().loadGame();
      if (loaded) {
        setHasSavedGame(true);
        setShowDifficultySelector(false);
        setTime(useGameStore.getState().timer);
      }
      setInitialLoadDone(true);
    }
  }, [initialLoadDone, setTime]);

  // Auto save for every 5 seconds
  useEffect(() => {
    if (gameStatus === "playing") {
      const interval = setInterval(() => {
        saveGame();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [gameStatus, saveGame]);

  // Save on unmount
  useEffect(() => {
    return () => {
      if (gameStatus === "playing") {
        saveGame();
      }
    };
  }, [gameStatus, saveGame]);

  const handleStartGame = (selectedDifficulty) => {
    setShowDifficultySelector(false);
    setHasSavedGame(false);
    newGame(selectedDifficulty);
    resetTimerHook();
  };

  const handleNewGame = () => {
    setShowDifficultySelector(true);
    setHasSavedGame(false);
    resetTimerHook();
  };

  const handlePlayAgain = () => {
    newGame(difficulty);
    resetTimerHook();
  };

  const handleContinue = () => {
    setShowDifficultySelector(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-300 flex items-center justify-center p-4">
      <InstallPrompt />
      <OfflineIndicator />
      <UpdateNotification />

      <div className="max-w-2xl w-full">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Sudoku Gaimu
          </h1>
          <p className="text-gray-600">
            Play anytime, anywhere - even offline!
          </p>
        </header>

        <main className="bg-white rounded-2xl shadow-2xl p-4 md:p-8">
          {showDifficultySelector ? (
            <div>
              <DifficultySelector onStartGame={handleStartGame} />

              {/* Continue saved game button */}
              {hasSavedGame && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleContinue}
                    className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all font-semibold inline-flex items-center gap-2"
                  >
                    <Play size={20} />
                    Continue Game
                  </button>
                </div>
              )}
            </div>
          ) : gameStatus === "idle" ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading game....</p>
            </div>
          ) : gameStatus === "gameover" ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <XCircle className="w-24 h-24 text-red-600 mx-auto mb-4" />
                <p className="text-4xl font-bold text-red-700 mb-2">
                  Game Over! Haha Nub
                </p>
                <p className="text-xl text-gray-600 mb-4">
                  Too many Mistakes! IQ-1
                </p>
                <p className="text-lg text-gray-500">
                  Time: <span className="font-bold">{formatTime(timer)}</span>
                </p>
              </div>

              <div className=" bg-gray-50 rounded-lg p-6 mb-6 max-w-sm mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Game Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Target size={18} />
                      Difficulty
                    </span>
                    <span className=" font-bold text-gray-900 capitalize">
                      {difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Target size={18} />
                      Mistakes
                    </span>
                    <span className="font-bold text-red-700">{mistakes}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700">
                      <Trophy size={18} />
                      Hints Used
                    </span>
                    <span className="font-black text-gray-900">
                      {hintsUsed}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-800 transition-all font-semibold"
                >
                  Same Difficulty
                </button>
                <button
                  onClick={handleNewGame}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
                >
                  Change Difficulty
                </button>
              </div>
            </div>
          ) : gameStatus === "completed" ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                <p className="text-4xl font-bold text-green-600 mb-2">
                  Congratulations! 🎉
                </p>
                <p className="text-xl text-gray-600 mb-4">
                  You solved the puzzle!
                </p>
                <p className="text-lg text-gray-500">Your IQ+1 🧠</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatTime(timer)}
                </p>
                {useGameStore.getState().bestTimes[difficulty] === timer && (
                  <p className="text-sm text-green-600 mt-2 font-semibold">
                    🏆 New Best Time!
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-sm mx-auto">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Game Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Target size={18} />
                      Difficulty
                    </span>
                    <span className="font-bold text-gray-900 capitalize">
                      {difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Target size={18} />
                      Mistakes
                    </span>
                    <span className="font-bold text-gray-900">{mistakes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-600">
                      <Trophy size={18} />
                      Hints Used
                    </span>
                    <span className="font-bold text-gray-900">{hintsUsed}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-semibold"
                >
                  Same Difficulty
                </button>
                <button
                  onClick={handleNewGame}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all font-semibold"
                >
                  Change Difficulty
                </button>
              </div>
            </div>
          ) : (
            <>
              <GameStats />
              <Board />
              <NumberPad onNewGame={handleNewGame} />
            </>
          )}
        </main>

        <footer className="text-center mt-6 text-sm text-gray-500">
          Built with React + Vite + TailwindCSS
        </footer>
      </div>
    </div>
  );
}

export default App;
