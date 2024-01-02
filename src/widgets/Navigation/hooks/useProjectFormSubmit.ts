import { links } from "@/shared/config/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "../model/useNavigationStore";
import { usePopupStore } from "../model/usePopupStore";

type MutationProjectType = {
  userId: string;
  projectName: string;
  projectStyle: string;
};

export function useProjectFormSubmit() {
  const router = useRouter();

  const [userId, closePopupAdd] = useNavigationStore(
    (state) => [state.userId, state.closePopupAdd],
    shallow
  );

  const [projectName, projectStyle, resetProject] = usePopupStore(
    (state) => [state.title, state.style, state.reset],
    shallow
  );

  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: (newProject: MutationProjectType) =>
      axios.post(links.project.add, newProject),
    onSuccess: (data) => {
      resetProject();
      closePopupAdd();

      router.push(`/projects/${data.data.id}`);
    },
  });

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      mutation.mutate({ userId, projectName, projectStyle });
    },
    [userId, projectName, projectStyle, mutation]
  );

  return handleFormSubmit;
}
