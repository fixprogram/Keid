import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { useCommentsStore } from "./commentsStore";
import { useUser } from "@/entities/user/models/userContext";

export const useAddComment = (itemType: ItemType) => {
  const queryClient = useQueryClient();

  // if we come to this task by a link, the userId will be undefined
  // const userId = useNavigationStore((state) => state.userId);

  const user = useUser();

  const reset = useCommentsStore((state) => state.reset);
  // const taskId = taskData.taskId;
  const pathname = usePathname();
  const itemId = pathname?.split("/").at(-1);

  const itemPost = links[itemType];

  const mutation = useMutation({
    mutationKey: [itemType, itemId],
    mutationFn: (comment: string) =>
      axios.post(itemPost.addComment, {
        comment,
        userId: user?.id,
        itemId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([itemType, itemId]);

      reset();
    },
  });

  const handleAddComment = useCallback(
    (comment: string) => {
      mutation.mutate(comment);
    },
    [mutation]
  );

  return handleAddComment;
};
