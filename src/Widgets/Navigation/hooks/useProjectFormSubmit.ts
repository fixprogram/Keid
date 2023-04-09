import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback } from "react";
import { setProjectName } from "../components/PopupAdd/components/PopupProject/store/addProjectSlice";
import { closePopupAdd } from "../store/navigationSlice";

export function useProjectFormSubmit() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.overview.userId);
  const projectName = useAppSelector((state) => state.addProject.projectName);
  const projectStyle = useAppSelector((state) => state.addProject.projectStyle);

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      fetch(links.project.add, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          projectName,
          projectStyle,
        }),
      }).then(async (res) => {
        console.log("Res: ", res);

        const body = await res.json();

        dispatch(setProjectName(""));
        dispatch(closePopupAdd());

        console.log("body: ", body);
        if (body.id) router.push(`/projects/${body.id}`);
      });
    },
    [userId, projectName, projectStyle, dispatch, router]
  );

  return handleFormSubmit;
}
