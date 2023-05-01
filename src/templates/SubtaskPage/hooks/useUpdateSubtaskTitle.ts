import { links } from "@/shared/config/links";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function useUpdateSubtaskTitle() {
  const router = useRouter();

  const subtaskId = router.query.id;

  const handleUpdateSubtaskTitle = useCallback(
    (title: string) => {
      if (title.length < 1) {
        return;
      }

      fetch(links.subtask.updateTitle, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtaskId,
          title,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);
      });
    },
    [subtaskId]
  );

  return handleUpdateSubtaskTitle;
}
