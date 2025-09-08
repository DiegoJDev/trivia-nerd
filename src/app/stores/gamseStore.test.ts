import { useGameStore } from "./gameStore";
import { Question } from "./types";

// Mock questions for testing
const mockQuestions: Question[] = [
  {
    question: "¿Qué es React?",
    options: [
      "Base de datos",
      "Framework",
      "Librería de JavaScript",
      "Lenguaje",
    ],
    correctAnswer: 2,
    category: "React Basics",
  },
  {
    question: "¿Qué es TypeScript?",
    options: ["Runtime", "Superset de JS", "Base de datos", "CSS Framework"],
    correctAnswer: 1,
    category: "TypeScript Basics",
  },
  {
    question: "¿Qué es Zustand?",
    options: ["State manager", "Router", "UI Library", "Testing tool"],
    correctAnswer: 0,
    category: "State Management",
  },
];

describe("GameStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useGameStore.setState({
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      score: 0,
    });
  });

  describe("Initial state", () => {
    it("should have correct initial values", () => {
      const state = useGameStore.getState();

      expect(state.questions).toEqual([]);
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.selectedAnswers).toEqual([]);
      expect(state.score).toBe(0);
    });
  });

  describe("loadQuestions", () => {
    it("should load questions and reset state", () => {
      const { loadQuestions } = useGameStore.getState();

      loadQuestions(mockQuestions);

      const state = useGameStore.getState();
      expect(state.questions).toEqual(mockQuestions);
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.selectedAnswers).toEqual([null, null, null]);
      expect(state.score).toBe(0);
    });

    it("should create selectedAnswers array with correct length", () => {
      const { loadQuestions } = useGameStore.getState();

      loadQuestions(mockQuestions);

      const state = useGameStore.getState();
      expect(state.selectedAnswers).toHaveLength(mockQuestions.length);
      expect(state.selectedAnswers.every((answer) => answer === null)).toBe(
        true
      );
    });
  });

  describe("selectAnswer", () => {
    beforeEach(() => {
      const { loadQuestions } = useGameStore.getState();
      loadQuestions(mockQuestions);
    });

    it("should select answer for current question", () => {
      const { selectAnswer } = useGameStore.getState();

      selectAnswer(2); // Correct answer for first question

      const state = useGameStore.getState();
      expect(state.selectedAnswers[0]).toBe(2);
      expect(state.selectedAnswers[1]).toBe(null);
      expect(state.selectedAnswers[2]).toBe(null);
    });

    it("should increase score when answer is correct", () => {
      const { selectAnswer } = useGameStore.getState();

      selectAnswer(2); // Correct answer for first question

      const state = useGameStore.getState();
      expect(state.score).toBe(10);
    });

    it("should not increase score when answer is incorrect", () => {
      const { selectAnswer } = useGameStore.getState();

      selectAnswer(0); // Incorrect answer for first question

      const state = useGameStore.getState();
      expect(state.score).toBe(0);
    });

    it("should not increase score if question was already answered", () => {
      const { selectAnswer } = useGameStore.getState();

      // Answer correctly first time
      selectAnswer(2);
      expect(useGameStore.getState().score).toBe(10);

      // Try to answer again (shouldn't increase score)
      selectAnswer(2);
      expect(useGameStore.getState().score).toBe(10);
    });

    it("should allow changing answer but not increase score again", () => {
      const { selectAnswer } = useGameStore.getState();

      // Answer incorrectly first
      selectAnswer(0);
      expect(useGameStore.getState().score).toBe(0);
      expect(useGameStore.getState().selectedAnswers[0]).toBe(0);

      // Change to correct answer (score shouldn't increase)
      selectAnswer(2);
      expect(useGameStore.getState().score).toBe(0);
      expect(useGameStore.getState().selectedAnswers[0]).toBe(2);
    });
  });

  describe("nextQuestion", () => {
    beforeEach(() => {
      const { loadQuestions } = useGameStore.getState();
      loadQuestions(mockQuestions);
    });

    it("should move to next question", () => {
      const { nextQuestion } = useGameStore.getState();

      nextQuestion();

      const state = useGameStore.getState();
      expect(state.currentQuestionIndex).toBe(1);
    });

    it("should not go beyond last question", () => {
      const { nextQuestion } = useGameStore.getState();

      // Go to last question
      useGameStore.setState({ currentQuestionIndex: 2 });

      // Try to go beyond
      nextQuestion();

      const state = useGameStore.getState();
      expect(state.currentQuestionIndex).toBe(2);
    });
  });

  describe("previousQuestion", () => {
    beforeEach(() => {
      const { loadQuestions } = useGameStore.getState();
      loadQuestions(mockQuestions);
      useGameStore.setState({ currentQuestionIndex: 1 });
    });

    it("should move to previous question", () => {
      const { previousQuestion } = useGameStore.getState();

      previousQuestion();

      const state = useGameStore.getState();
      expect(state.currentQuestionIndex).toBe(0);
    });

    it("should not go below first question", () => {
      const { previousQuestion } = useGameStore.getState();

      // Go to first question
      useGameStore.setState({ currentQuestionIndex: 0 });

      // Try to go below
      previousQuestion();

      const state = useGameStore.getState();
      expect(state.currentQuestionIndex).toBe(0);
    });
  });

  describe("Complete game flow", () => {
    it("should handle complete trivia flow correctly", () => {
      const { loadQuestions, selectAnswer, nextQuestion } =
        useGameStore.getState();

      // Load questions
      loadQuestions(mockQuestions);

      // Answer first question correctly
      selectAnswer(2);
      expect(useGameStore.getState().score).toBe(10);

      // Move to next question
      nextQuestion();
      expect(useGameStore.getState().currentQuestionIndex).toBe(1);

      // Answer second question incorrectly
      selectAnswer(0);
      expect(useGameStore.getState().score).toBe(10); // Should remain 10

      // Move to next question
      nextQuestion();
      expect(useGameStore.getState().currentQuestionIndex).toBe(2);

      // Answer third question correctly
      selectAnswer(0);
      expect(useGameStore.getState().score).toBe(20);

      // Final state check
      const finalState = useGameStore.getState();
      expect(finalState.selectedAnswers).toEqual([2, 0, 0]);
      expect(finalState.score).toBe(20);
      expect(finalState.currentQuestionIndex).toBe(2);
    });
  });
});
