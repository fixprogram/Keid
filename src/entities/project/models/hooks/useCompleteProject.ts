import { links } from "@/shared/config/links";
import { useProjectsStore } from "@/entities/project/models/projectsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useCompleteProject() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // const dispatch = useAppDispatch();

  const projectId = pathname?.split("/").at(-1);
  const setActiveFilter = useProjectsStore((state) => state.setActiveFilter);
  //   const setData = useProjectsStore((state) => state.setData);

  const mutation = useMutation({
    mutationFn: () => axios.post(links.project.complete, { projectId }),
    onSuccess: (data, variables) => {
      //   const newProjects = projectsData.projects.filter(
      //     (project) => project.id !== variables.projectId
      //   );

      //   const newData = { ...projectsData, projects: [...newProjects] };

      //   queryClient.setQueryData(["projects"], newData);

      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // setProjects(newProjects);
      setActiveFilter("Completed");

      router.push(`/projects`);
    },
  });

  const handleCompleteProject = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleCompleteProject;
}
