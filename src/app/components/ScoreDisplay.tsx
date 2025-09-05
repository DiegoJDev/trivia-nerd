interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  showLabel?: boolean;
}

export default function ScoreDisplay({
  score,
  maxScore,
  showLabel = true,
}: ScoreDisplayProps) {
  const getPercentage = (): number => {
    if (maxScore === 0) return 0;
    return Math.round((score / maxScore) * 100);
  };

  const getScoreColor = (): string => {
    const percentage = getPercentage();
    if (percentage < 30) return "text-red-500";
    if (percentage < 70) return "text-yellow-500";
    return "text-green-500";
  };

  const percentage = getPercentage();
  const scoreColor = getScoreColor();

  return (
    <div className="flex flex-col items-center gap-1">
      {showLabel && (
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Puntuación
        </div>
      )}

      <div className={`text-lg font-bold ${scoreColor}`}>{percentage}/100</div>
    </div>
  );
}
