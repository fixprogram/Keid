import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closeCalendar } from "../store/taskSlice";

export function useUpdateTaskDeadline() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const taskId = router.query.id;

  const handleUpdateTaskDeadline = useCallback(
    (deadline: number) => {
      fetch(links.task.updateDeadline, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          deadline,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(closeCalendar());

        if (res.status === 200) {
          router.push(`/tasks/${body.id}`);
        }
      });
    },
    [taskId, dispatch, router]
  );

  return handleUpdateTaskDeadline;
}
