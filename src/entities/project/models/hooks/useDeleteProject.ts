import { links } from "@/shared/config/links";
import { useProjectsStore } from "@/entities/project/models/projectsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useDeleteProject() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // const dispatch = useAppDispatch();

  const projectId = pathname?.split("/").at(-1);
  const projectsData = useProjectsStore((state) => state.data);
  const setData = useProjectsStore((state) => state.setData);

  const mutation = useMutation({
    mutationFn: () => axios.post(links.project.delete, { projectId }),
    onSuccess: (data, variables) => {
      const newProjects = projectsData.projects.filter(
        (project) => project.id !== projectId
      );

      const newData = { ...projectsData, projects: [...newProjects] };

      queryClient.setQueryData(["projects"], newData);

      // setProjects(newProjects);

      router.push(`/projects`);
    },
  });

  const handleDeleteProject = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleDeleteProject;
}
