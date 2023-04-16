import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closePopup } from "../store/progressSlice";

export function useUpdateProgress() {
  const router = useRouter();
  const progress = useAppSelector((state) => state.progress.progress);
  const initialProgress = useAppSelector(
    (state) => state.progress.initialProgress
  );
  const dispatch = useAppDispatch();

  const taskId = router.query.id;

  const handleUpdateProgress = useCallback(() => {
    if (progress === initialProgress) {
      return dispatch(closePopup());
    }

    fetch(links.task.updateProgress, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
        progress,
      }),
    }).then(async (res) => {
      console.log("Res: ", res);

      if (res.status === 200) {
        dispatch(closePopup());
      }
    });
  }, [taskId, initialProgress, progress, dispatch]);

  return handleUpdateProgress;
}
