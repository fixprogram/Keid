import { links } from "@/shared/config/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "../model/navigationStore";
import { usePopupHabitStore } from "../ui/PopupHabit/popupHabitStore";

type MutationHabitType = {
  userId: string;
  habitName: string;
  habitStyle: string;
};

export function useHabitFormSubmit() {
  const router = useRouter();

  const [userId, closePopupAdd] = useNavigationStore(
    (state) => [state.userId, state.closePopupAdd],
    shallow
  );
  const [habitName, habitStyle, resetHabit] = usePopupHabitStore(
    (state) => [state.habitName, state.habitStyle, state.resetHabit],
    shallow
  );

  const mutation = useMutation({
    mutationKey: ["habits"],
    mutationFn: (newHabit: MutationHabitType) =>
      axios.post(links.habit.add, newHabit),
    onSuccess: (data) => {
      resetHabit();
      closePopupAdd();

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