import { useTasksStore } from "@/entities/task/models/tasksStore";
import { useTaskStore } from "@/entities/task/models/taskStore";
import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useDashboardStore } from "@/templates/DashboardPage";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { Comment, CommentType } from "@prisma/client";
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
  const dateType = useDashboardStore((state) => state.dateType);
  const queryClient = useQueryClient();

  const userId = useNavigationStore((state) => state.userId);
  const itemId = pathname?.split("/").at(-1);

  const itemPost = links[itemType];

  const comment: Comment = {
    userId,
    content: "",
    time: Date.now().toString(),
    serviceContent: null,
    type: CommentType.COMPLETED,
  };

  if (itemType !== "task") {
    comment.type = CommentType.PROGRESS_UPDATE;
  }

  const mutation = useMutation({
    mutationKey: [`${itemType}s`],
    mutationFn: () => axios.post(itemPost.complete, { itemId, comment }),
    onSuccess: (data) => {
      queryClient.invalidateQueries([`${itemType}s`]);
      queryClient.invalidateQueries([`${itemType}`, itemId]);

      queryClient.invalidateQueries(["dashboard", "overview", dateType]);
      queryClient.invalidateQueries(["dashboard", "productivity", dateType]);

      router.back();
    },
  });

  const handleComplete = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleComplete;
};
