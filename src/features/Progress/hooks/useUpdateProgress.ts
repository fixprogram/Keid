import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { User, useUser } from "@/shared/lib/hooks/useUser";
import { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closePopup } from "../store/progressSlice";

export function useUpdateProgress() {
  const router = useRouter();

  const user = useUser();

  const commentText = useAppSelector((state) => state.progress.comment);
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

    if (user) {
      const userId = user.id;

      const comment = {
        userId,
        content: commentText,
        time: Date.now().toString(),
      };

      fetch(links.task.updateProgress, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          progress,
          comment,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        if (res.status === 200) {
          dispatch(closePopup());
        }
      });
    }
  }, [taskId, initialProgress, progress, commentText, user, dispatch]);

  return handleUpdateProgress;
}
