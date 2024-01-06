import { useTaskStore } from "@/entities/task/models/taskStore";
import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useDashboardStore } from "@/templates/DashboardPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useDeleteTodo = (todoType: ItemType) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const dateType = useDashboardStore((state) => state.dateType);

  const itemId = pathname?.split("/").at(-1);
  const taskId = useTaskStore((state) => state.data.id);
  const itemPost = links[todoType];

  const mutation = useMutation({
    mutationKey: [`${todoType}s`],
    mutationFn: () => axios.post(itemPost.delete, { itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries([`${todoType}s`]);
      queryClient.invalidateQueries(["dashboard", "overview", dateType]);
      queryClient.invalidateQueries(["dashboard", "productivity", dateType]);

      router.back();
    },
  });

  const handleDeleteTodo = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleDeleteTodo;
};
