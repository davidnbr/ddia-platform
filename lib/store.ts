import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedSections: string[];
  markSectionComplete: (sectionId: string) => void;
  markSectionIncomplete: (sectionId: string) => void;
  isSectionComplete: (sectionId: string) => boolean;
  getProgress: (totalSections: number) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSections: [],
      markSectionComplete: (sectionId) =>
        set((state) => ({
          completedSections: state.completedSections.includes(sectionId)
            ? state.completedSections
            : [...state.completedSections, sectionId],
        })),
      markSectionIncomplete: (sectionId) =>
        set((state) => ({
          completedSections: state.completedSections.filter((id) => id !== sectionId),
        })),
      isSectionComplete: (sectionId) => get().completedSections.includes(sectionId),
      getProgress: (totalSections) =>
        Math.round((get().completedSections.length / totalSections) * 100),
    }),
    {
      name: 'ddia-progress-storage',
    }
  )
);
