import { render, screen, fireEvent } from "@testing-library/react";
import OptionButton from "./OptionButton";

// Test data
const mockProps = {
  text: "React es una librería de JavaScript",
  index: 0,
  correctAnswer: 2,
  selectedAnswer: null,
  onClick: jest.fn(),
};

describe("OptionButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial state (no selection)", () => {
    it("should render the text and the correct letter", () => {
      render(<OptionButton {...mockProps} />);

      expect(screen.getByText("A")).toBeInTheDocument();
      expect(
        screen.getByText("React es una librería de JavaScript")
      ).toBeInTheDocument();
    });

    it("should have normal state styles", () => {
      render(<OptionButton {...mockProps} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-gray-50",
        "border-gray-300",
        "text-gray-700"
      );
    });

    it("should call onClick when clicked", () => {
      render(<OptionButton {...mockProps} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockProps.onClick).toHaveBeenCalledWith(0);
    });
  });

  describe("Correct answer state", () => {
    it("should show correct style when it is the selected correct answer", () => {
      render(<OptionButton {...mockProps} index={2} selectedAnswer={2} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-green-50",
        "border-green-500",
        "text-green-700"
      );
    });

    it("should show correct style when it is NOT selected but is the correct one", () => {
      render(<OptionButton {...mockProps} index={2} selectedAnswer={0} />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-gray-100",
        "border-gray-300",
        "text-gray-500"
      );
    });
  });

  describe("Incorrect answer state", () => {
    it("should show incorrect style when it is selected but incorrect", () => {
      render(
        <OptionButton
          {...mockProps}
          index={0}
          selectedAnswer={0}
          correctAnswer={2}
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-50", "border-red-500", "text-red-700");
    });
  });

  describe("Disabled state", () => {
    it("should be disabled when there is a selection and it is neither this option nor the correct one", () => {
      render(
        <OptionButton
          {...mockProps}
          index={1}
          selectedAnswer={0}
          correctAnswer={2}
        />
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        "bg-gray-100",
        "border-gray-300",
        "text-gray-500"
      );
    });

    it("should not call onClick when disabled", () => {
      render(
        <OptionButton
          {...mockProps}
          index={1}
          selectedAnswer={0}
          correctAnswer={2}
        />
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockProps.onClick).not.toHaveBeenCalled();
    });
  });

  describe("Option letters", () => {
    it("should display the correct letters for each index", () => {
      const { rerender } = render(<OptionButton {...mockProps} index={0} />);
      expect(screen.getByText("A")).toBeInTheDocument();

      rerender(<OptionButton {...mockProps} index={1} />);
      expect(screen.getByText("B")).toBeInTheDocument();

      rerender(<OptionButton {...mockProps} index={2} />);
      expect(screen.getByText("C")).toBeInTheDocument();

      rerender(<OptionButton {...mockProps} index={3} />);
      expect(screen.getByText("D")).toBeInTheDocument();
    });
  });
});
