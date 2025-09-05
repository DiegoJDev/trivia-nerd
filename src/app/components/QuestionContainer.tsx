import Question from "./Question";
import OptionsList from "./OptionsList";

interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionContainerProps {
  questionData: QuestionData;
  questionNumber?: number;
  category?: string;
  onAnswerSelect: (index: number) => void;
  selectedAnswer: number | null;
}

export default function QuestionContainer({
  questionData,
  questionNumber,
  category,
  onAnswerSelect,
  selectedAnswer,
}: QuestionContainerProps) {
  return (
    <div className={"bg-white rounded-lg shadow-sm p-6"}>
      <div className={"space-y-6"}>
        {/* Component Question */}
        <Question
          question={questionData.question}
          questionNumber={questionNumber}
          category={category || ""}
        />

        {/* Component OptionsList */}
        <OptionsList
          options={questionData.options}
          correctAnswer={questionData.correctAnswer}
          selectedAnswer={selectedAnswer}
          onOptionSelect={onAnswerSelect}
        />
      </div>
    </div>
  );
}
