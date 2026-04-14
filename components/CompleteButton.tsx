"use client";

import { useProgressStore } from "@/lib/store";
import { CheckCircle2, Circle } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function CompleteButton({ sectionId, nextSectionUrl }: { sectionId: string; nextSectionUrl: string | null }) {
  const { markSectionComplete, markSectionIncomplete, completedSections } = useProgressStore();
  const isComplete = completedSections.includes(sectionId);

  const toggleComplete = () => {
    if (isComplete) {
      markSectionIncomplete(sectionId);
    } else {
      markSectionComplete(sectionId);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8 pt-8 border-t">
      <div className="flex items-center justify-between">
        <Button
          onClick={toggleComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md ${
            isComplete
              ? "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-200"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5"
          }`}
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Completed
            </>
          ) : (
            <>
              <Circle className="w-5 h-5" />
              Mark as Complete
            </>
          )}
        </Button>

        {isComplete && nextSectionUrl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href={nextSectionUrl}
              className="flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Next Lesson &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
