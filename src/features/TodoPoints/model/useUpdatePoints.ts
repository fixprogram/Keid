import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useDashboardStore } from "@/templates/DashboardPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useUpdatePoints(todoType: ItemType) {
  const queryClient = useQueryClient();
  const pathname = usePathname() as string;
  const dateType = useDashboardStore((state) => state.dateType);

  const todoId = pathname.split("/").at(-1) as string;
  const todoPost = links[todoType];

  const mutation = useMutation({
    mutationKey: [todoType, todoId],
    mutationFn: (newPoints: number) =>
      axios.post(todoPost.updatePoints, { itemId: todoId, newPoints }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${todoType}s`, todoId] });

      queryClient.invalidateQueries({
        queryKey: ["dashboard", "productivity", dateType],
      });
    },
  });

  const handleUpdatePoints = useCallback(
    (newPoints: number) => {
      mutation.mutate(newPoints);
    },
    [mutation]
  );

  return handleUpdatePoints;
}
