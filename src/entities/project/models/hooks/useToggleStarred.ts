import { links } from "@/shared/config/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useProjectStore } from "../projectStore";
// import { closeSettings } from "../store/projectSlice";

export function useToggleStarred() {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [projectData, setData] = useProjectStore(
    (state) => [state.data, state.setData],
    shallow
  );
  const { id, isStarred } = projectData;

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(links.project.toggleStarred, {
        projectId: id,
        isStarred: !isStarred,
      }),
    onSuccess: (data, variables) => {
      // const newProjects = projectsData.projects.filter(
      //   (project) => project.id !== variables.projectId
      // );

      // console.log("success: ", data);

      // const newData = projectData;
      // newData.isStarred = data.data.isStarred;

      // const newData = { ...projectData, data:  };

      // queryClient.setQueryData(["project"], newData);

      queryClient.invalidateQueries({ queryKey: ["project"] });

      // setData(newData);

      // router.push(`/projects`);
    },
  });

  const handleToggleStarred = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleToggleStarred;
}
