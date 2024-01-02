import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useSubtaskListStore } from "./subtaskListStore";
import { useUserStore } from "@/entities/user";
import { useDashboardStore } from "@/templates/DashboardPage";
// import { useCommentsStore } from "./commentsStore";

export const useAddSubtask = () => {
  const userEmail = useUserStore((state) => state.email);
  const dateType = useDashboardStore((state) => state.dateType);
  const queryClient = useQueryClient();

  // if we come to this task by a link, the userId will be undefined
  const userId = useNavigationStore((state) => state.userId);
  const [newSubtaskTitle, deadline, reset] = useSubtaskListStore(
    (state) => [state.newSubtaskTitle, state.deadline, state.reset],
    shallow
  );
  const pathname = usePathname();
  const taskId = pathname?.split("/").at(-1);

  const mutation = useMutation({
    mutationKey: ["task", taskId],
    mutationFn: () =>
      axios.post(links.subtask.add, {
        title: newSubtaskTitle,
        userId,
        taskId,
        deadline,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["task", taskId]);
      queryClient.invalidateQueries(["tasks", userEmail]);

      queryClient.invalidateQueries(["dashboard", "overview", dateType]);

      reset();
    },
  });

  const handleAddSubtask = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      mutation.mutate();
    },
    [mutation]
  );

  return handleAddSubtask;
};
