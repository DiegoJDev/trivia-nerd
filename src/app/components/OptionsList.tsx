import OptionButton from "./OptionButton";

interface OptionsListProps {
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  onOptionSelect: (index: number) => void;
  isDisabled?: boolean;
}

export default function OptionsList({
  options,
  correctAnswer,
  selectedAnswer,
  onOptionSelect,
  isDisabled = false,
}: OptionsListProps) {
  const handleOptionClick = (index: number) => {
    if (!isDisabled && selectedAnswer === null) {
      onOptionSelect(index);
    }
  };
  return (
    <div className={"w-full space-y-3"}>
      {options.map((option, index) => (
        <OptionButton
          key={index}
          text={option}
          index={index}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
          onClick={handleOptionClick}
        />
      ))}
    </div>
  );
}
