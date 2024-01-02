import { links } from "@/shared/config/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "../model/useNavigationStore";
import { usePopupStore } from "../model/usePopupStore";

type MutationTaskType = {
  userId: string;
  taskName: string;
  taskStyle: string;
  deadline: number;
  projectName: string;
  repeats: string;
};

export function useTaskFormSubmit() {
  const router = useRouter();

  const [userId, closePopupAdd] = useNavigationStore(
    (state) => [state.userId, state.closePopupAdd],
    shallow
  );

  const taskData = usePopupStore(
    (state) => ({
      taskName: state.title,
      taskStyle: state.style,
      deadline: state.deadline,
      projectName:
        state.activeProject.title === "No project"
          ? ""
          : state.activeProject.title,
      repeats: state.activeRepeatsOption,
    }),
    shallow
  );

  const resetTask = usePopupStore((state) => state.reset);

  const mutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (newTask: MutationTaskType) =>
      axios.post(links.task.add, newTask),
    onSuccess: (data) => {
      resetTask();
      closePopupAdd();

      router.push(`/tasks/${data.data.id}`);
    },
  });

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      mutation.mutate({
        userId,
        ...taskData,
      });
    },
    [userId, taskData, mutation]
  );

  return handleFormSubmit;
}
