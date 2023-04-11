import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback } from "react";
import { closeAddComment } from "../store/taskSlice";

export function useCommentFormSubmit() {
  const router = useRouter();
  const session = useSession();

  const dispatch = useAppDispatch();

  const taskId = useAppSelector((state) => state.task.taskId);
  const content = useAppSelector((state) => state.task.commentContent);
  const user = session.data?.user as { id: string };
  const userId = user?.id;

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      if (content.length < 3) {
        return null;
      }

      fetch(links.task.addComment, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          taskId,
          content,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(closeAddComment());

        console.log("body: ", body);
        if (body.id) router.push(`/tasks/${body.id}`);
      });
    },
    [userId, taskId, content, dispatch, router]
  );

  return handleFormSubmit;
}
