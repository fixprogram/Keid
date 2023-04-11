import { links } from "@/shared/config/links";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function useDeleteComment() {
  const router = useRouter();

  const taskId = router.query.id;

  const handleDeleteComment = useCallback(
    (commentTime: string) => {
      fetch(links.task.deleteComment, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentTime,
          taskId,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        if (res.status === 200) {
          router.push(`/tasks/${taskId}`);
        }
      });
    },
    [taskId, router]
  );

  return handleDeleteComment;
}
