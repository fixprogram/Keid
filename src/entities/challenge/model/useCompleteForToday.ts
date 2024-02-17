import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useState, useTransition } from "react";
import { completeChallengeForToday } from "../api/actions";

export const useCompleteForToday = (
  id: string,
  hasCompletedToday: boolean,
  repeats: number,
  streak: number
) => {
  const [hasCompleted, setCompleted] = useState(
    hasCompletedToday || streak / repeats === 1
  );
  const userId = useNavigationStore((state) => state.userId);

  const [isLoadingComplete, startCompleteTransition] = useTransition();
  const handleComplete = () => {
    startCompleteTransition(async () => {
      await completeChallengeForToday(id, userId);
      setCompleted(true);
    });
  };

  return { handleComplete, isLoadingComplete, hasCompleted };
};
