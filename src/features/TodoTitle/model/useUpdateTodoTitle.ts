import { useTaskStore } from "@/entities/task/models/taskStore";
import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useUpdateTodoTitle(todoType: ItemType) {
  const queryClient = useQueryClient();
  const pathname = usePathname() as string;

  const todoId = pathname.split("/").at(-1) as string;
  const taskId = useTaskStore((state) => state.data.id);
  const todoPost = links[todoType];

  const mutation = useMutation({
    mutationKey: [todoType, todoId],
    mutationFn: (newTitle: string) =>
      axios.post(todoPost.updateTitle, { todoId, title: newTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [todoType, todoId] });
    },
  });

  const handleUpdateTodoTitle = useCallback(
    (newTitle: string) => {
      mutation.mutate(newTitle);
    },
    [mutation]
  );

  return handleUpdateTodoTitle;
}
