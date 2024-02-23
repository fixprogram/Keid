import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export const useDeleteComment = (itemType: ItemType) => {
  const queryClient = useQueryClient();

  // if we come to this task by a link, the userId will be undefined
  // const taskId = taskData.taskId;
  const pathname = usePathname();
  const itemId = pathname?.split("/").at(-1);
  const itemPost = links[itemType];

  const mutation = useMutation({
    mutationKey: [itemType, itemId],
    mutationFn: (commentTime: string) =>
      axios.post(itemPost.deleteComment, { itemId, commentTime }),
    onSuccess: (data) => {
      // queryClient.setQueryData([itemType, taskId], {
      //   ...taskData,
      //   comments: data.data.comments,
      // });
      queryClient.invalidateQueries([itemType]);
    },
  });

  const handleDeleteComment = useCallback(
    (commentTime: string) => {
      mutation.mutate(commentTime);
    },
    [mutation]
  );

  return handleDeleteComment;
};
