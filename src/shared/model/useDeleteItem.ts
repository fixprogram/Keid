import { useTaskStore } from "@/entities/task/models/taskStore";
import { links } from "@/shared/config/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { ItemType } from "../config/types";

export const useDeleteItem = (todoType: ItemType) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const itemId = pathname?.split("/").at(-1);
  const taskId = useTaskStore((state) => state.data.id);
  const itemPost = links[todoType];

  const mutation = useMutation({
    mutationKey: [`${todoType}s`],
    mutationFn: () => axios.post(itemPost.delete, { itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries([`${todoType}s`]);

      router.back();
    },
  });

  const handleDeleteItem = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleDeleteItem;
};
