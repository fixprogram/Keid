import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback } from "react";
import { resetTask } from "../components/PopupAdd/components/PopupTask/store/addTaskSlice";
import { closePopupAdd } from "../store/navigationSlice";

export function useTaskFormSubmit() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.overview.userId);
  const taskName = useAppSelector((state) => state.addTask.taskName);
  const taskStyle = useAppSelector((state) => state.addTask.taskStyle);
  const deadline = useAppSelector((state) => state.addTask.deadline);
  const repeats = useAppSelector((state) => state.addTask.activeRepeatsOption);
  const projectName = useAppSelector((state) => state.addTask.taskProject);

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      const deadlineTimestamp = deadline
        ? new Date(deadline).setHours(23, 59, 59, 999)
        : deadline;

      fetch(links.task.add, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          taskName,
          taskStyle,
          deadline: deadlineTimestamp,
          projectName: projectName.title,
          repeats,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(resetTask());
        dispatch(closePopupAdd());

        console.log("body: ", body);
        if (body.id) router.push(`/tasks/${body.id}`);
      });
    },
    [
      userId,
      taskName,
      taskStyle,
      deadline,
      projectName,
      repeats,
      dispatch,
      router,
    ]
  );

  return handleFormSubmit;
}
