import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { closeSettings } from "../store/projectSlice";

export function useToggleStarred() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isStarred = useAppSelector((state) => state.project.isStarred);
  const projectId = router.query.id;

  const handleToggleStarred = useCallback(() => {
    fetch(links.project.toggleStarred, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        isStarred: !isStarred,
      }),
    }).then(async (res) => {
      const body = await res.json();

      if (res.status === 200) {
        dispatch(closeSettings());

        router.push(`/projects/${body.id}`);
      }
    });
  }, [dispatch, isStarred, projectId, router]);

  return handleToggleStarred;
}
