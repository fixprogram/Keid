import { links } from "@/shared/config/links";
import { useProjectsStore } from "@/entities/project/models/projectsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useArchiveProject() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const projectId = pathname?.split("/").at(-1);
  const setActiveFilter = useProjectsStore((state) => state.setActiveFilter);

  const mutation = useMutation({
    mutationFn: () => axios.post(links.project.archive, { projectId }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      setActiveFilter("Archived");

      router.push(`/projects`);
    },
  });

  const handleArchiveProject = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleArchiveProject;
}
