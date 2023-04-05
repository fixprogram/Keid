import { useRouter } from "next/router";
import { useCallback } from "react";

export function useCompleteTask() {
  const router = useRouter();

  const taskId = router.query.id;

  const handleCompleteTask = useCallback(() => {
    fetch("http://localhost:3000/api/completeTask", {
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
