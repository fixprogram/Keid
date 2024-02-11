import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useTransition } from "react";
import { completeTask } from "../api/actions";

export const useComplete = (id: string) => {
  const userId = useNavigationStore((state) => state.userId);

  const [isLoadingComplete, startCompleteTransition] = useTransition();
  const handleComplete = () => {
    startCompleteTransition(async () => {
      await completeTask(id, userId);
    });
  };

  return { handleComplete, isLoadingComplete };
};
