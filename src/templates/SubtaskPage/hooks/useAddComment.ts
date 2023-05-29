import { links } from "@/shared/config/links";
// import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import { useUser } from "@/shared/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAddComment() {
  const router = useRouter();
  // const user = useUser();

  // const subtaskId = useAppSelector((state) => state.subtask.subtaskId);

  // const handleAddComment = useCallback(
  //   (comment: string) => {
  //     if (comment.length < 3) {
  //       return null;
  //     }

  //     if (user) {
  //       const userId = user.id;

  //       fetch(links.subtask.addComment, {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId,
  //           subtaskId,
  //           content: comment,
  //         }),
  //       }).then(async (res) => {
  //         console.log("Res: ", res);

  //         const body = await res.json();

  //         console.log("body: ", body);
  //         if (body.id) router.push(`/subtasks/${body.id}`);
  //       });
  //     }
  //   },
  //   [user, subtaskId, router]
  // );

  // return handleAddComment;
}
