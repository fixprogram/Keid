import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closeSettings } from "../store/taskSlice";

export function useDeleteTask() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const taskId = router.query.id;

  const handleDeleteTask = useCallback(() => {
    fetch(links.task.delete, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
      }),
    }).then(async (res) => {
      console.log("Res: ", res);

      if (res.status === 200) {
        dispatch(closeSettings());

        router.push(`/tasks`);
      }
    });
  }, [dispatch, taskId, router]);

  return handleDeleteTask;
}
