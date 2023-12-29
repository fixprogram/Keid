import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useNavigationStore } from "@/widgets/Navigation/model/navigationStore";
import { Comment, CommentType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type MutationDataType = {
  itemId: string;
  progress: number;
  comment: Comment;
};

export const useUpdateProgress = (itemType: ItemType) => {
  const pathname = usePathname() as string;
  const queryClient = useQueryClient();

  const itemId = pathname.split("/").at(-1) as string;
  // if we come to this task by a link, the userId will be undefined
  const userId = useNavigationStore((state) => state.userId);

  const itemPost = links[itemType];

  const mutation = useMutation({
    mutationKey: [itemType, itemId],
    mutationFn: (data: MutationDataType) =>
      axios.post(itemPost.updateProgress, data),
    onSuccess: () => {
      queryClient.invalidateQueries([itemType, itemId]);
      queryClient.invalidateQueries(["dashboard"]);
    },
  });

  const handleUpdateProgress = useCallback(
    (progress: number, commentText: string) => {
      const comment: Comment = {
        userId,
        content: commentText,
        time: Date.now().toString(),
        serviceContent: null,
        type: CommentType.PROGRESS_UPDATE,
      };

      mutation.mutate({ itemId, progress, comment });
    },
    [mutation, userId, itemId]
  );

  return handleUpdateProgress;
};
