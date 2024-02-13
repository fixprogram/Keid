import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useState, useTransition } from "react";
import { completeHabitForToday } from "../api/actions";

export const useCompleteForToday = (id: string, hasCompletedToday: boolean) => {
  const [hasCompleted, setCompleted] = useState(hasCompletedToday);
  const userId = useNavigationStore((state) => state.userId);

  const [isLoadingComplete, startCompleteTransition] = useTransition();
  const handleComplete = () => {
    startCompleteTransition(async () => {
      await completeHabitForToday(id, userId);
      setCompleted(true);
    });
  };

  return { handleComplete, isLoadingComplete, hasCompleted };
};
