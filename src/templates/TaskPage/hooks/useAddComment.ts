import { links } from "@/shared/config/links";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useUser } from "@/shared/lib/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function useAddComment() {
  const router = useRouter();
  const user = useUser();

  const taskId = useAppSelector((state) => state.task.taskId);

  const handleAddComment = useCallback(
    (comment: string) => {
      if (comment.length < 3) {
        return null;
      }

      if (user) {
        const userId = user.id;

        fetch(links.task.addComment, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            taskId,
            content: comment,
          }),
        }).then(async (res) => {
          console.log("Res: ", res);

          const body = await res.json();

          console.log("body: ", body);
          if (body.id) router.push(`/tasks/${body.id}`);
        });
      }
    },
    [user, taskId, router]
  );

  return handleAddComment;
}
