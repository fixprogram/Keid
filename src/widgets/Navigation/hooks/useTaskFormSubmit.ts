import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback } from "react";
import { closePopupAdd } from "../store/navigationSlice";

export function useTaskFormSubmit() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.overview.userId);
  const taskName = useAppSelector((state) => state.addTask.taskName);
  const taskStyle = useAppSelector((state) => state.addTask.taskStyle);
  const deadline = useAppSelector((state) => state.addTask.deadline);
  const projectName = useAppSelector((state) => state.addTask.taskProject);

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

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
          deadline,
          projectName,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(closePopupAdd());

        console.log("body: ", body);
        if (body.id) router.push(`/tasks/${body.id}`);
      });
    },
    [userId, taskName, taskStyle, deadline, projectName, dispatch, router]
  );

  return handleFormSubmit;
}