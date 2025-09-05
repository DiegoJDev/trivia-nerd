interface NavigationButtonProps {
  direction: "previous" | "next";
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

export default function NavigationButton({
  direction,
  onClick,
  disabled = false,
  text = "",
}: NavigationButtonProps) {
  const getDefaultText = (): string => {
    switch (direction) {
      case "previous":
        return text || "◀ Anterior";
      case "next":
        return text || "Siguiente ▶";
      default:
        return text || "Navegar";
    }
  };

  const getButtonClasses = (): string => {
    const baseClasses =
      "px-6 py-3 font-medium rounded-lg transition-all duration-200";

    if (disabled) {
      return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
    }

    switch (direction) {
      case "previous":
        return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
      case "next":
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
      default:
        return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
    }
  };

  const buttonText = getDefaultText();
  const buttonClasses = getButtonClasses();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${
        direction === "previous" ? "Pregunta anterior" : "Siguiente pregunta"
      }`}
    >
      {buttonText}
    </button>
  );
}
