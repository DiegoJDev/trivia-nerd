import { create } from "zustand";
import { GameStore } from "./types";

export const useGameStore = create<GameStore>((set, get) => ({
  //States
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  score: 0,

  //Actions

  loadQuestions: (questions) => {
    set({
      questions,
      selectedAnswers: new Array(questions.length).fill(null),
      currentQuestionIndex: 0,
      score: 0,
    });
  },

  selectAnswer: (answer) => {
    const { selectedAnswers, currentQuestionIndex, questions, score } = get();

    //Update the selected answers.
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;

    const currentQuestion = questions[currentQuestionIndex];

    let newScore = score;

    //Check if the answer is correct and if the user has not answered before.
    if (
      answer === currentQuestion.correctAnswer &&
      selectedAnswers[currentQuestionIndex] === null
    ) {
      newScore += 10;
    }

    set({
      selectedAnswers: newAnswers,
      score: newScore,
    });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },
}));
