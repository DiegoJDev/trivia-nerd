interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  showText?: boolean;
}

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
  showText = true,
}: ProgressBarProps) {
  const getProgressColor = (): string => {
    const percentage = (currentQuestion / totalQuestions) * 100;
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPercentage = (): number => {
    if (totalQuestions === 0) return 0;
    return (currentQuestion / totalQuestions) * 100;
  };

  const percentage = getPercentage();
  const progressColor = getProgressColor();

  return (
    <div className="flex flex-col gap-1">
      {showText && (
        <div className="text-sm font-medium text-gray-600">
          {currentQuestion} de {totalQuestions}
        </div>
      )}

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${progressColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {showText && (
        <div className="text-xs text-gray-500 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
