import { links } from "@/shared/config/links";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function useCompleteTask() {
  const router = useRouter();

  const taskId = router.query.id;

  const handleCompleteTask = useCallback(() => {
    fetch(links.task.complete, {
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
        router.push(`/tasks`);
      }
    });
  }, [taskId, router]);

  return handleCompleteTask;
}
