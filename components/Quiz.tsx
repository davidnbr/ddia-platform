"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
}

export function Quiz({ question, options }: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
  };

  const selected = options.find((o) => o.id === selectedOption);

  return (
    <div className="my-8 p-6 border rounded-xl bg-card shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Knowledge Check</h3>
      </div>

      <p className="text-lg mb-6">{question}</p>

      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={cn(
              "p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between group",
              selectedOption === option.id && !isSubmitted
                ? "border-primary bg-primary/10 ring-1 ring-primary shadow-sm"
                : "border-border hover:bg-accent/50 hover:border-primary/50",
              isSubmitted && option.isCorrect ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "",
              isSubmitted && selectedOption === option.id && !option.isCorrect ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "",
              isSubmitted && !option.isCorrect && selectedOption !== option.id ? "opacity-50 border-transparent" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                selectedOption === option.id ? "border-primary bg-primary" : "border-muted-foreground group-hover:border-primary",
                isSubmitted && option.isCorrect && "border-green-600 bg-green-600",
                isSubmitted && selectedOption === option.id && !option.isCorrect && "border-red-600 bg-red-600"
              )}>
                {selectedOption === option.id && (
                  <div className="w-2 h-2 rounded-full bg-background" />
                )}
                {isSubmitted && option.isCorrect && (
                   <CheckCircle2 className="w-3 h-3 text-white" />
                )}
                {isSubmitted && selectedOption === option.id && !option.isCorrect && (
                   <XCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="font-medium">{option.text}</span>
            </div>

            {/* Redundant icons removed from right side as they are now integrated into the radio indicator */}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4"
          >
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={cn(
                "w-full sm:w-auto transition-all duration-200 active:scale-95",
                !selectedOption ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90 shadow-md hover:shadow-lg"
              )}
            >
              Check Answer
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 p-4 rounded-lg text-sm",
              selected?.isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            )}
          >
            <p className="font-bold mb-1">
              {selected?.isCorrect ? "Correct!" : "Not quite right."}
            </p>
            <p>{selected?.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
