import { useTransition } from "react";
import { saveReflection } from "../api/actions";
import { Reflection } from "@prisma/client";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useReflectionStore } from "./useReflectionStore";

export const useSaveReflection = (onClose: VoidFunction) => {
  const userId = useNavigationStore((state) => state.userId);

  const { mood, worrying, summary } = useReflectionStore((state) => ({
    mood: state.mood,
    worrying: state.worrying,
    summary: state.summary,
  }));

  const [isLoadingSaving, startSavingTransition] = useTransition();
  const handleSave = () => {
    const reflection: Reflection = {
      userId,
      date: Date.now().toString(),
      mood,
      worryings: worrying,
      summary,
    };

    startSavingTransition(async () => {
      await saveReflection(reflection);
      onClose();
    });
  };

  return { handleSave, isLoadingSaving };
};
