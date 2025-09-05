interface OptionButtonProps {
  text: string;
  index: number;
  correctAnswer: number;
  selectedAnswer: number | null;
  onClick: (index: number) => void;
}

type ButtonState = "default" | "correct" | "incorrect" | "disabled";

export default function OptionButton({
  text,
  index,
  correctAnswer,
  selectedAnswer,
  onClick,
}: OptionButtonProps) {
  const getButtonState = (): ButtonState => {
    if (selectedAnswer === null) return "default";
    if (selectedAnswer === index) {
      return index === correctAnswer ? "correct" : "incorrect";
    }
    return "disabled";
  };

  const getButtonClasses = (state: ButtonState): string => {
    const baseClasses =
      "w-full p-4 rounded-lg border-2 font-medium transition-all duration-200 text-left";

    switch (state) {
      case "default":
        return `${baseClasses} bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 cursor-pointer`;
      case "correct":
        return `${baseClasses} bg-green-50 border-green-500 text-green-700`;
      case "incorrect":
        return `${baseClasses} bg-red-50 border-red-500 text-red-700`;
      case "disabled":
        return `${baseClasses} bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed`;
    }
  };

  const handleClick = () => {
    if (selectedAnswer === null) {
      onClick(index);
    }
  };

  const getOptionLetter = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  const currentState = getButtonState();
  const classes = getButtonClasses(currentState);

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={currentState === "disabled"}
      aria-pressed={selectedAnswer === index}
      aria-label={`Opción ${getOptionLetter(index)}: ${text}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-xs font-bold">
          {getOptionLetter(index)}
        </span>
        <span className="flex-1">{text}</span>
      </div>
    </button>
  );
}
