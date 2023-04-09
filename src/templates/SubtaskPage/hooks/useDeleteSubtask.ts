import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closeSettings } from "../store/subtaskSlice";

export function useDeleteSubtask() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const subtaskId = router.query.id;

  const handleDeleteSubtask = useCallback(() => {
    fetch(links.subtask.delete, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subtaskId,
      }),
    }).then(async (res) => {
      console.log("Res: ", res);

      const body = await res.json();

      if (res.status === 200) {
        dispatch(closeSettings());

        router.push(`/tasks/${body.id}`);
      }
    });
  }, [dispatch, subtaskId, router]);

  return handleDeleteSubtask;
}
