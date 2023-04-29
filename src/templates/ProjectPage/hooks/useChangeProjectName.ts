import { links } from "@/shared/config/links";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function useChangeProjectName() {
  const router = useRouter();

  const projectId = router.query.id;

  const handleChangeProjectName = useCallback(
    (newProjectName: string) => {
      fetch(links.project.changeProjectName, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          newProjectName,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        if (res.status === 200) {
          router.push(`/projects/${body.id}`);
        }
      });
    },
    [projectId, router]
  );

  return handleChangeProjectName;
}
