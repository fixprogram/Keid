import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closeCalendar } from "../store/subtaskSlice";

export function useUpdateSubtaskDeadline() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const subtaskId = router.query.id;

  const handleUpdateSubtaskDeadline = useCallback(
    (deadline: number) => {
      fetch(links.subtask.updateDeadline, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtaskId,
          deadline,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(closeCalendar());

        if (res.status === 200) {
          router.push(`/subtasks/${body.id}`);
        }
      });
    },
    [subtaskId, dispatch, router]
  );

  return handleUpdateSubtaskDeadline;
}
