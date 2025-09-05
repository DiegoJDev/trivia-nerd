"use client";
import { useEffect } from "react";
import GameHeader from "../components/GameHeader";
import QuestionContainer from "../components/QuestionContainer";
import GameFooter from "../components/GameFooter";
import { useGameStore } from "../stores/gameStore";
import questionsData from "../../../questions.json";

export default function Game() {
  //States from store.
  const questions = useGameStore((state) => state.questions);
  const currentQuestionIndex = useGameStore(
    (state) => state.currentQuestionIndex
  );
  const selectedAnswers = useGameStore((state) => state.selectedAnswers);
  const score = useGameStore((state) => state.score);

  //Actions from store.
  const loadQuestions = useGameStore((state) => state.loadQuestions);
  const selectAnswer = useGameStore((state) => state.selectAnswer);
  const nextQuestion = useGameStore((state) => state.nextQuestion);
  const previousQuestion = useGameStore((state) => state.previousQuestion);

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions(questionsData);
    }
  }, [questions.length, loadQuestions]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <GameHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={score}
        maxScore={questions.length * 10}
        showTimer={false}
        totalTime={45}
      />

      <main className="max-w-2xl mx-auto p-6">
        <QuestionContainer
          questionData={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          category={currentQuestion.category}
          selectedAnswer={currentAnswer}
          onAnswerSelect={selectAnswer}
        />

        <GameFooter
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          canGoBack={currentQuestionIndex > 0}
          canGoNext={currentQuestionIndex < questions.length - 1}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
        />
      </main>
    </div>
  );
}
