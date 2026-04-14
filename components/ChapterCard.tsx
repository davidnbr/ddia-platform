"use client";

import { Chapter, Section } from "@/lib/curriculum";
import { useProgressStore } from "@/lib/store";
import { CheckCircle, Circle, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChapterCardProps {
  chapter: Chapter;
  partId: string;
}

export function ChapterCard({ chapter, partId }: ChapterCardProps) {
  const completedSections = useProgressStore((state) => state.completedSections);

  const completedCount = chapter.sections.filter((s) => completedSections.includes(s.id)).length;
  const totalCount = chapter.sections.length;
  const progress = (completedCount / totalCount) * 100;
  const isComplete = completedCount === totalCount;

  return (
    <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold leading-none tracking-tight">{chapter.title}</h3>
        {isComplete ? (
          <CheckCircle className="text-green-500 w-6 h-6" />
        ) : (
          <div className="text-sm text-muted-foreground font-medium">
            {completedCount}/{totalCount}
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-6">{chapter.description}</p>

      <div className="space-y-2">
        {chapter.sections.map((section) => {
          const isSectionComplete = completedSections.includes(section.id);
          return (
          <Link
            key={section.id}
            href={`/learn/${section.id}`}
            className={cn(
              "flex items-center p-3 rounded-md transition-colors text-sm group",
              isSectionComplete
                ? "bg-green-50/50 hover:bg-green-100/50 dark:bg-green-900/10 dark:hover:bg-green-900/20"
                : "hover:bg-accent"
            )}
          >
            {isSectionComplete ? (
              <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0 group-hover:text-primary" />
            )}
            <span className={cn(
              "flex-grow",
              isSectionComplete && "text-muted-foreground line-through decoration-green-500/30"
            )}>
              {section.title}
            </span>
            <span className="text-xs text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {section.durationMinutes} min
            </span>
          </Link>
        )})}
      </div>

      <div className="mt-6 w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
