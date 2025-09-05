import NavigationButton from "./NavigationButton";

interface GameFooterProps {
  currentQuestion: number;
  totalQuestions: number;
  canGoBack: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function GameFooter({
  currentQuestion,
  totalQuestions,
  canGoBack,
  canGoNext,
  onPrevious,
  onNext,
}: GameFooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <NavigationButton
            direction="previous"
            onClick={onPrevious}
            disabled={!canGoBack}
          />

          <div className="text-sm text-gray-600 font-medium">
            {currentQuestion} de {totalQuestions}
          </div>

          <NavigationButton
            direction="next"
            onClick={onNext}
            disabled={!canGoNext}
          />
        </div>
      </div>
    </footer>
  );
}
