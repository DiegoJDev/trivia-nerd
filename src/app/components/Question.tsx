interface QuestionProps {
  question: string;
  questionNumber?: number;
  category: string;
}

export default function Question({
  question,
  questionNumber,
  category,
}: QuestionProps) {
  return (
    <div className="text-center space-y-3">
      {questionNumber && (
        <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
          Pregunta {questionNumber}
        </div>
      )}

      {/* Categoría (opcional) */}
      {category && (
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {category}
        </div>
      )}

      {/* Texto principal de la pregunta */}
      <h2 className={"text-gray-800 font-medium leading-relaxed"}>
        {question}
      </h2>
    </div>
  );
}
