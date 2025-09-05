export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface GameStore {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: (number | null)[];
  score: number;
  //Actions
  loadQuestions: (questions: Question[]) => void;
  selectAnswer: (answer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}
