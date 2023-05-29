import { links } from "@/shared/config/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useChangeProjectName() {
  const pathname = usePathname() as string;

  const projectId = pathname.split("/").at(-1) as string;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newProjectName: string) =>
      axios.post(links.project.changeProjectName, {
        projectId,
        newProjectName,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });

  const handleChangeProjectName = useCallback(
    (newProjectName: string) => {
      mutation.mutate(newProjectName);
    },
    [mutation]
  );

  return handleChangeProjectName;
}
