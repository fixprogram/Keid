import { links } from "@/shared/config/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

export function useToggleFollowingUser(userId: string, id: string) {
  const queryClient = useQueryClient();

  const followPost = links.follow(id);

  const mutation = useMutation({
    mutationKey: ["profile", id],
    mutationFn: () => axios.post(followPost, { userId, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  const handleToggleFollowingUser = useCallback(
    () => mutation.mutate(),
    [mutation]
  );

  return handleToggleFollowingUser;
}
