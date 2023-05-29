import { links } from "@/shared/config/links";
import { ItemType } from "@/shared/config/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useUpdateDescription(itemType: ItemType) {
  const queryClient = useQueryClient();
  const pathname = usePathname() as string;

  const itemId = pathname.split("/").at(-1) as string;
  const itemPost = links[itemType];

  const mutation = useMutation({
    mutationKey: [itemType, itemId],
    mutationFn: (newDescription: string) =>
      axios.post(itemPost.updateDescription, { itemId, newDescription }),
    onSuccess: (data) => {
      console.log("data: ", data);
      queryClient.invalidateQueries({ queryKey: [itemType, itemId] });
    },
  });

  const handleUpdateDescription = useCallback(
    (newDescription: string) => {
      mutation.mutate(newDescription);
    },
    [mutation]
  );

  return handleUpdateDescription;
}
