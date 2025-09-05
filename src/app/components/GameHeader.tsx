import ProgressBar from "./ProgressBar";
import ScoreDisplay from "./ScoreDisplay";
import Timer from "./Timer";

interface GameHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  totalTime: number;
  showTimer: boolean;
}

export default function GameHeader({
  currentQuestion,
  totalQuestions,
  score,
  maxScore,
  totalTime,
  showTimer = true,
}: GameHeaderProps) {
  const getGridClasses = (): string => {
    if (!showTimer) {
      return "grid grid-cols-2 gap-4 items-center";
    }
    return "grid grid-cols-1 md:grid-cols-3 gap-4 items-center";
  };

  const gridClasses = getGridClasses();

  return (
    <header
      className={"w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4"}
    >
      <div className={gridClasses}>
        {/* Progress Section */}
        <div className="flex flex-col">
          <ProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />
        </div>

        {/* Score Section */}
        <div className="flex justify-center">
          <ScoreDisplay score={score} maxScore={maxScore} />
        </div>

        {/* Timer Section */}
        {showTimer && (
          <div className="flex justify-center md:justify-end">
            <Timer totalTime={totalTime} />
          </div>
        )}
      </div>
    </header>
  );
}
