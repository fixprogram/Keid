import { useTasksStore } from "@/entities/task/models/tasksStore";
import { useTaskStore } from "@/entities/task/models/taskStore";
import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";

export const useComplete = (
  itemType: ItemType
  //   onSuccessCallback: () => void
) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const itemId = pathname?.split("/").at(-1);

  const itemPost = links[itemType];

  const mutation = useMutation({
    mutationKey: [`${itemType}s`],
    mutationFn: () => axios.post(itemPost.complete, { itemId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries([`${itemType}s`]);

      //   setActiveFilter("Completed");
      //   onSuccessCallback()

      router.back();
    },
  });

  const handleComplete = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleComplete;
};
