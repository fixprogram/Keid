import { MoodType, WorryingType, Reflection } from "@prisma/client";
import { createWithEqualityFn } from "zustand/traditional";

type ReflectionStoreType = {
  mood: MoodType | null;
  worrying: WorryingType[];
  summary: string;
  setMood: (newMood: MoodType | null) => void;
  setWorrying: (newWorrying: WorryingType[]) => void;
  setSummary: (newSummary: string) => void;
  setReflection: (reflection: Reflection) => void;
};

export const useReflectionStore = createWithEqualityFn<ReflectionStoreType>(
  (set) => ({
    mood: null,
    worrying: [],
    summary: "",
    setMood: (newMood) => set(() => ({ mood: newMood })),
    setWorrying: (newWorrying) => set(() => ({ worrying: newWorrying })),
    setSummary: (newSummary) => set(() => ({ summary: newSummary })),
    setReflection: (reflection) => set(() => ({ ...reflection })),
  })
);
