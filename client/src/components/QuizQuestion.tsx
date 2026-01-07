import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizQuestion({
  questionNumber,
  totalQuestions,
  question,
  options,
  onAnswer
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optionId: string, isCorrect: boolean) => {
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1500);
  };

  const getButtonClasses = (optionId: string, isCorrect: boolean) => {
    if (!showFeedback) {
      return "bg-background hover:bg-accent border-2 border-border";
    }
    
    if (optionId === selectedAnswer) {
      return isCorrect
        ? "bg-green-100 dark:bg-green-950 border-2 border-green-500 text-green-900 dark:text-green-100"
        : "bg-red-100 dark:bg-red-950 border-2 border-red-500 text-red-900 dark:text-red-100";
    }
    
    if (isCorrect) {
      return "bg-green-100 dark:bg-green-950 border-2 border-green-500 text-green-900 dark:text-green-100";
    }
    
    return "bg-background border-2 border-border opacity-50";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm" data-testid="badge-question-number">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <div className="h-2 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-center" data-testid="text-quiz-question">
          {question}
        </h3>

        <div className="grid gap-4 mt-8">
          {options.map((option) => (
            <Button
              key={option.id}
              onClick={() => !showFeedback && handleAnswer(option.id, option.isCorrect)}
              disabled={showFeedback}
              className={`p-5 min-h-16 h-auto text-left justify-start rounded-xl transition-all whitespace-normal ${getButtonClasses(option.id, option.isCorrect)}`}
              variant="outline"
              data-testid={`button-quiz-option-${option.id}`}
            >
              <span className="flex items-center gap-3 w-full">
                <span className="font-semibold text-base flex-shrink-0">{option.id.toUpperCase()}.</span>
                <span className="flex-1 text-base break-words">{option.text}</span>
                {showFeedback && option.isCorrect && (
                  <Check className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                )}
                {showFeedback && selectedAnswer === option.id && !option.isCorrect && (
                  <X className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                )}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
