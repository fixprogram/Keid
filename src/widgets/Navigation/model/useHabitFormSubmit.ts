import { links } from "@/shared/config/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "./useNavigationStore";
import { usePopupStore } from "./usePopupStore";
import { useDashboardStore } from "@/templates/DashboardPage";

type MutationHabitType = {
  userId: string;
  habitName: string;
  habitStyle: string;
};

export function useHabitFormSubmit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dateType = useDashboardStore((state) => state.dateType);

  const [userId, closePopupAdd] = useNavigationStore(
    (state) => [state.userId, state.closePopupAdd],
    shallow
  );
  const [habitName, habitStyle, resetHabit] = usePopupStore(
    (state) => [state.title, state.style, state.reset],
    shallow
  );

  const mutation = useMutation({
    mutationKey: ["habits"],
    mutationFn: (newHabit: MutationHabitType) =>
      axios.post(links.habit.add, newHabit),
    onSuccess: (data) => {
      resetHabit();
      closePopupAdd();

      queryClient.invalidateQueries(["dashboard", "overview", dateType]);
      queryClient.invalidateQueries(["dashboard", "productivity", dateType]);

      router.push(`/habits/${data.data.id}`);
    },
  });

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      mutation.mutate({ userId, habitName, habitStyle });
    },
    [userId, habitName, habitStyle, mutation]
  );

  return handleFormSubmit;
}
