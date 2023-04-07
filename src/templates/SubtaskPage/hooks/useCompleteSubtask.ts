import { useRouter } from "next/router";
import { useCallback } from "react";

export function useCompleteSubtask() {
  const router = useRouter();

  const subtaskId = router.query.id;

  const handleCompleteSubtask = useCallback(() => {
    fetch("http://localhost:3000/api/subtask/complete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subtaskId,
      }),
    }).then(async (res) => {
      console.log("Res: ", res.body);

      const body = await res.json();

      if (res.status === 200) {
        router.push(`/tasks/${body.id}`);
      }
    });
  }, [subtaskId, router]);

  return handleCompleteSubtask;
}
