import { links } from "@/shared/config/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "../model/navigationStore";
import { usePopupTaskStore } from "../ui/PopupTask/popupTaskStore";

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

  const taskData = usePopupTaskStore(
    (state) => ({
      taskName: state.taskName,
      taskStyle: state.taskStyle,
      deadline: state.deadline,
      projectName:
        state.activeProject.title === "No project"
          ? ""
          : state.activeProject.title,
      repeats: state.activeRepeatsOption,
    }),
    shallow
  );

  const resetTask = usePopupTaskStore((state) => state.resetTask);

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
