import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closeSettings } from "../store/projectSlice";

export function useDeleteProject() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const projectId = router.query.id;

  const handleDeleteProject = useCallback(() => {
    fetch(links.project.delete, {
      // fetch("http://localhost:3000/api/deleteProject", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
      }),
    }).then(async (res) => {
      console.log("Res: ", res);

      if (res.status === 200) {
        dispatch(closeSettings());

        router.push(`/projects`);
      }
    });
  }, [dispatch, projectId, router]);

  return handleDeleteProject;
}
