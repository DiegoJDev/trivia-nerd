interface TimerProps {
  totalTime: number;
}

export default function Timer({ totalTime }: TimerProps) {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formattedTime = formatTime(totalTime);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs text-gray-500 uppercase tracking-wide">
        Tiempo
      </div>

      <div
        className={`text-lg font-mono font-bold transition-all duration-300 text-blue-500`}
      >
        {formattedTime}
      </div>
    </div>
  );
}
