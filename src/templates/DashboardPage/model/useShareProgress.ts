// import { links } from "@/shared/config/links";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useCallback } from "react";

// export function useShareProgress(userId: string) {
//   const queryClient = useQueryClient();

//   const shareProgressPost = links.shareProgress(userId);

//   const mutation = useMutation({
//     mutationKey: ["shareProgress", userId],
//     mutationFn: () => axios.get(shareProgressPost),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notifications"] });
//     },
//   });

//   const handleShareProgress = useCallback(() => mutation.mutate(), [mutation]);

//   return handleShareProgress;
// }
